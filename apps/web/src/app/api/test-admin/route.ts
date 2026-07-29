import { NextResponse } from "next/server";
import { prisma } from "@grouphub/database";

export const dynamic = 'force-dynamic';

export async function GET() {
  await prisma.user.updateMany({
    where: { email: "tunganht26@gmail.com" },
    data: { role: "ADMIN" }
  });
  
  return NextResponse.json({ success: true, message: "Đã nâng cấp tài khoản tunganht26@gmail.com lên ADMIN thành công!" });
}
