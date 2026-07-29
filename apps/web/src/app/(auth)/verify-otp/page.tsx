"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || otp.length !== 6) return;

    setIsLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Mã OTP không hợp lệ");
      }

      // Success, now login the user automatically (or redirect them to login if auto-login is hard)
      // Since they just verified, they should be able to log in. We assume autoSignIn did something, but maybe we just redirect to home.
      // Wait, better-auth might have logged them in already but with emailVerified=false.
      // Let's refresh the page/session.
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Không thể gửi lại mã OTP");
      }
      setSuccessMsg("Mã OTP mới đã được gửi đến email của bạn.");
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsResending(false);
    }
  };

  if (!email) return null;

  return (
    <div className="flex flex-col space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
        <Mail className="w-8 h-8 text-blue-600" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Kiểm tra Email</h1>
        <p className="text-neutral-500 text-sm max-w-sm mx-auto">
          Chúng tôi đã gửi một mã xác nhận gồm 6 chữ số tới <strong>{email}</strong>. Vui lòng nhập mã đó vào bên dưới.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}
      
      {successMsg && (
        <div className="p-3 bg-green-100 text-green-700 text-sm rounded-md">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-left pt-4">
        <div className="space-y-2">
          <label htmlFor="otp" className="text-sm font-medium text-neutral-900">Mã xác thực (OTP)</label>
          <Input
            id="otp"
            type="text"
            placeholder="Nhập mã 6 chữ số"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
            disabled={isLoading}
            className="h-12 text-center text-xl tracking-widest font-semibold"
          />
        </div>
        
        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm h-12" type="submit" disabled={isLoading || otp.length !== 6}>
          {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
          Xác nhận tài khoản
        </Button>
      </form>

      <p className="text-sm text-neutral-500 mt-6">
        Chưa nhận được mã?{" "}
        <button 
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="font-medium text-blue-600 hover:text-blue-500 underline-offset-4 hover:underline disabled:opacity-50"
        >
          {isResending ? "Đang gửi lại..." : "Gửi lại mã"}
        </button>
      </p>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}
