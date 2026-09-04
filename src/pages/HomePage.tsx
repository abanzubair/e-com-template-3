import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { StorefrontProduct, StorefrontTenant } from '../types/storefront';
import { Hero } from '../components/Hero';
import { FilterBar } from '../components/FilterBar';
import { ProductCard } from '../components/ProductCard';
import { CraftStory } from '../components/CraftStory';

interface HomePageProps {
  tenant: StorefrontTenant;
  products: StorefrontProduct[];
  searchQuery: string;
  onQuickInquire: (product: StorefrontProduct) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  tenant,
  products,
  searchQuery,
  onQuickInquire,
}) => {
  const navigate = useNavigate();
  const [activeFabric, setActiveFabric] = useState<string>('all');

  // Unique fabrics list
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

  return (
    <>
      {/* Editorial Hero */}
      <Hero
        tenant={tenant}
        onExploreClick={() => {
          document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Curated Saree Collection */}
      <section id="collection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              onClick={() => setActiveFabric('all')}
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
                onOpenDetails={() => {
                  navigate(`/product/${product.id}`);
                }}
                onQuickInquire={onQuickInquire}
              />
            ))}
          </div>
        )}
      </section>

      {/* Craft Story & Varanasi Heritage */}
      <CraftStory />
    </>
  );
};
