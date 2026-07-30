import Link from "next/link";
import { ArrowLeft, Users, BarChart3, Layers, Zap, Info, Compass, TrendingUp, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAnalyticsData } from "./actions";
import { AnalyticsCharts } from "@/components/analytics-charts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Lấy thông tin user hiện tại nếu cần cho Header (tạm thời để giống trang Home hoặc dùng Header chung nếu có)
// Tuy nhiên vì header trong app này đang code cứng trong từng page, ta sẽ sao chép cấu trúc Navbar cho đồng bộ.

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
          <Link href="/" className="flex items-center gap-2 z-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900">GroupHub <span className="text-blue-600">AI</span></span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-500 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <HomeIcon className="w-4 h-4" /> Trang chủ
            </Link>
            <Link href="/about" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Info className="w-4 h-4" /> Về chúng tôi
            </Link>
            <Link href="/categories" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Compass className="w-4 h-4" /> Khám phá
            </Link>
            <Link href="/submit-community" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
              <PlusCircle className="w-4 h-4" /> Đăng cộng đồng
            </Link>
          </nav>
          <div className="flex items-center gap-4 z-10">
             <Link href="/">
               <Button variant="ghost" className="text-neutral-600">
                 <ArrowLeft className="w-4 h-4 mr-2" />
                 Quay lại
               </Button>
             </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 container mx-auto px-4 max-w-5xl">
        
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4 shadow-sm border border-blue-200">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">Phân Tích & Thống Kê</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Tổng hợp dữ liệu về sự phát triển của hệ sinh thái các cộng đồng trực tuyến trên nền tảng GroupHub AI.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium">Tổng số cộng đồng</p>
              <p className="text-2xl font-bold text-neutral-900">{data.overview.totalCommunities.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium">Tổng thành viên</p>
              <p className="text-2xl font-bold text-neutral-900">{data.overview.totalMembers.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-500 font-medium">Người dùng hệ thống</p>
              <p className="text-2xl font-bold text-neutral-900">{data.overview.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-150">
          <AnalyticsCharts data={data} />
        </div>

        {/* Top Communities List */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">🏆 Top Cộng Đồng Nổi Bật</h3>
          
          <div className="space-y-4">
            {data.topCommunities.map((community, index) => (
              <Link 
                key={community.id} 
                href={`/community/${community.slug}`}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center overflow-hidden shrink-0 border border-neutral-200 group-hover:shadow-sm transition-all">
                    {community.logoUrl ? (
                      <img src={community.logoUrl} alt={community.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-neutral-400">{community.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {index + 1}. {community.name}
                    </h4>
                    <p className="text-sm text-neutral-500 mt-1 capitalize">{community.platform}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                    {community.memberCount.toLocaleString()} thành viên
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          {data.topCommunities.length === 0 && (
            <div className="text-center py-10 text-neutral-500">
              Chưa có dữ liệu cộng đồng nào.
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

function HomeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
