import { prisma } from "@grouphub/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { PendingUserActionButtons } from "@/components/admin/pending-user-actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DataTableToolbar } from "@/components/admin/data-table-toolbar";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { Prisma } from "@grouphub/database";
import { AdminHeader } from "@/components/admin/admin-header";

export default async function ApproveUsersPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const currentUserId = session?.user?.id;

  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = (searchParams.q as string) || "";
  const take = Number(searchParams.take) || 20;
  const skip = (page - 1) * take;

  const where: Prisma.UserWhereInput = {
    isApproved: false, // Chỉ hiển thị người dùng chưa được duyệt
  };
  
  if (q) {
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } }
    ];
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

  const queryKey = JSON.stringify({ page, q, take });

  return (
    <div className="relative h-full flex flex-col">
      <AdminHeader title="Duyệt Người dùng" />

      <div className="p-8 space-y-4">
        <DataTableToolbar 
          searchPlaceholder="Tìm kiếm tên hoặc email..."
        />
        <div key={queryKey} className="rounded-md border bg-white dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Người dùng</TableHead>
                <TableHead className="w-[20%] text-center">Trạng thái</TableHead>
                <TableHead className="w-[20%]">Ngày đăng ký</TableHead>
                <TableHead className="w-[30%] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    Không có tài khoản nào cần duyệt.
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
                      <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">
                        Chờ duyệt
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {format(new Date(user.createdAt), 'dd MMMM, yyyy', { locale: vi })}
                    </TableCell>
                    <TableCell className="text-right">
                      <PendingUserActionButtons user={user} currentUserId={currentUserId} />
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
