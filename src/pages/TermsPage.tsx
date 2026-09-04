import React from 'react';
import type { StorefrontTenant } from '../types/storefront';

interface TermsPageProps {
  tenant: StorefrontTenant;
}

export const TermsPage: React.FC<TermsPageProps> = ({ tenant }) => {
  return (
    <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8c6d3b]">
        Legal & Governance
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1918] font-normal mt-2 leading-tight">
        Terms & Conditions
      </h1>
      <p className="mt-3 text-xs text-[#948e85] uppercase tracking-wider">
        Effective as of {new Date().getFullYear()} • {tenant.store_name}
      </p>

      <div className="mt-12 space-y-10 text-xs sm:text-sm text-[#6c665e] leading-relaxed border-t border-[#eee8dc] pt-10">
        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            1. Handloom Craftsmanship & Natural Variations
          </h2>
          <p>
            All sarees featured on {tenant.store_name} are authentic handcrafted textiles woven by master artisans on traditional handlooms. Because each piece is crafted manually without computerized automation, slight variations in weave density, minor thread slubs, and delicate zari edge nuances are the celebrated hallmarks of genuine handlooms rather than manufacturing defects.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            2. Silk Mark Certification & Fabric Purity
          </h2>
          <p>
            We guarantee 100% genuine natural silk base fabrics for all certified products. Each pure silk saree is accompanied by a Silk Mark verification card issued under the quality protocols of the Silk Mark Organisation of India (SMOI), ensuring you receive authentic Mulberry, Katan, Tussar, or Organza silk.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            3. Order Placement, Pricing & Inquiries
          </h2>
          <p>
            Prices displayed on the website are in Indian Rupees (INR) and include applicable domestic GST. Direct WhatsApp checkout connects you with our boutique team to confirm live stock availability, dispatch timeline, and shipping specifics before payment processing. An order is deemed confirmed once payment has been received and verified by our desk.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            4. Shipping, Transit & Insurance
          </h2>
          <p>
            Every order is dispatched in tamper-evident rigid presentation boxes. We provide complimentary domestic shipping across India with comprehensive transit insurance. International deliveries are subject to standard carrier timelines and any customs import duties levied by the destination country.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            5. Intellectual Property
          </h2>
          <p>
            All photography, typography, brand assets, weave descriptions, and editorial narratives published on this platform are the intellectual property of {tenant.store_name} and our weaving cooperatives. Any unauthorized reproduction or distribution is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#1a1918] font-normal mb-3">
            6. Contact & Grievance Redressal
          </h2>
          <p>
            For any queries, clarifications, or disputes regarding our terms, please contact our boutique desk at:
          </p>
          <div className="mt-3 p-4 rounded-xl bg-[#f7f4ed] border border-[#eee8dc] text-xs space-y-1">
            <p><strong>Boutique:</strong> {tenant.store_name}</p>
            <p><strong>WhatsApp Desk:</strong> +{(tenant.whatsapp || '919919101369').replace(/\D/g, '')}</p>
            <p><strong>Location:</strong> Varanasi Handloom Cluster, Uttar Pradesh, India</p>
          </div>
        </section>
      </div>
    </div>
  );
};
