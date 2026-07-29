import { prisma } from "@grouphub/database";
import { AdminHeader } from "@/components/admin/admin-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ProfessionActionButtons } from "@/components/admin/profession-actions";
import { AddProfessionDialog } from "@/components/admin/add-profession-dialog";
import { DataTableToolbar } from "@/components/admin/data-table-toolbar";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { Prisma } from "@grouphub/database";

export default async function AdminProfessionsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = (searchParams.q as string) || "";
  const isActiveFilter = searchParams.isActive as string;
  const categoryFilter = searchParams.categoryId as string;
  const sortBy = searchParams.sortBy as string;
  const take = Number(searchParams.take) || 20;
  const skip = (page - 1) * take;

  const where: Prisma.ProfessionWhereInput = {};
  if (q) {
    where.name = { contains: q, mode: 'insensitive' };
  }
  if (isActiveFilter === "true") {
    where.isActive = true;
  } else if (isActiveFilter === "false") {
    where.isActive = false;
  }
  if (categoryFilter && categoryFilter !== "all") {
    where.categoryId = categoryFilter;
  }

  let orderBy: Prisma.ProfessionOrderByWithRelationInput | Prisma.ProfessionOrderByWithRelationInput[] = { createdAt: 'desc' };
  if (sortBy === "name_asc") {
    orderBy = { name: 'asc' };
  } else if (sortBy === "name_desc") {
    orderBy = { name: 'desc' };
  } else if (sortBy === "hot") {
    orderBy = { users: { _count: 'desc' } };
  }

  const [professions, total, categories] = await Promise.all([
    prisma.profession.findMany({
      where,
      orderBy,
      take,
      skip,
      include: {
        category: true,
        _count: {
          select: { users: true }
        }
      }
    }),
    prisma.profession.count({ where }),
    prisma.professionCategory.findMany({
      orderBy: { name: 'asc' } // removing isActive: true so we can filter by inactive categories too if needed
    })
  ]);

  const totalPages = Math.ceil(total / take);

  const queryKey = JSON.stringify({ page, q, isActiveFilter, categoryFilter, sortBy, take });

  return (
    <div className="relative h-full flex flex-col">
      <AdminHeader title="Ngành nghề (Chi tiết)" />

      <div className="p-8 space-y-4">
        <DataTableToolbar 
          searchPlaceholder="Tìm kiếm tên ngành nghề..."
          actionNode={<AddProfessionDialog categories={categories} />}
          filters={[
            {
              key: "sortBy",
              placeholder: "Sắp xếp",
              options: [
                { label: "Mới nhất", value: "newest" },
                { label: "Tên: A - Z", value: "name_asc" },
                { label: "Tên: Z - A", value: "name_desc" },
                { label: "Ngành nghề Hot", value: "hot" }
              ]
            },
            {
              key: "isActive",
              placeholder: "Trạng thái",
              options: [
                { label: "Đang hoạt động", value: "true" },
                { label: "Đã tắt", value: "false" }
              ]
            },
            {
              key: "categoryId",
              placeholder: "Nhóm nghề",
              options: categories.map(c => ({ label: c.name, value: c.id }))
            }
          ]}
        />
        <div key={queryKey} className="rounded-md border bg-white dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Tên Ngành nghề</TableHead>
                <TableHead className="w-[25%]">Thuộc Nhóm nghề</TableHead>
                <TableHead className="w-[15%] text-center">Số Người dùng</TableHead>
                <TableHead className="w-[10%]">Trạng thái</TableHead>
                <TableHead className="w-[15%]">Ngày tạo</TableHead>
                <TableHead className="w-[10%] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {professions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Không tìm thấy ngành nghề nào.
                  </TableCell>
                </TableRow>
              ) : (
                professions.map((profession) => (
                  <TableRow key={profession.id} className="transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <TableCell className="font-medium truncate max-w-[200px]" title={profession.name}>{profession.name}</TableCell>
                    <TableCell className="truncate max-w-[200px]" title={profession.category.name}>
                      <Badge variant="secondary" className="truncate">{profession.category.name}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {profession._count.users}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {profession.isActive ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Hoạt động</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-zinc-100 text-zinc-600 border-zinc-200">Đã tắt</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {format(new Date(profession.createdAt), 'dd MMMM, yyyy', { locale: vi })}
                    </TableCell>
                    <TableCell className="text-right">
                      <ProfessionActionButtons profession={profession} categories={categories} />
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
