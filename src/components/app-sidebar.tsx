"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Home", href: "/", short: "H" },
  { title: "Dashboard", href: "/dashboard", short: "D" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <div className="mb-4 flex items-center gap-3 px-2 py-2">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white">
            S
          </span>
          {open ? <span className="text-sm font-semibold text-slate-900">Saat Admin BO</span> : null}
        </div>

        <SidebarGroup>
          {open ? <SidebarGroupLabel>Menu</SidebarGroupLabel> : null}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} className="gap-3">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-200 text-xs font-semibold text-slate-700">
                        {item.short}
                      </span>
                      {open ? <span>{item.title}</span> : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
