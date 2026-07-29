import { prisma } from "@grouphub/database";
import Link from "next/link";
import { Layers, Zap, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CategoriesPage() {
  const categories = await prisma.professionCategory.findMany({
    where: { isActive: true },
    include: {
      professions: {
        where: { isActive: true },
        select: { id: true, name: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  // Get community counts per category (domain)
  const groupCounts = await prisma.community.groupBy({
    by: ['domain'],
    where: { isVerified: true, domain: { not: null } },
    _count: {
      _all: true
    }
  });

  const getCount = (domain: string) => {
    return groupCounts.find(c => c.domain === domain)?._count._all || 0;
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans pb-20">
      
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

      <main className="pt-32 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-6">
            Danh mục <span className="text-blue-600">Ngành nghề</span>
          </h1>
          <p className="text-lg text-neutral-600">
            Khám phá hàng ngàn cộng đồng chất lượng được phân loại theo lĩnh vực chuyên môn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <Link 
              key={cat.id} 
              href={`/categories/${encodeURIComponent(cat.name)}`}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both block group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-blue-400 hover:shadow-lg transition-all h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {getCount(cat.name)} nhóm
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                
                <p className="text-neutral-500 text-sm line-clamp-2 mb-6 flex-grow">
                  {cat.description || "Khám phá các cộng đồng chuyên môn về " + cat.name}
                </p>

                {cat.professions.length > 0 && (
                  <div className="pt-4 border-t border-neutral-100 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {cat.professions.slice(0, 3).map(prof => (
                        <span key={prof.id} className="text-xs text-neutral-600 bg-neutral-100 px-2 py-1 rounded-md">
                          {prof.name}
                        </span>
                      ))}
                      {cat.professions.length > 3 && (
                        <span className="text-xs text-neutral-500 font-medium px-2 py-1">
                          +{cat.professions.length - 3} chuyên ngành
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
