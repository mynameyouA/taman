# SYSTEM DESIGN & ARCHITECTURE - TÂM AN AI 2.0
 (BOB): PHÂN TÍCH KIẾN TRÚC HỆ THỐNG

```
+=========================================================================================+
|                              KIẾN TRÚC TỔNG THỂ TÂM AN AI                               |
+=========================================================================================+

  [TRÌNH DUYỆT KHÁCH HÀNG]
      │
      ├──> [Tầng Giao Diện 3D]: React Three Fiber + Three.js BufferGeometry + GLSL Shaders
      ├──> [Tầng Âm Thanh]: Web Audio API Oscillator (432Hz Pure Sine) + BiquadFilter
      └──> [Tầng Điều Khiển]: Next.js 15 App Router (React 19, Server & Client Components)
            │
            ▼
  [NEXT.JS API BACKEND ROUTERS]
      │
      ├──> /api/chat ──────> [SSE Streaming Controller] ──> Phát kèm Visemes 3D Lip-Sync
      ├──> /api/dreams ────> [Semantic Router] ──────────> Trích xuất Archetype Carl Jung
      └──> /api/admin/ingest> [Document Ingestion Pipeline]
                                  │
                                  ▼ (Embeddings: text-embedding-3-small 1536 dim)
  [POSTGRESQL 16 + PGVECTOR (Docker: pgvector/pgvector:pg16)]
      │
      ├──> User & Billing: User, Plan, credits_balance, UsageLog
      ├──> Knowledge Base: Document, KnowledgeItem (vector(1536)), GoldenExample
      └──> Chat History & Feedback: ChatSession, ChatMessage (visemes_url), FeedbackEvent
```

### Điểm sáng kiến trúc:
1. **Prisma pgvector chuẩn chỉnh**: Đã kích hoạt extension `vector`, cột `embedding Unsupported("vector(1536)")?`, sẵn sàng cho RAG hiệu năng cao.
2. **Audio Không Dùng File Ngoài**: Tự tổng hợp sóng âm 432Hz bằng mã lệnh Web Audio API (`zenAudio.ts`, `MeditativeAudioPlayer.tsx`), giảm 100% dung lượng tải tài nguyên âm thanh.
3. **Telegram Bot Sidecar / Browser Agent Ready**: Đã có `browser_agent_service.py` hỗ trợ thu thập dữ liệu phong thủy tự động.

---

