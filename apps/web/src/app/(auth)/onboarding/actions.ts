"use server";

import { prisma } from "@grouphub/database";

export async function getActiveProfessions() {
  return await prisma.profession.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { name: 'asc' }
  });
}
