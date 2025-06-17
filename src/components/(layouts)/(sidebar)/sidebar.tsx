import { Brain } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { menuPrincipal } from "./sidebar-menu";
import { SidebarUser } from "./sidebar-user";
import { SidebarSection } from "./siderbar-section";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="px-4 py-2">
          <div className="flex items-center  space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CopyAI
            </h1>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarSection title="Menu principal" items={menuPrincipal} />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
