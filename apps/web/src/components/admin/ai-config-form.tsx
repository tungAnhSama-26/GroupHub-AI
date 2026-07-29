"use client";

import { useState, useTransition } from "react";
import React from "react";
import { toast } from "sonner";
import { Bot, Save, Zap, AlertCircle, CheckCircle2, Loader2, Eye, EyeOff, RotateCcw } from "lucide-react";
import { saveAiConfig, testAiConfig, type AiConfigData, type AiProvider } from "@/app/admin/settings/actions";

const OpenAILogo = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0462 6.0462 0 0 0 5.4715-3.21 5.9847 5.9847 0 0 0 3.5504-2.9001 6.0462 6.0462 0 0 0-.0001-8.0688ZM11.166 22.2285a4.57 4.57 0 0 1-2.9515-1.0772 4.4173 4.4173 0 0 1-1.745-3.3283l.0305-6.425 5.5843 3.2201v6.2415c-.9472.247-1.9213.366-2.9183.3689ZM5.2891 19.349a4.5702 4.5702 0 0 1-1.4293-2.7845 4.4175 4.4175 0 0 1 1.0094-3.56l5.5392-3.218v-6.438L4.85 6.5599c-.74.61-1.2828 1.4082-1.5796 2.324-.2969.9157-.3331 1.8845-.1055 2.822a4.4252 4.4252 0 0 0 2.1242 2.843l0 .0001ZM2.1554 9.1764A4.5703 4.5703 0 0 1 3.6766 6.347 4.4174 4.4174 0 0 1 7.42 5.3402L12.986 8.56V2.1234c-.8885-.145-1.7963-.122-2.6784.068A4.4254 4.4254 0 0 0 7.4243 4.316ZM12.834 1.7715a4.5701 4.5701 0 0 1 2.9515 1.0773 4.4174 4.4174 0 0 1 1.745 3.3283l-.0305 6.425-5.5843-3.22V3.1406c.9472-.2471 1.9212-.366 2.9183-.369ZM18.7109 4.651a4.5702 4.5702 0 0 1 1.4293 2.7845 4.4175 4.4175 0 0 1-1.0094 3.56l-5.5393 3.218v6.438l5.5583-3.2115c.74-.61 1.2828-1.4081 1.5796-2.324.2969-.9157.3331-1.8844.1055-2.822a4.425 4.425 0 0 0-2.1242-2.843ZM21.8446 14.8236a4.5701 4.5701 0 0 1-1.5212 2.8294 4.4174 4.4174 0 0 1-3.7434 1.0068l-5.566-3.2199v6.4365c.8885.145 1.7963.122 2.6784-.068a4.4254 4.4254 0 0 0 2.8835-2.1249ZM12 15.1118l-3.3235-1.916V9.3621L12 7.446l3.3235 1.916v3.8338L12 15.1118Z"/>
  </svg>
);

const GroqLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <text font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="40" letter-spacing="-2" fill="currentColor" x="50%" y="54%" text-anchor="middle" dominant-baseline="central">Groq</text>
  </svg>
);

const GeminiLogo = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E90FF" />
        <stop offset="100%" stopColor="#8A2BE2" />
      </linearGradient>
    </defs>
    <path fill="url(#gemini-grad)" d="M11.048 1.048a1.341 1.341 0 0 0-1.096.002C9.404 1.332 9.256 1.838 9.07 2.766L8.51 5.564c-.161.803-.4 1.498-.718 2.083-.317.585-.758 1.026-1.321 1.321-.564.296-1.229.524-1.996.685L1.87 10.19c-.838.169-1.306.31-1.571.558-.266.248-.276.549 0 .807.275.257.734.402 1.571.575l2.604.537c.801.165 1.495.405 2.083.719.588.313 1.028.754 1.32 1.321.293.567.52 1.233.681 1.996l.542 2.607c.18 1.01.326 1.543.606 1.834.28.291.597.291.873 0 .275-.291.423-.822.613-1.834l.534-2.607c.16-.763.388-1.43.685-1.996.297-.567.737-1.008 1.32-1.321.583-.314 1.278-.554 2.085-.719l2.602-.537c1.077-.22 1.62-.363 1.915-.658.296-.294.286-.54 0-.802-.284-.26-.814-.4-1.915-.623l-2.602-.534c-.767-.156-1.434-.383-2.001-.68-.567-.297-1.008-.737-1.322-1.321-.314-.584-.555-1.28-.72-2.085l-.547-2.602c-.172-.821-.314-1.317-.58-1.583Zm9.317 11.237a.895.895 0 0 0-.731 0c-.366.19-.464.527-.589 1.146l-.372 1.867c-.106.535-.265 1-.478 1.39-.211.39-.505.683-.88.88-.376.197-.82.35-1.332.457L14.249 18.38c-.559.113-.87.207-1.047.373-.178.165-.184.366 0 .538.184.171.49.268 1.047.383l1.737.358c.534.11 1 .27 1.39.479.391.209.684.502.88.88.195.378.347.822.455 1.332l.36 1.737c.121.674.218 1.029.405 1.223.187.194.398.194.582 0 .183-.194.282-.548.408-1.223l.357-1.737c.106-.51.26-1 .457-1.332.197-.378.491-.671.88-.88.388-.209.851-.369 1.39-.479l1.735-.358c.717-.147 1.079-.243 1.276-.44.197-.195.19-.359 0-.534-.189-.174-.543-.267-1.276-.416l-1.735-.356c-.51-.104-.955-.255-1.333-.453-.377-.198-.671-.491-.88-.88-.209-.39-.37-.853-.48-1.39l-.365-1.735c-.114-.548-.21-.878-.387-1.055Z"/>
  </svg>
);

const XAiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <text font-family="Georgia, serif" font-style="italic" font-weight="700" font-size="44" fill="currentColor" x="50%" y="54%" text-anchor="middle" dominant-baseline="central">xAI</text>
  </svg>
);

// ── Danh sách models theo provider ──────────────────────────
const PROVIDER_MODELS: Record<AiProvider, { label: string; value: string }[]> = {
  openai: [
    { label: "GPT-4o (Latest)", value: "gpt-4o" },
    { label: "GPT-4o Mini", value: "gpt-4o-mini" },
    { label: "GPT-4 Turbo", value: "gpt-4-turbo" },
    { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
    { label: "o1 Mini", value: "o1-mini" },
  ],
  groq: [
    { label: "Llama 3.3 70B Versatile", value: "llama-3.3-70b-versatile" },
    { label: "Llama 3.1 8B Instant", value: "llama-3.1-8b-instant" },
    { label: "Mixtral 8x7B", value: "mixtral-8x7b-32768" },
    { label: "Gemma2 9B IT", value: "gemma2-9b-it" },
    { label: "DeepSeek R1 70B", value: "deepseek-r1-distill-llama-70b" },
  ],
  gemini: [
    { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" },
    { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" },
    { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
    { label: "Gemini 1.5 Flash 8B", value: "gemini-1.5-flash-8b" },
  ],
  xai: [
    { label: "Grok Beta", value: "grok-beta" },
    { label: "Grok Vision Beta", value: "grok-vision-beta" },
    { label: "Grok 2", value: "grok-2" },
    { label: "Grok 2 Mini", value: "grok-2-mini" },
  ],
};

const PROVIDER_INFO: Record<AiProvider, { label: string; color: string; bg: string; border: string; icon: React.ReactNode; envKey: string }> = {
  openai:  { label: "OpenAI",       color: "text-emerald-700", bg: "bg-emerald-50",  border: "border-emerald-200", icon: <OpenAILogo className="w-6 h-6" />, envKey: "OPENAI_API_KEY" },
  groq:    { label: "Groq",         color: "text-orange-700",  bg: "bg-orange-50",   border: "border-orange-200",  icon: <GroqLogo className="w-6 h-6" />, envKey: "GROQ_API_KEY" },
  gemini:  { label: "Google Gemini",color: "text-blue-700",    bg: "bg-blue-50",     border: "border-blue-200",    icon: <GeminiLogo className="w-6 h-6" />, envKey: "GEMINI_API_KEY" },
  xai:     { label: "xAI Grok",     color: "text-purple-700",  bg: "bg-purple-50",   border: "border-purple-200",  icon: <XAiLogo className="w-6 h-6" />, envKey: "XAI_API_KEY" },
};

const DEFAULT_SYSTEM_PROMPT = `Bạn là trợ lý AI thông minh của GroupHub AI - nền tảng khám phá cộng đồng trực tuyến hàng đầu Việt Nam.

Nhiệm vụ của bạn:
- Giúp người dùng tìm kiếm và khám phá các cộng đồng phù hợp với sở thích
- Tư vấn về các cộng đồng Discord, Telegram, Facebook Group chất lượng
- Giải đáp thắc mắc về cách tham gia và tương tác trong cộng đồng
- Luôn trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp

Hãy luôn nhiệt tình, hữu ích và cụ thể trong các câu trả lời của bạn.`;

interface AiConfigFormProps {
  initialConfig?: {
    provider: string;
    model: string;
    systemPrompt: string;
    temperature: number;
    maxTokens: number;
  } | null;
}

// ── Validation ──────────────────────────────────────────────
interface ValidationErrors {
  provider?: string;
  model?: string;
  systemPrompt?: string;
  temperature?: string;
  maxTokens?: string;
}

function validate(data: {
  provider: string;
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  apiKey?: string | null;
  baseUrl?: string | null;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.provider) {
    errors.provider = "Vui lòng chọn nhà cung cấp AI.";
  }

  if (!data.model || data.model.trim() === "") {
    errors.model = "Vui lòng chọn model AI.";
  }

  const trimmedPrompt = data.systemPrompt.trim();
  if (!trimmedPrompt) {
    errors.systemPrompt = "System prompt không được để trống.";
  } else if (trimmedPrompt.length < 10) {
    errors.systemPrompt = "System prompt phải có ít nhất 10 ký tự.";
  } else if (trimmedPrompt.length > 3000) {
    errors.systemPrompt = "System prompt không được vượt quá 3000 ký tự.";
  }

  if (isNaN(data.temperature) || data.temperature < 0 || data.temperature > 1) {
    errors.temperature = "Temperature phải từ 0.0 đến 1.0.";
  }

  if (isNaN(data.maxTokens) || data.maxTokens < 256 || data.maxTokens > 8192 || !Number.isInteger(data.maxTokens)) {
    errors.maxTokens = "Max tokens phải là số nguyên từ 256 đến 8192.";
  }

  return errors;
}

export function AiConfigForm({ initialConfig }: AiConfigFormProps) {
  const [provider, setProvider] = useState<AiProvider>(
    (initialConfig?.provider as AiProvider) ?? "openai"
  );
  const [model, setModel] = useState(initialConfig?.model ?? PROVIDER_MODELS.openai[0].value);
  const [systemPrompt, setSystemPrompt] = useState(initialConfig?.systemPrompt ?? DEFAULT_SYSTEM_PROMPT);
  const [temperature, setTemperature] = useState(initialConfig?.temperature ?? 0.7);
  const [maxTokens, setMaxTokens] = useState<number>(initialConfig?.maxTokens ?? 1024);
  const [apiKey, setApiKey] = useState<string>(initialConfig?.apiKey ?? "");
  const [baseUrl, setBaseUrl] = useState<string>(initialConfig?.baseUrl ?? "");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPromptPreview, setShowPromptPreview] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [isSaving, startSave] = useTransition();
  const [isTesting, startTest] = useTransition();

  // Đổi provider: reset model, errors, testResult ngay trong handler
  const handleProviderChange = (p: AiProvider) => {
    setProvider(p);
    setModel(PROVIDER_MODELS[p]?.[0]?.value ?? "");
    setErrors({});
    setTestResult(null);
  };

  const getFormData = (): AiConfigData => ({
    provider,
    model,
    systemPrompt,
    temperature,
    maxTokens,
    apiKey,
    baseUrl,
  });

  const handleSave = () => {
    const data = getFormData();
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Vui lòng kiểm tra lại các trường có lỗi.");
      return;
    }
    startSave(async () => {
      const res = await saveAiConfig(data);
      if (res.success) {
        toast.success(res.message);
        setTestResult(null);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleTest = () => {
    const data = getFormData();
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("Hãy điền đầy đủ thông tin trước khi kiểm tra kết nối.");
      return;
    }
    setTestResult(null);
    startTest(async () => {
      const res = await testAiConfig(data);
      setTestResult({ ok: res.success, msg: res.message });
      if (res.success) {
        toast.success("Kết nối thành công!");
      } else {
        toast.error("Kết nối thất bại!");
      }
    });
  };

  const handleResetPrompt = () => {
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    setErrors((e) => ({ ...e, systemPrompt: undefined }));
  };

  const charCount = systemPrompt.trim().length;
  const info = PROVIDER_INFO[provider];

  return (
    <div className="space-y-8">
      {/* ── Provider Selection ── */}
      <section>
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
          Nhà cung cấp AI <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(PROVIDER_INFO) as AiProvider[]).map((p) => {
            const pi = PROVIDER_INFO[p];
            const isActive = provider === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => handleProviderChange(p)}
                className={`relative flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                  ${isActive
                    ? `${pi.border} ${pi.bg} shadow-sm scale-[1.02]`
                    : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
              >
                <div className={`flex items-center justify-center ${isActive ? pi.color : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900"}`}>
                  {pi.icon}
                </div>
                <span className={`text-xs font-semibold ${isActive ? pi.color : "text-zinc-600 dark:text-zinc-400"}`}>
                  {pi.label}
                </span>
                {isActive && (
                  <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${pi.color.replace("text-", "bg-")}`} />
                )}
              </button>
            );
          })}
        </div>
        {errors.provider && (
          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.provider}
          </p>
        )}
      </section>

      {/* ── Model Selection ── */}
      <section>
        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
          Model <span className="text-red-500">*</span>
        </label>
        <select
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            setErrors((err) => ({ ...err, model: undefined }));
          }}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30
            ${errors.model ? "border-red-400 bg-red-50/30" : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"}`}
        >
          {PROVIDER_MODELS[provider].map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        {errors.model && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.model}
          </p>
        )}
      </section>

      {/* ── API Key ── */}
      <section>
        <div className="space-y-2 max-w-xl">
          <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <Bot className="w-4 h-4 text-zinc-500" /> API Key
          </label>
          <input
            type="password"
            placeholder="Để trống nếu đã cấu hình trong .env"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"
          />
          <p className="text-xs text-zinc-500">
            Hệ thống sẽ ưu tiên dùng key này thay cho biến môi trường.
          </p>
        </div>
      </section>

      {/* ── System Prompt ── */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            System Prompt <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${charCount > 2800 ? "text-red-500" : charCount > 2000 ? "text-orange-500" : "text-zinc-400"}`}>
              {charCount}/3000
            </span>
            <button
              type="button"
              onClick={() => setShowPromptPreview(!showPromptPreview)}
              className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              {showPromptPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPromptPreview ? "Ẩn preview" : "Preview"}
            </button>
            <button
              type="button"
              onClick={handleResetPrompt}
              className="text-xs text-zinc-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Mặc định
            </button>
          </div>
        </div>
        {!showPromptPreview ? (
          <textarea
            value={systemPrompt}
            onChange={(e) => {
              setSystemPrompt(e.target.value);
              setErrors((err) => ({ ...err, systemPrompt: undefined }));
            }}
            rows={8}
            placeholder="Nhập hướng dẫn cho AI chatbot... (tối thiểu 10 ký tự)"
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm font-mono resize-y transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30
              ${errors.systemPrompt ? "border-red-400 bg-red-50/30" : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"}`}
          />
        ) : (
          <div className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap min-h-[160px] font-mono">
            {systemPrompt || <span className="text-zinc-400 italic">Chưa có nội dung</span>}
          </div>
        )}
        {errors.systemPrompt && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.systemPrompt}
          </p>
        )}
      </section>

      {/* ── Parameters ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Temperature
            </label>
            <span className={`text-sm font-bold px-2.5 py-0.5 rounded-lg ${
              temperature < 0.4 ? "bg-blue-100 text-blue-700" :
              temperature < 0.7 ? "bg-green-100 text-green-700" :
              "bg-orange-100 text-orange-700"
            }`}>
              {temperature.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => {
              setTemperature(parseFloat(e.target.value));
              setErrors((err) => ({ ...err, temperature: undefined }));
            }}
            className="w-full h-2 accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>🧊 Cẩn thận (0.0)</span>
            <span>🎨 Sáng tạo (1.0)</span>
          </div>
          {errors.temperature && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.temperature}
            </p>
          )}
        </div>

        {/* Max Tokens */}
        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Max Tokens
          </label>
          <input
            type="number"
            min={256}
            max={8192}
            step={256}
            value={maxTokens}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              setMaxTokens(isNaN(v) ? 1024 : v);
              setErrors((err) => ({ ...err, maxTokens: undefined }));
            }}
            onBlur={(e) => {
              const v = parseInt(e.target.value, 10);
              if (isNaN(v) || v < 256) setMaxTokens(256);
              if (v > 8192) setMaxTokens(8192);
            }}
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30
              ${errors.maxTokens ? "border-red-400 bg-red-50/30" : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300"}`}
          />
          <p className="text-xs text-zinc-400 mt-1">Phạm vi: 256 – 8192 tokens</p>
          {errors.maxTokens && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.maxTokens}
            </p>
          )}
        </div>
      </section>

      {/* ── Test Result ── */}
      {testResult && (
        <div className={`p-4 rounded-xl border text-sm whitespace-pre-wrap ${
          testResult.ok
            ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300"
            : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300"
        }`}>
          <div className="flex items-start gap-2">
            {testResult.ok
              ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            }
            <span>{testResult.msg}</span>
          </div>
        </div>
      )}

      {/* ── Action Buttons ── */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={handleTest}
          disabled={isTesting || isSaving}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTesting
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang kiểm tra...</>
            : <><Zap className="w-4 h-4" /> Kiểm tra kết nối</>
          }
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || isTesting}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang lưu...</>
            : <><Save className="w-4 h-4" /> Lưu cấu hình</>
          }
        </button>
      </div>

      {/* ── Info Note ── */}
      <div className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-2">
        <Bot className="w-4 h-4 mt-0.5 shrink-0 text-zinc-400" />
        <span>
          Cấu hình này sẽ được áp dụng cho toàn bộ người dùng khi sử dụng AI chatbot.
          Nhớ <strong>Kiểm tra kết nối</strong> trước khi lưu để đảm bảo API key hợp lệ.
        </span>
      </div>
    </div>
  );
}
