import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@grouphub/database";
import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Dữ liệu tin nhắn không hợp lệ." }, { status: 400 });
    }

    const config = await prisma.aiConfig.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
    });

    if (!config) {
      return NextResponse.json({ error: "Chatbot chưa được cấu hình. Vui lòng liên hệ Admin." }, { status: 503 });
    }

    // Default to openai, fallback to process.env
    const apiKey = config.apiKey?.trim() || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key chưa được cấu hình." }, { status: 503 });
    }

    // Using Vercel AI SDK for function calling with OpenAI
    const model = openai("gpt-4o-mini"); // Default model for chatbot.md spec

    const result = streamText({
      model,
      system: config.systemPrompt,
      messages: messages.slice(-20),
      maxTokens: config.maxTokens,
      temperature: config.temperature,
      tools: {
        searchCommunitiesTool: tool({
          description: "Tìm kiếm hội nhóm (communities) dựa trên từ khóa, nền tảng (Facebook, Zalo...) và lĩnh vực (category). Trả về danh sách hội nhóm phù hợp.",
          parameters: z.object({
            keyword: z.string().optional().describe("Từ khóa tìm kiếm (ví dụ: react, thiết kế, marketing...)"),
            platform: z.string().optional().describe("Nền tảng (Zalo, Facebook, Discord, Telegram...)"),
            category: z.string().optional().describe("Lĩnh vực chuyên môn"),
          }),
          execute: async ({ keyword, platform, category }) => {
            const where: any = { isApproved: true };
            if (keyword) {
              where.OR = [
                { name: { contains: keyword, mode: "insensitive" } },
                { description: { contains: keyword, mode: "insensitive" } },
              ];
            }
            if (platform) where.platform = { equals: platform, mode: "insensitive" };
            if (category) where.domain = { equals: category, mode: "insensitive" };

            const communities = await prisma.community.findMany({
              where,
              take: 5,
              orderBy: { memberCount: "desc" },
            });
            return communities.map(c => ({
              id: c.id,
              name: c.name,
              platform: c.platform,
              memberCount: c.memberCount,
              domain: c.domain,
              url: c.url,
            }));
          },
        }),
        getTopCommunitiesTool: tool({
          description: "Lấy danh sách các cộng đồng nổi bật, có đông thành viên nhất trên hệ thống GroupHub AI.",
          parameters: z.object({}),
          execute: async () => {
            const communities = await prisma.community.findMany({
              where: { isApproved: true },
              take: 5,
              orderBy: { memberCount: "desc" },
            });
            return communities.map(c => ({
              id: c.id,
              name: c.name,
              platform: c.platform,
              memberCount: c.memberCount,
              url: c.url,
            }));
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error: unknown) {
    console.error("[/api/chat] error:", error);
    const msg = error instanceof Error ? error.message : "Lỗi không xác định";
    return NextResponse.json({ error: `Lỗi server: ${msg}` }, { status: 500 });
  }
}
