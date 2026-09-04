import React from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import type { StorefrontTenant } from '../types/storefront';

interface HeroProps {
  tenant: StorefrontTenant;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ tenant, onExploreClick }) => {
  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
  const conciergeUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Namaste ${tenant.store_name}! I would like to inquire about your handcrafted Varanasi saree collection.`
  )}`;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#eee8dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1918] tracking-[-0.015em] leading-[1.12]">
              Handwoven in Varanasi. Preserved for Generations.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#6c665e] leading-relaxed max-w-2xl font-normal">
              {tenant.tagline || 'Exquisite pure Katan silks, tested gold zari, and timeless motifs crafted on traditional wooden pit looms by master artisans.'}
            </p>

            {/* Direct Action Flow */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#1a1918] text-[#fcfbf8] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#332f2c] transition-all duration-200 shadow-sm"
              >
                <span>View The Sarees</span>
                <ArrowDown className="ml-2 w-3.5 h-3.5" />
              </button>

              <a
                href={conciergeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[#d8d0c2] text-[#1a1918] text-xs font-semibold uppercase tracking-[0.16em] hover:border-[#8c6d3b] hover:text-[#8c6d3b] transition-all duration-200"
              >
                <MessageCircle className="mr-2 w-4 h-4 text-[#8c6d3b]" />
                <span>Boutique WhatsApp</span>
              </a>
            </div>

            {/* Quiet Craft Guarantees (Clean, unboxed) */}
            <div className="mt-14 pt-8 border-t border-[#f0ece1] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#1a1918]">
                  Pure Silk Mark
                </span>
                <span className="block text-xs text-[#948e85] mt-1">
                  100% Tested Natural Mulberry
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#1a1918]">
                  Master Weavers
                </span>
                <span className="block text-xs text-[#948e85] mt-1">
                  Authentic Pit Loom Craft
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#1a1918]">
                  Direct Checkout
                </span>
                <span className="block text-xs text-[#948e85] mt-1">
                  Private WhatsApp Orders
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Image (Single large, pristine portrait visual) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-[#eee8dc]">
              <img
                src="/images/hero-saree.jpg"
                alt="Handcrafted Banarasi Silk Saree"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f5eedf]">
                  Varanasi Atelier Collection
                </span>
                <p className="font-serif text-xl sm:text-2xl mt-1 font-normal">
                  Imperial Katan Silk Shikargah
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
