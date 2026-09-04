import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

export const CraftStory: React.FC = () => {
  return (
    <section id="craft" className="py-20 sm:py-28 border-t border-[#eee8dc] bg-[#f7f4ed]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8c6d3b]">
            Handloom Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1a1918] font-normal mt-3 leading-snug">
            The Living Art of the Varanasi Weft
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6c665e] leading-relaxed">
            Every saree in our collection is an unhurried labor of devotion, passed through generations of master weavers who work wooden pit looms beneath the spiritual rhythm of the ancient ghats.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 rounded-2xl bg-white border border-[#eee8dc] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#f7f4ed] flex items-center justify-center text-[#8c6d3b] mb-6">
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#1a1918] font-normal mb-2">
              Kadhwa Weaving
            </h3>
            <p className="text-xs text-[#6c665e] leading-relaxed">
              In genuine Kadhwa, each individual motif is woven manually with separate spools of pure gold and silver zari. No loose threads remain on the underside, ensuring peerless durability.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#eee8dc] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#f7f4ed] flex items-center justify-center text-[#8c6d3b] mb-6">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#1a1918] font-normal mb-2">
              Certified Pure Silk
            </h3>
            <p className="text-xs text-[#6c665e] leading-relaxed">
              We exclusively commission Grade-A Mulberry silk yarns, verified with certified testing to guarantee the authentic weight, luster, and longevity of true heirloom textiles.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#eee8dc] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#f7f4ed] flex items-center justify-center text-[#8c6d3b] mb-6">
              <HeartHandshake className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-[#1a1918] font-normal mb-2">
              Direct Weaver Patronage
            </h3>
            <p className="text-xs text-[#6c665e] leading-relaxed">
              By connecting discerning patrons directly with Varanasi handloom weavers, we preserve sacred artisan livelihoods and eradicate exploitative middlemen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
