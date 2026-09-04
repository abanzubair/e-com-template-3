import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Shield, MapPin } from 'lucide-react';
import type { StorefrontTenant } from '../types/storefront';

interface FooterProps {
  tenant: StorefrontTenant;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ tenant, onOpenTracker }) => {
  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}`;

  return (
    <footer className="bg-[#1a1918] text-[#fcfbf8] pt-16 pb-12 border-t border-[#332f2c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#332f2c]">
          
          {/* Brand Col */}
          <div className="md:col-span-5 text-left">
            <Link to="/" className="inline-block">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.1em] uppercase text-white hover:text-[#8c6d3b] transition-colors">
                {tenant.store_name}
              </h3>
            </Link>
            <p className="text-xs text-[#a8a29e] tracking-[0.2em] uppercase mt-1">
              Curated Varanasi Silk Atelier
            </p>
            <p className="mt-4 text-xs text-[#d6d3d1] max-w-md leading-relaxed">
              {tenant.description || 'Devoted to the preservation of India’s most revered handloom textiles. Handcrafted on traditional wooden pit looms with certified gold and silver zari.'}
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#a8a29e]">
              <MapPin className="w-3.5 h-3.5 text-[#8c6d3b]" />
              <span>Ghats of Varanasi, Uttar Pradesh, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6d3b] mb-4">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-[#d6d3d1]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Bespoke Services
                </Link>
              </li>
              <li>
                <a href="/#craft" className="hover:text-white transition-colors">
                  The Looms
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Desk
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-white transition-colors text-left"
                >
                  Track Dispatch Status
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6d3b] mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-[#d6d3d1]">
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Silk Mark Guarantee
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Concierge */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6d3b] mb-4">
              Direct Concierge
            </h4>
            <p className="text-xs text-[#d6d3d1] leading-relaxed">
              Inquiries regarding weave purity, custom dyeing, or worldwide express shipping:
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#292524] hover:bg-[#332f2c] border border-[#44403c] px-4 py-2.5 rounded-lg transition-colors w-fit"
              >
                <MessageCircle className="w-4 h-4 text-[#8c6d3b]" />
                <span>WhatsApp: +{cleanNumber}</span>
              </a>

              {tenant.instagram_handle && (
                <div className="flex items-center gap-2 text-xs text-[#a8a29e] mt-1">
                  <svg className="w-3.5 h-3.5 text-[#8c6d3b]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>{tenant.instagram_handle}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#8c6d3b]" />
            <span>Silk Mark Certified • 100% Tested Natural Silk & Handcrafted Zari</span>
          </div>

          <div>
            © {new Date().getFullYear()} {tenant.store_name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
