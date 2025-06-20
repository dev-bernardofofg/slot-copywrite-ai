"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export const BaseBreadcrumb = () => {
  const pathname = usePathname();

  const pathnames = pathname?.split("/").filter((item) => item);

  const translate = (path: string) => {
    switch (path) {
      case "dashboard":
        return "Dashboard";
      case "chat":
        return "Chat";
      case "conversations":
        return "Conversations";
      case "templates":
        return "Templates";
      case "history":
        return "History";
      default:
        return path;
    }
  };

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Menu Principal</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primary" />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components" className="text-primary">
            {translate(pathnames?.[0] ?? "")}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
