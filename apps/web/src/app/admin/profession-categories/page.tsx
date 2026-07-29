import { prisma } from "@grouphub/database";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CategoryActionButtons } from "@/components/admin/category-actions";
import { AddCategoryDialog } from "@/components/admin/add-category-dialog";
import { DataTableToolbar } from "@/components/admin/data-table-toolbar";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { Prisma } from "@grouphub/database";

import { AdminHeader } from "@/components/admin/admin-header";

export default async function AdminProfessionCategoriesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = (searchParams.q as string) || "";
  const isActiveFilter = searchParams.isActive as string;
  const sortBy = searchParams.sortBy as string;
  const take = Number(searchParams.take) || 10;
  const skip = (page - 1) * take;

  const where: Prisma.ProfessionCategoryWhereInput = {};
  if (q) {
    where.name = { contains: q, mode: 'insensitive' };
  }
  if (isActiveFilter === "true") {
    where.isActive = true;
  } else if (isActiveFilter === "false") {
    where.isActive = false;
  }

  let orderBy: Prisma.ProfessionCategoryOrderByWithRelationInput | Prisma.ProfessionCategoryOrderByWithRelationInput[] = { createdAt: 'desc' };
  if (sortBy === "name_asc") {
    orderBy = { name: 'asc' };
  } else if (sortBy === "name_desc") {
    orderBy = { name: 'desc' };
  } else if (sortBy === "hot") {
    orderBy = { professions: { _count: 'desc' } };
  }

  const [categories, total] = await Promise.all([
    prisma.professionCategory.findMany({
      where,
      orderBy,
      take,
      skip,
      include: {
        _count: {
          select: { professions: true }
        }
      }
    }),
    prisma.professionCategory.count({ where })
  ]);

  const totalPages = Math.ceil(total / take);

  const queryKey = JSON.stringify({ page, q, isActiveFilter, sortBy, take });

  return (
    <div className="relative h-full flex flex-col">
      <AdminHeader title="Nhóm nghề Ngành nghề" />

      <div className="p-8 space-y-4">
        <DataTableToolbar 
          searchPlaceholder="Tìm kiếm tên nhóm nghề..."
          actionNode={<AddCategoryDialog />}
          filters={[
            {
              key: "sortBy",
              placeholder: "Sắp xếp",
              options: [
                { label: "Mới nhất", value: "newest" },
                { label: "Tên: A - Z", value: "name_asc" },
                { label: "Tên: Z - A", value: "name_desc" },
                { label: "Nhóm nghề Hot", value: "hot" }
              ]
            },
            {
              key: "isActive",
              placeholder: "Trạng thái",
              options: [
                { label: "Đang hoạt động", value: "true" },
                { label: "Đã tắt", value: "false" }
              ]
            }
          ]}
        />
        <div key={queryKey} className="rounded-md border bg-white dark:bg-zinc-950 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Tên Nhóm nghề</TableHead>
                <TableHead className="w-[30%]">Mô tả</TableHead>
                <TableHead className="w-[15%] text-center">Số Ngành nghề</TableHead>
                <TableHead className="w-[10%]">Trạng thái</TableHead>
                <TableHead className="w-[15%]">Ngày tạo</TableHead>
                <TableHead className="w-[10%] text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Không tìm thấy nhóm nghề nào.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id} className="transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <TableCell className="font-medium truncate max-w-[200px]" title={category.name}>{category.name}</TableCell>
                    <TableCell className="truncate max-w-[250px] text-zinc-500" title={category.description || ""}>
                      {category.description || "Không có mô tả"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {category._count.professions}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {category.isActive ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Hoạt động</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-zinc-100 text-zinc-600 border-zinc-200">Đã tắt</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {format(new Date(category.createdAt), 'dd MMMM, yyyy', { locale: vi })}
                    </TableCell>
                    <TableCell className="text-right">
                      <CategoryActionButtons category={category} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination totalPages={totalPages} defaultTake={10} />
      </div>
    </div>
  );
}
