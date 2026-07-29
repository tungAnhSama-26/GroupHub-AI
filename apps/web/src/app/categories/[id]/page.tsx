import { prisma } from "@grouphub/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Zap, Users, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function CategoryDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params;
  const categoryName = decodeURIComponent(params.id);

  // Validate category exists
  const category = await prisma.professionCategory.findUnique({
    where: { name: categoryName },
    include: {
      professions: {
        where: { isActive: true }
      }
    }
  });

  if (!category) {
    notFound();
  }

  // Lấy danh sách cộng đồng thuộc lĩnh vực này
  const communities = await prisma.community.findMany({
    where: { 
      domain: categoryName,
      isVerified: true
    },
    orderBy: { memberCount: 'desc' }
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans pb-20">
      
      <header className="fixed top-0 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900">GroupHub <span className="text-blue-600">AI</span></span>
          </Link>
          <div className="flex gap-4">
             <Link href="/categories">
               <Button variant="ghost" className="text-neutral-600">Danh mục ngành nghề</Button>
             </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 container mx-auto px-4">
        
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Link href="/categories" className="inline-flex items-center text-sm font-medium text-blue-600 mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Tất cả danh mục
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">
            Cộng đồng <span className="text-blue-600">{categoryName}</span>
          </h1>
          <p className="text-lg text-neutral-600">
            {category.description || `Danh sách các hội nhóm uy tín nhất trong lĩnh vực ${categoryName}.`}
          </p>
        </div>

        {/* Chuyên ngành con */}
        {category.professions.length > 0 && (
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {category.professions.map(prof => (
              <Badge key={prof.id} variant="outline" className="px-4 py-2 text-sm bg-white text-neutral-700 border-neutral-200">
                {prof.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Danh sách cộng đồng */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {communities.length === 0 ? (
            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-neutral-200">
              <p className="text-neutral-500 text-lg mb-4">Chưa có cộng đồng nào trong lĩnh vực này.</p>
              <Link href="/submit-community">
                <Button className="bg-blue-600 hover:bg-blue-700">Trở thành người đầu tiên đăng nhóm</Button>
              </Link>
            </div>
          ) : (
            communities.map((community, i) => (
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
                  <CardFooter className="pt-4 border-t border-neutral-100 flex justify-between items-center bg-neutral-50/50 mt-auto">
                    <div className="flex items-center text-sm text-neutral-600 font-medium">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      {community.memberCount >= 1000 ? `${(community.memberCount / 1000).toFixed(1)}k` : community.memberCount} thành viên
                    </div>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </CardFooter>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
