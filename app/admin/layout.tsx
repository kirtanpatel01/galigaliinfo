// app\admin\layout.tsx

import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserRole } from "@/lib/get-user-role";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const role = await getUserRole();
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}