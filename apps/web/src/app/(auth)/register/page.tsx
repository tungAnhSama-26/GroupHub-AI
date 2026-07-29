"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, User, Briefcase, Layers, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRegistrationData, linkUserProfession } from "./actions";

type CategoryData = {
  id: string;
  name: string;
  professions: { id: string; name: string; }[];
};

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedProfessionId, setSelectedProfessionId] = useState("");
  
  useEffect(() => {
    getRegistrationData().then(res => {
      if (res.success && res.categories) {
        setCategories(res.categories);
      }
    });
  }, []);

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);
  const availableProfessions = selectedCategory?.professions || [];

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const isNameInvalid = name.length > 0 && name.length < 2;
  const isEmailInvalid = email.length > 0 && (!email.includes("@") || !email.includes("."));
  const isPasswordWeak = password.length > 0 && password.length < 6;
  const isConfirmPasswordInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!selectedProfessionId) {
      setError("Vui lòng chọn lĩnh vực và ngành nghề.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        email,
        password,
        name,
        phone,
        isOnboarded: true,
      } as Parameters<typeof authClient.signUp.email>[0] & { phone: string, isOnboarded: boolean };
      
      const { error } = await authClient.signUp.email(payload);

      if (error) {
        setError(error.message || "Đã xảy ra lỗi khi đăng ký.");
      } else {
        // Gắn ngành nghề cho user
        await linkUserProfession(selectedProfessionId);
        
        // Send OTP
        await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
    } catch (err: unknown) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google") => {
    if (provider === "google") setIsGoogleLoading(true);
    setError("");
    
    try {
       await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard"
      });
    } catch (err: unknown) {
       setError(`Failed to login with ${provider}`);
       console.error(err);
       if (provider === "google") setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Tạo tài khoản mới</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Điền đầy đủ thông tin bên dưới để bắt đầu
        </p>
      </div>

      {error && (
        <div
          className="p-3 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-sm rounded-md animate-in zoom-in-95"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="name">Họ và tên</label>
          <div className="relative flex items-center">
            <User className={`absolute left-3 h-4 w-4 ${isNameInvalid ? "text-red-500" : "text-zinc-400"}`} />
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`pl-10 ${isNameInvalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
          <div className="relative flex items-center">
            <Mail className={`absolute left-3 h-4 w-4 ${isEmailInvalid ? "text-red-500" : "text-zinc-400"}`} />
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 ${isEmailInvalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="phone">Số điện thoại</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-zinc-400 text-sm">+84</span>
            <Input
              id="phone"
              placeholder="987 654 321"
              type="tel"
              disabled={isLoading}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="category">Lĩnh vực (Nhóm ngành)</label>
          <div className="relative flex items-center">
            <Layers className="absolute left-3 h-4 w-4 text-zinc-400" />
            <select
              id="category"
              disabled={isLoading}
              value={selectedCategoryId}
              onChange={(e) => {
                setSelectedCategoryId(e.target.value);
                setSelectedProfessionId(""); // Reset nghề khi đổi nhóm
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
              required
            >
              <option value="" disabled>-- Chọn nhóm ngành --</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="profession">Ngành nghề cụ thể</label>
          <div className="relative flex items-center">
            <Briefcase className="absolute left-3 h-4 w-4 text-zinc-400" />
            <select
              id="profession"
              disabled={isLoading || !selectedCategoryId}
              value={selectedProfessionId}
              onChange={(e) => setSelectedProfessionId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
              required
            >
              <option value="" disabled>-- Chọn ngành nghề --</option>
              {availableProfessions.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="password">Mật khẩu</label>
          <div className="relative flex items-center">
            <Lock className={`absolute left-3 h-4 w-4 ${isPasswordWeak ? "text-red-500" : "text-zinc-400"}`} />
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 pr-10 ${isPasswordWeak ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {isPasswordWeak && (
            <p className="text-xs text-red-500 mt-1">Mật khẩu quá yếu (tối thiểu 6 ký tự)</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <div className="relative flex items-center">
            <Lock className={`absolute left-3 h-4 w-4 ${isConfirmPasswordInvalid ? "text-red-500" : "text-zinc-400"}`} />
            <Input
              id="confirmPassword"
              placeholder="••••••••"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              disabled={isLoading}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`pl-10 pr-10 ${isConfirmPasswordInvalid ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {isConfirmPasswordInvalid && (
            <p className="text-xs text-red-500 mt-1">Mật khẩu xác nhận không khớp</p>
          )}
        </div>

        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm mt-2" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Tạo tài khoản
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500">
            Hoặc đăng ký với
          </span>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <Button
          variant="outline"
          type="button"
          className="w-full h-11 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm font-medium text-zinc-700 dark:text-zinc-200 flex items-center justify-center gap-2"
          disabled={isGoogleLoading || isLoading}
          onClick={() => handleOAuthLogin("google")}
        >
          {isGoogleLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
          )}
          Tiếp tục với Google
        </Button>
      </div>

      <p className="px-8 text-center text-sm text-neutral-500">
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}

