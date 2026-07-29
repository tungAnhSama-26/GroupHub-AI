import { DashboardCharts } from "@/components/admin/dashboard-charts";
import { AdminHeader } from "@/components/admin/admin-header";
import { prisma } from "@grouphub/database";

export default async function AdminDashboardPage() {
  // Fetch real stats from DB
  const [userCount, professionCount, communityCount, sessionCount] = await Promise.all([
    prisma.user.count(),
    prisma.profession.count(),
    prisma.community.count(),
    prisma.session.count(),
  ]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AdminHeader 
        title="Tổng quan" 
      />
      
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase">Tổng người dùng</h3>
            <p className="text-4xl font-bold mt-2 text-zinc-900 dark:text-zinc-50">{new Intl.NumberFormat('vi-VN').format(userCount)}</p>
          </div>
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase">Ngành nghề</h3>
            <p className="text-4xl font-bold mt-2 text-blue-600 dark:text-blue-400">{new Intl.NumberFormat('vi-VN').format(professionCount)}</p>
          </div>
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase">Hội nhóm</h3>
            <p className="text-4xl font-bold mt-2 text-zinc-900 dark:text-zinc-50">{new Intl.NumberFormat('vi-VN').format(communityCount)}</p>
          </div>
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase">Đang truy cập</h3>
            <p className="text-4xl font-bold mt-2 text-green-600 dark:text-green-400">{new Intl.NumberFormat('vi-VN').format(sessionCount > 0 ? sessionCount : 1)}</p>
          </div>
        </div>

        <DashboardCharts />
      </div>
    </div>
  );
}
