import { NextResponse } from "next/server";
import { prisma } from "@grouphub/database";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // Authenticate the user securely using better-auth session
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { phone, dob, professionId } = body;
    const userId = session.user.id;

    if (!phone || !dob || !professionId) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 });
    }

    // Update user in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        phone: phone,
        dob: new Date(dob),
        isOnboarded: true,
        // Since isApproved is false by default, we just leave it.
        professions: {
          connect: { id: professionId }
        }
      },
      },
    });

    try {
      const { logActivity } = await import("@/lib/activity-logger");
      await logActivity(userId, "REGISTER", "Thành viên mới tham gia");
    } catch (e) {
      console.error(e);
    }

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    console.error("Onboarding API Error:", error);
    return NextResponse.json({ error: "Lỗi Server Internal" }, { status: 500 });
  }
}
