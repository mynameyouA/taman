"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import DreamPortal3D from "@/components/3d/DreamPortal3D";
import {
  Sparkles,
  Compass,
  Moon,
  Feather,
  Eye,
  ShieldAlert,
  Flame,
  Layers,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import ClientNavbar from "@/components/ui/ClientNavbar";
import ClientFooter from "@/components/ui/ClientFooter";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";
import PageTransition from "@/components/ui/PageTransition";
import { zenAudio } from "@/utils/zenAudio";
import { recordBrainEvent } from "@/utils/unifiedBrain";
import { recommendNguBachDanh, NguBachDanhRecommendation } from "@/utils/nguBachDanh";
import { addMeritPoints } from "@/utils/meritSystem";
import SacredVoicePlayer from "@/components/audio/SacredVoicePlayer";
import DreamMandala from "@/components/dreams/DreamMandala";
import SageMasterAvatar3D from "@/components/3d/SageMasterAvatar3D";
import type { DreamAnalysisResponse } from "@/app/api/dreams/route";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
});

interface DreamSymbolChip {
  label: string;
  icon: string;
  promptText: string;
}

const DREAM_SYMBOL_CHIPS: DreamSymbolChip[] = [
  {
    label: "Sóng biển & Nước",
    icon: "🌊",
    promptText:
      "Tôi thấy mình đứng trước một vùng biển mênh mông lúc hoàng hôn, những con sóng ngọc bích xô dạt vào bờ và cuốn tôi trôi bồng bềnh giữa dòng nước sâu thẳm tĩnh lặng...",
  },
  {
    label: "Rơi vào hư không",
    icon: "🌌",
    promptText:
      "Tôi đang đứng trên đỉnh một vách đá cheo leo mờ ảo giữa sương mù, bỗng trượt chân rơi tự do vào khoảng không vô tận nhưng không hề đau đớn, chỉ thấy sự hụt hẫng kỳ lạ...",
  },
  {
    label: "Bay lượn trên mây",
    icon: "🪽",
    promptText:
      "Tôi dang rộng đôi cánh phát sáng ánh bạc, từ từ cất cánh bay lượn trên các tầng mây ngũ sắc, nhìn xuống trần gian tĩnh mịch và cảm nhận sự tự do thoát tục...",
  },
  {
    label: "Bóng đen rượt đuổi",
    icon: "👤",
    promptText:
      "Một bóng đen bí ẩn không rõ hình thù rượt đuổi tôi qua một dãy hành lang cổ kính ngoằn ngoèo, tôi cố gắng chạy thật nhanh nhưng đôi chân như bị dính chặt vào sàn...",
  },
  {
    label: "Gặp người đã khuất",
    icon: "🕊️",
    promptText:
      "Tôi hạnh ngộ người thân đã khuất trong một khu vườn ngập tràn ánh hoàng kim thanh tịnh, họ mỉm cười hiền từ, vỗ vai tôi và trao cho tôi một món kỷ vật cổ xưa...",
  },
  {
    label: "Ngôi nhà cổ bí ẩn",
    icon: "🏚️",
    promptText:
      "Tôi bước vào một dinh thự cổ kính phủ đầy rêu phong giữa rừng sâu, tình cờ đẩy một cánh cửa bí mật dẫn xuống căn phòng dưới lòng đất chứa đầy những quyển sách phát sáng...",
  },
];

export default function DreamInterpreterPage() {
  const [dreamText, setDreamText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DreamAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeLayerTab, setActiveLayerTab] = useState<
    "archetype" | "shadow" | "animaAnimus" | "subconsciousMessage" | "awakeningGuidance"
  >("archetype");

  const [remedy, setRemedy] = useState<NguBachDanhRecommendation | null>(null);

  const handleChipClick = (chip: DreamSymbolChip) => {
    zenAudio.playCrystalChime(852, 0.05);
    setDreamText(chip.promptText);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setRemedy(null);
    zenAudio.playCrystalChime(768, 0.08);

    try {
      const response = await fetch("/api/dreams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream: dreamText }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Có lỗi xảy ra khi kết nối vũ trụ tâm thức.");
      }

      const data: DreamAnalysisResponse = await response.json();
      setResult(data);
      setActiveLayerTab("archetype");
      zenAudio.playHarmonicChord();

      // Đề xuất Pháp Môn Kinh Ngũ Bách Danh an định tâm thức
      const isNightmare =
        dreamText.toLowerCase().includes("rượt") ||
        dreamText.toLowerCase().includes("sợ") ||
        dreamText.toLowerCase().includes("chết") ||
        dreamText.toLowerCase().includes("rơi") ||
        dreamText.toLowerCase().includes("bóng đen");

      const dreamRemedy = recommendNguBachDanh({
        dream: {
          dreamSnippet: dreamText,
          isNightmare,
          shadow: data.fiveLayers?.shadow?.content,
        },
        details: dreamText,
      });
      setRemedy(dreamRemedy);

      // Tích lũy công đức giải mộng thức tỉnh
      addMeritPoints("DREAM_JOURNAL", "Giải mã giấc mộng cõi vô thức Carl Jung", 25);

      // Đồng bộ vào Bộ Não Tâm An duy nhất (Unified Brain)
      try {
        recordBrainEvent({
          type: "DREAM",
          data: {
            dreamSnippet: dreamText,
            archetype: data.fiveLayers?.archetype?.name || data.theme?.name,
            shadow: data.fiveLayers?.shadow?.content,
            animaAnimus: data.fiveLayers?.animaAnimus?.content,
            subconsciousMessage: data.fiveLayers?.subconsciousMessage?.content,
            awakeningGuidance: data.fiveLayers?.awakeningGuidance?.content,
            tags: data.tags,
          },
        });
      } catch (brainErr) {
        console.error("Lỗi đồng bộ giấc mơ vào Bộ Não Tâm An:", brainErr);
      }
    } catch (err: any) {
      setError(err.message || "Lỗi không xác định trong quá trình giải mã.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07020d] text-purple-50 font-sans flex flex-col justify-between relative overflow-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* 3D WebGL Cổng Vũ Trụ Mộng Cảnh */}
      <DreamPortal3D
        isWarping={isLoading}
        activity={dreamText.length}
        className="opacity-90"
      />

      {/* Lớp phủ tinh vân mờ nhẹ kết hợp không gian vô cực */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07020d]/40 to-[#07020d]/90 pointer-events-none z-[1]" />

      {/* Unified Client Navigation Header */}
      <ClientNavbar />

      {/* Page Content Transition */}
      <PageTransition className="w-full max-w-4xl z-10 space-y-10 relative mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-5"
        >
          <ZenBadge
            variant="purple"
            icon={Moon}
            label="Tâm Lý Học Chiều Sâu Carl Jung • 5 Tầng Vô Thức"
            size="sm"
            className="shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          />

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-serif font-bold font-display-purple tracking-wide`}
          >
            Giải Mộng Tâm An
          </h1>
          <p className="text-purple-200/80 text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Khám phá 5 tầng chiều sâu tâm thức theo học thuyết Carl Jung: Nguyên Mẫu (Archetype), Bóng Tối (Shadow),
            Năng Lượng Giới Tính Đối Lập (Anima/Animus), Mật Mã Tiềm Thức và Chỉ Dẫn Hợp Nhất Bản Thể.
          </p>
        </motion.div>

        {/* Khung Glassmorphism tương tác giấc mơ */}
        <motion.form
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-purple-950/20 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-3xl border border-purple-500/30 shadow-[0_8px_32px_0_rgba(76,29,149,0.35)] relative overflow-hidden"
        >
          {/* Viền hào quang chuyển động */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

          {/* Biểu Tượng Giấc Mơ Phổ Biến - Quick Dream Symbol Chips */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Chọn Nhanh Biểu Tượng Cõi Mộng (Dream Symbol Chips):
              </span>
              <span className="text-[11px] font-mono text-purple-400/60 hidden sm:inline">
                Nhấp để tự động điền gợi ý
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {DREAM_SYMBOL_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  disabled={isLoading}
                  className="group px-3 py-1.5 rounded-xl text-xs font-medium bg-purple-900/30 hover:bg-purple-800/40 text-purple-200 border border-purple-400/20 hover:border-purple-400/50 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform">
                    {chip.icon}
                  </span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <textarea
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              placeholder="Hãy thuật lại những hình ảnh, cảm xúc hay ảo tượng trong giấc mơ của bạn..."
              className={`w-full h-44 bg-purple-950/40 border border-purple-400/25 rounded-2xl p-6 text-purple-50 placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-purple-300 transition-all resize-none shadow-inner text-base md:text-lg leading-relaxed ${playfair.className}`}
              required
              disabled={isLoading}
            />
            {dreamText.length > 0 && (
              <span className="absolute bottom-3 right-4 text-xs font-mono text-purple-300/60 bg-black/40 px-2 py-0.5 rounded-full border border-purple-400/20">
                {dreamText.length} ký tự
              </span>
            )}
          </div>

          <div className="flex justify-center">
            <ZenButton
              type="submit"
              disabled={isLoading || !dreamText.trim()}
              variant="purple"
              size="lg"
              borderBeam={true}
              magnetic={true}
              soundEnabled={false}
              icon={Sparkles}
              iconPosition="left"
              className="font-medium tracking-widest uppercase text-xs"
            >
              {isLoading
                ? "ĐANG PHÂN TÍCH 5 TẦNG CHIỀU SÂU VÔ THỨC..."
                : "GIẢI MÃ GIẤC MƠ CARL JUNG"}
            </ZenButton>
          </div>
        </motion.form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-950/40 border border-red-500/50 rounded-2xl text-red-200 text-center backdrop-blur-md shadow-lg"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="space-y-8 mt-6"
            >
              {/* Theme Header & Core Transmission */}
              <div className="relative p-8 md:p-10 rounded-3xl bg-purple-950/30 backdrop-blur-2xl border border-purple-400/40 shadow-[0_8px_32px_0_rgba(147,51,234,0.35)]">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <ZenBadge
                    variant="purple"
                    icon={Compass}
                    label={result.theme?.name || "Chủ Đề Tiềm Thức"}
                    size="md"
                    className="shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                  />
                </div>

                <div className="pt-4 space-y-5 text-center">
                  <p className="text-xs font-mono text-purple-300 tracking-widest uppercase">
                    {result.theme?.subtext || "Luận Giải Tâm Lý Học Chiều Sâu"}
                  </p>
                  <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-2xl mx-auto">
                    {result.theme?.description}
                  </p>

                  <div className="p-6 rounded-2xl bg-black/40 border border-purple-400/20 my-4">
                    <p
                      className={`text-xl md:text-2xl leading-relaxed text-purple-50 font-serif italic ${playfair.className}`}
                    >
                      &ldquo;{result.interpretation}&rdquo;
                    </p>
                  </div>

                  {result.tags && result.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {result.tags.map((tag, idx) => (
                        <ZenBadge
                          key={idx}
                          variant="purple"
                          label={`#${tag}`}
                          size="xs"
                          pulsing={false}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 5 Tầng Phân Tích Chiều Sâu Carl Jung */}
              {result.fiveLayers && (
                <div className="rounded-3xl bg-purple-950/25 border border-purple-500/30 p-6 md:p-8 backdrop-blur-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-5 h-5 text-purple-300" />
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-purple-50">
                        5 Tầng Luận Giải Tâm Lý Chiều Sâu
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-purple-400/80">
                      Carl Jung Depth Psychology
                    </span>
                  </div>

                  {/* 5 Layer Selector Navigation Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      {
                        key: "archetype" as const,
                        title: "1. Archetype",
                        sub: "Nguyên Mẫu",
                        icon: Sparkles,
                      },
                      {
                        key: "shadow" as const,
                        title: "2. Shadow",
                        sub: "Bóng Tối",
                        icon: ShieldAlert,
                      },
                      {
                        key: "animaAnimus" as const,
                        title: "3. Anima/Animus",
                        sub: "Âm Dương",
                        icon: Flame,
                      },
                      {
                        key: "subconsciousMessage" as const,
                        title: "4. Mật Mã",
                        sub: "Tiềm Thức",
                        icon: Eye,
                      },
                      {
                        key: "awakeningGuidance" as const,
                        title: "5. Chỉ Dẫn",
                        sub: "Hợp Nhất",
                        icon: Feather,
                      },
                    ].map((tab) => {
                      const isActive = activeLayerTab === tab.key;
                      const IconComp = tab.icon;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => {
                            zenAudio.playCrystalChime(800, 0.04);
                            setActiveLayerTab(tab.key);
                          }}
                          className={`p-3 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                            isActive
                              ? "bg-purple-600/30 border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white"
                              : "bg-purple-950/30 border-purple-500/20 hover:border-purple-400/40 text-purple-300/70 hover:text-purple-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <IconComp
                              className={`w-4 h-4 ${
                                isActive ? "text-purple-200" : "text-purple-400/60"
                              }`}
                            />
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-300 animate-ping" />
                            )}
                          </div>
                          <span className="font-mono text-xs font-bold block truncate">
                            {tab.title}
                          </span>
                          <span className="text-[10px] text-purple-300/60 truncate">
                            {tab.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Layer Content Card */}
                  <div className="pt-2">
                    {activeLayerTab === "archetype" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 md:p-8 rounded-2xl bg-purple-900/20 border border-purple-400/30 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-500/20">
                          <div>
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                              {result.fiveLayers.archetype.title}
                            </span>
                            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                              {result.fiveLayers.archetype.name}
                            </h4>
                          </div>
                          <ZenBadge
                            variant="purple"
                            icon={Sparkles}
                            label="Vô Thức Tập Thể"
                            size="xs"
                          />
                        </div>
                        <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                          {result.fiveLayers.archetype.content}
                        </p>
                        <div className="p-4 rounded-xl bg-black/30 border border-purple-400/20 text-xs sm:text-sm text-purple-300 italic flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                          <span>
                            <strong>Chiêm nghiệm:</strong> {result.fiveLayers.archetype.meditativeNote}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeLayerTab === "shadow" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 md:p-8 rounded-2xl bg-purple-900/20 border border-purple-400/30 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-500/20">
                          <div>
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                              {result.fiveLayers.shadow.title}
                            </span>
                            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                              Phần Nhân Cách Bị Khước Từ & Vết Thương Ẩn Giấu
                            </h4>
                          </div>
                          <ZenBadge
                            variant="purple"
                            icon={ShieldAlert}
                            label="Shadow Work"
                            size="xs"
                          />
                        </div>
                        <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                          {result.fiveLayers.shadow.content}
                        </p>
                        <div className="p-4 rounded-xl bg-black/30 border border-purple-400/20 text-xs sm:text-sm text-purple-300 italic flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                          <span>
                            <strong>Chiêm nghiệm:</strong> {result.fiveLayers.shadow.meditativeNote}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeLayerTab === "animaAnimus" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 md:p-8 rounded-2xl bg-purple-900/20 border border-purple-400/30 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-500/20">
                          <div>
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                              {result.fiveLayers.animaAnimus.title}
                            </span>
                            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                              {result.fiveLayers.animaAnimus.polarity}
                            </h4>
                          </div>
                          <ZenBadge
                            variant="purple"
                            icon={Flame}
                            label="Âm Dương Hợp Nhất"
                            size="xs"
                          />
                        </div>
                        <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                          {result.fiveLayers.animaAnimus.content}
                        </p>
                        <div className="p-4 rounded-xl bg-black/30 border border-purple-400/20 text-xs sm:text-sm text-purple-300 italic flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                          <span>
                            <strong>Chiêm nghiệm:</strong> {result.fiveLayers.animaAnimus.meditativeNote}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeLayerTab === "subconsciousMessage" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 md:p-8 rounded-2xl bg-purple-900/20 border border-purple-400/30 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-500/20">
                          <div>
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                              {result.fiveLayers.subconsciousMessage.title}
                            </span>
                            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                              Mật Mã Biểu Tượng & Tiếng Gọi Bản Thể
                            </h4>
                          </div>
                          <ZenBadge
                            variant="purple"
                            icon={Eye}
                            label="Thông Điệp Trực Giác"
                            size="xs"
                          />
                        </div>
                        <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                          {result.fiveLayers.subconsciousMessage.content}
                        </p>
                        <div className="p-4 rounded-xl bg-black/30 border border-purple-400/20 text-xs sm:text-sm text-purple-300 italic flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                          <span>
                            <strong>Chiêm nghiệm:</strong> {result.fiveLayers.subconsciousMessage.meditativeNote}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {activeLayerTab === "awakeningGuidance" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 md:p-8 rounded-2xl bg-purple-900/20 border border-purple-400/30 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-500/20">
                          <div>
                            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                              {result.fiveLayers.awakeningGuidance.title}
                            </span>
                            <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                              Chỉ Dẫn Chuyển Hóa & Thiền Định Thực Hành
                            </h4>
                          </div>
                          <ZenBadge
                            variant="purple"
                            icon={Feather}
                            label="Individuation"
                            size="xs"
                          />
                        </div>
                        <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
                          {result.fiveLayers.awakeningGuidance.content}
                        </p>
                        <div className="p-4 rounded-xl bg-black/30 border border-purple-400/20 text-xs sm:text-sm text-purple-300 italic flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                          <span>
                            <strong>Chiêm nghiệm:</strong> {result.fiveLayers.awakeningGuidance.meditativeNote}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* QUẺ DỊCH ĐỒNG HIỆN TƯỢNG (SYNCHRONICITY & I CHING RESONANCE) */}
                  {result.iChingResonance && (
                    <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-[#17223b] via-[#0b1329] to-[#040813] border border-[#38bdf8]/40 shadow-xl space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/20 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] font-bold font-serif">
                            ䷎
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider block">
                              ĐỒNG HIỆN TƯỢNG (SYNCHRONICITY) • QUẺ DỊCH ỨNG HIỆN
                            </span>
                            <h4 className="text-base sm:text-lg font-serif font-bold text-white">
                              {result.iChingResonance.hexagramName} (Quẻ #{result.iChingResonance.hexagramNumber})
                            </h4>
                          </div>
                        </div>
                        <ZenBadge variant="cyan" label="Kinh Dịch 64 Quẻ" size="xs" />
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#fef08a] italic font-serif">
                        &ldquo;{result.iChingResonance.thoanTu}&rdquo;
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <strong className="text-sky-300">Minh triết thức tỉnh:</strong> {result.iChingResonance.insight}
                      </p>
                    </div>
                  )}

                  {/* MANDALA TÂM THỨC TỰ SINH (JUNGIAN GENERATIVE MANDALA) */}
                  <div className="mt-8">
                    <DreamMandala
                      themeId={result.theme.id}
                      themeName={result.theme.name}
                      archetypeName={result.fiveLayers?.archetype?.name}
                    />
                  </div>

                  {/* Lời Khẩu Truyền Thầy Sinh & Pháp Bảo Ngũ Bách Danh An Định Tâm Thức */}
                  <div className="mt-8 pt-6 border-t border-purple-500/20 space-y-6">
                    {/* Trình phát pháp âm Thầy Sinh */}
                    <div>
                      <SacredVoicePlayer
                        title="Thầy Sinh Khẩu Truyền Giải Mộng Vô Thức"
                        textToRead={`Chào con, giấc mộng của con mang biểu tượng ${result.fiveLayers.archetype.name}. Vô thức đang nhắn gửi: ${result.fiveLayers.subconsciousMessage.content.slice(0, 200)}. Con hãy bình tâm lắng lòng, đón nhận ánh quang minh của bản thể.`}
                      />
                    </div>

                    {/* Khung Hộ Niệm Ngũ Bách Danh */}
                    {remedy && (
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-purple-950/40 to-black/60 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.15)] space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            Pháp Bảo Hộ Niệm An Định Cõi Mộng • Kinh Ngũ Bách Danh
                          </span>
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                            Khuyên trì {remedy.recommendedRepetitions} biến
                          </span>
                        </div>

                        <p className="text-xs text-purple-200/90 italic">
                          &ldquo;{remedy.compassionateGuidance}&rdquo;
                        </p>

                        <div className="p-3.5 rounded-xl bg-black/40 border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="text-xs font-mono text-slate-400">Danh hiệu hộ niệm:</div>
                            <div className="text-sm sm:text-base font-serif font-bold text-amber-200">
                              {remedy.remedies[0]?.name || "Nam Mô Đại Bi Quán Thế Âm Bồ Tát"}
                            </div>
                            <div className="text-[11px] text-amber-300/70 mt-0.5">
                              {remedy.remedies[0]?.meaning}
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2">
                            <ZenButton
                              onClick={() => {
                                zenAudio.playTibetanBowl(216, 0.25);
                                alert(`Đã gia trì danh hiệu "${remedy.remedies[0]?.shortTitle}". Hãy giữ tâm thanh tịnh và xướng niệm ${remedy.recommendedRepetitions} biến mỗi tối trước khi ngủ để an giấc ngàn thu.`);
                              }}
                              variant="gold"
                              size="sm"
                              icon={Sparkles}
                            >
                              Gia Trì Niệm Danh Hiệu
                            </ZenButton>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>

      {/* Unified Client Footer */}
      <ClientFooter />
    </div>
  );
}
