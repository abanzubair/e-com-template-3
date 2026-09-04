import React from 'react';
import { MessageCircle, Sparkles, Scissors, Globe, Gift, HeartHandshake } from 'lucide-react';
import type { StorefrontTenant } from '../types/storefront';

interface ServicesPageProps {
  tenant: StorefrontTenant;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ tenant }) => {
  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');

  const buildServiceUrl = (serviceName: string) => {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
      `Namaste ${tenant.store_name}! I am inquiring about your ${serviceName} service.`
    )}`;
  };

  const services = [
    {
      title: 'Bespoke Bridal Trousseau Curation',
      tagline: 'Private Consultations for the Discerning Bride',
      icon: HeartHandshake,
      description:
        'A comprehensive one-on-one curation service tailored to your wedding calendar. Our master textile stylists assist you in selecting harmonious weaves for the Sangeet, Muhurtham, and Reception with live video draping and color-palette coordination.',
      features: [
        'Dedicated video drape consultations via WhatsApp',
        'Bridal color palette matching with custom blouse pairings',
        'Coordinated family heirloom sets for mothers and sisters',
      ],
      serviceName: 'Bridal Trousseau Consultation',
    },
    {
      title: 'Custom Pit Loom Weaving',
      tagline: 'Commission Your Own Heirloom Textile',
      icon: Sparkles,
      description:
        'Collaborate directly with our Varanasi master weavers to commission a bespoke pure silk saree. Select custom dye shades, antique zari specifications, and personalized motifs or subtle bridal inscriptions woven into the inner pallu.',
      features: [
        'Choice of Pure Katan, Organza, or Tissue silk base',
        'Custom silver and tested gold zari configurations',
        'Personalized weaver progress logs during loom crafting',
      ],
      serviceName: 'Custom Loom Weaving',
    },
    {
      title: 'Master Saree Finishing: Fall, Pico & Charak',
      tagline: 'Pristine Hand-Stitched Artisan Finishing',
      icon: Scissors,
      description:
        'Experience ready-to-wear perfection. Every drape can be hand-finished with premium color-matched cotton fall, delicate micro-rolled pico borders, and traditional herbal Charak polishing for an effortless, fluid drape.',
      features: [
        'Pure soft cotton fall hand-stitched with invisible seams',
        'Delicate micro-pico edge rolling along running borders',
        'Traditional Charak steam finish preserving natural silk luster',
      ],
      serviceName: 'Fall, Pico & Saree Finishing',
    },
    {
      title: 'Worldwide Insured White-Glove Dispatch',
      tagline: 'Express Doorstep Delivery Across 45+ Countries',
      icon: Globe,
      description:
        'We ship our authentic handloom creations to patrons across the USA, UK, Canada, Australia, UAE, and Singapore. All international shipments are fully insured against transit damage and dispatched in tamper-evident rigid gift boxes.',
      features: [
        'Express door-to-door delivery within 7 to 10 business days',
        'Tamper-evident luxury packaging with moisture barrier',
        'Complete customs and Silk Mark export documentation',
      ],
      serviceName: 'International Insured Delivery',
    },
    {
      title: 'Heirloom Festive & Corporate Gifting',
      tagline: 'Certified Handloom Silks for Milestone Celebrations',
      icon: Gift,
      description:
        'Curated pure silk saree collections crafted for milestone corporate celebrations, heritage conferences, and Diwali gifting. Each saree is individually packaged in branded luxury presentation cases accompanied by Silk Mark purity certificates.',
      features: [
        'Bespoke gift boxes with custom greeting notes',
        'Certified Silk Mark authenticity cards with every drape',
        'Bulk dispatch coordination with multi-address delivery',
      ],
      serviceName: 'Corporate & Festive Gifting',
    },
  ];

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8c6d3b]">
          Atelier Patronage
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1a1918] font-normal mt-2 leading-tight">
          Bespoke Services & Artisan Consultations
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#6c665e] leading-relaxed">
          Beyond our curated ready-to-dispatch collection, we provide personalized services to ensure your handloom sarees are finished to perfection, customized to your celebration, and safely delivered worldwide.
        </p>
      </div>

      {/* Services Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {services.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-2xl bg-white border border-[#eee8dc] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f7f4ed] flex items-center justify-center text-[#8c6d3b] mb-6">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>

                <span className="text-xs font-semibold tracking-wider uppercase text-[#948e85]">
                  {item.tagline}
                </span>

                <h3 className="font-serif text-2xl text-[#1a1918] font-normal mt-1 mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6c665e] leading-relaxed">
                  {item.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-[#f0ece1] pt-6 text-xs text-[#6c665e]">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8c6d3b]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#f0ece1]">
                <a
                  href={buildServiceUrl(item.serviceName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1a1918] hover:text-[#8c6d3b] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#8c6d3b]" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
