import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardRouter() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Lấy các custom fields (đã khai báo trong additionalFields của auth.ts)
  const isOnboarded = session.user?.isOnboarded;
  const role = session.user?.role;
  const isApproved = session.user?.isApproved;
  
  if (!session.user) {
    redirect("/login");
  }
  if (!isOnboarded) {
    redirect("/onboarding");
  }
  // Chỉ redirect khi isApproved === false (tường minh), không redirect khi undefined/null
  // Ngoại lệ: admin email luôn được vào
  const isAdminEmail = session.user.email === "tunganht26@gmail.com";
  if (!isAdminEmail && isApproved === false) {
    redirect("/pending-approval");
  }

  // Nếu là ADMIN -> chuyển sang trang Admin Dashboard
  if (role === "ADMIN") {
    redirect("/admin");
  }

  // Nếu là người dùng thường -> Chuyển về trang chủ hoặc feed
  redirect("/");
}
