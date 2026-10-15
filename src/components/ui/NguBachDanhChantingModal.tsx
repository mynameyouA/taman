"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  BookOpen,
  HeartHandshake,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  Compass,
  Volume2,
  VolumeX,
  CheckCircle,
  Search,
  X,
  Play,
  RotateCw,
  Award,
  Feather,
  ChevronRight,
  Sun,
  Flame,
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";
import {
  NguBachDanhRecord,
  KarmicRemedyCategory,
  KARMIC_CATEGORIES,
  getAllNguBachDanh,
  searchNguBachDanh,
  recommendNguBachDanh,
  NguBachDanhRecommendation,
} from "@/utils/nguBachDanh";
import { recordBrainEvent } from "@/utils/unifiedBrain";
import { addMeritPoints } from "@/utils/meritSystem";

interface NguBachDanhChantingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRecommendation?: NguBachDanhRecommendation | null;
  divinationContext?: {
    chanhName: string;
    bienName: string;
    movingLine: number;
    question?: string;
  };
}

export default function NguBachDanhChantingModal({
  isOpen,
  onClose,
  initialRecommendation,
  divinationContext,
}: NguBachDanhChantingModalProps) {
  // Recommendation state
  const activeRecommendation = useMemo(() => {
    if (initialRecommendation) return initialRecommendation;
    if (divinationContext) {
      return recommendNguBachDanh({
        divination: divinationContext,
      });
    }
    return recommendNguBachDanh({
      issueType: "NGHIEP_CHUONG_SAM_HOI",
    });
  }, [initialRecommendation, divinationContext]);

  // Selected Remedy for chanting
  const [selectedRemedy, setSelectedRemedy] = useState<NguBachDanhRecord>(
    activeRecommendation.remedies[0] || getAllNguBachDanh()[0]
  );

  // Tabs: 'chant' | 'library'
  const [activeTab, setActiveTab] = useState<"chant" | "library">("chant");

  // Repetition goal: 21 | 108
  const [targetCount, setTargetCount] = useState<number>(
    activeRecommendation.recommendedRepetitions || 108
  );
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Library search & filter
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    KarmicRemedyCategory | "ALL"
  >("ALL");

  // Keep selectedRemedy in sync when recommendation changes
  useEffect(() => {
    if (activeRecommendation.remedies.length > 0) {
      setSelectedRemedy(activeRecommendation.remedies[0]);
      setTargetCount(activeRecommendation.recommendedRepetitions);
      setCurrentCount(0);
      setIsCompleted(false);
    }
  }, [activeRecommendation]);

  // All 500 records
  const allRecords = useMemo(() => getAllNguBachDanh(), []);

  // Filtered records for Library tab
  const filteredRecords = useMemo(() => {
    return allRecords.filter((rec) => {
      if (selectedCategoryFilter !== "ALL" && rec.category !== selectedCategoryFilter) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        rec.id.toString() === q ||
        rec.shortTitle.toLowerCase().includes(q) ||
        rec.name.toLowerCase().includes(q) ||
        rec.meaning.toLowerCase().includes(q) ||
        rec.originalText.toLowerCase().includes(q)
      );
    });
  }, [allRecords, selectedCategoryFilter, searchQuery]);

  // Lần hạt chuỗi / Gõ mõ
  const handleChantStep = () => {
    if (isCompleted) return;

    const nextCount = currentCount + 1;
    setCurrentCount(nextCount);

    // Phát âm thanh
    if (!isMuted) {
      // Tiếng mõ mộc thanh tịnh
      zenAudio.playWoodenFish(0.18);

      // Cứ mỗi 7 biến hoặc khi cán đích: Điểm chuông bát ngân vang
      if (nextCount % 7 === 0 || nextCount >= targetCount) {
        setTimeout(() => {
          zenAudio.playZenBell(528, 0.22);
        }, 80);
      }
    }

    // Rung phản hồi haptic trên mobile nếu có
    if (typeof window !== "undefined" && "navigator" in window && navigator.vibrate) {
      try {
        navigator.vibrate(25);
      } catch {
        // Ignore
      }
    }

    // Khi hoàn tất số biến
    if (nextCount >= targetCount) {
      setIsCompleted(true);
      // Tích lũy công đức trì niệm chuỗi tràng
      addMeritPoints(
        "BEAD_COUNT",
        `Trì niệm ${targetCount} biến danh hiệu ${selectedRemedy.shortTitle} - Ngũ Bách Danh`,
        50,
        { chantCompleted: true }
      );

      // Ghi nhận vào Bộ Não Tâm An
      recordBrainEvent({
        type: "NGU_BACH_DANH",
        data: {
          remedyId: selectedRemedy.id,
          shortTitle: selectedRemedy.shortTitle,
          mantra: selectedRemedy.mantra,
          category: selectedRemedy.category,
          repetitionCount: nextCount,
          targetCount: targetCount,
          completed: true,
          dedicatedMeritPrayer:
            "Nguyện đem công đức trì niệm này hồi hướng cho thân tâm an lạc, tiêu trừ nghiệp chướng, nhẹ bớt chướng duyên, gia đạo thuận hòa.",
        },
      });
    }
  };

  // Reset count
  const handleResetCount = () => {
    setCurrentCount(0);
    setIsCompleted(false);
    if (!isMuted) {
      zenAudio.playZenBell(432, 0.15);
    }
  };

  // Switch remedy from library
  const handleSelectRemedyFromLibrary = (remedy: NguBachDanhRecord) => {
    setSelectedRemedy(remedy);
    setTargetCount(remedy.recommendedCount || 108);
    setCurrentCount(0);
    setIsCompleted(false);
    setActiveTab("chant");
    if (!isMuted) {
      zenAudio.playCrystalChime(660, 0.1);
    }
  };

  // Toggle audio mute
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    zenAudio.setMuted(next);
  };

  // Category info of current remedy
  const currentCatInfo = KARMIC_CATEGORIES[selectedRemedy.category] || KARMIC_CATEGORIES.NGHIEP_CHUONG_SAM_HOI;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-all"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-[#040711] border border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.15)] text-slate-100 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="relative flex items-center justify-between px-6 py-4.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Feather className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent">
                    Pháp Bảo Trì Niệm Ngũ Bách Danh
                  </h2>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
                    500 Danh Hiệu
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Lễ Ngũ Bách Danh Quán Thế Âm Bản Hành Trì • Giảm Thiểu Rủi Ro & Nhẹ Nghiệp Duyên
                </p>
              </div>
            </div>

            {/* Top actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className={`p-2.5 rounded-xl border transition-all ${
                  isMuted
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                    : "bg-white/5 border-white/10 text-slate-300 hover:text-amber-300 hover:bg-white/10"
                }`}
                title={isMuted ? "Bật âm chuông mõ" : "Tắt âm chuông mõ"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 pb-1 bg-black/20 border-b border-white/5">
            <button
              onClick={() => setActiveTab("chant")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "chant"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Khóa Lễ Trì Niệm (Lần Hạt Chuỗi)</span>
            </button>

            <button
              onClick={() => setActiveTab("library")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "library"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Tra Cứu 500 Danh Hiệu Quán Âm</span>
            </button>
          </div>

          {/* Main Modal Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {activeTab === "chant" ? (
              /* TAB 1: KHÓA LỄ TRÌ NIỆM & LẦN CHUỖI TRÀNG */
              <div className="space-y-6">
                {/* Banner Chỉ Dẫn An Tâm */}
                <div className="p-4.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/25 relative overflow-hidden">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="font-bold text-amber-200 flex items-center gap-2">
                        <span>Khai Thị Từ Master of Buddhist Philosophy:</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 uppercase tracking-wider font-mono">
                          Đức Năng Thắng Số
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed italic">
                        &quot;Quẻ có chút chướng duyên nơi phương vị hay công việc, nhưng bạn chớ quá hoang mang. Cổ nhân dạy: &apos;Đức năng thắng số, từ bi chuyển hóa nghiệp duyên&apos;. Hãy chí thành hướng tâm trì niệm danh hiệu Bồ Tát dưới đây để an định tâm thần và nhẹ bớt nghiệp lực.&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Danh hiệu được chọn */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden space-y-4">
                  {/* Category Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border"
                      style={{
                        backgroundColor: `${currentCatInfo.color}15`,
                        borderColor: `${currentCatInfo.color}40`,
                        color: currentCatInfo.color,
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {currentCatInfo.title}
                    </span>

                    <span className="text-xs text-slate-400 font-mono">
                      Danh hiệu số: #{selectedRemedy.id} / 500
                    </span>
                  </div>

                  {/* Title & Holy invocation */}
                  <div className="space-y-2 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-amber-100">
                      {selectedRemedy.name}
                    </h3>
                    <div className="p-3.5 rounded-xl bg-amber-500/[0.07] border border-amber-500/20 text-amber-200 text-sm sm:text-base font-serif italic text-center">
                      🌸 &ldquo;{selectedRemedy.mantra}&rdquo;
                    </div>
                  </div>

                  {/* Meaning & Mindset */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-slate-300 pt-1">
                    <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <Feather className="w-3.5 h-3.5 text-amber-400" />
                        Ý Nghĩa Pháp Môn & Công Năng:
                      </span>
                      <p className="leading-relaxed text-slate-300">
                        {selectedRemedy.meaning}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
                        Tâm Thế Định Tĩnh Khi Trì Niệm:
                      </span>
                      <p className="leading-relaxed text-slate-300">
                        {selectedRemedy.mindsetAdvice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* KHUNG LẦN CHUỖI TRÀNG 108 HẠT ẢO */}
                <div className="p-6 rounded-3xl bg-gradient-to-b from-black/40 via-black/60 to-black/80 border border-amber-500/30 flex flex-col items-center justify-center space-y-6 shadow-inner relative">
                  {/* Goal Switcher: 21 | 108 */}
                  <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
                    <span className="px-3 py-1 text-slate-400 font-medium">Mục Tiêu Trì Niệm:</span>
                    <button
                      onClick={() => {
                        setTargetCount(21);
                        setCurrentCount(0);
                        setIsCompleted(false);
                      }}
                      className={`px-3 py-1 rounded-xl font-bold transition-all ${
                        targetCount === 21
                          ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      21 Biến (Định Thần)
                    </button>
                    <button
                      onClick={() => {
                        setTargetCount(108);
                        setCurrentCount(0);
                        setIsCompleted(false);
                      }}
                      className={`px-3 py-1 rounded-xl font-bold transition-all ${
                        targetCount === 108
                          ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      108 Biến (Đại Nguyện)
                    </button>
                  </div>

                  {/* Vòng Hạt Chuỗi & Nút Niệm */}
                  <div className="relative flex flex-col items-center justify-center py-4">
                    {/* Glowing Aura Ring */}
                    <motion.div
                      animate={{
                        scale: isCompleted ? [1, 1.08, 1] : 1,
                        opacity: isCompleted ? [0.6, 1, 0.6] : 0.4,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-400/10 to-rose-500/20 blur-2xl pointer-events-none"
                    />

                    {/* Circular Bead Progress Track */}
                    <div className="relative w-52 h-52 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background track circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="44"
                          stroke="rgba(255, 255, 255, 0.08)"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                        {/* Golden Glowing Progress Arc */}
                        <circle
                          cx="50"
                          cy="50"
                          r="44"
                          stroke="#fbbf24"
                          strokeWidth="4"
                          strokeDasharray={2 * Math.PI * 44}
                          strokeDashoffset={
                            2 * Math.PI * 44 * (1 - Math.min(currentCount / targetCount, 1))
                          }
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-300"
                          style={{
                            filter: "drop-shadow(0 0 6px rgba(251, 191, 36, 0.6))",
                          }}
                        />
                      </svg>

                      {/* Interactive Center Chant Button */}
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={handleChantStep}
                        disabled={isCompleted}
                        className={`absolute w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all shadow-2xl ${
                          isCompleted
                            ? "bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                            : "bg-gradient-to-b from-amber-600/30 via-amber-900/40 to-black/80 border-2 border-amber-400/60 hover:border-amber-300 text-amber-200 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="w-8 h-8 text-emerald-400 animate-bounce mb-1" />
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                              Viên Mãn
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-3xl font-extrabold font-mono tracking-tight text-white drop-shadow">
                              {currentCount}
                            </span>
                            <span className="text-[11px] text-amber-300/80 font-mono">
                              / {targetCount} biến
                            </span>
                            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider mt-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                              Chạm Để Niệm
                            </span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-4 text-center max-w-xs">
                      Mỗi lần chạm hạt chuỗi là một lần chí thành xướng niệm danh hiệu Bồ Tát.
                      Tiếng mõ thanh tịnh và chuông ngân giúp tâm bạn phẳng lặng như gương.
                    </p>
                  </div>

                  {/* Actions & Completion Section */}
                  <div className="w-full flex items-center justify-between gap-3 pt-2 border-t border-white/10">
                    <button
                      onClick={handleResetCount}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Làm Mới Biến Đếm</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">
                        {isCompleted
                          ? "Đã lưu công đức vào Bộ Não Tâm An ✨"
                          : `Còn ${Math.max(0, targetCount - currentCount)} biến`}
                      </span>
                    </div>
                  </div>

                  {/* Thông điệp hồi hướng khi hoàn tất */}
                  {isCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full p-4.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm space-y-2 text-center"
                    >
                      <div className="font-bold text-emerald-300 flex items-center justify-center gap-2">
                        <Award className="w-4 h-4 text-emerald-400" />
                        <span>Nguyện Hồi Hướng Công Đức</span>
                      </div>
                      <p className="italic text-emerald-200/90 leading-relaxed font-serif">
                        &quot;Nguyện đem công đức trì niệm danh hiệu {selectedRemedy.shortTitle} này, tiêu trừ tất cả nghiệp chướng và nỗi lo sợ nơi tâm; biến chướng duyên thành trợ duyên, tâm hồn thanh tịnh, mọi sự đều nhẹ nhàng an lạc.&quot;
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              /* TAB 2: TRA CỨU TOÀN TẬP 500 DANH HIỆU QUÁN ÂM */
              <div className="space-y-5">
                {/* Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm danh hiệu, căn bệnh, tai ách, ước nguyện (ví dụ: Dương Liễu, Như Ý, đau bụng, ác mộng...)"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Dropdown/Selector */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <button
                      onClick={() => setSelectedCategoryFilter("ALL")}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategoryFilter === "ALL"
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-white/5 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Tất Cả (500)
                    </button>

                    {Object.entries(KARMIC_CATEGORIES).map(([key, info]) => {
                      const isSelected = selectedCategoryFilter === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedCategoryFilter(key as KarmicRemedyCategory)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                            isSelected
                              ? "bg-white/15 text-white border-amber-400"
                              : "bg-white/5 text-slate-400 border-transparent hover:text-slate-200"
                          }`}
                          style={{
                            borderColor: isSelected ? info.color : undefined,
                            color: isSelected ? info.color : undefined,
                          }}
                        >
                          {info.shortLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Counter indicator */}
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Hiển thị {filteredRecords.length} / 500 danh hiệu</span>
                  {selectedCategoryFilter !== "ALL" && (
                    <span className="text-amber-300 font-medium">
                      Pháp môn: {KARMIC_CATEGORIES[selectedCategoryFilter].title}
                    </span>
                  )}
                </div>

                {/* 500 Titles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
                  {filteredRecords.map((item) => {
                    const catInfo = KARMIC_CATEGORIES[item.category];
                    const isCurrent = selectedRemedy.id === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectRemedyFromLibrary(item)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 group ${
                          isCurrent
                            ? "bg-amber-500/10 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                            : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5">
                              #{item.id}
                            </span>
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full font-semibold border"
                              style={{
                                backgroundColor: `${catInfo.color}15`,
                                borderColor: `${catInfo.color}40`,
                                color: catInfo.color,
                              }}
                            >
                              {catInfo.shortLabel}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-amber-200 group-hover:text-amber-300 transition-colors">
                            {item.shortTitle}
                          </h4>

                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                            {item.originalText}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                          <span className="text-amber-400/90 font-mono font-medium">
                            {item.recommendedCount} biến
                          </span>
                          <span className="text-slate-400 group-hover:text-amber-300 flex items-center gap-1 font-semibold transition-colors">
                            Chọn trì niệm <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
