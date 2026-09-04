import React, { useState } from 'react';
import { ShoppingBag, Search, MessageCircle, X } from 'lucide-react';
import type { StorefrontTenant } from '../types/storefront';

interface NavbarProps {
  tenant: StorefrontTenant;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  tenant,
  cartCount,
  onOpenCart,
  onOpenTracker,
  searchQuery,
  onSearchChange,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
  const conciergeUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Namaste ${tenant.store_name}, I am visiting your boutique website and would like assistance with saree recommendations.`
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf8]/95 backdrop-blur-md border-b border-[#eee8dc]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-[0.14em] uppercase text-[#6c665e]">
            <a href="#collection" className="hover:text-[#1a1918] transition-colors py-1">
              Collection
            </a>
            <a href="#craft" className="hover:text-[#1a1918] transition-colors py-1">
              The Looms
            </a>
            <button
              onClick={onOpenTracker}
              className="hover:text-[#1a1918] transition-colors py-1 uppercase tracking-[0.14em]"
            >
              Track Order
            </button>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex-1 md:flex-initial text-center md:text-center">
            <a href="#" className="inline-block text-center group">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.12em] font-normal uppercase text-[#1a1918] group-hover:text-[#8c6d3b] transition-colors">
                {tenant.store_name}
              </span>
              <span className="block text-[10px] tracking-[0.24em] uppercase text-[#948e85] mt-0.5">
                Varanasi Handlooms
              </span>
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search Collection"
              className="p-2 text-[#6c665e] hover:text-[#1a1918] transition-colors"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>

            {/* Direct WhatsApp Concierge */}
            <a
              href={conciergeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#1a1918] border border-[#d8d0c2] hover:border-[#8c6d3b] hover:text-[#8c6d3b] px-3.5 py-1.5 rounded-full transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5 stroke-[1.75]" />
              <span>Concierge</span>
            </a>

            {/* Shopping Bag Drawer Button */}
            <button
              onClick={onOpenCart}
              aria-label="View Shopping Bag"
              className="p-2 text-[#1a1918] hover:text-[#8c6d3b] transition-colors relative"
            >
              <ShoppingBag className="w-[20px] h-[20px] stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#8c6d3b] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Minimal Search Input */}
        {showSearch && (
          <div className="py-3 border-t border-[#eee8dc] flex items-center gap-3 animate-fadeIn">
            <Search className="w-4 h-4 text-[#948e85] shrink-0" />
            <input
              type="text"
              placeholder="Search by weave, fabric (e.g. Katan Silk, Organza, Tissue), or color..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm text-[#1a1918] placeholder-[#948e85] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-[#948e85] hover:text-[#1a1918] px-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {
                setShowSearch(false);
                onSearchChange('');
              }}
              className="p-1 text-[#948e85] hover:text-[#1a1918]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
