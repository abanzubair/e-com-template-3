import React from 'react';
import { MessageCircle, Eye } from 'lucide-react';
import type { StorefrontProduct } from '../types/storefront';

interface ProductCardProps {
  product: StorefrontProduct;
  onOpenDetails: (product: StorefrontProduct) => void;
  onQuickInquire: (product: StorefrontProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickInquire,
}) => {
  return (
    <div 
      className="group flex flex-col text-left cursor-pointer"
      onClick={() => onOpenDetails(product)}
    >
      {/* Visual Image Presentation */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#f5f2eb] border border-[#eee8dc]/70">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Hover Quick Actions */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="flex-1 bg-white/95 backdrop-blur-sm text-[#1a1918] text-xs font-semibold py-2.5 px-3 rounded-lg shadow-sm hover:bg-white flex items-center justify-center gap-1.5 transition-colors mr-2"
          >
            <Eye className="w-3.5 h-3.5 text-[#6c665e]" />
            <span>View Details</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickInquire(product);
            }}
            aria-label="Inquire on WhatsApp"
            className="bg-[#1a1918] text-white p-2.5 rounded-lg shadow-sm hover:bg-[#8c6d3b] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Typography & Price Details */}
      <div className="mt-4 flex flex-col">
        <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#948e85]">
          {product.fabric} • {product.weave}
        </span>

        <h3 className="font-serif text-lg text-[#1a1918] font-normal mt-1 leading-snug line-clamp-1 group-hover:text-[#8c6d3b] transition-colors">
          {product.title}
        </h3>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-semibold text-[#1a1918] tabular-nums">
            ₹{product.retail_price.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-[#948e85] font-normal">
            Tax included
          </span>
        </div>
      </div>
    </div>
  );
};
