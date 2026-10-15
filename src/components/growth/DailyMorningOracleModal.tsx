"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Sun,
  Flame,
  Award,
  Share2,
  Check,
  X,
  Volume2,
  Calendar,
  Compass,
  ArrowRight,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";
import {
  getBrainMemory,
  recordBrainEvent,
  updateMindfulStreak,
  MindfulStreakInfo,
} from "@/utils/unifiedBrain";
import { CHU_DICH_64_QUE } from "@/utils/easternOccult";

// Danh sách danh ngôn định tâm & châm ngôn buổi sáng thức tỉnh
const MORNING_MANTRAS = [
  "Mỗi buổi sáng thức dậy là một cơ hội tái sinh tâm thức. Hãy thở nhẹ, mỉm cười và an trú trong hiện tại.",
  "Tâm bất biến giữa dòng đời vạn biến. Mọi sự đến và đi đều theo nhân duyên mầu nhiệm.",
  "Giữ lòng trong sạch như gương sáng, bụi trần không vướng bận, vạn vật tự nhiên thông suốt.",
  "Tĩnh lặng sinh trí tuệ, bình thản tạo phong thái, từ bi mang lại phúc lành bền lâu.",
  "Dù giông bão bên ngoài cuộn sóng, chỉ cần trong tâm còn một ngọn đèn tĩnh tại, đường đi sẽ luôn rạng ngời.",
  "Nuôi dưỡng lòng biết ơn mỗi sớm mai. Biết ơn hơi thở nhiệm mầu, biết ơn từng bước chân trên mặt đất.",
  "Đón nhận nghịch cảnh như viên đá mài ngọc. Vạn sự hanh thông bắt đầu từ một ý nghĩ thiện lành.",
];

export interface DailyMorningOracleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDivination?: () => void;
}

export default function DailyMorningOracleModal({
  isOpen,
  onClose,
  onNavigateToDivination,
}: DailyMorningOracleModalProps) {
  const [streak, setStreak] = useState<MindfulStreakInfo>({
    currentStreak: 1,
    lastClaimDate: "",
    historyDates: [],
    longestStreak: 1,
  });
  const [hasClaimedToday, setHasClaimedToday] = useState(false);
  const [copiedCard, setCopiedCard] = useState(false);
  const [oracleData, setOracleData] = useState<{
    mantra: string;
    hexagramName: string;
    hexagramNumber: number;
    upperTrigramName: string;
    lowerTrigramName: string;
    haoTitle: string;
    haoText: string;
    haoMeaning: string;
    haoCatHung: string;
    dailyFocus: string;
    luckyElement: string;
    luckyColor: string;
  } | null>(null);

  // Khởi tạo và tính toán Quẻ Khởi Tâm Ban Mai theo ngày dương lịch thực tế
  useEffect(() => {
    if (!isOpen) return;

    const todayStr = new Date().toISOString().slice(0, 10);
    const mem = getBrainMemory();
    const currentStreakInfo = mem.mindfulStreak || {
      currentStreak: 1,
      lastClaimDate: "",
      historyDates: [],
      longestStreak: 1,
    };
    setStreak(currentStreakInfo);
    setHasClaimedToday(currentStreakInfo.lastClaimDate === todayStr);

    // Tính toán quẻ hôm nay dựa trên hash ngày
    const now = new Date();
    const seed =
      now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    
    // Chọn câu châm ngôn
    const mantra = MORNING_MANTRAS[seed % MORNING_MANTRAS.length];

    // Trích xuất từ 64 quẻ dịch (tổng 384 hào từ)
    const hexKeys = Object.keys(CHU_DICH_64_QUE);
    const chosenKey = hexKeys[seed % hexKeys.length];
    const hex = CHU_DICH_64_QUE[chosenKey];

    // Chọn 1 hào may mắn trong 6 hào của quẻ
    const haoIndex = (seed % 6);
    const hao = hex.haoTu[haoIndex];

    const elements = ["Kim", "Thủy", "Mộc", "Hỏa", "Thổ"];
    const colors = ["Vàng Kim Hoàng Gia", "Xanh Ngọc Bích", "Tím Huyền Diệu", "Trắng Tinh Khiết", "Đỏ Hổ Phách"];
    
    const luckyEle = elements[seed % elements.length];
    const luckyCol = colors[seed % colors.length];

    const focusList = [
      "Tập trung đàm phán và giải quyết công việc trọng đại",
      "Nuôi dưỡng các mối quan hệ, lắng nghe người thương",
      "Tiết chế cảm xúc nóng vội, ẩn nhẫn bồi dưỡng nội lực",
      "Khởi tạo dự án mới, xuất hành đón tài lộc cát tường",
      "Tĩnh tâm buông thư, đọc sách và thanh lọc năng lượng",
    ];
    const dailyFocus = focusList[seed % focusList.length];

    setOracleData({
      mantra,
      hexagramName: hex.name,
      hexagramNumber: hex.number,
      upperTrigramName: hex.cungQuai,
      lowerTrigramName: hex.cungQuai,
      haoTitle: hao.name,
      haoText: hao.text,
      haoMeaning: hao.meaning,
      haoCatHung: hao.catHung,
      dailyFocus,
      luckyElement: luckyEle,
      luckyColor: luckyCol,
    });
  }, [isOpen]);

  const handleClaimBlessing = () => {
    zenAudio.playCrystalChime(880, 0.08);
    const todayStr = new Date().toISOString().slice(0, 10);
    const updated = updateMindfulStreak(todayStr);
    setStreak(updated);
    setHasClaimedToday(true);

    if (oracleData) {
      recordBrainEvent({
        type: "MORNING_ORACLE",
        data: {
          streakCount: updated.currentStreak,
          hexagramNumber: oracleData.hexagramNumber,
          hexagramName: oracleData.hexagramName,
          haoNumber: 1,
          haoTitle: oracleData.haoTitle,
          haoVerse: `${oracleData.haoText} - ${oracleData.haoMeaning}`,
          morningMantra: oracleData.mantra,
          dailyFocus: oracleData.dailyFocus,
          dateStr: todayStr,
        },
      });
    }
  };

  const handleCopyCard = () => {
    zenAudio.playSoftTap(720, 0.04);
    if (!oracleData) return;

    const cardContent = `🌟 [TÂM AN AI - QUẺ KHỞI TÂM BAN MAI] 🌟\n` +
      `📅 Ngày: ${new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })}\n` +
      `🔥 Chuỗi Tĩnh Tâm: Ngày ${streak.currentStreak} liên tiếp\n\n` +
      `🕊️ LỜI CHÂM NGÔN ĐỊNH TÂM:\n"${oracleData.mantra}"\n\n` +
      `☯️ HÀO TỪ MAY MẮN: ${oracleData.hexagramName} - ${oracleData.haoTitle}\n` +
      `📜 "${oracleData.haoText}"\n` +
      `💡 Diễn Giải: ${oracleData.haoMeaning} [Khí vận: ${oracleData.haoCatHung}]\n\n` +
      `🔮 TÂM ĐIỂM NGÀY MỚI: ${oracleData.dailyFocus}\n` +
      `✨ Ngũ Hành Cát Tường: ${oracleData.luckyElement} • Sắc Màu May Mắn: ${oracleData.luckyColor}\n\n` +
      `Khởi tâm an lạc tại: https://taman.ai`;

    navigator.clipboard.writeText(cardContent).then(() => {
      setCopiedCard(true);
      setTimeout(() => setCopiedCard(false), 2500);
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop mờ huyền ảo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            zenAudio.playSoftTap(440, 0.04);
            onClose();
          }}
          className="fixed inset-0 bg-[#030611]/85 backdrop-blur-xl"
        />

        {/* Modal Thân Quẻ Ban Mai */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#0b1329] via-[#070d1e] to-[#040711] border border-[#d4af37]/40 shadow-[0_0_60px_rgba(212,175,55,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] p-5 sm:p-8 z-10 overflow-hidden my-6"
        >
          {/* Hào quang nền phía trên */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-[#fcd34d]/25 to-transparent blur-3xl -z-10" />

          {/* Nút đóng */}
          <button
            onClick={() => {
              zenAudio.playSoftTap(500, 0.04);
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Đóng quẻ ban mai"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tiêu đề & Huy hiệu */}
          <div className="flex flex-col items-center text-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fef08a] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <Sun className="w-4 h-4 text-[#fcd34d] animate-spin-slow" />
              </span>
              <ZenBadge variant="gold" size="sm">
                Quẻ Khởi Tâm Ban Mai • Daily Awakening
              </ZenBadge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Khai Mở Năng Lượng Ngày Mới
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md font-normal">
              Đón nhận lời minh triết thức tỉnh đầu ngày và duy trì chuỗi ngày tĩnh tâm
            </p>
          </div>

          {/* Thanh Tiến Trình: Chuỗi Ngày Tĩnh Tâm (Mindful Streak 7 ngày) */}
          <div className="py-4 my-3 px-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
                <span className="text-sm font-semibold text-[#fef08a] font-serif">
                  Chuỗi Ngày Tĩnh Tâm: Ngày {streak.currentStreak}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Kỷ lục: {streak.longestStreak} ngày
              </span>
            </div>

            {/* Vòng tròn 7 ngày */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
                const isCompleted = streak.currentStreak >= dayNum;
                const isToday = streak.currentStreak === dayNum;
                return (
                  <div
                    key={dayNum}
                    className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-b from-[#d4af37]/25 to-amber-950/30 border border-[#d4af37]/60 text-[#fef08a] shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                        : "bg-white/[0.02] border border-white/5 text-slate-400"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider mb-1">
                      N.{dayNum}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? "bg-[#d4af37] text-slate-950 shadow-[0_0_8px_#fcd34d]"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : dayNum}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nội dung Thiệp Quẻ Ban Mai */}
          {oracleData && (
            <div className="space-y-4 my-2">
              {/* Lời Châm Ngôn Định Tâm */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#d4af37]/15 to-amber-500/10 border border-[#d4af37]/40 text-center relative overflow-hidden">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#fcd34d] block mb-1">
                  — Lời Châm Ngôn Định Tâm —
                </span>
                <p className="text-sm sm:text-base font-serif italic text-slate-100 leading-relaxed font-medium">
                  "{oracleData.mantra}"
                </p>
              </div>

              {/* Hào Từ May Mắn Hôm Nay (Trích từ 384 bản quái kiện) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#030611]/80 border border-white/10 shadow-inner">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-serif font-bold text-[#fef08a]">
                      {oracleData.hexagramName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                      {oracleData.haoTitle}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold font-mono ${
                      oracleData.haoCatHung.includes("Cát")
                        ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                        : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                    }`}
                  >
                    {oracleData.haoCatHung}
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <p className="font-mono text-amber-200/90 italic">
                    "{oracleData.haoText}"
                  </p>
                  <p className="text-slate-300 leading-relaxed font-normal">
                    <strong className="text-white font-medium">Minh triết chỉ điểm:</strong>{" "}
                    {oracleData.haoMeaning}
                  </p>
                </div>

                {/* Điểm chỉ dẫn năng lượng */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block text-[10px] font-mono">ĐỊNH HƯỚNG:</span>
                    <span className="text-white font-medium">{oracleData.dailyFocus}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block text-[10px] font-mono">NGŨ HÀNH:</span>
                    <span className="text-emerald-300 font-semibold">{oracleData.luckyElement} Cát Vượng</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-slate-400 block text-[10px] font-mono">SẮC MÀU:</span>
                    <span className="text-[#fcd34d] font-semibold">{oracleData.luckyColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Các nút hành động */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 mt-4">
            <button
              onClick={handleCopyCard}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-slate-200 hover:text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedCard ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Đã Sao Chép Thiệp!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Chia Sẻ Thiệp Ngày Mới</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {!hasClaimedToday ? (
                <ZenButton
                  variant="gold"
                  size="md"
                  onClick={handleClaimBlessing}
                  icon={Sparkles}
                  className="w-full sm:w-auto shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                >
                  Đón Nhận Năng Lượng (+1 Ngày)
                </ZenButton>
              ) : (
                <button
                  disabled
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-default"
                >
                  <Check className="w-4 h-4" />
                  Đã Điểm Tâm Hôm Nay
                </button>
              )}

              {onNavigateToDivination && (
                <ZenButton
                  variant="glass"
                  size="md"
                  onClick={() => {
                    onClose();
                    onNavigateToDivination();
                  }}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="hidden sm:inline-flex text-xs"
                >
                  Chiêm Bốc Sâu
                </ZenButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
