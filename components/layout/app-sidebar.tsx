import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

import { sidebarItemsByRole } from "@/constants/sidebarItems"
import { SidebarThemeSwitcher } from './theme-switcher'
import { createClient } from '@/lib/supabase/server'
import { LogoutButton } from '../auth/logout-button'
import Image from 'next/image'

type AppSidebarProps = {
  role: "public" | "normal" | "business" | "admin";
  className?: string;
};

async function AppSidebar({ role, className = "" }: AppSidebarProps) {
  const items = sidebarItemsByRole[role] || [];
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <Sidebar className={className} collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/">
                <Image src={'/logo.png'} alt='logo' height={48} width={48} className='w-8 h-8 rounded-full'/>
                <span className="font-sans text-lg font-bold bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Gali Gali Info</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} prefetch={true}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarSeparator /> */}

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Theme changer */}
              <SidebarMenuItem>
                <SidebarThemeSwitcher />
              </SidebarMenuItem>
              {/* Login Button */}
              {!user || role === "public"
                ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={"/auth/login"}>
                        <LogIn />
                        <span>Login</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <LogoutButton />
                )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
