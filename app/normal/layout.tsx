// app\normal\layout.tsx

import AdAside from "@/components/layout/ad-aside";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUserRole } from "@/lib/get-user-role";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const role = await getUserRole();
  return (
    <div>
      <SidebarProvider
        style={{
          "--sidebar-width": "12rem",
          "--sidebar-width-mobile": "14rem",
        } as React.CSSProperties}
      >
        <AppSidebar role={role} />
        <SidebarInset>
          {children}
        </SidebarInset>
        <AdAside />
      </SidebarProvider>
    </div>
  );
}