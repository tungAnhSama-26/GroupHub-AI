"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { approveUser, rejectUser } from "@/app/admin/actions";
import Swal from "sweetalert2";
import { User } from "@grouphub/database";

export function PendingUserActionButtons({ user, currentUserId }: { user: User, currentUserId?: string }) {
  const [isPending, startTransition] = useTransition();

  const isCurrentUser = user.id === currentUserId;

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
          } else {
            Swal.fire('Lỗi!', res.error || 'Có lỗi xảy ra', 'error');
          }
        });
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: 'Xác nhận từ chối',
      text: "Bạn có chắc chắn từ chối người dùng này? Tài khoản sẽ BỊ XÓA khỏi hệ thống vĩnh viễn.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Xóa tài khoản',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await rejectUser(user.id);
          if (res.success) {
            Swal.fire('Đã xóa!', res.message, 'success');
          } else {
            Swal.fire('Lỗi!', res.error || 'Có lỗi xảy ra', 'error');
          }
        });
      }
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleApprove}
        disabled={isPending || isCurrentUser}
        title="Duyệt tài khoản"
        className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700"
      >
        <CheckCircle className="h-4 w-4 mr-1" /> Duyệt
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleReject}
        disabled={isPending || isCurrentUser}
        title="Từ chối tài khoản"
        className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700"
      >
        <XCircle className="h-4 w-4 mr-1" /> Từ chối
      </Button>
    </div>
  );
}
