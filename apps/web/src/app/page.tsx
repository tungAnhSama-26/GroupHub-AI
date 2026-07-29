"use client";

import { useStore } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { Search, Sparkles, TrendingUp, Users, ShieldCheck, Zap, LayoutDashboard, LogOut, Home, Info, Compass, PlusCircle } from "lucide-react";
import { getVerifiedCommunities, getFilterCategories } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Swal from "sweetalert2";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useQuery } from "@tanstack/react-query";

// Using Community from database
import { Community } from "@grouphub/database";

export default function HomePage() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useStore();
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Force onboarding for OAuth users who haven't completed their profile
  useEffect(() => {
    if (!isPending && session?.user) {
      const user = session.user as { isOnboarded?: boolean, isApproved?: boolean, role?: string };
      if (!user.isOnboarded) {
        router.push("/onboarding");
      }
    }
  }, [session, isPending, router]);

  const handlePostCommunity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session?.user) {
      router.push("/login");
      return;
    }
    const user = session.user as any;
    if (!user.isApproved) {
      Swal.fire({
        title: 'Tài khoản chưa được duyệt',
        text: 'Bạn cần chờ Admin phê duyệt tài khoản để có thể đăng cộng đồng.',
        icon: 'warning',
        confirmButtonText: 'Đã hiểu'
      });
      return;
    }
    router.push("/submit-community");
  };
  
  const { data: communities = [], isLoading } = useQuery<Community[]>({
    queryKey: ['communities', searchQuery, selectedCategory],
    queryFn: async () => {
      const res = await getVerifiedCommunities(searchQuery, selectedCategory || "");
      return res.success ? (res.data as Community[]) : [];
    }
  });

  const { data: filterCategories = [] } = useQuery<string[]>({
    queryKey: ['filterCategories'],
    queryFn: async () => {
      const res = await getFilterCategories();
      return res.success ? res.data : [];
    }
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Navbar */}
      <header className="fixed top-0 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900">GroupHub <span className="text-blue-600">AI</span></span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-500">
            <Link href="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" /> Trang chủ
            </Link>
            <Link href="/about" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Info className="w-4 h-4" /> Về chúng tôi
            </Link>
            <Link href="/categories" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Compass className="w-4 h-4" /> Khám phá
            </Link>
            <a href="#" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <TrendingUp className="w-4 h-4" /> Phân tích
            </a>
            <a href="#" onClick={handlePostCommunity} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
              <PlusCircle className="w-4 h-4" /> Đăng cộng đồng
            </a>
          </nav>
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="w-9 h-9 border border-neutral-200 cursor-pointer shadow-sm hover:ring-2 hover:ring-blue-100 transition-all">
                      <AvatarImage src={session.user.image || ""} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                        {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{session.user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    {/* @ts-expect-error Type mismatch with Prisma payload */}
                    {(session.user.role === "ADMIN" || session.user.email === "tunganht26@gmail.com") && (
                      <DropdownMenuItem onClick={() => router.push('/admin')} className="cursor-pointer font-medium text-blue-600 flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Chuyển sang giao diện quản lý
                      </DropdownMenuItem>
                    )}
                    {/* @ts-expect-error Type mismatch with Prisma payload */}
                    {(session.user.role === "ADMIN" || session.user.email === "tunganht26@gmail.com") && <DropdownMenuSeparator />}
                    <DropdownMenuItem onClick={() => authClient.signOut()} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-neutral-600 hover:text-blue-600 hover:bg-blue-50">Đăng nhập</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 shadow-sm">Bắt đầu ngay</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 relative">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div 
            className="text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 rounded-full px-4 py-1">
              <Sparkles className="w-3 h-3 mr-2 inline" /> Danh bạ cộng đồng AI thông minh
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900">
              Khám Phá <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Cộng Đồng Trực Tuyến
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Tìm kiếm các cộng đồng chất lượng, sôi động và đã được xác thực trên Discord, Telegram,... chỉ trong vài giây. Tạm biệt tin rác, kết nối giá trị thật.
            </p>

            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-white border border-neutral-200 rounded-2xl p-2 flex items-center shadow-lg">
                <Search className="w-6 h-6 text-neutral-400 ml-4" />
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm 'machine learning discord' hoặc 'marketing telegram'..." 
                  className="border-0 bg-transparent text-lg text-neutral-900 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 h-14 placeholder:text-neutral-400"
                />
                <Button size="lg" className="h-14 px-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md font-semibold transition-all">
                  Tìm kiếm
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-6">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium shadow-sm ${!selectedCategory ? 'bg-blue-600 text-white border-blue-600' : 'border-neutral-200 bg-white hover:bg-neutral-50 hover:border-blue-200 text-neutral-600'}`}
              >
                🔥 Tất cả
              </button>
              {filterCategories.map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => setSelectedCategory(tag)}
                  className={`px-4 py-2 rounded-full border transition-colors text-sm font-medium shadow-sm ${selectedCategory === tag ? 'bg-blue-600 text-white border-blue-600' : 'border-neutral-200 bg-white hover:bg-neutral-50 hover:border-blue-200 text-neutral-600'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            </div>
        </div>
      </main>

      {/* Featured Section */}
      <section className="py-24 bg-white relative border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3 text-neutral-900">
                <TrendingUp className="text-blue-600" /> Cộng đồng nổi bật
              </h2>
              <p className="text-neutral-500">Các nhóm hoạt động tích cực nhất tuần này, được AI chọn lọc.</p>
            </div>
            <Button variant="outline" className="hidden md:flex border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-blue-600">
              Xem tất cả
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 text-center text-neutral-500 py-12">Đang tải danh sách...</div>
            ) : communities.map((community, i) => (
              <Link
                key={community.id}
                href={`/community/${community.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both block"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Card className="bg-white border-neutral-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md overflow-hidden group h-full cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <Avatar className="w-12 h-12 border border-neutral-100 shadow-sm">
                        <AvatarImage src={community.logoUrl || ""} />
                        <AvatarFallback className="bg-blue-50 text-blue-700">{community.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Badge variant="secondary" className="bg-neutral-100 text-neutral-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors capitalize">
                        {community.platform}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mt-4 text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {community.name}
                    </CardTitle>
                    <CardDescription className="text-neutral-500 mt-2 line-clamp-2">
                      {community.description || "Chưa có mô tả"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {community.tags?.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-neutral-100 flex justify-between items-center bg-neutral-50/50">
                    <div className="flex items-center text-sm text-neutral-600 font-medium">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      {community.memberCount >= 1000 ? `${(community.memberCount / 1000).toFixed(1)}k` : community.memberCount} thành viên
                    </div>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
