"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink, ShieldCheck, Trash, Edit } from "lucide-react";
import { verifyCommunity, deleteCommunity, updateCommunity } from "@/app/admin/actions";
import Link from "next/link";
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
import { Community } from "@grouphub/database";

export function GroupActionButtons({ community }: { community: Community }) {
  const [isPending, startTransition] = useTransition();
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleVerify = () => {
    startTransition(async () => {
      const result = await verifyCommunity(community.id, community.isVerified);
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

  const handleDelete = () => {
    Swal.fire({
      title: 'Xác nhận xóa',
      text: "Bạn có chắc chắn muốn xóa hội nhóm này khỏi hệ thống?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Vâng, xóa nó!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await deleteCommunity(community.id);
          if (res.success) {
            Swal.fire('Đã xóa!', res.message, 'success');
          } else {
            Swal.fire('Lỗi!', res.message, 'error');
          }
        });
      }
    });
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const memberCount = parseInt(formData.get("memberCount") as string, 10) || 0;

    const nameRegex = /^[\p{L}\p{N}\s\-_.]+$/u;
    if (!nameRegex.test(name)) {
      Swal.fire({
        title: "Dữ liệu không hợp lệ",
        text: "Tên nhóm không được chứa ký tự đặc biệt.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    Swal.fire({
      title: 'Xác nhận cập nhật',
      text: "Bạn có chắc chắn muốn lưu thay đổi cho hội nhóm này?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await updateCommunity(community.id, name, memberCount, url);
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
            <DialogTitle>Chi tiết Hội nhóm</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div>
              <h4 className="text-sm font-medium text-zinc-500 mb-1">Tên hội nhóm</h4>
              <p className="text-base text-zinc-900 font-semibold">{community.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-500 mb-1">URL</h4>
              <Link href={community.url} target="_blank" className="text-sm text-blue-600 hover:underline break-all">
                {community.url}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-zinc-500 mb-1">Số thành viên</h4>
                <p className="text-sm text-zinc-900">{community.memberCount.toLocaleString()} thành viên</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-500 mb-1">Trạng thái</h4>
                <p className="text-sm text-zinc-900">{community.isVerified ? "🟢 Đã duyệt" : "🟡 Chờ duyệt"}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenView(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nút Edit */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleUpdate}>
            <DialogHeader>
              <DialogTitle>Cập nhật Hội nhóm</DialogTitle>
              <DialogDescription>
                Chỉnh sửa thông tin cơ bản của hội nhóm.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Tên nhóm <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  name="name" 
                  defaultValue={community.name} 
                  className="col-span-3" 
                  required 
                  minLength={3}
                  maxLength={100}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">Đường dẫn <span className="text-red-500">*</span></Label>
                <Input 
                  id="url" 
                  name="url" 
                  type="url"
                  defaultValue={community.url} 
                  className="col-span-3" 
                  required 
                  pattern="https?://.*"
                  title="URL phải bắt đầu bằng http:// hoặc https://"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="memberCount" className="text-right">Thành viên</Label>
                <Input 
                  id="memberCount" 
                  name="memberCount" 
                  type="number" 
                  min="0"
                  defaultValue={community.memberCount} 
                  className="col-span-3" 
                  required 
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

      {community.url && (
        <a
          href={community.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center h-7 w-7 rounded-[min(var(--radius-md),12px)] border border-border bg-background hover:bg-muted text-zinc-600 hover:text-zinc-900 transition-all"
          title="Xem hội nhóm"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleVerify}
        disabled={isPending}
        className="text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-700"
      >
        <ShieldCheck className={`h-4 w-4 ${isPending ? 'animate-pulse' : ''}`} />
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
