import { prisma } from "@grouphub/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GroupActionButtons } from "@/components/admin/group-actions";
import { DataTableToolbar } from "@/components/admin/data-table-toolbar";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { Prisma } from "@grouphub/database";
import { AdminHeader } from "@/components/admin/admin-header";

export default async function AdminCommunitiesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = (searchParams.q as string) || "";
  const verifiedFilter = searchParams.isVerified as string;
  const platformFilter = searchParams.platform as string;
  const domainFilter = searchParams.domain as string;
  const take = Number(searchParams.take) || 20;
  const skip = (page - 1) * take;

  const where: Prisma.CommunityWhereInput = {
    isVerified: true, // Chỉ hiển thị hội nhóm đã duyệt
  };
  if (q) {
    where.name = { contains: q, mode: 'insensitive' };
  }
  if (platformFilter && platformFilter !== "all") {
    where.platform = platformFilter;
  }
  if (domainFilter && domainFilter !== "all") {
    where.domain = domainFilter;
  }

  const [communities, total, distinctDomains] = await Promise.all([
    prisma.community.findMany({
      where,
      include: {
        owner: {
          select: { name: true, email: true, image: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip
    }),
    prisma.community.count({ where }),
    prisma.community.findMany({
      where: { domain: { not: null } },
      select: { domain: true },
      distinct: ['domain']
    })
  ]);

  const domainOptions = distinctDomains
    .filter(d => d.domain)
    .map(d => ({ label: d.domain as string, value: d.domain as string }));

  const totalPages = Math.ceil(total / take);

  const queryKey = JSON.stringify({ page, q, verifiedFilter, platformFilter, domainFilter, take });

  return (
    <div className="relative h-full flex flex-col">
      <AdminHeader title="Quản lý Hội nhóm" />

      <div className="p-8 space-y-4">
        <DataTableToolbar 
          searchPlaceholder="Tìm kiếm tên hội nhóm..."
          filters={[

            {
              key: "platform",
              placeholder: "Nền tảng",
              options: [
                { label: "Facebook", value: "Facebook" },
                { label: "Zalo", value: "Zalo" },
                { label: "Telegram", value: "Telegram" },
                { label: "Discord", value: "Discord" }
              ]
            }
          ]}
        />
        <div key={queryKey} className="rounded-md border bg-white dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Tên hội nhóm</TableHead>
                <TableHead className="w-[20%] text-center">Nền tảng</TableHead>
                <TableHead className="w-[15%] text-center">Trạng thái</TableHead>
                <TableHead className="w-[20%]">Người tạo</TableHead>
                <TableHead className="w-[15%] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {communities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    Không tìm thấy hội nhóm nào.
                  </TableCell>
                </TableRow>
              ) : (
                communities.map((community) => (
                  <TableRow key={community.id} className="transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-md">
                          <AvatarImage src={community.logoUrl || ""} />
                          <AvatarFallback className="bg-blue-100 text-blue-700 rounded-md">
                            {community.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                            {community.name}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {format(new Date(community.createdAt), 'dd/MM/yyyy')}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="capitalize">
                        {community.platform}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Đã duyệt
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {community.owner ? (
                           <div className="flex items-center gap-2">
                             <Avatar className="h-6 w-6">
                                <AvatarImage src={community.owner.image || ""} />
                                <AvatarFallback className="text-[10px]">{community.owner.name?.charAt(0) || "U"}</AvatarFallback>
                             </Avatar>
                             <span className="text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[120px]">{community.owner.name}</span>
                           </div>
                        ) : (
                          <span className="text-sm text-zinc-400 italic">Không rõ</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <GroupActionButtons community={community} />
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
