export type MetalType =
  | "18KT Gold"
  | "22KT Gold"
  | "14KT Gold"
  | "Rose Gold"
  | "Platinum"
  | "925 Silver";

export type GemstoneType =
  | "Solitaire Diamond"
  | "Pavé Diamond"
  | "Emerald"
  | "Ruby"
  | "South Sea Pearl"
  | "Polki"
  | "None";

export type ProductCategory =
  | "rings"
  | "necklaces"
  | "earrings"
  | "bracelets"
  | "pendants"
  | "mens"
  | "gifts"
  | "stacks";

export type ProductStyle =
  | "Solitaire"
  | "Minimalist"
  | "Cocktail"
  | "Traditional"
  | "Stacking"
  | "Modern";

export type ProductAvailability = "in-stock" | "ready-to-ship" | "made-to-order";

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  category: ProductCategory;
  subcategory: string;
  primaryImage: string;
  secondaryImage?: string;
  images?: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  material: string; // e.g. "18KT Yellow Gold", "22KT Pure Gold", "14KT Rose Gold"
  metal: MetalType;
  karat: "14KT" | "18KT" | "22KT" | "925" | "Platinum";
  purity: string; // e.g. "18KT BIS Hallmarked"
  colour: string; // e.g. "Yellow Gold", "Rose Gold", "White Gold", "Dual Tone"
  style: ProductStyle;
  availability: ProductAvailability;
  badge?: "New" | "Bestseller" | "Sale" | "Curated Stack" | "Hallmarked" | "Limited";
  grossWeight?: string; // e.g. "3.42 g"
  diamondSpec?: string; // e.g. "0.52 ct • VVS1 • EF Color"
  isReadyToShip?: boolean;
  isNewArrival?: boolean;
  isGiftPick?: boolean;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMetal?: string;
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating";

export interface FilterState {
  category: string;
  priceRange: [number, number];
  materials: string[];
  colours: string[];
  styles: string[];
  availabilities: string[];
}
