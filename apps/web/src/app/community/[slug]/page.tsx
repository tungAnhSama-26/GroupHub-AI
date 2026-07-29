import { prisma } from "@grouphub/database";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, ShieldCheck, CalendarDays, LayoutDashboard, Globe } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import { Zap } from "lucide-react";
import JoinButton from "@/components/JoinButton";

export default async function CommunityDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params;
  const communitySlug = params.slug;

  const community = await prisma.community.findUnique({
    where: { slug: communitySlug },
    include: {
      owner: {
        select: { name: true, image: true }
      }
    }
  });

  if (!community || !community.isVerified) {
    notFound();
  }

  return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        
        {/* Header */}
        <header className="fixed top-0 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-neutral-900">GroupHub <span className="text-blue-600">AI</span></span>
            </Link>
            <div className="flex gap-4">
               <Link href="/">
                 <Button variant="ghost" className="text-neutral-600">Khám phá</Button>
               </Link>
            </div>
          </div>
        </header>

        <main className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-neutral-100">
            
            {/* Cover image placeholder (using gradient) */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-blue-500 to-cyan-400 w-full relative">
              <div className="absolute -bottom-16 left-8">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg bg-white">
                  <AvatarImage src={community.logoUrl || ""} className="object-cover" />
                  <AvatarFallback className="text-4xl bg-blue-50 text-blue-700">
                    {community.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 flex items-center gap-3">
                    {community.name}
                    <span title="Đã xác thực">
                      <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </span>
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-4 text-sm font-medium text-neutral-600">
                    <Badge variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 capitalize text-sm">
                      {community.platform}
                    </Badge>
                    {community.domain && (
                      <Badge variant="outline" className="px-3 py-1 text-neutral-600 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> {community.domain}
                      </Badge>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" /> 
                      {community.memberCount.toLocaleString('vi-VN')} thành viên
                    </span>
                    {community.createdAt && !isNaN(new Date(community.createdAt).getTime()) && (
                      <span className="flex items-center gap-1 text-neutral-500">
                        <CalendarDays className="w-4 h-4" /> 
                        Tạo {format(new Date(community.createdAt), 'dd MMMM yyyy', { locale: vi })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-3">
                  <JoinButton url={community.url} />
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-neutral-100">
                <h2 className="text-xl font-bold text-neutral-900 mb-4">Giới thiệu về cộng đồng</h2>
                <div className="text-neutral-600 leading-relaxed whitespace-pre-line text-lg">
                  {community.description || "Cộng đồng này chưa cập nhật phần giới thiệu chi tiết."}
                </div>
              </div>

              {community.tags && community.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">Thẻ (Tags)</h3>
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {community.owner && (
                <div className="mt-10 pt-8 border-t border-neutral-100 flex items-center gap-4">
                  <div className="text-sm text-neutral-500 font-medium">Được chia sẻ bởi:</div>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={community.owner.image || ""} />
                      <AvatarFallback>{community.owner.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-neutral-900">{community.owner.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
}
