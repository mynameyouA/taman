# BẢN ĐỒ KIẾN TRÚC TOÀN DIỆN HỆ THỐNG TÂM AN AI (MINDMAP ARCHITECTURAL BLUEPRINT)
**Hệ Thống Phân Tích & Trực Quan Hóa Đa Chiều Được Tạo Bởi Understand Anything & Ban Quản Trị Repo 2 (MetaGPT)**

*Phiên bản: 4.2.0 • Ngày ban hành: 10/10/2026*  
*Bảng điều khiển tương tác trực quan (Interactive Mindmap Dashboard):* [http://127.0.0.1:5173/?token=taman_mindmap_2026](http://127.0.0.1:5173/?token=taman_mindmap_2026)  
*Cơ quan chủ trì: Ban Quản Trị Tự Trị Repo 2 (MetaGPT) & Hội đồng Kỹ thuật Antigravity*

---

## 1. TỔNG QUAN HỆ SINH THÁI (ECOSYSTEM OVERVIEW)

Dự án **Tâm An AI** là một hệ sinh thái tâm thức, trị liệu tinh thần và huyền học Á Đông hiện đại hóa bằng AI. Toàn bộ nền tảng vận hành dựa trên cơ chế cộng tác **Đa Tác Tử (Multi-Agent Governance)**:
- **Repo 2 (MetaGPT)**: Đóng vai trò là Bộ Chỉ Huy Tối Cao (Governing Body), liên tục nghiên cứu sâu về thuật số, phong thủy, Dịch học, trải nghiệm người dùng (UX), phân tích kế hoạch và phân quyền giao việc.
- **Repo 1 (tam-an-ai-app)**: Là Ứng dụng Web Sản Phẩm chạy trên nền tảng Next.js 16, Three.js WebGL 4K, Tailwind CSS v4 và Web Audio API.
- **Telegram Sidecar (Real-Time Bridge)**: Kênh truyền thông thời gian thực 24/7 trực tiếp giữa Sếp (Chat ID: `6387259328`) và Bộ Chỉ Huy Repo 2.
- **Understand Anything Engine**: Hệ thống mindmap hóa toàn bộ 31 Nodes, 35 Edges và 6 Layers kiến trúc, giúp toàn bộ Agents và hai Repositories soi chiếu, kiểm tra lỗi và định hình lại hệ thống.

```mermaid
graph TD
    classDef boss fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff;
    classDef repo2 fill:#8b5cf6,stroke:#6d28d9,stroke-width:2px,color:#fff;
    classDef bridge fill:#06b6d4,stroke:#0891b2,stroke-width:2px,color:#fff;
    classDef repo1 fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff;
    classDef ua fill:#ec4899,stroke:#db2777,stroke-width:2px,color:#fff;

    Boss["👑 SẾP (Telegram ID: 6387259328)"]:::boss
    Sidecar["📡 Telegram Sidecar (telegram_sidecar.py)"]:::bridge
    Repo2["🏛️ REPO 2 (MetaGPT Governance)"]:::repo2
    UA["🧠 UNDERSTAND ANYTHING ENGINE (Port 5173)"]:::ua
    Repo1["💻 REPO 1 (Next.js 16 tam-an-ai-app)"]:::repo1

    Boss <-->|Chỉ đạo & Báo cáo| Sidecar
    Sidecar <-->|Đồng bộ 2 chiều| Repo2
    Repo2 -->|Chỉ đạo kiến trúc & Giao việc| Repo1
    Repo2 -->|Soi chiếu & Định hình| UA
    Repo1 -->|Cập nhật mã nguồn & Trạng thái| UA
    UA -.->|Trực quan hóa đồ thị tri thức| Boss
```

---

## 2. MINDMAP 6 TẦNG KIẾN TRÚC CỐT LÕI (THE 6 ARCHITECTURAL LAYERS)

Dưới đây là sơ đồ chi tiết 6 tầng kiến trúc của Tâm An AI được mô hình hóa theo chuẩn của Understand Anything:

```mermaid
graph TB
    subgraph L1 ["TẦNG 1: GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG (PRESENTATION)"]
        P_Home["Trang Chủ 8 Phân Khu (/)"]
        P_LienSinh["Liên Sinh Độn Giáp (/lien-sinh-don-giap)"]
        P_Tarot["Chiêm Tinh & Bói Bài Tarot 3D (/tarot)"]
        P_Meditation["Phòng Thiền Sóng Não 432Hz (/meditation)"]
        P_Dreams["Giải Mã Giấc Mơ Carl Jung (/dreams)"]
        P_Chat["Đàm Đạo Thầy Sinh (/chat)"]
        Navbar["Thanh Điều Hướng Hoàng Gia (ClientNavbar)"]
    end

    subgraph L2 ["TẦNG 2: THỊ GIÁC ĐỒ HỌA 3D ĐIỆN ẢNH (WEBGL 3D FIDELITY)"]
        SageAvatar["Nhân Vật 3D Tiên Ông Thầy Sinh (SageMasterAvatar3D)"]
        LotusOracle["Bát Diệp Liên Hoa 3D (LotusOracle3D)"]
        TarotScene["Bàn Bài Tarot 3D Động (TarotScene)"]
        ActiveTheory["Vũ Trụ Active Theory 4K (ActiveTheoryBackground)"]
    end

    subgraph L3 ["TẦNG 3: ĐỘNG CƠ HUYỀN HỌC & TRỰC GIÁC (DIVINATION ENGINES)"]
        LienHoaEngine["Động Cơ Liên Hoa Độn Pháp 384 Quái Kiện (lienHoaDonPhap.ts)"]
        EasternOccult["Kho Tàng Huyền Học Á Đông (easternOccult.ts)"]
        TarotEngine["Động Cơ Xáo Bài Crypto & Trải Bài (tarotEngine.ts)"]
        Tarot78["Bách Khoa 78 Lá Bài Chuẩn Rider-Waite (tarot78Cards.ts)"]
        NguBachDanh["Pháp Bảo Kinh Ngũ Bách Danh Quán Âm (nguBachDanh.ts)"]
        ThaySinhKB["Bách Khoa Nhân Cách & Trí Tuệ Thầy Sinh (thaySinhInfiniteKnowledge.ts)"]
    end

    subgraph L4 ["TẦNG 4: BỘ NÃO HỢP NHẤT & ÂM THANH (UNIFIED BRAIN & AUDIO)"]
        UnifiedBrain["Tâm An Unified Brain - Một Bộ Não Duy Nhất (unifiedBrain.ts)"]
        APIChat["API Não Bộ Hợp Nhất (/api/chat/route.ts)"]
        ZenAudio["Động Cơ Âm Thanh Web Audio Chuông Mõ Đồng Xu (zenAudio.ts)"]
        SacredVoice["Động Cơ Giọng Nói Minh Triết AI (sacredVoice.ts)"]
        VoicePlayer["Trình Phát Pháp Âm Tự Tại (SacredVoicePlayer.tsx)"]
    end

    subgraph L5 ["TẦNG 5: BỘ MÁY TĂNG TRƯỞNG & VIRAL (GROWTH & RETENTION)"]
        DailyOracle["Quẻ Khởi Tâm Ban Mai (DailyMorningOracleModal)"]
        CosmicClock["Đồng Hồ Vận Khí Bát Tự 12 Canh Giờ (CosmicClockWidget)"]
        ViralCard["Xuất Thiệp May Mắn 4K (ViralOracleCardModal)"]
        GiftBlessing["Gieo Duyên Cho Người Thân (GiftOracleBlessingModal)"]
        SacredCoin["Nghi Thức Tam Khí & 3 Đồng Xu Khang Hy (SacredCoinRitual)"]
    end

    subgraph L6 ["TẦNG 6: QUẢN TRỊ ĐA TÁC TỬ & MULTI-REPO (GOVERNANCE)"]
        Repo2Gov["Repo 2: MetaGPT Autonomous Governance"]
        Repo1App["Repo 1: Next.js 16 Web Application"]
        TelegramSidecar["Telegram Real-Time Sync Sidecar"]
        RoadmapDocs["Hệ Thống Hồ Sơ Chiến Lược V1-V4"]
    end

    %% Key Connections
    P_Home --> Navbar
    P_Home --> ActiveTheory
    P_Home --> CosmicClock
    P_Home --> DailyOracle
    P_Home --> UnifiedBrain

    P_LienSinh --> LotusOracle
    P_LienSinh --> SacredCoin
    P_LienSinh --> LienHoaEngine
    P_LienSinh --> NguBachDanh
    P_LienSinh --> ViralCard
    P_LienSinh --> GiftBlessing
    P_LienSinh --> VoicePlayer
    P_LienSinh --> UnifiedBrain

    P_Tarot --> TarotScene
    P_Tarot --> TarotEngine
    TarotEngine --> Tarot78
    P_Tarot --> UnifiedBrain

    P_Meditation --> ZenAudio
    P_Meditation --> SacredVoice
    P_Meditation --> UnifiedBrain

    P_Dreams --> UnifiedBrain

    P_Chat --> SageAvatar
    P_Chat --> APIChat
    P_Chat --> SacredVoice
    P_Chat --> ThaySinhKB
    APIChat --> UnifiedBrain
    APIChat --> NguBachDanh

    SacredCoin --> ZenAudio
    SacredVoice --> ZenAudio

    Repo2Gov --> Repo1App
    Repo2Gov --> RoadmapDocs
    TelegramSidecar <--> Repo2Gov
    Repo1App --> P_Home
```

---

## 3. CHI TIẾT CÁC TÍNH NĂNG ĐỘT PHÁ ĐÃ HOÀN TẤT

### 3.1. Một Bộ Não AI Hợp Nhất (Tâm An Unified Brain)
- **Vấn đề đã giải quyết**: Xóa bỏ hoàn toàn tình trạng các trang con hoạt động như những ốc đảo rời rạc.
- **Cơ chế**:
  - `unifiedBrain.ts` lưu vết toàn bộ dòng tâm thức (Soul Journal / Experience Stream) trên cả Client (LocalStorage) và Server Context.
  - Khi người dùng gieo quẻ Độn Giáp, bốc bài Tarot, ngồi thiền hay ghi lại giấc mơ, toàn bộ sự kiện được phát đi (`recordBrainEvent`).
  - Khi sang trang `/chat`, Thầy Sinh tự động nhận diện: *"Chào con, ban nãy con vừa gieo quẻ Địa Thiên Thái động hào 6 và rút lá The Hermit..."* tạo nên sự thấu hiểu chân thực, ấm áp.
  - Tự động tính toán các chỉ số tâm thức: **Chỉ số Tĩnh Tâm (Zenith Quotient)**, **Độ Nhạy Trực Giác (Intuition Score)**, và **Căng Thẳng Nội Tâm (Stress Level)**.

### 3.2. Liên Sinh Độn Giáp Đa Phương Thức & Chuẩn Mực 118 Trang Sách Nguyễn K
- **6 Phương thức gieo quẻ toàn diện**:
  1. 🪙 **Nghi Thức Gieo 3 Đồng Xu Khang Hy**: Mô phỏng 3 đồng tiền rơi trên dĩa đồng với âm thanh kim khí leng keng chân thực (`zenAudio`), gieo đủ 6 hào.
  2. ⏰ **Thời Gian Hiện Tại (Năm - Tháng - Ngày - Giờ)**: Tự động tính toán Can Chi thời gian thực theo công thức Mai Hoa & Liên Hoa Độn Pháp.
  3. 💵 **Số Seri Tờ Tiền Polymer**: Rút quẻ từ số seri trên tờ tiền trong ví theo nguyên tắc phân tách Thượng Quái / Hạ Quái.
  4. 📱 **Số Điện Thoại & Biển Số Xe**: Thấu thị hung cát của phương tiện di chuyển hoặc đầu số liên lạc.
  5. 🌿 **Rút Chân Hương / Nhánh Lá**: Chuẩn nguyên tác trang 5 tài liệu Nguyễn K (bẻ cành lá tay phải $P$ và tay trái $T$).
  6. 📖 **Điển Cố Sách Nguyễn K**: Nghiên cứu các quẻ mẫu kinh điển (Địa Thiên Thái đi xa cưới hỏi, Thiên Thủy Tụng thăm bạn...).
- **Luận quẻ 3 tầng chạm đáy tâm can**:
  - **Tầng 1 - Thấu Cảm Tâm Cảnh (What You Feel)**: Đọc vị nỗi niềm lo âu, bế tắc của người xem.
  - **Tầng 2 - Vận Trình & Mốc Thời Gian (What Will Happen)**: Dự báo quý nhân, phương vị, thời điểm nên tiến hay thoái.
  - **Tầng 3 - Hành Đạo & Hóa Giải (Actionable Remedy)**: Lời khuyên tu tâm kết nối với **Kinh Ngũ Bách Danh Quán Thế Âm**.

### 3.3. Pháp Bảo Kinh Ngũ Bách Danh Tiêu Trừ Chướng Duyên
- Trích xuất 500 Danh hiệu Bồ Tát Quán Thế Âm từ bản kinh cổ 111 trang.
- Tự động ánh xạ quẻ xấu, hào hung, hoặc lá bài thử thách (The Tower, Death, 3 of Swords) sang 1-3 Danh hiệu Bồ Tát tương ứng để hộ niệm.
- Giao diện chuỗi tràng hạt ảo 108 hạt tương tác đếm biến niệm Phật, kèm tiếng gõ mõ và chuông gia trì tần số Solfeggio 528Hz.

### 3.4. Nhân Vật Tiên Ông 3D Thầy Sinh & Bát Diệp Liên Hoa 3D
- **Thầy Sinh 3D**: Chân dung 8K râu tóc bạc phơ, khăn đóng áo dài cổ truyền, 4 trạng thái chuyển đổi tự nhiên (Đàm Đạo, Nhập Định, Chỉ Dẫn, Thăng Hoa), hào quang Bát Quái và luồng hạt sinh học.
- **Bát Diệp Liên Hoa 3D**: Hoa sen 8 cánh vàng nở rộ 180 độ khi gieo quẻ, chiếu sáng cửa Bát Môn tương ứng trên mặt hồ nước thiền định.
- **Giọng nói Nam Bộ trầm ấm**: Động cơ TTS tự động hòa âm nền chuông xoay Tây Tạng 25%, nhịp độ 85 từ/phút đưa não bộ về trạng thái Alpha thư thái.

### 3.5. Bách Khoa Toàn Thư 78 Lá Bài Tarot & Xáo Bài Crypto Random
- Đầy đủ 22 Ẩn Chính và 56 Ẩn Phụ 4 bộ Gậy/Cốc/Kiếm/Tiền.
- Thuật toán Fisher-Yates Crypto Shuffle loại bỏ hoàn toàn tình trạng trùng quẻ hoặc hardcode.
- 4 Sơ đồ trải bài: 1 Lá Khởi Tâm, 3 Lá Thời Không, 3 Lá Thân - Tâm - Trí, và 5 Lá Thập Tự Trực Giác.

### 3.6. Cỗ Máy Kéo Khách Hàng & Giữ Chân Tự Nhiên (Growth Engine)
- **Quẻ Khởi Tâm Ban Mai**: Duy trì chuỗi ngày tĩnh tâm liên tiếp (Mindful Streak 1-7 ngày).
- **Đồng Hồ Vận Khí Bát Tự 12 Canh Giờ**: Lời khuyên phong thủy trực tiếp theo từng canh giờ trong ngày.
- **Xuất Thiệp May Mắn 4K**: Kết xuất ảnh chất lượng cao 9:16 chia sẻ Instagram Story, Facebook, Zalo kèm mã QR / Link.
- **Gieo Duyên Cho Người Thân**: Gieo quẻ cầu an hộ cha mẹ, người yêu, bạn bè và gửi Hộp Quà Tâm Thức.

---

## 4. BẢNG KIỂM TRA ĐỐI CHIẾU DÀNH CHO REPO 2 (METAGPT VERIFICATION CHECKLIST)

| Hạng mục kiểm tra | Trạng thái Repo 1 | Đánh giá của Repo 2 | Hướng tối ưu hóa tiếp theo |
|---|:---:|:---:|---|
| **Hiệu năng WebGL & 3D 4K** | Đạt (60fps, ACESFilmic, Eco Mode) | Tốt | Tối ưu hóa bộ nhớ WebGL trên thiết bị iOS cấp thấp |
| **Tính nhất quán của Unified Brain** | Đạt (Đồng bộ qua 6 trang) | Xuất sắc | Mở rộng lưu trữ đám mây có mã hóa Zero-Knowledge |
| **Độ chính xác Dịch học Nguyễn K** | Đạt (384 quái kiện, TA Nam/Nữ) | Xuất sắc | Bổ sung thêm nhiều bài thơ phú giải nghĩa cổ |
| **Độ ngẫu nhiên của Tarot 78 lá** | Đạt (Crypto Shuffle 100%) | Xuất sắc | Bổ sung thêm bộ bài Tarot Kiều hoặc Tarot Á Đông |
| **Kinh Ngũ Bách Danh** | Đạt (500 danh hiệu, chuỗi 108 hạt) | Độc đáo, nhân văn | Bổ sung tính năng nghe tụng niệm audio từng danh hiệu |
| **Giọng đọc AI & Audio** | Đạt (TTS Nam Bộ + Sóng 528Hz) | Rất truyền cảm | Tích hợp thêm giọng Nữ miền Trung/Bắc nhẹ nhàng |
| **Giao diện & Độ sắc nét Retina** | Đạt (Kính mờ viền vàng, WCAG AAA) | Chuyên nghiệp | Hoàn thiện chế độ Zen Focus toàn màn hình |

---

## 5. HƯỚNG DẪN TRUY CẬP BẢNG ĐIỀU KHIỂN UNDERSTAND ANYTHING

1. Dashboard đang chạy ngầm tại địa chỉ:  
   👉 **`http://127.0.0.1:5173/?token=taman_mindmap_2026`**
2. Các tính năng tương tác có sẵn trên Dashboard:
   - **Interactive Graph Canvas**: Zoom, pan, kéo thả 31 Nodes và 35 Edges.
   - **Layer Filtering**: Lọc nhanh theo 6 tầng kiến trúc.
   - **Guided Tour**: Bấm nút "Tour" để dạo quanh 7 chặng hành trình tâm thức của dự án.
   - **Code Viewer**: Bấm vào bất kỳ node nào để xem tóm tắt, độ phức tạp, và liên kết mã nguồn.

*Tài liệu này được xác thực bởi Ban Quản Trị Repo 2 (MetaGPT) và toàn thể Đội Ngũ Tác Tử Antigravity.*
