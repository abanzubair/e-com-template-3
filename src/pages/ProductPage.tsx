import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  ArrowLeft,
  Sparkles,
  Droplets,
} from 'lucide-react';
import type { StorefrontProduct, StorefrontTenant } from '../types/storefront';
import { FALLBACK_PRODUCTS } from '../data/fallbackData';

interface ProductPageProps {
  products: StorefrontProduct[];
  tenant: StorefrontTenant;
  onAddToCart: (product: StorefrontProduct, quantity: number) => void;
  onDirectWhatsApp: (product: StorefrontProduct, inquiryType?: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  products,
  tenant: _tenant,
  onAddToCart,
  onDirectWhatsApp,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage('');
    setQuantity(1);
  }, [id]);

  const allProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;
  const product = allProducts.find(
    (p) => String(p.id) === String(id) || String(p.sku).toLowerCase() === String(id).toLowerCase()
  ) || allProducts[0];

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl text-[#1a1918]">Saree Not Found</h2>
        <p className="text-sm text-[#6c665e] mt-2">
          The requested handloom masterpiece may have been archived or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1a1918] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#332f2c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Collection</span>
        </Link>
      </div>
    );
  }

  const currentImage = selectedImage || product.image;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  // Related products from the same or nearby fabric
  const related = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };



  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#948e85] mb-8 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-[#1a1918] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/#collection" className="hover:text-[#1a1918] transition-colors">
          Collection
        </Link>
        <span>/</span>
        <span className="text-[#6c665e]">{product.fabric}</span>
        <span>/</span>
        <span className="text-[#1a1918] font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: High Resolution Visual Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#f5f2eb] border border-[#eee8dc] shadow-sm">
            <img
              src={currentImage}
              alt={product.title}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 sm:w-24 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    currentImage === img
                      ? 'border-[#8c6d3b] shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Narrative, Specs & Ordering */}
        <div className="lg:col-span-5 flex flex-col text-left">
          {/* Origin & Purity Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#8c6d3b]">
              {product.origin || 'Varanasi, India'}
            </span>
            <span className="text-[#d8d0c2]">•</span>
            <span className="text-xs font-medium text-[#948e85] uppercase tracking-wider">
              {product.weave}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1918] font-normal mt-2 leading-[1.2]">
            {product.title}
          </h1>

          {/* Pricing Row */}
          <div className="mt-4 pb-6 border-b border-[#eee8dc] flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-bold text-[#1a1918] tabular-nums">
              ₹{product.retail_price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#948e85]">
              Inclusive of all taxes & insurance
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 text-sm text-[#6c665e] leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Order Actions */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1a1918]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#d8d0c2] rounded-lg overflow-hidden text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-[#f3efe6] transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-semibold tabular-nums text-[#1a1918]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-[#f3efe6] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Primary CTA */}
            <button
              onClick={() => onDirectWhatsApp(product)}
              className="w-full flex items-center justify-center gap-2.5 bg-[#1a1918] hover:bg-[#332f2c] text-white py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#8c6d3b]" />
              <span>Instant Order on WhatsApp</span>
            </button>

            {/* Add to Bag Secondary CTA */}
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-2.5 border border-[#d8d0c2] hover:border-[#1a1918] text-[#1a1918] py-4 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.16em] transition-all bg-transparent"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Added to Boutique Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#6c665e]" />
                  <span>Add to Boutique Bag</span>
                </>
              )}
            </button>

            {/* Stylist Concierge Link */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => onDirectWhatsApp(product, 'Live Video Drape')}
                className="inline-flex items-center gap-1.5 text-xs text-[#8c6d3b] hover:text-[#6f542b] font-medium tracking-wide transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request Live Video Drape via Stylist</span>
              </button>
            </div>
          </div>

          {/* Artisan Weave Specifications Table */}
          <div className="mt-10 pt-8 border-t border-[#eee8dc]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a1918] mb-4">
              Detailed Handloom Specifications
            </h3>

            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs bg-[#f7f4ed] p-5 rounded-2xl border border-[#eee8dc]">
              <div>
                <span className="text-[#948e85] block">Fabric Composition</span>
                <strong className="text-[#1a1918] mt-0.5 block">{product.fabric || 'Pure Katan Silk'}</strong>
              </div>

              <div>
                <span className="text-[#948e85] block">Weave Craftsmanship</span>
                <strong className="text-[#1a1918] mt-0.5 block">{product.weave || 'Traditional Handloom Kadhwa'}</strong>
              </div>

              <div>
                <span className="text-[#948e85] block">Zari Specification</span>
                <strong className="text-[#1a1918] mt-0.5 block">{product.zari || 'Tested Pure Gold Zari'}</strong>
              </div>

              <div>
                <span className="text-[#948e85] block">Blouse Piece</span>
                <strong className="text-[#1a1918] mt-0.5 block">{product.blouse_piece || 'Included (0.8m pure silk)'}</strong>
              </div>

              <div>
                <span className="text-[#948e85] block">Dimensions</span>
                <strong className="text-[#1a1918] mt-0.5 block">{product.dimensions || '5.5m Saree + 0.8m Blouse'}</strong>
              </div>

              <div>
                <span className="text-[#948e85] block">Loom Crafting Time</span>
                <strong className="text-[#1a1918] mt-0.5 block">25 – 40 Working Days</strong>
              </div>
            </div>
          </div>

          {/* Saree Care & Packaging */}
          <div className="mt-8 space-y-3 text-xs text-[#6c665e]">
            <div className="flex items-start gap-2.5">
              <Droplets className="w-4 h-4 text-[#8c6d3b] shrink-0 mt-0.5" />
              <span><strong>Care Guide:</strong> Dry clean exclusively. Store wrapped in breathable unbleached muslin cloth away from dampness.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#8c6d3b] shrink-0 mt-0.5" />
              <span><strong>Silk Mark Guarantee:</strong> Accompanied by government-certified Silk Mark purity tag.</span>
            </div>

            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#8c6d3b] shrink-0 mt-0.5" />
              <span><strong>Complimentary Shipping:</strong> Dispatched in customized rigid protective presentation boxes.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Masterpieces Section */}
      {related.length > 0 && (
        <section className="mt-24 pt-16 border-t border-[#eee8dc] text-left">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1918] font-normal mb-8">
            You May Also Admire
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/product/${rel.id}`)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#f5f2eb] border border-[#eee8dc]">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] tracking-wider uppercase text-[#948e85]">
                    {rel.fabric}
                  </span>
                  <h4 className="font-serif text-base text-[#1a1918] group-hover:text-[#8c6d3b] transition-colors truncate">
                    {rel.title}
                  </h4>
                  <div className="text-xs font-semibold text-[#1a1918] tabular-nums mt-0.5">
                    ₹{rel.retail_price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
