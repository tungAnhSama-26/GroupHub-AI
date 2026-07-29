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
import { createProfessionCategory } from "@/app/admin/actions";
import { useTransition } from "react";
import Swal from "sweetalert2";

export function AddCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const nameRegex = /^[\p{L}\p{N}\s\-_.]+$/u;
    if (!nameRegex.test(name)) {
      Swal.fire({
        title: "Dữ liệu không hợp lệ",
        text: "Tên nhóm nghề không được chứa ký tự đặc biệt (chỉ cho phép chữ, số, khoảng trắng, gạch ngang và dấu chấm).",
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

    Swal.fire({
      title: 'Xác nhận lưu',
      text: "Bạn có chắc chắn muốn thêm nhóm nghề này?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await createProfessionCategory(name, description);
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
          <Plus className="mr-2 h-4 w-4" /> Thêm Nhóm nghề
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm Nhóm nghề Mới</DialogTitle>
            <DialogDescription>
              Tạo một nhóm nghề ngành nghề mới cho hệ thống.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên nhóm nghề <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="name" 
                name="name" 
                className="col-span-3" 
                placeholder="VD: Công nghệ thông tin"
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
                placeholder="Mô tả ngắn gọn về ngành nghề..."
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
