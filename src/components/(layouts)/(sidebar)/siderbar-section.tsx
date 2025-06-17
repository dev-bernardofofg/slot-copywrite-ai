"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarSectionProps {
  title: string;
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export const SidebarSection = ({ title, items }: SidebarSectionProps) => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={`${item.url === pathname ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-600 border border-blue-500/30" : "hover:bg-slate-400/50"}`}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
