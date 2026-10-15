"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HeartHandshake, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Flame,
  ArrowRight
} from "lucide-react";
import { addMeritPoints } from "@/utils/meritSystem";
import { zenAudio } from "@/utils/zenAudio";

interface MeritDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTierIndex?: number;
}

interface DonationPackage {
  amount: number;
  label: string;
  sublabel: string;
  meritPoints: number;
  badge: string;
  popular?: boolean;
}

const DONATION_PACKAGES: DonationPackage[] = [
  {
    amount: 10000,
    label: "10.000 đ",
    sublabel: "Gieo Duyên Khởi Tâm",
    meritPoints: 100,
    badge: "Hạt Mầm Bồ Đề",
  },
  {
    amount: 20000,
    label: "20.000 đ",
    sublabel: "Tinh Tấn Hộ Trì",
    meritPoints: 250,
    badge: "Bạch Liên Hoa",
    popular: true,
  },
  {
    amount: 50000,
    label: "50.000 đ",
    sublabel: "Phước Đức Viên Mãn",
    meritPoints: 700,
    badge: "Hoàng Kim Tuệ Căn",
  },
  {
    amount: 100000,
    label: "100.000 đ",
    sublabel: "Đại Thí Tự Tại",
    meritPoints: 1800,
    badge: "Vô Vi Đại Giác",
  },
];

export default function MeritDonationModal({
  isOpen,
  onClose,
  defaultTierIndex = 1,
}: MeritDonationModalProps) {
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(defaultTierIndex);
  const [guestName, setGuestName] = useState("");
  const [guestWish, setGuestWish] = useState("Cầu bình an gia đạo vạn sự hanh thông");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const currentPkg = DONATION_PACKAGES[selectedPkgIndex];
  
  // Thông tin VietQR tài khoản cúng dường / duy trì server
  const bankAccount = "9988776655";
  const bankName = "MBBank";
  const accountHolder = "TAM AN DAO TRANG";
  const transferContent = `TAMAN ${guestName ? guestName.replace(/\s+/g, "").toUpperCase().slice(0, 8) : "DUYEN"}${currentPkg.amount / 1000}`;
  
  // Link tạo QR code tự động VietQR QuickLink
  const vietQrUrl = `https://img.vietqr.io/image/${bankName}-${bankAccount}-compact2.png?amount=${currentPkg.amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(accountHolder)}`;

  const handleConfirmDonation = () => {
    zenAudio.playTibetanBowl(216, 0.2);
    addMeritPoints(
      "DIVINATION",
      `Tùy tâm cúng dường gieo duyên ${currentPkg.sublabel} (${currentPkg.label})`,
      currentPkg.meritPoints
    );
    setIsConfirmed(true);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(transferContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#070d1e] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="relative px-6 py-5 bg-gradient-to-r from-amber-950/60 via-[#0d1630] to-amber-950/40 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-200 tracking-wide flex items-center gap-2">
                  Tùy Tâm Cúng Dường & Hộ Trì Máy Chủ
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    Phước Duyên
                  </span>
                </h3>
                <p className="text-xs text-amber-300/70">
                  Gieo hạt mầm thiện lành, trợ duyên vận hành hệ thống AI Tâm An phi lợi nhuận
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-amber-400/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {!isConfirmed ? (
              <>
                {/* Lời dẫn cổ phong */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed italic">
                  &ldquo;Phật pháp tại thế gian, không rời thế gian giác. Mỗi duyên lành gieo xuống nơi đây đều được dùng trọn vẹn để chi trả máy chủ GPU vận hành các thuật toán Dịch học, Tử vi và giọng đọc Thầy Sinh phục vụ bá tánh miễn phí.&rdquo;
                </div>

                {/* Gói cúng dường */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-300/90 uppercase tracking-wider flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-400" /> Chọn mức tùy tâm gieo duyên:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {DONATION_PACKAGES.map((pkg, idx) => {
                      const isSelected = selectedPkgIndex === idx;
                      return (
                        <button
                          key={pkg.amount}
                          onClick={() => {
                            setSelectedPkgIndex(idx);
                            zenAudio.playCrystalClick(1960, 0.08);
                          }}
                          className={`relative p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/10"
                              : "bg-white/5 border-white/10 hover:border-amber-500/40 hover:bg-white/10"
                          }`}
                        >
                          {pkg.popular && (
                            <span className="absolute -top-2 right-2 text-[9px] font-bold px-1.5 py-0.2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black rounded-full shadow">
                              Được chọn nhiều
                            </span>
                          )}
                          <div>
                            <div className="text-sm font-bold text-white">{pkg.label}</div>
                            <div className="text-[11px] text-amber-300/80 mt-0.5">{pkg.sublabel}</div>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                            <span className="text-amber-400/90 font-medium flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> +{pkg.meritPoints}
                            </span>
                            <span className="text-slate-400 font-mono text-[9px]">{pkg.badge}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form thông tin người gieo duyên */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Pháp danh / Tên người cầu an:
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Ví dụ: Thiện Tâm, Minh Đức..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Tâm nguyện hồi hướng:
                    </label>
                    <input
                      type="text"
                      value={guestWish}
                      onChange={(e) => setGuestWish(e.target.value)}
                      placeholder="Lời ước nguyện..."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Khu vực VietQR & Chuyển khoản */}
                <div className="p-4 rounded-xl bg-black/50 border border-amber-500/20 flex flex-col sm:flex-row items-center gap-5">
                  <div className="relative group shrink-0">
                    <img
                      src={vietQrUrl}
                      alt="VietQR Tùy Tâm Cúng Dường"
                      className="w-36 h-36 rounded-lg bg-white p-1.5 shadow-md border border-amber-400/50"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-[10px] text-white font-medium text-center p-2">
                      Quét bằng app Ngân Hàng hoặc MoMo
                    </div>
                  </div>

                  <div className="space-y-2 text-xs flex-1 w-full">
                    <div className="flex justify-between items-center py-1 border-b border-white/10">
                      <span className="text-slate-400">Ngân hàng:</span>
                      <span className="font-semibold text-amber-200">{bankName}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/10">
                      <span className="text-slate-400">Số tài khoản:</span>
                      <span className="font-mono font-bold text-white tracking-wider">{bankAccount}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/10">
                      <span className="text-slate-400">Số tiền:</span>
                      <span className="font-bold text-amber-400">{currentPkg.label}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-white/10">
                      <span className="text-slate-400">Nội dung CK:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-yellow-300 font-semibold bg-yellow-500/20 px-2 py-0.5 rounded border border-yellow-500/30">
                          {transferContent}
                        </span>
                        <button
                          onClick={handleCopyContent}
                          className="text-[10px] text-amber-400 hover:text-white underline"
                        >
                          {isCopied ? "Đã chép!" : "Chép"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nút xác nhận đã gieo duyên */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Tự động tích lũy <strong className="text-amber-300">+{currentPkg.meritPoints}</strong> điểm công đức
                  </div>
                  <button
                    onClick={handleConfirmDonation}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-black font-bold text-xs shadow-lg hover:shadow-amber-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Tôi Đã Hoàn Tất Gieo Duyên
                  </button>
                </div>
              </>
            ) : (
              /* Màn hình Xác Nhận Thành Công */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-amber-200">
                    Công Đức Vô Lượng • Phước Lành Tự Tại
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Kính chúc quý đồng môn {guestName || "vô danh"} thân tâm an lạc, nguyện ước &ldquo;{guestWish}&rdquo; sớm ngày viên thành cát tường.
                  </p>
                </div>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                  <Award className="w-4 h-4" /> Đã tích lũy +{currentPkg.meritPoints} điểm công đức & Huân Chương {currentPkg.badge}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsConfirmed(false);
                      onClose();
                    }}
                    className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                  >
                    Hoàn Tất & Đóng Lại
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
