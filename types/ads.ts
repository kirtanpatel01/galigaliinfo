// types/ad.ts
export type AdItem = {
  id: number;
  created_at: string;
  user_id: string;
  product_id: number;
  image: string | null;
  views: number | null;
  clicks: number | null;
  product_name?: string; // if we join with products
};

export type RawAdWithProduct = {
  id: number;
  created_at: string;
  user_id: string;
  product_id: number;
  image: string | null;
  views: number | null;
  clicks: number | null;
  products: {
    name: string | null;
  } | null;
};

export type RawAdWithProductFull = {
  id: number;
  image: string | null;
  views: number | null;
  clicks: number | null;
  products: {
    id: number;
    name: string | null;
  } | null;
};
