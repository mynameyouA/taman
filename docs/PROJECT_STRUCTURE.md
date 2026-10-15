# TÂM AN AI - PROJECT STRUCTURE TREE

Đây là cấu trúc thư mục quy mô Enterprise dành cho Next.js 15 (App Router) kết hợp React Three Fiber và RAG Pipeline. Toàn bộ kiến trúc được module hóa, chia tách rõ ràng logic 3D, logic AI và giao diện.

```text
tam-an-ai-app/
├── prisma/
│   ├── schema.prisma           # [ĐÃ HOÀN THÀNH] Định nghĩa DB Schema
│   └── migrations/             # Quản lý phiên bản DB
├── public/
│   ├── models/                 
│   │   └── avatar.glb          # File 3D nhân vật ảo (Đã nén Draco)
│   ├── sounds/                 # Âm thanh thiền định, click UI
│   └── textures/               # Vật liệu cho môi trường 3D
├── src/
│   ├── app/
│   │   ├── (admin)/            # Route Group cho Admin Studio (Cần quyền Admin)
│   │   │   ├── dashboard/      # Thống kê KPI, Learning Reports
│   │   │   ├── documents/      # Upload PDF, theo dõi tiến độ Chunking
│   │   │   ├── golden-examples/# Quản lý Few-shot examples
│   │   │   └── feedbacks/      # Review phản hồi xấu từ User
│   │   ├── (auth)/             # Route Group cho Xác thực
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (client)/           # Route Group cho Người dùng cuối
│   │   │   ├── chat/           # 🔴 MAIN: Giao diện 3D Chat thời gian thực
│   │   │   ├── tarot/          # Rút bài Tarot 3D
│   │   │   ├── meditation/     # Thiền định âm thanh không gian (Spatial Audio)
│   │   │   └── journal/        # Nhật ký
│   │   ├── api/                # Backend API Routes
│   │   │   ├── chat/
│   │   │   │   ├── stream/     # Endpoint WebSockets/SSE (Trả về Text + Visemes)
│   │   │   │   └── RAG.ts      # Logic truy xuất pgvector
│   │   │   ├── webhooks/       # Xử lý thanh toán Stripe
│   │   │   └── ingest/         # API nhận file PDF và chạy worker ngầm
│   │   ├── layout.tsx
│   │   └── page.tsx            # Landing Page (Giới thiệu sản phẩm)
│   ├── components/
│   │   ├── 3d/                 # 🔵 Thư mục dành riêng cho WebGL/Three.js
│   │   │   ├── Scene.tsx       # Khởi tạo Canvas & Camera
│   │   │   ├── Avatar.tsx      # Render nhân vật, xử lý Animation, MorphTargets
│   │   │   └── Environment.tsx # Đánh sáng (Lighting), Bầu trời đêm thiền định
│   │   ├── ui/                 # Thư mục UI Components (Shadcn)
│   │   └── chat/               # Thư mục UI Chat (Text/Voice HUD)
│   ├── lib/
│   │   ├── prisma.ts           # Khởi tạo Prisma Client
│   │   ├── openai.ts           # Config Langchain/OpenAI
│   │   ├── tts.ts              # Logic gọi Azure/ElevenLabs lấy Audio + Visemes
│   │   └── auth.ts             # Cấu hình NextAuth
│   └── hooks/
│       ├── useLipSync.ts       # Hook cực kỳ quan trọng: Khớp Audio với MorphTargets
│       └── useVoiceRecord.ts   # Hook ghi âm từ Mic người dùng
└── tailwind.config.ts          # Cấu hình màu sắc (Night blue, Sage green...)
```

## Giải thích Luồng chạy (Data Flow) trong Cấu trúc này
1. Người dùng bấm phím Mic trong `useVoiceRecord.ts` -> gửi âm thanh lên API.
2. `api/chat/stream` chuyển Audio thành Text -> Tạo Vector -> Tìm trong Prisma DB.
3. Lắp ráp System Prompt -> Gọi OpenAI LLM sinh chữ.
4. Chữ được truyền liên tục (Streaming) sang `tts.ts` để tạo Audio và **Visemes** (khẩu hình).
5. Frontend nhận mảng Visemes, hook `useLipSync.ts` sẽ đọc mảng này để điều khiển miệng của nhân vật ảo trong `Avatar.tsx` theo từng mili-giây.
