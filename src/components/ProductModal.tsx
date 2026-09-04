import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Check, Shield, Truck } from 'lucide-react';
import type { StorefrontProduct } from '../types/storefront';

interface ProductModalProps {
  product: StorefrontProduct | null;
  onClose: () => void;
  onAddToCart: (product: StorefrontProduct) => void;
  onDirectWhatsApp: (product: StorefrontProduct) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectWhatsApp,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentImage = selectedImage || product.image;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      <div 
        className="relative bg-[#fcfbf8] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#eee8dc]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1a1918] shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Visual Gallery */}
          <div className="p-6 sm:p-8 bg-[#f5f2eb]/60 flex flex-col justify-between">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#eee8dc]">
              <img
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      currentImage === img ? 'border-[#8c6d3b]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Specifications & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div>
              <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#8c6d3b]">
                {product.origin || 'Varanasi, India'}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#1a1918] font-normal mt-1 leading-tight">
                {product.title}
              </h2>

              {/* Price Line */}
              <div className="mt-4 flex items-baseline gap-3 pb-6 border-b border-[#eee8dc]">
                <span className="text-3xl font-bold text-[#1a1918] tabular-nums">
                  ₹{product.retail_price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#948e85] uppercase tracking-wider">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-[#6c665e] leading-relaxed">
                {product.description}
              </p>

              {/* Verified Weave Specifications Table */}
              <div className="mt-6 bg-[#f7f4ed] rounded-xl p-4 border border-[#eee8dc] text-xs">
                <h4 className="font-semibold uppercase tracking-wider text-[#1a1918] mb-3">
                  Artisan Specifications
                </h4>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-[#6c665e]">
                  <div>
                    <span className="text-[#948e85] block">Fabric</span>
                    <strong className="text-[#1a1918]">{product.fabric || 'Pure Katan Silk'}</strong>
                  </div>
                  <div>
                    <span className="text-[#948e85] block">Weave Technique</span>
                    <strong className="text-[#1a1918]">{product.weave || 'Handloom Kadhwa'}</strong>
                  </div>
                  <div>
                    <span className="text-[#948e85] block">Zari Type</span>
                    <strong className="text-[#1a1918]">{product.zari || 'Tested Pure Gold Zari'}</strong>
                  </div>
                  <div>
                    <span className="text-[#948e85] block">Blouse Piece</span>
                    <strong className="text-[#1a1918]">{product.blouse_piece || 'Included (0.8m Silk)'}</strong>
                  </div>
                </div>
              </div>

              {/* Quiet Assurance Badges */}
              <div className="mt-6 flex flex-col gap-2 text-xs text-[#6c665e]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#8c6d3b] shrink-0" />
                  <span>100% Certified Pure Silk Guarantee with Silk Mark seal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8c6d3b] shrink-0" />
                  <span>Insured transit with specialized tamper-evident saree packaging</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#eee8dc] flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onDirectWhatsApp(product)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1a1918] hover:bg-[#332f2c] text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#8c6d3b]" />
                <span>Order on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center justify-center gap-2 border border-[#d8d0c2] hover:border-[#1a1918] text-[#1a1918] py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition-all"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
