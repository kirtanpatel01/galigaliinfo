type ShowcaseCardItem = {
  id: string
  image: string
  title: string
  shopName: string
  rating: number
  address: string
  timeAgo?: string
}

type SelfPickUpsTableItem = {
  id: string;
  shopName: string;
  amount: number;
  noProducts: number;
  status: "pending" | "rejected" | "accepted" | "confirm";
}

type PickUpsTableItem = {
  id: string;
  customerName: string;
  amount: number;
  noProducts: number;
  status: "pending" | "rejected" | "accepted" | "confirm";
}

type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number
}

type ProductTableItem = {
  id: string;
  productName: string;
  stock: "available" | "unavailable";
  price: number;
  qty: number;
  unit: string;
}

type OrderProductItem = {
  id: string;
  productName: string;
  qty: number;
  unit: string;
  price: number;
}

type AdItem = {
  id: string;
  productName: string;
  clicks: number;
  views: number;
}