"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Users, ShieldCheck, Globe, Zap, Compass, Star, Home, Info, TrendingUp, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-blue-500/30 overflow-hidden">
      
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
              <Home className="w-4 h-4" /> Trang chủ
            </Link>
            <Link href="/about" className="flex items-center gap-1.5 text-blue-600 font-semibold">
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

      <main className="pt-24 pb-20">
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-4 border border-blue-100">
                <Sparkles className="w-4 h-4" />
                <span>Nền tảng kết nối cộng đồng thông minh</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                Tương lai của việc <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  khám phá cộng đồng
                </span>
              </h1>
              
              <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                GroupHub AI mang đến một giải pháp tìm kiếm và tham gia hội nhóm trực tuyến đỉnh cao, sử dụng AI để giúp bạn tìm thấy "ngôi nhà thứ 2" của mình trên Internet một cách nhanh chóng và an toàn.
              </p>
            </div>
          </div>
        </section>

        {/* Features / Core Values */}
        <section className="py-20 bg-white border-y border-neutral-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Giá trị cốt lõi</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">Chúng tôi tập trung vào trải nghiệm người dùng, chất lượng nội dung và sự kết nối bền vững.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <Card className="border-neutral-100 bg-neutral-50/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                    <Compass className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">Khám Phá Dễ Dàng</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Thuật toán thông minh giúp phân loại và đề xuất các nhóm chất lượng nhất trên đa nền tảng (Discord, Telegram, Facebook...).
                  </p>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="border-neutral-100 bg-neutral-50/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">Kiểm Duyệt Khắt Khe</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Hệ thống xác thực minh bạch giúp loại bỏ spam và các cộng đồng kém chất lượng, mang lại môi trường an toàn.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="border-neutral-100 bg-neutral-50/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">Kết Nối Đam Mê</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Nơi hội tụ của những tâm hồn đồng điệu, giúp bạn dễ dàng kết nối, học hỏi và chia sẻ đam mê bất tận.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto bg-neutral-900 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden relative shadow-2xl">
              {/* Background gradient for CTA */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-neutral-900 to-cyan-900 opacity-50"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full filter blur-[80px]"></div>
              
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Sẵn sàng gia nhập <br /> cộng đồng của bạn?
                </h2>
                <p className="text-lg text-neutral-300 max-w-xl mx-auto">
                  Tham gia cùng hàng ngàn thành viên khác để tìm kiếm và chia sẻ những hội nhóm tuyệt vời nhất.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link href="/">
                    <Button size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full h-14 px-8 text-base font-bold shadow-lg shadow-white/10 w-full sm:w-auto">
                      Khám phá ngay
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="lg" variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800 rounded-full h-14 px-8 text-base font-bold bg-transparent w-full sm:w-auto">
                      Tạo tài khoản
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Simple Footer */}
      <footer className="py-8 border-t border-neutral-200 bg-white text-center">
        <p className="text-neutral-500 text-sm">
          &copy; {new Date().getFullYear()} GroupHub AI. Đã đăng ký bản quyền.
        </p>
      </footer>
    </div>
  );
}
