import React, { useState } from 'react';
import { MessageCircle, MapPin, Clock, Send, ShieldCheck } from 'lucide-react';
import type { StorefrontTenant } from '../types/storefront';

interface ContactPageProps {
  tenant: StorefrontTenant;
}

export const ContactPage: React.FC<ContactPageProps> = ({ tenant }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Saree Availability');
  const [message, setMessage] = useState('');

  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Namaste ${tenant.store_name}!`,
      `I am reaching out through your boutique website:`,
      `• *Name:* ${name || 'Patron'}`,
      phone ? `• *Contact:* ${phone}` : null,
      `• *Topic:* ${inquiryType}`,
      `• *Message:* ${message}`,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8c6d3b]">
          Boutique Concierge
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1a1918] font-normal mt-2 leading-tight">
          Connect with Our Handloom Curators
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#6c665e] leading-relaxed">
          Whether you need assistance choosing an auspicious color for a wedding, want to verify weave specifications, or wish to commission a custom handloom piece, our team is at your service.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Contact Information & Studio Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-2xl bg-white border border-[#eee8dc] shadow-xs">
            <h3 className="font-serif text-2xl text-[#1a1918] font-normal mb-6">
              Atelier Desk
            </h3>

            <div className="space-y-6 text-xs text-[#6c665e]">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#f7f4ed] flex items-center justify-center text-[#8c6d3b] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-sm text-[#1a1918] font-medium">Loom Studio & Archive</strong>
                  <p className="mt-1 leading-relaxed">
                    Ancient Handloom Weaving Cluster, Near River Ghats, Varanasi, Uttar Pradesh 221001, India.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#f7f4ed] flex items-center justify-center text-[#8c6d3b] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-sm text-[#1a1918] font-medium">Concierge Operating Hours</strong>
                  <p className="mt-1 leading-relaxed">
                    Monday to Saturday • 10:00 AM to 8:00 PM IST<br />
                    WhatsApp inquiries answered promptly throughout the week.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#f7f4ed] flex items-center justify-center text-[#8c6d3b] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-sm text-[#1a1918] font-medium">Certified Authenticity</strong>
                  <p className="mt-1 leading-relaxed">
                    Direct handloom sourcing with government-accredited Silk Mark purity assurance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#f0ece1]">
              <a
                href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Namaste ${tenant.store_name}!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1a1918] hover:bg-[#332f2c] text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#8c6d3b]" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#f7f4ed]/70 border border-[#eee8dc]">
            <h3 className="font-serif text-2xl text-[#1a1918] font-normal mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs text-[#6c665e] mb-8">
              Complete the form below to generate a pre-formatted message directly to our senior handloom curator on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs text-[#1a1918]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-2 text-[#6c665e]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8d0c2] focus:border-[#8c6d3b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider mb-2 text-[#6c665e]">
                    Mobile / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8d0c2] focus:border-[#8c6d3b] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-2 text-[#6c665e]">
                  Nature of Inquiry *
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8d0c2] focus:border-[#8c6d3b] focus:outline-none"
                >
                  <option value="Saree Availability">Saree Availability & Live Drape Request</option>
                  <option value="Bridal Trousseau Consultation">Bridal Trousseau Consultation</option>
                  <option value="Custom Pit Loom Weaving">Custom Pit Loom Weaving Commission</option>
                  <option value="Fall & Pico Finishing">Fall & Pico Finishing Inquiries</option>
                  <option value="International Shipping Quote">International Shipping & Duty Quote</option>
                  <option value="Corporate / Bulk Gifting">Corporate / Bulk Gifting</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-2 text-[#6c665e]">
                  Message / Saree Preferences *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please mention preferred colors, fabrics, occasion date, or specific saree SKUs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#d8d0c2] focus:border-[#8c6d3b] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#1a1918] hover:bg-[#332f2c] text-white py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-sm"
              >
                <Send className="w-4 h-4 text-[#8c6d3b]" />
                <span>Transmit to WhatsApp Desk</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
