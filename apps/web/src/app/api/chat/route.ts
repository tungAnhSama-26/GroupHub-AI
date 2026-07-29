import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@grouphub/database";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Auth check — chỉ user đã đăng nhập mới được dùng chatbot
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Bạn cần đăng nhập để sử dụng chatbot." }, { status: 401 });
    }

    const body = await req.json();
    const { messages } = body as { messages: { role: "user" | "assistant"; content: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Dữ liệu tin nhắn không hợp lệ." }, { status: 400 });
    }

    // Validate message content
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.content || lastMessage.content.trim() === "") {
      return NextResponse.json({ error: "Tin nhắn không được để trống." }, { status: 400 });
    }

    // Load active AI config
    const config = await prisma.aiConfig.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
    });

    if (!config) {
      return NextResponse.json(
        { error: "Chatbot chưa được cấu hình. Vui lòng liên hệ Admin." },
        { status: 503 }
      );
    }

    const systemMessage = { role: "system" as const, content: config.systemPrompt };
    const allMessages = [systemMessage, ...messages.slice(-20)]; // giới hạn lịch sử 20 tin

    // ── Route theo provider ──
    if (config.provider === "openai" || config.provider === "xai") {
      const isXai = config.provider === "xai";
      const envKey = isXai ? process.env.XAI_API_KEY : process.env.OPENAI_API_KEY;
      const apiKey = config.apiKey?.trim() || envKey;
      const baseURL = config.baseUrl?.trim() || (isXai ? "https://api.x.ai/v1" : undefined);

      if (!apiKey) {
        return NextResponse.json({ error: "API key chưa được cấu hình." }, { status: 503 });
      }

      const { default: OpenAI } = await import("openai");
      const client = new OpenAI({
        apiKey,
        ...(baseURL && { baseURL }),
      });

      const response = await client.chat.completions.create({
        model: config.model,
        messages: allMessages,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        stream: true,
      });

      // Stream response
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          for await (const chunk of response) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new NextResponse(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    }

    if (config.provider === "groq") {
      const apiKey = config.apiKey?.trim() || process.env.GROQ_API_KEY;
      const baseURL = config.baseUrl?.trim();
      
      if (!apiKey) {
        return NextResponse.json({ error: "GROQ_API_KEY chưa được cấu hình." }, { status: 503 });
      }

      const Groq = (await import("groq-sdk")).default;
      const client = new Groq({ apiKey, ...(baseURL && { baseURL }) });

      const response = await client.chat.completions.create({
        model: config.model,
        messages: allMessages,
        max_tokens: config.maxTokens,
        temperature: config.temperature,
        stream: true,
      });

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          for await (const chunk of response) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new NextResponse(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    }

    if (config.provider === "gemini") {
      const apiKey = config.apiKey?.trim() || process.env.GEMINI_API_KEY;
      const baseURL = config.baseUrl?.trim();
      
      if (!apiKey) {
        return NextResponse.json({ error: "GEMINI_API_KEY chưa được cấu hình." }, { status: 503 });
      }

      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: config.model,
        systemInstruction: config.systemPrompt,
        generationConfig: {
          maxOutputTokens: config.maxTokens,
          temperature: config.temperature,
        },
      }, baseURL ? { baseUrl: baseURL } : undefined);

      // Build Gemini history (exclude last user message)
      const history = messages.slice(0, -1).map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessageStream(lastMessage.content);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new NextResponse(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    }

    return NextResponse.json({ error: "Provider không được hỗ trợ." }, { status: 400 });
  } catch (error: unknown) {
    console.error("[/api/chat] error:", error);
    const msg = error instanceof Error ? error.message : "Lỗi không xác định";
    return NextResponse.json({ error: `Lỗi server: ${msg}` }, { status: 500 });
  }
}
