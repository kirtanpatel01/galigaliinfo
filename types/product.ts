// types/product.ts
export type OfferType =
  | "buy-get"
  | "percentage-discount"
  | "flat-amount-discount"
  | "quantity-discount"
  | "limited-time-offer";

export interface Offer {
  id: string;
  type: OfferType;
  description: string;
  percentage?: number;
  amount?: number;
  qty?: number;
  price?: number;
  expiry?: string | null;

  // when mapping from Supabase (products(name))
  products?: { name?: string }[];
  product_name?: string;
}

type Profile = {
  fullName: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  pincode: number
  shopName: string
}

type ReviewProfile = {
  fullName: string
  username: string
  avatar: string
}

type Product = {
  id: number
  user_id: string
  name: string
  description: string
  images: string[]
  price: number;
  qty: number;
  qty_unit: string;
  qty_available: number;
  created_at: string
  offers: Offer[]
  profile: Profile | null
  isHidden: boolean
}

type Review = {
  id: number
  created_at: string
  rating: number | null
  content: string
  user_id: string
  profile?: {
    fullName: string | null
    username: string | null
    avatar: string | null
  } | null
}

type ShowcaseCardItem = {
  type?: 'shop' | 'product' | "self-pick-up" | "business";
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

type SelfPickUpsTableItem = {
  id: number;
  shopName: string;
  amount: number;
  noProducts: number;
  status: "pending" | "rejected" | "accepted" | "confirm";
};

type PickUpsTableItem = {
  id: number;
  customerName: string;
  amount: number;
  noProducts: number;
  status: "pending" | "rejected" | "accepted" | "confirm";
}

type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  qty_unit: string;
  pricePerUnit: number;
  totalPrice: number
}

type ProductTableItem = {
  id: number;
  name: string;
  stock: "available" | "unavailable";
  price: number;
  qty: number;
  qty_unit: string;
  lineTotal: number;
}

type TableProduct = {
  id: number
  name: string
  price: number
  qty: number
  qty_unit: string
}
