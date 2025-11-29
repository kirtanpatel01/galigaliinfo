// types/product.ts
export type OfferType =
  | "buy-get"
  | "percentage-discount"
  | "flat-amount-discount"
  | "quantity-discount"
  | "limited-time-offer";

export interface Offer {
  id: number;
  type: OfferType;
  description: string | null;
  percentage?: number | null;
  amount?: number | null;
  qty?: number | null;
  price?: number | null;
  expiry?: string | null;

  products?: { name?: string }[];
  product_name?: string;
}

export type Profile = {
  fullName: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pincode: number | null;
  shopName: string | null;
};

export type ReviewProfile = {
  fullName: string;
  username: string;
  avatar: string;
};

export type Product = {
  id: number;
  user_id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  qty: number;
  qty_unit: string;
  qty_available: number;
  created_at: string;
  offers: Offer[];
  profile: Profile | null;
  isHidden: boolean;
  avgRating?: number;
};

export type RawProduct = {
  id: number;
  user_id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  qty: number;
  qty_unit: string;
  qty_available: number;
  created_at: string;
  isHidden: boolean;

  offers: {
    id: number;
    type: OfferType;
    description: string | null;
    percentage: number | null;
    amount: number | null;
    qty: number | null;
    price: number | null;
    expiry: string | null;
  }[];

  profile: {
    fullName: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: number | null;
    shopName: string | null;
  } | null; // Supabase returns object or null
};


export type ProductWithOffers = {
  id: number;
  name: string;
  description: string;
  images: string[];
  created_at: string;
  isHidden: boolean;
  user_id: string;
  avgRating: number;

  offers: {
    id: number;
    type: OfferType;
    description: string | null;
    percentage: number | null;
    amount: number | null;
    qty: number | null;
    price: number | null;
    expiry: string | null;
  }[];

  profile: {
    fullName: string | null;
    phone: string | null;
    address: string | null;
    shopName: string | null;
  }[];

  reviews: {
    rating: number | null;
  }[];
};

export type RawReview = {
  id: number;
  rating: number | null;
  content: string;
  user?: { fullName: string | null }[] | null;
  product?: { name: string | null }[] | null;
};

export type Review = {
  id: number;
  rating: number | null;
  content: string;
  user: string; // flattened name
  product: string; // flattened name
};

export type DBReview = {
  id: number;
  created_at: string;
  rating: number | null;
  content: string;
  user_id: string;
  profile?: {
    fullName: string | null;
    username: string | null;
    avatar: string | null;
  } | null;
};

export type ProductSummaryReview = {
  rating: number | null;
};

export type ShowcaseCardItem = {
  type?: "shop" | "product" | "self-pick-up" | "business";
  id: number;
  image?: string;
  title: string;
  shopName: string;
  fullName?: string;
  address: string;
  rating?: number;
  timeAgo?: string;
  isHidden?: boolean;
  shopPhoto?: string;
};

export type SelfPickUpsTableItem = {
  id: number;
  shopName: string;
  amount: number;
  noProducts: number;
  status: "pending" | "rejected" | "accepted" | "confirm";
};

export type PickUpsTableItem = {
  id: number;
  customerName: string;
  amount: number;
  noProducts: number;
  status: "pending" | "rejected" | "accepted" | "confirm";
};

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  qty_unit: string;
  pricePerUnit: number;
  totalPrice: number;
};

export type ProductTableItem = {
  id: number;
  name: string;
  stock: "available" | "unavailable";
  price: number;
  qty: number;
  qty_unit: string;
  lineTotal: number;
};
