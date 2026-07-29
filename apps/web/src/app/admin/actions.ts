"use server";
import { auth } from "@/lib/auth";

import { prisma, Role } from "@grouphub/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { logActivity } from "@/lib/activity-logger";

// --- USER ACTIONS ---
export async function toggleUserRole(userId: string, currentRole: string) {
  try {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as Role },
    });
    revalidatePath("/admin/users");
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      await logActivity(session.user.id, "TOGGLE_USER_ROLE", `Đổi quyền user ${userId} thành ${newRole}`);
    }
    return { success: true, message: `Đã đổi quyền thành ${newRole}` };
  } catch {
    return { success: false, message: "Lỗi khi đổi quyền người dùng." };
  }
}

export async function updateUserRole(userId: string, newRole: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as Role },
    });
    revalidatePath("/admin/users");
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      await logActivity(session.user.id, "UPDATE_USER_ROLE", `Cập nhật quyền user ${userId} thành ${newRole}`);
    }
    return { success: true, message: `Đã cập nhật quyền thành ${newRole}` };
  } catch {
    return { success: false, message: "Lỗi khi cập nhật quyền người dùng." };
  }
}

export async function toggleUserBan(userId: string, currentStatus: boolean) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isBanned: !currentStatus },
    });
    revalidatePath("/admin/users");
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      await logActivity(session.user.id, "TOGGLE_USER_BAN", `${!currentStatus ? 'Khóa' : 'Mở khóa'} user ${userId}`);
    }
    return { success: true, message: `Đã ${!currentStatus ? 'khóa' : 'mở khóa'} người dùng thành công.` };
  } catch {
    return { success: false, message: "Lỗi khi cập nhật trạng thái người dùng." };
  }
}

// --- PROFESSION CATEGORY ACTIONS ---
export async function createProfessionCategory(name: string, description: string) {
  try {
    await prisma.professionCategory.create({
      data: { name, description, isActive: true },
    });
    revalidatePath("/admin/profession-categories");
    return { success: true, message: "Đã thêm nhóm nghề ngành nghề mới thành công." };
  } catch {
    return { success: false, message: "Lỗi khi thêm nhóm nghề. Tên có thể đã tồn tại." };
  }
}

export async function updateProfessionCategory(categoryId: string, name: string, description: string) {
  try {
    await prisma.professionCategory.update({
      where: { id: categoryId },
      data: { name, description },
    });
    revalidatePath("/admin/profession-categories");
    return { success: true, message: "Đã cập nhật nhóm nghề ngành nghề thành công." };
  } catch {
    return { success: false, message: "Lỗi khi cập nhật nhóm nghề." };
  }
}

export async function toggleProfessionCategoryStatus(categoryId: string, currentStatus: boolean) {
  try {
    await prisma.professionCategory.update({
      where: { id: categoryId },
      data: { isActive: !currentStatus },
    });
    revalidatePath("/admin/profession-categories");
    return { success: true, message: `Đã ${!currentStatus ? 'bật' : 'tắt'} trạng thái nhóm nghề.` };
  } catch {
    return { success: false, message: "Lỗi khi đổi trạng thái nhóm nghề." };
  }
}

// --- PROFESSION ACTIONS ---
export async function createProfession(name: string, description: string, categoryId: string) {
  try {
    await prisma.profession.create({
      data: { name, description, categoryId, isActive: true },
    });
    revalidatePath("/admin/professions");
    return { success: true, message: "Đã thêm ngành nghề mới thành công." };
  } catch {
    return { success: false, message: "Lỗi khi thêm ngành nghề. Tên có thể đã tồn tại." };
  }
}

export async function updateProfession(professionId: string, name: string, description: string, categoryId: string) {
  try {
    await prisma.profession.update({
      where: { id: professionId },
      data: { name, description, categoryId },
    });
    revalidatePath("/admin/professions");
    return { success: true, message: "Đã cập nhật ngành nghề thành công." };
  } catch {
    return { success: false, message: "Lỗi khi cập nhật ngành nghề." };
  }
}

export async function toggleProfessionStatus(professionId: string, currentStatus: boolean) {
  try {
    await prisma.profession.update({
      where: { id: professionId },
      data: { isActive: !currentStatus },
    });
    revalidatePath("/admin/professions");
    return { success: true, message: `Đã ${!currentStatus ? 'bật' : 'tắt'} trạng thái ngành nghề.` };
  } catch {
    return { success: false, message: "Lỗi khi đổi trạng thái ngành nghề." };
  }
}

// --- COMMUNITY (GROUP) ACTIONS ---
export async function verifyCommunity(communityId: string, currentStatus: boolean) {
  try {
    await prisma.community.update({
      where: { id: communityId },
      data: { isVerified: !currentStatus },
    });
    revalidatePath("/admin/groups");
    revalidatePath("/admin/groups/approve");
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user) {
      await logActivity(session.user.id, "VERIFY_COMMUNITY", `${!currentStatus ? 'Duyệt' : 'Bỏ duyệt'} nhóm ${communityId}`);
    }
    return { success: true, message: `Đã ${!currentStatus ? 'duyệt' : 'bỏ duyệt'} hội nhóm.` };
  } catch {
    return { success: false, message: "Lỗi khi thay đổi trạng thái hội nhóm." };
  }
}

export async function updateCommunity(communityId: string, name: string, memberCount: number, url: string) {
  try {
    await prisma.community.update({
      where: { id: communityId },
      data: { name, memberCount, url },
    });
    revalidatePath("/admin/groups");
    return { success: true, message: "Đã cập nhật hội nhóm thành công." };
  } catch {
    return { success: false, message: "Lỗi khi cập nhật hội nhóm." };
  }
}

export async function deleteCommunity(communityId: string) {
  try {
    await prisma.community.delete({
      where: { id: communityId },
    });
    revalidatePath("/admin/groups");
    revalidatePath("/admin/groups/approve");
    return { success: true, message: "Đã xóa hội nhóm thành công." };
  } catch {
    return { success: false, message: "Lỗi khi xóa hội nhóm." };
  }
}

export async function approveUser(userId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (session?.user?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true }
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/users/approve");
    await logActivity(session.user.id, "APPROVE_USER", `Duyệt người dùng ${userId}`);
    return { success: true };
  } catch (error: unknown) {
    console.error("Lỗi duyệt user:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function rejectUser(userId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (session?.user?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/users/approve");
    await logActivity(session.user.id, "REJECT_USER", `Từ chối và xóa người dùng ${userId}`);
    return { success: true, message: "Đã từ chối và xóa người dùng thành công." };
  } catch (error: unknown) {
    console.error("Lỗi từ chối user:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
