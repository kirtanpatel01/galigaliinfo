// app\normal\layout.tsx

import AdAside from "@/components/layout/ad-aside";
import AppSidebar from "@/components/layout/app-sidebar";
import SiteHeader from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUserRole } from "@/lib/get-user-role";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getUserRole();
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
      <AdAside />
    </SidebarProvider>
  );
}
