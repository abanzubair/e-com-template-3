import React from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import type { StorefrontTenant } from '../types/storefront';

interface HeroProps {
  tenant: StorefrontTenant;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ tenant, onExploreClick }) => {
  const hero = tenant.config?.hero;
  const isVideo = hero?.type === 'video';
  const mediaUrl = hero?.url || tenant.banner_url || '/images/hero-saree.jpg';
  const headline = hero?.headline || 'Handwoven in Varanasi. Preserved for Generations.';
  const badgeText = hero?.badge || 'Varanasi Atelier Collection';
  const subtitle = hero?.subtitle || tenant.tagline || 'Exquisite pure Katan silks, tested gold zari, and timeless motifs crafted on traditional wooden pit looms by master artisans.';
  const primaryCtaText = hero?.primary_cta_text || 'View The Sarees';
  const primaryCtaLink = hero?.primary_cta_link;
  const secondaryCtaText = hero?.secondary_cta_text;
  const secondaryCtaLink = hero?.secondary_cta_link;

  const badges = tenant.config?.trust_badges;
  const showSilkMark = badges ? badges.show_silk_mark : true;
  const showTestedZari = badges ? badges.show_tested_zari : true;
  const showHandloom = badges ? badges.show_handloom_certified : true;

  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
  const greeting = tenant.config?.whatsapp_greeting || `Namaste ${tenant.store_name}! I would like to inquire about your handcrafted Varanasi saree collection.`;
  const conciergeUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(greeting)}`;

  const handlePrimaryClick = () => {
    if (!primaryCtaLink || primaryCtaLink === '#sarees') {
      onExploreClick();
      return;
    }
    if (primaryCtaLink.startsWith('#')) {
      document.querySelector(primaryCtaLink)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = primaryCtaLink;
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-[#eee8dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {badgeText && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8c6d3b] mb-3 block">
                {badgeText}
              </span>
            )}

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1a1918] tracking-[-0.015em] leading-[1.12]">
              {headline}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#6c665e] leading-relaxed max-w-2xl font-normal">
              {subtitle}
            </p>

            {/* Direct Action Flow */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={handlePrimaryClick}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#1a1918] text-[#fcfbf8] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#332f2c] transition-all duration-200 shadow-sm"
              >
                <span>{primaryCtaText}</span>
                <ArrowDown className="ml-2 w-3.5 h-3.5" />
              </button>

              {secondaryCtaText ? (
                <a
                  href={secondaryCtaLink || '#craft'}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[#d8d0c2] text-[#1a1918] text-xs font-semibold uppercase tracking-[0.16em] hover:border-[#8c6d3b] hover:text-[#8c6d3b] transition-all duration-200"
                >
                  <span>{secondaryCtaText}</span>
                </a>
              ) : (
                <a
                  href={conciergeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[#d8d0c2] text-[#1a1918] text-xs font-semibold uppercase tracking-[0.16em] hover:border-[#8c6d3b] hover:text-[#8c6d3b] transition-all duration-200"
                >
                  <MessageCircle className="mr-2 w-4 h-4 text-[#8c6d3b]" />
                  <span>Boutique WhatsApp</span>
                </a>
              )}
            </div>

            {/* Quiet Craft Guarantees (Clean, unboxed) */}
            <div className="mt-14 pt-8 border-t border-[#f0ece1] grid grid-cols-3 gap-4 text-left">
              {showSilkMark && (
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#1a1918]">
                    Pure Silk Mark
                  </span>
                  <span className="block text-xs text-[#948e85] mt-1">
                    100% Tested Natural Mulberry
                  </span>
                </div>
              )}

              {showHandloom && (
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#1a1918]">
                    Master Weavers
                  </span>
                  <span className="block text-xs text-[#948e85] mt-1">
                    Authentic Pit Loom Craft
                  </span>
                </div>
              )}

              {showTestedZari && (
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#1a1918]">
                    Tested Real Zari
                  </span>
                  <span className="block text-xs text-[#948e85] mt-1">
                    Certified Metallic Gold Zari
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Hero Media: Video or Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-[#eee8dc] bg-neutral-900">
              {isVideo ? (
                <video
                  key={mediaUrl}
                  src={mediaUrl}
                  poster={hero?.poster_url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-1000 ease-out"
                />
              ) : (
                <img
                  key={mediaUrl}
                  src={mediaUrl}
                  alt={headline}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000 ease-out"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f5eedf]">
                  {badgeText}
                </span>
                <p className="font-serif text-xl sm:text-2xl mt-1 font-normal line-clamp-2">
                  {headline}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
