"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Settings,
  UserCheck,
  ShieldCheck,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Tổng quan",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Người dùng",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Nhóm nghề Ngành nghề",
    icon: Layers,
    href: "/admin/profession-categories",
  },
  {
    title: "Ngành nghề",
    icon: Layers,
    href: "/admin/professions",
  },
  {
    title: "Hội nhóm",
    icon: MessageSquare,
    href: "/admin/groups",
  },
  {
    title: "Duyệt người dùng",
    icon: UserCheck,
    href: "/admin/users/approve",
  },
  {
    title: "Duyệt hội nhóm",
    icon: ShieldCheck,
    href: "/admin/groups/approve",
  },
  {
    title: "Lịch sử hoạt động",
    icon: History,
    href: "/admin/users/history",
  },
  {
    title: "Cài đặt",
    icon: Settings,
    href: "/admin/settings",
  }
];

export function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const activeHref = menuItems.reduce((longest, item) => {
    if (item.href === '/admin') {
      if (pathname === '/admin') return item.href;
    } else {
      if (pathname === item.href || pathname.startsWith(item.href + '/')) {
        if (item.href.length > longest.length) return item.href;
      }
    }
    return longest;
  }, "");

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-white dark:bg-zinc-950 transition-all duration-300 ease-in-out h-screen shrink-0",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b shrink-0">
        {!isCollapsed && (
          <img src="/logo.png" alt="GroupHub AI Logo" className="h-8 w-auto object-contain" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8 ml-auto text-zinc-500", isCollapsed && "mx-auto ml-0")}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-2 px-3">
          {menuItems.map((item) => {
            const isActive = item.href === activeHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                  isCollapsed && "justify-center px-0"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-blue-600 dark:text-blue-400" : "group-hover:text-zinc-900 dark:group-hover:text-zinc-50")} />
                {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

    </aside>
  );
}
