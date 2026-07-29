"use server";

import { prisma } from "@grouphub/database";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getRegistrationData() {
  try {
    const categories = await prisma.professionCategory.findMany({
      where: { isActive: true },
      include: {
        professions: {
          where: { isActive: true },
          orderBy: { name: 'asc' }
        }
      },
      orderBy: { name: 'asc' }
    });
    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching registration data:", error);
    return { success: false, categories: [] };
  }
}

export async function linkUserProfession(professionId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        professions: {
          connect: { id: professionId }
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error linking profession:", error);
    return { success: false, message: "Có lỗi xảy ra khi lưu lĩnh vực." };
  }
}
