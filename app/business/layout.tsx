// app\business\layout.tsx

import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUserRole } from "@/lib/get-user-role";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const role = await getUserRole();
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "11rem",
        "--sidebar-width-mobile": "14rem",
      } as React.CSSProperties}
    >
      <AppSidebar role={role} />
      <SidebarInset>
        {/* <SidebarTrigger /> */}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}