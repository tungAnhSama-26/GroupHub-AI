import React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@grouphub/database";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  // Fetch the latest user from the DB to ensure role is up-to-date
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (currentUser?.isBanned) {
    redirect("/"); // or "/banned" if they have a specific page
  }

  if (currentUser?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto relative w-full h-full">
        {children}
      </main>
    </div>
  );
}
