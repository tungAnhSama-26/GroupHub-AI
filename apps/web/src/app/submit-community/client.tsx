"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitCommunity, uploadImage } from "../actions";
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
  const [logoFile, setLogoFile] = useState<File | null>(null);

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

    if (!formData.name || !formData.url || !formData.platform || !formData.domain || !formData.memberCount || !formData.description || !logoFile) {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ các thông tin bắt buộc và tải lên ảnh Logo.", "warning");
      return;
    }

    startTransition(async () => {
      // Upload image first
      let uploadedLogoUrl = "";
      if (logoFile) {
        const uploadData = new FormData();
        uploadData.append("file", logoFile);
        const uploadRes = await uploadImage(uploadData);
        if (uploadRes.success) {
          uploadedLogoUrl = uploadRes.url;
        } else {
          Swal.fire("Lỗi", "Không thể tải lên ảnh Logo, vui lòng thử lại.", "error");
          return;
        }
      }

      const payload = {
        ...formData,
        logoUrl: uploadedLogoUrl,
        memberCount: parseInt(formData.memberCount.replace(/[^0-9]/g, '')) || 0,
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
            type="text"
            placeholder="VD: 15.000" 
            value={formData.memberCount}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, '');
              if (rawValue) {
                setFormData({ ...formData, memberCount: parseInt(rawValue).toLocaleString('vi-VN') });
              } else {
                setFormData({ ...formData, memberCount: "" });
              }
            }}
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
        <label className="text-sm font-medium text-neutral-700">Ảnh Logo cộng đồng <span className="text-red-500">*</span></label>
        <Input 
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setLogoFile(e.target.files[0]);
            }
          }}
          required
          className="h-11 cursor-pointer"
        />
        <p className="text-xs text-neutral-500 italic">Vui lòng tải lên ảnh logo (kích thước tối đa 5MB).</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Mô tả ngắn <span className="text-red-500">*</span></label>
        <Textarea 
          placeholder="Giới thiệu đôi nét về cộng đồng của bạn..." 
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
          required
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
