"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit, RefreshCcw } from "lucide-react";
import { toggleProfessionStatus, updateProfession } from "@/app/admin/actions";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Profession, ProfessionCategory } from "@grouphub/database";

export function ProfessionActionButtons({ profession, categories }: { profession: Profession, categories: ProfessionCategory[] }) {
  const [isPending, startTransition] = useTransition();
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleToggleStatus = () => {
    startTransition(async () => {
      const result = await toggleProfessionStatus(profession.id, profession.isActive);
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
      title: 'Xác nhận cập nhật',
      text: "Bạn có chắc chắn muốn lưu thay đổi cho ngành nghề này?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await updateProfession(profession.id, name, description, categoryId);
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
      {/* Nút Xem (View) */}
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
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border">
              <div>
                <h4 className="text-sm font-medium text-zinc-500 mb-1">Tên ngành nghề</h4>
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{profession.name}</p>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium text-zinc-500 mb-1">Mô tả</h4>
                <p className="text-sm text-zinc-900 dark:text-zinc-300">
                  {profession.description || "Chưa có mô tả."}
                </p>
              </div>
              <div className="grid grid-cols-2 mt-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-zinc-500 mb-1">Trạng thái</h4>
                  <p className="text-sm font-medium">
                    {profession.isActive ? "✅ Hoạt động" : "❌ Đã tắt"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-500 mb-1">Ngày tạo</h4>
                  <p className="text-sm font-medium">
                    {format(new Date(profession.createdAt), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenView(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nút Sửa (Edit) */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Sửa Ngành nghề</DialogTitle>
              <DialogDescription>
                Cập nhật thông tin ngành nghề.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryId" className="text-right">
                  Nhóm nghề <span className="text-red-500">*</span>
                </Label>
                <div className="col-span-3">
                  <Select name="categoryId" defaultValue={profession.categoryId} required>
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
                  defaultValue={profession.name}
                  className="col-span-3" 
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
                  defaultValue={profession.description || ""}
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
        className={profession.isActive 
          ? "text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700" 
          : "text-zinc-600 border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-700"}
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}
