"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit, RefreshCcw } from "lucide-react";
import { toggleProfessionCategoryStatus, updateProfessionCategory } from "@/app/admin/actions";
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
import Swal from "sweetalert2";
import { format } from "date-fns";
import { ProfessionCategory } from "@grouphub/database";

export function CategoryActionButtons({ category }: { category: ProfessionCategory }) {
  const [isPending, startTransition] = useTransition();
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await toggleProfessionCategoryStatus(category.id, category.isActive);
      if (result.success) {
        Swal.fire({
          title: "Thành công!",
          text: result.message,
          icon: "success",
          confirmButtonColor: "#2563eb",
          timer: 2000,
          showConfirmButton: false
        }); 
      } else {
        Swal.fire({
          title: "Thất bại!",
          text: result.message,
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      }
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const nameRegex = /^[\p{L}\p{N}\s\-_.]+$/u;
    if (!nameRegex.test(name)) {
      Swal.fire({
        title: "Dữ liệu không hợp lệ",
        text: "Tên ngành nghề không được chứa ký tự đặc biệt (chỉ cho phép chữ, số, khoảng trắng, gạch ngang và dấu chấm).",
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
      title: 'Xác nhận cập nhật',
      text: "Bạn có chắc chắn muốn lưu thay đổi cho nhóm nghề này?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await updateProfessionCategory(category.id, name, description);
          if (res.success) {
            Swal.fire({
              title: "Cập nhật thành công!",
              text: res.message,
              icon: "success",
              confirmButtonColor: "#2563eb",
            });
            setOpenEdit(false);
          } else {
            Swal.fire({
              title: "Cập nhật thất bại!",
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
    <div className="flex justify-end gap-2">
      {/* Nút Xem */}
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-teal-600 border-teal-200 bg-teal-50 hover:bg-teal-100 hover:text-teal-700">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chi tiết Ngành nghề</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div>
              <h4 className="text-sm font-medium text-zinc-500 mb-1">Tên ngành nghề</h4>
              <p className="text-base text-zinc-900 font-semibold">{category.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-500 mb-1">Mô tả</h4>
              <p className="text-sm text-zinc-800 bg-zinc-50 p-3 rounded-md border">{category.description || "Không có mô tả"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-zinc-500 mb-1">Trạng thái</h4>
                <p className="text-sm text-zinc-900">{category.isActive ? "🟢 Hoạt động" : "🔴 Vô hiệu hóa"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-500 mb-1">Ngày tạo</h4>
                <p className="text-sm text-zinc-900">{format(new Date(category.createdAt), 'dd/MM/yyyy')}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenView(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nút Sửa */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Sửa Nhóm nghề</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin nhóm nghề ngành nghề.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Tên ngành <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={category.name} 
                  className="col-span-3" 
                  required 
                  minLength={3}
                  maxLength={50}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Mô tả</Label>
                <Input 
                  id="description" 
                  name="description" 
                  defaultValue={category.description || ""} 
                  className="col-span-3" 
                  maxLength={200}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenEdit(false)}>Hủy</Button>
              <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
                {isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Nút Đổi trạng thái */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleToggleStatus}
        disabled={isPending}
        className="text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-700"
      >
        <RefreshCcw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}
