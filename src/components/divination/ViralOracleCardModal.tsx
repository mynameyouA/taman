"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Share2,
  Copy,
  Check,
  X,
  Sparkles,
  Award,
  Feather,
  Eye,
  RotateCcw,
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";

export interface ViralCardData {
  hexagramName: string;
  upperTrigramName: string;
  lowerTrigramName: string;
  hexagramLines: number[]; // 6 lines from top to bottom [h6, h5, h4, h3, h2, h1] (1: Yang, 0: Yin)
  movingLines?: number[]; // [1..6]
  poemVerse: string[]; // 4 câu thơ tứ tuyệt
  blessingWish?: string;
  querentName?: string;
  tagline?: string;
}

interface ViralOracleCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: ViralCardData;
}

export default function ViralOracleCardModal({
  isOpen,
  onClose,
  cardData,
}: ViralOracleCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  // Vẽ thiệp 4K trên Canvas (1080 x 1920)
  useEffect(() => {
    if (!isOpen) return;
    setIsGenerating(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1920;
    canvas.width = W;
    canvas.height = H;

    // 1. BACKGROUND GRADIENT (Deep Obsidian to Midnight Navy)
    const bgGrad = ctx.createRadialGradient(W / 2, H * 0.45, 120, W / 2, H / 2, W * 0.95);
    bgGrad.addColorStop(0, "#0c152a");
    bgGrad.addColorStop(0.5, "#060b18");
    bgGrad.addColorStop(1, "#02040a");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. GOLDEN DUST & NEBULA PARTICLES
    for (let i = 0; i < 90; i++) {
      const px = Math.random() * W;
      const py = Math.random() * H;
      const pr = Math.random() * 2.2 + 0.5;
      const alpha = Math.random() * 0.5 + 0.15;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(254, 240, 138, ${alpha})`;
      ctx.fill();
    }

    // 3. SACRED GEOMETRY / BÁT QUÁI WATERMARK (Center Subtle Aura)
    ctx.save();
    ctx.translate(W / 2, 600);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.08)";
    ctx.lineWidth = 1.5;
    for (let r of [160, 240, 310]) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    // 8 Tia Bát Quái
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * 310, Math.sin(angle) * 310);
      ctx.stroke();
    }
    ctx.restore();

    // 4. KHUNG VIỀN MẠ VÀNG KÉP (Double Gold Border)
    const margin = 52;
    ctx.strokeStyle = "rgba(212, 175, 55, 0.75)";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(margin, margin, W - margin * 2, H - margin * 2);

    ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(margin + 12, margin + 12, W - (margin + 12) * 2, H - (margin + 12) * 2);

    // 4 Góc hoa văn mạ vàng cổ phong
    const cornerSize = 40;
    const drawCorner = (x: number, y: number, dirX: number, dirY: number) => {
      ctx.strokeStyle = "#fef08a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y + dirY * cornerSize);
      ctx.lineTo(x, y);
      ctx.lineTo(x + dirX * cornerSize, y);
      ctx.stroke();

      // Điểm hạt vàng nhỏ trang trí
      ctx.fillStyle = "#fef08a";
      ctx.beginPath();
      ctx.arc(x + dirX * 12, y + dirY * 12, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    drawCorner(margin + 18, margin + 18, 1, 1);
    drawCorner(W - (margin + 18), margin + 18, -1, 1);
    drawCorner(margin + 18, H - (margin + 18), 1, -1);
    drawCorner(W - (margin + 18), H - (margin + 18), -1, -1);

    // 5. HEADER: BRAND & TÊN THIỆP
    ctx.textAlign = "center";
    ctx.fillStyle = "#fef08a";
    ctx.font = "bold 26px 'Cinzel', 'Noto Serif', serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("TÂM AN AI • LINH QUẺ TIÊN TRI", W / 2, 150);

    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.font = "16px monospace";
    ctx.letterSpacing = "3px";
    ctx.fillText("HUYỀN CƠ DỊCH LÝ • THỔI HỒN KHAI TUỆ", W / 2, 185);

    // Đường gạch trang trí
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.beginPath();
    ctx.moveTo(W / 2 - 140, 215);
    ctx.lineTo(W / 2 + 140, 215);
    ctx.stroke();

    // 6. TÊN QUẺ THƯ PHÁP
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 58px 'Noto Serif', 'Playfair Display', serif";
    ctx.letterSpacing = "4px";
    ctx.fillText(cardData.hexagramName.toUpperCase(), W / 2, 310);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 24px 'Noto Serif', serif";
    ctx.letterSpacing = "2px";
    ctx.fillText(
      `Thượng ${cardData.upperTrigramName}  •  Hạ ${cardData.lowerTrigramName}`,
      W / 2,
      355
    );

    // 7. VẼ 6 HÀO CỦA QUẺ TRỰC QUAN (Lục Hào)
    // hexagramLines: từ Hào 6 (trên cùng) xuống Hào 1 (dưới cùng)
    const lineStartX = W / 2 - 130;
    const lineWidth = 260;
    const lineGap = 16;
    const lineStartTop = 420;
    const lineHeight = 16;

    cardData.hexagramLines.forEach((bit, idx) => {
      const lineNum = 6 - idx; // 6, 5, 4, 3, 2, 1
      const isMoving = cardData.movingLines?.includes(lineNum);
      const y = lineStartTop + idx * (lineHeight + lineGap);

      if (bit === 1) {
        // Hào Dương: Thanh liền
        ctx.fillStyle = isMoving ? "#f43f5e" : "#fef08a";
        ctx.shadowColor = isMoving ? "rgba(244, 63, 94, 0.9)" : "rgba(254, 240, 138, 0.5)";
        ctx.shadowBlur = isMoving ? 18 : 8;
        ctx.fillRect(lineStartX, y, lineWidth, lineHeight);
        ctx.shadowBlur = 0;
      } else {
        // Hào Âm: Thanh đứt
        const halfWidth = (lineWidth - 26) / 2;
        ctx.fillStyle = isMoving ? "#f43f5e" : "#94a3b8";
        ctx.shadowColor = isMoving ? "rgba(244, 63, 94, 0.9)" : "rgba(148, 163, 184, 0.3)";
        ctx.shadowBlur = isMoving ? 18 : 6;
        ctx.fillRect(lineStartX, y, halfWidth, lineHeight);
        ctx.fillRect(lineStartX + halfWidth + 26, y, halfWidth, lineHeight);
        ctx.shadowBlur = 0;
      }

      // Ký hiệu Hào động
      if (isMoving) {
        ctx.fillStyle = "#f43f5e";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "left";
        ctx.fillText(`(Động ${lineNum})`, lineStartX + lineWidth + 15, y + 13);
        ctx.textAlign = "center";
      }
    });

    // 8. KHUNG BÀI THƠ TỨ TUYỆT TIÊN TRI (The Prophecy Verse)
    const poemBoxY = 660;
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(110, poemBoxY, W - 220, 360);

    ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(110, poemBoxY, W - 220, 360);

    // Dấu ngoặc kép phong cách thư pháp
    ctx.fillStyle = "rgba(212, 175, 55, 0.25)";
    ctx.font = "italic 90px 'Noto Serif', serif";
    ctx.fillText("“", 170, poemBoxY + 90);
    ctx.fillText("”", W - 170, poemBoxY + 340);

    // Tiêu đề thơ
    ctx.fillStyle = "#fef08a";
    ctx.font = "bold 20px 'Cinzel', serif";
    ctx.letterSpacing = "3px";
    ctx.fillText("THIÊN CƠ KHẢI THỊ", W / 2, poemBoxY + 60);

    // 4 Câu thơ
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 29px 'Noto Serif', 'Merriweather', serif";
    ctx.letterSpacing = "1.5px";

    const defaultVerses = [
      "Vạn sự tùy duyên tâm bất động,",
      "Gió lặng mây quang ánh nguyệt trong.",
      "Kiên định chính tâm qua giông bão,",
      "Thời cơ hội tụ ắt hanh thông.",
    ];
    const versesToDraw =
      cardData.poemVerse && cardData.poemVerse.length >= 4
        ? cardData.poemVerse
        : defaultVerses;

    versesToDraw.forEach((line, vIdx) => {
      ctx.fillText(line, W / 2, poemBoxY + 125 + vIdx * 54);
    });

    // 9. LỜI CHÚC PHÚC & KHAI THỊ (Blessing)
    const blessingY = 1100;
    ctx.fillStyle = "#fcd34d";
    ctx.font = "bold 24px 'Noto Serif', serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("LỜI CHÚC PHÚC BÌNH AN", W / 2, blessingY);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "20px 'Noto Serif', serif";
    ctx.letterSpacing = "0.8px";
    const wish =
      cardData.blessingWish ||
      "Nguyện cầu người hữu duyên tâm định tuệ khai, vạn dặm bình an, chuyển hung thành cát.";
    ctx.fillText(wish, W / 2, blessingY + 45);

    // 10. TRIỆN SON ĐỎ: "TÂM AN KHAI TUỆ" (Antique Vermilion Seal Stamp)
    const sealX = W / 2 - 80;
    const sealY = 1240;
    const sealSize = 160;

    // Bóng đổ triện son
    ctx.shadowColor = "rgba(185, 28, 28, 0.5)";
    ctx.shadowBlur = 25;

    // Nền triện đỏ son viền góc bo
    ctx.fillStyle = "#991b1b"; // Đỏ chu sa
    ctx.beginPath();
    ctx.roundRect(sealX, sealY, sealSize, sealSize, 22);
    ctx.fill();

    // Viền triện kép vàng cổ
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#fef08a";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.strokeStyle = "rgba(254, 240, 138, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(sealX + 8, sealY + 8, sealSize - 16, sealSize - 16, 16);
    ctx.stroke();

    // Chữ thư pháp triện 4 chữ: "TÂM AN KHAI TUỆ"
    ctx.fillStyle = "#fef08a";
    ctx.font = "bold 32px 'Noto Serif', serif";
    ctx.fillText("TÂM", sealX + 46, sealY + 65);
    ctx.fillText("AN", sealX + 114, sealY + 65);
    ctx.fillText("KHAI", sealX + 46, sealY + 125);
    ctx.fillText("TUỆ", sealX + 114, sealY + 125);

    // 11. PHẦN DƯỚI: MÃ QR ĐỒNG BỘ & THÔNG ĐIỆP CHIA SẺ
    const footerY = 1530;
    // Khung QR giả lập nghệ thuật cao cấp
    const qrSize = 130;
    const qrX = W / 2 - qrSize / 2;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(qrX, footerY, qrSize, qrSize);

    // Vẽ mô phỏng matrix QR
    ctx.fillStyle = "#0a1122";
    // 3 góc định vị
    const drawFinder = (fx: number, fy: number) => {
      ctx.fillRect(fx, fy, 32, 32);
      ctx.clearRect(fx + 6, fy + 6, 20, 20);
      ctx.fillRect(fx + 10, fy + 10, 12, 12);
    };
    drawFinder(qrX + 6, footerY + 6);
    drawFinder(qrX + qrSize - 38, footerY + 6);
    drawFinder(qrX + 6, footerY + qrSize - 38);

    // Hạt QR ngẫu nhiên tinh tế
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (Math.sin(r * 5 + c * 3) > 0.1) {
          ctx.fillRect(qrX + 44 + c * 5, footerY + 44 + r * 5, 4, 4);
        }
      }
    }

    ctx.fillStyle = "#fef08a";
    ctx.font = "bold 20px monospace";
    ctx.letterSpacing = "2px";
    ctx.fillText("QUÉT MÃ ĐỂ CÙNG GIEO QUẺ DUYÊN LÀNH", W / 2, footerY + 175);

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "16px monospace";
    ctx.letterSpacing = "1.5px";
    ctx.fillText("TAM-AN-AI • NỀN TẢNG HUYỀN HỌC & TRỊ LIỆU TÂM THỨC", W / 2, footerY + 210);

    // Hoàn tất vẽ, tạo dataURL PNG sắc nét
    setTimeout(() => {
      try {
        const url = canvas.toDataURL("image/png");
        setDataUrl(url);
      } catch (err) {
        console.error("Lỗi xuất ảnh canvas:", err);
      }
      setIsGenerating(false);
    }, 150);
  }, [isOpen, cardData]);

  // Tải ảnh về máy
  const handleDownload = () => {
    zenAudio.playCrystalClick(1500, 0.1);
    if (!dataUrl) return;

    const safeName = cardData.hexagramName.replace(/\s+/g, "_");
    const link = document.createElement("a");
    link.download = `Thiep_Tam_An_${safeName}_4K.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sao chép link và thông điệp gieo duyên
  const handleCopyShare = async () => {
    zenAudio.playCrystalChime(852, 0.1);
    const textToCopy = `🌸 Quẻ Duyên Lành: ${cardData.hexagramName.toUpperCase()}\nThơ tiên tri: "${cardData.poemVerse?.[0] || "Vạn sự tùy duyên"}"\nCùng gieo quẻ và giải mã vận trình tại Tâm An AI: ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Chia sẻ 1-click qua Web Share API (Zalo, Messenger, AirDrop trên điện thoại)
  const handleNativeShare = async () => {
    zenAudio.playCrystalChime(960, 0.08);
    const textToShare = `🌸 Quẻ Duyên Lành: ${cardData.hexagramName.toUpperCase()}\nThơ tiên tri: "${cardData.poemVerse?.[0] || "Vạn sự tùy duyên"}"\nKhám phá vận trình tại Tâm An AI:`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Thiệp Quẻ Tâm An - ${cardData.hexagramName}`,
          text: textToShare,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // User cancelled or not supported
      }
    }
    // Fallback to copy
    handleCopyShare();
  };

  // Chia sẻ lên Facebook
  const handleShareFacebook = () => {
    zenAudio.playCrystalClick(1200, 0.06);
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank", "width=600,height=500");
  };

  // Chia sẻ lên Zalo
  const handleShareZalo = () => {
    zenAudio.playCrystalClick(1200, 0.06);
    const shareUrl = encodeURIComponent(window.location.href);
    window.open(`https://sp.zalo.me/share_inline?url=${shareUrl}`, "_blank", "width=600,height=500");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-gradient-to-b from-[#091124] to-[#030612] border border-[#d4af37]/50 rounded-3xl p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] my-auto text-slate-100 flex flex-col items-center"
        >
          {/* Nút đóng */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tiêu đề modal */}
          <div className="text-center mb-5">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-[#d4af37]/20 text-[#fef08a] border border-[#d4af37]/40 font-bold">
              VIRAL ORACLE CARD 4K • TỶ LỆ STORY 9:16
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Thiệp Quẻ Tâm An May Mắn 4K
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Lưu giữ hào quang cát tường, chia sẻ duyên lành lên Instagram Story, Facebook hoặc Zalo
            </p>
          </div>

          {/* Preview Container */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 my-2">
            {/* Cột Preview Thiệp */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_15px_40px_rgba(212,175,55,0.25)] max-w-[280px] sm:max-w-[320px] aspect-[9/16] bg-black">
              {dataUrl ? (
                <img
                  src={dataUrl}
                  alt="Thiệp Quẻ Tâm An 4K"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
                  <Sparkles className="w-8 h-8 text-[#fef08a] animate-spin mb-3" />
                  <span className="text-xs font-mono">Đang kết xuất đồ họa 4K...</span>
                </div>
              )}
            </div>

            {/* Cột Thao Tác & Lời Khuyên */}
            <div className="flex-1 max-w-md space-y-4 text-left">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#fef08a]">
                  <Award className="w-4 h-4 text-[#fef08a]" />
                  <span>Đặc Điểm Thiệp Quẻ Chuẩn Mực</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thiệp được xuất với độ nét Ultra-HD 1080x1920 (chuẩn kích thước Story/Status), bao gồm quái họa tương thích, bài thơ tứ tuyệt tiên tri, triện son đỏ phúc lành và mã QR gieo duyên bạn bè.
                </p>
              </div>

              {/* Nút tải về 4K */}
              <button
                onClick={handleDownload}
                disabled={!dataUrl || isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#b38f28] text-slate-950 font-serif font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Tải Thiệp 4K Về Máy (PNG Sắc Nét)</span>
              </button>

              {/* Nút sao chép duyên lành */}
              <button
                onClick={handleCopyShare}
                className="w-full py-3 px-6 rounded-2xl bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:bg-white/10 active:scale-98 transition-all flex items-center justify-center gap-2 text-xs font-serif font-semibold cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Đã Sao Chép Duyên Lành!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#38bdf8]" />
                    <span>Sao Chép Lời Chúc Phúc & Link Gieo Duyên</span>
                  </>
                )}
              </button>

              {/* Hàng nút 1-Click Chia Sẻ: Zalo, Facebook, và Mạng Xã Hội */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={handleShareZalo}
                  className="py-2.5 px-3 rounded-xl bg-[#0068ff]/20 hover:bg-[#0068ff]/30 border border-[#0068ff]/40 text-[#0084ff] hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Chia sẻ lên Zalo"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Zalo</span>
                </button>

                <button
                  onClick={handleShareFacebook}
                  className="py-2.5 px-3 rounded-xl bg-[#1877f2]/20 hover:bg-[#1877f2]/30 border border-[#1877f2]/40 text-[#1877f2] hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Chia sẻ lên Facebook"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </button>

                <button
                  onClick={handleNativeShare}
                  className="py-2.5 px-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Chia sẻ qua ứng dụng trên điện thoại"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Khác</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center italic">
                * Mẹo: Cài đặt ảnh làm hình nền điện thoại hôm nay để nhận thêm trường năng lượng bảo hộ an lành.
              </div>
            </div>
          </div>

          {/* Hidden Canvas phục vụ Render */}
          <canvas ref={canvasRef} className="hidden" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
