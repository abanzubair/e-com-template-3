export interface StorefrontNavLink {
  id: string;
  label: string;
  url: string;
  is_active: boolean;
  is_external?: boolean;
}

export interface StorefrontHero {
  type: 'image' | 'video';
  url: string;
  poster_url?: string;
  headline?: string;
  badge?: string;
  subtitle?: string;
  primary_cta_text?: string;
  primary_cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
}

export interface StorefrontAnnouncement {
  enabled: boolean;
  text: string;
  link?: string;
}

export interface StorefrontTrustBadges {
  show_silk_mark: boolean;
  show_tested_zari: boolean;
  show_handloom_certified: boolean;
  show_direct_artisan: boolean;
}

export interface StorefrontConfig {
  reseller_id?: string;
  hero?: StorefrontHero;
  nav_links?: StorefrontNavLink[];
  announcement?: StorefrontAnnouncement;
  accent_color?: string;
  trust_badges?: StorefrontTrustBadges;
  whatsapp_greeting?: string;
}

export interface StorefrontTenant {
  id: string;
  slug: string;
  store_name: string;
  tagline: string;
  description?: string;
  whatsapp: string;
  logo_url?: string;
  banner_url?: string;
  custom_domain?: string;
  instagram_handle?: string;
  theme_color?: string;
  accent_color?: string;
  config?: StorefrontConfig;
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
