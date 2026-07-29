import { NextResponse } from "next/server";
import { prisma } from "@grouphub/database";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json({ error: "Thiếu email hoặc mã OTP" }, { status: 400 });
    }

    // Find the verification record
    const record = await prisma.verification.findFirst({
      where: {
        identifier: email,
        value: otp,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    if (!record) {
      return NextResponse.json({ error: "Mã OTP không chính xác" }, { status: 400 });
    }

    if (new Date() > record.expiresAt) {
      return NextResponse.json({ error: "Mã OTP đã hết hạn" }, { status: 400 });
    }

    // OTP is valid! Update User
    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
      }
    });

    // Delete used OTP
    await prisma.verification.delete({
      where: { id: record.id }
    });

    return NextResponse.json({ success: true, message: "Xác thực thành công" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: "Lỗi Server Internal" }, { status: 500 });
  }
}
