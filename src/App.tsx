import { useState, useMemo, useEffect } from 'react';
import { useStorefront } from './hooks/useStorefront';
import type { StorefrontProduct, CartItem } from './types/storefront';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { BagDrawer } from './components/BagDrawer';
import { CraftStory } from './components/CraftStory';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { Footer } from './components/Footer';
import { supabase } from './lib/supabase';

export default function App() {
  const {
    tenant,
    products,
    buildWhatsAppOrderUrl,
    buildCartWhatsAppUrl,
  } = useStorefront();

  const [activeFabric, setActiveFabric] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<StorefrontProduct | null>(null);
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

  // Extract unique fabrics from products
  const fabrics = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.fabric) set.add(p.fabric.trim());
    });
    return Array.from(set);
  }, [products]);

  // Filtered products based on search and fabric tab
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesFabric =
        activeFabric === 'all' ||
        (p.fabric && p.fabric.toLowerCase() === activeFabric.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (p.weave && p.weave.toLowerCase().includes(q)) ||
        (p.color && p.color.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q));

      return matchesFabric && matchesSearch;
    });
  }, [products, activeFabric, searchQuery]);

  // Cart operations
  const handleAddToCart = (product: StorefrontProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
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

  // Direct WhatsApp Single Item Order with optional DB logging
  const handleDirectWhatsApp = async (product: StorefrontProduct) => {
    const url = buildWhatsAppOrderUrl(product);

    // Asynchronously log inquiry into database
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

    // Asynchronously log cart order into database
    if (tenant.id) {
      try {
        const totalValue = cart.reduce((sum, i) => sum + (i.product.retail_price * i.quantity), 0);
        const summary = cart.map(i => `${i.product.title} (x${i.quantity})`).join(', ');

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
    <div className="min-h-screen bg-[#fcfbf8] text-[#1a1918] flex flex-col font-sans">
      {/* Top Luxury Navigation */}
      <Navbar
        tenant={tenant}
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Editorial Hero */}
        <Hero
          tenant={tenant}
          onExploreClick={() => {
            document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Curated Saree Collection */}
        <section id="collection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading (No kicker/eyebrow per craft floor rules) */}
          <div className="mb-10 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1918] font-normal leading-tight">
              The Atelier Collection
            </h2>
            <p className="mt-2 text-sm text-[#6c665e] max-w-xl">
              Authentic handlooms crafted from pure Mulberry silk yarns and pure zari. Filter by weave or search specific silk varieties.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <FilterBar
            fabrics={fabrics}
            activeFabric={activeFabric}
            onSelectFabric={setActiveFabric}
            totalCount={filteredProducts.length}
          />

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-base font-serif text-[#1a1918]">
                No sarees match your current search or filter.
              </p>
              <button
                onClick={() => {
                  setActiveFabric('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2.5 rounded-full border border-[#d8d0c2] text-xs font-semibold uppercase tracking-wider hover:border-[#1a1918] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={setSelectedProduct}
                  onQuickInquire={handleDirectWhatsApp}
                />
              ))}
            </div>
          )}
        </section>

        {/* Craft Story & Varanasi Heritage */}
        <CraftStory />
      </main>

      {/* Understated Footer */}
      <Footer
        tenant={tenant}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectWhatsApp={handleDirectWhatsApp}
      />

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

      {/* Order Tracking Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        tenant={tenant}
      />
    </div>
  );
}
