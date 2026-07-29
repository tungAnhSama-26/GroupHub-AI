"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getActiveProfessions } from "./actions";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [professionId, setProfessionId] = useState("");
  
  const [professions, setProfessions] = useState<{id: string, name: string, category?: {name: string}}[]>([]);

  useEffect(() => {
    getActiveProfessions().then(setProfessions).catch(console.error);
  }, []);

  // Group professions by category
  const groupedProfessions = professions.reduce((acc, prof) => {
    const catName = prof.category?.name || "Khác";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(prof);
    return acc;
  }, {} as Record<string, typeof professions>);

  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        router.push("/login");
      } else {
        const user = session.user as { isOnboarded?: boolean, isApproved?: boolean, role?: string };
        if (user.isOnboarded) {
          router.push("/");
        }
      }
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !dob || !professionId) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/user/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, dob, professionId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Có lỗi xảy ra khi lưu thông tin");
      }

      // Success! Refresh session or redirect
      Swal.fire({
        title: 'Hồ sơ đã được gửi!',
        text: 'Vui lòng chờ Admin phê duyệt tài khoản để bạn có thể sử dụng đầy đủ các tính năng.',
        icon: 'success',
        confirmButtonText: 'Khám phá ngay'
      }).then(() => {
        router.push("/");
        router.refresh();
      });
      
    } catch (err: unknown) {
      setError((err as Error).message || "Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) {
    return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Hoàn tất hồ sơ</h1>
        <p className="text-neutral-500 text-sm max-w-md mx-auto">
          Chào mừng {session?.user?.name}! Vui lòng bổ sung các thông tin còn thiếu để hoàn tất đăng ký tài khoản.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-600 text-sm rounded-md animate-in zoom-in-95">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 mt-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="phone">Số điện thoại</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-medium pointer-events-none">+84</span>
            <Input
              id="phone"
              placeholder="987 654 321"
              type="tel"
              disabled={isLoading}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-12"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="dob">Ngày sinh</label>
          <Input
            id="dob"
            type="date"
            disabled={isLoading}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Lĩnh vực</label>
            <Select 
              value={selectedCategory} 
              onValueChange={(val) => {
                setSelectedCategory(val || "");
                setProfessionId(""); // Reset profession when category changes
              }}
            >
              <SelectTrigger>
                <div className="whitespace-normal break-words pr-2">
                  {selectedCategory ? selectedCategory : <SelectValue placeholder="Chọn lĩnh vực" />}
                </div>
              </SelectTrigger>
              <SelectContent>
                {Object.keys(groupedProfessions).map(catName => (
                  <SelectItem key={catName} value={catName}>{catName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Chuyên ngành</label>
            <Select value={professionId} onValueChange={(value) => setProfessionId(value || "")} required disabled={!selectedCategory}>
              <SelectTrigger>
                <div className="whitespace-normal break-words pr-2">
                  {professionId ? professions.find(p => p.id === professionId)?.name : <SelectValue placeholder="Chọn chuyên ngành" />}
                </div>
              </SelectTrigger>
              <SelectContent>
                {(groupedProfessions[selectedCategory] || []).map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
            disabled={isLoading || !phone || !dob || !professionId}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Gửi yêu cầu phê duyệt
          </Button>
        </div>
      </form>
    </div>
  );
}
