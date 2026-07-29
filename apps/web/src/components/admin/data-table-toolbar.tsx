"use client";

import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useState, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDef {
  key: string;
  options: FilterOption[];
  placeholder: string;
}

interface DataTableToolbarProps {
  searchPlaceholder?: string;
  filters?: FilterDef[];
  // For backwards compatibility
  filterKey?: string;
  filterOptions?: FilterOption[];
  filterPlaceholder?: string;
  actionNode?: React.ReactNode;
}

export function DataTableToolbar({
  searchPlaceholder = "Tìm kiếm...",
  filters = [],
  filterKey,
  filterOptions,
  filterPlaceholder = "Lọc",
  actionNode,
}: DataTableToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("q") || "";
  
  // Merge backwards compatible filter into filters array
  const allFilters = [...filters];
  if (filterKey && filterOptions) {
    allFilters.push({
      key: filterKey,
      options: filterOptions,
      placeholder: filterPlaceholder,
    });
  }

  const [inputValue, setInputValue] = useState(currentSearch);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const updateQueryParams = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    newParams.delete("page");
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${newParams.toString()}`);
    });
  };

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateQueryParams({ q: value });
    }, 400);
  };

  const handleFilterChange = (key: string, value: string) => {
    updateQueryParams({ [key]: value });
  };

  const handleClear = () => {
    setInputValue("");
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("q");
    allFilters.forEach(f => newParams.delete(f.key));
    newParams.delete("page");
    
    startTransition(() => {
      router.push(`${pathname}?${newParams.toString()}`);
    });
  };

  const isFiltered = currentSearch !== "" || allFilters.some(f => {
    const val = searchParams.get(f.key);
    return val && val !== "all" && val !== "";
  });

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
      <div className="flex flex-wrap flex-1 items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <Input
            placeholder={searchPlaceholder}
            value={inputValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-white dark:bg-zinc-950"
          />
        </div>
        
        {allFilters.map(filter => {
          const currentFilterValue = searchParams.get(filter.key) || "all";
          return (
            <Select key={filter.key} value={currentFilterValue} onValueChange={(val) => val && handleFilterChange(filter.key, val)}>
              <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-950">
                <SelectValue placeholder={filter.placeholder}>
                  {currentFilterValue === "all" 
                    ? filter.placeholder 
                    : filter.options.find((opt) => opt.value === currentFilterValue)?.label || filter.placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {filter.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}

        <Button
          variant="outline"
          onClick={handleClear}
          className="h-9 px-3 lg:px-4 text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-950 shadow-sm"
          disabled={isPending || !isFiltered}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Đặt lại
        </Button>
      </div>
      
      {actionNode && (
        <div className="flex-shrink-0">
          {actionNode}
        </div>
      )}
    </div>
  );
}
