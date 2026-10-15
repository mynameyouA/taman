# PRD - TÂM AN AI 2.0
 (ALICE): RÀ SOÁT KẾ HOẠCH TỔNG THỂ & TÍNH NĂNG

### 1. Hiện trạng Master Plan vs. Thực tế triển khai
Dự án **Tâm An AI** định vị là *Nền tảng Sức khỏe Tinh thần & Khai mở Trực giác chuẩn Active Theory WebGL 3D đầu tiên tại Việt Nam*. Qua rà soát chi tiết mã nguồn, nhóm Product ghi nhận:

| Nhóm chức năng | Trạng thái hiện tại | Đánh giá Product | Thiếu sót cần hoàn thiện |
|---|---|---|---|
| **Trang chủ (Landing 3D)** | **90% Hoàn thiện** | Hiệu ứng Active Theory hạt lượng tử cực đẹp, âm thanh chuông xoay êm dịu, 4 khối dịch vụ nổi bật. | Cần thêm nút chuyển đổi nhanh chế độ tiết kiệm pin trên điện thoại yếu. |
| **Tarot 3D Huyền Bí** | **85% Hoàn thiện** | Đã dựng bàn trải bài 3 lá 3D, lật bài mượt mà, luận giải Quá khứ - Hiện tại - Tương lai. | Hiện dùng data tĩnh (ReadingsData mock), cần kết nối API RAG để luận giải động theo câu hỏi người dùng. |
| **Giải Mộng Carl Jung** | **80% Hoàn thiện** | Giao diện Dream Portal 3D tím huyền bí, form nhập liệu chuẩn, kết nối endpoint `/api/dreams`. | Endpoint `/api/dreams` hiện trả kết quả mock tĩnh sau 1.5s, cần tích hợp Prompt Jungian chuyên sâu & lưu lịch sử vào DB. |
| **Thiền Sóng Não 432Hz** | **95% Hoàn thiện** | Cơ chế Box Breathing 4-4-4-4 đỉnh cao, scene 3D hoa sen/vòng tròn thở đổi màu, âm thanh Web Audio chuẩn 432Hz. | Nên thêm tùy chọn thời lượng thiền (5 phút, 15 phút, 30 phút) và chuông kết thúc. |
| **AI Guide (Chat 3D)** | **70% Hoàn thiện** | Có ZenAvatar3D nhấp nháy, chat bubble đẹp, quick prompts. | Frontend `chat/page.tsx` hiện đang dùng `setTimeout` giả lập thay vì gọi SSE `/api/chat`. Cần nối dây ngay! |
| **Admin Knowledge Studio**| **60% Hoàn thiện** | Đã có schema Prisma (`Document`, `KnowledgeItem`, `GoldenExample`), endpoint `/api/admin/ingest`. | Cần giao diện upload PDF drag-and-drop và bảng đánh giá `quality_score`. |
| **Hệ thống Thanh toán/Token** | **50% Hoàn thiện** | Đã có model `UsageLog`, `credits_balance`, trang `/pricing`. | Chưa tích hợp Stripe Webhook thực tế để cộng credits tự động. |

---

