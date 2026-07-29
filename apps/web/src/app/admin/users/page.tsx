import { prisma } from "@grouphub/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { UserActionButtons } from "@/components/admin/user-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DataTableToolbar } from "@/components/admin/data-table-toolbar";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { Prisma } from "@grouphub/database";

import { AdminHeader } from "@/components/admin/admin-header";

export default async function AdminUsersPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserId = session?.user?.id;

  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = (searchParams.q as string) || "";
  const roleFilter = searchParams.role as string;
  const statusFilter = searchParams.status as string;
  const take = Number(searchParams.take) || 20;
  const skip = (page - 1) * take;

  const where: Prisma.UserWhereInput = {
    isApproved: true, // Chỉ hiển thị người dùng đã được duyệt
  };
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } }
    ];
  }
  if (roleFilter && roleFilter !== "all") {
    // @ts-expect-error roleFilter might not perfectly match enum Role without casting
    where.role = roleFilter;
  }
  if (statusFilter && statusFilter !== "all") {
    if (statusFilter === "BANNED") {
      where.isBanned = true;
    } else if (statusFilter === "APPROVED") {
      where.isBanned = false;
    }
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take,
      skip
    }),
    prisma.user.count({ where })
  ]);

  const totalPages = Math.ceil(total / take);

  const queryKey = JSON.stringify({ page, q, roleFilter, statusFilter, take });

  return (
    <div className="relative h-full flex flex-col">
      <AdminHeader title="Quản lý Người dùng" />

      <div className="p-8 space-y-4">
        <DataTableToolbar 
          searchPlaceholder="Tìm kiếm tên hoặc email..."
          filters={[
            {
              key: "role",
              placeholder: "Vai trò",
              options: [
                { label: "Quản trị viên", value: "ADMIN" },
                { label: "Người dùng", value: "USER" },
              ]
            },
            {
              key: "status",
              placeholder: "Trạng thái",
              options: [
                { label: "Hoạt động", value: "APPROVED" },
                { label: "Đã khóa", value: "BANNED" },
              ]
            }
          ]}
        />
        <div key={queryKey} className="rounded-md border bg-white dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Người dùng</TableHead>
                <TableHead className="w-[20%] text-center">Vai trò</TableHead>
                <TableHead className="w-[15%] text-center">Trạng thái</TableHead>
                <TableHead className="w-[20%]">Ngày tham gia</TableHead>
                <TableHead className="w-[15%] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Không có dữ liệu.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.image || ""} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">
                            {user.name || "Chưa cập nhật tên"}
                          </span>
                          <span className="text-sm text-zinc-500 dark:text-zinc-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={user.role === "ADMIN" ? "default" : user.role === "MODERATOR" ? "secondary" : "outline"} className={user.role === "ADMIN" ? "bg-blue-600 hover:bg-blue-700" : ""}>
                        {user.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.isBanned ? (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Đã khóa</Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                          Hoạt động
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {format(new Date(user.createdAt), 'dd MMMM, yyyy', { locale: vi })}
                    </TableCell>
                    <TableCell className="text-right">
                      <UserActionButtons user={user} currentUserId={currentUserId} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination totalPages={totalPages} />
      </div>
    </div>
  );
}
