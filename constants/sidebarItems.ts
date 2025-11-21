// constants/sidebarItems.ts
import { Home, ShoppingBag, HandCoinsIcon, User2Icon, Settings, Shield, Megaphone } from "lucide-react";

export const sidebarItemsByRole = {
  public: [
    { title: "Home", url: "/", icon: Home },
    // { title: "Shops", url: "/shops", icon: ShoppingBag },
    // { title: "Assets", url: "/assets", icon: LandPlot },
  ],
  normal: [
    { title: "Home", url: "/", icon: Home },
    // { title: "Shops", url: "/shops", icon: ShoppingBag },
    { title: "Self Pick-Up", url: "/normal/self-pick-up", icon: HandCoinsIcon },
    // { title: "Assets", url: "/assets", icon: LandPlot },
    { title: "Profile", url: "/normal/profile", icon: User2Icon },
  ],
  business: [
    { title: "Dashboard", url: "/business/dashboard", icon: Home },
    { title: "My Listings", url: "/business/listings", icon: ShoppingBag },
    { title: "Orders", url: "/business/orders", icon: HandCoinsIcon },
    { title: "Marketing", url: "/business/marketing", icon: Megaphone },
    { title: "Profile", url: "/business/profile", icon: User2Icon },
  ],
  admin: [
    { title: "Admin Panel", url: "/admin/dashboard", icon: Shield },
    { title: "Manage Users", url: "/admin/users", icon: User2Icon },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ],
} as const;