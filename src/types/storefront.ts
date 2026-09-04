export interface StorefrontTenant {
  id: string;
  slug: string;
  store_name: string;
  tagline: string;
  description?: string;
  whatsapp: string;
  logo_url?: string;
  custom_domain?: string;
  instagram_handle?: string;
  theme_color?: string;
}

export interface StorefrontProduct {
  id: string;
  tenant_id?: string;
  original_product_id?: string;
  sku: string;
  title: string;
  description: string;
  price: number;
  base_price?: number;
  retail_price: number;
  image: string;
  images: string[];
  category: string;
  fabric: string;
  weave: string;
  origin: string;
  color?: string;
  is_published?: boolean;
  zari?: string;
  blouse_piece?: string;
  dimensions?: string;
  created_at?: string;
}

export interface CartItem {
  product: StorefrontProduct;
  quantity: number;
}
