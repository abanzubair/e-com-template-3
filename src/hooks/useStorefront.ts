import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { StorefrontTenant, StorefrontProduct } from '../types/storefront';
import { DEFAULT_TENANT, FALLBACK_PRODUCTS } from '../data/fallbackData';

function resolveCurrentSlug(): { slug?: string; domain?: string } {
  if (typeof window === 'undefined') return { slug: 'atelier' };

  const urlParams = new URLSearchParams(window.location.search);
  const querySlug = urlParams.get('store') || urlParams.get('slug');
  if (querySlug) {
    return { slug: querySlug.toLowerCase().trim() };
  }

  const parts = window.location.pathname.split('/').filter(Boolean);
  if (parts.length > 0) {
    const candidate = parts[0].toLowerCase().trim();
    if (!['admin', 'product', 'products', 'assets', 'images', 'api', 'track'].includes(candidate)) {
      return { slug: candidate };
    }
  }

  const hostname = window.location.hostname;
  if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return { domain: hostname };
  }

  return { slug: 'atelier' };
}

export function useStorefront() {
  const [tenant, setTenant] = useState<StorefrontTenant>(DEFAULT_TENANT);
  const [products, setProducts] = useState<StorefrontProduct[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBoutiqueData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const target = resolveCurrentSlug();
      let query = supabase.from('boutique_tenants').select('*');

      if (target.slug) {
        query = query.eq('slug', target.slug);
      } else if (target.domain) {
        query = query.eq('custom_domain', target.domain);
      }

      let { data: foundTenant } = await query.maybeSingle();

      // If no exact match, fallback to the latest active tenant or default
      if (!foundTenant) {
        const { data: latestTenant } = await supabase
          .from('boutique_tenants')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        foundTenant = latestTenant;
      }

      if (foundTenant) {
        let config: any = {};
        if (foundTenant.about_text) {
          try {
            const parsed = JSON.parse(foundTenant.about_text);
            if (typeof parsed === 'object' && parsed !== null) {
              config = parsed;
            }
          } catch (e) {
            // ignore
          }
        }

        setTenant({
          id: foundTenant.id,
          slug: foundTenant.slug || 'atelier',
          store_name: foundTenant.store_name || DEFAULT_TENANT.store_name,
          tagline: foundTenant.tagline || DEFAULT_TENANT.tagline,
          description: foundTenant.description || DEFAULT_TENANT.description,
          whatsapp: foundTenant.whatsapp || DEFAULT_TENANT.whatsapp,
          logo_url: foundTenant.logo_url || '',
          banner_url: foundTenant.banner_url || '',
          custom_domain: foundTenant.custom_domain || '',
          instagram_handle: foundTenant.instagram_handle || DEFAULT_TENANT.instagram_handle,
          theme_color: foundTenant.theme_color || 'kasaya-atelier',
          accent_color: foundTenant.accent_color || '',
          config,
        });

        // Load published products for this boutique tenant
        const { data: dbProducts, error: prodErr } = await supabase
          .from('boutique_products')
          .select('*')
          .eq('tenant_id', foundTenant.id)
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (!prodErr && dbProducts && dbProducts.length > 0) {
          const formatted: StorefrontProduct[] = dbProducts.map((p) => {
            const retailPrice = Number(p.retail_price || p.base_price || 0);
            const imageList = Array.isArray(p.images) && p.images.length > 0 
              ? p.images 
              : (p.image ? [p.image] : ['/images/hero-saree.jpg']);

            return {
              id: p.id,
              tenant_id: p.tenant_id,
              original_product_id: p.original_product_id,
              sku: p.sku || `SKU-${p.id.slice(0, 8).toUpperCase()}`,
              title: p.title,
              description: p.description || 'Authentic handcrafted pure Banarasi silk saree woven with traditional zari craftsmanship.',
              price: retailPrice,
              retail_price: retailPrice,
              base_price: Number(p.base_price || 0),
              image: imageList[0] || '/images/hero-saree.jpg',
              images: imageList,
              category: p.category || 'Saree',
              fabric: p.fabric || 'Pure Katan Silk',
              weave: p.weave || 'Handloom Kadhwa',
              origin: 'Varanasi, India',
              color: p.color || 'Artisanal Weave',
              zari: p.zari || 'Tested Pure Gold Zari',
              blouse_piece: p.blouse_piece || 'Included (0.8m running silk)',
              dimensions: p.dimensions || '5.5m drape + 0.8m blouse piece',
              is_published: true,
              created_at: p.created_at,
            };
          });

          setProducts(formatted);
        } else {
          // Keep curated fallback products so boutique never looks empty
          setProducts(FALLBACK_PRODUCTS);
        }
      } else {
        setTenant(DEFAULT_TENANT);
        setProducts(FALLBACK_PRODUCTS);
      }
    } catch (err: any) {
      console.warn('[useStorefront] Using fallback catalog:', err?.message);
      setTenant(DEFAULT_TENANT);
      setProducts(FALLBACK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBoutiqueData();
  }, [loadBoutiqueData]);

  // WhatsApp order builder
  const buildWhatsAppOrderUrl = useCallback((item: StorefrontProduct, note?: string) => {
    const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
    const priceFormatted = `₹${item.retail_price.toLocaleString('en-IN')}`;
    const text = [
      `Namaste *${tenant.store_name}*!`,
      `I would like to order this handcrafted saree:`,
      `• *Item:* ${item.title}`,
      `• *SKU:* ${item.sku}`,
      `• *Price:* ${priceFormatted}`,
      `• *Fabric:* ${item.fabric} (${item.weave})`,
      note ? `• *Note:* ${note}` : null,
      `Please confirm availability and dispatch schedule.`,
    ].filter(Boolean).join('\n');

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  }, [tenant]);

  // Multi-item cart WhatsApp order builder
  const buildCartWhatsAppUrl = useCallback((cart: { product: StorefrontProduct; quantity: number }[], customerName?: string, shippingAddress?: string) => {
    const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
    const totalAmount = cart.reduce((sum, item) => sum + (item.product.retail_price * item.quantity), 0);
    const lines = [
      `Namaste *${tenant.store_name}*!`,
      `I would like to place an order from your boutique collection:`,
      ...cart.map((item, idx) => `${idx + 1}. *${item.product.title}* (${item.product.sku}) × ${item.quantity} — ₹${(item.product.retail_price * item.quantity).toLocaleString('en-IN')}`),
      `\n*Total Order Value:* ₹${totalAmount.toLocaleString('en-IN')}`,
      customerName ? `*Customer Name:* ${customerName}` : null,
      shippingAddress ? `*Shipping Destination:* ${shippingAddress}` : null,
      `\nPlease share payment details and dispatch confirmation.`,
    ].filter(Boolean);

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [tenant]);

  return {
    tenant,
    products,
    loading,
    error,
    refetch: loadBoutiqueData,
    buildWhatsAppOrderUrl,
    buildCartWhatsAppUrl,
  };
}
