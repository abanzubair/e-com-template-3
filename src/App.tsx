import AdminRedirect from './pages/admin/AdminRedirect';

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStorefront } from './hooks/useStorefront';
import type { StorefrontProduct, CartItem } from './types/storefront';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BagDrawer } from './components/BagDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
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
    buildWhatsAppOrderUrl,
    buildCartWhatsAppUrl,
  } = useStorefront();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);

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
  const handleDirectWhatsApp = async (product: StorefrontProduct) => {
    const url = buildWhatsAppOrderUrl(product);

    if (tenant.id) {
      try {
        await supabase.from('boutique_orders').insert({
          tenant_id: tenant.id,
          product_id: product.id,
          product_title: product.title,
          total_price: product.retail_price,
          status: 'Inquiry on WhatsApp',
          notes: `Direct inquiry for SKU: ${product.sku}`,
        });
      } catch (err) {
        console.warn('Could not log inquiry to DB:', err);
      }
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Checkout full cart via WhatsApp
  const handleCheckoutWhatsApp = async (customerName?: string, shippingAddress?: string) => {
    if (cart.length === 0) return;
    const url = buildCartWhatsAppUrl(cart, customerName, shippingAddress);

    if (tenant.id) {
      try {
        const totalValue = cart.reduce((sum, i) => sum + (i.product.retail_price * i.quantity), 0);
        const summary = cart.map((i) => `${i.product.title} (x${i.quantity})`).join(', ');

        await supabase.from('boutique_orders').insert({
          tenant_id: tenant.id,
          product_title: summary,
          customer_name: customerName || 'Valued Patron',
          total_price: totalValue,
          status: 'Order Placed on WhatsApp',
          notes: shippingAddress ? `Destination: ${shippingAddress}` : 'Awaiting confirmation on WhatsApp',
        });
      } catch (err) {
        console.warn('Could not log order to DB:', err);
      }
    }

    window.open(url, '_blank', 'noopener,noreferrer');
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
