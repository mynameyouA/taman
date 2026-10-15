# CẨM NANG HƯỚNG DẪN CẤU HÌNH API KEYS & TRIỂN KHAI HỆ THỐNG TÂM AN AI
**Phiên bản: V5.2 Production Ready**  
**Tác giả: Ban Điều Hành & Quản Trị Hệ Thống Tâm An AI (Repo 1 & Repo 2 MetaGPT)**

---

## I. TỔNG QUAN KIẾN TRÚC SMART FAILOVER ROUTER
Hệ sinh thái Tâm An AI được trang bị công nghệ **Multi-Provider Failover Routing** thông minh tại `src/utils/freeLLMRouter.ts`. Khi người dùng trò chuyện cùng Thầy Sinh hoặc phân tích giấc mộng, hệ thống sẽ tự động điều phối theo 5 tầng ưu tiên:

```
[Người dùng đặt câu hỏi]
       │
       ▼
┌──────────────────────────────────────────────┐
│  Tầng 1: Google Gemini Flash (15 RPM)         │ ──(Còn token)──> Trả về SSE Stream mượt mà
└──────────────────────────────────────────────┘
       │ (Hết quota / Lỗi 429)
       ▼
┌──────────────────────────────────────────────┐
│  Tầng 2: Groq Cloud (Llama 3.3 70B - 30 RPM) │ ──(Thành công)──> Trả về SSE Stream ~300 t/s
└──────────────────────────────────────────────┘
       │ (Quá tải / Lỗi mạng)
       ▼
┌──────────────────────────────────────────────┐
│  Tầng 3: OpenRouter Free Models (:free)      │ ──(Thành công)──> Trả về SSE Stream
└──────────────────────────────────────────────┘
       │ (Không kết nối)
       ▼
┌──────────────────────────────────────────────┐
│  Tầng 4: FreeLLM Local Proxy (Cục bộ)        │ ──(Thành công)──> Trả về SSE Stream
└──────────────────────────────────────────────┘
       │ (Toàn bộ mạng ngoài ngắt kết nối)
       ▼
┌──────────────────────────────────────────────┐
│  Tầng 5: Tâm An Holistic Wisdom Fallback     │ ──(100% Sẵn sàng)──> Thầy Sinh khai tuệ nội tại
└──────────────────────────────────────────────┘
```

> **Cam kết:** 100% cuộc trò chuyện không bao giờ bị đứt gãy, không bao giờ văng lỗi ra màn hình người dùng.

---

## II. HƯỚNG DẪN LẤY API KEY MIỄN PHÍ TỪNG NHÀ CUNG CẤP

### 1. Google Gemini API (Ưu tiên 1)
- **Hạn mức miễn phí:** 15 Requests/phút (RPM), 1 triệu token context window.
- **Thời hạn:** Miễn phí vĩnh viễn (Free Tier).
- **Các bước lấy Key:**
  1. Truy cập: [Google AI Studio](https://aistudio.google.com/app/apikey).
  2. Đăng nhập bằng tài khoản Google bất kỳ.
  3. Bấm nút **"Create API key"** -> Chọn project mới hoặc mặc định.
  4. Copy chuỗi API key (dạng: `AIzaSy...`).
  5. Điền vào biến môi trường: `GEMINI_API_KEY=AIzaSy...`.

---

### 2. Groq Cloud API (Ưu tiên 2 - ĐỀ XUẤT SỬ DỤNG NHẤT)
- **Đặc điểm nổi bật:** Tốc độ suy luận siêu tốc (LPU chip ~300 token/giây), trả lời gần như tức thì.
- **Hạn mức miễn phí:** 30 Requests/phút (RPM), 14,400 Requests/ngày (RPD).
- **Yêu cầu:** **KHÔNG CẦN THẺ TÍN DỤNG**.
- **Các bước lấy Key:**
  1. Truy cập: [Groq Console](https://console.groq.com/keys).
  2. Đăng nhập bằng tài khoản GitHub hoặc Google.
  3. Bấm **"Create API Key"** -> Đặt tên (ví dụ: `TamAnAI_Prod`).
  4. Copy chuỗi API key (dạng: `gsk_...`).
  5. Điền vào biến môi trường:
     ```env
     GROQ_API_KEY=gsk_...
     GROQ_MODEL=llama-3.3-70b-versatile
     ```

---

### 3. OpenRouter Free Models (Ưu tiên 3)
- **Đặc điểm:** Hỗ trợ danh bạ hàng chục model mã nguồn mở tốt nhất thế giới hoàn toàn miễn phí (hậu tố `:free`).
- **Các model hỗ trợ:**
  * `meta-llama/llama-3.3-70b-instruct:free`
  * `deepseek/deepseek-r1:free`
  * `qwen/qwen-2.5-72b-instruct:free`
- **Các bước lấy Key:**
  1. Truy cập: [OpenRouter Keys](https://openrouter.ai/keys).
  2. Đăng nhập qua Google/GitHub.
  3. Bấm **"Create Key"** -> Đặt hạn mức `Credit limit: 0` (chỉ dùng các model free).
  4. Copy chuỗi API key (dạng: `sk-or-v1-...`).
  5. Điền vào biến môi trường:
     ```env
     OPENROUTER_API_KEY=sk-or-v1-...
     OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free
     ```

---

### 4. FreeLLM Local Gateway (Ưu tiên 4 - Tùy chọn)
Nếu bạn muốn chạy gateway mã nguồn mở từ repo `freellmapi` ngay trên server nội bộ:
```bash
# Khởi chạy proxy tại port 3001
cd scratch/freellmapi
npm install
npm start
```
Cấu hình biến môi trường:
```env
FREELLM_PROXY_URL=http://127.0.0.1:3001/v1
```

---

## III. MẪU CẤU HÌNH BIẾN MÔI TRƯỜNG HOÀN CHỈNH (`.env.local`)

Tạo file `.env.local` tại thư mục gốc của dự án `tam-an-ai-app/`:

```env
# ==============================================================
# HỆ SINH THÁI TÂM AN AI - PRODUCTION ENVIRONMENT CONFIGURATION
# ==============================================================

# Port cấu hình (mặc định 3000)
PORT=3000

# 1. Google Gemini Flash (Tầng 1)
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.0-flash

# 2. Groq Cloud (Tầng 2 - Cực nhanh)
GROQ_API_KEY=gsk_...
GROQ_MODEL=llama-3.3-70b-versatile

# 3. OpenRouter Free (Tầng 3)
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct:free

# 4. FreeLLM Proxy (Tầng 4 - Nếu có)
# FREELLM_PROXY_URL=http://127.0.0.1:3001/v1

# 5. Database & Security (Tùy chọn)
DATABASE_URL=
NEXTAUTH_SECRET=tam_an_ai_sacred_secret_key_2026
```

---

## IV. HƯỚNG DẪN TRIỂN KHAI PRODUCTION (DEPLOYMENT)

### 1. Triển khai lên Vercel (Khuyên dùng - Nhanh nhất)
1. Đẩy mã nguồn lên kho lưu trữ GitHub/GitLab cá nhân.
2. Truy cập [Vercel Dashboard](https://vercel.com) -> Bấm **"Add New Project"** -> Import repo.
3. Trong mục **Environment Variables**, thêm các biến:
   - `GEMINI_API_KEY`
   - `GROQ_API_KEY`
   - `OPENROUTER_API_KEY`
4. Bấm **"Deploy"**. Vercel sẽ tự động tối ưu hóa Next.js 16 và cấp chứng chỉ SSL HTTPS miễn phí.

---

### 2. Triển khai Docker Container trên VPS Linux (Ubuntu / Debian)
Tạo file `Dockerfile` nếu triển khai VPS độc lập:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```
Khởi chạy với Docker:
```bash
docker build -t tam-an-ai-app .
docker run -d -p 3000:3000 --env-file .env.local --name taman_app tam-an-ai-app
```

---

## V. HƯỚNG DẪN TRẢI NGHIỆM MOBILE PWA CHO NGƯỜI DÙNG

Website đã tích hợp đầy đủ công nghệ **Progressive Web App (PWA V2.0)**:
- **Trên Android (Chrome/Cốc Cốc/Samsung Internet):**
  - Khi mở web, sau 3.5 giây sẽ xuất hiện thanh thông báo viền vàng: **"Cài Đặt Tâm An AI Vào Điện Thoại"**.
  - Bấm nút **"Cài Đặt 1 Chạm Ngay"**, ứng dụng sẽ tự động xuất hiện trên màn hình chính như một app tải từ Google Play.
- **Trên iOS (iPhone / iPad - Safari):**
  - Mở web bằng trình duyệt Safari.
  - Bấm biểu tượng **Chia sẻ (Share)** ở thanh công cụ dưới đáy màn hình.
  - Cuộn xuống chọn **"Thêm vào Màn hình chính" (Add to Home Screen)**.
  - Ứng dụng sẽ có biểu tượng hoa sen Bát Diệp vàng kim, khởi chạy toàn màn hình không có thanh địa chỉ URL.
