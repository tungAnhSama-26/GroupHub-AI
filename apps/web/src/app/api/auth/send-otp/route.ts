import { NextResponse } from "next/server";
import { prisma } from "@grouphub/database";
import { randomInt } from "crypto";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate 6 digit OTP
    const otp = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    // Upsert into Verification
    await prisma.verification.create({
      data: {
        id: uuidv4(),
        identifier: email,
        value: otp,
        expiresAt,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    // Determine SMTP Config
    let transporter;
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Use test account if no real SMTP provided
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log(`[DEV MODE] No SMTP configured. Using Ethereal Email.`);
    }

    const info = await transporter.sendMail({
      from: '"GroupHub AI" <noreply@grouphub.ai>',
      to: email,
      subject: "Mã xác nhận đăng ký tài khoản GroupHub AI",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Xin chào!</h2>
          <p>Cảm ơn bạn đã đăng ký tài khoản tại GroupHub AI. Dưới đây là mã OTP xác nhận tài khoản của bạn:</p>
          <div style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 5px; padding: 20px; background: #f3f4f6; text-align: center; border-radius: 10px; margin: 20px 0; max-width: 300px;">
            ${otp}
          </div>
          <p>Mã này có hiệu lực trong vòng 15 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.</p>
          <p>Trân trọng,<br/>Đội ngũ GroupHub AI</p>
        </div>
      `,
    });

    console.log(`[EMAIL SENT] OTP to ${email}. Message ID: ${info.messageId}`);
    
    // In dev mode, this gives us a URL to view the sent email in the browser
    if (!process.env.SMTP_HOST) {
      console.log(`[DEV PREVIEW URL]: ${nodemailer.getTestMessageUrl(info)}`);
    }

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error: unknown) {
    console.error("Send OTP error:", error);
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json({ error: err.message || "Failed to send OTP", stack: err.stack }, { status: 500 });
  }
}
