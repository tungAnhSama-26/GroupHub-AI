"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTablePaginationProps {
  totalPages: number;
  defaultTake?: number;
}

export function DataTablePagination({ totalPages, defaultTake = 20 }: DataTablePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentTake = Number(searchParams.get("take")) || defaultTake;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      router.push(createPageURL(page));
    });
  };

  const handleTakeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("take", value);
    params.set("page", "1"); // Reset to page 1 when changing size
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4 gap-4">
      <div className="flex items-center gap-2 flex-1 w-full sm:w-auto justify-center sm:justify-start">
        <span className="text-sm text-zinc-500 whitespace-nowrap">Hiển thị</span>
        <Select value={String(currentTake)} onValueChange={(val) => val && handleTakeChange(val)}>
          <SelectTrigger className="h-8 w-[70px] bg-white dark:bg-zinc-950">
            <SelectValue placeholder={String(currentTake)} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 50, 100].map(size => (
              <SelectItem key={size} value={String(size)}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-zinc-500 whitespace-nowrap hidden sm:inline">dòng / trang</span>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1 || isPending}
          title="Trang đầu"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPending}
          title="Trang trước"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={index} className="px-2 text-zinc-500">
                ...
              </span>
            );
          }
          const pageNum = page as number;
          return (
            <Button
              key={index}
              variant={currentPage === pageNum ? "default" : "outline"}
              className={`h-8 w-8 p-0 ${currentPage === pageNum ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
              onClick={() => handlePageChange(pageNum)}
              disabled={isPending}
            >
              {pageNum}
            </Button>
          );
        })}

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isPending}
          title="Trang tiếp"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || isPending}
          title="Trang cuối"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
