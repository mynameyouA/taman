"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  MessageSquareQuote,
  HelpCircle,
  ScrollText,
  Heart,
  Briefcase,
  Activity,
  Award,
  Download,
  Share2,
  Calendar,
  User,
  ShieldCheck,
  Flame,
  CheckCircle2,
} from "lucide-react";
import TarotScene from "@/components/3d/TarotScene";
import ClientNavbar from "@/components/ui/ClientNavbar";
import ClientFooter from "@/components/ui/ClientFooter";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";
import PageTransition from "@/components/ui/PageTransition";
import { zenAudio } from "@/utils/zenAudio";
import { recordBrainEvent } from "@/utils/unifiedBrain";
import {
  drawTarotSpread,
  SpreadType,
  SPREAD_CONFIGS,
  TarotSpreadReadingResult,
  calculateCanChi,
} from "@/utils/tarotEngine";
import { addMeritPoints } from "@/utils/meritSystem";
import SacredVoicePlayer from "@/components/audio/SacredVoicePlayer";

const SUGGESTED_INTENTIONS = [
  "💼 Tôi nên định hướng sự nghiệp và tài lộc thế nào trong giai đoạn tới?",
  "💖 Mối quan hệ và tình duyên của tôi cần được chữa lành và đón nhận điều gì?",
  "🧘 Làm thế nào để hóa giải nỗi bất an và tìm lại sự an định nội tâm?",
  "🌱 Có cơ duyên hay bước ngoặt mới nào đang đón đợi tôi phía trước?",
  "⚖️ Đứng trước ngã rẽ cuộc đời, đâu là sự lựa chọn phù hợp nhất với tôi?",
];

const ZODIAC_SIGNS = [
  "Bạch Dương (Aries)",
  "Kim Ngưu (Taurus)",
  "Song Tử (Gemini)",
  "Cự Giải (Cancer)",
  "Sư Tử (Leo)",
  "Xử Nữ (Virgo)",
  "Thiên Bình (Libra)",
  "Bọ Cạp (Scorpio)",
  "Nhân Mã (Sagittarius)",
  "Ma Kết (Capricorn)",
  "Bảo Bình (Aquarius)",
  "Song Ngư (Pisces)",
];

export default function TarotPage() {
  // Spread selection
  const [spreadType, setSpreadType] = useState<SpreadType>("three_time");

  // User input profile
  const [userName, setUserName] = useState("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [userZodiac, setUserZodiac] = useState<string>("");
  const [userQuestion, setUserQuestion] = useState("");

  // Reading states
  const [readingResult, setReadingResult] = useState<TarotSpreadReadingResult | null>(null);
  const [isDrawn, setIsDrawn] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active aspect tab for details
  const [activeAspect, setActiveAspect] = useState<"general" | "career" | "love" | "health" | "dharma">("general");

  // Typography scaling for elder accessibility
  const [fontSizeScale, setFontSizeScale] = useState<"normal" | "large" | "extra">("normal");
  const bodyTextSize =
    fontSizeScale === "extra"
      ? "text-base sm:text-lg"
      : fontSizeScale === "large"
      ? "text-sm sm:text-base"
      : "text-xs sm:text-sm";

  // Card export state
  const [isExporting, setIsExporting] = useState(false);

  const handleSelectIntention = (intention: string) => {
    zenAudio.playCrystalChime(852, 0.05);
    setUserQuestion(intention);
  };

  const handleDraw = () => {
    const finalQuestion = userQuestion.trim() || "Khai mở tuệ giác và bình an cho chặng đường phía trước";
    const yearNum = birthYear ? parseInt(birthYear, 10) : undefined;
    const canChi = yearNum && !isNaN(yearNum) ? calculateCanChi(yearNum) : undefined;

    // Draw spread with cryptographic random engine
    const result = drawTarotSpread(spreadType, finalQuestion, {
      name: userName.trim() || undefined,
      birthYear: yearNum && !isNaN(yearNum) ? yearNum : undefined,
      canChi,
      zodiac: userZodiac || undefined,
    });

    setReadingResult(result);
    setIsDrawing(true);
    setIsDrawn(true);
    zenAudio.playHarmonicChord();

    // Allow time for 3D cards flip and stardust burst
    setTimeout(() => {
      setIsDrawing(false);
      // Select central card by default
      const defaultIdx = Math.floor(result.drawnCards.length / 2);
      setSelectedCardIndex(defaultIdx);

      // Tích lũy công đức chiêm nghiệm Tarot
      addMeritPoints("DIVINATION", `Chiêm bốc trải bài Tarot ${result.spreadTitle}`, 30, { isDivination: true });

      // Đồng bộ vào Bộ Não Tâm An duy nhất (Unified Brain)
      try {
        recordBrainEvent({
          type: "TAROT",
          data: {
            question: finalQuestion,
            cards: result.drawnCards.map((c) => ({
              name: `${c.card.nameVi} (${c.isReversed ? "Ngược" : "Xuôi"})`,
              roman: c.card.roman || String(c.card.number),
              title: `${c.position.label}: ${c.card.nameEn}`,
              keywords: c.keywords,
              guidance: c.meaning,
            })),
            synthesis: result.overallSynthesis,
          },
        });
      } catch (err) {
        console.error("Lỗi đồng bộ Tarot vào Bộ Não Tâm An:", err);
      }
    }, 2200);
  };

  const handleReset = () => {
    zenAudio.playSoftTap(500, 0.05);
    setIsDrawn(false);
    setSelectedCardIndex(null);
    setReadingResult(null);
  };

  // Export 4K Fortune Card
  const handleExportFortuneCard = () => {
    if (!readingResult) return;
    setIsExporting(true);
    zenAudio.playCrystalChime(960, 0.08);

    try {
      const cvs = document.createElement("canvas");
      cvs.width = 2160;
      cvs.height = 3840;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;

      // Dark Cosmic Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 2160, 3840);
      bgGrad.addColorStop(0, "#060913");
      bgGrad.addColorStop(0.3, "#0e172b");
      bgGrad.addColorStop(0.7, "#141f36");
      bgGrad.addColorStop(1, "#05070e");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 2160, 3840);

      // Gold Borders
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 18;
      ctx.strokeRect(60, 60, 2040, 3720);

      ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
      ctx.lineWidth = 6;
      ctx.strokeRect(96, 96, 1968, 3648);

      // Header Banner
      ctx.fillStyle = "#d4af37";
      ctx.font = "bold 64px serif";
      ctx.textAlign = "center";
      ctx.fillText("✦ TÂM AN AI • THIỆP TAROT MAY MẮN 4K ✦", 1080, 260);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "500 48px sans-serif";
      ctx.fillText(`PHƯƠNG PHÁP: ${readingResult.spreadTitle.toUpperCase()}`, 1080, 350);

      // User Profile Info
      const profileStr = [
        readingResult.userProfile?.name ? `Chủ mệnh: ${readingResult.userProfile.name}` : null,
        readingResult.userProfile?.canChi ? `Tuổi: ${readingResult.userProfile.canChi}` : null,
        readingResult.userProfile?.zodiac ? `Cung: ${readingResult.userProfile.zodiac}` : null,
      ]
        .filter(Boolean)
        .join("  •  ");

      if (profileStr) {
        ctx.fillStyle = "#94a3b8";
        ctx.font = "italic 40px serif";
        ctx.fillText(profileStr, 1080, 440);
      }

      // Question
      ctx.fillStyle = "#fef08a";
      ctx.font = "italic bold 52px serif";
      ctx.fillText(`"${readingResult.userQuestion}"`, 1080, 560);

      // Draw Summary of Drawn Cards
      let startY = 720;
      const cardBoxHeight = 440;

      readingResult.drawnCards.forEach((c, idx) => {
        const boxY = startY + idx * (cardBoxHeight + 50);

        // Box container
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.fillRect(180, boxY, 1800, cardBoxHeight);
        ctx.strokeStyle = c.isReversed ? "rgba(239, 68, 68, 0.6)" : "rgba(212, 175, 55, 0.6)";
        ctx.lineWidth = 4;
        ctx.strokeRect(180, boxY, 1800, cardBoxHeight);

        // Card Icon
        ctx.font = "110px 'Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', 'Twemoji Mozilla', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(c.card.icon, 320, boxY + 220);

        // Card Position & Name
        ctx.textAlign = "left";
        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 44px sans-serif";
        ctx.fillText(`[${c.position.label.toUpperCase()}]`, 440, boxY + 90);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 60px serif";
        const orientText = c.isReversed ? "(Ngược ↻)" : "(Xuôi ✦)";
        ctx.fillText(`${c.card.nameVi} ${orientText}`, 440, boxY + 165);

        ctx.fillStyle = "#d4af37";
        ctx.font = "italic 38px serif";
        ctx.fillText(`${c.card.nameEn} • Nguyên tố: ${c.card.element}`, 440, boxY + 225);

        // Key insight snippet
        ctx.fillStyle = "#cbd5e1";
        ctx.font = "38px sans-serif";
        const snippet = c.meaning.length > 80 ? c.meaning.slice(0, 80) + "..." : c.meaning;
        ctx.fillText(snippet, 440, boxY + 310);

        // Dharma advice
        ctx.fillStyle = "#86efac";
        ctx.font = "italic 36px serif";
        const adviceSnippet = c.aspectAdvice.dharmaAdvice.slice(0, 85) + "...";
        ctx.fillText(`✦ Khai thị: ${adviceSnippet}`, 440, boxY + 380);
      });

      // Bottom Affirmation & Footer
      const bottomY = 3450;
      ctx.fillStyle = "#fef08a";
      ctx.font = "bold 48px serif";
      ctx.textAlign = "center";
      ctx.fillText(`✦ CÂU KHẲNG ĐỊNH TÂM THỨC (AFFIRMATION) ✦`, 1080, bottomY);

      ctx.fillStyle = "#ffffff";
      ctx.font = "italic 44px serif";
      ctx.fillText(`"${readingResult.luckyAffirmation}"`, 1080, bottomY + 80);

      ctx.fillStyle = "#64748b";
      ctx.font = "36px sans-serif";
      ctx.fillText(
        `Được khai mở bởi Tâm An AI • www.taman.vn • ${new Date().toLocaleDateString("vi-VN")}`,
        1080,
        bottomY + 180
      );

      // Trigger Download
      const dataUrl = cvs.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = `TamAnAI_Tarot_${Date.now()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setTimeout(() => setIsExporting(false), 800);
    } catch (err) {
      console.error("Lỗi xuất thiệp Tarot:", err);
      setIsExporting(false);
    }
  };

  const activeCardResult =
    readingResult && selectedCardIndex !== null && readingResult.drawnCards[selectedCardIndex]
      ? readingResult.drawnCards[selectedCardIndex]
      : null;

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-[#fef08a] flex flex-col justify-between">
      {/* Background Ambience & Sacred Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(6,9,19,0.5)_50%,_rgba(6,9,19,0.95)_100%)]" />
      <div className="pointer-events-none fixed top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#d4af37]/15 via-[#38bdf8]/10 to-transparent blur-3xl z-0" />

      {/* Unified Navigation Header */}
      <ClientNavbar />

      {/* Page Content Transition Container */}
      <PageTransition className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        {/* Title & Spiritual Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <ZenBadge
            variant="gold"
            label="Bách Khoa 78 Lá Rider-Waite-Smith • Cryptographic Random • 3D WebGL"
            size="sm"
            className="mb-3"
          />
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-3">
            Trải Bài <span className="font-display-gold">Tarot Huyền Bí</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hệ thống bói toán & chiêm bốc chuyên sâu với 78 lá bài Tarot chuẩn quốc tế, cơ chế xáo bài ngẫu nhiên bảo mật 100%,
            hỗ trợ 4 phương pháp trải bài, nạp dữ liệu bản mệnh và kết nối với Kinh Ngũ Bách Danh để hóa giải vận hạn.
          </p>

          {/* Quick Sub-Controls */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              onClick={() => {
                const nextVal = !soundEnabled;
                setSoundEnabled(nextVal);
                zenAudio.setMuted(!nextVal);
                if (nextVal) zenAudio.playCrystalChime(900, 0.05);
              }}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-mono flex items-center gap-2 active:scale-95 transition-all ${
                soundEnabled
                  ? "bg-[#d4af37]/15 border-[#d4af37]/50 text-[#fef08a]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Chuông Thiền 528Hz: Bật</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Âm Thanh: Tắt</span>
                </>
              )}
            </button>

            {/* Bộ điều khiển Cỡ Chữ Dành Cho Người Cao Niên */}
            <div className="flex items-center gap-1 bg-black/50 border border-white/15 p-1 rounded-full shadow-inner">
              <span className="text-[10px] font-mono text-slate-400 px-1.5 hidden sm:inline">Chữ:</span>
              <button
                onClick={() => {
                  zenAudio.playSoftTap(450, 0.04);
                  setFontSizeScale("normal");
                }}
                className={`px-2 py-0.5 rounded-full text-[11px] font-serif font-bold transition-all ${
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
                className={`px-2 py-0.5 rounded-full text-[11px] font-serif font-bold transition-all ${
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
                className={`px-2 py-0.5 rounded-full text-[11px] font-serif font-bold transition-all ${
                  fontSizeScale === "extra"
                    ? "bg-[#38bdf8] text-slate-950 font-black shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Cỡ chữ cực lớn"
              >
                A+
              </button>
            </div>

            {isDrawn && (
              <>
                <ZenButton
                  onClick={handleReset}
                  variant="glass"
                  size="sm"
                  borderBeam={false}
                  icon={RotateCcw}
                  iconPosition="left"
                >
                  Trải Quẻ Mới
                </ZenButton>

                <ZenButton
                  onClick={handleExportFortuneCard}
                  variant="gold"
                  size="sm"
                  borderBeam={true}
                  icon={Download}
                  iconPosition="left"
                >
                  {isExporting ? "Đang Xuất Thiệp..." : "Tải Thiệp May Mắn 4K"}
                </ZenButton>
              </>
            )}
          </div>
        </div>

        {/* BỘ CHỌN PHƯƠNG THỨC TRẢI BÀI & THÔNG TIN BẢN MỆNH (KHI CHƯA RÚT BÀI) */}
        {!isDrawn && (
          <div className="w-full max-w-4xl mb-6 space-y-4">
            {/* 1. Chọn Phương Pháp Trải Bài */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 md:p-5 backdrop-blur-md">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>1. Chọn Phương Pháp Trải Bài Huyền Học:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(Object.keys(SPREAD_CONFIGS) as SpreadType[]).map((type) => {
                  const cfg = SPREAD_CONFIGS[type];
                  const isSelected = spreadType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        zenAudio.playSoftTap(650, 0.04);
                        setSpreadType(type);
                      }}
                      className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#d4af37]/20 border-[#d4af37] text-white shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/8 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-serif font-bold text-sm text-[#fef08a]">
                          {cfg.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-slate-300">
                          {cfg.cardCount} Lá
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {cfg.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Nhập Thông Tin Bản Mệnh & Tâm Nguyện */}
            <div className="bg-gradient-to-r from-slate-900/60 via-[#131c31]/60 to-slate-900/60 border border-[#d4af37]/30 rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#d4af37]" />
                <h3 className="font-serif text-sm sm:text-base font-semibold text-slate-200">
                  2. Thông Tin Bản Mệnh & Tâm Nguyện Gửi Vũ Trụ:
                </h3>
              </div>

              {/* Hàng Nhập Tên, Năm Sinh, Cung Hoàng Đạo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Họ Tên Của Bạn (Tùy Chọn):
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ví dụ: Tuệ An..."
                    className="w-full bg-black/40 border border-white/10 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1 flex items-center justify-between">
                    <span>Năm Sinh Dương Lịch:</span>
                    {birthYear && !isNaN(parseInt(birthYear, 10)) && (
                      <span className="text-[#fef08a] font-semibold">
                        {calculateCanChi(parseInt(birthYear, 10))}
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    placeholder="Ví dụ: 1995, 2000..."
                    className="w-full bg-black/40 border border-white/10 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Cung Hoàng Đạo (Tùy Chọn):
                  </label>
                  <select
                    value={userZodiac}
                    onChange={(e) => setUserZodiac(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/60 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 outline-none transition-all"
                  >
                    <option value="" className="bg-[#0b1122]">
                      -- Chọn Cung Hoàng Đạo --
                    </option>
                    {ZODIAC_SIGNS.map((z, idx) => (
                      <option key={idx} value={z} className="bg-[#0b1122]">
                        {z}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ô Nhập Tâm Nguyện / Câu Hỏi */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Tâm Nguyện Hoặc Câu Hỏi Cụ Thể (Vũ trụ sẽ giải đáp chuẩn xác):</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Ví dụ: Tôi nên định hướng thế nào cho sự nghiệp và các mối quan hệ sắp tới?..."
                    className="w-full bg-black/40 border border-[#d4af37]/30 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/60 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                  />
                  {userQuestion.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={() => setUserQuestion("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                {/* Gợi Ý Tâm Nguyện */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono text-slate-400">Gợi ý:</span>
                  {SUGGESTED_INTENTIONS.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectIntention(item)}
                      className="text-xs bg-white/5 hover:bg-[#d4af37]/20 border border-white/10 hover:border-[#d4af37]/40 text-slate-300 hover:text-[#fef08a] px-2.5 py-1 rounded-lg transition-all text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BANNER THÔNG TIN QUẺ KHI ĐÃ RÚT BÀI */}
        {isDrawn && readingResult && (
          <div className="w-full max-w-5xl mb-6 bg-gradient-to-r from-slate-900/80 via-[#131c31]/80 to-slate-900/80 border border-[#d4af37]/40 rounded-2xl p-5 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <div className="flex items-start gap-3">
              <MessageSquareQuote className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fef08a]">
                    {readingResult.spreadTitle}
                  </span>
                  {readingResult.userProfile?.name && (
                    <span className="text-xs font-mono text-slate-300">
                      Chủ mệnh: <strong className="text-white">{readingResult.userProfile.name}</strong>
                    </span>
                  )}
                  {readingResult.userProfile?.canChi && (
                    <span className="text-xs font-mono text-slate-300">
                      • Tuổi: <strong className="text-[#fef08a]">{readingResult.userProfile.canChi}</strong>
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-[#fef08a] font-serif italic">
                  &ldquo;{readingResult.userQuestion}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">ĐIỂM NĂNG LƯỢNG QUẺ</span>
                <span className="text-lg font-serif font-bold text-[#38bdf8]">
                  {readingResult.energyScore} / 100
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
                <Flame className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* 3D WEBGL CANVAS SCENE */}
        <div className="w-full max-w-5xl h-[460px] sm:h-[540px] md:h-[600px] relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0b1122]/60 to-[#060913]/90 shadow-[0_0_60px_rgba(0,0,0,0.8)] backdrop-blur-sm mb-8">
          <TarotScene
            isDrawn={isDrawn}
            cardsData={readingResult?.drawnCards}
            cardCount={SPREAD_CONFIGS[spreadType].cardCount}
            soundEnabled={soundEnabled}
            onCardSelect={(idx) => {
              if (isDrawn) {
                zenAudio.playCrystalChime(852, 0.06);
                setSelectedCardIndex(idx);
              }
            }}
          />

          {/* Canvas status overlay */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#d4af37] animate-ping" />
            <span className="text-[11px] font-mono text-[#8f9779] tracking-wider uppercase">
              {isDrawn
                ? "3D Realtime Cards Active • Nhấp Chọn Lá Bài Để Xem Chi Tiết"
                : `Sẵn Sàng Rút Quẻ (${SPREAD_CONFIGS[spreadType].cardCount} Lá Bài)`}
            </span>
          </div>

          {!isDrawn && (
            <div className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center pointer-events-auto">
              <ZenButton
                onClick={handleDraw}
                disabled={isDrawing}
                variant="gold"
                size="lg"
                borderBeam={true}
                magnetic={true}
                soundType="harmonic"
                icon={Sparkles}
                iconPosition="left"
                className="font-serif tracking-wider shadow-[0_0_40px_rgba(212,175,55,0.5)]"
              >
                {isDrawing ? "ĐANG XÁO BÀI & KẾT NỐI VŨ TRỤ..." : "XÁO BÀI & RÚT QUẺ VŨ TRỤ"}
              </ZenButton>
              <p className="mt-3 text-xs text-slate-400 font-mono tracking-widest text-center px-4">
                ✦ Thuật toán ngẫu nhiên bảo mật Fisher-Yates • 78 lá bài RWS chân thực ✦
              </p>
            </div>
          )}
        </div>

        {/* PHẦN KẾT QUẢ LUẬN GIẢI CHUYÊN SÂU ĐA TẦNG */}
        <AnimatePresence>
          {isDrawn && readingResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-5xl flex flex-col gap-8"
            >
              {/* Danh sách tab chọn lá bài đã rút - Cân đối theo số lượng lá */}
              <div
                className={`grid gap-3 ${
                  readingResult.drawnCards.length === 1
                    ? "grid-cols-1 max-w-sm mx-auto w-full"
                    : readingResult.drawnCards.length === 3
                    ? "grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto w-full"
                    : "grid-cols-1 sm:grid-cols-3 md:grid-cols-5 w-full"
                }`}
              >
                {readingResult.drawnCards.map((c, idx) => {
                  const isSelected = selectedCardIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        zenAudio.playCrystalChime(920 + idx * 50, 0.06);
                        setSelectedCardIndex(idx);
                      }}
                      className={`relative text-left p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md active:scale-[0.98] cursor-pointer ${
                        isSelected
                          ? "bg-[#d4af37]/20 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.3)] text-white"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/8"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{c.card.icon}</span>
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                            c.isReversed
                              ? "bg-red-950/60 border-red-500/50 text-red-300"
                              : "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                          }`}
                        >
                          {c.isReversed ? "Ngược ↻" : "Xuôi ✦"}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#38bdf8] block uppercase">
                        {c.position.label}
                      </span>
                      <h3 className="font-serif text-base font-bold text-white mb-0.5 line-clamp-1">
                        {c.card.nameVi}
                      </h3>
                      <p className="text-[11px] text-slate-400 italic line-clamp-1 mb-2">
                        {c.card.nameEn}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {c.keywords.slice(0, 2).map((kw, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-300"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Chi tiết lá bài được chọn */}
              {activeCardResult && (
                <motion.div
                  key={selectedCardIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 sm:p-8 rounded-3xl border border-[#d4af37]/40 bg-gradient-to-br from-[#0e1628]/95 via-[#070b14]/98 to-black/95 shadow-[0_0_50px_rgba(212,175,55,0.15)] backdrop-blur-xl space-y-6"
                >
                  {/* Card Header Profile */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-4xl shrink-0">
                        {activeCardResult.card.icon}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider">
                            Vị Trí: {activeCardResult.position.label}
                          </span>
                          <span
                            className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                              activeCardResult.isReversed
                                ? "bg-red-950/60 border-red-500/50 text-red-300"
                                : "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                            }`}
                          >
                            {activeCardResult.isReversed
                              ? "Trạng Thái Ngược (Reversed)"
                              : "Trạng Thái Xuôi (Upright)"}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                          {activeCardResult.card.nameVi} ({activeCardResult.card.nameEn})
                        </h2>
                        <p className="text-xs sm:text-sm text-[#8f9779] italic mt-0.5">
                          Bộ: {activeCardResult.card.arcana} Arcana • Nguyên tố:{" "}
                          {activeCardResult.card.element} • Chiêm tinh:{" "}
                          {activeCardResult.card.astrology}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2 self-start md:self-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {activeCardResult.keywords.map((kw, i) => (
                          <ZenBadge key={i} variant="gold" label={kw} size="xs" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trình Phát Pháp Âm Tự Tại Chi Tiết Cho Lá Bài */}
                  <SacredVoicePlayer
                    title={`Lời Khai Thị Lá Bài: ${activeCardResult.card.nameVi} (${activeCardResult.isReversed ? "Ngược" : "Xuôi"})`}
                    textToRead={`Lời khai thị lá bài ${activeCardResult.card.nameVi}. Trạng thái ${activeCardResult.isReversed ? "ngược" : "xuôi"}. Thuộc ${activeCardResult.card.arcana} Arcana, nguyên tố ${activeCardResult.card.element}. Ý nghĩa cốt lõi: ${activeCardResult.meaning}. Luận giải theo tâm nguyện của bạn: ${activeCardResult.personalizedQuestionReading}. Về công danh và tài chính: ${activeCardResult.aspectAdvice.career}. Về tình duyên và các mối quan hệ: ${activeCardResult.aspectAdvice.love}. Lời khuyên thức tỉnh: ${activeCardResult.aspectAdvice.dharmaAdvice}.`}
                  />

                  {/* Luận giải cá nhân hóa theo câu hỏi */}
                  <div className="p-5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/40 shadow-inner">
                    <h4 className="text-xs font-mono text-[#fef08a] uppercase tracking-wider flex items-center gap-2 mb-2">
                      <ScrollText className="w-4 h-4 text-[#d4af37]" />
                      <span>Luận Giải Riêng Theo Tâm Nguyện Của Bạn</span>
                    </h4>
                    <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                      {activeCardResult.personalizedQuestionReading}
                    </p>
                  </div>

                  {/* Tabs 4 Lĩnh Vực: Tổng Quan, Công Danh, Tình Duyên, Sức Khỏe, Khai Thị */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-2">
                      <button
                        onClick={() => setActiveAspect("general")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          activeAspect === "general"
                            ? "bg-[#d4af37] text-black font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Ý Nghĩa Cốt Lõi</span>
                      </button>

                      <button
                        onClick={() => setActiveAspect("career")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          activeAspect === "career"
                            ? "bg-[#38bdf8] text-black font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Công Danh & Tài Lộc</span>
                      </button>

                      <button
                        onClick={() => setActiveAspect("love")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          activeAspect === "love"
                            ? "bg-rose-400 text-black font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Tình Duyên & Mối Quan Hệ</span>
                      </button>

                      <button
                        onClick={() => setActiveAspect("health")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          activeAspect === "health"
                            ? "bg-amber-400 text-black font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Tinh Thần & Thể Chất</span>
                      </button>

                      <button
                        onClick={() => setActiveAspect("dharma")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          activeAspect === "dharma"
                            ? "bg-emerald-400 text-black font-bold"
                            : "bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Lời Khuyên Thức Tỉnh</span>
                      </button>

                      <button
                        onClick={() => setActiveAspect("healing" as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          (activeAspect as string) === "healing"
                            ? "bg-purple-400 text-black font-bold"
                            : "bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/40"
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Chữa Lành & Shadow Work</span>
                      </button>
                    </div>

                    {/* Aspect Content Display */}
                    <div className="p-5 rounded-2xl bg-black/40 border border-white/10 min-h-[120px]">
                      {activeAspect === "general" && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono text-[#fef08a] uppercase tracking-wider">
                            Ý Nghĩa Toàn Diện ({activeCardResult.isReversed ? "Trạng Thái Ngược" : "Trạng Thái Xuôi"})
                          </h4>
                          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                            {activeCardResult.meaning}
                          </p>
                        </div>
                      )}

                      {activeAspect === "career" && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
                            <Briefcase className="w-4 h-4 text-[#38bdf8]" />
                            <span>Vận Trình Sự Nghiệp, Đầu Tư & Tài Chính</span>
                          </h4>
                          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                            {activeCardResult.aspectAdvice.career}
                          </p>
                        </div>
                      )}

                      {activeAspect === "love" && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Heart className="w-4 h-4 text-rose-400" />
                            <span>Tình Yêu, Hôn Nhân & Các Mối Quan Hệ</span>
                          </h4>
                          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                            {activeCardResult.aspectAdvice.love}
                          </p>
                        </div>
                      )}

                      {activeAspect === "health" && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-amber-400" />
                            <span>Sức Khỏe Thể Xác & Năng Lượng Tinh Thần</span>
                          </h4>
                          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                            {activeCardResult.aspectAdvice.healthSpirit}
                          </p>
                        </div>
                      )}

                      {activeAspect === "dharma" && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span>Lời Khai Thị Hành Đạo & Thức Tỉnh Giác Ngộ</span>
                          </h4>
                          <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
                            &ldquo;{activeCardResult.aspectAdvice.dharmaAdvice}&rdquo;
                          </p>
                        </div>
                      )}

                      {(activeAspect as string) === "healing" && (
                        <div className="space-y-4">
                          <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
                            <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                              <Heart className="w-4 h-4 text-purple-400" />
                              <span>Lăng Kính Chữa Lành (Healing Tarot Insight)</span>
                            </h4>
                            <p className="text-purple-100 text-sm leading-relaxed">
                              {activeCardResult.healingInsight}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                            <h4 className="text-xs font-mono text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                              <Sparkles className="w-4 h-4 text-amber-400" />
                              <span>Đối Diện Bóng Tối Vô Thức (Shadow Work)</span>
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed italic">
                              {activeCardResult.shadowWork}
                            </p>
                          </div>

                          {/* Hành Trình Kẻ Khờ (Rachel Pollack 3-Line Theory) & Kabbalah Tree of Life */}
                          {activeCardResult.foolsJourneyStage && (
                            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-900/40 border border-indigo-500/40 space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <h4 className="text-xs font-mono text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                                  <Compass className="w-4 h-4 text-indigo-400" />
                                  <span>Hành Trình Kẻ Khờ & Kabbalah Tree of Life (Rachel Pollack)</span>
                                </h4>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200">
                                  {activeCardResult.foolsJourneyStage.stageLevel}
                                </span>
                              </div>
                              <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
                                <strong className="text-[#fef08a]">Tầng Thức Tỉnh:</strong> {activeCardResult.foolsJourneyStage.archetypalLesson}
                              </p>
                              <p className="text-slate-300 text-xs leading-relaxed font-mono">
                                <strong className="text-sky-300">Con Đường Cây Sự Sống:</strong> {activeCardResult.foolsJourneyStage.kabbalahTreePath}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TỔNG LUẬN TOÀN QUẺ & LIÊN KẾT KINH NGŨ BÁCH DANH */}
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Tổng Luận Trực Quẻ Tarot Tâm An
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      SYNTHESIS & ENERGY HARMONY MATRIX
                    </p>
                  </div>
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {readingResult.overallSynthesis}
                </p>

                {/* Câu Khẳng Định May Mắn (Lucky Affirmation) */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#d4af37]/15 via-transparent to-[#38bdf8]/15 border border-[#d4af37]/40">
                  <h4 className="text-xs font-mono text-[#fef08a] uppercase tracking-wider flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>Câu Khẳng Định Tâm Thức May Mắn (Daily Affirmation)</span>
                  </h4>
                  <p className="text-base sm:text-lg text-white font-serif italic">
                    &ldquo;{readingResult.luckyAffirmation}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    ✦ Hãy nhắm mắt niệm thầm câu này 3 lần để neo giữ nguồn năng lượng tích cực của vũ trụ.
                  </p>
                </div>

                {/* NẾU GẶP LÁ BÀI THỬ THÁCH: ĐỐI SOÁT & HÓA GIẢI QUA KINH NGŨ BÁCH DANH */}
                {readingResult.spiritualRemedy && (
                  <div className="p-6 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-red-200">
                          Hóa Giải Thử Thách Bằng Kinh Ngũ Bách Danh Quán Thế Âm
                        </h4>
                        <p className="text-xs text-slate-400 font-mono">
                          {readingResult.spiritualRemedy.categoryTitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {readingResult.spiritualRemedy.compassionateGuidance}
                    </p>

                    <div className="p-4 rounded-xl bg-black/50 border border-red-500/30">
                      <span className="text-[11px] font-mono text-red-300 block mb-1">
                        Câu Xướng Niệm Hóa Giải Nghiệp Duyên:
                      </span>
                      <p className="text-sm sm:text-base font-serif font-bold text-[#fef08a]">
                        &ldquo;{readingResult.spiritualRemedy.chantingVerse}&rdquo;
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        Số biến khuyến nghị: Trì niệm {readingResult.spiritualRemedy.recommendedRepetitions} biến với tâm thành kính.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-red-500/20">
                      <span className="text-xs text-slate-400 font-mono">
                        ✦ Pháp môn đối trị từ bản dịch nguyên bản "Lễ Ngũ Bách Danh Quán Thế Âm".
                      </span>
                      <ZenButton
                        href="/documents"
                        variant="gold"
                        size="sm"
                        borderBeam={false}
                        icon={Sparkles}
                        iconPosition="right"
                      >
                        Đến Kho Tàng Kinh Ngũ Bách Danh
                      </ZenButton>
                    </div>
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-slate-400 font-mono">
                    ✦ Gợi ý: Bạn có thể kết hợp với bài Thiền Định Sóng Não 432Hz để neo giữ nguồn năng lượng tích cực này.
                  </span>
                  <div className="flex items-center gap-3">
                    <ZenButton
                      onClick={handleExportFortuneCard}
                      variant="gold"
                      size="sm"
                      borderBeam={true}
                      icon={Download}
                      iconPosition="left"
                    >
                      {isExporting ? "Đang Xuất..." : "Tải Thiệp May Mắn 4K"}
                    </ZenButton>
                    <ZenButton
                      href="/meditation"
                      variant="sage"
                      size="sm"
                      borderBeam={false}
                      icon={Sparkles}
                      iconPosition="right"
                    >
                      Đến Trang Thiền Định 3D
                    </ZenButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>

      {/* MOBILE STICKY FLOATING DOCK (TAROT SMARTPHONE QUICK ACTIONS) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#060913]/95 border border-[#d4af37]/60 rounded-2xl px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl flex items-center justify-between gap-1">
        <button
          onClick={() => {
            zenAudio.playSoftTap(500, 0.05);
            if (!isDrawn) {
              handleDraw();
            } else {
              handleReset();
            }
          }}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono text-slate-300 hover:text-white active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#fef08a] mb-0.5" />
          <span>{isDrawn ? "Trải Lại" : "Rút Quẻ"}</span>
        </button>

        <button
          onClick={handleExportFortuneCard}
          disabled={!isDrawn}
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono text-[#fef08a] hover:text-white active:scale-95 transition-all disabled:opacity-40"
        >
          <Download className="w-4 h-4 text-[#d4af37] mb-0.5" />
          <span>Tải Thiệp</span>
        </button>

        <Link
          href="/meditation"
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono text-[#34d399] hover:text-white active:scale-95 transition-all"
        >
          <Activity className="w-4 h-4 text-[#34d399] mb-0.5" />
          <span>Thiền 432Hz</span>
        </Link>

        <Link
          href="/lien-sinh-don-giap"
          className="flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-mono text-[#38bdf8] hover:text-white active:scale-95 transition-all"
        >
          <Compass className="w-4 h-4 text-[#38bdf8] mb-0.5" />
          <span>Độn Giáp</span>
        </Link>
      </div>

      {/* Unified Client Footer */}
      <ClientFooter />
    </div>
  );
}
