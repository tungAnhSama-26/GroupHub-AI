import { prisma } from "@grouphub/database";
import { headers } from "next/headers";

/**
 * Ghi log hoạt động của người dùng
 * @param userId ID của người dùng thực hiện hành động
 * @param action Tên hành động (vd: "LOGIN", "APPROVE_USER", "CREATE_COMMUNITY")
 * @param details Thông tin chi tiết (tùy chọn)
 */
export async function logActivity(userId: string, action: string, details?: string) {
  try {
    const headersList = await headers();
    
    // Thử lấy IP (trong production sẽ phức tạp hơn, đây là cách cơ bản)
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : realIp || "unknown";

    await prisma.userActivity.create({
      data: {
        userId,
        action,
        details,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Lỗi khi ghi log hoạt động:", error);
  }
}
