import { BaseBreadcrumb } from "@/components/(bases)/base-breadcrumb";
import { AppSidebar } from "@/components/(layouts)/(sidebar)/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const LayoutPrivate = async ({ children }: { children: React.ReactNode }) => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-slate-500/20 dark:from-blue-900 dark:via-purple-900 dark:to-plate-900">
        <div className="flex flex-col px-6 py-8">
          <BaseBreadcrumb />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default LayoutPrivate;
