"use client";

import {
  Clock,
  FileText,
  LayoutDashboard,
  MessageCircle,
  MessageSquare,
} from "lucide-react";

export const menuPrincipal = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: MessageSquare,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: FileText,
  },
  {
    title: "History",
    url: "/history",
    icon: Clock,
  },
];
