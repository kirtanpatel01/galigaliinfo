export type UserProfile = {
  username: string;
  fullName: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  role?: "business" | "normal" 
}