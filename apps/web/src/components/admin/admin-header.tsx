import React from "react";
import { AdminHeaderActions } from "@/components/admin/admin-header-actions";

interface AdminHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function AdminHeader({ title, description, children }: AdminHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{title}</h1>
        {description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {children}
        <AdminHeaderActions />
      </div>
    </div>
  );
}
