# CẨM NANG HƯỚNG DẪN CẤU HÌNH API KEYS & TRIỂN KHAI MOBILE PWA V2.0 (TÂM AN AI)

> **Mật thư nội bộ từ Ban Quản Trị Hệ Thống (Repo 2 - MetaGPT & The Agency)**  
> **Phiên bản**: V2.0 Production Ready  
> **Cập nhật ngày**: 10/10/2026  
> **Tương thích**: Next.js 16 (App Router), FreeLLM Gateway, Google Gemini Flash, Antigravity IDE & Progressive Web Apps (PWA).

---

## MỤC LỤC
1. [Tổng Quan Kiến Trúc Đa Tầng Của Tâm An AI](#1-tổng-quan-kiến-trúc-đa-tầng)
2. [Chi Tiết Cấu Hình API Keys Tự Động & Chống Quá Tải](#2-chi-tiết-cấu-hình-api-keys)
   - 2.1. Cấu hình Google Gemini AI
   - 2.2. Cấu hình FreeLLM Gateway (Failover Engine miễn phí khi hết token)
   - 2.3. Cấu hình Antigravity IDE MCP Server (freellm-gateway)
3. [Cẩm Nang Cài Đặt Mobile PWA V2.0 Trải Nghiệm Chuẩn App Điện Thoại](#3-cẩm-nang-cài-đặt-mobile-pwa-v20)
   - 3.1. Hướng dẫn trên iOS (iPhone / iPad - Safari)
   - 3.2. Hướng dẫn trên Android (Samsung / Xiaomi / Pixel - Chrome)
   - 3.3. Hướng dẫn trên Máy tính (Windows / macOS / Linux - Chrome & Edge)
4. [Kiểm Thử Kết Nối & Xử Lý Sự Cố Thường Gặp](#4-kiểm-thử-kết-nối--xử-lý-sự-cố)

---

## 1. TỔNG QUAN KIẾN TRÚC ĐA TẦNG

Tâm An AI ứng dụng mô hình **Dual-Intelligence Routing (Định tuyến Trí tuệ Kép)**:
1. **Lớp Ưu Tiên (Tier 1 - Primary Engine)**: Sử dụng Google Gemini 1.5/2.0 Flash với tốc độ phản hồi cực nhanh, khả năng thấu cảm ngữ cảnh sâu sắc và phân tích kinh sách thấu triệt.
2. **Lớp Dự Phòng Tự Động (Tier 2 - FreeLLM Failover Engine)**: Khi Gemini gặp lỗi hạn mức (HTTP 429 Too Many Requests) hoặc cạn quota token, hệ thống tự động chuyển tiếp liền mạch sang FreeLLM Gateway (Groq Llama 3.3 70B, DeepSeek R1, OpenRouter Free) với độ trễ 0ms, không làm gián đoạn trải nghiệm của người dùng.

---

## 2. CHI TIẾT CẤU HÌNH API KEYS

Tạo hoặc cập nhật file môi trường bí mật `.env.local` tại thư mục gốc:
`C:\Users\DS\.gemini\antigravity\scratch\tam-an-ai-app\.env.local`

```bash
# =====================================================================
# TÂM AN AI - BIẾN MÔI TRƯỜNG BẢO MẬT PRODUCTION (.env.local)
# =====================================================================

# 1. GOOGLE GEMINI API (Lớp thông minh chính)
# Lấy miễn phí tại: https://aistudio.google.com/app/apikey
GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere..."

# 2. FREELLM GATEWAY (Lớp dự phòng miễn phí khi hết token)
# Hỗ trợ Groq, OpenRouter, DeepSeek Free API
FREELLM_API_KEY="gsk_YourGroqOrFreeLLMKeyHere..."
FREELLM_PROVIDER="groq" # hoặc "openrouter", "deepseek"
FREELLM_MODEL="llama-3.3-70b-versatile"

# 3. KHO CÔNG ĐỨC VIETQR & NGÂN HÀNG HỘ TRÌ MÁY CHỦ
NEXT_PUBLIC_BANK_ID="MBBank"
NEXT_PUBLIC_BANK_ACCOUNT="9988776655"
NEXT_PUBLIC_ACCOUNT_HOLDER="TAM AN DAO TRANG"

# 4. CHẾ ĐỘ MÁY CHỦ & BẢO MẬT
NODE_ENV="production"
PORT=3000
```

### 2.1. Cấu hình FreeLLM Cho Toàn Bộ Antigravity IDE
Để Antigravity IDE không bao giờ bị gián đoạn khi tài khoản Gemini hết hạn mức, cấu hình MCP Server tại:
`C:\Users\DS\.gemini\antigravity\mcp\freellm-gateway`
- Antigravity đã tích hợp sẵn 2 công cụ MCP:
  - `ask_freellm`: Gửi truy vấn trực tiếp đến mô hình miễn phí.
  - `list_free_models`: Liệt kê các model miễn phí khả dụng (Llama 3.3 70B, DeepSeek V3/R1).

---

## 3. CẨM NANG CÀI ĐẶT MOBILE PWA V2.0

Tâm An AI là một Progressive Web App chuẩn thế hệ mới với các công nghệ cao cấp:
- **Service Worker (`sw.js`)**: Cache-first cho toàn bộ hình ảnh 4K Thầy Sinh, âm thanh chuông xoay và font chữ.
- **Web App Manifest (`manifest.json`)**: Định nghĩa chế độ toàn màn hình (`standalone`), không thanh địa chỉ URL, màu nền Obsidian Deep `#03050c`.
- **Phím Tắt Ứng Dụng (App Shortcuts)**: Nhấn giữ icon ứng dụng trên màn hình để truy cập tức thì: *Gieo Quẻ Liên Sinh, Rút Bài Tarot 3D, Lập Lá Số Tử Vi, Tọa Thiền 432Hz, Hỏi Thầy Sinh*.

### 3.1. Hướng Dẫn Cài Đặt Trên iPhone / iPad (Safari)
1. Mở trình duyệt **Safari** và truy cập vào link web: `http://localhost:3000` (hoặc tên miền chính thức của Tâm An AI).
2. Nhấn vào biểu tượng **Chia Sẻ (Share)** ở thanh điều hướng dưới cùng (icon hình vuông có mũi tên hướng lên).
3. Cuộn danh sách xuống và chọn dòng **"Thêm vào Màn hình chính" (Add to Home Screen)**.
4. Đặt tên hiển thị là **"Tâm An AI"** rồi nhấn **Thêm (Add)** ở góc trên bên phải.
5. Biểu tượng đóa sen vàng Tâm An AI sẽ xuất hiện ngay trên màn hình chính như một ứng dụng iOS nguyên bản tải từ App Store.

### 3.2. Hướng Dẫn Cài Đặt Trên Android (Samsung, Xiaomi, Pixel - Chrome)
1. Mở trình duyệt **Google Chrome** và truy cập vào trang web Tâm An AI.
2. Hệ thống sẽ tự động hiện thanh thông báo nổi bên dưới màn hình: **"Cài đặt ứng dụng Tâm An AI để trải nghiệm trọn vẹn"**.
3. Nhấn vào nút **"Cài đặt" (Install)**.
4. *(Nếu không thấy thanh thông báo)*: Nhấn vào menu **3 dấu chấm ⋮** ở góc trên bên phải Chrome -> Chọn **"Cài đặt ứng dụng"** hoặc **"Thêm vào Màn hình chính"**.
5. Nhấn **Cài đặt**. Ứng dụng sẽ được tích hợp vào App Drawer của Android.

### 3.3. Hướng Dẫn Cài Đặt Trên Máy Tính (Windows / macOS - Chrome & Edge)
1. Mở trang web bằng **Google Chrome** hoặc **Microsoft Edge**.
2. Nhìn vào phía bên phải thanh địa chỉ (Address Bar), nhấn vào biểu tượng **"Cài đặt ứng dụng" (Install App - icon màn hình máy tính có mũi tên xuống)**.
3. Chọn **Cài đặt (Install)**.
4. Website sẽ mở trong cửa sổ độc lập không có thanh công cụ trình duyệt, hỗ trợ phím tắt và chạy cực kỳ mượt mà.

---

## 4. KIỂM THỬ KẾT NỐI & XỬ LÝ SỰ CỐ

### Kiểm tra trạng thái máy chủ:
```powershell
# Kiểm tra HTTP 200 OK của Web App
curl -I http://localhost:3000

# Kiểm tra HTTP 200 OK của Mindmap Dashboard (Understand Anything)
curl -I http://localhost:5173

# Kiểm tra 0 lỗi TypeScript
npx tsc --noEmit
```

### Xử lý khi gặp lỗi token:
- Nếu hệ thống báo *"Gemini Quota Exceeded"* trong console: Hệ thống tại `src/utils/aiRouter.ts` và `src/app/api/chat/route.ts` sẽ tự động chuyển hướng sang `FREELLM_API_KEY` trong vòng 0.2 giây mà không cần khởi động lại server.
- Nếu không nghe thấy giọng đọc Thầy Sinh: Kiểm tra quyền âm thanh của trình duyệt (Browser Autoplay Policy), người dùng chỉ cần chạm 1 lần vào màn hình để cấp quyền Web Audio.

---
*Tài liệu được biên soạn và chuẩn hóa bởi Multi-Agent Systems Architect (Repo 2).*
