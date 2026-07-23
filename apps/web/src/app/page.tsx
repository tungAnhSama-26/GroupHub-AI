"use client";

import { useStore } from "@/lib/store";
import { motion } from "framer-motion";
import { Search, Sparkles, TrendingUp, Users, ShieldCheck, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useQuery } from "@tanstack/react-query";

interface Community {
  id: string;
  name: string;
  description: string;
  platform: string;
  members: string;
  tags: string[];
  avatar: string;
  memberCount: number;
}

export default function Home() {
  const { searchQuery, setSearchQuery } = useStore();
  
  const { data: communities = [], isLoading } = useQuery<Community[]>({
    queryKey: ['communities', searchQuery],
    queryFn: async () => {
      try {
        const url = new URL('http://localhost:3001/community');
        if (searchQuery) url.searchParams.set('q', searchQuery);
        
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      } catch (e) {
        // Fallback for development if NestJS is not running / no DB
        return [
          {
            id: "1",
            name: "AI Innovators",
            description: "The largest community of AI researchers and builders.",
            platform: "Discord",
            memberCount: 125000,
            tags: ["AI", "Machine Learning"],
            avatar: "https://github.com/shadcn.png",
            members: "125k"
          }
        ];
      }
    }
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Navbar Placeholder */}
      <header className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">GroupHub <span className="text-purple-400">AI</span></span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">Discover</a>
            <a href="#" className="hover:text-white transition-colors">Analytics</a>
            <a href="#" className="hover:text-white transition-colors">Submit Community</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-neutral-300 hover:text-white">Sign In</Button>
            <Button className="bg-white text-black hover:bg-neutral-200 rounded-full px-6">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 relative">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <Badge variant="outline" className="border-purple-500/30 text-purple-300 bg-purple-500/10 rounded-full px-4 py-1">
              <Sparkles className="w-3 h-3 mr-2 inline" /> AI-Powered Community Directory
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Discover Your Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Online Community
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Find high-quality, active, and verified communities across Discord, Telegram, and more in seconds. No more spam, just real connections.
            </p>

            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center shadow-2xl">
                <Search className="w-6 h-6 text-neutral-500 ml-4" />
                <Input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 'machine learning discord' or 'marketing telegram'..." 
                  className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 px-4 h-14"
                />
                <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-black hover:bg-neutral-200 font-semibold transition-all">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {['🔥 Trending', '💻 Tech', '🎨 Design', '🚀 Web3', '📈 Marketing', '🎮 Gaming'].map((tag) => (
                <button key={tag} className="px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-neutral-300">
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Featured Section */}
      <section className="py-24 bg-neutral-950 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
                <TrendingUp className="text-purple-400" /> Trending Communities
              </h2>
              <p className="text-neutral-400">The most active groups this week, curated by our AI.</p>
            </div>
            <Button variant="outline" className="hidden md:flex border-white/10 hover:bg-white/5">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-3 text-center text-neutral-500 py-12">Loading communities...</div>
            ) : communities.map((community, i) => (
              <motion.div
                key={community.id || community.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-neutral-900/40 border-white/10 hover:border-purple-500/50 transition-colors overflow-hidden group">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <Avatar className="w-12 h-12 border border-white/10">
                        <AvatarImage src={community.avatar} />
                        <AvatarFallback>GH</AvatarFallback>
                      </Avatar>
                      <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                        {community.platform}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mt-4 text-white group-hover:text-purple-400 transition-colors">
                      {community.name}
                    </CardTitle>
                    <CardDescription className="text-neutral-400 mt-2">
                      {community.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {community.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium text-neutral-500 bg-neutral-950 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-white/5 flex justify-between items-center bg-neutral-950/30">
                    <div className="flex items-center text-sm text-neutral-400">
                      <Users className="w-4 h-4 mr-2 text-blue-400" />
                      {community.memberCount ? `${(community.memberCount / 1000).toFixed(1)}k` : community.members} members
                    </div>
                    <ShieldCheck className="w-5 h-5 text-green-400 opacity-80" />
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
