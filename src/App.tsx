import AdminRedirect from './pages/admin/AdminRedirect';

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStorefront } from './hooks/useStorefront';
import type { StorefrontProduct, CartItem } from './types/storefront';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BagDrawer } from './components/BagDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { InquiryModal } from './components/InquiryModal';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ServicesPage } from './pages/ServicesPage';
import { TermsPage } from './pages/TermsPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ContactPage } from './pages/ContactPage';
import { supabase } from './lib/supabase';

export default function App() {
  const {
    tenant,
    products,
  } = useStorefront();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [inquiryProduct, setInquiryProduct] = useState<StorefrontProduct | null>(null);
  const [inquiryType, setInquiryType] = useState<string>('Instant Order');

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(`atelier_cart_${tenant.slug}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`atelier_cart_${tenant.slug}`, JSON.stringify(cart));
    } catch (e) {
      console.warn('Cart persistence failed:', e);
    }
  }, [cart, tenant.slug]);

  // Cart operations
  const handleAddToCart = (product: StorefrontProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Direct WhatsApp Single Item Order with DB logging
  const handleDirectWhatsApp = (product: StorefrontProduct, type: string = 'Instant Order') => {
    setInquiryProduct(product);
    setInquiryType(type);
  };

  const handleConfirmInquiry = async (data: { customerName: string; customerPhone: string; product: StorefrontProduct; inquiryType?: string }) => {
    const { customerName, customerPhone, product, inquiryType: inqType } = data;

    if (tenant.id) {
      try {
        await supabase.from('boutique_inquiries').insert({
          tenant_id: tenant.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          subject: inqType || 'Direct Saree Inquiry',
          message: `${inqType || 'Direct inquiry'} for SKU: ${product.sku} (${product.title})`,
          product_title: product.title,
          sku: product.sku,
          status: 'New Inquiry',
        });
      } catch (_) {}

      try {
        await supabase.from('boutique_orders').insert({
          tenant_id: tenant.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          product_title: product.title,
          total_amount: product.retail_price,
          total_price: product.retail_price,
          status: 'Inquiry on WhatsApp',
          notes: `${inqType || 'Direct inquiry'} for SKU: ${product.sku} (${product.title}) | Buyer WhatsApp: ${customerPhone}`,
          items: [{ title: product.title, sku: product.sku, price: product.retail_price }],
        });
      } catch (err) {
        console.warn('Could not log inquiry to DB:', err);
      }
    }

    const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
    const priceFormatted = `₹${product.retail_price.toLocaleString('en-IN')}`;
    const text = [
      `Namaste *${tenant.store_name}*!`,
      `I would like to ${inqType === 'Live Video Drape' ? 'request a live video drape for' : 'inquire about'} this handcrafted saree:`,
      `• *Item:* ${product.title}`,
      `• *SKU:* ${product.sku}`,
      `• *Price:* ${priceFormatted}`,
      `• *Fabric:* ${product.fabric} (${product.weave})`,
      `\n*Buyer Contact Details:*`,
      `• *Name:* ${customerName}`,
      `• *WhatsApp:* ${customerPhone}`,
      `\nPlease confirm availability and dispatch schedule.`,
    ].join('\n');

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  // Checkout full cart via WhatsApp
  const handleCheckoutWhatsApp = async (customerName: string, customerPhone: string, shippingAddress?: string) => {
    if (cart.length === 0) return;

    if (tenant.id) {
      try {
        const totalValue = cart.reduce((sum, i) => sum + (i.product.retail_price * i.quantity), 0);
        const summary = cart.map((i) => `${i.product.title} (x${i.quantity})`).join(', ');

        await supabase.from('boutique_orders').insert({
          tenant_id: tenant.id,
          product_title: summary,
          customer_name: customerName,
          customer_phone: customerPhone,
          total_amount: totalValue,
          total_price: totalValue,
          status: 'Order Placed on WhatsApp',
          notes: `Destination: ${shippingAddress || 'Not specified'} | Items: ${summary} | Buyer WhatsApp: ${customerPhone}`,
          items: cart.map((i) => ({ title: i.product.title, price: i.product.retail_price, quantity: i.quantity })),
        });
      } catch (err) {
        console.warn('Could not log order to DB:', err);
      }
    }

    const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
    const totalAmount = cart.reduce((sum, item) => sum + (item.product.retail_price * item.quantity), 0);
    const text = [
      `Namaste *${tenant.store_name}*!`,
      `I would like to place an order from your boutique collection:`,
      ...cart.map((item, idx) => `${idx + 1}. *${item.product.title}* (${item.product.sku}) × ${item.quantity} — ₹${(item.product.retail_price * item.quantity).toLocaleString('en-IN')}`),
      `\n*Total Order Value:* ₹${totalAmount.toLocaleString('en-IN')}`,
      `\n*Buyer Contact Details:*`,
      `• *Name:* ${customerName}`,
      `• *WhatsApp:* ${customerPhone}`,
      shippingAddress ? `• *Destination:* ${shippingAddress}` : null,
      `\nPlease confirm order acceptance, payment details, and courier dispatch.`,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Routes>
      {/* Admin Panel Routes (Isolated) */}
      <Route path="/admin/*" element={<AdminRedirect />} />

      {/* Customer Storefront Routes */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-[#fcfbf8] text-[#1a1918] flex flex-col font-sans">
            <Navbar
        tenant={tenant}
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          {/* Core Routes */}
          <Route
            path="/"
            element={
              <HomePage
                tenant={tenant}
                products={products}
                searchQuery={searchQuery}
                onQuickInquire={handleDirectWhatsApp}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage
                products={products}
                tenant={tenant}
                onAddToCart={handleAddToCart}
                onDirectWhatsApp={handleDirectWhatsApp}
              />
            }
          />
          <Route path="/services" element={<ServicesPage tenant={tenant} />} />
          <Route path="/terms" element={<TermsPage tenant={tenant} />} />
          <Route path="/shipping" element={<ShippingPolicyPage tenant={tenant} />} />
          <Route path="/privacy" element={<PrivacyPage tenant={tenant} />} />
          <Route path="/contact" element={<ContactPage tenant={tenant} />} />

          {/* Multi-Tenant Subpath Routes */}
          <Route
            path="/:slug"
            element={
              <HomePage
                tenant={tenant}
                products={products}
                searchQuery={searchQuery}
                onQuickInquire={handleDirectWhatsApp}
              />
            }
          />
          <Route
            path="/:slug/product/:id"
            element={
              <ProductPage
                products={products}
                tenant={tenant}
                onAddToCart={handleAddToCart}
                onDirectWhatsApp={handleDirectWhatsApp}
              />
            }
          />
          <Route path="/:slug/services" element={<ServicesPage tenant={tenant} />} />
          <Route path="/:slug/terms" element={<TermsPage tenant={tenant} />} />
          <Route path="/:slug/shipping" element={<ShippingPolicyPage tenant={tenant} />} />
          <Route path="/:slug/privacy" element={<PrivacyPage tenant={tenant} />} />
          <Route path="/:slug/contact" element={<ContactPage tenant={tenant} />} />
        </Routes>
      </main>

      {/* Understated Luxury Footer */}
      <Footer tenant={tenant} onOpenTracker={() => setIsTrackerOpen(true)} />

      {/* Slide-over Shopping Bag Drawer */}
      <BagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        tenant={tenant}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutWhatsApp={handleCheckoutWhatsApp}
      />

      {/* WhatsApp Inquiry Modal requiring Buyer WhatsApp */}
      <InquiryModal
        isOpen={!!inquiryProduct}
        onClose={() => setInquiryProduct(null)}
        product={inquiryProduct}
        tenant={tenant}
        inquiryType={inquiryType}
        onSubmit={handleConfirmInquiry}
      />

            <OrderTrackerModal
              isOpen={isTrackerOpen}
              onClose={() => setIsTrackerOpen(false)}
              tenant={tenant}
            />
          </div>
        }
      />
    </Routes>
  );
}
