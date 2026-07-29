"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ShieldAlert, LogOut } from "lucide-react";

export default function PendingApprovalPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        router.push("/login");
      } else {
        const user = session.user as { isApproved?: boolean };
        if (user.isApproved) {
          router.push("/");
        }
      }
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-900">Đang chờ phê duyệt</h1>
          <p className="text-zinc-500">
            Hồ sơ của bạn đã được ghi nhận và đang chờ Quản trị viên duyệt. Quá trình này có thể mất một chút thời gian, vui lòng quay lại sau!
          </p>
        </div>

        <div className="pt-4">
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
}
