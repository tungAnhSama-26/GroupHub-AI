import { AdminHeader } from "@/components/admin/admin-header";
import { AiConfigForm } from "@/components/admin/ai-config-form";
import { getAiConfig } from "@/app/admin/settings/actions";
import { Bot, Clock, Cpu } from "lucide-react";

export default async function SettingsPage() {
  const { data: config } = await getAiConfig();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AdminHeader
        title="Cấu hình Chatbot AI"
        description="Thiết lập nhà cung cấp, model và hành vi của AI chatbot dành cho người dùng."
      />

      <div className="p-8 max-w-4xl mx-auto space-y-8">

        {/* ── Current status banner ── */}
        {config ? (
          <div className="flex flex-wrap items-center gap-4 p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Chatbot đang hoạt động</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">Cấu hình hiện tại đang được áp dụng</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 ml-auto">
              <span className="flex items-center gap-1.5 text-xs bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full font-medium">
                <Cpu className="w-3 h-3" />
                {config.provider.toUpperCase()} · {config.model}
              </span>
              <span className="flex items-center gap-1.5 text-xs bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full font-medium">
                <Clock className="w-3 h-3" />
                Cập nhật: {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(config.updatedAt))}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Chưa có cấu hình</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">Hãy cấu hình AI chatbot bên dưới để bật tính năng cho người dùng.</p>
            </div>
          </div>
        )}

        {/* ── Form card ── */}
        <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Thiết lập AI</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Chọn provider, model và tùy chỉnh hành vi của chatbot.
            </p>
          </div>
          <div className="px-8 py-8">
            <AiConfigForm
              initialConfig={config ? {
                provider: config.provider,
                model: config.model,
                systemPrompt: config.systemPrompt,
                temperature: config.temperature,
                maxTokens: config.maxTokens,
              } : null}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
