"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { verifyCommunity, deleteCommunity } from "@/app/admin/actions";
import Swal from "sweetalert2";
import { Community } from "@grouphub/database";

export function PendingGroupActionButtons({ community }: { community: Community }) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    Swal.fire({
      title: 'Xác nhận duyệt hội nhóm',
      text: "Bạn có chắc chắn muốn duyệt hội nhóm này? Hội nhóm sẽ hiển thị công khai trên danh bạ.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          // verifyCommunity toggles currentStatus, so we pass currentStatus = false to turn it true
          const res = await verifyCommunity(community.id, false);
          if (res.success) {
            Swal.fire('Thành công!', 'Hội nhóm đã được duyệt.', 'success');
          } else {
            Swal.fire('Lỗi!', res.message || 'Có lỗi xảy ra', 'error');
          }
        });
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: 'Xác nhận từ chối',
      text: "Bạn có chắc chắn từ chối hội nhóm này? Dữ liệu sẽ bị xóa hoàn toàn khỏi hệ thống.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Xóa hội nhóm',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          const res = await deleteCommunity(community.id);
          if (res.success) {
            Swal.fire('Đã xóa!', res.message, 'success');
          } else {
            Swal.fire('Lỗi!', res.message || 'Có lỗi xảy ra', 'error');
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
        disabled={isPending}
        title="Duyệt hội nhóm"
        className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700"
      >
        <CheckCircle className="h-4 w-4 mr-1" /> Duyệt
      </Button>

      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleReject}
        disabled={isPending}
        title="Từ chối hội nhóm"
        className="text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700"
      >
        <XCircle className="h-4 w-4 mr-1" /> Từ chối
      </Button>
    </div>
  );
}
