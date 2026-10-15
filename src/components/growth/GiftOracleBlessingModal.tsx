"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Heart,
  Share2,
  Sparkles,
  QrCode,
  Check,
  X,
  Copy,
  Users,
  Compass,
  Download,
  Send,
  MessageCircle,
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";

export type GiftRelationshipType = "cha-me" | "nguoi-yeu" | "con-cai" | "ban-be";
export type GiftPrayerType = "suc-khoe" | "cong-danh" | "binh-an" | "hanh-phuc";

interface RelationshipOption {
  id: GiftRelationshipType;
  label: string;
  iconName: string;
  defaultRole: string;
}

interface PrayerOption {
  id: GiftPrayerType;
  label: string;
  sublabel: string;
  color: string;
}

const RELATIONSHIPS: RelationshipOption[] = [
  { id: "cha-me", label: "Cha Mẹ", iconName: "🙏", defaultRole: "Kính chúc Song Thân" },
  { id: "nguoi-yeu", label: "Người Yêu / Vợ Chồng", iconName: "💖", defaultRole: "Gửi Thương Yêu" },
  { id: "con-cai", label: "Con Cái", iconName: "🌱", defaultRole: "Thương gửi Con Yêu" },
  { id: "ban-be", label: "Bạn Bè / Đồng Nghiệp", iconName: "🤝", defaultRole: "Thân gửi Bạn Hiền" },
];

const PRAYERS: PrayerOption[] = [
  { id: "suc-khoe", label: "Cầu Sức Khỏe", sublabel: "Thân tâm khang kiện, bách niên giai lão", color: "#34d399" },
  { id: "cong-danh", label: "Cầu Công Danh", sublabel: "Sự nghiệp hanh thông, quý nhân nâng đỡ", color: "#fcd34d" },
  { id: "binh-an", label: "Cầu Bình An", sublabel: "Hộ trì tiêu tai, tâm vô quái ngại", color: "#38bdf8" },
  { id: "hanh-phuc", label: "Cầu Hạnh Phúc", sublabel: "Gia đạo thuận hòa, yêu thương gắn kết", color: "#f472b6" },
];

// Thư viện các câu chúc phúc tương ứng
const BLESSING_TEMPLATES: Record<GiftPrayerType, { hexagram: string; verse: string; advice: string }> = {
  "suc-khoe": {
    hexagram: "Địa Lôi Phục (Sấm động hồi sinh, dương khí bừng nở)",
    verse: "Bảy ngày phục lại hanh thông, sinh lực dồi dào, thân thể kiện khang, tiêu trừ bệnh tật.",
    advice: "Nguyện chúc thân tâm người thương như cây đại thụ đón nắng xuân, gốc rễ an định, cành lá sum suê.",
  },
  "cong-danh": {
    hexagram: "Hỏa Thiên Đại Hữu (Mặt trời giữa thiên không, tài lộc đại vượng)",
    verse: "Mặt trời chiếu sáng bốn phương, danh vọng rạng rỡ, gặp thời đắc lợi, vạn sự thành công.",
    advice: "Chúc người hữu duyên công thành danh toại, chí lớn như trời cao, đức sáng như thái dương soi rọi.",
  },
  "binh-an": {
    hexagram: "Địa Thiên Thái (Trời đất giao hòa, vạn sự thái bình)",
    verse: "Khí nhỏ lui đi, điềm lành tràn tới, trong ngoài thuận hòa, bốn mùa an nhiên vô sự.",
    advice: "Nguyện chúc tâm người thương luôn như mặt hồ phẳng lặng, sóng gió không lay, một đời an ổn.",
  },
  "hanh-phuc": {
    hexagram: "Phong Hỏa Gia Nhân (Ngọn lửa ấm trong nhà, đạo gia đạo viên mãn)",
    verse: "Trong ấm ngoài êm, mẹ hiền con thảo, vợ chồng hòa thuận, tiếng cười rộn rã khắp nhà.",
    advice: "Chúc gia đạo luôn tràn ngập từ tâm và thấu hiểu, yêu thương như suối nguồn tưới mát tâm hồn.",
  },
};

export interface GiftOracleBlessingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftOracleBlessingModal({
  isOpen,
  onClose,
}: GiftOracleBlessingModalProps) {
  const [recipient, setRecipient] = useState("");
  const [relationship, setRelationship] = useState<GiftRelationshipType>("cha-me");
  const [prayer, setPrayer] = useState<GiftPrayerType>("binh-an");
  const [senderName, setSenderName] = useState("");
  const [generatedGift, setGeneratedGift] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const currentBlessing = BLESSING_TEMPLATES[prayer];
  const selectedRelObj = RELATIONSHIPS.find((r) => r.id === relationship)!;

  const handleCreateGift = () => {
    zenAudio.playCrystalChime(920, 0.08);
    setGeneratedGift(true);
  };

  const giftShareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/lien-sinh-don-giap?giftRecipient=${encodeURIComponent(recipient || selectedRelObj.label)}&prayer=${prayer}`
    : "https://taman.ai";

  const handleCopyShare = () => {
    zenAudio.playSoftTap(720, 0.04);
    const content =
      `🎁 [TÂM AN AI - HỘP QUÀ TÂM THỨC CHÚC PHÚC]\n` +
      `Người gửi: ${senderName || "Người thương yêu giấu tên"}\n` +
      `Thương gửi tặng: ${recipient || selectedRelObj.label}\n` +
      `Nguyện ước: ${PRAYERS.find((p) => p.id === prayer)?.label}\n\n` +
      `Quẻ Cát Tường: ${currentBlessing.hexagram}\n` +
      `Lời chúc phúc: "${currentBlessing.advice}"\n\n` +
      `Mời bạn mở thiệp chúc phúc và đón nhận năng lượng tại:\n${giftShareUrl}`;

    navigator.clipboard.writeText(content).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#0e162d] via-[#080e22] to-[#040816] border border-[#d4af37]/45 shadow-[0_0_60px_rgba(212,175,55,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] p-5 sm:p-8 z-10 overflow-hidden my-6"
        >
          {/* Subtle Aura */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-b from-rose-500/20 via-[#d4af37]/20 to-transparent blur-3xl -z-10" />

          {/* Close button */}
          <button
            onClick={() => {
              zenAudio.playSoftTap(500, 0.04);
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col items-center text-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </span>
              <ZenBadge variant="gold" size="sm">
                Gieo Duyên Cho Người Thân • Soulful Gift
              </ZenBadge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Gieo Quẻ Chúc Phúc & Gửi Trao Năng Lượng
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md font-normal">
              Khởi tâm lành gieo quẻ cầu an cho cha mẹ, người thương, con cái và sinh Hộp Quà Tâm Thức 4K
            </p>
          </div>

          {!generatedGift ? (
            /* Bước 1: Chọn thông tin người nhận và nguyện ước */
            <div className="space-y-4 py-4">
              {/* Chọn đối tượng */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                  1. Bạn Muốn Gieo Quẻ Cho Ai?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {RELATIONSHIPS.map((rel) => {
                    const isSelected = relationship === rel.id;
                    return (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => {
                          zenAudio.playSoftTap(560, 0.03);
                          setRelationship(rel.id);
                        }}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 border transition-all text-center cursor-pointer ${
                          isSelected
                            ? "bg-[#d4af37]/20 border-[#fcd34d] text-[#fef08a] shadow-[0_0_15px_rgba(212,175,55,0.3)] scale-[1.02]"
                            : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/25"
                        }`}
                      >
                        <span className="text-2xl">{rel.iconName}</span>
                        <span className="text-xs font-serif font-bold">{rel.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nhập tên người nhận & người gửi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Họ Tên / Biệt Danh Người Nhận
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder={`Ví dụ: ${selectedRelObj.defaultRole}...`}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Tên Của Bạn (Người Gieo Duyên)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Tên của bạn hoặc để trống..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                  />
                </div>
              </div>

              {/* Chọn nguyện ước */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                  2. Chọn Nguyện Ước Chúc Phúc
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRAYERS.map((p) => {
                    const isSelected = prayer === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          zenAudio.playSoftTap(620, 0.03);
                          setPrayer(p.id);
                        }}
                        className={`p-3 rounded-2xl flex items-start gap-3 border transition-all text-left cursor-pointer ${
                          isSelected
                            ? "bg-[#d4af37]/20 border-[#fcd34d] text-white shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                            : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20"
                        }`}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-full mt-1 shrink-0 border border-white/40"
                          style={{ backgroundColor: p.color }}
                        />
                        <div>
                          <span className="text-sm font-serif font-bold block">{p.label}</span>
                          <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                            {p.sublabel}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Tạo Hộp Quà */}
              <div className="pt-2">
                <ZenButton
                  variant="gold"
                  size="lg"
                  onClick={handleCreateGift}
                  icon={Gift}
                  className="w-full shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                >
                  Sinh Hộp Quà Tâm Thức 4K & Tạo Quẻ
                </ZenButton>
              </div>
            </div>
          ) : (
            /* Bước 2: Hiển thị Hộp Quà Tâm Thức 4K & Chia sẻ */
            <div className="space-y-4 py-4">
              {/* Thẻ Quà 4K Tinh Tế */}
              <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#121f3d] via-[#091124] to-[#040816] border-2 border-[#d4af37]/60 shadow-[0_0_35px_rgba(212,175,55,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] text-center overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15)_0%,_transparent_70%)]" />

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs font-mono">
                  <span className="text-slate-400">
                    Người gửi: <strong className="text-white">{senderName || "Ẩn danh từ tâm"}</strong>
                  </span>
                  <span className="text-[#fcd34d] font-semibold">
                    Thương gửi: {recipient || selectedRelObj.label}
                  </span>
                </div>

                <div className="my-3">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                    — QUẺ CÁT TƯỜNG KHAI NĂNG LƯỢNG —
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#fef08a] mb-2">
                    {currentBlessing.hexagram}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono italic max-w-lg mx-auto leading-relaxed">
                    "{currentBlessing.verse}"
                  </p>
                </div>

                <div className="p-3.5 my-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-serif text-slate-200">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 inline mr-1.5" />
                  {currentBlessing.advice}
                </div>

                {/* Giả lập Mã QR Code Cổ Phong */}
                <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-white/10">
                  <div className="p-2 rounded-xl bg-white border border-slate-300 text-slate-950 flex items-center justify-center shadow-lg">
                    <QrCode className="w-12 h-12" />
                  </div>
                  <div className="text-left text-[11px] font-mono text-slate-300">
                    <span className="text-[#fcd34d] font-bold block">Quét QR Hoặc Bấm Chia Sẻ</span>
                    <span>Hộp Quà Tâm Thức 4K đã sẵn sàng để gửi trao qua Zalo / Messenger.</span>
                  </div>
                </div>
              </div>

              {/* Các nút tương tác chia sẻ */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCopyShare}
                  className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-[#d4af37] hover:bg-[#fcd34d] text-slate-950 font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã Sao Chép Lời Chúc & Link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Sao Chép Thiệp Gửi Zalo / Messenger</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setGeneratedGift(false)}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
                >
                  Tạo Quẻ Khác
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
