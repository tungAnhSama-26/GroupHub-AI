"use server";

import { prisma, Community } from "@grouphub/database";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function generateUniqueSlug(baseSlug: string) {
  let uniqueSlug = baseSlug || "community";
  let counter = 1;
  while (true) {
    const existing = await prisma.community.findUnique({ where: { slug: uniqueSlug } });
    if (!existing) break;
    uniqueSlug = `${baseSlug || "community"}-${counter}`;
    counter++;
  }
  return uniqueSlug;
}

/**
 * Lấy danh sách cộng đồng đã được duyệt cho trang chủ
 */
export async function getVerifiedCommunities(searchQuery: string = "", category: string = "") {
  try {
    const whereClause: any = {
      isVerified: true,
    };

    if (searchQuery) {
      whereClause.name = { contains: searchQuery, mode: "insensitive" };
    }
    
    if (category) {
      whereClause.domain = category;
    }

    const communities = await prisma.community.findMany({
      where: whereClause,
      orderBy: { memberCount: "desc" },
      take: 50, // Giới hạn lấy 50 cộng đồng lớn nhất/mới nhất
    });

    return { success: true, data: communities };
  } catch (error) {
    console.error("Lỗi khi lấy danh sách cộng đồng:", error);
    return { success: false, data: [] };
  }
}

/**
 * Submit cộng đồng mới (cần được duyệt)
 */
export async function submitCommunity(data: {
  name: string;
  description: string;
  platform: string;
  domain: string;
  url: string;
  logoUrl?: string;
  memberCount: number;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { success: false, message: "Bạn cần đăng nhập để thực hiện chức năng này." };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user?.isApproved || !user?.isOnboarded) {
      return { success: false, message: "Tài khoản của bạn chưa được duyệt hoặc chưa hoàn tất hồ sơ." };
    }

    // Kiểm tra URL trùng lặp
    const existing = await prisma.community.findUnique({
      where: { url: data.url }
    });

    if (existing) {
      return { success: false, message: "Đường dẫn cộng đồng này đã tồn tại trong hệ thống." };
    }

    const baseSlug = slugify(data.name);
    const uniqueSlug = await generateUniqueSlug(baseSlug);

    await prisma.community.create({
      data: {
        name: data.name,
        slug: uniqueSlug,
        description: data.description,
        platform: data.platform,
        domain: data.domain,
        url: data.url,
        logoUrl: data.logoUrl || null,
        memberCount: data.memberCount,
        ownerId: user.id,
        isVerified: user.role === 'ADMIN', // Tự động duyệt nếu là Admin
      }
    });

    try {
      const { logActivity } = await import("@/lib/activity-logger");
      await logActivity(user.id, "CREATE_COMMUNITY", `Đăng ký nhóm ${data.name}`);
    } catch (e) {
      console.error(e);
    }

    revalidatePath("/admin/groups/approve"); // Báo cho admin biết có nhóm mới chờ duyệt
    
    return { success: true, message: "Đăng cộng đồng thành công! Vui lòng chờ admin xét duyệt." };
  } catch (error: any) {
    console.error("Lỗi khi đăng cộng đồng:", error);
    return { success: false, message: "Đã xảy ra lỗi, vui lòng thử lại sau." };
  }
}

/**
 * Lấy danh sách danh mục để làm bộ lọc ở Trang chủ
 */
export async function getFilterCategories() {
  try {
    const categories = await prisma.professionCategory.findMany({
      where: { isActive: true },
      select: { name: true },
      orderBy: { name: 'asc' },
      take: 6, // Chỉ lấy 6 danh mục nổi bật nhất cho trang chủ
    });
    return { success: true, data: categories.map(c => c.name) };
  } catch (error) {
    console.error("Lỗi khi lấy bộ lọc:", error);
    return { success: false, data: [] };
  }
}

/**
 * Upload hình ảnh từ client lên server (lưu cục bộ vào public/uploads)
 */
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, url: "" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'image/png';
    const dataUri = `data:${mimeType};base64,${base64}`;

    return { success: true, url: dataUri };
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
    return { success: false, url: "" };
  }
}
