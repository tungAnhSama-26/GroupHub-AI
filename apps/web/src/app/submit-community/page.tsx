import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@grouphub/database";
import SubmitCommunityClient from "./client";

export default async function SubmitCommunityPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user?.isOnboarded) {
    redirect("/onboarding");
  }

  if (user.role !== "VERIFIED_USER" && user.role !== "ADMIN" && !user.isApproved) {
    redirect("/pending-approval");
  }

  // Lấy danh sách chuyên ngành để làm lĩnh vực hoạt động (domain)
  const categories = await prisma.professionCategory.findMany({
    where: { isActive: true },
    select: { name: true }
  });

  return (
    <div className="min-h-screen bg-neutral-50 py-20 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-neutral-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Đăng Cộng Đồng Mới</h1>
          <p className="text-neutral-500 mt-2">
            Chia sẻ cộng đồng của bạn với thế giới. Lưu ý: Mọi cộng đồng đều cần được ban quản trị xét duyệt trước khi hiển thị công khai.
          </p>
        </div>

        <SubmitCommunityClient categories={categories.map(c => c.name)} />
      </div>
    </div>
  );
}
