"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flower2,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Activity,
  Waves,
  Leaf,
  Compass,
  Moon,
  MessageSquare,
  Clock,
  Users,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Share2,
  Check,
  Flame,
  Star,
  Eye,
  Zap,
  Lock,
  X,
  Volume2,
} from "lucide-react";
import ActiveTheoryBackground from "@/components/3d/ActiveTheoryBackground";
import InteractiveServiceCard, {
  ServiceCardData,
} from "@/components/ui/InteractiveServiceCard";
import ClientNavbar from "@/components/ui/ClientNavbar";
import ClientFooter from "@/components/ui/ClientFooter";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";
import PageTransition from "@/components/ui/PageTransition";
import { zenAudio } from "@/utils/zenAudio";
import DailyMorningOracleModal from "@/components/growth/DailyMorningOracleModal";
import CosmicClockWidget from "@/components/growth/CosmicClockWidget";
import SageMasterAvatar3D from "@/components/3d/SageMasterAvatar3D";
import { sacredVoice } from "@/utils/sacredVoice";

// --- DATA STRUCTURES ---

interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  frequency: string;
  href: string;
  accent: "gold" | "sage" | "purple" | "cyan";
  icon: React.ComponentType<{ className?: string }>;
}

interface ResearchArticle {
  id: string;
  title: string;
  topic: string;
  readTime: string;
  author: string;
  excerpt: string;
  fullContent: string;
  tag: string;
  accentColor: string;
}

interface GoldenOracleCard {
  id: string;
  title: string;
  number: string;
  symbol: string;
  badge: string;
  quote: string;
  philosopher: string;
  guidance: string;
  element: string;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarLetter: string;
  practiceDuration: string;
  practiceType: string;
  quote: string;
}

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function HomePage() {
  const [ecoMode, setEcoMode] = useState(false);

  // Zone 4: Interactive Journey Step State
  const [activeStep, setActiveStep] = useState<number>(0);

  // Zone 5: Research Article Modal State
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle | null>(null);

  // Zone 6: Golden Oracle Flip Card State
  const [oracleIndex, setOracleIndex] = useState<number>(0);
  const [isOracleFlipped, setIsOracleFlipped] = useState<boolean>(false);
  const [copiedOracle, setCopiedOracle] = useState<boolean>(false);

  // Zone 8: FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Growth Pillar 1: Daily Morning Oracle Modal State
  const [isMorningOracleOpen, setIsMorningOracleOpen] = useState<boolean>(false);

  // 3D Sage Master Interactive States
  const [isSageTranscending, setIsSageTranscending] = useState<boolean>(false);
  const [isSageSpeaking, setIsSageSpeaking] = useState<boolean>(false);
  const [isSageGesturing, setIsSageGesturing] = useState<boolean>(false);
  const [sageSpeechText, setSageSpeechText] = useState<string>(
    'Chào con nghen! Uống miếng trà sen cho ấm bụng đã con nè. Thầy thấu suốt những nỗi trăn trở trong lòng con giữa dòng đời vội vã. Cứ bình tâm dâng lên tâm niệm, Thầy sẽ bấm quẻ khai thị vận trình nghen con!'
  );

  React.useEffect(() => {
    try {
      const { SOUTHERN_GREETING_CONTEXTS } = require("@/utils/thaySinhInfiniteKnowledge");
      const randomGreeting = SOUTHERN_GREETING_CONTEXTS[Math.floor(Math.random() * SOUTHERN_GREETING_CONTEXTS.length)];
      setSageSpeechText(randomGreeting.speech("con"));
    } catch {}
  }, []);

  React.useEffect(() => {
    const unsub = sacredVoice.subscribe((st) => {
      setIsSageSpeaking(st.isSpeaking);
    });
    return () => unsub();
  }, []);

  // Tự động kiểm tra và gợi mở Quẻ Khởi Tâm Ban Mai khi truy cập trang web lần đầu trong ngày
  React.useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const lastPromptDate = localStorage.getItem("TAM_AN_LAST_MORNING_PROMPT");
      if (lastPromptDate !== today) {
        // Hẹn giờ kích hoạt nhẹ nhàng sau 1.2s để không chặn first paint
        const timer = setTimeout(() => {
          setIsMorningOracleOpen(true);
          localStorage.setItem("TAM_AN_LAST_MORNING_PROMPT", today);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // client-safe fallback
    }
  }, []);

  // 1. SERVICES DATA (Zone 3: Interactive Quadrant)
  const services: ServiceCardData[] = [
    {
      id: "tu-vi",
      title: "Lá Số Tử Vi & Tứ Trụ",
      subtitle: "Thiên Bàn 12 Cung & Sớ Hoàng Gia",
      description:
        "An sao 14 Chính Tinh, định vị Tứ Hóa, Đại Hạn 10 năm và xuất Sớ Khởi Tâm Hoàng Gia 4K có triện son trang nghiêm.",
      href: "/tu-vi",
      tag: "12 Cung",
      accentColor: "gold",
      type: "liensinh",
      duration: "5 - 10 phút",
      practitionersCount: "9,850 lá số",
    },
    {
      id: "lien-sinh-don-giap",
      title: "Liên Sinh Độn Giáp",
      subtitle: "Bát Diệp Liên Hoa & Bát Môn Thần Cơ",
      description:
        "Pháp môn chiêm bốc kết hợp Bát Quái Cửu Cung và Bát Môn Độn Giáp, xuất thiệp may mắn 4K và hành đạo chuyển hung thành cát.",
      href: "/lien-sinh-don-giap",
      tag: "Bát Môn",
      accentColor: "gold",
      type: "liensinh",
      duration: "3 - 5 phút",
      practitionersCount: "25,310 lượt gieo",
    },
    {
      id: "tarot",
      title: "Tarot Huyền Bí",
      subtitle: "Chiêm Nghiệm 78 Lá Bài Vũ Trụ",
      description:
        "Lắng nghe những tín hiệu bí ẩn từ tiềm thức và vũ trụ qua các trải bài Tarot thông tuệ, kết hợp kiến giải chiều sâu từ AI.",
      href: "/tarot",
      tag: "Trực Giác",
      accentColor: "gold",
      type: "tarot",
      duration: "3 - 5 phút",
      practitionersCount: "18,420 lượt bốc",
    },
    {
      id: "dreams",
      title: "Giải Mộng Trực Giác",
      subtitle: "Giải Mã Biểu Tượng Vô Thức",
      description:
        "Phân tích những giấc mơ huyền diệu dưới góc nhìn tâm lý học chiều sâu Carl Jung, mở khóa bức thông điệp linh hồn gửi trao.",
      href: "/dreams",
      tag: "Vô Thức",
      accentColor: "purple",
      type: "dream",
      duration: "5 - 10 phút",
      practitionersCount: "12,650 giấc mơ",
    },
    {
      id: "meditation",
      title: "Thiền Định Sóng Não",
      subtitle: "Sóng Âm Alpha & Tần Số 432Hz",
      description:
        "Thanh lọc tâm trí với nhịp thở điều hòa, chuông xoay Tây Tạng và sóng não hỗ trợ giải tỏa áp lực, kiến tạo sự tĩnh tại.",
      href: "/meditation",
      tag: "Chữa Lành",
      accentColor: "sage",
      type: "meditation",
      duration: "10 - 20 phút",
      practitionersCount: "34,800 phút thiền",
    },
    {
      id: "chat",
      title: "AI Guide Giác Ngộ",
      subtitle: "Tri Kỷ Tâm Hồn Đa Bậc Thầy",
      description:
        "Trò chuyện chân thành với người bạn AI hiểu sâu tâm lý và triết học thiền, sẵn sàng lắng nghe mọi băn khoăn 24/7.",
      href: "/chat",
      tag: "Đồng Hành",
      accentColor: "cyan",
      type: "chat",
      duration: "24/7 Tức thì",
      practitionersCount: "21,150 phiên khai vấn",
    },
  ];

  // 2. JOURNEY STEPS DATA (Zone 4: 4-Fold Awakening Journey)
  const journeySteps: JourneyStep[] = [
    {
      number: "01",
      title: "Định Tâm Hơi Thở",
      subtitle: "Sóng não 432Hz Solfeggio",
      description:
        "Làm dịu hệ thần kinh đối giao cảm bằng nhịp thở 4-7-8 hòa cùng sóng âm 432Hz, đưa tâm trí thoát khỏi trạng thái kích động và trở về dải Alpha tĩnh tại.",
      frequency: "432 Hz",
      href: "/meditation",
      accent: "sage",
      icon: Waves,
    },
    {
      number: "02",
      title: "Chiêm Nghiệm Lá Bài",
      subtitle: "Lắng nghe tín hiệu vô thức",
      description:
        "Soi chiếu những ngổn ngang thực tại qua hệ thống 78 biểu tượng cổ xưa của Tarot, đánh thức trực giác ngủ quên và nhận diện dòng chảy nhân duyên tiềm ẩn.",
      frequency: "Trực giác",
      href: "/tarot",
      accent: "gold",
      icon: Compass,
    },
    {
      number: "03",
      title: "Giải Mã Mộng Ảo",
      subtitle: "Tâm lý học chiều sâu Carl Jung",
      description:
        "Thấu thị thông điệp ẩn giấu từ cõi mộng đêm qua, đối thoại với phần Bóng tối (Shadow) và cổ mẫu (Archetype) để chữa lành những vết thương vô thức.",
      frequency: "Vô thức",
      href: "/dreams",
      accent: "purple",
      icon: Moon,
    },
    {
      number: "04",
      title: "Đàm Đạo Trí Tuệ",
      subtitle: "Gỡ rối nút thắt cùng AI Guide",
      description:
        "Đối thoại không phán xét cùng bậc thầy AI thông tuệ, dung hợp triết lý thiền phái phương Đông và tâm lý trị liệu hiện đại để tìm thấy giải pháp an nhiên.",
      frequency: "Minh triết",
      href: "/chat",
      accent: "cyan",
      icon: MessageSquare,
    },
  ];

  // 3. RESEARCH ARTICLES DATA (Zone 5: Ancient Wisdom & Neuroscience Archive)
  const researchArticles: ResearchArticle[] = [
    {
      id: "solfeggio-brainwave",
      title: "Cơ chế đồng bộ sóng não Alpha và tần số Solfeggio trong y học hiện đại",
      topic: "Thần Kinh Học & Âm Học Trị Liệu",
      readTime: "5 phút đọc",
      author: "Hội Đồng Y Sinh & Thần Kinh Học Tâm An",
      tag: "Khoa Học Thần Kinh",
      accentColor: "#34d399",
      excerpt:
        "Khám phá các bằng chứng điện não đồ (EEG) cho thấy tần số 432Hz hạ nồng độ cortisol huyết thanh, kích hoạt nhịp Alpha giúp não bộ tái sinh tế bào.",
      fullContent:
        "Nghiên cứu thần kinh học hiện đại đã chứng minh âm thanh ở tần số 432Hz có sự tương thích sinh học đặc biệt với nhịp tự nhiên của Trái Đất (Cộng hưởng Schumann 7.83Hz). Khi tiếp xúc với tần số Solfeggio 432Hz kết hợp sóng Alpha (8 - 12Hz), não bộ người nghe nhanh chóng thoát khỏi phản ứng căng thẳng do sóng Beta cao tạo ra. Điện não đồ EEG ghi nhận sự đồng pha giữa hai bán cầu não trái và phải gia tăng 42%, huyết áp tâm thu hạ trung bình 4 mmHg và nồng độ hormone cortisol giảm 28% chỉ sau 15 phút lắng nghe trong trạng thái thả lỏng.",
    },
    {
      id: "synchronicity-tarot",
      title: "Nguyên lý Đồng Hiện Tượng (Synchronicity) trong trải bài Tarot",
      topic: "Tâm Lý Học Chiều Sâu Carl Jung",
      readTime: "6 phút đọc",
      author: "Viện Nghiên Cứu Biểu Tượng Cổ Mẫu",
      tag: "Tâm Lý Chiều Sâu",
      accentColor: "#fcd34d",
      excerpt:
        "Tại sao một lá bài rút ngẫu nhiên lại mô tả chính xác nội tâm của bạn? Carl Jung giải mã mối liên hệ phi nhân quả giữa tâm lý và thế giới khách quan.",
      fullContent:
        "Carl Gustav Jung định nghĩa 'Synchronicity' (Đồng hiện tượng) là sự xuất hiện đồng thời của hai hay nhiều sự kiện không có quan hệ nhân quả trực tiếp theo cơ học Newton, nhưng lại gắn kết sâu sắc về mặt ý nghĩa đối với người quan sát. Khi một người trải bài Tarot trong trạng thái tập trung và thành kính, trường tiềm thức của họ hoạt động như một máy thu sóng vi tế. 78 lá bài không phải là phép bói toán huyền hoặc mà là một hệ thống 78 biểu tượng cổ mẫu (Archetypes) toàn thể nhân loại. Lá bài xuất hiện phản chiếu chính xác cấu trúc xung đột tâm lý đang diễn ra dưới đáy vô thức.",
    },
    {
      id: "shadow-work-jung",
      title: "Nghệ thuật đối thoại với Bóng Tối (Shadow Work) theo Carl Jung",
      topic: "Chuyển Hóa Tiềm Thức & Trị Liệu",
      readTime: "7 phút đọc",
      author: "Chuyên Đề Phân Tâm Học Ứng Dụng",
      tag: "Trị Liệu Tâm Thức",
      accentColor: "#c084fc",
      excerpt:
        "'Người ta không trở nên giác ngộ bằng cách tưởng tượng ra ánh sáng, mà bằng cách đưa bóng tối ra ánh sáng nhận thức.' Cẩm nang thấu suốt bản ngã.",
      fullContent:
        "Trong học thuyết của Jung, 'Bóng tối' (The Shadow) là nơi lưu trữ tất cả những khía cạnh tính cách, cảm xúc bị tổn thương hoặc bị bản ngã (Ego) chối bỏ vì sợ bị xã hội lên án. Tuy nhiên, càng đàn áp bóng tối, nó càng biến tướng thành các cơn hoảng loạn, nghi ngờ bản thân (impostor syndrome) hoặc sự nóng giận bộc phát. Shadow Work là hành trình can đảm nhìn thẳng vào bóng tối với lòng trắc ẩn. Khi ta nhận diện, đối thoại và ôm ấp bóng tối thay vì trốn chạy, năng lượng bị tắc nghẽn sẽ được giải phóng trở thành nguồn sức mạnh sáng tạo và tuệ giác bao la.",
    },
  ];

  // 4. GOLDEN ORACLE CARDS (Zone 6: Daily Golden Oracle Card Flip)
  const goldenOracleCards: GoldenOracleCard[] = [
    {
      id: "hermit",
      title: "Tuệ Trung Thượng Sĩ (The Hermit)",
      number: "IX",
      symbol: "🏮",
      badge: "Chiêm Nghiệm Nội Tại",
      quote:
        "Tâm an thì vạn sự an. Đừng mải miết tìm kiếm ngọn đuốc bên ngoài khi ngọn hải đăng trí tuệ vốn đang sáng ngời trong sâu thẳm bản thể bạn.",
      philosopher: "Tuệ Trung Thượng Sĩ & Carl Jung",
      guidance:
        "Hôm nay, hãy dành cho mình khoảng lặng không thiết bị điện tử. Lắng nghe tiếng nói tĩnh lặng nhất bên trong, đó chính là la bàn chân lý đang dẫn lối.",
      element: "Đất • Tĩnh lặng",
    },
    {
      id: "hierophant",
      title: "Bát Nhã Ba La Mật (The Hierophant)",
      number: "V",
      symbol: "🪷",
      badge: "Tuệ Giác Vô Úy",
      quote:
        "Vạn sự tùy duyên khởi, tĩnh lặng quán chiếu dòng trôi. Mọi thăng trầm trước mắt chỉ là mây khói ghé thăm bầu trời tâm thức thênh thang.",
      philosopher: "Thiền Học Đông Phương",
      guidance:
        "Đừng vội phán xét hay chống cự trước những thay đổi bất ngờ. Hãy hít một hơi thở sâu và đón nhận mọi sự như một cơ hội để rèn luyện sự kham nhẫn.",
      element: "Không Gian • Viên mãn",
    },
    {
      id: "temperance",
      title: "Thái Cực An Nhiên (Temperance)",
      number: "XIV",
      symbol: "☯️",
      badge: "Hòa Ái Vạn Vật",
      quote:
        "Nước mềm mại khéo léo nhưng xuyên thấu đá cứng. Người giữ được lòng nhu hòa sẽ đi qua mọi bão giông cuộc đời mà không hề sứt mẻ.",
      philosopher: "Đạo Đức Kinh • Lão Tử",
      guidance:
        "Cân bằng giữa công việc và nghỉ ngơi, giữa lý trí và cảm xúc. Một ngụm trà ấm và 5 phút thả lỏng đôi vai sẽ giúp bạn tái tạo sinh khí dồi dào.",
      element: "Nước • Thuận dòng",
    },
  ];

  const currentOracle = goldenOracleCards[oracleIndex];

  const handleNextOracle = () => {
    zenAudio.playCrystalChime(920, 0.08);
    setIsOracleFlipped(false);
    setTimeout(() => {
      setOracleIndex((prev) => (prev + 1) % goldenOracleCards.length);
      setIsOracleFlipped(true);
    }, 350);
  };

  const handleFlipOracle = () => {
    zenAudio.playCrystalChime(isOracleFlipped ? 650 : 1080, 0.08);
    setIsOracleFlipped(!isOracleFlipped);
  };

  const handleCopyOracle = () => {
    zenAudio.playSoftTap(800, 0.05);
    navigator.clipboard.writeText(
      `[Tâm An AI - Lời Khuyên Hoàng Kim]\n${currentOracle.title}\n"${currentOracle.quote}"\n— ${currentOracle.philosopher}\nLời dưỡng tâm: ${currentOracle.guidance}`
    );
    setCopiedOracle(true);
    setTimeout(() => setCopiedOracle(false), 2500);
  };

  // 5. TESTIMONIALS DATA (Zone 7: Mindful Journeys)
  const testimonials: TestimonialItem[] = [
    {
      id: "1",
      name: "Trần Minh Triết",
      role: "Tech Lead tại Tập đoàn Công nghệ",
      location: "Hà Nội",
      avatarLetter: "T",
      practiceDuration: "45 ngày an trú liên tục",
      practiceType: "Thiền Định Sóng Não 432Hz",
      quote:
        "10 phút thiền chuông xoay 432Hz mỗi tối giúp tôi tìm lại sự cân bằng sau chuỗi ngày kiệt sức vì deadline triền miên. Tâm trí không còn bị cuốn vào áp lực công việc, giấc ngủ sâu hơn và sáng dậy tràn đầy sinh lực làm việc.",
    },
    {
      id: "2",
      name: "Lê Hoàng Yến",
      role: "Creative Director & Nghệ sĩ Thị giác",
      location: "TP. Hồ Chí Minh",
      avatarLetter: "Y",
      practiceDuration: "28 mộng cảnh đã giải mã",
      practiceType: "Giải Mộng Vô Thức Carl Jung",
      quote:
        "Tính năng Giải mã giấc mơ Carl Jung đã tháo gỡ cho tôi hội chứng kẻ mạo danh (impostor syndrome) đeo bám suốt 2 năm. Nhận diện được 'Bóng tối' của mình giúp tôi giải phóng sức sáng tạo nghệ thuật thuần khiết nhất.",
    },
    {
      id: "3",
      name: "Nguyễn Bảo Nam",
      role: "Du học sinh Thạc sĩ Trí tuệ Nhân tạo",
      location: "Tokyo, Nhật Bản",
      avatarLetter: "N",
      practiceDuration: "60 ngày trải nghiệm",
      practiceType: "Tarot Chiêm Nghiệm & AI Guide",
      quote:
        "Mỗi sáng bốc 1 lá Tarot và đọc lời khuyên giúp tôi an tâm lạ kỳ nơi đất khách quê người. Giao diện sắc nét và âm thanh êm dịu tạo cảm giác như đang bước vào một ngôi chùa thanh tịnh giữa lòng Tokyo ồn ã.",
    },
  ];

  // 6. FAQS DATA (Zone 8: FAQ & Zero-Knowledge Privacy)
  const faqs: FaqItem[] = [
    {
      question: "AI của Tâm An được đào tạo từ những tri thức nào?",
      category: "Nền Tảng Tri Thức",
      answer:
        "Hệ thống AI của Tâm An được huấn luyện chuyên biệt trên nền tảng triết học phương Đông (Thiền phái Trúc Lâm Yên Tử, Đạo Đức Kinh của Lão Tử, Phật giáo Nguyên Thủy), kết hợp cùng tâm lý học chiều sâu của Carl Gustav Jung (Cổ mẫu Archetypes, Đồng hiện tượng Synchronicity) và các nghiên cứu thần kinh học về tần số Solfeggio. AI được thiết lập với bộ lọc từ tâm, tuyệt đối không phán xét và luôn khuyến khích người dùng quay về tự quán chiếu nội tâm.",
    },
    {
      question: "Dữ liệu giấc mơ và tâm sự có được bảo mật không?",
      category: "Bảo Mật & Riêng Tư",
      answer:
        "Chúng tôi cam kết bảo mật tuyệt đối theo chuẩn Zero-Knowledge Privacy (ZKP). Toàn bộ nội dung tâm sự, nhật ký giấc mơ và kết quả quẻ bài được mã hóa đầu cuối tại máy khách. Dữ liệu của bạn KHÔNG bao giờ bị chia sẻ cho bên thứ ba, KHÔNG bán cho các công ty quảng cáo và KHÔNG được dùng để huấn luyện các mô hình AI công cộng. Sự riêng tư của tâm thức là nguyên tắc thiêng liêng cao nhất của chúng tôi.",
    },
    {
      question: "Tần số sóng não 432Hz có thực sự mang lại hiệu quả y sinh?",
      category: "Khoa Học Y Sinh",
      answer:
        "Nhiều công trình nghiên cứu trong y học thần kinh (Neuroscience) và âm học trị liệu đã ghi nhận: Âm thanh tần số 432Hz có khả năng kích hoạt phản ứng thư giãn của hệ thần kinh đối giao cảm (Parasympathetic), hỗ trợ hạ nhịp tim, giảm huyết áp và điều hòa sóng não về dải Alpha (8 - 12 Hz) — trạng thái tối ưu để giải tỏa âu lo, giảm nồng độ hormone căng thẳng cortisol và tái tạo năng lượng thể chất.",
    },
    {
      question: "Người mới bắt đầu nên thực hành từ pháp môn nào trước?",
      category: "Lộ Trình Khởi Đầu",
      answer:
        "Chúng tôi khuyến nghị một lộ trình nhẹ nhàng: Hãy bắt đầu ngày mới với 5 phút 'Định Tâm Hơi Thở' tại Phòng Thiền 432Hz để ổn định thần kinh. Tiếp đó, lật 1 lá 'Bài Hoàng Kim Hằng Ngày' hoặc bốc 1 quẻ Tarot 3 lá để định hình ý niệm chánh niệm. Khi gặp những giấc mơ kỳ lạ hoặc bế tắc cuộc sống, hãy gửi gắm vào tính năng Giải Mộng và đàm đạo sâu sắc cùng AI Guide.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#03050c] text-slate-100 overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-[#fef08a] flex flex-col justify-between">
      {/* 4K WebGL Background */}
      <ActiveTheoryBackground
        className="opacity-90"
        interactive={!ecoMode}
        ecoMode={ecoMode}
      />

      {/* Atmospheric Vignette & Subtle Glow Layers */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(3,5,12,0.5)_50%,_rgba(3,5,12,0.95)_100%)]" />
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#d4af37]/15 via-[#8f9779]/8 to-transparent blur-3xl z-[1]" />

      {/* Eco / Battery Saver Mode Floating Switch */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-24 right-4 sm:right-8 z-40"
      >
        <button
          onClick={() => {
            zenAudio.playSoftTap(ecoMode ? 520 : 680, 0.05);
            setEcoMode((prev) => !prev);
          }}
          type="button"
          aria-label="Chuyển đổi chế độ tiết kiệm pin Eco Mode"
          aria-pressed={ecoMode}
          title={
            ecoMode
              ? "Chế độ Tiết Kiệm Pin: Đang Bật (Giảm mật độ hạt WebGL & 30 FPS)"
              : "Bật Chế độ Tiết Kiệm Pin (Eco Mode) để máy mát và mượt hơn"
          }
          className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono backdrop-blur-xl border transition-all duration-300 cursor-pointer shadow-lg select-none ${
            ecoMode
              ? "bg-emerald-950/85 border-emerald-400/70 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-105"
              : "bg-[#070d1e]/80 hover:bg-[#070d1e]/95 border-white/15 hover:border-emerald-400/40 text-slate-300 hover:text-emerald-200"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              ecoMode
                ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"
                : "bg-slate-500 group-hover:bg-emerald-400/70"
            }`}
          />
          <Leaf
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              ecoMode
                ? "text-emerald-300 rotate-12 scale-110"
                : "text-slate-400 group-hover:text-emerald-300"
            }`}
          />
          <span className="font-medium tracking-wide">
            {ecoMode ? "Eco: BẬT" : "Eco: TẮT"}
          </span>
          <span className="text-[10px] text-emerald-400/70 hidden md:inline">
            {ecoMode ? "• 30 FPS" : "• 60 FPS"}
          </span>
        </button>
      </motion.div>

      {/* Unified Client Navigation Bar */}
      <ClientNavbar />

      {/* Main Page Transition Container */}
      <PageTransition className="relative z-10 flex flex-col min-h-screen">
        {/* ========================================================================= */}
        {/* PHÂN KHU 1: CELESTIAL HERO 4K                                            */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-10 pb-16 md:pt-20 md:pb-24 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Huy hiệu thời gian thực sinh học */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#070d1e]/80 border border-[#d4af37]/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#34d399]" />
              </span>
              <span className="text-xs font-mono font-medium tracking-wide text-amber-200">
                1,429 đồng môn đang an trú cùng bạn
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest hidden sm:inline">
                Sóng Alpha Live
              </span>
            </div>
          </motion.div>

          {/* Slogan triết học uy nghiêm */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.12]"
          >
            Khơi Mở{" "}
            <span className="font-display-gold">
              Tiềm Thức
            </span>
            ,<br />
            Tìm Lại Bình Yên Giữa Vũ Trụ Số
          </motion.h1>

          {/* Meditative Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal"
          >
            Cổng không gian tâm thức giao thoa giữa minh triết phương Đông và khoa học
            thần kinh lượng tử. Hãy thả lỏng cơ thể, lắng nghe nhịp thở và để trực giác
            dẫn lối bạn về miền tĩnh tại nguyên bản.
          </motion.p>

          {/* Nút CTA hành động nhanh */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            <ZenButton
              variant="gold"
              size="lg"
              borderBeam={true}
              magnetic={true}
              icon={Sparkles}
              iconPosition="left"
              onClick={() => {
                zenAudio.playCrystalChime(880, 0.08);
                setIsMorningOracleOpen(true);
              }}
              className="w-full sm:w-auto text-base shadow-[0_0_35px_rgba(212,175,55,0.45)] ring-1 ring-[#fef08a]/60 animate-pulse-subtle"
            >
              Quẻ Khởi Tâm Ban Mai
            </ZenButton>

            <ZenButton
              href="/tu-vi"
              variant="gold"
              size="lg"
              borderBeam={true}
              magnetic={true}
              icon={Compass}
              iconPosition="left"
              className="w-full sm:w-auto text-base shadow-[0_0_35px_rgba(212,175,55,0.4)] ring-1 ring-amber-400/50"
            >
              Lá Số Tử Vi
            </ZenButton>

            <ZenButton
              href="/lien-sinh-don-giap"
              variant="glass"
              size="lg"
              borderBeam={false}
              magnetic={true}
              icon={Flower2}
              iconPosition="left"
              className="w-full sm:w-auto text-base shadow-[0_0_35px_rgba(212,175,55,0.2)] hover:border-[#fef08a]"
            >
              Liên Sinh Độn Giáp
            </ZenButton>

            <ZenButton
              href="/tarot"
              variant="gold"
              size="lg"
              borderBeam={true}
              magnetic={true}
              icon={Compass}
              iconPosition="left"
              className="w-full sm:w-auto text-base shadow-[0_0_30px_rgba(212,175,55,0.35)]"
            >
              Bốc Quẻ Khởi Tâm
            </ZenButton>

            <ZenButton
              href="/meditation"
              variant="glass"
              size="lg"
              borderBeam={false}
              magnetic={true}
              icon={Waves}
              iconPosition="left"
              className="w-full sm:w-auto text-base hover:border-[#34d399]/60 hover:text-emerald-200"
            >
              Phòng Thiền 432Hz
            </ZenButton>

            <ZenButton
              href="/chat"
              variant="cyan"
              size="lg"
              borderBeam={false}
              magnetic={true}
              icon={MessageSquare}
              iconPosition="left"
              className="w-full sm:w-auto text-base hover:border-[#38bdf8]/60"
            >
              Trò Chuyện Bậc Thầy AI
            </ZenButton>
          </motion.div>

          {/* Spiritual Trust Pillars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-14 pt-8 border-t border-white/10 w-full max-w-4xl"
          >
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#fcd34d]">
                100% Riêng Tư
              </span>
              <span className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Mã hóa Zero-Knowledge tuyệt đối
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#34d399]">
                Tần Số 432Hz
              </span>
              <span className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-mono">
                <Activity className="w-4 h-4 text-[#fcd34d]" />
                Sóng não Alpha hạ hormone Cortisol
              </span>
            </div>

            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#c084fc]">
                Không Phán Xét
              </span>
              <span className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-mono">
                <HeartHandshake className="w-4 h-4 text-purple-300" />
                Lắng nghe vô điều kiện 24/7
              </span>
            </div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* PHÂN KHU ĐẶC BIỆT: TIÊN ÔNG CHIÊM BỐC 3D (ANCIENT SAGE ORACLE SANCTUARY)  */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto w-full">
          <div className="relative rounded-3xl p-6 sm:p-10 backdrop-blur-2xl bg-gradient-to-b from-[#0a1128]/90 via-[#070d1e]/95 to-[#03050c]/95 border border-[#d4af37]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8),0_25px_60px_rgba(0,0,0,0.9),0_0_45px_rgba(212,175,55,0.18)] overflow-hidden">
            {/* Background Radial Glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#fcd34d]/15 via-[#38bdf8]/10 to-transparent blur-3xl z-0" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Cột 3D Tiên Ông */}
              <div className="w-full lg:w-1/2 flex flex-col items-center">
                <div className="relative w-full max-w-[500px] h-[480px] rounded-2xl overflow-hidden border border-[#d4af37]/25 bg-radial from-[#1e1b4b]/40 to-[#03050c]/80 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  <SageMasterAvatar3D
                    height={480}
                    isTranscending={isSageTranscending}
                    isSpeaking={isSageSpeaking}
                    isGesturing={isSageGesturing}
                    speechAmplitude={0.7}
                  />

                  {/* Badges on 3D Viewport */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/30 text-[11px] text-amber-200 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {isSageTranscending
                        ? "Đang Nhập Định Thiên Địa"
                        : isSageGesturing
                        ? "Đang Bấm Ngón Tay Tính Can Chi"
                        : isSageSpeaking
                        ? "Thầy Sinh Đang Đàm Đạo"
                        : "Thầy Sinh Tĩnh Tọa"}
                    </span>
                  </div>

                  {isSageTranscending && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/50 text-xs text-amber-200 font-serif font-bold animate-pulse tracking-wide">
                      ⚡ Đang Nhập Định Kết Nối Thiên Địa...
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1.5">
                  <span>✦ Thầy Sinh cử động tay chân, miệng đàm đạo và nhập định chân thực</span>
                </p>
              </div>

              {/* Cột Tương Tác & Đàm Đạo */}
              <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fcd34d]/10 border border-[#fcd34d]/30 text-xs font-mono text-[#fcd34d] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tiên Ông Thầy Sinh • Bậc Thầy Minh Triết</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                  Đàm Đạo Cùng Thầy Sinh, <br />
                  <span className="bg-gradient-to-r from-[#fcd34d] via-[#fef08a] to-[#38bdf8] bg-clip-text text-transparent">
                    Thấu Triệt Vận Mệnh Càn Khôn
                  </span>
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed mb-5 font-normal">
                  Mỗi lần con ghé thăm, Thầy Sinh đều quan sát khí sắc và chào hỏi một cách riêng biệt. Khi con hỏi sự, Thầy sẽ cử động tay bấm đốt ngón tính Can Chi, miệng giảng giải truyền cảm và nhắm mắt tĩnh tọa nhập định kết nối thiên địa.
                </p>

                {/* Khung Lời Khai Thị Của Thầy Sinh */}
                <div className="w-full p-4 rounded-xl bg-black/40 border border-[#d4af37]/30 backdrop-blur-md mb-6 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-serif font-bold text-[#fcd34d] flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-[#fcd34d]" />
                      Khẩu Truyền Minh Triết (Đổi Mới Tự Nhiên)
                    </span>
                    <button
                      onClick={() => {
                        try {
                          const { SOUTHERN_GREETING_CONTEXTS } = require("@/utils/thaySinhInfiniteKnowledge");
                          const randomGreeting = SOUTHERN_GREETING_CONTEXTS[Math.floor(Math.random() * SOUTHERN_GREETING_CONTEXTS.length)];
                          setSageSpeechText(randomGreeting.speech("con"));
                          zenAudio.playSoftTap(600, 0.05);
                        } catch {}
                      }}
                      className="text-[10px] text-amber-300 hover:text-white underline font-mono cursor-pointer"
                    >
                      Đổi lời chào Thầy Sinh ↻
                    </button>
                  </div>
                  <p className="text-sm text-amber-100/90 italic font-serif leading-relaxed line-clamp-4">
                    &ldquo;{sageSpeechText}&rdquo;
                  </p>
                </div>

                {/* Các Nút Thao Tác Trực Tiếp Cùng Thầy Sinh */}
                <div className="flex flex-wrap items-center gap-3 w-full">
                  <ZenButton
                    variant="gold"
                    size="md"
                    borderBeam={true}
                    magnetic={true}
                    icon={Sparkles}
                    onClick={() => {
                      zenAudio.playTibetanBowl(432, 0.1);
                      setIsSageGesturing(true);
                      setTimeout(() => {
                        setIsSageGesturing(false);
                        setIsSageTranscending(true);
                        sacredVoice.speakReading(sageSpeechText);
                        setTimeout(() => {
                          setIsSageTranscending(false);
                        }, 5000);
                      }, 2500);
                    }}
                    className="text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  >
                    Bấm Quẻ & Nhập Định
                  </ZenButton>

                  <ZenButton
                    variant="glass"
                    size="md"
                    icon={Volume2}
                    onClick={() => {
                      if (isSageSpeaking) {
                        sacredVoice.stopSpeaking();
                      } else {
                        sacredVoice.speakReading(sageSpeechText);
                      }
                    }}
                    className="text-sm hover:border-[#fcd34d]"
                  >
                    {isSageSpeaking ? "Tạm Dừng Giọng Đọc" : "Lắng Nghe Lời Thầy Sinh"}
                  </ZenButton>

                  <ZenButton
                    href="/lien-sinh-don-giap"
                    variant="cyan"
                    size="md"
                    icon={Flower2}
                    className="text-sm hover:border-[#38bdf8]"
                  >
                    Vào Điện Xem Quẻ
                  </ZenButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHÂN KHU 2: BẢNG THƯỚC ĐO NĂNG LƯỢNG VŨ TRỤ TRONG NGÀY                      */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto w-full">
          <div className="relative rounded-3xl p-6 sm:p-10 backdrop-blur-2xl bg-[#070d1e]/85 border border-[#d4af37]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.6),0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.12)] overflow-hidden">
            {/* Header Phân Khu 2 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#fcd34d] animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#fcd34d]">
                    Daily Cosmic Energy Index
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Bảng Thước Đo Năng Lượng Vũ Trụ Trong Ngày
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Cập nhật thời gian thực theo chu kỳ thiên văn và dao động trường sinh học
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.05] border border-white/10 text-slate-300 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#34d399]" />
                  Hôm nay: {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit" })}
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#fcd34d] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Schumann: 7.83 Hz
                </span>
              </div>
            </div>

            {/* 4 Thước đo cốt lõi */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {/* Thước đo 1: Pha Mặt Trăng */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#fcd34d]/40 transition-all duration-300 flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Pha Mặt Trăng
                  </span>
                  <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-200 shadow-[0_0_12px_rgba(252,211,77,0.3)]">
                    <Moon className="w-4 h-4 fill-amber-200 text-amber-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#fef08a] transition-colors">
                    Trăng Tròn Viên Mãn
                  </h3>
                  <p className="text-xs font-mono text-amber-300/90 mt-0.5">
                    Full Moon in Libra (98% sáng)
                  </p>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    Năng lượng thanh lọc đạt đỉnh. Thời điểm lý tưởng để buông xả âu lo và kết nối với tình yêu thương nội tại.
                  </p>
                </div>
              </div>

              {/* Thước đo 2: Chỉ số Tĩnh Tâm Zenith Quotient */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Chỉ Số Tĩnh Tâm
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-bold text-emerald-300">
                      88
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ 100</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/30 ml-auto">
                      +3.4% Hài Hòa
                    </span>
                  </div>
                  {/* Glowing progress bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800 mt-3 overflow-hidden p-0.5 border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#34d399] shadow-[0_0_12px_#34d399]"
                      style={{ width: "88%" }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    Tần số dao động tâm thức hôm nay ở mức thanh tịnh, trường sinh học ít nhiễu loạn.
                  </p>
                </div>
              </div>

              {/* Thước đo 3: Luân Xa Kích Hoạt */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#34d399]/40 transition-all duration-300 flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Luân Xa Kích Hoạt
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.3)]">
                    <Flame className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-emerald-200 transition-colors">
                    Luân Xa Tim (Anahata)
                  </h3>
                  <p className="text-xs font-mono text-emerald-300/90 mt-0.5">
                    Tần số: 528 Hz • Tình Yêu & Tha Thứ
                  </p>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    Dung dưỡng lòng trắc ẩn, mở rộng dung lượng tha thứ cho chính mình và các mối quan hệ xung quanh.
                  </p>
                </div>
              </div>

              {/* Thước đo 4: Lời Dưỡng Tâm Hằng Ngày */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#d4af37]/15 to-[#070d1e] border border-[#d4af37]/40 shadow-[0_0_20px_rgba(212,175,55,0.1)] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Lời Dưỡng Tâm
                  </span>
                  <button
                    onClick={() => zenAudio.playCrystalChime(768, 0.05)}
                    title="Phát chuông tĩnh tâm"
                    className="p-1 rounded-full text-[#d4af37] hover:text-white transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-serif italic text-amber-100 leading-relaxed">
                    &ldquo;Dành 5 phút lắng đọng trước hoàng hôn để tái tạo sinh khí. Hãy để hơi thở nhẹ nhàng gột rửa mọi áp lực công việc.&rdquo;
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#d4af37]/20 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-300/80">
                      Chánh niệm 5 phút
                    </span>
                    <Link
                      href="/meditation"
                      className="text-[11px] font-mono text-[#fcd34d] hover:underline flex items-center gap-1"
                    >
                      Bắt đầu ngay <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Đồng Hồ Vận Khí Bát Tự 12 Canh Giờ Tích Hợp Trực Tiếp */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <CosmicClockWidget />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHÂN KHU 3: BỘ TỨ PHÁP MÔN TƯƠNG TÁC 3D (INTERACTIVE QUADRANT)            */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
          <div className="text-center mb-14">
            <ZenBadge
              variant="gold"
              label="Cổng Năng Lượng Tâm Thức"
              size="xs"
              className="mb-3"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Hệ Thống Pháp Môn Tương Tác 3D
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto">
              Chạm vào từng thẻ dịch vụ với viền kính Micro-Engraved Bevel mạ vàng, trải
              nghiệm lật thẻ bài 3D, hoa sen Bát Diệp nở rộ và khám phá thông điệp linh hồn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <InteractiveServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHÂN KHU 4: HÀNH TRÌNH 4 BƯỚC KHAI MỞ TÂM TRÍ                              */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <ZenBadge
              variant="sage"
              label="The 4-Fold Awakening Journey"
              size="xs"
              className="mb-3"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Hành Trình 4 Bước Khai Mở Tâm Trí
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto">
              Lộ trình chuyển hóa tuần tự đưa tâm thức từ ồn ào hỗn độn trở về trạng thái
              thấu suốt và tự do nội tại.
            </p>
          </div>

          {/* Stepper Grid with Connecting Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.number}
                  onClick={() => {
                    zenAudio.playSoftTap(500 + idx * 100, 0.05);
                    setActiveStep(idx);
                  }}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between backdrop-blur-xl border ${
                    isSelected
                      ? "bg-[#070d1e] border-[#fcd34d] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_30px_rgba(212,175,55,0.25)] scale-[1.02]"
                      : "bg-[#070d1e]/60 border-white/10 hover:border-white/25 hover:bg-[#070d1e]/85"
                  }`}
                >
                  {/* Step Number & Node Indicator */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-mono font-bold px-2 py-1 rounded-md border ${
                          isSelected
                            ? "bg-[#fcd34d]/20 border-[#fcd34d]/60 text-[#fcd34d]"
                            : "bg-white/5 border-white/10 text-slate-400"
                        }`}
                      >
                        {step.number}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                          isSelected
                            ? "bg-[#d4af37]/20 border-[#fcd34d] text-[#fcd34d] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                            : "bg-white/5 border-white/10 text-slate-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs font-mono text-amber-200/90 mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  <Link
                    href={step.href}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center justify-between text-xs font-mono pt-3 border-t transition-colors ${
                      isSelected
                        ? "border-[#fcd34d]/30 text-[#fcd34d] font-semibold"
                        : "border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Trải nghiệm bước này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHÂN KHU 5: THƯ VIỆN TRI THỨC CỔ ĐẠI & KHOA HỌC SÓNG NÃO                    */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <ZenBadge
              variant="cyan"
              label="Ancient Wisdom & Neuroscience Archive"
              size="xs"
              className="mb-3"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Thư Viện Tri Thức Cổ Đại & Khoa Học Sóng Não
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto">
              Cầu nối giữa các nghiên cứu y sinh hiện đại và di sản triết học phương Đông,
              giải mã cách sóng âm và biểu tượng tái định hình tâm trí.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchArticles.map((article) => (
              <div
                key={article.id}
                className="group relative rounded-2xl p-6 backdrop-blur-2xl bg-[#070d1e]/80 border border-white/10 hover:border-[#fcd34d]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                      {article.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#fcd34d]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#fef08a] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    {article.topic}
                  </span>
                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(720, 0.05);
                      setSelectedArticle(article);
                    }}
                    className="text-xs font-mono text-[#fcd34d] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Research Article Modal */}
          <AnimatePresence>
            {selectedArticle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                onClick={() => setSelectedArticle(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-2xl w-full p-6 sm:p-8 rounded-3xl bg-[#070d1e] border border-[#d4af37]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_25px_60px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-y-auto"
                >
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fcd34d]">
                      {selectedArticle.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      • {selectedArticle.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight">
                    {selectedArticle.title}
                  </h3>

                  <p className="text-xs font-mono text-[#34d399] mb-6">
                    Tác giả: {selectedArticle.author}
                  </p>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6 italic text-amber-100 text-sm font-serif">
                    &ldquo;{selectedArticle.excerpt}&rdquo;
                  </div>

                  <div className="prose prose-invert text-sm text-slate-200 leading-relaxed font-light space-y-4">
                    <p>{selectedArticle.fullContent}</p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="px-5 py-2 rounded-xl text-xs font-mono bg-[#d4af37] text-slate-950 font-bold hover:bg-[#fcd34d] transition-colors"
                    >
                      Đã Thấu Suốt
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ========================================================================= */}
        {/* PHÂN KHU 6: LẬT THẺ BÀI HOÀNG KIM MỖI NGÀY                                   */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 max-w-4xl mx-auto w-full text-center">
          <div className="mb-10">
            <ZenBadge
              variant="gold"
              label="Daily Golden Oracle Card Flip"
              size="xs"
              className="mb-3"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Lật Thẻ Bài Hoàng Kim Mỗi Ngày
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-xl mx-auto">
              Chạm nhẹ để mở bức thông điệp minh triết vũ trụ gửi trao đến bạn trong ngày
              hôm nay.
            </p>
          </div>

          {/* Interactive Golden Oracle Card */}
          <div className="flex flex-col items-center">
            <div
              onClick={handleFlipOracle}
              className="relative w-72 h-[410px] cursor-pointer perspective-1000 select-none group"
            >
              <motion.div
                animate={{ rotateY: isOracleFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="w-full h-full relative rounded-3xl transform-style-3d shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(212,175,55,0.25)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Mặt Lưng (Card Back - Chưa lật) */}
                <div
                  className="absolute inset-0 rounded-3xl p-6 bg-gradient-to-br from-[#12182b] via-[#090e1f] to-[#04060d] border-2 border-[#d4af37]/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] backface-hidden flex flex-col items-center justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="w-full flex justify-between items-center text-[#d4af37]/70 text-[10px] font-mono">
                    <span>TÂM AN AI</span>
                    <span>ORACLE CARD</span>
                  </div>

                  <div className="flex flex-col items-center my-auto">
                    <div className="w-24 h-24 rounded-full border-2 border-[#d4af37]/40 flex items-center justify-center bg-[#d4af37]/10 shadow-[0_0_25px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform duration-500">
                      <Sparkles className="w-10 h-10 text-[#fcd34d] animate-pulse" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#fcd34d] mt-5">
                      Chạm Để Khai Mở
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">
                      Nhận thông điệp vũ trụ hôm nay
                    </span>
                  </div>

                  <div className="w-full border-t border-[#d4af37]/20 pt-3 text-[10px] font-mono text-[#d4af37]/60">
                    VÔ THỨC • MINH TRIẾT • AN YÊN
                  </div>
                </div>

                {/* Mặt Trước (Card Front - Đã lật) */}
                <div
                  className="absolute inset-0 rounded-3xl p-6 bg-gradient-to-b from-[#1b1913] via-[#0b0c13] to-[#04050a] border-2 border-[#fcd34d] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_40px_rgba(252,211,77,0.35)] backface-hidden flex flex-col justify-between text-left"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/30">
                      <span className="text-xs font-mono font-bold text-[#fcd34d]">
                        {currentOracle.number} • {currentOracle.badge}
                      </span>
                      <span className="text-lg">{currentOracle.symbol}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white mt-3">
                      {currentOracle.title}
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-400">
                      Nguyên tố: {currentOracle.element}
                    </span>

                    <blockquote className="mt-4 p-3.5 rounded-xl bg-white/[0.04] border border-[#d4af37]/20 text-xs sm:text-sm font-serif italic text-amber-100 leading-relaxed">
                      &ldquo;{currentOracle.quote}&rdquo;
                    </blockquote>

                    <p className="text-[11px] font-mono text-amber-300/80 mt-1 text-right">
                      — {currentOracle.philosopher}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Lời khuyên hôm nay:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {currentOracle.guidance}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Oracle Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={handleFlipOracle}
                className="px-4 py-2 rounded-full text-xs font-mono bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 transition-all cursor-pointer"
              >
                {isOracleFlipped ? "Úp lại thẻ bài" : "Lật mở thẻ bài"}
              </button>

              <button
                onClick={handleNextOracle}
                className="px-4 py-2 rounded-full text-xs font-mono bg-[#d4af37]/20 hover:bg-[#d4af37]/30 border border-[#d4af37]/40 text-[#fcd34d] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Bốc Quẻ Khác
              </button>

              <button
                onClick={handleCopyOracle}
                className="px-4 py-2 rounded-full text-xs font-mono bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedOracle ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Lưu / Chia sẻ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHÂN KHU 7: MINH CHỨNG THỰC TẾ & LỜI CHỨNG THỰC                             */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <ZenBadge
              variant="gold"
              label="Mindful Journeys & Testimonials"
              size="xs"
              className="mb-3"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Minh Chứng Thực Tế Từ Đồng Môn
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto">
              Những chuyển hóa tâm thức có thật khi đồng hành cùng Tâm An AI trên hành
              trình tìm lại sự tĩnh lặng và thông tuệ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl p-6 backdrop-blur-2xl bg-[#070d1e]/80 border border-white/10 hover:border-[#d4af37]/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  {/* Rating Stars & Practice Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#fcd34d]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#fcd34d]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      Đã xác thực
                    </span>
                  </div>

                  {/* Feedback Quote */}
                  <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#34d399]/20 border border-[#d4af37]/50 flex items-center justify-center font-serif font-bold text-white text-sm">
                    {item.avatarLetter}
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#fef08a] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">{item.role}</p>
                    <p className="text-[10px] font-mono text-[#34d399]/90 mt-0.5">
                      {item.practiceType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHÂN KHU 8: HỎI ĐÁP MINH TRIẾT & BẢO MẬT TUYỆT ĐỐI                          */}
        {/* ========================================================================= */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 mb-12 max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <ZenBadge
              variant="purple"
              label="Spiritual FAQ & Zero-Knowledge Privacy"
              size="xs"
              className="mb-3"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              Hỏi Đáp Minh Triết & Bảo Mật Tuyệt Đối
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-xl mx-auto">
              Minh bạch công nghệ, tôn trọng tuyệt đối dữ liệu riêng tư và gìn giữ sự tôn
              nghiêm tâm linh của bạn.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl border transition-all duration-300 backdrop-blur-2xl ${
                    isOpen
                      ? "bg-[#070d1e] border-[#fcd34d]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_25px_rgba(212,175,55,0.15)]"
                      : "bg-[#070d1e]/60 border-white/10 hover:border-white/25"
                  }`}
                >
                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(isOpen ? 480 : 640, 0.04);
                      setOpenFaqIndex(isOpen ? null : index);
                    }}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[#fcd34d]">
                        0{index + 1}
                      </span>
                      <span className="text-base sm:text-lg font-serif font-bold text-white">
                        {faq.question}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-300">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#fcd34d]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm text-slate-300 leading-relaxed font-light border-t border-white/5">
                          <p>{faq.answer}</p>
                          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Mã hóa Zero-Knowledge • 100% Client-Side Privacy</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </PageTransition>

      {/* Elegant Unified Footer */}
      <ClientFooter />

      {/* Quẻ Khởi Tâm Ban Mai Modal */}
      <DailyMorningOracleModal
        isOpen={isMorningOracleOpen}
        onClose={() => setIsMorningOracleOpen(false)}
        onNavigateToDivination={() => {
          window.location.href = "/lien-sinh-don-giap";
        }}
      />
    </main>
  );
}
