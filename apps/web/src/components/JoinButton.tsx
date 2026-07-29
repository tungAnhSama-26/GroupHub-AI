"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function JoinButton({ url }: { url: string }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleJoin = () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    const user = session.user as any;
    if (!user.isApproved) {
      Swal.fire({
        title: 'Tài khoản chưa được duyệt',
        text: 'Bạn cần chờ Admin phê duyệt tài khoản để có thể tham gia các hội nhóm.',
        icon: 'warning',
        confirmButtonText: 'Đã hiểu'
      });
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button 
      size="lg" 
      onClick={handleJoin}
      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md h-12 px-8"
    >
      Tham gia nhóm <ExternalLink className="w-4 h-4 ml-2" />
    </Button>
  );
}
