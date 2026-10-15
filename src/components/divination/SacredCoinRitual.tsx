"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Flame,
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";
import {
  TIEN_THIEN_BAT_QUAI,
  QUAINAME_MAP,
  getQuaiNumberFromTrigram,
} from "@/utils/lienHoaDonPhap";
import { CHU_DICH_64_QUE } from "@/utils/easternOccult";

export type LineType = "LaoAm" | "ThieuDuong" | "ThieuAm" | "LaoDuong";

export interface CoinStepResult {
  stepIndex: number; // 1 đến 6 (từ Sơ hào đến Thượng hào)
  coins: [number, number, number]; // [2|3, 2|3, 2|3] (2=Âm/Lưng, 3=Dương/Chữ)
  sum: 6 | 7 | 8 | 9;
  lineType: LineType;
  bit: 0 | 1; // 0=Âm, 1=Dương
  resultingBit: 0 | 1; // Bit sau khi biến quái
  isMoving: boolean; // true nếu sum === 6 hoặc sum === 9
  nameVi: string;
}

export interface SacredHexagramResult {
  steps: CoinStepResult[];
  chanhKey: string;
  chanhName: string;
  hoKey: string;
  hoName: string;
  bienKey: string;
  bienName: string;
  movingLines: number[]; // 1..6
  pChanhTri: number[]; // [h6, h5, h4]
  tChanhTri: number[]; // [h3, h2, h1]
  pBienTri: number[];
  tBienTri: number[];
  pHoTri: number[];
  tHoTri: number[];
  question: string;
}

interface SacredCoinRitualProps {
  question?: string;
  onCompleteHexagram: (result: SacredHexagramResult) => void;
  onCancel?: () => void;
}

const LINE_NAMES = [
  "Hào Sơ (Gốc Rễ Sự Việc)",
  "Hào Nhị (Nội Tâm & Nhân Tâm)",
  "Hào Tam (Bước Ngoặt Nội Giới)",
  "Hào Tứ (Cửa Ngõ Thăng Tiến)",
  "Hào Ngũ (Quân Vị & Quyết Định)",
  "Hào Thượng (Hậu Vận & Biến Chuyển)",
];

export default function SacredCoinRitual({
  question = "Cầu bình an, tài lộc hanh thông và sáng tỏ vận trình...",
  onCompleteHexagram,
  onCancel,
}: SacredCoinRitualProps) {
  // Giai đoạn: 'breath' (Tam Khí Quy Nguyên) -> 'toss' (Gieo 3 Đồng Xu) -> 'completed'
  const [stage, setStage] = useState<"breath" | "toss" | "completed">("breath");

  // State Tam Khí Quy Nguyên (3 Nhịp Thở 4-4-4)
  const [breathCycle, setBreathCycle] = useState<number>(1);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathSeconds, setBreathSeconds] = useState<number>(4);
  const [isBreathPaused, setIsBreathPaused] = useState<boolean>(false);

  // State Gieo Xu Khang Hy
  const [currentStep, setCurrentStep] = useState<number>(1); // 1..6
  const [tossHistory, setTossHistory] = useState<CoinStepResult[]>([]);
  const [currentCoins, setCurrentCoins] = useState<[number, number, number]>([3, 2, 3]);
  const [isTossing, setIsTossing] = useState<boolean>(false);
  const [lastStepResult, setLastStepResult] = useState<CoinStepResult | null>(null);

  // Tham chiếu timer nhịp thở
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ---------------------------------------------------------------------------
  // 1. TAM KHÍ QUY NGUYÊN (NHỊP THỞ 4-4-4 ĐỊNH TÂM)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (stage !== "breath" || isBreathPaused) return;

    breathTimerRef.current = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Chuyển pha
        if (breathPhase === "inhale") {
          setBreathPhase("hold");
          zenAudio.playTibetanBowl(432, 0.12);
          return 4;
        } else if (breathPhase === "hold") {
          setBreathPhase("exhale");
          zenAudio.playTibetanBowl(324, 0.1);
          return 4;
        } else {
          // exhale xong
          if (breathCycle < 3) {
            setBreathCycle((c) => c + 1);
            setBreathPhase("inhale");
            zenAudio.playTibetanBowl(432, 0.14);
            return 4;
          } else {
            // Đủ 3 chu kỳ
            zenAudio.playHarmonicChord();
            setStage("toss");
            return 0;
          }
        }
      });
    }, 1000);

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [stage, breathPhase, breathCycle, isBreathPaused]);

  // Âm thanh chuông khi mở đầu
  useEffect(() => {
    if (stage === "breath") {
      zenAudio.playTibetanBowl(432, 0.15);
    }
  }, [stage]);

  const handleSkipBreath = () => {
    if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    zenAudio.playTibetanBowl(432, 0.15);
    setStage("toss");
  };

  // ---------------------------------------------------------------------------
  // 2. GIEO 3 ĐỒNG XU KHANG HY (LỤC HÀO CHIÊM BỐC)
  // ---------------------------------------------------------------------------
  const handleTossCoins = useCallback(() => {
    if (isTossing || currentStep > 6) return;

    setIsTossing(true);
    zenAudio.playCoinClink(1.0);

    // Hiệu ứng xoay xu liên tục trong 700ms
    const interval = setInterval(() => {
      const c1 = Math.random() > 0.5 ? 3 : 2;
      const c2 = Math.random() > 0.5 ? 3 : 2;
      const c3 = Math.random() > 0.5 ? 3 : 2;
      setCurrentCoins([c1, c2, c3]);
    }, 70);

    setTimeout(() => {
      clearInterval(interval);
      // Kết quả gieo thực tế lần này
      const c1 = (Math.random() > 0.5 ? 3 : 2) as 2 | 3;
      const c2 = (Math.random() > 0.5 ? 3 : 2) as 2 | 3;
      const c3 = (Math.random() > 0.5 ? 3 : 2) as 2 | 3;
      const coins: [number, number, number] = [c1, c2, c3];
      const sum = (c1 + c2 + c3) as 6 | 7 | 8 | 9;

      let lineType: LineType = "ThieuDuong";
      let bit: 0 | 1 = 1;
      let resultingBit: 0 | 1 = 1;
      let isMoving = false;
      let nameVi = "Thiếu Dương (Dương Tĩnh)";

      if (sum === 6) {
        // 3 Âm -> Lão Âm (Âm Động biến thành Dương)
        lineType = "LaoAm";
        bit = 0;
        resultingBit = 1;
        isMoving = true;
        nameVi = "Lão Âm (Âm Động ✕ → Biến Dương)";
      } else if (sum === 7) {
        // 1 Dương 2 Âm -> Thiếu Dương
        lineType = "ThieuDuong";
        bit = 1;
        resultingBit = 1;
        isMoving = false;
        nameVi = "Thiếu Dương (Dương Tĩnh —)";
      } else if (sum === 8) {
        // 2 Dương 1 Âm -> Thiếu Âm
        lineType = "ThieuAm";
        bit = 0;
        resultingBit = 0;
        isMoving = false;
        nameVi = "Thiếu Âm (Âm Tĩnh - -)";
      } else if (sum === 9) {
        // 3 Dương -> Lão Dương (Dương Động biến thành Âm)
        lineType = "LaoDuong";
        bit = 1;
        resultingBit = 0;
        isMoving = true;
        nameVi = "Lão Dương (Dương Động ◯ → Biến Âm)";
      }

      const stepResult: CoinStepResult = {
        stepIndex: currentStep,
        coins,
        sum,
        lineType,
        bit,
        resultingBit,
        isMoving,
        nameVi,
      };

      setCurrentCoins(coins);
      setLastStepResult(stepResult);
      const newHistory = [...tossHistory, stepResult];
      setTossHistory(newHistory);
      setIsTossing(false);
      zenAudio.playCoinClink(0.85);

      // Nếu đã xong hào 6 -> tổng hợp quẻ
      if (currentStep === 6) {
        finishHexagram(newHistory);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }, 850);
  }, [currentStep, isTossing, tossHistory]);

  // ---------------------------------------------------------------------------
  // 3. TỔNG HỢP QUẺ CHÁNH - HỔ - BIẾN & THOÁN TỪ
  // ---------------------------------------------------------------------------
  const finishHexagram = (allSteps: CoinStepResult[]) => {
    // allSteps sắp xếp từ Hào 1 (stepIndex=1) lên Hào 6 (stepIndex=6)
    // Hào 1, 2, 3: Hạ quái. Trigram theo chuẩn [h3, h2, h1] (từ trên xuống dưới)
    // Hào 4, 5, 6: Thượng quái. Trigram theo chuẩn [h6, h5, h4] (từ trên xuống dưới)
    const h1 = allSteps[0].bit;
    const h2 = allSteps[1].bit;
    const h3 = allSteps[2].bit;
    const h4 = allSteps[3].bit;
    const h5 = allSteps[4].bit;
    const h6 = allSteps[5].bit;

    // Chánh Quái
    const tChanhTri = [h3, h2, h1];
    const pChanhTri = [h6, h5, h4];
    const tChanhNum = getQuaiNumberFromTrigram(tChanhTri);
    const pChanhNum = getQuaiNumberFromTrigram(pChanhTri);
    const chanhKey = `${pChanhNum}${tChanhNum}`;
    const chanhName = QUAINAME_MAP[chanhKey] || CHU_DICH_64_QUE[chanhKey]?.name || "CHU DỊCH LINH QUẺ";

    // Hổ Quái (Nuclear Hexagram):
    // Thượng Hổ tạo từ hào 5, 4, 3 -> [h5, h4, h3]
    // Hạ Hổ tạo từ hào 4, 3, 2 -> [h4, h3, h2]
    const pHoTri = [h5, h4, h3];
    const tHoTri = [h4, h3, h2];
    const pHoNum = getQuaiNumberFromTrigram(pHoTri);
    const tHoNum = getQuaiNumberFromTrigram(tHoTri);
    const hoKey = `${pHoNum}${tHoNum}`;
    const hoName = QUAINAME_MAP[hoKey] || CHU_DICH_64_QUE[hoKey]?.name || "HỔ QUÁI NỘI ĐỀ";

    // Biến Quái (Transformed Hexagram):
    const bh1 = allSteps[0].resultingBit;
    const bh2 = allSteps[1].resultingBit;
    const bh3 = allSteps[2].resultingBit;
    const bh4 = allSteps[3].resultingBit;
    const bh5 = allSteps[4].resultingBit;
    const bh6 = allSteps[5].resultingBit;

    const tBienTri = [bh3, bh2, bh1];
    const pBienTri = [bh6, bh5, bh4];
    const tBienNum = getQuaiNumberFromTrigram(tBienTri);
    const pBienNum = getQuaiNumberFromTrigram(pBienTri);
    const bienKey = `${pBienNum}${tBienNum}`;
    const bienName = QUAINAME_MAP[bienKey] || CHU_DICH_64_QUE[bienKey]?.name || chanhName;

    const movingLines = allSteps.filter((s) => s.isMoving).map((s) => s.stepIndex);

    const result: SacredHexagramResult = {
      steps: allSteps,
      chanhKey,
      chanhName,
      hoKey,
      hoName,
      bienKey,
      bienName,
      movingLines,
      pChanhTri,
      tChanhTri,
      pBienTri,
      tBienTri,
      pHoTri,
      tHoTri,
      question,
    };

    setStage("completed");
    zenAudio.playHarmonicChord();

    setTimeout(() => {
      onCompleteHexagram(result);
    }, 1200);
  };

  const handleReset = () => {
    zenAudio.playCrystalClick(1200, 0.08);
    setTossHistory([]);
    setCurrentStep(1);
    setLastStepResult(null);
    setStage("breath");
    setBreathCycle(1);
    setBreathPhase("inhale");
    setBreathSeconds(4);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#091124] to-[#040814] border border-[#d4af37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 backdrop-blur-2xl relative overflow-hidden text-slate-100">
      {/* Tia sáng thiên văn cổ phong */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-gradient-to-b from-[#d4af37]/20 via-[#38bdf8]/10 to-transparent blur-3xl" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40 font-bold">
              NGHI THỨC KHANG HY • 3 ĐỒNG XU CỔ & TAM KHÍ
            </span>
            <span className="text-xs text-slate-400 font-mono">Dịch Lý Chuẩn Mực</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            {stage === "breath"
              ? "Tam Khí Quy Nguyên (Định Tâm 3 Hơi Thở)"
              : "Lắc 3 Đồng Tiền Khang Hy Gieo Lục Hào"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 italic line-clamp-1">
            &ldquo;{question}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {stage === "toss" && (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Gieo Lại</span>
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-3 py-1.5 rounded-xl bg-white/5 text-xs text-slate-400 hover:text-white"
            >
              Đóng
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BƯỚC 1: TAM KHÍ QUY NGUYÊN                                                 */}
      {/* ========================================================================= */}
      {stage === "breath" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="py-10 flex flex-col items-center justify-center text-center relative z-10"
        >
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-8 leading-relaxed font-light">
            Cổ nhân dạy: <strong className="text-[#fef08a]">&ldquo;Tâm động quẻ mới ứng&rdquo;</strong>. Trước khi gieo tiền cổ, hãy hít thở 3 nhịp sâu để thanh lọc tâm thức, đưa sóng não về trạng thái an tĩnh 432Hz.
          </p>

          {/* Vòng tròn hơi thở tương tác */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
            {/* Vòng hào quang bên ngoài */}
            <motion.div
              animate={{
                scale:
                  breathPhase === "inhale"
                    ? 1.4
                    : breathPhase === "hold"
                    ? 1.45
                    : 1.0,
                opacity:
                  breathPhase === "inhale"
                    ? 0.8
                    : breathPhase === "hold"
                    ? 0.95
                    : 0.35,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/30 via-[#f59e0b]/20 to-[#38bdf8]/30 blur-2xl"
            />

            {/* Vành hoa văn Bát Quái xoay chậm */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-[#d4af37]/30 border-dashed"
            />

            {/* Quả cầu tâm thức chính */}
            <motion.div
              animate={{
                scale:
                  breathPhase === "inhale"
                    ? 1.25
                    : breathPhase === "hold"
                    ? 1.28
                    : 0.85,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] border-2 border-[#d4af37]/70 shadow-[0_0_50px_rgba(212,175,55,0.4)] flex flex-col items-center justify-center relative p-4"
            >
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#fef08a]">
                NHỊP THỞ {breathCycle} / 3
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white my-1">
                {breathSeconds}s
              </div>
              <span className="text-xs font-serif font-bold text-[#38bdf8] uppercase tracking-wider">
                {breathPhase === "inhale"
                  ? "HÍT VÀO SÂU"
                  : breathPhase === "hold"
                  ? "GIỮ TÂM ĐỊNH"
                  : "THỞ RA NHẸ"}
              </span>
            </motion.div>
          </div>

          {/* Lời chỉ dẫn theo từng pha */}
          <div className="h-10 mt-4 flex items-center justify-center">
            <p className="text-sm sm:text-base font-serif text-slate-200 italic">
              {breathPhase === "inhale" &&
                "“Hít sâu thanh khí đất trời, thâu nạp linh quang vạn vật...”"}
              {breathPhase === "hold" &&
                "“Định tâm vào câu hỏi người trăn trở, khởi phát tâm giao cảm...”"}
              {breathPhase === "exhale" &&
                "“Thở ra nhẹ nhàng, buông hết toan tính muộn phiền...”"}
            </p>
          </div>

          {/* Nút bỏ qua / tâm đã định */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleSkipBreath}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#b38f28] text-slate-950 font-serif font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tâm Đã Định, Bắt Đầu Gieo Xu</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* BƯỚC 2: GIEO 3 ĐỒNG XU KHANG HY & HIỂN THỊ LỤC HÀO                          */}
      {/* ========================================================================= */}
      {stage === "toss" && (
        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* CỘT TRÁI: DĨA ĐỒNG & 3 ĐỒNG XU CỔ (7 Cột) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-300 mb-3 px-2">
              <span>
                TIẾN TRÌNH: <strong className="text-[#fef08a]">{currentStep}/6</strong>
              </span>
              <span className="text-[#38bdf8] font-bold">
                {LINE_NAMES[currentStep - 1] || "Hoàn Tất Lục Hào"}
              </span>
            </div>

            {/* DĨA ĐỒNG MẠ VÀNG CHỨA 3 ĐỒNG XU */}
            <div
              onClick={handleTossCoins}
              className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-[#2a1e0c] via-[#1a1408] to-[#0c0903] border-4 border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.35),inset_0_0_40px_rgba(0,0,0,0.9)] flex items-center justify-center relative cursor-pointer group transition-all active:scale-98"
            >
              {/* Vành khắc vi mô & hoa văn cổ */}
              <div className="absolute inset-3 rounded-full border border-[#d4af37]/30 border-dashed pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />

              {/* 3 ĐỒNG XU CỔ KHANG HY */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                {currentCoins.map((coinValue, idx) => {
                  const offsets = [
                    { x: -38, y: -22, rot: -14 },
                    { x: 38, y: -22, rot: 18 },
                    { x: 0, y: 35, rot: 5 },
                  ];
                  const offset = offsets[idx];
                  const isDuong = coinValue === 3;

                  return (
                    <motion.div
                      key={idx}
                      animate={
                        isTossing
                          ? {
                              x: [offset.x, offset.x + (Math.random() * 40 - 20), offset.x],
                              y: [offset.y, offset.y + (Math.random() * 40 - 20), offset.y],
                              rotate: [offset.rot, offset.rot + 720, offset.rot],
                              scale: [1, 1.25, 1],
                            }
                          : {
                              x: offset.x,
                              y: offset.y,
                              rotate: offset.rot,
                              scale: 1,
                            }
                      }
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#d4af37] via-[#b38f28] to-[#785918] border-2 border-[#fef08a] shadow-[0_4px_15px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center select-none"
                    >
                      {/* Lỗ vuông đồng xu cổ */}
                      <div className="w-6 h-6 rounded-sm bg-[#120e06] border border-[#fef08a]/80 shadow-inner flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      </div>

                      {/* Chữ Hán Khang Hy Thông Bảo hoặc Mặt Lưng */}
                      {isDuong ? (
                        <>
                          <span className="absolute top-1 text-[9px] font-serif font-black text-amber-950">
                            康
                          </span>
                          <span className="absolute bottom-1 text-[9px] font-serif font-black text-amber-950">
                            熙
                          </span>
                          <span className="absolute left-1 text-[9px] font-serif font-black text-amber-950">
                            通
                          </span>
                          <span className="absolute right-1 text-[9px] font-serif font-black text-amber-950">
                            寶
                          </span>
                        </>
                      ) : (
                        <>
                          {/* Chữ Mãn cổ mặt lưng */}
                          <span className="absolute top-1.5 text-[8px] font-serif font-black text-amber-950">
                            ᠪᠣᠣ
                          </span>
                          <span className="absolute bottom-1.5 text-[8px] font-serif font-black text-amber-950">
                            ᠴᡳᠣᠠᠨ
                          </span>
                        </>
                      )}

                      {/* Nhãn Dương / Âm nhỏ */}
                      <div
                        className={`absolute -bottom-2 px-1.5 py-0.2 rounded-full text-[8px] font-mono font-bold ${
                          isDuong
                            ? "bg-amber-400 text-slate-950"
                            : "bg-slate-700 text-slate-200"
                        }`}
                      >
                        {isDuong ? "Dương (3)" : "Âm (2)"}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Lời gợi ý nhấn dĩa */}
              <div className="absolute bottom-4 text-[10px] font-mono text-[#fef08a]/70 group-hover:text-[#fef08a] transition-colors flex items-center gap-1">
                <span>Nhấn dĩa để lắc xu</span>
              </div>
            </div>

            {/* NÚT LẮC XU */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <button
                onClick={handleTossCoins}
                disabled={isTossing || currentStep > 6}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b38f28] text-slate-950 font-serif font-bold text-sm shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {isTossing
                    ? "Đang Gieo Xu Va Chạm..."
                    : `Gieo Hào Thứ ${currentStep} (${LINE_NAMES[currentStep - 1] || "6"})`}
                </span>
              </button>

              {lastStepResult && (
                <div className="text-xs font-mono text-slate-300 mt-1">
                  Kết quả lần {lastStepResult.stepIndex}:{" "}
                  <strong
                    className={
                      lastStepResult.isMoving ? "text-rose-400 font-bold" : "text-[#fef08a]"
                    }
                  >
                    {lastStepResult.nameVi} (Tổng: {lastStepResult.sum})
                  </strong>
                </div>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: BẢNG THEO DÕI 6 HÀO TÍCH LŨY (5 Cột) */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#d4af37]" />
                  <span>Trụ Quái Đang Dựng (Từ Dưới Lên)</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {tossHistory.length}/6 Hào
                </span>
              </div>

              {/* BẢNG 6 HÀO HIỂN THỊ TỪ TRÊN (HÀO 6) XUỐNG DƯỚI (HÀO 1) */}
              <div className="space-y-2.5">
                {[6, 5, 4, 3, 2, 1].map((lineNum) => {
                  const step = tossHistory.find((s) => s.stepIndex === lineNum);
                  const isCurrentTarget = currentStep === lineNum;

                  return (
                    <div
                      key={lineNum}
                      className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        step
                          ? step.isMoving
                            ? "bg-rose-950/30 border-rose-500/40"
                            : "bg-white/[0.03] border-white/10"
                          : isCurrentTarget
                          ? "bg-[#d4af37]/10 border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                          : "bg-black/20 border-white/5 opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 w-12">
                          Hào {lineNum}:
                        </span>
                        {/* Biểu diễn trực quan nét hào */}
                        {step ? (
                          <div className="w-24 flex items-center justify-center">
                            {step.bit === 1 ? (
                              // Hào Dương
                              <div
                                className={`h-2 w-full rounded-sm ${
                                  step.isMoving
                                    ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                                    : "bg-[#fef08a]"
                                }`}
                              />
                            ) : (
                              // Hào Âm
                              <div className="flex justify-between w-full h-2">
                                <div
                                  className={`h-2 w-[44%] rounded-sm ${
                                    step.isMoving ? "bg-rose-500" : "bg-[#94a3b8]"
                                  }`}
                                />
                                <div
                                  className={`h-2 w-[44%] rounded-sm ${
                                    step.isMoving ? "bg-rose-500" : "bg-[#94a3b8]"
                                  }`}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-24 h-2 border border-dashed border-white/20 rounded-sm" />
                        )}
                      </div>

                      <div className="text-right">
                        {step ? (
                          <span
                            className={`text-[10px] font-mono font-bold ${
                              step.isMoving ? "text-rose-400" : "text-slate-300"
                            }`}
                          >
                            {step.lineType === "LaoDuong" && "◯ Lão Dương (Động)"}
                            {step.lineType === "LaoAm" && "✕ Lão Âm (Động)"}
                            {step.lineType === "ThieuDuong" && "Thiếu Dương"}
                            {step.lineType === "ThieuAm" && "Thiếu Âm"}
                          </span>
                        ) : isCurrentTarget ? (
                          <span className="text-[10px] font-mono text-[#fef08a] animate-pulse">
                            Đang chờ gieo...
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-600">Chưa gieo</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chú giải luật dịch hào động */}
            <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-400 space-y-1">
              <div>
                • <strong className="text-white">Lão Dương (9)</strong>: 3 mặt Chữ → Dương động biến Âm (◯)
              </div>
              <div>
                • <strong className="text-white">Lão Âm (6)</strong>: 3 mặt Lưng → Âm động biến Dương (✕)
              </div>
              <div>
                • <strong className="text-white">Thiếu Dương (7) / Thiếu Âm (8)</strong>: Hào tĩnh bất biến
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GIAI ĐOẠN HOÀN TẤT: ĐANG CHUYỂN TIẾP VÀO BỘ LUẬN 3 TẦNG                     */}
      {/* ========================================================================= */}
      {stage === "completed" && (
        <div className="py-12 flex flex-col items-center justify-center text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_30px_rgba(52,211,153,0.5)]">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            Lục Hào Đã Đủ • Khí Tượng Đã Định
          </h3>
          <p className="text-sm text-slate-300 max-w-md">
            Đang tổng hợp phương trình thức Chánh - Hổ - Biến và kích hoạt bộ luận giải 3 tầng chạm đáy tâm can...
          </p>
        </div>
      )}
    </div>
  );
}
