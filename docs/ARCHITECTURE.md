# TÂM AN AI - ENTERPRISE SYSTEM ARCHITECTURE & MASTER PRD

Tài liệu này là nguồn chân lý (Source of Truth) bất di bất dịch, hợp nhất mọi yêu cầu từ Bản gốc (NotebookLM RAG) và Bản nâng cấp 3D (Web3D, Visemes, Real-time).

## 1. TECH STACK BẮT BUỘC (ENTERPRISE GRADE)
- **Core Framework:** Next.js 15 (App Router, Server Actions, React 19).
- **Ngôn ngữ:** TypeScript (Strict mode).
- **Styling:** Tailwind CSS, Shadcn UI, Framer Motion (cho UI mượt mà).
- **Web3D Engine:** Three.js, `@react-three/fiber`, `@react-three/drei`. Hỗ trợ load file `.glb` nén chuẩn Draco để tối ưu băng thông.
- **Database:** PostgreSQL (AWS RDS hoặc Supabase).
- **Vector Search:** `pgvector` extension tích hợp trực tiếp vào PostgreSQL.
- **ORM:** Prisma (với schema chặt chẽ, tối ưu index).
- **Real-time Streaming:** Server-Sent Events (SSE) hoặc WebSockets để truyền Text và Audio đồng thời.
- **AI/LLM:** OpenAI GPT-4o (hoặc Gemini 1.5 Pro) để sinh text; `text-embedding-3-small` để tạo vector 1536 chiều.
- **Audio/TTS:** ElevenLabs hoặc Azure Neural TTS (Bắt buộc API phải trả về `Visemes` - timing khẩu hình miệng).
- **Monetization & Auth:** NextAuth.js (JWT) + Stripe (Quản lý Credits/Tokens).

## 2. KIẾN TRÚC CLIENT (FRONTEND)
Chia làm 2 lớp hiển thị (Z-Index Layers):
1. **Lớp Background (Canvas 3D):**
   - Render nhân vật ảo Humanoid. 
   - Quản lý các trạng thái hoạt họa (Animations): Idle, Breathing, Nodding, Talking.
   - Quản lý MorphTargets: Xử lý mảng Visemes nhận từ Server để nhép môi theo thời gian thực (ví dụ: ms 0-50 mở miệng chữ 'A', ms 50-100 khép miệng chữ 'M').
2. **Lớp Foreground (UI Overlay):**
   - Kính HUD trong suốt: Chứa khung chat, nút bật/tắt Micro, thanh máu/năng lượng (Credits UI).
   - Module chuyên biệt: Trải bài Tarot 3D, Dream Interpreter, Meditation Studio.

## 3. KIẾN TRÚC HỌC TẬP & ADMIN STUDIO (THE BRAIN)
Đây là cốt lõi khác biệt của Tâm An AI, chia làm 3 tầng nạp tri thức:
1. **Document Ingestion (Batch Processing):**
   - Admin upload PDF sách Phong thủy. Hệ thống đưa vào Queue (hàng đợi).
   - Worker chạy ngầm: Extract Text -> Chunking (1000 tokens/chunk, overlap 200) -> Embedding -> Insert `pgvector`.
2. **Golden Examples (Few-shot injection):**
   - Admin nhập các "Case study" xuất sắc. Hệ thống vector hóa câu hỏi. Khi khách hàng hỏi câu tương tự, LLM sẽ được nhúng ngay câu trả lời mẫu này vào Prompt để bắt chước văn phong.
3. **Feedback Loop (Reinforcement):**
   - User thả Thumbs Down. Báo cáo nhảy về Admin Dashboard.
   - Admin sửa lại câu trả lời -> Gán nhãn `Ideal` -> Chuyển thành Golden Example mới.

## 4. CHIẾN LƯỢC TỐI ƯU HIỆU NĂNG VÀ AN TOÀN
- **Hiệu năng 3D:** Khóa FPS ở mức 60, tự động hạ cấp cấu hình (LOD - Level of Detail) nếu thiết bị di động quá yếu. Asset `.glb` phải cache trên CDN.
- **Độ trễ Audio (Latency):** Streaming audio buffers. Không đợi LLM sinh xong toàn bộ văn bản. LLM sinh ra dấu câu nào (chấm/phẩy) -> Cắt chunk gửi cho TTS -> Trả Audio + Visemes về Client ngay lập tức.
- **An toàn (Guardrails):** Hệ thống không đưa lời khuyên y tế, luật pháp, tài chính đầu tư. Khi có dấu hiệu khủng hoảng, tắt RAG, kích hoạt System Prompt khẩn cấp.
