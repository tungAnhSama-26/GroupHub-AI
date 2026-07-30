import { prisma } from "@grouphub/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableToolbar } from "@/components/admin/data-table-toolbar";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { Prisma } from "@grouphub/database";
import { AdminHeader } from "@/components/admin/admin-header";

const ACTION_MAP: Record<string, string> = {
  VERIFY_COMMUNITY: "Kiểm duyệt hội nhóm",
  CREATE_COMMUNITY: "Tạo hội nhóm",
  APPROVE_USER: "Duyệt thành viên",
  REJECT_USER: "Từ chối thành viên",
  TOGGLE_USER_ROLE: "Đổi quyền quản trị",
  UPDATE_USER_ROLE: "Cập nhật quyền",
  TOGGLE_USER_BAN: "Khóa tài khoản",
  LOGIN: "Đăng nhập",
  REGISTER: "Đăng ký mới",
  CHAT_AI: "Trò chuyện AI",
};

function formatDetails(details: string | null) {
  if (!details) return "-";
  // Xóa sạch UUID (32 ký tự hexa có gạch ngang) khỏi chuỗi chi tiết
  return details.replace(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi, "").trim();
}

function getActionColor(action: string) {
  if (action.includes("VERIFY") || action.includes("APPROVE")) return "bg-green-100 text-green-700";
  if (action.includes("REJECT") || action.includes("BAN") || action.includes("DELETE")) return "bg-red-100 text-red-700";
  if (action.includes("UPDATE") || action.includes("TOGGLE")) return "bg-blue-100 text-blue-700";
  return "bg-zinc-100 text-zinc-700";
}

export default async function UserHistoryPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = (searchParams.q as string) || "";
  const take = Number(searchParams.take) || 20;
  const skip = (page - 1) * take;

  const where: Prisma.UserActivityWhereInput = {};
  
  if (q) {
    where.OR = [
      { user: { name: { contains: q, mode: 'insensitive' } } },
      { user: { email: { contains: q, mode: 'insensitive' } } },
      { action: { contains: q, mode: 'insensitive' } }
    ];
  }

  const [activities, total] = await Promise.all([
    prisma.userActivity.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true, image: true, role: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip
    }),
    prisma.userActivity.count({ where })
  ]);

  const totalPages = Math.ceil(total / take);

  const queryKey = JSON.stringify({ page, q, take });

  return (
    <div className="relative h-full flex flex-col">
      <AdminHeader title="Lịch sử hoạt động" />

      <div className="p-8 space-y-4">
        <DataTableToolbar 
          searchPlaceholder="Tìm người dùng hoặc hành động..."
        />
        <div key={queryKey} className="rounded-md border bg-white dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Người dùng</TableHead>
                <TableHead className="w-[20%]">Hành động</TableHead>
                <TableHead className="w-[30%]">Chi tiết</TableHead>
                <TableHead className="w-[20%]">Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    Chưa có lịch sử hoạt động nào được ghi nhận.
                  </TableCell>
                </TableRow>
              ) : (
                activities.map((activity) => (
                  <TableRow key={activity.id} className="transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={activity.user.image || ""} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {activity.user.name?.charAt(0)?.toUpperCase() || activity.user.email.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                            {activity.user.name || "Chưa cập nhật tên"}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {activity.user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`font-medium border-0 ${getActionColor(activity.action)}`}>
                        {ACTION_MAP[activity.action] || activity.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="line-clamp-2" title={activity.details || ""}>
                        {formatDetails(activity.details)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                          {format(new Date(activity.createdAt), 'HH:mm', { locale: vi })} - {format(new Date(activity.createdAt), 'dd/MM/yyyy', { locale: vi })}
                        </span>
                        <span className="text-zinc-400 text-xs mt-0.5">IP: {activity.ipAddress}</span>
                      </div>
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
