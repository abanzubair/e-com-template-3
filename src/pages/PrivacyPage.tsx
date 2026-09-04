import React from 'react';
import type { StorefrontTenant } from '../types/storefront';

interface PrivacyPageProps {
  tenant: StorefrontTenant;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ tenant }) => {
  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8c6d3b]">
        Security & Transparency
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1918] font-normal mt-2 leading-tight">
        Privacy Policy
      </h1>
      <p className="mt-3 text-xs text-[#948e85] uppercase tracking-wider">
        Updated {new Date().getFullYear()} • {tenant.store_name}
      </p>

      <div className="mt-12 space-y-10 text-xs sm:text-sm text-[#6c665e] leading-relaxed border-t border-[#eee8dc] pt-10">
        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            1. Information We Collect
          </h2>
          <p>
            When you browse our boutique website, inquire about sarees, or place orders via WhatsApp, we collect only the necessary details required to deliver our handcrafted pieces to your doorstep:
          </p>
          <ul className="mt-3 space-y-1.5 pl-4 list-disc text-xs text-[#6c665e]">
            <li>Full patron name and contact telephone / WhatsApp number.</li>
            <li>Shipping address and pincode for courier dispatch.</li>
            <li>Order history, selected saree SKUs, and customized finishing preferences.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            2. How We Use Your Data
          </h2>
          <p>
            Your information is used strictly to process orders, coordinate courier dispatch, provide order tracking updates, and answer specific saree care inquiries. We maintain a zero-spam policy. We do not sell, rent, or trade customer contact details to any external marketing agencies.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            3. WhatsApp Communication & Security
          </h2>
          <p>
            Order conversations, live video draping, and invoices routed via WhatsApp benefit from end-to-end encryption provided by the WhatsApp platform. We do not store financial payment credentials or card details on this website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            4. Your Rights & Data Deletion
          </h2>
          <p>
            You may at any time request the deletion or modification of your contact details from our client register by sending a request to our boutique desk on WhatsApp.
          </p>
        </section>
      </div>
    </div>
  );
};
