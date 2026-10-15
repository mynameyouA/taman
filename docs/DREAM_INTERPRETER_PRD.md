# PRD: Dream Interpreter (Giải Mộng)
**Status**: Draft
**Author**: Alex (Product Manager)
**Last Updated**: 2026-10-08

---

## 1. Problem Statement & Value Proposition
**Problem:** Người dùng thường xuyên thức dậy với những giấc mơ kỳ lạ và muốn tìm hiểu ý nghĩa ẩn sau chúng để xoa dịu tinh thần hoặc tìm kiếm điềm báo, nhưng thiếu một công cụ phân tích đáng tin cậy, thấu cảm và tức thời.
**Value Proposition:** Tính năng "Giải Mộng" cung cấp một trải nghiệm giải mã giấc mơ cá nhân hóa, giúp người dùng an tâm, thấu hiểu bản thân hơn qua giọng điệu huyền bí nhưng đầy sự an ủi.

---

## 2. UX Flow (Luồng Trải Nghiệm Người Dùng)

**Story:** As a user, I want to input my dream details so that the AI can interpret its meaning and provide comforting insights.

1. **Input (Nhập liệu):**
   - Màn hình hiển thị một textbox lớn với placeholder khơi gợi: *"Đêm qua bạn đã mơ thấy gì? Hãy kể lại những chi tiết bạn còn nhớ nhé..."*
   - Có nút Ghi âm (Voice-to-text) cho những ai lười gõ.
   - Nút hành động (CTA): "Giải Mã Giấc Mơ" (hiệu ứng lấp lánh nhẹ nhàng).

2. **Processing (Chờ đợi):**
   - Thời gian chờ: Tối đa 3-5 giây.
   - Giao diện chờ: Hiển thị animation nhẹ nhàng (ví dụ: màn sương mù mờ ảo, các vì sao lấp lánh) cùng các câu quote huyền bí để giảm cảm giác chờ đợi: *"Đang kết nối với tiềm thức...", "Đang lật mở các vì sao..."*

3. **Output (Xem kết quả):**
   - Kết quả hiển thị dưới dạng các thẻ (cards) dễ đọc:
     - **Tóm tắt:** Ý nghĩa cốt lõi của giấc mơ (1 câu).
     - **Giải mã chi tiết:** Phân tích các biểu tượng xuất hiện trong giấc mơ.
     - **Thông điệp an ủi:** Lời khuyên hoặc sự động viên nhẹ nhàng.
   - Nút hành động phụ: "Lưu lại", "Chia sẻ", "Kể thêm chi tiết".

---

## 3. Tone and Voice (Giọng Điệu AI)

**Định hướng:** Huyền bí nhưng an ủi (Mysterious but Comforting).

- **Huyền bí:** Sử dụng từ ngữ giàu hình ảnh, ẩn dụ về vũ trụ, tiềm thức, các nguyên tố thiên nhiên (nước, bóng tối, ánh sáng, tinh tú).
- **An ủi:** Tuyệt đối không phán xét, hù dọa hay đưa ra những điềm báo mang tính xui rủi tuyệt đối. Luôn hướng tới việc chữa lành, thấu hiểu và động viên.

**Ví dụ (Prompt Guideline cho AI):**
- *Thay vì nói:* "Mơ thấy rụng răng là điềm báo nhà có tang hoặc mất tiền."
- *Hãy nói:* "Giấc mơ về việc rụng răng thường phản ánh những lo âu sâu thẳm của bạn về sự thay đổi hoặc cảm giác mất kiểm soát trong cuộc sống hiện tại. Vũ trụ đang nhắc nhở bạn hãy chậm lại một chút. Đừng quá lo lắng, mọi biến chuyển đều là cơ hội để bạn tái tạo lại sức mạnh bên trong mình."

---

## 4. Error Handling (Xử Lý Ngoại Lệ)

Để bảo vệ trải nghiệm người dùng và an toàn hệ thống, cần xử lý chặt chẽ các trường hợp sau:

1. **Input quá ngắn (dưới 10 từ hoặc chỉ có 1-2 từ không rõ nghĩa):**
   - *Logic:* Không gọi API phân tích phức tạp, trả về gợi ý ngay lập tức.
   - *Thông báo:* "Giấc mơ của bạn giống như một mảnh ghép còn dang dở. Hãy kể thêm một chút chi tiết (như màu sắc, cảm xúc, hoặc ai đó xuất hiện) để mình có thể giải mã chính xác hơn nhé."

2. **Input chứa yếu tố bạo lực, rùng rợn, hoặc vi phạm chính sách (Self-harm, Extreme Violence):**
   - *Logic:* AI Guardrails sẽ chặn request và trả về thông báo an toàn.
   - *Thông báo:* "Có vẻ như bạn đã trải qua một cơn ác mộng khá căng thẳng. Giấc mơ thường chỉ là cách não bộ xả stress và không định hình thực tại của bạn. Nếu bạn đang cảm thấy bất an hoặc lo âu kéo dài, hãy nhớ rằng luôn có những người sẵn sàng lắng nghe và hỗ trợ bạn trong đời thực. Hãy hít một hơi thật sâu nhé."
   - (Ẩn nút chia sẻ, cung cấp hotline hỗ trợ tâm lý nếu cần thiết).

3. **Lỗi hệ thống / Timeout:**
   - *Thông báo:* "Tín hiệu từ vũ trụ đang tạm thời bị gián đoạn. Bạn vui lòng thử lại sau vài phút nhé."
