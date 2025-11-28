export type UserProfile = {
  username: string;
  fullName: string;
  phone: string;
  avatar?: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  role?: "business" | "normal";
};

// Input type for creating profile
export type ProfileInsert = UserProfile;
