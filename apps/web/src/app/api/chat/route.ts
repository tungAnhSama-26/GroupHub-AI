import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@grouphub/database";
import { streamText, tool, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGroq } from "@ai-sdk/groq";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    console.log("INCOMING MESSAGES FROM USECHAT:", JSON.stringify(messages, null, 2));

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Dữ liệu tin nhắn không hợp lệ." }, { status: 400 });
    }

    let isAdmin = false;
    try {
      const { auth } = await import("@/lib/auth");
      const { headers } = await import("next/headers");
      const { logActivity } = await import("@/lib/activity-logger");
      const session = await auth.api.getSession({ headers: await headers() });
      
      if (session?.user?.id) {
        // Log once per session to avoid spam, or log every time. Let's log every message for now.
        await logActivity(session.user.id, "CHAT_AI", "Trò chuyện với trợ lý ảo");
        const dbUser = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true }});
        isAdmin = dbUser?.role === "ADMIN";
      }
    } catch (e) {
      console.error("Lỗi log activity chat hoặc check role:", e);
    }

    const formattedMessages = messages
      .filter((msg: any) => {
        // Strip out tool messages and assistant messages with tool calls to prevent schema validation errors in AI SDK v5
        if (msg.role === 'tool') return false;
        if (msg.role === 'assistant' && msg.toolInvocations && msg.toolInvocations.length > 0) return false;
        return true;
      })
      .map((msg: any) => {
        let content = msg.content;
        if (!content && msg.parts && Array.isArray(msg.parts)) {
          content = msg.parts.map((p: any) => p.text || "").join("");
        }
        return {
          role: msg.role,
          content: content || "",
        };
      });

    const config = await prisma.aiConfig.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
    });

    if (!config) {
      return NextResponse.json({ error: "Chatbot chưa được cấu hình. Vui lòng liên hệ Admin." }, { status: 503 });
    }

    // Lấy thông tin các nhóm hàng đầu để inject vào AI prompt (RAG đơn giản)
    const topCommunities = await prisma.community.findMany({
      where: { isVerified: true },
      take: 20,
      orderBy: { memberCount: "desc" },
      select: { name: true, platform: true, domain: true, slug: true, description: true, memberCount: true }
    });

    const communityContext = topCommunities.map(c => 
      JSON.stringify({
        name: c.name,
        platform: c.platform,
        domain: c.domain,
        url: `http://localhost:3000/community/${c.slug}`,
        description: c.description || '',
        memberCount: c.memberCount
      })
    ).join('\n');

    let enrichedSystemPrompt = "";

    if (isAdmin) {
      enrichedSystemPrompt = `${config.systemPrompt}

THÔNG TIN QUAN TRỌNG: Bạn là trợ lý ảo đặc biệt dành riêng cho QUẢN TRỊ VIÊN (ADMIN) của hệ thống GroupHub AI.
Chức năng chính của bạn là hỗ trợ Admin tra cứu thống kê hệ thống, xem thông báo hoạt động, và giám sát tình trạng các hội nhóm.

Quy tắc BẮT BUỘC KHI GIAO TIẾP DÀNH CHO ADMIN:
1. Trả lời tự nhiên, chuyên nghiệp, súc tích bằng tiếng Việt.
2. TUYỆT ĐỐI KHÔNG trả về định dạng JSON trần. Các dữ liệu thống kê hãy trình bày dưới dạng danh sách hoặc bảng (markdown) dễ nhìn.
3. GIỚI HẠN CHỨC NĂNG: Bạn CHỈ ĐƯỢC PHÉP hỗ trợ các yêu cầu liên quan đến quản trị hệ thống GroupHub (thống kê người dùng, cộng đồng, thông báo/hoạt động hệ thống) và tìm kiếm cộng đồng.
4. TỪ CHỐI YÊU CẦU NGOÀI LUỒNG: Mặc dù đây là Admin, nhưng nếu họ yêu cầu viết code, làm toán, tư vấn đời sống, dịch thuật văn bản không liên quan... bạn VẪN PHẢI TỪ CHỐI lịch sự và nhắc nhở rằng bạn là AI chuyên biệt cho việc quản trị nền tảng GroupHub.
5. Sử dụng công cụ \`getSystemStats\` để lấy số liệu thực tế khi Admin hỏi về thống kê hệ thống hoặc thông báo mới nhất.`;
    } else {
      enrichedSystemPrompt = `${config.systemPrompt}

THÔNG TIN QUAN TRỌNG: Bạn là trợ lý ảo của GroupHub, giúp người dùng tìm kiếm và khám phá các hội nhóm.
Bạn CÓ SẴN kiến thức về các hội nhóm nổi bật sau đây:
${communityContext}

Quy tắc BẮT BUỘC KHI GIAO TIẾP:
1. Trả lời tự nhiên, thân thiện bằng tiếng Việt.
2. Tuyệt đối không được in ra các chuỗi như <function=...> hoặc function=... trong câu trả lời!
3. NẾU người dùng chỉ chào hỏi hoặc hỏi về khả năng của bạn (ví dụ: "Trợ lý AI có thể giúp gì cho tôi?"), CHỈ CẦN trả lời bằng văn bản bình thường giới thiệu bản thân, TUYỆT ĐỐI KHÔNG trả lời bằng JSON hay giới thiệu nhóm nếu chưa được yêu cầu.
4. CHỈ KHI người dùng yêu cầu tìm nhóm hoặc giới thiệu nhóm, bạn mới giới thiệu nhóm. ĐỂ GIAO DIỆN HIỂN THỊ ĐƯỢC THẺ NHÓM, bạn BẮT BUỘC phải bọc dữ liệu nhóm trong một block code với ngôn ngữ là \`community_card\`.
TUYỆT ĐỐI KHÔNG BAO GIỜ trả về JSON trần (phải luôn có 3 dấu ngoặc ngược).
5. GIỚI HẠN CHỨC NĂNG: Bạn CHỈ ĐƯỢC PHÉP trả lời và hỗ trợ các yêu cầu liên quan đến việc tìm kiếm, khám phá, đề xuất hội nhóm/cộng đồng/website. 
6. TỪ CHỐI YÊU CẦU NGOÀI LUỒNG: Nếu người dùng yêu cầu bạn làm bất cứ việc gì khác (ví dụ: viết code, làm bài tập, tư vấn y tế, sáng tác thơ, v.v.), bạn PHẢI TỪ CHỐI LỊCH SỰ và nhắc nhở họ rằng bạn chỉ là trợ lý chuyên biệt phục vụ việc tìm kiếm cộng đồng.

Ví dụ định dạng đúng (đây là cách duy nhất để hiển thị nhóm):
Dưới đây là nhóm bạn cần tìm:
\`\`\`community_card
[
  {
    "name": "Tên Nhóm",
    "url": "http://localhost:3000/community/slug",
    "platform": "Facebook",
    "memberCount": 150000,
    "description": "Mô tả ngắn"
  }
]
\`\`\`
- Bạn có thể gộp nhiều nhóm thành một mảng (array) JSON bên trong block \`community_card\`.`;
    }

    // Lấy API key từ DB hoặc fallback sang env
    const groqApiKey = (config.provider === 'groq' && config.apiKey) ? config.apiKey : process.env.GROQ_API_KEY;
    const openaiApiKey = (config.provider === 'openai' && config.apiKey) ? config.apiKey : process.env.OPENAI_API_KEY;
    const googleApiKey = (config.provider === 'gemini' && config.apiKey) ? config.apiKey : process.env.GEMINI_API_KEY;
    
    // @ts-ignore
    const groq = createGroq({ apiKey: groqApiKey });
    const openai = createOpenAI({ apiKey: openaiApiKey });
    const googleAi = createGoogleGenerativeAI({ apiKey: googleApiKey });

    // Tạo model chính từ cấu hình DB
    let primaryModel: any;
    try {
      if (config.provider === 'groq') primaryModel = groq(config.model || "llama-3.1-8b-instant");
      else if (config.provider === 'gemini') primaryModel = googleAi(config.model || "gemini-1.5-flash-8b");
      else if (config.provider === 'openai') primaryModel = openai(config.model || "gpt-4o-mini");
      else primaryModel = groq("llama-3.1-8b-instant"); // Default fallback
    } catch (e) {
      console.error("Lỗi khởi tạo model chính:", e);
      primaryModel = groq("llama-3.1-8b-instant");
    }

    const fallbackModels = [
      primaryModel,
      groq("llama-3.1-8b-instant"),
      googleAi("gemini-1.5-flash"), 
      openai("gpt-4o-mini")
    ];

    const fallbackModelWrapper = new Proxy(fallbackModels[0], {
      get(target, prop) {
        if (prop === 'doGenerate') {
          return async (options: any) => {
            let lastError = null;
            for (const model of fallbackModels) {
              try { return await model.doGenerate(options); }
              catch (e) { lastError = e; console.error("[Fallback doGenerate] Model", model.modelId, "lỗi:", e); }
            }
            return {
              text: "Xin lỗi, hiện tại hệ thống đang quá tải. Vui lòng thử lại sau!",
              usage: { promptTokens: 0, completionTokens: 0 },
              rawCall: { requestBody: options.prompt },
              rawResponse: { headers: {} },
              warnings: []
            };
          };
        }
        if (prop === 'doStream') {
          return async (options: any) => {
            let lastError = null;
            for (const model of fallbackModels) {
              try { return await model.doStream(options); }
              catch (e) { lastError = e; console.error("[Fallback doStream] Model", model.modelId, "lỗi:", e); }
            }
            return {
              stream: new ReadableStream({
                start(controller) {
                  const id = "msg_fallback_" + Date.now();
                  const fallbackText = "Xin lỗi, hiện tại hệ thống đang quá tải. Vui lòng thử lại sau ít phút!";
                  
                  controller.enqueue({ type: 'text-start', id });
                  controller.enqueue({ type: 'text-delta', id, textDelta: fallbackText, delta: fallbackText });
                  controller.enqueue({ type: 'text-end', id });
                  
                  controller.enqueue({ 
                    type: 'finish', 
                    finishReason: 'stop', 
                    usage: {
                      inputTokens: { total: 0 },
                      outputTokens: { total: 0 }
                    } 
                  });
                  
                  controller.close();
                }
              }),
              rawCall: { requestBody: options.prompt },
              rawResponse: { headers: {} },
              warnings: []
            };
          };
        }
        return target[prop as keyof typeof target];
      }
    });

    // @ts-ignore
    const result = streamText({
      model: fallbackModelWrapper as any,
      system: enrichedSystemPrompt,
      messages: formattedMessages.slice(-20),
      maxTokens: config.maxTokens,
      temperature: config.temperature,
      maxSteps: 5,
      tools: {
        // @ts-ignore
        searchCommunitiesTool: tool({
          description: "Tìm kiếm hội nhóm (communities) dựa trên từ khóa, nền tảng (Facebook, Zalo...) và lĩnh vực (category). Trả về danh sách hội nhóm phù hợp.",
          parameters: z.object({
            query: z.string().describe("The search keyword (e.g. react, design, marketing)"),
            platform: z.string().describe("The platform (e.g. Facebook, Zalo, Discord, Telegram)"),
            category: z.string().describe("The domain or category of the group"),
          }).catchall(z.any()),
          // @ts-ignore
          execute: async ({ query, platform, category }: { query?: string; platform?: string; category?: string }) => {
            const where: Record<string, unknown> = { isVerified: true };
            if (query) {
              where.OR = [
                { name: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
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
        // @ts-ignore
        getPlatforms: tool({
          description: "Lấy danh sách các nền tảng mạng xã hội hiện có (như Facebook, Zalo...) và số lượng nhóm của mỗi nền tảng",
          parameters: z.object({}),
          execute: async () => {
            const platforms = await prisma.community.groupBy({
              by: ['platform'],
              _count: { id: true },
              where: { isVerified: true }
            });
            return platforms.map(p => ({ platform: p.platform, count: p._count.id }));
          }
        }),
        // @ts-ignore
        getTopCommunitiesTool: tool({
          description: "Lấy danh sách các cộng đồng nổi bật, có đông thành viên nhất trên hệ thống GroupHub AI.",
          parameters: z.object({}),
          // @ts-ignore
          execute: async () => {
            const communities = await prisma.community.findMany({
              where: { isVerified: true },
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
        // @ts-ignore
        getSystemStats: tool({
          description: "Lấy thống kê hệ thống dành cho Admin: số lượng người dùng, tổng số cộng đồng, số cộng đồng đang chờ duyệt, và các hoạt động hệ thống gần nhất.",
          parameters: z.object({}),
          // @ts-ignore
          execute: async () => {
            const totalUsers = await prisma.user.count();
            const totalCommunities = await prisma.community.count({ where: { isVerified: true } });
            const pendingCommunities = await prisma.community.count({ where: { isVerified: false } });
            const recentActivities = await prisma.userActivity.findMany({
              take: 5,
              orderBy: { createdAt: "desc" },
              include: { user: { select: { name: true, email: true } } }
            });
            return {
              totalUsers,
              totalCommunities,
              pendingCommunities,
              recentActivities: recentActivities.map(a => ({
                action: a.action,
                details: a.details,
                user: a.user?.name || a.user?.email || "Unknown",
                time: a.createdAt
              }))
            };
          }
        }),
      }
    } as any);

    const response = (result as any).toUIMessageStreamResponse();
    
    // Wrap the response to filter out internal AI SDK error chunks when fallback mock stream is triggered
    const originalBody = response.body as ReadableStream<Uint8Array>;
    const customStream = new ReadableStream({
      async start(controller) {
        const reader = originalBody.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            if (buffer.length > 0 && !buffer.includes('"type":"error"')) {
              controller.enqueue(encoder.encode(buffer));
            }
            break;
          }
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          // Keep the last part in buffer since it might be incomplete
          buffer = lines.pop() || "";
          
          for (const line of lines) {
            // If this chunk contains the AI SDK error, filter it out to prevent UI crash
            if (line.includes('"type":"error"')) {
              continue;
            }
            controller.enqueue(encoder.encode(line + "\n\n"));
          }
        }
        controller.close();
      }
    });

    return new NextResponse(customStream, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error: unknown) {
    console.error("[/api/chat] error:", error);
    const msg = error instanceof Error ? error.message : "Lỗi không xác định";
    return NextResponse.json({ error: `Lỗi server: ${msg}` }, { status: 500 });
  }
}
