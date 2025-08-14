"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={logout} className='text-red-500/80 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10'>
        <LogOut />
        <span>Logout</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
