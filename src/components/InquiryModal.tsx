import React, { useState, useEffect } from 'react';
import { X, MessageCircle, User, Phone } from 'lucide-react';
import type { StorefrontProduct, StorefrontTenant } from '../types/storefront';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: StorefrontProduct | null;
  tenant: StorefrontTenant;
  inquiryType?: string;
  onSubmit: (data: { customerName: string; customerPhone: string; product: StorefrontProduct; inquiryType?: string }) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  product,
  tenant,
  inquiryType = 'Instant Order',
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem('weave365_buyer_name') || '';
      const savedPhone = localStorage.getItem('weave365_buyer_phone') || '';
      setName(savedName);
      setPhone(savedPhone);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9+]/g, '').trim();

    if (!cleanPhone || cleanPhone.length < 8) {
      setError('Please provide a valid WhatsApp phone number (minimum 8 digits).');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    localStorage.setItem('weave365_buyer_name', name.trim());
    localStorage.setItem('weave365_buyer_phone', cleanPhone);

    onSubmit({
      customerName: name.trim(),
      customerPhone: cleanPhone,
      product,
      inquiryType,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#fcfbf8] border border-[#eee8dc] rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 text-left">
        <div className="flex items-center justify-between pb-4 border-b border-[#eee8dc]">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8c6d3b]">
              Direct WhatsApp Concierge
            </span>
            <h3 className="font-serif text-xl font-normal text-[#1a1918] mt-0.5">
              {inquiryType === 'Live Video Drape' ? 'Request Video Drape' : 'Inquire via WhatsApp'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-[#948e85] hover:text-[#1a1918] hover:bg-[#f3efe6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Saree Snippet */}
        <div className="flex items-center gap-3.5 my-5 p-3 rounded-xl bg-[#f7f4ed] border border-[#eee8dc]">
          <div className="w-14 h-18 rounded-lg overflow-hidden bg-white shrink-0 border border-[#eee8dc]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-serif text-sm font-medium text-[#1a1918] truncate">
              {product.title}
            </h4>
            <div className="text-xs text-[#948e85] font-mono mt-0.5">
              SKU: {product.sku}
            </div>
            <div className="text-sm font-bold text-[#8c6d3b] mt-1 tabular-nums">
              ₹{product.retail_price.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
            {error}
          </div>
        )}

        {/* Buyer Details Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1a1918] mb-1.5">
              Your Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#948e85] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. Radhika Sharma"
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-white border border-[#d8d0c2] text-[#1a1918] placeholder-[#948e85] focus:border-[#8c6d3b] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1a1918] mb-1.5">
              Your WhatsApp Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#948e85] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. +91 98765 43210"
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-white border border-[#d8d0c2] text-[#1a1918] placeholder-[#948e85] focus:border-[#8c6d3b] focus:outline-none transition-colors font-mono"
              />
            </div>
            <span className="text-[11px] text-[#948e85] mt-1 block">
              Required by {tenant.store_name} to confirm saree availability and send order updates.
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2.5 bg-[#1a1918] hover:bg-[#332f2c] text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-[#8c6d3b]" />
            <span>Continue to WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
