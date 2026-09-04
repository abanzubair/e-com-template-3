import React, { useState } from 'react';
import { X, Search, Clock, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { StorefrontTenant } from '../types/storefront';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: StorefrontTenant;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  tenant,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return;

    setLoading(true);
    setSearched(true);
    try {
      let dbQuery = supabase
        .from('boutique_orders')
        .select('*')
        .eq('tenant_id', tenant.id);

      const cleanPhone = term.replace(/\D/g, '');
      if (cleanPhone.length >= 8) {
        dbQuery = dbQuery.ilike('customer_phone', `%${cleanPhone}%`);
      } else {
        dbQuery = dbQuery.or(`customer_name.ilike.%${term}%,product_title.ilike.%${term}%,notes.ilike.%${term}%`);
      }

      const { data, error } = await dbQuery.order('created_at', { ascending: false }).limit(5);
      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error('Order tracking search failed:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
  const supportUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Namaste ${tenant.store_name}, I would like to track the dispatch status of my order.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-[#fcfbf8] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#eee8dc] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f3efe6] hover:bg-[#e7e2d6] text-[#1a1918] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c6d3b]">
            Patron Services
          </span>
          <h3 className="font-serif text-2xl text-[#1a1918] font-normal mt-1">
            Track Saree Dispatch Status
          </h3>
          <p className="text-xs text-[#6c665e] mt-2">
            Enter the mobile number you used during WhatsApp checkout to view your order status.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 flex gap-2">
            <input
              type="text"
              placeholder="e.g. 9876543210 or your name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-xs px-3.5 py-3 rounded-xl bg-white border border-[#d8d0c2] text-[#1a1918] focus:border-[#8c6d3b] focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-1.5 bg-[#1a1918] hover:bg-[#332f2c] text-white px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{loading ? 'Locating...' : 'Search'}</span>
            </button>
          </form>

          {/* Results Display */}
          <div className="mt-6">
            {searched && results.length === 0 && !loading && (
              <div className="p-6 rounded-xl bg-[#f7f4ed] text-center">
                <p className="text-xs text-[#6c665e]">
                  No active orders found for this search. Orders placed recently on WhatsApp are logged after artisan review.
                </p>
                <a
                  href={supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8c6d3b] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Inquire directly on WhatsApp</span>
                </a>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-3">
                {results.map((order) => (
                  <div key={order.id} className="p-4 rounded-xl bg-white border border-[#eee8dc] text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#1a1918]">
                      <span>{order.product_title || 'Boutique Saree Order'}</span>
                      <span className="text-[#8c6d3b] uppercase tracking-wider font-bold">
                        {order.status || 'Confirmed'}
                      </span>
                    </div>
                    <div className="mt-1 text-[#6c665e] flex items-center gap-2">
                      <Clock className="w-3 h-3 text-[#948e85]" />
                      <span>{new Date(order.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Total: ₹{Number(order.total_price || 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
