"use client";

import { useState, useRef, useEffect } from "react";
import {
  TuViHoroscopeResult,
  PalaceData,
} from "@/utils/tuViEngine";
import {
  Sparkles,
  Download,
  Share2,
  X,
  Volume2,
  VolumeX,
  Compass,
  ScrollText,
  ShieldAlert,
  Award,
} from "lucide-react";
import { speakReading, stopSpeaking } from "@/utils/sacredVoice";
import { recordBrainEvent } from "@/utils/unifiedBrain";
import { addMeritPoints } from "@/utils/meritSystem";

interface TuViChartModalProps {
  data: TuViHoroscopeResult;
  onClose: () => void;
}

export default function TuViChartModal({ data, onClose }: TuViChartModalProps) {
  const [selectedPalace, setSelectedPalace] = useState<PalaceData>(
    data.palaces[data.menhPalaceIdx]
  );
  const [isSpeakingState, setIsSpeakingState] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Ghi nhận sự kiện vào Bộ Não Tâm An và cộng điểm công đức
    recordBrainEvent({
      type: "TU_VI",
      data: {
        name: data.birthInfo.name,
        canChiNam: data.birthInfo.canChiNam,
        cucName: data.birthInfo.cucName,
        menhPalace: data.palaces[data.menhPalaceIdx].chiName,
        summary: data.coreSynthesis.personality,
      },
    });
    addMeritPoints("DIVINATION", "Khởi lập Lá Số Tử Vi Hoàng Gia", 50, { isDivination: true });
  }, [data]);

  const toggleVoice = () => {
    if (isSpeakingState) {
      stopSpeaking();
      setIsSpeakingState(false);
    } else {
      setIsSpeakingState(true);
      const textToRead = `${data.coreSynthesis.personality} ${data.coreSynthesis.careerAndWealth} ${data.coreSynthesis.masterAdvice}`;
      speakReading(textToRead, () => {
        setIsSpeakingState(false);
      });
    }
  };

  // Xuất Sớ Khởi Tâm Hoàng Gia 4K
  const exportRoyalScroll = () => {
    setIsExporting(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsExporting(false);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Kích thước chuẩn Sớ Hoàng Gia (1080 x 1920)
    canvas.width = 1080;
    canvas.height = 1920;

    // 1. Nền lụa vàng gấm vương giả sẫm màu
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
    bgGrad.addColorStop(0, "#080d1e");
    bgGrad.addColorStop(0.5, "#0d172e");
    bgGrad.addColorStop(1, "#050814");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. Khung viền chỉ vàng kim hoa văn
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 1000, 1840);

    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 970, 1810);

    // 3. Tiêu đề Sớ
    ctx.textAlign = "center";
    ctx.fillStyle = "#fcd34d";
    ctx.font = "bold 44px 'Playfair Display', serif";
    ctx.fillText("TÂM AN KHAI TUỆ • HOÀNG GIA TỬ VI SỚ", 540, 130);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "24px sans-serif";
    ctx.fillText("Bản Đồ Thiên Mệnh & Vận Khí Trọn Đời", 540, 175);

    // 4. Khung thông tin đương số
    ctx.fillStyle = "rgba(13, 23, 46, 0.8)";
    ctx.fillRect(90, 220, 900, 240);
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1;
    ctx.strokeRect(90, 220, 900, 240);

    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(`Đương Số: ${data.birthInfo.name} (${data.birthInfo.gender})`, 130, 275);

    ctx.font = "26px sans-serif";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText(`Dương Lịch: ${data.birthInfo.solarDateStr}`, 130, 325);
    ctx.fillText(`Âm Lịch: ${data.birthInfo.canChiNam} - ${data.birthInfo.lunarDateStr}`, 130, 370);
    ctx.fillText(`Cục Mệnh: ${data.birthInfo.cucName} • Bản Mệnh: ${data.birthInfo.menhElement}`, 130, 415);

    // 5. Khung 4 Cung Cốt Lõi (Mệnh, Quan, Tài, Di)
    ctx.fillStyle = "rgba(7, 13, 30, 0.9)";
    ctx.fillRect(90, 490, 900, 680);
    ctx.strokeRect(90, 490, 900, 680);

    ctx.fillStyle = "#fcd34d";
    ctx.font = "bold 30px serif";
    ctx.fillText("TỨ TRỤ CỐT LÕI BẢN MỆNH", 130, 545);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "24px sans-serif";
    const menhP = data.palaces[data.menhPalaceIdx];
    ctx.fillText(`• MỆNH CUNG (${menhP.chiName}): ${menhP.majorStars.map((s) => s.name).join(", ") || "Vô Chính Diệu"}`, 130, 600);
    ctx.fillText(`  ${menhP.overviewMeaning.slice(0, 55)}...`, 130, 640);

    const quanP = data.palaces.find((p) => p.palaceName === "Quan Lộc");
    if (quanP) {
      ctx.fillText(`• QUAN LỘC (${quanP.chiName}): ${quanP.majorStars.map((s) => s.name).join(", ") || "Hòa dịu"}`, 130, 710);
      ctx.fillText(`  Vị thế công danh: Phát triển vượt bậc khi tạo dựng giá trị độc bản.`, 130, 750);
    }

    const taiP = data.palaces.find((p) => p.palaceName === "Tài Bạch");
    if (taiP) {
      ctx.fillText(`• TÀI BẠCH (${taiP.chiName}): ${taiP.majorStars.map((s) => s.name).join(", ") || "Bình hòa"}`, 130, 820);
      ctx.fillText(`  Dòng chảy tài lộc: Tích lũy vững chắc từ trí tuệ và sự chuyên tâm.`, 130, 860);
    }

    const phuP = data.palaces.find((p) => p.palaceName === "Phu Thê");
    if (phuP) {
      ctx.fillText(`• PHU THÊ (${phuP.chiName}): ${phuP.majorStars.map((s) => s.name).join(", ") || "Bình hòa"}`, 130, 930);
      ctx.fillText(`  Nhân duyên gia đạo: Lấy sự bao dung và lắng nghe làm gốc thịnh vượng.`, 130, 970);
    }

    // 6. Lời Phê Của Thầy Sinh
    ctx.fillStyle = "rgba(212, 175, 55, 0.15)";
    ctx.fillRect(90, 1200, 900, 480);
    ctx.strokeStyle = "#d4af37";
    ctx.strokeRect(90, 1200, 900, 480);

    ctx.fillStyle = "#fcd34d";
    ctx.font = "bold 30px serif";
    ctx.fillText("LỜI MINH TRIẾT THẦY SINH KHẨU TRUYỀN", 130, 1255);

    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 24px serif";
    const adviceLines = [
      `"Đức năng thắng số, thời vận do trời định nhưng biến chuyển do tâm."`,
      `Bản mệnh của con có sao lành chiếu mệnh, gặp gập ghềnh cũng hóa an lành.`,
      `Chăm tích công đức, thường xuyên tọa thiền chuông xoay thanh lọc tâm trí,`,
      `khi gặp bế tắc hãy hướng tâm trì niệm Kinh Ngũ Bách Danh Quán Thế Âm.`,
      `Vạn sự cát tường, thân tâm thường lạc!`,
    ];
    adviceLines.forEach((line, idx) => {
      ctx.fillText(line, 130, 1315 + idx * 45);
    });

    // 7. Triện son đỏ Hoàng Gia
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(720, 1530, 180, 110);
    ctx.strokeStyle = "#fef2f2";
    ctx.lineWidth = 3;
    ctx.strokeRect(725, 1535, 170, 100);

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px serif";
    ctx.fillText("TÂM AN", 810, 1575);
    ctx.fillText("KHAI TUỆ", 810, 1615);

    // 8. Chân trang
    ctx.textAlign = "center";
    ctx.fillStyle = "#64748b";
    ctx.font = "20px sans-serif";
    ctx.fillText("Nền Tảng Chiêm Bốc & Tâm Linh Á Đông • Tâm An AI", 540, 1820);

    // Download ảnh PNG
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `So_Tu_Vi_Hoang_Gia_${data.birthInfo.name.replace(/\s+/g, "_")}.png`;
    link.href = dataUrl;
    link.click();

    setIsExporting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#050814] border border-amber-500/30 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)] p-4 md:p-8 text-white space-y-6">
        {/* Nút đóng */}
        <button
          onClick={() => {
            stopSpeaking();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Thiên Bàn • Địa Bàn Tử Vi Đẩu Số 12 Cung
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
            Lá Số Tử Vi & Tứ Trụ Bát Tự Hoàng Gia
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto">
            Đương số: <span className="font-semibold text-amber-300">{data.birthInfo.name}</span> ({data.birthInfo.gender}) •
            Năm sinh: <span className="text-amber-200">{data.birthInfo.canChiNam}</span> •
            Giờ sinh: <span className="text-amber-300 font-bold">{data.birthInfo.canChiGio}</span> ({data.birthInfo.solarDateStr.split(" lúc ")[1] || ""}) •
            Bản Mệnh: <span className="text-emerald-300">{data.birthInfo.menhElement}</span> •
            Cục: <span className="text-sky-300">{data.birthInfo.cucName}</span>
          </p>
        </div>

        {/* Bàn Cờ 12 Cung Hình Chữ Nhật Trực Quan */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {data.palaces.map((palace) => {
            const isSelected = selectedPalace.id === palace.id;
            const isMenh = palace.id === data.menhPalaceIdx;
            const isThan = palace.id === data.thanPalaceIdx;

            return (
              <button
                key={palace.id}
                onClick={() => setSelectedPalace(palace)}
                className={`p-3 rounded-2xl text-left transition-all duration-200 border relative flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? "bg-amber-950/40 border-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.3)] ring-1 ring-amber-400"
                    : isMenh
                    ? "bg-purple-950/30 border-purple-500/40 hover:border-amber-500/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-amber-200 tracking-wide">
                      {palace.palaceName}
                    </span>
                    <span className="text-slate-400 text-[10px] uppercase font-mono">
                      Cung {palace.chiName}
                    </span>
                  </div>

                  {/* Nhãn Thân Mệnh */}
                  <div className="flex gap-1 mb-1.5 flex-wrap">
                    {isMenh && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-500/30 text-purple-200 border border-purple-400/40 font-bold">
                        MỆNH
                      </span>
                    )}
                    {isThan && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 font-bold">
                        THÂN
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300">
                      Đại Hạn {palace.daiHanAge}t
                    </span>
                  </div>

                  {/* Chính Tinh */}
                  <div className="space-y-0.5">
                    {palace.majorStars.length > 0 ? (
                      palace.majorStars.map((star, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-xs">
                          <span className="font-semibold text-amber-300">
                            {star.name}
                          </span>
                          {star.brightness && (
                            <span className="text-[10px] text-amber-400/70">
                              ({star.brightness})
                            </span>
                          )}
                          {star.hoa && (
                            <span className="text-[9px] px-1 rounded bg-rose-500/30 text-rose-300 border border-rose-400/40">
                              Hóa {star.hoa}
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-500 italic">
                        Vô Chính Diệu
                      </span>
                    )}
                  </div>
                </div>

                {/* Phụ tinh nổi bật */}
                <div className="text-[10px] text-slate-400 truncate mt-2">
                  {palace.minorStars.map((s) => s.name).join(" • ")}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bảng Chi Tiết Cung Đang Chọn & Luận Đoán */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 md:p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
          {/* Cột 1: Chi tiết Cung */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-amber-200 font-serif">
                {selectedPalace.palaceName} (Phương {selectedPalace.chiName})
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedPalace.overviewMeaning}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
              <div className="text-slate-400">
                Đại Hạn: <span className="text-amber-300 font-semibold">{selectedPalace.daiHanAge} đến {selectedPalace.daiHanAge + 9} tuổi</span>
              </div>
              <div className="text-slate-400">
                Tiểu Hạn năm nay: <span className="text-sky-300 font-semibold">Cung {selectedPalace.tieuHanChi}</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Tứ Trụ Bát Tự Phân Tích */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <h3 className="text-lg font-bold text-sky-200 font-serif">
                Tứ Trụ Bát Tự & Thập Thần
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400">Năm</div>
                <div className="font-bold text-amber-300">{data.baziFourPillars.year.can}</div>
                <div className="font-medium text-slate-200">{data.baziFourPillars.year.chi}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400">Tháng</div>
                <div className="font-bold text-amber-300">{data.baziFourPillars.month.can}</div>
                <div className="font-medium text-slate-200">{data.baziFourPillars.month.chi}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400">Ngày</div>
                <div className="font-bold text-amber-300">{data.baziFourPillars.day.can}</div>
                <div className="font-medium text-slate-200">{data.baziFourPillars.day.chi}</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400">Giờ</div>
                <div className="font-bold text-amber-300">{data.baziFourPillars.hour.can}</div>
                <div className="font-medium text-slate-200">{data.baziFourPillars.hour.chi}</div>
              </div>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div>Độ Vượng: <span className="text-emerald-300 font-semibold">{data.baziFourPillars.bodyStrength}</span></div>
              <div>Dụng Thần Cát Lợi: <span className="text-amber-300 font-semibold">{data.baziFourPillars.favorableElement}</span></div>
            </div>
          </div>

          {/* Cột 3: Lời Minh Triết Thầy Sinh & Lưu Niên 2026 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-amber-200 font-serif">
                Lưu Niên 2026 & Lời Phê Thầy Sinh
              </h3>
            </div>

            {/* Khối Lưu Niên Thái Tuế Kích Hoạt */}
            {data.coreSynthesis.luuNien2026 && (
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-purple-300 font-bold uppercase">
                    Lưu Thái Tuế (Bính Ngọ 2026):
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {data.coreSynthesis.luuNien2026.chienLuoc}
                  </span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Kích hoạt: <strong className="text-amber-200">{data.coreSynthesis.luuNien2026.palaceTriggered}</strong>. {data.coreSynthesis.luuNien2026.detail}
                </div>
              </div>
            )}

            <p className="text-xs text-slate-200 italic leading-relaxed bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              {data.coreSynthesis.masterAdvice}
            </p>
            <div className="flex gap-2">
              <button
                onClick={toggleVoice}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs flex items-center justify-center gap-2 text-amber-300 transition-colors"
              >
                {isSpeakingState ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isSpeakingState ? "Tạm Dừng Giọng" : "Nghe Thầy Sinh Đọc"}
              </button>
            </div>
          </div>
        </div>

        {/* Thanh Công Cụ Xuất Sớ & Chia Sẻ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Đã cộng +50 Điểm Công Đức & Tuệ Căn vào tài khoản của bạn.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={exportRoyalScroll}
              disabled={isExporting}
              className="flex-1 sm:flex-none py-2.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Đang Khởi Tạo Sớ..." : "Xuất Sớ Khởi Tâm Hoàng Gia (4K)"}
            </button>
          </div>
        </div>

        {/* Canvas ẩn để render Sớ 4K */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
