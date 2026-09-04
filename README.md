# Atelier Banaras — Luxury Handloom Boutique Template (e-com-template-3)

A bespoke, mobile-first e-commerce boutique template engineered for authentic Indian handlooms and Varanasi heritage silk sarees. Designed following the **Impeccable Quieter, Distill, and Clarify** design principles.

---

## 🏛️ Design Philosophy & Aesthetics

- **Quieter**: Tranquil alabaster and linen palette (`#fcfbf8`), deep warm charcoal typography (`#1a1918`), muted antique brass/sepia accents (`#8c6d3b`), and airy breathing room.
- **Distill**: Pure hierarchy with unboxed editorial layouts. Zero redundant containers or nested cards.
- **Clarify**: Transparent fabric compositions, authentic weave classifications (Kadhwa, Jangla, Tanchoi, Cutwork), exact dimensions, and direct WhatsApp checkout flows.

---

## 🌟 Pages & Architecture

1. **Home (`/`)**:
   - Typographic editorial hero showcasing Varanasi handloom heritage.
   - Saree collection with real-time fabric filtering (Katan Silk, Organza, Tissue, Tanchoi, Chanderi, Tussar) and instant search.
   - Ancient pit loom heritage and artisan story.
2. **Dedicated Product Page (`/product/:id` & `/:slug/product/:id`)**:
   - Multi-angle high-resolution visual gallery with thumbnail switcher.
   - Artisan specifications table (Fabric, Weave, Zari type, Blouse piece details, Loom crafting duration).
   - Instant "Order on WhatsApp" button with pre-filled SKU & price.
   - "Add to Boutique Bag" with quantity selector.
   - Live video drape consultation launcher.
   - Curated related sarees ("You May Also Admire").
3. **Bespoke Services Page (`/services`)**:
   - Bridal Trousseau Curation.
   - Custom Pit Loom Weaving Commissions.
   - Master Saree Finishing (Hand-stitched fall, micro-rolled pico, herbal steam Charak).
   - Worldwide Insured White-Glove Dispatch (DHL/FedEx).
   - Corporate & Milestone Festive Gifting.
4. **Terms & Conditions (`/terms`)**:
   - Handloom craftsmanship nuances & natural variations.
   - Silk Mark certification guarantee.
   - Order placement, transparent pricing & WhatsApp checkout.
5. **Shipping & Returns Policy (`/shipping`)**:
   - Domestic timelines (3–5 days) & international express (7–10 days).
   - Rigid protective presentation packaging.
   - 7-day inspection and replacement guarantee.
6. **Privacy Policy (`/privacy`)**:
   - Zero-spam data protection policy for customer contact details.
7. **Contact / Concierge (`/contact`)**:
   - Varanasi atelier studio location, operating hours, and interactive inquiry form.

---

## ⚡ Multi-Tenant & Database Integration

- **Secondary Supabase Database** (`agsldsqeynzydujmijgc.supabase.co`):
  - Automatically queries `boutique_tenants` by query param (`?store=<slug>`), URL path (`/:slug`), or custom domain.
  - Queries `boutique_products` for the active boutique with custom retail prices & profit markups.
  - Asynchronously logs incoming orders and inquiries into `boutique_orders`.
- **Slide-over Shopping Bag**: Multi-item cart with persistent local storage and 1-click full-order WhatsApp checkout.
- **Live Dispatch Tracker**: Mobile number lookup querying `boutique_orders`.

---

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Compile production bundle
npm run build
```

Built with **Vite 8**, **React 19**, **TypeScript**, and **Tailwind CSS**.
