"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  TrendingUp,
  ShieldCheck,
  Compass,
  Clock,
  UserCheck,
  AlertTriangle,
  BrainCircuit,
  Feather,
  Share2,
  BookOpen,
  Sun,
  Flame,
  Play,
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";
import {
  recommendNguBachDanh,
  NguBachDanhRecommendation,
} from "@/utils/nguBachDanh";
import { CHU_DICH_64_QUE } from "@/utils/easternOccult";
import SacredVoicePlayer from "@/components/audio/SacredVoicePlayer";
import { getLieuPhamRemedy, LIEU_PHAM_BON_BAI_HOC } from "@/utils/lieuPhamTuHuan";
import { Video } from "lucide-react";
import ThaySinhVideoExporterModal from "@/components/video/ThaySinhVideoExporterModal";
import { generateThaySinhSpeech } from "@/utils/sacredVoice";

export interface SoulfulReadingData {
  chanhName: string;
  hoName: string;
  bienName: string;
  movingLines: number[];
  gender: "nam" | "nu";
  question: string;
  tier1_TamCanh: {
    title: string;
    soulResonance: string;
    underlyingFearOrDesire: string;
    innerStateTag: string;
  };
  tier2_ThoiVan: {
    title: string;
    cosmicTrend: string;
    ungKyTimeline: string;
    benefactorQuyNhan: string;
    pitfallsCanPhong: string;
    actionStrategy: "TIẾN THỦ ĐẮC LỢI" | "ẨN NHẪN TÍCH LŨY" | "TỪ TỪ CHUYỂN DỊCH" | "GIỮ VỮNG CHÍNH ĐẠO";
  };
  tier3_HanhDao: {
    title: string;
    daoistWisdom: string;
    meditationGuidance: string;
    auspiciousDirections: string[];
    auspiciousColors: string[];
    karmicRemedy: NguBachDanhRecommendation;
  };
  poemVerse: string[];
}

/**
 * Thuật toán kiến tạo Lời Giải Quẻ 3 Tầng Chạm Đáy Tâm Can
 */
export function buildSoulfulReading({
  chanhName,
  hoName,
  bienName,
  movingLines = [],
  gender = "nam",
  question = "Cầu bình an, tài lộc và hanh thông...",
}: {
  chanhName: string;
  hoName?: string;
  bienName?: string;
  movingLines?: number[];
  gender?: "nam" | "nu";
  question?: string;
}): SoulfulReadingData {
  const qLower = question.toLowerCase();
  const effectiveHoName = hoName || "Hổ Quái";
  const effectiveBienName = bienName || chanhName;
  const hasMoving = movingLines.length > 0;

  // 1. Phân tích Tầng 1: Thấu Cảm Tâm Cảnh
  let soulResonance = "";
  let underlyingFearOrDesire = "";
  let innerStateTag = "Đang Trăn Trở Sâu Sắc";

  if (
    chanhName.includes("Khảm") ||
    chanhName.includes("Khốn") ||
    chanhName.includes("Kiển") ||
    chanhName.includes("Bĩ")
  ) {
    soulResonance =
      "Người cầu sự hiện đang trải qua giai đoạn lòng đầy chênh vênh, tựa như con thuyền bơi ngược dòng nước xiết. Có những nỗi niềm về tài chính, công danh hoặc một mối quan hệ dù không nói ra thành lời nhưng luôn đè nặng trong tâm tư mỗi đêm về. Sự bất an lớn nhất không phải là thiếu năng lực, mà là cảm giác cô đơn không tìm được người thấu hiểu và sẻ chia trọn vẹn.";
    underlyingFearOrDesire =
      "Nỗi sợ tiềm thức: Sợ mọi nỗ lực của mình tan biến thành mây khói, sợ bị người thân phụ bạc hoặc đối tác phụ lòng. Khát khao thẳm sâu: Tìm được một điểm tựa vững chãi để an tâm buông bỏ gánh nặng.";
    innerStateTag = "Chênh Vênh & Cần Điểm Tựa";
  } else if (
    chanhName.includes("Kiền") ||
    chanhName.includes("Thái") ||
    chanhName.includes("Đại Hữu") ||
    chanhName.includes("Đỉnh")
  ) {
    soulResonance =
      "Tâm cảnh của bạn đang ôm ấp những hoài bão lớn lao, khao khát bứt phá khỏi giới hạn cũ để khẳng định vị thế. Tuy nhiên, ngọn lửa nhiệt huyết quá lớn đôi khi khiến bạn cảm thấy sốt ruột trước tiến độ thực tế, dễ sinh tâm lý nôn nóng hoặc tự tạo áp lực vô hình cho chính mình và người xung quanh.";
    underlyingFearOrDesire =
      "Nỗi sợ tiềm thức: Sợ bị bỏ lại phía sau hoặc đánh mất cơ hội ngàn vàng. Khát khao thẳm sâu: Được công nhận thành tựu và kiến tạo sự nghiệp rạng rỡ, làm rạng danh gia đạo.";
    innerStateTag = "Nung Nấu Hoài Bão & Sốt Ruột";
  } else {
    soulResonance =
      `Bạn đang đứng trước ngã rẽ quan trọng của cuộc đời, nơi lý trí và cảm xúc đang giằng co quyết liệt. Những biến cố gần đây khiến bạn nhận ra nhiều việc không diễn ra như dự tính ban đầu. Tâm bạn đang tìm kiếm một câu trả lời dứt khoát: Nên dũng cảm tiến bước hay lùi lại một bước để bảo toàn nội lực?`;
    underlyingFearOrDesire =
      "Nỗi sợ tiềm thức: Sợ đưa ra quyết định sai lầm làm lỡ dở thời cơ. Khát khao thẳm sâu: Sự bình an nội tại và một định hướng sáng suốt không mập mờ.";
    innerStateTag = "Đứng Trước Ngã Rẽ";
  }

  // 2. Phân tích Tầng 2: Vận Trình & Mốc Thời Gian (Timeline & Foresight)
  let cosmicTrend = "";
  let ungKyTimeline = "";
  let benefactorQuyNhan = "";
  let pitfallsCanPhong = "";
  let actionStrategy: SoulfulReadingData["tier2_ThoiVan"]["actionStrategy"] = "GIỮ VỮNG CHÍNH ĐẠO";

  if (chanhName.includes("Thái") || chanhName.includes("Đại Hữu") || chanhName.includes("Đồng Nhân")) {
    cosmicTrend =
      "Đại Cát Hanh Thông. Khí âm tiêu tán, khí dương hanh thông, thiên thời địa lợi nhân hòa đang từng bước hội tụ. Sự việc ban đầu có chút trúc trắc nhưng hậu vận tất thành tựu viên mãn.";
    ungKyTimeline =
      "Ứng kỳ chuyển vận rõ nét nhất rơi vào các tháng Tứ Quý (Tháng 3, 6, 9, 12 Âm lịch) hoặc vào các ngày thuộc hành Thổ và Hỏa. Trong vòng 21 đến 49 ngày tới sẽ có tin mừng quyết định.";
    benefactorQuyNhan =
      "Quý nhân phương Nam và Tây Bắc; là người có tính cách khảng khái, cương trực, lớn tuổi hơn bạn hoặc giữ vị thế lãnh đạo, mang ngũ hành tương sinh (Hỏa hoặc Kim).";
    pitfallsCanPhong =
      "Tránh tâm lý kiêu ngạo tự mãn, đề phòng những lời nịnh bợ êm tai từ kẻ tiểu nhân tiếp cận vì mục đích tư lợi.";
    actionStrategy = "TIẾN THỦ ĐẮC LỢI";
  } else if (chanhName.includes("Bĩ") || chanhName.includes("Khốn") || chanhName.includes("Tụng")) {
    cosmicTrend =
      "Cần Thận Trọng & Ẩn Nhẫn. Vận trình đang vào độ bế tắc tạm thời, âm dương cách trở. Đây là lúc trời đất muốn bạn rèn giũa tâm tính chứ không phải lúc mạo hiểm bung sức.";
    ungKyTimeline =
      "Giai đoạn thử thách kéo dài trong khoảng 1 đến 3 tháng tới. Bước ngoặt giải phóng vận hạn sẽ xuất hiện sau tiết chuyển giao mùa (hoặc vào tháng Hợi/Tý khi Thủy khí hồi phục).";
    benefactorQuyNhan =
      "Quý nhân phương Chính Tây hoặc Đông Bắc; là người khiêm tốn, ít nói nhưng có kinh nghiệm chuyên môn dày dặn, có thể là bạn cũ hoặc người quen trong dòng tộc.";
    pitfallsCanPhong =
      "Tuyệt đối tránh tranh chấp kiện tụng, tránh đứng tên bảo lãnh nợ nần hoặc vội vàng rót tiền vào các dự án rủi ro chưa rõ pháp lý.";
    actionStrategy = "ẨN NHẪN TÍCH LŨY";
  } else {
    cosmicTrend =
      `Thời vận đang trong quá trình chuyển hóa từ Quẻ Chánh ${chanhName} sang Quẻ Biến ${effectiveBienName}. Mọi sự hanh thông hay tắc nghẽn đều phụ thuộc vào cách bạn đối nhân xử thế.`;
    ungKyTimeline =
      "Ứng kỳ sẽ lộ diện trong vòng 14 đến 28 ngày tới; quan sát kỹ những biến chuyển vào các ngày đầu tháng hoặc giữa tháng trăng rằm.";
    benefactorQuyNhan =
      "Quý nhân phương Đông Nam; là người ôn hòa, khéo léo trong giao tế, mang năng lượng Mộc thanh khiết giúp hòa giải xung đột.";
    pitfallsCanPhong =
      "Tránh khẩu thiệt thị phi nơi làm việc; cẩn trọng trong phát ngôn qua tin nhắn mạng xã hội để tránh bị cắt xén làm sai lệch ý.";
    actionStrategy = "TỪ TỪ CHUYỂN DỊCH";
  }

  // 3. Phân tích Tầng 3: Hành Đạo & Hóa Giải
  const karmicRemedy = recommendNguBachDanh({
    divination: {
      chanhName,
      bienName: effectiveBienName,
      movingLine: movingLines[0] || 1,
      question,
    },
  });

  const daoistWisdom =
    `Đại Tượng Truyện dạy: "Quân tử dĩ lập tâm vô thượng, tích thiện cải mệnh". Liễu Phàm Tứ Huấn dạy: Vận mệnh tuy do trời định, nhưng phước đức hoàn toàn do tâm người gieo tạo. Hãy giữ tâm sáng như gương soi, việc đến thì ứng, việc qua thì buông.`;

  const meditationGuidance =
    "Mỗi sớm mai thức dậy (khung giờ 05:30 - 06:30), dành 15 phút ngồi tĩnh tọa, hít thở sâu theo nhịp 4-4-4, quán tưởng ánh sáng vàng kim thanh tịnh bao bọc thân tâm, buông bỏ mọi oán hận quá khứ.";

  const auspiciousDirections = ["Đông Nam (Sinh Khí)", "Tây Bắc (Thiên Y)", "Chính Nam (Diên Niên)"];
  const auspiciousColors = ["Vàng Kim Hoàng Gia", "Lam Ngọc Thần Khí", "Trắng Tinh Khiết"];

  // 4. Thơ tứ tuyệt tiên tri
  const poemVerse = [
    `Khởi sắc huyền cơ quẻ ${chanhName},`,
    `Tâm định trí minh dạ chẳng phiền.`,
    `Thuận theo dịch lý gieo duyên thiện,`,
    `Vận chuyển thời thông phúc lộc liền.`,
  ];

  return {
    chanhName,
    hoName: effectiveHoName,
    bienName: effectiveBienName,
    movingLines,
    gender,
    question,
    tier1_TamCanh: {
      title: "THỰC TRẠNG TÂM CẢNH (WHAT YOU FEEL)",
      soulResonance,
      underlyingFearOrDesire,
      innerStateTag,
    },
    tier2_ThoiVan: {
      title: "THỜI VẬN & DỰ BÁO (WHAT WILL HAPPEN)",
      cosmicTrend,
      ungKyTimeline,
      benefactorQuyNhan,
      pitfallsCanPhong,
      actionStrategy,
    },
    tier3_HanhDao: {
      title: "CHỈ DẪN HÀNH ĐẠO & PHÁP BẢO AN TÂM (ACTIONABLE REMEDY)",
      daoistWisdom,
      meditationGuidance,
      auspiciousDirections,
      auspiciousColors,
      karmicRemedy,
    },
    poemVerse,
  };
}

interface SoulfulThreeTierReadingProps {
  readingData: SoulfulReadingData;
  onOpenChantingModal: () => void;
  onOpenViralCardModal: () => void;
}

export default function SoulfulThreeTierReading({
  readingData,
  onOpenChantingModal,
  onOpenViralCardModal,
}: SoulfulThreeTierReadingProps) {
  const { tier1_TamCanh, tier2_ThoiVan, tier3_HanhDao, chanhName, hoName, bienName } =
    readingData;

  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState<boolean>(false);
  const [fontSizeScale, setFontSizeScale] = React.useState<"normal" | "large" | "extra">("normal");

  const lieuPhamRemedy = getLieuPhamRemedy(
    `${chanhName} ${tier2_ThoiVan.pitfallsCanPhong} ${tier1_TamCanh.soulResonance}`
  );

  const bodyTextSize =
    fontSizeScale === "extra"
      ? "text-base sm:text-lg"
      : fontSizeScale === "large"
      ? "text-sm sm:text-base"
      : "text-xs sm:text-sm";

  const quoteTextSize =
    fontSizeScale === "extra"
      ? "text-lg sm:text-xl"
      : fontSizeScale === "large"
      ? "text-base sm:text-lg"
      : "text-sm sm:text-base";

  return (
    <div className="w-full space-y-6">
      {/* BANNER THÔNG BÁO TỰ ĐỘNG: VIDEO 4K ĐÃ SẴN SÀNG SAU PHIÊN BÓI */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-950/70 via-amber-950/60 to-black/80 border-2 border-rose-500/50 shadow-[0_0_35px_rgba(244,63,94,0.3)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-slate-950 shadow-md">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300 font-bold bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                TỰ ĐỘNG TẠO VIDEO TOÀN TRÌNH
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h4 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5">
              Video 4K Toàn Trình Của Thầy Sinh Đã Sẵn Sàng Để Đăng!
            </h4>
            <p className="text-xs text-slate-300">
              Gồm 5 cảnh: Dãy số dâng lên ➔ Nhập định Bát Quái ➔ Quẻ {chanhName} ➔ 3 Lời răn Liễu Phàm ➔ Triện son chúc phúc
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            zenAudio.playCrystalChime(960, 0.1);
            setIsVideoModalOpen(true);
          }}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Mở & Tải Video Ngay</span>
        </button>
      </motion.div>

      {/* THANH CTA NỔI BẬT: XUẤT THIỆP 4K & ĐIỀU CHỈNH CỠ CHỮ CAO NIÊN */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#17223b] via-[#0b1426] to-[#040813] border-2 border-[#d4af37]/50 shadow-[0_10px_35px_rgba(212,175,55,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40 font-bold">
              BỘ LUẬN QUẺ 3 TẦNG • TIÊN ÔNG THẦY SINH KHẨU TRUYỀN
            </span>
            <span className="text-xs font-mono text-[#38bdf8]">
              {chanhName} → {bienName}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            Lời Khai Thị Của Tiên Ông Thầy Sinh
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Kết hợp Dịch học nguyên bản Nguyễn K, Kinh Dịch 64 Quẻ và Pháp môn Ngũ Bách Danh
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Bộ điều khiển Cỡ Chữ Dành Cho Người Cao Niên */}
          <div className="flex items-center gap-1 bg-black/50 border border-white/15 p-1 rounded-2xl shadow-inner">
            <span className="text-[10px] font-mono text-slate-400 px-2 hidden sm:inline">Cỡ Chữ:</span>
            <button
              onClick={() => {
                zenAudio.playSoftTap(450, 0.04);
                setFontSizeScale("normal");
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-serif font-bold transition-all ${
                fontSizeScale === "normal"
                  ? "bg-white/20 text-white border border-white/30"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Cỡ chữ tiêu chuẩn"
            >
              A-
            </button>
            <button
              onClick={() => {
                zenAudio.playSoftTap(550, 0.04);
                setFontSizeScale("large");
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-serif font-bold transition-all ${
                fontSizeScale === "large"
                  ? "bg-[#d4af37] text-slate-950 font-black shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Cỡ chữ lớn"
            >
              A
            </button>
            <button
              onClick={() => {
                zenAudio.playSoftTap(650, 0.04);
                setFontSizeScale("extra");
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-serif font-bold transition-all ${
                fontSizeScale === "extra"
                  ? "bg-[#38bdf8] text-slate-950 font-black shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Cỡ chữ cực lớn (Người cao niên dễ đọc)"
            >
              A+
            </button>
          </div>

          <button
            onClick={() => {
              zenAudio.playCrystalChime(960, 0.1);
              setIsVideoModalOpen(true);
            }}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-500 text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Video className="w-4 h-4 text-slate-950" />
            <span>Xuất Video 4K</span>
          </button>

          <button
            onClick={() => {
              zenAudio.playCrystalClick(1400, 0.08);
              onOpenViralCardModal();
            }}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b38f28] text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Share2 className="w-4 h-4" />
            <span>Xuất Thiệp 4K</span>
          </button>
        </div>
      </div>

      {/* TRÌNH PHÁT PHÁP ÂM TỰ TẠI CỦA TIÊN ÔNG THẦY SINH */}
      <SacredVoicePlayer
        title={`Tiên Ông Thầy Sinh Khẩu Truyền Quẻ ${chanhName}`}
        textToRead={generateThaySinhSpeech({
          methodName: "tâm niệm và duyên lành",
          inputIdentifier: chanhName,
          hexagramName: `${chanhName} biến sang ${bienName}`,
          movingLine: readingData.movingLines[0] || 1,
          painPoint: `${tier1_TamCanh.soulResonance} ${tier1_TamCanh.underlyingFearOrDesire}`,
          stopDoing: `Con nên dừng lại ngay: ${tier2_ThoiVan.pitfallsCanPhong}`,
          startDoing: `Con nên nắm bắt thực thi: Chiến lược ${tier2_ThoiVan.actionStrategy}. ${tier2_ThoiVan.cosmicTrend} Điềm cát ứng kỳ: ${tier2_ThoiVan.ungKyTimeline}.`,
          remedyBuddha: tier3_HanhDao.karmicRemedy?.remedies?.[0]?.name || tier3_HanhDao.karmicRemedy?.chantingVerse || "Nam Mô Đại Bi Quán Thế Âm Bồ Tát Cứu Khổ Cứu Nạn",
          lieuPhamLesson: `Bài học Liễu Phàm Tứ Huấn: ${lieuPhamRemedy.lesson.vietnameseTitle}. ${lieuPhamRemedy.lesson.corePhilosophy}`,
          lieuPhamAction: lieuPhamRemedy.advice,
        })}
      />

      {/* ========================================================================= */}
      {/* THẺ TÓM TẮT HÀNH ĐỘNG NHANH 3 BƯỚC (QUICK 3-STEP ACTION SUMMARY CARD)    */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#211704] via-[#141005] to-[#0a0701] border-2 border-[#fcd34d] shadow-[0_0_35px_rgba(252,211,77,0.25)] relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#fcd34d]/30 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#fcd34d]/20 border border-[#fcd34d]/50 flex items-center justify-center text-[#fcd34d] font-bold text-lg shadow-[0_0_15px_rgba(252,211,77,0.4)]">
              ⚡
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#fcd34d] font-black">
                KHAI MỞ VẬN TRÌNH TRONG 10 GIÂY
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                Hành Động Nhanh 3 Bước Của Bạn
              </h4>
            </div>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#fcd34d]/15 text-[#fef08a] border border-[#fcd34d]/40">
            Chiến Lược: {tier2_ThoiVan.actionStrategy}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BƯỚC 1: TÂM THẾ */}
          <div className="p-4 rounded-2xl bg-black/50 border border-[#38bdf8]/35 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center gap-2 text-[#38bdf8] font-bold text-xs uppercase font-mono mb-1">
                <span className="w-5 h-5 rounded-full bg-[#38bdf8]/20 flex items-center justify-center text-[11px]">1</span>
                <span>Tâm Thế (Định Tâm)</span>
              </div>
              <h5 className="font-serif font-bold text-white text-sm mb-1.5">
                {tier1_TamCanh.innerStateTag}
              </h5>
              <p className={`text-slate-300 leading-relaxed ${bodyTextSize}`}>
                {tier1_TamCanh.underlyingFearOrDesire.slice(0, 140)}...
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-[#38bdf8]">
              ✦ Giữ tâm bình thản như gương soi
            </div>
          </div>

          {/* BƯỚC 2: HÀNH ĐỘNG THỰC TẾ */}
          <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/35 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono mb-1">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[11px]">2</span>
                <span>Hành Động Thực Tế (Thuận Thời)</span>
              </div>
              <h5 className="font-serif font-bold text-white text-sm mb-1.5">
                {tier2_ThoiVan.actionStrategy}
              </h5>
              <p className={`text-slate-300 leading-relaxed ${bodyTextSize}`}>
                {tier2_ThoiVan.cosmicTrend.slice(0, 110)}... <strong>Tránh:</strong> {tier2_ThoiVan.pitfallsCanPhong.slice(0, 70)}...
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-emerald-300">
              ✦ Ứng kỳ: {tier2_ThoiVan.ungKyTimeline.slice(0, 35)}
            </div>
          </div>

          {/* BƯỚC 3: PHÁP BẢO HỘ NIỆM */}
          <div className="p-4 rounded-2xl bg-black/50 border border-[#fcd34d]/35 flex flex-col justify-between space-y-2">
            <div>
              <div className="flex items-center gap-2 text-[#fcd34d] font-bold text-xs uppercase font-mono mb-1">
                <span className="w-5 h-5 rounded-full bg-[#fcd34d]/20 flex items-center justify-center text-[11px]">3</span>
                <span>Pháp Bảo Hộ Niệm (Hóa Giải)</span>
              </div>
              <h5 className="font-serif font-bold text-white text-sm mb-1.5 line-clamp-1">
                {tier3_HanhDao.karmicRemedy.remedies[0]?.name || "Nam Mô Đại Bi Quán Thế Âm"}
              </h5>
              <p className={`text-slate-300 leading-relaxed ${bodyTextSize}`}>
                Trì niệm danh hiệu Bồ Tát hoặc thực hành Liễu Phàm: <em>{lieuPhamRemedy.lesson.vietnameseTitle}</em>.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => {
                  zenAudio.playCrystalChime(792, 0.1);
                  onOpenChantingModal();
                }}
                className="text-xs font-serif font-bold text-[#fcd34d] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Mở Lần Chuỗi 108 Hạt</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* TẦNG 1: THỰC TRẠNG TÂM CẢNH (WHAT YOU FEEL)                              */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 sm:p-8 rounded-3xl bg-[#070e1f]/95 border border-[#38bdf8]/40 shadow-xl backdrop-blur-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#38bdf8]/20 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
              <Heart className="w-5 h-5 fill-[#38bdf8]/30" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#38bdf8] font-bold">
                TẦNG 1 • THẤU CẢM & CHỮA LÀNH
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {tier1_TamCanh.title}
              </h4>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-serif font-bold bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
            {tier1_TamCanh.innerStateTag}
          </span>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-slate-200 leading-relaxed font-serif italic ${quoteTextSize}`}>
            &ldquo;{tier1_TamCanh.soulResonance}&rdquo;
          </div>

          <div className={`p-4 rounded-2xl bg-[#38bdf8]/5 border border-[#38bdf8]/20 text-slate-300 ${bodyTextSize}`}>
            <strong className="text-[#38bdf8] block mb-1">Soi chiếu gốc rễ tiềm thức:</strong>
            {tier1_TamCanh.underlyingFearOrDesire}
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* TẦNG 2: THỜI VẬN & DỰ BÁO (WHAT WILL HAPPEN)                             */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 sm:p-8 rounded-3xl bg-[#070e1f]/95 border border-[#d4af37]/40 shadow-xl backdrop-blur-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#fef08a] font-bold">
                TẦNG 2 • TIÊN TRI & MINH TRIẾT
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {tier2_ThoiVan.title}
              </h4>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40">
            {tier2_ThoiVan.actionStrategy}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Xu thế trời đất */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <span className="text-[#fef08a] font-bold flex items-center gap-1.5 text-xs">
              <Sun className="w-4 h-4 text-[#fef08a]" />
              Xu thế vận hành trời đất:
            </span>
            <p className={`text-slate-300 leading-relaxed ${bodyTextSize}`}>{tier2_ThoiVan.cosmicTrend}</p>
          </div>

          {/* Ứng kỳ Timeline */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <span className="text-sky-300 font-bold flex items-center gap-1.5 text-xs">
              <Clock className="w-4 h-4 text-sky-300" />
              Mốc thời gian chuyển biến (Ứng Kỳ):
            </span>
            <p className={`text-slate-300 leading-relaxed ${bodyTextSize}`}>{tier2_ThoiVan.ungKyTimeline}</p>
          </div>

          {/* Quý nhân phù trợ */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <span className="text-emerald-300 font-bold flex items-center gap-1.5 text-xs">
              <UserCheck className="w-4 h-4 text-emerald-300" />
              Quý nhân phù trợ & Phương vị:
            </span>
            <p className={`text-slate-300 leading-relaxed ${bodyTextSize}`}>{tier2_ThoiVan.benefactorQuyNhan}</p>
          </div>

          {/* Cạm bẫy cần phòng */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
            <span className="text-rose-400 font-bold flex items-center gap-1.5 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Điểm cần tuyệt đối phòng tránh:
            </span>
            <p className={`text-rose-200/90 leading-relaxed ${bodyTextSize}`}>{tier2_ThoiVan.pitfallsCanPhong}</p>
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* TẦNG 3: CHỈ DẪN HÀNH ĐẠO & PHÁP BẢO AN TÂM (ACTIONABLE REMEDY)            */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#120f06] via-[#090b16] to-[#04060d] border-2 border-amber-500/40 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-amber-500/20 mb-5 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                TẦNG 3 • CẢI MỆNH & PHÁP BẢO
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {tier3_HanhDao.title}
              </h4>
            </div>
          </div>

          {/* Nút 1-click mở Modal Trì Niệm Lần Chuỗi 108 Hạt */}
          <button
            onClick={() => {
              zenAudio.playCrystalChime(792, 0.1);
              onOpenChantingModal();
            }}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mở Chuỗi Tràng 108 Hạt Niệm Danh Hiệu</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Pháp Môn Cải Mệnh: Liễu Phàm Tứ Huấn */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-black/40 to-amber-950/30 border border-emerald-500/35 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                PHÁP MÔN CẢI MẠNG LIỄU PHÀM TỨ HUẤN: {lieuPhamRemedy.lesson.vietnameseTitle}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Đức Năng Thắng Số
              </span>
            </div>
            <p className={`text-emerald-100/90 leading-relaxed font-serif ${bodyTextSize}`}>
              &ldquo;{lieuPhamRemedy.advice}&rdquo;
            </p>
            <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-slate-300">Việc thiện khuyên con thực hành ngay:</span>
              {lieuPhamRemedy.recommendedActions.map((act) => (
                <span
                  key={act.id}
                  className="px-2.5 py-1 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-[11px] font-serif text-emerald-200"
                >
                  ✦ {act.title} (+{act.meritPoints} điểm công đức)
                </span>
              ))}
            </div>
          </div>

          {/* Lời răn quân tử Đại Tượng Truyện & Liễu Phàm */}
          <div className={`p-4 rounded-2xl bg-black/40 border border-amber-500/20 text-amber-100/90 leading-relaxed font-serif ${bodyTextSize}`}>
            <strong className="text-amber-300 block mb-1">Lời răn dạy cổ đức:</strong>
            &ldquo;{tier3_HanhDao.daoistWisdom}&rdquo;
          </div>

          {/* Pháp bảo Kinh Ngũ Bách Danh */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                HỒNG DANH BỒ TÁT HỘ NIỆM TƯƠNG ỨNG:
              </span>
              <h5 className="text-lg font-serif font-bold text-white">
                {tier3_HanhDao.karmicRemedy.remedies[0]?.name ||
                  "Nam Mô Đại Bi Quán Thế Âm Bồ Tát"}
              </h5>
              <p className="text-xs text-slate-300 italic">
                Chí thành xướng niệm {tier3_HanhDao.karmicRemedy.recommendedRepetitions} biến mỗi ngày để hóa giải chướng ngại và an định tâm thức.
              </p>
            </div>

            <button
              onClick={onOpenChantingModal}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-serif font-semibold border border-amber-500/30 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Feather className="w-3.5 h-3.5 text-amber-300" />
              <span>Bắt Đầu Lần Chuỗi</span>
            </button>
          </div>

          {/* Phương vị & Màu sắc hộ mệnh */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <span className="text-slate-400">Phương Hướng Xuất Hành Đại Cát:</span>
              <span className="text-[#34d399] font-bold">
                {tier3_HanhDao.auspiciousDirections.join(" • ")}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <span className="text-slate-400">Màu Sắc Hộ Mệnh Hôm Nay:</span>
              <span className="text-[#fef08a] font-bold">
                {tier3_HanhDao.auspiciousColors.join(" • ")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* MODAL KẾT XUẤT VIDEO VIRAL 4K TIÊN ÔNG THẦY SINH */}
      <ThaySinhVideoExporterModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        options={{
          chanhName,
          bienName,
          movingLine: readingData.movingLines[0] || 1,
          inputIdentifier: readingData.question || "Bản Quái Linh Ứng",
          stopDoing: tier2_ThoiVan.pitfallsCanPhong,
          startDoing: `${tier2_ThoiVan.actionStrategy}. ${tier2_ThoiVan.cosmicTrend}`,
          remedyBuddha: tier3_HanhDao.karmicRemedy?.remedies?.[0]?.name || tier3_HanhDao.karmicRemedy?.chantingVerse || "Nam Mô Đại Bi Quán Thế Âm Bồ Tát Cứu Khổ Cứu Nạn",
          lieuPhamLesson: lieuPhamRemedy.advice,
        }}
      />
    </div>
  );
}
