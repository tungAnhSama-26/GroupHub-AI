import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side: branding/image */}
      <div className="relative hidden md:flex flex-col items-center justify-center bg-[#0a0f1c] text-white overflow-hidden p-10">
        {/* Deep background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1c] via-[#101b33] to-[#0a0f1c]"></div>
        
        {/* Animated glowing blobs */}
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-pulse duration-10000"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse duration-7000"></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[90px]"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
          <Link href="/" className="self-start inline-flex items-center text-sm font-medium text-blue-200/60 hover:text-white transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại trang chủ
          </Link>

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] shadow-2xl w-full flex flex-col items-center text-center space-y-6 transform transition-all hover:scale-[1.02] duration-500 ring-1 ring-white/5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] mb-4 border border-white/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight">
              GroupHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">AI</span>
            </h1>
            
            <p className="text-lg text-blue-100/70 leading-relaxed max-w-sm">
              Khám phá, phân tích và phát triển cộng đồng của bạn với sức mạnh của trí tuệ nhân tạo.
            </p>
            
            <div className="w-full pt-6">
              <div className="flex items-center gap-4 justify-center">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#151f38] bg-blue-900 overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Member avatar" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#151f38] bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-xs font-bold shadow-lg">
                    10k+
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
              </div>
              <p className="text-xs text-blue-200/50 font-medium tracking-widest uppercase mt-4">
                Cộng đồng đang chờ đón bạn
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side: Auth form */}
      <div className="flex flex-col justify-center items-center p-8 bg-white dark:bg-zinc-950">
        <div className="w-full max-w-md">
          {/* Mobile header (hidden on md) */}
          <div className="md:hidden flex flex-col items-center mb-8">
             <Link href="/" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-blue-600 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
            </Link>
            <h1 className="text-3xl font-bold text-neutral-900">GroupHub AI</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
