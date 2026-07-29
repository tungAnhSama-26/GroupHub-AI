"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProfession } from "@/app/admin/actions";
import { useTransition } from "react";
import Swal from "sweetalert2";
import { ProfessionCategory } from "@grouphub/database";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AddProfessionDialog({ categories }: { categories: ProfessionCategory[] }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;

    const nameRegex = /^[\p{L}\p{N}\s\-_.]+$/u;
    if (!nameRegex.test(name)) {
      Swal.fire({
        title: "Dữ liệu không hợp lệ",
        text: "Tên ngành nghề không được chứa ký tự đặc biệt.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    if (description && !/^[\p{L}\p{N}\s\-_.!?,()"']+$/u.test(description)) {
      Swal.fire({
        title: "Dữ liệu không hợp lệ",
        text: "Mô tả chứa các ký tự đặc biệt không được phép.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    if (!categoryId) {
      Swal.fire({
        title: "Dữ liệu không hợp lệ",
        text: "Vui lòng chọn nhóm nghề cho ngành nghề này.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    Swal.fire({
      title: 'Xác nhận lưu',
      text: "Bạn có chắc chắn muốn thêm ngành nghề này?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await createProfession(name, description, categoryId);
          if (res.success) {
            Swal.fire({
              title: "Thành công!",
              text: res.message,
              icon: "success",
              confirmButtonColor: "#2563eb",
            });
            setOpen(false);
          } else {
            Swal.fire({
              title: "Thất bại!",
              text: res.message,
              icon: "error",
              confirmButtonColor: "#dc2626",
            });
          }
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Thêm Ngành nghề
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm Ngành nghề</DialogTitle>
            <DialogDescription>
              Tạo một ngành nghề cụ thể thuộc một nhóm nghề có sẵn.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryId" className="text-right">
                Nhóm nghề <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Select name="categoryId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm nghề" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên ngành <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="name" 
                name="name" 
                className="col-span-3" 
                placeholder="VD: Frontend Developer"
                required 
                minLength={3}
                maxLength={50}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Mô tả
              </Label>
              <Input 
                id="description" 
                name="description" 
                className="col-span-3" 
                placeholder="Mô tả ngắn gọn..."
                maxLength={200}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
              {isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
