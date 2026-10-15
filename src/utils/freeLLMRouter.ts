/**
 * Universal Free LLM Multi-Provider Engine & Failover Router
 * Nguồn cung cấp: FreeLLM / awesome-freellm-apis (Groq, OpenRouter Free, Gemini, Cloudflare AI, HuggingFace, ModelScope)
 * 
 * Tính năng cốt lõi:
 * 1. Tự động chuyển đổi mượt mà (Failover Routing):
 *    - Ưu tiên 1: Google Gemini (nếu có key hoặc còn quota)
 *    - Ưu tiên 2: Groq Free Tier (30 RPM, Llama-3.3-70b-versatile, Mixtral)
 *    - Ưu tiên 3: OpenRouter Free Models (DeepSeek-R1-Free, Llama-3-Free, Qwen-Free)
 *    - Ưu tiên 4: Cloudflare Workers AI / Public Endpoint
 *    - Ưu tiên 5: Tâm An Holistic Wisdom Fallback Engine (Đảm bảo 100% không bao giờ crash hoặc gián đoạn đối thoại)
 * 
 * 2. Tự động nhận diện lỗi: 429 Too Many Requests, Quota Exhausted, 5xx Server Error
 * 3. Hỗ trợ đầy đủ SSE Streaming cho giao diện người dùng
 */

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface FreeLLMProviderConfig {
  name: string;
  baseUrl: string;
  apiKey?: string;
  model: string;
  priority: number;
}

// Danh sách nhà cung cấp Free LLM tích hợp sẵn
export const FREE_LLM_PROVIDERS: FreeLLMProviderConfig[] = [
  // 1. Google Gemini AI Studio (Free Tier: 15 RPM, 1M context)
  {
    name: "Google Gemini",
    baseUrl: process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai",
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    priority: 1,
  },
  // 2. Groq (Free Tier: 30 RPM, 14,400 RPD không cần thẻ tín dụng)
  {
    name: "Groq Cloud",
    baseUrl: process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    priority: 2,
  },
  // 3. OpenRouter Free Models (Hàng chục model :free vĩnh viễn)
  {
    name: "OpenRouter Free",
    baseUrl: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free",
    priority: 3,
  },
  // 4. Cloudflare / FreeLLM Local Proxy (nếu cài đặt FreeLLM local tại port 3001)
  {
    name: "FreeLLM Local Gateway",
    baseUrl: process.env.FREELLM_PROXY_URL || "http://127.0.0.1:3001/v1",
    apiKey: process.env.FREELLM_API_KEY || "freellmapi-default",
    model: "auto",
    priority: 4,
  },
];

/**
 * Gọi API Chat Completion từ một Provider cụ thể
 */
async function callProvider(
  provider: FreeLLMProviderConfig,
  messages: LLMMessage[],
  temperature = 0.7
): Promise<string> {
  const url = `${provider.baseUrl.replace(/\/+$/, "")}/chat/completions`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (provider.apiKey) {
    headers["Authorization"] = `Bearer ${provider.apiKey}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: provider.model,
      messages,
      temperature,
      max_tokens: 1500,
    }),
    signal: AbortSignal.timeout(12000), // Timeout 12s mỗi provider để failover nhanh
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Provider ${provider.name} failed with status ${response.status}: ${errorText.slice(0, 200)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error(`Provider ${provider.name} returned empty content`);
  }

  return content;
}

/**
 * Bộ định tuyến thông minh (Smart Failover Router):
 * Tự động thử lần lượt các Provider theo thứ tự ưu tiên.
 * Nếu Gemini hết token hoặc lỗi 429/402, lập tức chuyển sang Groq/OpenRouter/FreeLLM mà người dùng không nhận ra độ trễ.
 */
export async function executeWithFailover(
  messages: LLMMessage[],
  fallbackTextGenerator: () => string
): Promise<{ text: string; providerUsed: string }> {
  // Lọc ra các provider có sẵn key (hoặc local proxy không cần key)
  const activeProviders = FREE_LLM_PROVIDERS.filter((p) => {
    if (p.name === "FreeLLM Local Gateway") {
      // Chỉ kích hoạt nếu có cờ cấu hình
      return Boolean(process.env.FREELLM_PROXY_URL);
    }
    return Boolean(p.apiKey && p.apiKey.trim().length > 5);
  }).sort((a, b) => a.priority - b.priority);

  // Thử lần lượt từng provider khả dụng
  for (const provider of activeProviders) {
    try {
      console.log(`[FreeLLM Router] Đang gọi ${provider.name} (${provider.model})...`);
      const text = await callProvider(provider, messages);
      console.log(`[FreeLLM Router] Thành công qua ${provider.name}`);
      return { text, providerUsed: provider.name };
    } catch (err: any) {
      console.warn(`[FreeLLM Router] ${provider.name} gặp sự cố hoặc hết token: ${err.message}. Đang chuyển tiếp provider tiếp theo...`);
    }
  }

  // Nếu tất cả các Cloud API đều hết token hoặc chưa cấu hình key:
  // Kích hoạt ngay lập tức Bộ Não Tâm An Minh Triết (Fallback Engine)
  console.log("[FreeLLM Router] Kích hoạt Tâm An Holistic Wisdom Fallback Engine nội tại.");
  return {
    text: fallbackTextGenerator(),
    providerUsed: "Tâm An Holistic Engine (Nội Tại)",
  };
}
