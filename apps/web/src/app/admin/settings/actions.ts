"use server";

import { prisma } from "@grouphub/database";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type AiProvider = "openai" | "groq" | "gemini" | "xai";

export interface AiConfigData {
  provider: AiProvider;
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  apiKey?: string;
  baseUrl?: string;
}

// --- Validation helper ---
function validateConfig(data: AiConfigData): string | null {
  if (!data.provider || !["openai", "groq", "gemini", "xai"].includes(data.provider)) {
    return "Vui lòng chọn nhà cung cấp AI.";
  }
  if (!data.model || data.model.trim() === "") {
    return "Vui lòng chọn model AI.";
  }
  if (!data.systemPrompt || data.systemPrompt.trim() === "") {
    return "System prompt không được để trống.";
  }
  if (data.systemPrompt.trim().length < 10) {
    return "System prompt phải có ít nhất 10 ký tự.";
  }
  if (data.temperature < 0 || data.temperature > 1) {
    return "Temperature phải nằm trong khoảng 0.0 – 1.0.";
  }
  if (data.maxTokens < 256 || data.maxTokens > 8192) {
    return "Max tokens phải nằm trong khoảng 256 – 8192.";
  }
  return null;
}

// --- Get current active config ---
export async function getAiConfig() {
  try {
    const config = await prisma.aiConfig.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: config };
  } catch (error) {
    console.error("getAiConfig error:", error);
    return { success: false, data: null };
  }
}

// --- Save (upsert) config ---
export async function saveAiConfig(data: AiConfigData) {
  try {
    // Auth check
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user?.role !== "ADMIN") {
      return { success: false, message: "Bạn không có quyền thực hiện thao tác này." };
    }

    // Validate
    const validationError = validateConfig(data);
    if (validationError) {
      return { success: false, message: validationError };
    }

    // Check trùng model trong cùng provider (nếu đã có config khác)
    const existing = await prisma.aiConfig.findFirst({
      where: { isActive: true },
    });

    const cleanData = {
      provider: data.provider,
      model: data.model.trim(),
      systemPrompt: data.systemPrompt.trim(),
      temperature: data.temperature,
      maxTokens: data.maxTokens,
      apiKey: data.apiKey?.trim() || null,
      baseUrl: data.baseUrl?.trim() || null,
      isActive: true,
    };

    if (existing) {
      // Check trùng: cùng provider + model → cảnh báo nhưng vẫn update
      if (existing.provider === cleanData.provider && existing.model === cleanData.model) {
        // Update in-place
        await prisma.aiConfig.update({
          where: { id: existing.id },
          data: cleanData,
        });
      } else {
        // Deactivate cũ, tạo mới
        await prisma.aiConfig.update({
          where: { id: existing.id },
          data: { isActive: false },
        });
        await prisma.aiConfig.create({ data: cleanData });
      }
    } else {
      await prisma.aiConfig.create({ data: cleanData });
    }

    revalidatePath("/admin/settings");
    return { success: true, message: "Đã lưu cấu hình AI thành công." };
  } catch (error) {
    console.error("saveAiConfig error:", error);
    return { success: false, message: "Lỗi server khi lưu cấu hình." };
  }
}

// --- Test connection ---
export async function testAiConfig(data: AiConfigData) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user?.role !== "ADMIN") {
      return { success: false, message: "Không có quyền." };
    }

    const validationError = validateConfig(data);
    if (validationError) {
      return { success: false, message: validationError };
    }

    const testPrompt = "Xin chào! Hãy trả lời bằng tiếng Việt: bạn là AI gì?";

    if (data.provider === "openai") {
      const apiKey = data.apiKey?.trim() || process.env.OPENAI_API_KEY;
      const baseURL = data.baseUrl?.trim();
      if (!apiKey) return { success: false, message: "API Key chưa được cung cấp (vui lòng nhập hoặc cấu hình trong .env)." };
      const { default: OpenAI } = await import("openai");
      const client = new OpenAI({ apiKey, ...(baseURL && { baseURL }) });
      const res = await client.chat.completions.create({
        model: data.model,
        messages: [
          { role: "system", content: data.systemPrompt.trim() },
          { role: "user", content: testPrompt },
        ],
        max_tokens: 100,
        temperature: data.temperature,
      });
      const reply = res.choices[0]?.message?.content ?? "(Không có phản hồi)";
      return { success: true, message: `✅ Kết nối thành công!\n\nPhản hồi: "${reply}"` };
    }

    if (data.provider === "groq") {
      const apiKey = data.apiKey?.trim() || process.env.GROQ_API_KEY;
      const baseURL = data.baseUrl?.trim();
      if (!apiKey) return { success: false, message: "API Key chưa được cung cấp (vui lòng nhập hoặc cấu hình trong .env)." };
      const Groq = (await import("groq-sdk")).default;
      const client = new Groq({ apiKey, ...(baseURL && { baseURL }) });
      const res = await client.chat.completions.create({
        model: data.model,
        messages: [
          { role: "system", content: data.systemPrompt.trim() },
          { role: "user", content: testPrompt },
        ],
        max_tokens: 100,
        temperature: data.temperature,
      });
      const reply = res.choices[0]?.message?.content ?? "(Không có phản hồi)";
      return { success: true, message: `✅ Kết nối thành công!\n\nPhản hồi: "${reply}"` };
    }

    if (data.provider === "gemini") {
      const apiKey = data.apiKey?.trim() || process.env.GEMINI_API_KEY;
      const baseURL = data.baseUrl?.trim();
      if (!apiKey) return { success: false, message: "API Key chưa được cung cấp (vui lòng nhập hoặc cấu hình trong .env)." };
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      // GoogleGenerativeAI doesn't directly support baseURL via standard constructor, but we pass apiKey
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: data.model }, baseURL ? { baseUrl: baseURL } : undefined);
      const result = await model.generateContent([data.systemPrompt.trim(), testPrompt]);
      const reply = result.response.text();
      return { success: true, message: `✅ Kết nối thành công!\n\nPhản hồi: "${reply}"` };
    }

    if (data.provider === "xai") {
      const apiKey = data.apiKey?.trim() || process.env.XAI_API_KEY;
      const baseURL = data.baseUrl?.trim() || "https://api.x.ai/v1";
      if (!apiKey) return { success: false, message: "API Key chưa được cung cấp (vui lòng nhập hoặc cấu hình trong .env)." };
      // xAI dùng OpenAI-compatible API
      const { default: OpenAI } = await import("openai");
      const client = new OpenAI({ apiKey, baseURL });
      const res = await client.chat.completions.create({
        model: data.model,
        messages: [
          { role: "system", content: data.systemPrompt.trim() },
          { role: "user", content: testPrompt },
        ],
        max_tokens: 100,
        temperature: data.temperature,
      });
      const reply = res.choices[0]?.message?.content ?? "(Không có phản hồi)";
      return { success: true, message: `✅ Kết nối thành công!\n\nPhản hồi: "${reply}"` };
    }

    return { success: false, message: "Provider không hợp lệ." };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Lỗi không xác định";
    return { success: false, message: `❌ Kết nối thất bại: ${msg}` };
  }
}
