import React, { useState } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import type { CartItem, StorefrontTenant } from '../types/storefront';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  tenant: StorefrontTenant;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckoutWhatsApp: (customerName: string, customerPhone: string, shippingAddress?: string) => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  tenant,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutWhatsApp,
}) => {
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('weave365_buyer_name') || '');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('weave365_buyer_phone') || '');
  const [city, setCity] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.retail_price * item.quantity), 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcfbf8] border-l border-[#eee8dc] shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#eee8dc] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#8c6d3b]" />
              <h3 className="font-serif text-xl font-normal text-[#1a1918]">
                Your Boutique Bag ({totalQuantity})
              </h3>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Bag"
              className="p-1.5 rounded-lg text-[#948e85] hover:text-[#1a1918] hover:bg-[#f3efe6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#eee8dc]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#f7f4ed] flex items-center justify-center text-[#948e85] mb-4">
                  <ShoppingBag className="w-7 h-7 stroke-[1.25]" />
                </div>
                <h4 className="font-serif text-lg text-[#1a1918]">Your bag is empty</h4>
                <p className="text-xs text-[#6c665e] mt-1 max-w-xs">
                  Browse our curated Varanasi silk collection and select handcrafted heirloom sarees to order.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#1a1918] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#332f2c] transition-colors"
                >
                  Explore Sarees
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 text-left">
                  <div className="w-16 h-22 rounded-lg overflow-hidden bg-[#f7f4ed] shrink-0 border border-[#eee8dc]">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase text-[#948e85]">
                        {item.product.fabric}
                      </span>
                      <h5 className="font-serif text-sm text-[#1a1918] font-medium line-clamp-1">
                        {item.product.title}
                      </h5>
                      <div className="text-xs font-semibold text-[#1a1918] mt-0.5 tabular-nums">
                        ₹{item.product.retail_price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#d8d0c2] rounded-lg overflow-hidden text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2.5 py-1 hover:bg-[#f3efe6] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-medium tabular-nums text-[#1a1918]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2.5 py-1 hover:bg-[#f3efe6] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#948e85] hover:text-rose-600 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#eee8dc] bg-[#f7f4ed]/50">
              {/* Buyer Contact Details (WhatsApp Required) */}
              <div className="space-y-2.5 mb-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-white border border-[#d8d0c2] text-[#1a1918] placeholder-[#948e85] focus:border-[#8c6d3b] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Your WhatsApp Number (+91...) *"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      if (phoneError) setPhoneError(false);
                    }}
                    className={`w-full text-xs px-3 py-2.5 rounded-lg bg-white border font-mono placeholder-[#948e85] focus:outline-none ${
                      phoneError ? 'border-rose-500 text-rose-900 focus:border-rose-600' : 'border-[#d8d0c2] text-[#1a1918] focus:border-[#8c6d3b]'
                    }`}
                  />
                  {phoneError && (
                    <span className="text-[11px] text-rose-600 mt-1 block">
                      Please enter a valid WhatsApp number to proceed with order.
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Delivery City / Pincode (optional)"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-[#d8d0c2] text-[#1a1918] placeholder-[#948e85] focus:border-[#8c6d3b] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 text-xs text-[#6c665e] mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1a1918] tabular-nums">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Shipping & Insurance</span>
                  <span>Free across India</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#eee8dc] text-sm font-bold text-[#1a1918]">
                  <span>Total Payable</span>
                  <span className="tabular-nums">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const cleanPhone = customerPhone.replace(/[^0-9+]/g, '').trim();
                  if (!cleanPhone || cleanPhone.length < 8) {
                    setPhoneError(true);
                    return;
                  }
                  localStorage.setItem('weave365_buyer_name', customerName.trim());
                  localStorage.setItem('weave365_buyer_phone', cleanPhone);
                  onCheckoutWhatsApp(customerName.trim() || 'Valued Patron', cleanPhone, city);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1a1918] hover:bg-[#332f2c] text-white py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#8c6d3b]" />
                <span>Order Bag on WhatsApp</span>
              </button>
              <p className="text-[11px] text-[#948e85] text-center mt-2">
                Order details route directly to {tenant.store_name} via WhatsApp
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
