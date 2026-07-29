"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitCommunity } from "../actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function SubmitCommunityClient({ categories }: { categories: string[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platform: "Facebook",
    domain: categories[0] || "",
    url: "",
    logoUrl: "",
    memberCount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.url || !formData.platform || !formData.domain || !formData.memberCount) {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ các thông tin bắt buộc.", "warning");
      return;
    }

    startTransition(async () => {
      const payload = {
        ...formData,
        memberCount: parseInt(formData.memberCount) || 0,
      };

      const res = await submitCommunity(payload);
      if (res.success) {
        Swal.fire({
          title: 'Thành công!',
          text: res.message,
          icon: 'success',
          confirmButtonText: 'Quay lại Trang Chủ',
          confirmButtonColor: '#2563eb'
        }).then(() => {
          router.push("/");
        });
      } else {
        Swal.fire("Lỗi", res.message || "Đã xảy ra lỗi.", "error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Tên cộng đồng <span className="text-red-500">*</span></label>
          <Input 
            placeholder="VD: Cộng đồng Lập trình viên VN" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Lĩnh vực hoạt động <span className="text-red-500">*</span></label>
          <Select 
            value={formData.domain} 
            onValueChange={(val) => setFormData({ ...formData, domain: val || "" })}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Chọn lĩnh vực" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
              <SelectItem value="Khác">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Nền tảng <span className="text-red-500">*</span></label>
          <Select 
            value={formData.platform} 
            onValueChange={(val) => setFormData({ ...formData, platform: val || "" })}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Chọn nền tảng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Zalo">Zalo</SelectItem>
              <SelectItem value="Discord">Discord</SelectItem>
              <SelectItem value="Telegram">Telegram</SelectItem>
              <SelectItem value="Reddit">Reddit</SelectItem>
              <SelectItem value="Khác">Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">Số lượng thành viên ước tính <span className="text-red-500">*</span></label>
          <Input 
            type="number"
            min="0"
            placeholder="VD: 15000" 
            value={formData.memberCount}
            onChange={(e) => setFormData({ ...formData, memberCount: e.target.value })}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Đường dẫn tham gia (URL) <span className="text-red-500">*</span></label>
        <Input 
          type="url"
          placeholder="https://..." 
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Đường dẫn ảnh Logo (URL) <span className="text-neutral-400 font-normal">(Tùy chọn)</span></label>
        <Input 
          type="url"
          placeholder="https://example.com/logo.png" 
          value={formData.logoUrl}
          onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
          className="h-11"
        />
        <p className="text-xs text-neutral-500 italic">Vui lòng cung cấp địa chỉ (link) ảnh logo của bạn.</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Mô tả ngắn <span className="text-neutral-400 font-normal">(Tùy chọn)</span></label>
        <Textarea 
          placeholder="Giới thiệu đôi nét về cộng đồng của bạn..." 
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
          className="resize-none min-h-[100px]"
        />
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={() => router.push("/")}
          className="text-neutral-600 hover:text-blue-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Hủy & Quay lại
        </Button>
        <Button 
          type="submit" 
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] h-11"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Đang gửi...</>
          ) : (
            "Đăng cộng đồng"
          )}
        </Button>
      </div>
    </form>
  );
}
