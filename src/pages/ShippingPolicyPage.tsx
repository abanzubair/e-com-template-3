import React from 'react';
import { Truck, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';
import type { StorefrontTenant } from '../types/storefront';

interface ShippingPolicyPageProps {
  tenant: StorefrontTenant;
}

export const ShippingPolicyPage: React.FC<ShippingPolicyPageProps> = ({ tenant }) => {
  const cleanNumber = (tenant.whatsapp || '919919101369').replace(/\D/g, '');
  const supportUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Namaste ${tenant.store_name}! I have an inquiry regarding shipping/returns.`
  )}`;

  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8c6d3b]">
        Patron Care
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1918] font-normal mt-2 leading-tight">
        Shipping, Delivery & Returns Policy
      </h1>
      <p className="mt-4 text-sm text-[#6c665e] leading-relaxed">
        We ensure that every handcrafted Varanasi saree reaches you in pristine loom condition, safely protected with multi-layered moisture barrier packaging and comprehensive transit insurance.
      </p>

      {/* Highlights Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#f7f4ed] border border-[#eee8dc]">
          <Truck className="w-6 h-6 text-[#8c6d3b] mb-3" />
          <h3 className="font-serif text-lg text-[#1a1918]">Complimentary Domestic</h3>
          <p className="text-xs text-[#6c665e] mt-1">
            Free express delivery across India within 3 to 5 business days.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#f7f4ed] border border-[#eee8dc]">
          <ShieldCheck className="w-6 h-6 text-[#8c6d3b] mb-3" />
          <h3 className="font-serif text-lg text-[#1a1918]">100% Insured Transit</h3>
          <p className="text-xs text-[#6c665e] mt-1">
            Full monetary protection against accidental loss or damage during transit.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#f7f4ed] border border-[#eee8dc]">
          <RefreshCw className="w-6 h-6 text-[#8c6d3b] mb-3" />
          <h3 className="font-serif text-lg text-[#1a1918]">7-Day Inspection</h3>
          <p className="text-xs text-[#6c665e] mt-1">
            Prompt resolution, exchange, or store credit for verified discrepancies.
          </p>
        </div>
      </div>

      <div className="mt-16 space-y-10 text-xs sm:text-sm text-[#6c665e] leading-relaxed border-t border-[#eee8dc] pt-10">
        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            Domestic Delivery Process
          </h2>
          <p>
            Orders are carefully hand-steamed, inspected under natural daylight, and packed in rigid presentation boxes with moisture-sealed inner linings. All domestic orders are dispatched via premium air couriers (BlueDart, Delhivery, DTDC) with live SMS and WhatsApp tracking updates. Standard transit timeline is 3 to 5 business days depending on location.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            Worldwide Express Shipping
          </h2>
          <p>
            We ship to over 45 international destinations including the United States, United Kingdom, Canada, Australia, United Arab Emirates, and Singapore via DHL Express and FedEx International. Expected international delivery timeline is 7 to 10 business days. Shipments are accompanied by export declaration forms and Silk Mark verification.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            Returns, Exchanges & Damaged Deliveries
          </h2>
          <p>
            Because authentic handloom sarees are woven as single, exclusive pieces, we request patrons to inspect their package upon delivery. In the rare event of transit damage or a verified weave error:
          </p>
          <ul className="mt-3 space-y-2 pl-4 list-disc text-xs text-[#6c665e]">
            <li>Notify our WhatsApp concierge within 7 days of package receipt with unboxing photos or video.</li>
            <li>Keep the original Silk Mark tag and packaging intact without draping or alteration.</li>
            <li>Our team will arrange complimentary reverse pickup and issue an immediate replacement or full boutique store credit.</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[#f7f4ed] border border-[#eee8dc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-base text-[#1a1918] font-medium">
              Need Assistance with an Existing Shipment?
            </h3>
            <p className="text-xs text-[#6c665e] mt-0.5">
              Connect directly with our dispatch manager on WhatsApp.
            </p>
          </div>
          <a
            href={supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1a1918] hover:bg-[#332f2c] text-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#8c6d3b]" />
            <span>WhatsApp Dispatch Desk</span>
          </a>
        </section>
      </div>
    </div>
  );
};
