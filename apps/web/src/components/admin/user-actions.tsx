"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Ban, LockOpen, CheckCircle } from "lucide-react";
import { updateUserRole, toggleUserBan, approveUser } from "@/app/admin/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@grouphub/database";

export function UserActionButtons({ user, currentUserId }: { user: User, currentUserId?: string }) {
  const [isPending, startTransition] = useTransition();
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role);
  const router = useRouter();

  const isCurrentUser = user.id === currentUserId;

  const handleUpdateRole = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRole = formData.get("role") as string;

    Swal.fire({
      title: 'Xác nhận phân quyền',
      text: `Bạn có chắc chắn muốn phân quyền ${newRole} cho người dùng này?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await updateUserRole(user.id, newRole);
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

  const handleToggleBan = () => {
    const isCurrentlyBanned = user.isBanned;
    Swal.fire({
      title: isCurrentlyBanned ? 'Xác nhận mở khóa' : 'Xác nhận khóa',
      text: isCurrentlyBanned 
        ? "Bạn có chắc chắn muốn mở khóa người dùng này?" 
        : "Bạn có chắc chắn muốn khóa người dùng này? Tài khoản này sẽ không thể đăng nhập.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isCurrentlyBanned ? '#16a34a' : '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: isCurrentlyBanned ? 'Vâng, mở khóa!' : 'Vâng, khóa nó!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await toggleUserBan(user.id, user.isBanned);
          if (res.success) {
            Swal.fire('Thành công!', res.message, 'success');
            router.refresh();
          } else {
            Swal.fire('Lỗi!', res.message, 'error');
          }
        });
      }
    });
  };

  const handleApprove = () => {
    Swal.fire({
      title: 'Xác nhận duyệt',
      text: "Bạn có chắc chắn duyệt người dùng này? Tài khoản này sẽ được phép truy cập hệ thống.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await approveUser(user.id);
          if (res.success) {
            Swal.fire('Thành công!', 'Người dùng đã được duyệt.', 'success');
            router.refresh();
          } else {
            Swal.fire('Lỗi!', res.error || 'Có lỗi xảy ra', 'error');
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
            <DialogTitle>Hồ sơ người dùng</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || ""} />
              <AvatarFallback className="text-xl bg-blue-100 text-blue-700">
                {user.name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center w-full space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{user.name || "Chưa cập nhật tên"}</h3>
                <p className="text-zinc-500 text-sm">{user.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-left border-t pt-4">
                <div>
                  <h4 className="text-sm font-medium text-zinc-500 mb-1">Vai trò</h4>
                  <p className="text-sm text-zinc-900">{user.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-zinc-500 mb-1">Trạng thái</h4>
                  <p className="text-sm text-zinc-900">
                    {user.isBanned 
                      ? "🚫 Đã khóa" 
                      : user.isApproved 
                        ? "✅ Đã duyệt" 
                        : "⏳ Chờ duyệt"}
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

      {/* Nút Duyệt (Approve) */}
      {!user.isApproved && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleApprove}
          disabled={isPending || isCurrentUser}
          title="Duyệt tài khoản"
          className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700"
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}

      {/* Nút Sửa (Edit Role) */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={isCurrentUser}
            className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleUpdateRole}>
            <DialogHeader>
              <DialogTitle>Cập nhật Phân quyền</DialogTitle>
              <DialogDescription>
                Thay đổi vai trò của tài khoản {user.email} trong hệ thống.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Vai trò</Label>
                <div className="col-span-3">
                  <Select 
                    name="role" 
                    value={selectedRole}
                    onValueChange={(val) => val && setSelectedRole(val as "ADMIN" | "USER" | "GUEST" | "VERIFIED_USER" | "MODERATOR")}
                  >
                    <SelectTrigger className="w-full">
                      {selectedRole === "ADMIN" ? "Quản trị viên" : "Người dùng"}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Người dùng</SelectItem>
                      <SelectItem value="ADMIN">Quản trị viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

      {/* Nút Ban/Unban */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleToggleBan}
        disabled={isPending || isCurrentUser}
        className={user.isBanned 
          ? "text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700"
          : "text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700"}
      >
        {user.isBanned ? <LockOpen className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
      </Button>
    </div>
  );
}
