"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Sparkles,
  Flame,
  Globe,
  Compass,
  ArrowRight,
  Share2,
  Download,
  RotateCcw,
  BookOpen,
  Award,
  Zap,
  Heart,
  Volume2,
} from "lucide-react";
import ClientNavbar from "@/components/ui/ClientNavbar";
import SacredLotusLogo from "@/components/ui/SacredLotusLogo";
import GoldenScrollEnhancer from "@/components/ui/GoldenScrollEnhancer";
import { zenAudio } from "@/utils/zenAudio";
import { recordBrainEvent } from "@/utils/unifiedBrain";
import { speakReading } from "@/utils/sacredVoice";
import {
  generateSolarNumerologyProfile,
  SolarNumerologyResult,
  SolarBirthInput,
  SUN_SIGNS_DICT,
} from "@/utils/solarNumerology";

export default function SoHocMatTroiPage() {
  const [fullName, setFullName] = useState("");
  const [solarDay, setSolarDay] = useState(15);
  const [solarMonth, setSolarMonth] = useState(8);
  const [solarYear, setSolarYear] = useState(2002);
  const [birthHour, setBirthHour] = useState(9);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SolarNumerologyResult | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "numerology" | "astrology" | "lifemap">("overview");
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handleCalculate = () => {
    zenAudio.playSoftTap();
    setIsAnalyzing(true);
    setTimeout(() => {
      const input: SolarBirthInput = {
        fullName: fullName.trim() || "Gen Z Khai Sáng",
        solarDay,
        solarMonth,
        solarYear,
        birthHour,
      };
      const res = generateSolarNumerologyProfile(input);
      setResult(res);
      setIsAnalyzing(false);
      zenAudio.playTibetanBowl(216, 0.18);

      // Đồng bộ vào Bộ Não Tâm An Unified Brain
      recordBrainEvent({
        type: "SOLAR_NUMEROLOGY",
        data: {
          fullName: res.personalInfo.fullName,
          sunSign: res.astrology.sunSign.nameVi,
          lifePathNumber: res.numerology.lifePath.number,
          personalYear2026: res.numerology.personalYear2026,
          cosmicIdentity: res.lifeMap.cosmicIdentity,
          summary: `Cung Mặt Trời ${res.astrology.sunSign.nameVi} (${res.astrology.sunSign.archetype}) • Số Chủ Đạo ${res.numerology.lifePath.number} • Năm 2026: Năm số ${res.numerology.personalYear2026}`,
        },
      });
    }, 1200);
  };

  const handleVoiceGuidance = () => {
    if (!result) return;
    if (isPlayingVoice) {
      window.speechSynthesis?.cancel();
      setIsPlayingVoice(false);
      return;
    }
    const speechText = `Chào bạn ${result.personalInfo.fullName}. Bản đồ Số Học Mặt Trời của bạn mang năng lượng Cung Mặt Trời ${result.astrology.sunSign.nameVi}, biểu trưng cho ${result.astrology.sunSign.archetype}. Con số chủ đạo của bạn là số ${result.numerology.lifePath.number}, ${result.numerology.lifePath.title}. Năm 2026 là ${result.numerology.personalYearTheme}. Lời khuyên dành cho bạn: ${result.lifeMap.sacredAffirmation}`;
    speakReading(speechText, () => setIsPlayingVoice(false));
    setIsPlayingVoice(true);
  };

  return (
    <div className="min-h-screen bg-[#03050c] text-white selection:bg-[#d4af37]/30 selection:text-white">
      <ClientNavbar />
      <GoldenScrollEnhancer />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#fcd34d] text-sm font-medium mb-4"
          >
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>Xu Hướng Chiêm Nghiệm Gen Z • Bản Đồ Cuộc Đời & Thấu Cảm Bản Thân</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4"
          >
            Số Học <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">Mặt Trời</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            Tích hợp Thần Số Học Pythagoras (Số Chủ Đạo 1..33), Bộ Ba Chiêm Tinh (Sun • Moon • Rising Sign), 
            và Bản Đồ Năng Lượng Đời Người. Thấu hiểu bản ngã, chữa lành nội tâm và khai phóng tiềm năng vô hạn.
          </motion.p>
        </div>

        {/* INPUT FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#070d1e]/80 border border-[#d4af37]/30 shadow-2xl backdrop-blur-xl mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-amber-200/90 mb-1.5">
                Họ và Tên Đầy Đủ (để tính Chỉ số Linh Hồn & Sứ Mệnh)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Hoàng Nam hoặc Trần Minh Anh..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/80 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Ngày Sinh (Dương Lịch)</label>
              <input
                type="number"
                min={1}
                max={31}
                value={solarDay}
                onChange={(e) => setSolarDay(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Tháng Sinh</label>
              <select
                value={solarMonth}
                onChange={(e) => setSolarMonth(parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Năm Sinh (Dương Lịch)</label>
              <input
                type="number"
                min={1950}
                max={2030}
                value={solarYear}
                onChange={(e) => setSolarYear(parseInt(e.target.value) || 2000)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Giờ Sinh (Tính Cung Mọc)</label>
              <select
                value={birthHour}
                onChange={(e) => setBirthHour(parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400"
              >
                {[...Array(24)].map((_, i) => (
                  <option key={i} value={i}>
                    {i}:00 ({i < 12 ? "Sáng" : "Chiều/Tối"})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={isAnalyzing}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-base shadow-lg hover:shadow-amber-500/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Đang Chiết Xuất Tần Số Năng Lượng Mặt Trời...</span>
              </>
            ) : (
              <>
                <Sun className="w-5 h-5 text-slate-950" />
                <span>Khai Mở Bản Đồ Số Học Mặt Trời</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>

        {/* RESULTS SECTION */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* HEADER HUD BANNER */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c132c] via-[#091024] to-[#040817] border border-amber-400/40 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Sun className="w-72 h-72 text-amber-400" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>Danh Hiệu Năng Lượng Vũ Trụ</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-200">
                      {result.lifeMap.cosmicIdentity}
                    </h2>
                    <p className="text-slate-300 text-sm mt-1">
                      Đồng môn: <strong className="text-white">{result.personalInfo.fullName}</strong> • Sinh ngày {result.personalInfo.birthDateStr} lúc {result.personalInfo.birthHourStr}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleVoiceGuidance}
                      className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlayingVoice ? "Dừng Giọng Đọc" : "Nghe Lời Khai Thị"}</span>
                    </button>
                    <button
                      onClick={() => {
                        zenAudio.playCrystalChime(660, 0.08);
                        navigator.clipboard?.writeText(window.location.href);
                        alert("Đã sao chép liên kết Bản Đồ Số Học Mặt Trời!");
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 hover:text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Chia Sẻ</span>
                    </button>
                  </div>
                </div>

                {/* TAB SWITCHER */}
                <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-800/80 pb-3">
                  {[
                    { id: "overview", label: "Tổng Quan Bản Mệnh", icon: Sun },
                    { id: "numerology", label: "Thần Số Học Pythagoras", icon: Compass },
                    { id: "astrology", label: "Bộ Ba Chiêm Tinh (Sun • Moon • Rising)", icon: Globe },
                    { id: "lifemap", label: "Bản Đồ Thành Công & Chữa Lành", icon: Award },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          zenAudio.playCrystalClick(1960, 0.06);
                          setActiveTab(tab.id as any);
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                          isActive
                            ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20"
                            : "bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TAB CONTENT: OVERVIEW */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="p-6 rounded-2xl bg-[#070d1e]/90 border border-amber-400/30">
                    <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sun className="w-4 h-4" />
                      <span>Cung Mặt Trời (Sun Sign)</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {result.astrology.sunSign.symbol} {result.astrology.sunSign.nameVi} ({result.astrology.sunSign.nameEn})
                    </div>
                    <p className="text-xs text-amber-300/80 mb-3 font-mono">{result.astrology.sunSign.dates} • {result.astrology.sunSign.element}</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{result.astrology.sunSign.vibe}</p>
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200">
                      <strong>Siêu năng lực:</strong> {result.astrology.sunSign.superpower}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#070d1e]/90 border border-amber-400/30">
                    <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Zap className="w-4 h-4" />
                      <span>Con Số Chủ Đạo (Life Path)</span>
                    </div>
                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 mb-1">
                      Số {result.numerology.lifePath.number}
                    </div>
                    <p className="text-xs text-amber-200 font-medium mb-3">{result.numerology.lifePath.title}</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{result.numerology.lifePath.coreVibration}</p>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <strong>Màu & Đá Hộ Mệnh:</strong> {result.numerology.lifePath.crystalAndColor.color} • {result.numerology.lifePath.crystalAndColor.crystal}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#070d1e]/90 border border-amber-400/30">
                    <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4" />
                      <span>Năm Cá Nhân 2026</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      Năm Số {result.numerology.personalYear2026}
                    </div>
                    <p className="text-xs text-slate-400 mb-3">Vận Thế Năm Bính Ngọ 2026</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{result.numerology.personalYearTheme}</p>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-300">
                      <strong>Chu kỳ phát triển:</strong> {result.numerology.growthCycle}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB CONTENT: NUMEROLOGY */}
              {activeTab === "numerology" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#070d1e]/90 border border-amber-400/30">
                    <h3 className="text-xl font-bold text-amber-200 mb-4 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-amber-400" />
                      <span>Bộ Tứ Chỉ Số Cốt Lõi Pythagoras</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase font-semibold">1. Số Chủ Đạo</span>
                        <div className="text-2xl font-bold text-amber-300 my-1">Số {result.numerology.lifePath.number}</div>
                        <p className="text-xs text-slate-300">{result.numerology.lifePath.coreVibration}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase font-semibold">2. Số Linh Hồn</span>
                        <div className="text-2xl font-bold text-purple-300 my-1">Số {result.numerology.soulUrgeNumber}</div>
                        <p className="text-xs text-slate-300">{result.numerology.soulUrgeMeaning}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase font-semibold">3. Số Sứ Mệnh</span>
                        <div className="text-2xl font-bold text-cyan-300 my-1">Số {result.numerology.expressionNumber}</div>
                        <p className="text-xs text-slate-300">{result.numerology.expressionMeaning}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase font-semibold">4. Số Thái Độ</span>
                        <div className="text-2xl font-bold text-emerald-300 my-1">Số {result.numerology.attitudeNumber}</div>
                        <p className="text-xs text-slate-300">{result.numerology.attitudeMeaning}</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/20">
                      <h4 className="text-sm font-bold text-amber-200 mb-2">Sứ Mệnh Cuộc Đời (Life Mission):</h4>
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">{result.numerology.lifePath.lifeMission}</p>
                      <h4 className="text-sm font-bold text-amber-200 mb-2">Bài Học Cốt Tủy Của Linh Hồn:</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{result.numerology.lifePath.soulLesson}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB CONTENT: ASTROLOGY */}
              {activeTab === "astrology" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-[#070d1e]/90 border border-amber-400/30">
                      <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                        ☀️ Cung Mặt Trời (Sun Sign)
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {result.astrology.sunSign.nameVi} ({result.astrology.sunSign.symbol})
                      </div>
                      <p className="text-xs text-slate-400 mb-3">Bản ngã, cá tính cốt lõi và ý chí sống</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{result.astrology.sunSign.vibe}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#070d1e]/90 border border-purple-400/30">
                      <div className="text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
                        🌙 Cung Mặt Trăng (Moon Sign)
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {result.astrology.moonSign.nameVi} ({result.astrology.moonSign.nameEn})
                      </div>
                      <p className="text-xs text-slate-400 mb-3">Nội tâm, cảm xúc thầm kín và đứa trẻ bên trong</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{result.astrology.moonSign.emotionalNeed}</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#070d1e]/90 border border-cyan-400/30">
                      <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
                        🌅 Cung Mọc (Rising Sign)
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {result.astrology.risingSign.nameVi} ({result.astrology.risingSign.nameEn})
                      </div>
                      <p className="text-xs text-slate-400 mb-3">Vỏ bọc xã hội và ấn tượng lần đầu gặp gỡ</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{result.astrology.risingSign.firstImpression}</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#070d1e]/90 border border-amber-400/30">
                    <h3 className="text-base font-bold text-amber-200 mb-4">Cân Bằng 4 Nguyên Tố Phương Tây:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-xs text-red-400 font-bold">LỬA (Fire)</span>
                        <div className="text-xl font-bold text-white mt-1">{result.astrology.elementBalance.fire}%</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-xs text-amber-500 font-bold">ĐẤT (Earth)</span>
                        <div className="text-xl font-bold text-white mt-1">{result.astrology.elementBalance.earth}%</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-xs text-cyan-400 font-bold">KHÍ (Air)</span>
                        <div className="text-xl font-bold text-white mt-1">{result.astrology.elementBalance.air}%</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                        <span className="text-xs text-blue-400 font-bold">NƯỚC (Water)</span>
                        <div className="text-xl font-bold text-white mt-1">{result.astrology.elementBalance.water}%</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB CONTENT: LIFEMAP */}
              {activeTab === "lifemap" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#070d1e]/90 border border-amber-400/30">
                    <h3 className="text-xl font-bold text-amber-200 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      <span>Bản Đồ Thành Công & Lộ Trình Chữa Lành Cá Nhân Hóa</span>
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                        <h4 className="text-sm font-bold text-red-300 mb-1">Nút Thắt Tâm Lý Thường Gặp (Core Dilemma):</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{result.lifeMap.coreDilemma}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                        <h4 className="text-sm font-bold text-emerald-300 mb-1">Lộ Trình Tự Chữa Lành & Thăng Hoa (Healing Pathway):</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">{result.lifeMap.healingPathway}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                        <h4 className="text-sm font-bold text-amber-200 mb-2">Định Hướng Nghề Nghiệp Khuyên Dùng:</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.lifeMap.idealCareerTracks.map((career, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-medium">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/30 border border-amber-400/40 text-center">
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block mb-2">
                          ✨ Câu Thần Chú Khẳng Định Tích Cực (Sacred Affirmation)
                        </span>
                        <blockquote className="text-lg sm:text-xl font-serif italic text-amber-100 font-medium">
                          &ldquo;{result.lifeMap.sacredAffirmation}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
