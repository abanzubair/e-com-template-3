import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, MessageCircle, X, Menu } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
  const conciergeUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Namaste ${tenant.store_name}, I am visiting your boutique website and would like assistance with saree recommendations.`
  )}`;

  const announcement = tenant.config?.announcement;
  const customLinks = tenant.config?.nav_links?.filter((l) => l.is_active);
  const accentColor = tenant.config?.accent_color || tenant.accent_color || '#8c6d3b';

  return (
    <>
      {/* Top Announcement Bar */}
      {announcement?.enabled && announcement.text && (
        <div
          className="sticky top-0 z-50 text-[11px] font-medium tracking-wide py-1.5 px-4 text-center truncate text-white shadow-sm"
          style={{ backgroundColor: accentColor }}
        >
          {announcement.link ? (
            <a href={announcement.link} className="hover:underline">
              {announcement.text}
            </a>
          ) : (
            <span>{announcement.text}</span>
          )}
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#fcfbf8]/95 backdrop-blur-md border-b border-[#eee8dc]/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#1a1918] hover:text-[#8c6d3b]"
                aria-label="Open Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center space-x-7 text-xs font-medium tracking-[0.14em] uppercase text-[#6c665e]">
              {customLinks && customLinks.length > 0 ? (
                customLinks.map((link) =>
                  link.is_external ? (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#1a1918] transition-colors py-1"
                    >
                      {link.label}
                    </a>
                  ) : link.url.startsWith('#') || link.url.startsWith('/#') ? (
                    <a
                      key={link.id}
                      href={link.url}
                      className="hover:text-[#1a1918] transition-colors py-1"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.id}
                      to={link.url}
                      className="hover:text-[#1a1918] transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  )
                )
              ) : (
                <>
                  <Link to="/" className="hover:text-[#1a1918] transition-colors py-1">
                    Collection
                  </Link>
                  <Link to="/services" className="hover:text-[#1a1918] transition-colors py-1">
                    Services
                  </Link>
                  <a href="/#craft" className="hover:text-[#1a1918] transition-colors py-1">
                    The Looms
                  </a>
                  <Link to="/contact" className="hover:text-[#1a1918] transition-colors py-1">
                    Contact
                  </Link>
                  <button
                    onClick={onOpenTracker}
                    className="hover:text-[#1a1918] transition-colors py-1 uppercase tracking-[0.14em]"
                  >
                    Track Order
                  </button>
                </>
              )}
            </nav>

            {/* Center Brand Identity */}
            <div className="flex-1 md:flex-initial text-center">
              <Link to="/" className="inline-block text-center group">
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.12em] font-normal uppercase text-[#1a1918] group-hover:text-[#8c6d3b] transition-colors">
                  {tenant.store_name}
                </span>
                <span className="block text-[10px] tracking-[0.24em] uppercase text-[#948e85] mt-0.5">
                  Varanasi Handlooms
                </span>
              </Link>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-6">
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
                  <span
                    className="absolute top-1 right-1 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-sm"
                    style={{ backgroundColor: accentColor }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#eee8dc] flex flex-col space-y-3 text-xs uppercase tracking-widest text-[#6c665e] text-left">
              {customLinks && customLinks.length > 0 ? (
                customLinks.map((link) =>
                  link.is_external || link.url.startsWith('#') || link.url.startsWith('/#') ? (
                    <a
                      key={link.id}
                      href={link.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 hover:text-[#1a1918]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.id}
                      to={link.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 hover:text-[#1a1918]"
                    >
                      {link.label}
                    </Link>
                  )
                )
              ) : (
                <>
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 hover:text-[#1a1918]"
                  >
                    Collection
                  </Link>
                  <Link
                    to="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 hover:text-[#1a1918]"
                  >
                    Services
                  </Link>
                  <a
                    href="/#craft"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 hover:text-[#1a1918]"
                  >
                    The Looms
                  </a>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 hover:text-[#1a1918]"
                  >
                    Contact Desk
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTracker();
                    }}
                    className="text-left py-1.5 hover:text-[#1a1918] uppercase tracking-widest"
                  >
                    Track Order
                  </button>
                </>
              )}
              <div className="pt-2 border-t border-[#f0ece1]">
                <a
                  href={conciergeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 text-[#8c6d3b] font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          )}

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
    </>
  );
};
