const fs = require('fs');
const path = require('path');
const core = require('C:/Users/DS/.understand-anything/repo/understand-anything-plugin/packages/core/dist/index.js');

const projectRoot = 'C:/Users/DS/.gemini/antigravity/scratch/tam-an-ai-app';
const uaDir = path.join(projectRoot, '.ua');

if (!fs.existsSync(uaDir)) {
  fs.mkdirSync(uaDir, { recursive: true });
}

const nodes = [
  // --- PRESENTATION LAYER (PAGES & UI) ---
  {
    id: 'page_home',
    type: 'page',
    name: 'Trang Chủ Cổng Tâm Thức 8 Phân Khu',
    filePath: 'src/app/(client)/page.tsx',
    lineRange: [1, 350],
    summary: 'Cổng không gian tâm thức đa tầng với 8 phân khu: Hero 4K, Chỉ số năng lượng vũ trụ, Bộ tứ pháp môn, Hành trình 4 bước, Thư viện tri thức, Thẻ bài hoàng kim, Lời chứng thực, FAQ & Bảo mật.',
    tags: ['ui', 'landing', 'portal', '8-sections', 'nextjs'],
    complexity: 'moderate',
    languageNotes: 'Tích hợp Eco Battery Mode, WebGL Canvas nền, và tương tác thời gian thực.'
  },
  {
    id: 'page_lien_sinh',
    type: 'page',
    name: 'Pháp Môn Liên Sinh Độn Giáp',
    filePath: 'src/app/(client)/lien-sinh-don-giap/page.tsx',
    lineRange: [1, 950],
    summary: 'Trung tâm chiêm bốc thâm sâu kế thừa 118 trang tài liệu Nguyễn K, tích hợp 6 phương thức gieo quẻ, 3D Bát Diệp Liên Hoa, nghi thức 3 đồng xu Khang Hy, luận giải 3 tầng và pháp bảo Ngũ Bách Danh.',
    tags: ['divination', 'i-ching', 'lien-sinh', '3d-webgl', 'remedy'],
    complexity: 'complex',
    languageNotes: 'Kết nối trực tiếp với Unified Brain để lưu vết dòng tâm thức người dùng.'
  },
  {
    id: 'page_tarot',
    type: 'page',
    name: 'Chiêm Tinh & Bói Bài Tarot 3D',
    filePath: 'src/app/(client)/tarot/page.tsx',
    lineRange: [1, 480],
    summary: 'Hệ thống Tarot chuyên sâu chuẩn Rider-Waite 78 lá, xáo bài cryptographic random, 4 sơ đồ trải bài, tương tác 3D lật bài và phân tích đa chiều.',
    tags: ['tarot', 'divination', '3d-cards', 'rider-waite', 'crypto-shuffle'],
    complexity: 'moderate',
    languageNotes: 'Hỗ trợ tính năng xuất thiệp may mắn 4K và đồng bộ ký ức tâm thức.'
  },
  {
    id: 'page_meditation',
    type: 'page',
    name: 'Phòng Thiền Định Đa Tần Số',
    filePath: 'src/app/(client)/meditation/page.tsx',
    lineRange: [1, 380],
    summary: 'Không gian tĩnh tâm với âm thanh sóng não Solfeggio (432Hz, 528Hz, 639Hz, 852Hz), chuông xoay Tây Tạng, đếm nhịp thở và giọng dẫn thiền AI.',
    tags: ['meditation', 'sound-healing', 'solfeggio', 'binaural', 'zen'],
    complexity: 'simple',
    languageNotes: 'Ghi nhận thời lượng thiền vào chỉ số bình an của Unified Brain.'
  },
  {
    id: 'page_dreams',
    type: 'page',
    name: 'Giải Mã Giấc Mơ Carl Jung',
    filePath: 'src/app/(client)/dreams/page.tsx',
    lineRange: [1, 420],
    summary: 'Khám phá mộng cảnh vô thức qua tâm lý học chiều sâu Carl Jung, giải mã biểu tượng nguyên mẫu (Archetypes), phân tích Shadow Work và liên kết Dịch học.',
    tags: ['dreams', 'carl-jung', 'unconscious', 'psychology', 'archetypes'],
    complexity: 'moderate',
    languageNotes: 'Phát hiện tính đồng hiện tượng (Synchronicity) giữa giấc mơ và quẻ bói gần nhất.'
  },
  {
    id: 'page_chat',
    type: 'page',
    name: 'Đàm Đạo Cùng Bậc Thầy Thầy Sinh',
    filePath: 'src/app/(client)/chat/page.tsx',
    lineRange: [1, 520],
    summary: 'Giao diện trò chuyện tương tác đa giác quan với Thầy Sinh, tích hợp hình ảnh 8K chân thực, giọng nói Nam Bộ truyền cảm và HUD Hào quang Ký ức Tâm An.',
    tags: ['ai-guide', 'thay-sinh', 'chat', 'unified-memory', 'tts'],
    complexity: 'complex',
    languageNotes: 'Hiển thị các ký ức gần nhất để người dùng thấy AI thực sự thấu hiểu dòng đời của họ.'
  },
  {
    id: 'api_chat_route',
    type: 'endpoint',
    name: 'API Route Não Bộ Hợp Nhất',
    filePath: 'src/app/api/chat/route.ts',
    lineRange: [1, 160],
    summary: 'Backend Endpoint xử lý yêu cầu hội thoại, nạp toàn bộ Soul Memory Stream, dữ liệu Kinh Dịch, Carl Jung và Ngũ Bách Danh vào System Prompt của AI.',
    tags: ['backend', 'api', 'prompt-engineering', 'unified-brain'],
    complexity: 'moderate',
    languageNotes: 'Phản hồi dạng SSE stream hoặc JSON giàu ngữ cảnh triết lý và ân cần.'
  },
  {
    id: 'comp_client_navbar',
    type: 'component',
    name: 'Thanh Điều Hướng Hoàng Gia',
    filePath: 'src/components/ui/ClientNavbar.tsx',
    lineRange: [1, 180],
    summary: 'Navbar kính mờ khắc vi mô (micro-engraved) với logo Tâm An, liên kết đầy đủ các pháp môn, chỉ số năng lượng và công tắc Eco Mode.',
    tags: ['ui', 'navigation', 'glassmorphism', 'header'],
    complexity: 'simple',
    languageNotes: 'Tự động phản ứng theo độ phân giải màn hình và trạng thái đăng nhập/công đức.'
  },

  // --- 3D & VISUAL FIDELITY LAYER ---
  {
    id: 'comp_sage_avatar',
    type: 'component',
    name: 'Nhân Vật Tiên Ông 3D Thầy Sinh',
    filePath: 'src/components/3d/SageMasterAvatar3D.tsx',
    lineRange: [1, 380],
    summary: 'Mô hình bậc thầy tiên ông chân thực 8K với 4 tư thế: Đàm Đạo (Speaking), Nhập Định (Meditating), Chỉ Dẫn (Gesturing), Thăng Hoa (Transcending), kèm hào quang Bát Quái và luồng hạt sinh học.',
    tags: ['3d', 'threejs', 'avatar', 'thay-sinh', 'photoreal', 'vfx'],
    complexity: 'complex',
    languageNotes: 'Tự động đồng bộ trạng thái khi đang nói hoặc khi đang bấm nút chiêm quẻ.'
  },
  {
    id: 'comp_lotus_oracle',
    type: 'component',
    name: 'Bát Diệp Liên Hoa 3D (Lotus Oracle)',
    filePath: 'src/components/3d/LotusOracle3D.tsx',
    lineRange: [1, 320],
    summary: 'Hoa sen 8 cánh mạ vàng 3D tương tác WebGL, hồ nước gợn sóng thiền định, cơ chế nở hoa 180 độ khi khởi quẻ và chiếu sáng cửa Bát Môn đắc cách.',
    tags: ['3d', 'webgl', 'lotus', 'bat-mon', 'animation'],
    complexity: 'moderate',
    languageNotes: 'Quản lý tài nguyên WebGL nghiêm ngặt, tự động dispose khi unmount.'
  },
  {
    id: 'comp_tarot_scene',
    type: 'component',
    name: 'Không Gian Bài Tarot 3D',
    filePath: 'src/components/3d/TarotScene.tsx',
    lineRange: [1, 260],
    summary: 'Sân khấu 3D hiển thị các lá bài Tarot động, hiệu ứng ánh sáng kim ngân, chuyển động lật bài mượt mà và hạt năng lượng vũ trụ.',
    tags: ['3d', 'webgl', 'tarot-cards', 'scene'],
    complexity: 'moderate',
    languageNotes: 'Tương thích màn hình cảm ứng và tương tác xoay chuột 360 độ.'
  },
  {
    id: 'comp_active_theory',
    type: 'component',
    name: 'Phông Nền Thiên Hà Active Theory 4K',
    filePath: 'src/components/3d/ActiveTheoryBackground.tsx',
    lineRange: [1, 240],
    summary: 'Background WebGL chuẩn studio điện ảnh với ACESFilmicToneMapping, hỗ trợ màn hình Retina 2K/4K, hàng nghìn vì sao chuyển động hữu cơ.',
    tags: ['3d', 'webgl', 'background', 'particles', 'retina-4k'],
    complexity: 'moderate',
    languageNotes: 'Tự động hạ xung nhịp khi bật Eco Mode để tiết kiệm pin trên laptop và mobile.'
  },

  // --- SACRED RITUALS & VIRAL GROWTH ---
  {
    id: 'comp_sacred_coin',
    type: 'component',
    name: 'Nghi Thức Tam Khí & 3 Đồng Tiền Khang Hy',
    filePath: 'src/components/divination/SacredCoinRitual.tsx',
    lineRange: [1, 310],
    summary: 'Quy trình 2 bước thần thánh: Tam Khí Quy Nguyên (3 nhịp thở định tâm) và gieo 3 đồng tiền cổ Khang Hy rơi trên dĩa đồng với âm thanh leng keng chân thực 6 lần lập quẻ.',
    tags: ['ritual', 'khang-hy-coins', 'pranayama', 'sound', 'i-ching'],
    complexity: 'moderate',
    languageNotes: 'Tái hiện chân thực nghi thức chiêm bốc cổ truyền nghìn năm.'
  },
  {
    id: 'comp_viral_card',
    type: 'component',
    name: 'Thiệp Quẻ Tâm An May Mắn 4K Modal',
    filePath: 'src/components/divination/ViralOracleCardModal.tsx',
    lineRange: [1, 220],
    summary: 'Công cụ xuất thiệp nghệ thuật cổ phong tỷ lệ 9:16 (Instagram Story / Zalo), kết xuất Canvas 4K PNG kèm câu thơ tiên tri, triện son đỏ và link chia sẻ lan tỏa.',
    tags: ['viral', 'social-share', 'canvas', 'card-export', 'growth'],
    complexity: 'moderate',
    languageNotes: 'Kích thích người dùng chia sẻ lên mạng xã hội kéo thêm người dùng mới.'
  },
  {
    id: 'comp_morning_oracle',
    type: 'component',
    name: 'Quẻ Khởi Tâm Ban Mai (Daily Oracle)',
    filePath: 'src/components/growth/DailyMorningOracleModal.tsx',
    lineRange: [1, 190],
    summary: 'Modal tự động xuất hiện mỗi sáng đón chào người dùng với 1 hào từ may mắn và thông điệp định tâm, quản lý chuỗi ngày tĩnh tâm (Mindful Streak).',
    tags: ['growth', 'retention', 'daily-habit', 'streak'],
    complexity: 'simple',
    languageNotes: 'Gia tăng tỷ lệ quay lại hằng ngày (Day 1 - Day 7 retention loop).'
  },
  {
    id: 'comp_cosmic_clock',
    type: 'component',
    name: 'Đồng Hồ Vận Khí Bát Tự 12 Canh Giờ',
    filePath: 'src/components/growth/CosmicClockWidget.tsx',
    lineRange: [1, 210],
    summary: 'Widget đồng hồ cổ truyền hiển thị 12 canh giờ theo Lịch Can Chi, phân tích Ngũ Hành vượng suy thời gian thực và lời khuyên nên/kỵ trong canh giờ.',
    tags: ['cosmic-clock', 'can-chi', 'five-elements', 'widget'],
    complexity: 'moderate',
    languageNotes: 'Cập nhật tự động từng phút theo múi giờ địa phương.'
  },
  {
    id: 'comp_gift_blessing',
    type: 'component',
    name: 'Gieo Duyên Cho Người Thân',
    filePath: 'src/components/growth/GiftOracleBlessingModal.tsx',
    lineRange: [1, 230],
    summary: 'Tính năng gieo quẻ cầu an hộ cha mẹ, người yêu, con cái hoặc bạn bè, đóng gói thành Hộp Quà Tâm Thức gửi tặng kèm lời chúc phúc trang trọng.',
    tags: ['growth', 'viral', 'gift', 'blessing', 'family'],
    complexity: 'moderate',
    languageNotes: 'Cầu nối tâm linh giúp lan tỏa ứng dụng tự nhiên qua người thân bạn bè.'
  },
  {
    id: 'comp_voice_player',
    type: 'component',
    name: 'Trình Phát Pháp Âm Tự Tại (Sacred Voice Player)',
    filePath: 'src/components/audio/SacredVoicePlayer.tsx',
    lineRange: [1, 140],
    summary: 'Thanh điều khiển giọng đọc AI minh triết kèm Mandala sóng âm phát sáng, điều phối trạng thái đọc lời luận đoán và âm nền hòa quyện.',
    tags: ['audio', 'voice-player', 'mandala-visualizer', 'tts'],
    complexity: 'simple',
    languageNotes: 'Cho phép người dùng nghe lời giải mà không cần căng mắt đọc chữ.'
  },

  // --- CORE LOGIC & DIVINATION ENGINES ---
  {
    id: 'util_unified_brain',
    type: 'module',
    name: 'Tâm An Unified Brain (Một Bộ Não Duy Nhất)',
    filePath: 'src/utils/unifiedBrain.ts',
    lineRange: [1, 280],
    summary: 'Hệ thần kinh hợp nhất quản lý dòng ký ức tâm thức (Soul Journal / Memory Stream), chỉ số năng lượng (Zenith, Intuition, Stress), tổng hợp prompt và kết nối tất cả các trang con.',
    tags: ['unified-brain', 'memory-stream', 'soul-journal', 'core-engine'],
    complexity: 'complex',
    languageNotes: 'Trái tim vận hành của toàn bộ hệ sinh thái, xóa bỏ ranh giới các tính năng riêng lẻ.'
  },
  {
    id: 'util_lien_hoa',
    type: 'module',
    name: 'Động Cơ Liên Hoa Độn Pháp 384 Quái Kiện',
    filePath: 'src/utils/lienHoaDonPhap.ts',
    lineRange: [1, 850],
    summary: 'Thuật toán Dịch học chuẩn mực từ 118 trang tài liệu Nguyễn K, tính toán Chánh - Hổ - Biến quái, TA Nam/Nữ, Lục Thân, phương vị xuất hành và bộ luận 3 tầng sâu sắc.',
    tags: ['i-ching', 'lien-hoa-don', 'nguyen-k', '384-hexagrams', 'math'],
    complexity: 'complex',
    languageNotes: 'Hỗ trợ tính toán theo 6 phương thức: Đồng xu, Thời gian thực, Seri tiền, Số ĐT, Chân hương, Điển cố.'
  },
  {
    id: 'util_eastern_occult',
    type: 'module',
    name: 'Kho Tàng Huyền Học Á Đông Toàn Diện',
    filePath: 'src/utils/easternOccult.ts',
    lineRange: [1, 620],
    summary: 'Module huyền học tích hợp: Kinh Dịch 64 quẻ, Khổng Minh Thần Toán 384 quẻ thơ tứ tuyệt, Kỳ Môn Độn Giáp Bát Môn, Lục Hào Thế Ứng, Tử Vi Đẩu Số 12 Cung và Tứ Trụ Bát Tự.',
    tags: ['eastern-occult', 'khong-minh', 'ky-mon', 'tu-vi', 'bat-tu', 'luc-hao'],
    complexity: 'complex',
    languageNotes: 'Mở rộng chiều sâu tri thức phương Đông cho người dùng tra cứu phối hợp.'
  },
  {
    id: 'util_tarot_engine',
    type: 'module',
    name: 'Động Cơ Chiêm Tinh Tarot Crypto Engine',
    filePath: 'src/utils/tarotEngine.ts',
    lineRange: [1, 240],
    summary: 'Thuật toán xáo bài ngẫu nhiên bảo mật Fisher-Yates kết hợp mật mã học, quản lý 4 phương thức trải bài và ánh xạ dữ liệu bản mệnh ngũ hành/hoàng đạo.',
    tags: ['tarot-engine', 'crypto-shuffle', 'fisher-yates', 'spreads'],
    complexity: 'moderate',
    languageNotes: 'Đảm bảo mỗi lần rút bài là duy nhất và phản ánh chân thực trực giác người dùng.'
  },
  {
    id: 'data_tarot_78',
    type: 'schema',
    name: 'Bách Khoa Toàn Thư 78 Lá Bài Tarot',
    filePath: 'src/data/tarot78Cards.ts',
    lineRange: [1, 750],
    summary: 'Dữ liệu toàn diện 78 lá bài Rider-Waite (22 Ẩn Chính, 56 Ẩn Phụ 4 bộ Gậy/Cốc/Kiếm/Tiền), ý nghĩa Xuôi/Ngược, Công danh, Tình duyên, Sức khỏe và Lời khuyên hành đạo.',
    tags: ['tarot-data', 'rider-waite', '78-cards', 'encyclopedia'],
    complexity: 'moderate',
    languageNotes: 'Được biên soạn chuẩn mực theo trường phái Hermetic Order of the Golden Dawn.'
  },
  {
    id: 'util_ngu_bach_danh',
    type: 'module',
    name: 'Pháp Bảo Kinh Ngũ Bách Danh Quán Thế Âm',
    filePath: 'src/utils/nguBachDanh.ts',
    lineRange: [1, 340],
    summary: 'Kho dữ liệu 500 danh hiệu Bồ Tát Quán Thế Âm từ bản kinh cổ 111 trang, phân loại theo 6 nỗi khổ niềm đau (Tật ách, Quan tụng, Tài lộc, Hôn nhân, Ác mộng, Nghiệp chướng) và thuật toán gợi ý danh hiệu hộ niệm.',
    tags: ['ngu-bach-danh', 'buddhism', 'remedy', '500-names', 'compassion'],
    complexity: 'moderate',
    languageNotes: 'Tích hợp chuỗi tràng hạt ảo 108 hạt và âm thanh gõ chuông gia trì tiêu trừ chướng duyên.'
  },
  {
    id: 'util_thay_sinh',
    type: 'module',
    name: 'Nhân Cách & Bách Khoa Trí Tuệ Thầy Sinh',
    filePath: 'src/utils/thaySinhInfiniteKnowledge.ts',
    lineRange: [1, 460],
    summary: 'Động cơ ngôn ngữ Nam Bộ cổ phong của Thầy Sinh, hệ thống tri thức vô tận về Kinh Dịch, Phật pháp, phong thủy và cơ chế tổng hợp đối thoại không lặp lại.',
    tags: ['thay-sinh', 'southern-dialect', 'persona', 'elder-master', 'infinite-kb'],
    complexity: 'complex',
    languageNotes: 'Giọng điệu mộc mạc, gần gũi như người ông trong gia đình nhưng uyên bác lạ thường.'
  },
  {
    id: 'util_zen_audio',
    type: 'module',
    name: 'Động Cơ Âm Thanh Web Audio Procedural',
    filePath: 'src/utils/zenAudio.ts',
    lineRange: [1, 260],
    summary: 'Bộ tổng hợp âm thanh thiền định không cần tải file MP3 nặng: Chuông xoay Tây Tạng (432Hz/528Hz), Mõ chùa ấm áp, Chuông đại hồng chung, và tiếng 3 đồng xu Khang Hy leng keng (2400Hz-5200Hz).',
    tags: ['web-audio', 'procedural-sound', 'singing-bowl', 'coin-clink', 'binaural'],
    complexity: 'moderate',
    languageNotes: 'Hoạt động tức thì trên mọi trình duyệt mà không bị lỗi trễ mạng.'
  },
  {
    id: 'util_sacred_voice',
    type: 'module',
    name: 'Động Cơ Giọng Nói Minh Triết AI (Sacred Voice)',
    filePath: 'src/utils/sacredVoice.ts',
    lineRange: [1, 210],
    summary: 'Động cơ giọng đọc Web Speech API kết hợp hòa âm nền chuông xoay Tây Tạng Solfeggio 25%, tinh chỉnh nhịp độ 85 từ/phút đưa não bộ về trạng thái Alpha thư thái.',
    tags: ['tts', 'voice', 'speech-synthesis', 'alpha-waves'],
    complexity: 'moderate',
    languageNotes: 'Ưu tiên các giọng neural tiếng Việt tự nhiên trầm ấm (HoaiMy, NamMinh, An).'
  },

  // --- GOVERNANCE & MULTI-REPO INFRASTRUCTURE ---
  {
    id: 'gov_repo2_metagpt',
    type: 'service',
    name: 'Repo 2 (MetaGPT Autonomous Governance)',
    filePath: 'scratch/MetaGPT/workspace/tam_an_ai',
    summary: 'Cơ quan điều phối và quản trị tự trị tối cao của toàn dự án, tập hợp các Roles: Product Manager, Software Architect, UI/UX Director, Master Diviner và Project Manager.',
    tags: ['metagpt', 'governance', 'multi-agent', 'orchestration', 'repo-2'],
    complexity: 'complex',
    languageNotes: 'Chịu trách nhiệm phân tích yêu cầu từ Telegram, lập kế hoạch, phản biện và giao việc cho Repo 1.'
  },
  {
    id: 'gov_repo1_nextjs',
    type: 'service',
    name: 'Repo 1 (Tâm An AI Next.js 16 Web Application)',
    filePath: 'scratch/tam-an-ai-app',
    summary: 'Kho ứng dụng trực tiếp phục vụ người dùng cuối, được xây dựng trên Next.js 16, React 19, Tailwind CSS v4, Three.js WebGL và Web Audio API.',
    tags: ['nextjs', 'repo-1', 'frontend', 'production-app'],
    complexity: 'complex',
    languageNotes: 'Thực thi các chỉ thị từ Repo 2 với tiêu chuẩn 0 lỗi TypeScript và hiệu năng 60fps.'
  },
  {
    id: 'gov_telegram_sidecar',
    type: 'pipeline',
    name: 'Telegram Real-Time Sync Sidecar',
    filePath: 'scratch/telegram_sidecar.py',
    summary: 'Kênh truyền thông ngầm 2 chiều liên tục giữa Sếp (Chat ID: 6387259328) và Hệ thống Đa Tác Tử, lắng nghe chỉ đạo mới và tự động gửi báo cáo tiến độ.',
    tags: ['telegram', 'sidecar', 'real-time', 'bot', 'python'],
    complexity: 'moderate',
    languageNotes: 'Hoạt động nền qua inbox/outbox file queue đảm bảo không nghẽn tin nhắn.'
  },
  {
    id: 'gov_roadmap_docs',
    type: 'document',
    name: 'Hệ Thống Hồ Sơ Chiến Lược & Blueprint V1-V4',
    filePath: 'governance/docs',
    summary: 'Toàn bộ các bản kế hoạch tối cao được phê duyệt: Master Redesign V2, Thổi Hồn & Tăng Trưởng V3, Thiết Kế Tiên Ông 3D Thầy Sinh, Danh Mục Công Việc V4.',
    tags: ['governance', 'documentation', 'roadmap', 'blueprints'],
    complexity: 'simple',
    languageNotes: 'Kim chỉ nam hành động cho tất cả các Agents và Nhà Phát Triển.'
  }
];

const edges = [
  // Page to Components
  { source: 'page_home', target: 'comp_client_navbar', type: 'contains', direction: 'forward', weight: 0.9, description: 'Chứa thanh điều hướng chính' },
  { source: 'page_home', target: 'comp_active_theory', type: 'contains', direction: 'forward', weight: 0.9, description: 'Phông nền WebGL 4K vũ trụ' },
  { source: 'page_home', target: 'comp_cosmic_clock', type: 'contains', direction: 'forward', weight: 0.8, description: 'Đồng hồ 12 canh giờ tại Phân khu 2' },
  { source: 'page_home', target: 'comp_morning_oracle', type: 'calls', direction: 'forward', weight: 0.8, description: 'Kích hoạt quẻ khởi tâm đầu ngày' },
  { source: 'page_home', target: 'util_unified_brain', type: 'reads_from', direction: 'forward', weight: 0.9, description: 'Đọc chỉ số năng lượng hiển thị trên trang chủ' },

  // Lien Sinh Don Giap Interactions
  { source: 'page_lien_sinh', target: 'comp_lotus_oracle', type: 'contains', direction: 'forward', weight: 1.0, description: 'Render hoa sen 3D Bát Diệp Liên Hoa' },
  { source: 'page_lien_sinh', target: 'comp_sacred_coin', type: 'contains', direction: 'forward', weight: 0.9, description: 'Nghi thức Tam Khí & gieo 3 đồng xu Khang Hy' },
  { source: 'page_lien_sinh', target: 'comp_viral_card', type: 'calls', direction: 'forward', weight: 0.8, description: 'Mở modal xuất thiệp may mắn 4K' },
  { source: 'page_lien_sinh', target: 'comp_gift_blessing', type: 'calls', direction: 'forward', weight: 0.8, description: 'Mở modal gieo duyên cho người thân' },
  { source: 'page_lien_sinh', target: 'util_lien_hoa', type: 'calls', direction: 'forward', weight: 1.0, description: 'Tính toán quẻ Chánh-Hổ-Biến từ số liệu gieo' },
  { source: 'page_lien_sinh', target: 'util_ngu_bach_danh', type: 'calls', direction: 'forward', weight: 0.9, description: 'Gợi ý danh hiệu Bồ Tát hóa giải hung hiểm' },
  { source: 'page_lien_sinh', target: 'util_eastern_occult', type: 'reads_from', direction: 'forward', weight: 0.7, description: 'Tra cứu tab Kho tàng Huyền học Á Đông' },
  { source: 'page_lien_sinh', target: 'util_unified_brain', type: 'writes_to', direction: 'forward', weight: 0.9, description: 'Bắn sự kiện quẻ bói vào dòng ký ức tâm thức' },
  { source: 'page_lien_sinh', target: 'comp_voice_player', type: 'contains', direction: 'forward', weight: 0.8, description: 'Phát giọng đọc lời luận đoán 3 tầng' },

  // Tarot Interactions
  { source: 'page_tarot', target: 'comp_tarot_scene', type: 'contains', direction: 'forward', weight: 1.0, description: 'Render bàn bài Tarot 3D lật động' },
  { source: 'page_tarot', target: 'util_tarot_engine', type: 'calls', direction: 'forward', weight: 1.0, description: 'Xáo bài crypto và rút sơ đồ trải bài' },
  { source: 'util_tarot_engine', target: 'data_tarot_78', type: 'reads_from', direction: 'forward', weight: 1.0, description: 'Đọc cơ sở dữ liệu 78 lá bài' },
  { source: 'page_tarot', target: 'util_unified_brain', type: 'writes_to', direction: 'forward', weight: 0.9, description: 'Lưu lá bài rút được vào ký ức hợp nhất' },

  // Meditation Interactions
  { source: 'page_meditation', target: 'util_zen_audio', type: 'calls', direction: 'forward', weight: 1.0, description: 'Phát sóng âm Solfeggio & chuông xoay' },
  { source: 'page_meditation', target: 'util_sacred_voice', type: 'calls', direction: 'forward', weight: 0.8, description: 'Đọc lời hướng dẫn thiền định hơi thở' },
  { source: 'page_meditation', target: 'util_unified_brain', type: 'writes_to', direction: 'forward', weight: 0.8, description: 'Cộng điểm phút thiền vào chỉ số Zenith' },

  // Dreams Interactions
  { source: 'page_dreams', target: 'util_unified_brain', type: 'reads_from', direction: 'forward', weight: 0.9, description: 'Liên kết giấc mơ với quẻ bói/tarot gần nhất' },
  { source: 'page_dreams', target: 'util_unified_brain', type: 'writes_to', direction: 'forward', weight: 0.9, description: 'Lưu mộng cảnh vào sổ tay vô thức' },

  // Chat & AI Guide Interactions
  { source: 'page_chat', target: 'comp_sage_avatar', type: 'contains', direction: 'forward', weight: 1.0, description: 'Hiển thị Avatar 3D Thầy Sinh theo trạng thái chat' },
  { source: 'page_chat', target: 'api_chat_route', type: 'calls', direction: 'forward', weight: 1.0, description: 'Gửi tin nhắn kèm context lên server' },
  { source: 'page_chat', target: 'util_sacred_voice', type: 'calls', direction: 'forward', weight: 0.9, description: 'Phát giọng Thầy Sinh sau khi sinh câu trả lời' },
  { source: 'page_chat', target: 'util_thay_sinh', type: 'reads_from', direction: 'forward', weight: 0.9, description: 'Khai thác văn phong và kho đối thoại vô tận' },
  { source: 'api_chat_route', target: 'util_unified_brain', type: 'reads_from', direction: 'forward', weight: 1.0, description: 'Trích xuất toàn bộ Soul Memory Stream làm bối cảnh' },
  { source: 'api_chat_route', target: 'util_ngu_bach_danh', type: 'reads_from', direction: 'forward', weight: 0.8, description: 'Tích hợp lời khuyên sám hối niệm Phật' },

  // Audio Infrastructure Connections
  { source: 'comp_sacred_coin', target: 'util_zen_audio', type: 'calls', direction: 'forward', weight: 0.9, description: 'Gọi playCoinClink tạo tiếng leng keng' },
  { source: 'util_sacred_voice', target: 'util_zen_audio', type: 'subscribes', direction: 'forward', weight: 0.8, description: 'Bật âm nền chuông xoay 528Hz khi đang đọc' },

  // Governance Relationships
  { source: 'gov_repo2_metagpt', target: 'gov_repo1_nextjs', type: 'publishes', direction: 'forward', weight: 1.0, description: 'Ban hành chỉ đạo kiến trúc và giao việc kỹ thuật' },
  { source: 'gov_repo2_metagpt', target: 'gov_roadmap_docs', type: 'writes_to', direction: 'forward', weight: 0.9, description: 'Biên soạn các bản kế hoạch V1-V4' },
  { source: 'gov_telegram_sidecar', target: 'gov_repo2_metagpt', type: 'subscribes', direction: 'bidirectional', weight: 1.0, description: 'Cầu nối liên lạc trực tiếp với Sếp' },
  { source: 'gov_repo1_nextjs', target: 'page_home', type: 'contains', direction: 'forward', weight: 1.0, description: 'Chứa toàn bộ mã nguồn Next.js 16' }
];

const layers = [
  {
    id: 'layer_presentation',
    name: 'Giao Diện Người Dùng & Các Trang Trải Nghiệm (Presentation Layer)',
    description: 'Các màn hình tương tác chính của người dùng: Trang Chủ 8 Phân Khu, Liên Sinh Độn Giáp, Tarot, Phòng Thiền, Giải Mộng, Chat Thầy Sinh.',
    nodeIds: ['page_home', 'page_lien_sinh', 'page_tarot', 'page_meditation', 'page_dreams', 'page_chat', 'comp_client_navbar']
  },
  {
    id: 'layer_webgl_3d',
    name: 'Đồ Họa 3D & Thị Giác Điện Ảnh 4K (WebGL Visual Fidelity)',
    description: 'Hệ thống canvas 3D sống động: Nhân vật Thầy Sinh 8K 4 trạng thái, Bát Diệp Liên Hoa 3D, Bàn bài Tarot 3D và Vũ trụ Active Theory.',
    nodeIds: ['comp_sage_avatar', 'comp_lotus_oracle', 'comp_tarot_scene', 'comp_active_theory']
  },
  {
    id: 'layer_divination_engines',
    name: 'Động Cơ Huyền Học & Tri Thức Chiêm Bốc (Divination & Occult Core)',
    description: 'Hạt nhân thuật số Dịch học Nguyễn K 384 bản quái kiện, Bách khoa Tarot 78 lá, Huyền học Á Đông (Kỳ Môn, Bát Tự, Tử Vi), Kinh Ngũ Bách Danh và Trí tuệ Thầy Sinh.',
    nodeIds: ['util_lien_hoa', 'util_eastern_occult', 'util_tarot_engine', 'data_tarot_78', 'util_ngu_bach_danh', 'util_thay_sinh']
  },
  {
    id: 'layer_unified_consciousness',
    name: 'Bộ Não Hợp Nhất & Hạ Tầng Âm Thanh (Unified Brain & Sacred Audio)',
    description: 'Một bộ não AI duy nhất ghi nhớ dòng tâm thức (Soul Journal), đồng bộ đa trang, Web Audio API procedural và công nghệ giọng nói minh triết AI.',
    nodeIds: ['util_unified_brain', 'api_chat_route', 'util_zen_audio', 'util_sacred_voice', 'comp_voice_player']
  },
  {
    id: 'layer_growth_viral',
    name: 'Bộ Máy Tăng Trưởng & Lan Tỏa (Growth & Retention Engine)',
    description: 'Cơ chế giữ chân và kéo khách: Quẻ Khởi Tâm Ban Mai hằng ngày, Đồng Hồ Vận Khí 12 Canh Giờ, Xuất Thiệp May Mắn 4K, Gieo Duyên Người Thân.',
    nodeIds: ['comp_morning_oracle', 'comp_cosmic_clock', 'comp_viral_card', 'comp_gift_blessing', 'comp_sacred_coin']
  },
  {
    id: 'layer_governance',
    name: 'Quản Trị Đa Tác Tử & Multi-Repo (Governance & Orchestration)',
    description: 'Cơ chế chỉ huy tối cao từ Repo 2 (MetaGPT) điều phối Repo 1 (Next.js), cầu nối Telegram 2 chiều thời gian thực và tài liệu chiến lược.',
    nodeIds: ['gov_repo2_metagpt', 'gov_repo1_nextjs', 'gov_telegram_sidecar', 'gov_roadmap_docs']
  }
];

const tour = [
  {
    order: 1,
    title: 'Cổng Không Gian Tâm Thức & Trang Chủ Đa Tầng 4K',
    description: 'Điểm khởi đầu của người dùng với giao diện 8 Phân Khu hoành tráng, thước đo năng lượng vũ trụ, phông nền Active Theory 4K và bộ tứ pháp môn khai mở.',
    nodeIds: ['page_home', 'comp_client_navbar', 'comp_active_theory', 'comp_cosmic_clock']
  },
  {
    order: 2,
    title: 'Tâm An Unified Brain — Trái Tim Của Toàn Nền Tảng',
    description: 'Toàn bộ website vận hành dưới một bộ não AI duy nhất. Mọi trải nghiệm gieo quẻ, rút bài, ngồi thiền hay tâm sự đều được ghi vào Soul Memory Stream để AI thấu suốt cuộc đời người dùng.',
    nodeIds: ['util_unified_brain', 'api_chat_route', 'page_chat']
  },
  {
    order: 3,
    title: 'Nhân Vật 3D Tiên Ông Thầy Sinh & Bát Diệp Liên Hoa',
    description: 'Đột phá thị giác với Avatar 3D Thầy Sinh chân thực 8K tự nhiên như người thật, biết nhập định nhắm mắt kết nối trời đất, và mô hình hoa sen 8 cánh vàng nở rộ theo 8 cửa Độn Giáp.',
    nodeIds: ['comp_sage_avatar', 'comp_lotus_oracle', 'util_thay_sinh']
  },
  {
    order: 4,
    title: 'Động Cơ Huyền Học Liên Sinh Độn Giáp & Bách Khoa Tarot 78 Lá',
    description: 'Sự kết hợp hoàn hảo giữa thuật số Đông Tây: 384 bản quái kiện Dịch học 118 trang sách Nguyễn K và 78 lá bài Tarot Rider-Waite chuẩn hóa với thuật toán xáo bài mật mã học.',
    nodeIds: ['page_lien_sinh', 'util_lien_hoa', 'page_tarot', 'util_tarot_engine', 'data_tarot_78']
  },
  {
    order: 5,
    title: 'Pháp Bảo Kinh Ngũ Bách Danh & Nghi Thức Tiêu Trừ Chướng Duyên',
    description: 'Tính năng nhân văn độc nhất: Khi gặp quẻ hung hoặc bế tắc, hệ thống tự động trích xuất danh hiệu Bồ Tát Quán Thế Âm tương ứng trong 500 danh hiệu để người xem lần chuỗi 108 hạt cầu an giải nghiệp.',
    nodeIds: ['util_ngu_bach_danh', 'comp_sacred_coin', 'util_zen_audio']
  },
  {
    order: 6,
    title: 'Hệ Thống Tăng Trưởng & Kéo Khách Tự Nhiên (Growth Engine)',
    description: 'Vòng lặp giữ chân người dùng (Retention Loop) với Quẻ Khởi Tâm Ban Mai, Đồng Hồ Vận Khí 12 Canh Giờ, Xuất Thiệp May Mắn 4K chia sẻ Story/Zalo và tính năng Gieo Duyên Cho Người Thân.',
    nodeIds: ['comp_morning_oracle', 'comp_cosmic_clock', 'comp_viral_card', 'comp_gift_blessing']
  },
  {
    order: 7,
    title: 'Cơ Chế Quản Trị Đa Tác Tử Repo 2 (MetaGPT) & Telegram Sidecar',
    description: 'Mô hình quản trị doanh nghiệp AI cấp cao: Repo 2 (MetaGPT) đóng vai trò ban lãnh đạo nghiên cứu và giao việc, Repo 1 thi công, và Sidecar Telegram kết nối trực tiếp với Sếp 24/7.',
    nodeIds: ['gov_repo2_metagpt', 'gov_repo1_nextjs', 'gov_telegram_sidecar', 'gov_roadmap_docs']
  }
];

const knowledgeGraph = {
  version: '1.0.0',
  kind: 'codebase',
  project: {
    name: 'Tâm An AI (Soul Sanctuary Ecosystem)',
    languages: ['TypeScript', 'JavaScript', 'Python', 'GLSL/Shader', 'CSS'],
    frameworks: ['Next.js 16', 'React 19', 'Three.js', 'Tailwind CSS v4', 'MetaGPT', 'Web Audio API'],
    description: 'Hệ sinh thái tâm thức và huyền học phương Đông ứng dụng AI toàn diện: Liên Sinh Độn Giáp, Bát Diệp Liên Hoa 3D, Avatar Tiên Ông Thầy Sinh 8K, 78 Lá Bài Tarot, Kinh Ngũ Bách Danh, và Một Bộ Não Hợp Nhất (Unified Brain).',
    analyzedAt: new Date().toISOString(),
    gitCommitHash: 'tam-an-master-v4'
  },
  nodes,
  edges,
  layers,
  tour
};

// Validate using @understand-anything/core schema
console.log('Sanitizing knowledge graph...');
const sanitized = core.sanitizeGraph(knowledgeGraph);
const { data: fixedGraph, issues } = core.autoFixGraph(sanitized);

console.log('Issues found during autofix:', issues.length);
if (issues.length > 0) {
  console.log('Sample issues:', issues.slice(0, 5));
}

const validation = core.validateGraph(fixedGraph);
console.log('Validation success:', validation.success);
if (!validation.success) {
  console.error('Validation errors:', validation.issues || validation.errors);
  process.exit(1);
}

// Write to .ua/knowledge-graph.json
const graphPath = path.join(uaDir, 'knowledge-graph.json');
fs.writeFileSync(graphPath, JSON.stringify(validation.data, null, 2), 'utf-8');
console.log(`Successfully generated knowledge graph: ${graphPath}`);

// Write meta.json
const metaPath = path.join(uaDir, 'meta.json');
fs.writeFileSync(metaPath, JSON.stringify({
  version: '1.0.0',
  projectRoot: projectRoot,
  analyzedAt: new Date().toISOString(),
  gitCommitHash: 'tam-an-master-v4',
  totalNodes: nodes.length,
  totalEdges: edges.length,
  totalLayers: layers.length,
  totalTourSteps: tour.length
}, null, 2), 'utf-8');
console.log(`Successfully generated meta.json: ${metaPath}`);

// Also write config.json
const configPath = path.join(uaDir, 'config.json');
fs.writeFileSync(configPath, JSON.stringify({
  outputLanguage: 'vi',
  autoUpdate: false
}, null, 2), 'utf-8');
console.log(`Successfully generated config.json: ${configPath}`);
