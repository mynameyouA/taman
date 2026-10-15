"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Download,
  X,
  Play,
  Pause,
  Sparkles,
  Smartphone,
  Monitor,
  Flame,
  Volume2,
  RefreshCw,
  Film,
  CheckCircle2,
} from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";
import { sacredVoice } from "@/utils/sacredVoice";

export interface VideoExportOptions {
  chanhName: string;
  bienName: string;
  movingLine: number;
  inputIdentifier: string; // Số seri hoặc thời gian
  stopDoing: string;
  startDoing: string;
  remedyBuddha: string;
  lieuPhamLesson: string;
}

interface ThaySinhVideoExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: VideoExportOptions;
}

export default function ThaySinhVideoExporterModal({
  isOpen,
  onClose,
  options,
}: ThaySinhVideoExporterModalProps) {
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9">("9:16");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const {
    chanhName,
    bienName,
    movingLine,
    inputIdentifier,
    stopDoing,
    startDoing,
    remedyBuddha,
    lieuPhamLesson,
  } = options;

  const width = aspectRatio === "9:16" ? 720 : 1280;
  const height = aspectRatio === "9:16" ? 1280 : 720;

  // Tổng thời lượng video: 20 giây (5 cảnh cinematic chuyển tiếp mượt mà)
  // Cảnh 1: 0s - 4s (Tiếp nhận thông tin & Khởi duyên)
  // Cảnh 2: 4s - 8s (Bấm đốt ngón tay & Nhập định thiên địa)
  // Cảnh 3: 8s - 13s (Ứng hiện Quẻ Dịch & Đọc vị tâm can)
  // Cảnh 4: 13s - 18s (Khẩu truyền 3 Mệnh Lệnh & Liễu Phàm Tứ Huấn)
  // Cảnh 5: 18s - 20s (Đóng triện son đỏ Tâm An Khai Tuệ & Chúc phúc)

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime = performance.now();
    let isRunning = true;

    const renderCinematicFrame = (now: number) => {
      if (!isRunning) return;
      const elapsed = (now - startTime) / 1000;
      const loopTime = elapsed % 20.0; // Chu kỳ 20s

      let scene = 1;
      if (loopTime >= 4 && loopTime < 8) scene = 2;
      else if (loopTime >= 8 && loopTime < 13) scene = 3;
      else if (loopTime >= 13 && loopTime < 18) scene = 4;
      else if (loopTime >= 18) scene = 5;

      setCurrentSceneIndex(scene);

      // --- TẦNG NỀN: OBSIDIAN NEBULA CHUYỂN SẮC ---
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.45,
        40,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      if (scene === 2) {
        bgGrad.addColorStop(0, "#2c1c0a"); // Kim quang ấm áp khi nhập định
        bgGrad.addColorStop(0.5, "#120c1d");
        bgGrad.addColorStop(1, "#020408");
      } else {
        bgGrad.addColorStop(0, "#13182b");
        bgGrad.addColorStop(0.5, "#080c18");
        bgGrad.addColorStop(1, "#020307");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // --- HẠT BỤI SAO VŨ TRỤ (COSMIC PARTICLES) ---
      const pCount = scene === 2 ? 100 : 50;
      ctx.fillStyle = scene === 2 ? "rgba(254, 240, 138, 0.85)" : "rgba(226, 232, 240, 0.45)";
      for (let i = 0; i < pCount; i++) {
        const px = (Math.sin(elapsed * 0.9 + i * 19.3) * 0.5 + 0.5) * width;
        const py = (elapsed * (scene === 2 ? 90 : 40) + i * 47.1) % height;
        const pSize = (Math.sin(elapsed * 2.5 + i) * 0.5 + 0.5) * 3 + 1.2;
        ctx.beginPath();
        ctx.arc(px, height - py, pSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- VẼ CÁC CẢNH PHIM NỐI TIẾP ---

      if (scene === 1) {
        // ==========================================
        // CẢNH 1: TIẾP NHẬN TÂM NGUYỆN & KHỞI DUYÊN (0s - 4s)
        // ==========================================
        // Hào quang tỏa sáng từ trung tâm
        ctx.save();
        ctx.textAlign = "center";

        ctx.fillStyle = "#fcd34d";
        ctx.font = "bold 24px serif";
        ctx.fillText("✦ TIÊN ÔNG THẦY SINH KHẨU TRUYỀN ✦", width / 2, height * 0.12);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 34px serif";
        ctx.fillText("TIẾP NHẬN TÂM NGUYỆN CÀN KHÔN", width / 2, height * 0.18);

        // Mô phỏng tờ tiền / dữ liệu dâng lên phát sáng ở giữa
        ctx.fillStyle = "rgba(212, 175, 55, 0.15)";
        ctx.strokeStyle = "#fef08a";
        ctx.lineWidth = 2.5;
        const cardW = width * 0.75;
        const cardH = height * 0.28;
        ctx.beginPath();
        ctx.roundRect((width - cardW) / 2, height * 0.28, cardW, cardH, 24);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 20px monospace";
        ctx.fillText("DÃY SỐ DUYÊN LÀNH GIA CHỦ DÂNG LÊN:", width / 2, height * 0.35);

        ctx.fillStyle = "#fef08a";
        ctx.font = "bold 44px monospace";
        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 20;
        ctx.fillText(inputIdentifier, width / 2, height * 0.44);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#e2e8f0";
        ctx.font = "italic 18px serif";
        ctx.fillText("“Thầy Sinh khẽ mỉm cười, đôi mắt từ bi tiếp nhận duyên lành...”", width / 2, height * 0.64);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "15px sans-serif";
        ctx.fillText("Bắt đầu khởi động Bát Quái trận đồ của Liên Hoa Độn Pháp...", width / 2, height * 0.7);

        ctx.restore();
      } else if (scene === 2) {
        // ==========================================
        // CẢNH 2: BẤM ĐỐT NGÓN TAY & NHẬP ĐỊNH THIÊN ĐỊA (4s - 8s)
        // ==========================================
        ctx.save();
        // Cột sáng vàng kim giáng thế
        const beamGrad = ctx.createLinearGradient(width / 2, 0, width / 2, height);
        beamGrad.addColorStop(0, "rgba(254, 240, 138, 0.65)");
        beamGrad.addColorStop(0.5, "rgba(251, 191, 36, 0.25)");
        beamGrad.addColorStop(1, "rgba(251, 191, 36, 0)");
        ctx.fillStyle = beamGrad;
        ctx.fillRect(width * 0.3, 0, width * 0.4, height);

        // Bát Quái xoay tít tốc độ cao
        ctx.translate(width / 2, height * 0.45);
        ctx.rotate(elapsed * 1.8);
        ctx.strokeStyle = "rgba(252, 211, 77, 0.8)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, width * 0.34, 0, Math.PI * 2);
        ctx.stroke();

        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(Math.cos(ang) * (width * 0.24), Math.sin(ang) * (width * 0.24));
          ctx.lineTo(Math.cos(ang) * (width * 0.38), Math.sin(ang) * (width * 0.38));
          ctx.stroke();
        }
        ctx.restore();

        // Chữ thuyết minh cảnh 2
        ctx.textAlign = "center";
        ctx.fillStyle = "#fef08a";
        ctx.font = "bold 32px serif";
        ctx.shadowColor = "#000000";
        ctx.shadowBlur = 12;
        ctx.fillText("⚡ BẤM ĐỐT TÍNH CAN CHI • NHẬP ĐỊNH THIÊN ĐỊA", width / 2, height * 0.16);

        ctx.fillStyle = "#ffffff";
        ctx.font = "italic 20px serif";
        ctx.fillText("“Thầy bấm nhẹ các đốt ngón tay, gieo dãy số vào đài Bát Quái...”", width / 2, height * 0.74);
        ctx.fillText("“Lập tức ma trận càn khôn bừng sáng kim quang rực rỡ!”", width / 2, height * 0.78);
        ctx.shadowBlur = 0;
      } else if (scene === 3) {
        // ==========================================
        // CẢNH 3: MA TRẬN QUẺ DỊCH ỨNG HIỆN & ĐỌC VỊ TÂM CAN (8s - 13s)
        // ==========================================
        ctx.save();
        ctx.textAlign = "center";

        ctx.fillStyle = "#fcd34d";
        ctx.font = "bold 22px serif";
        ctx.fillText("✦ THẦY SINH KHAI MỞ DỊCH TƯỢNG ✦", width / 2, height * 0.12);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 38px serif";
        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 18;
        ctx.fillText(`${chanhName}  ➜  ${bienName}`, width / 2, height * 0.22);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 20px monospace";
        ctx.fillText(`BIẾN HÓA TẠI HÀO ${movingLine}`, width / 2, height * 0.28);

        // Khung đọc vị tâm can
        const heartBoxW = width * 0.86;
        const heartBoxH = height * 0.26;
        ctx.fillStyle = "rgba(14, 165, 233, 0.15)";
        ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect((width - heartBoxW) / 2, height * 0.35, heartBoxW, heartBoxH, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("❤️ THẤU CẢM NỖI LÒNG CỦA CON:", width / 2, height * 0.42);

        ctx.fillStyle = "#ffffff";
        ctx.font = "16px sans-serif";
        ctx.fillText("“Thầy thấu suốt rằng trong lòng con đang trĩu nặng", width / 2, height * 0.48);
        ctx.fillText("những lo toan, chênh vênh trước ngã rẽ cuộc đời.”", width / 2, height * 0.53);

        ctx.fillStyle = "#fef08a";
        ctx.font = "italic 16px serif";
        ctx.fillText("Hãy lắng nghe 3 chỉ dẫn chuyển nguy thành an của Thầy bên dưới...", width / 2, height * 0.72);

        ctx.restore();
      } else if (scene === 4) {
        // ==========================================
        // CẢNH 4: KHẨU TRUYỀN 3 MỆNH LỆNH & LIỄU PHÀM TỨ HUẤN (13s - 18s)
        // ==========================================
        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = "#fef08a";
        ctx.font = "bold 24px serif";
        ctx.fillText("✦ KHẨU TRUYỀN ĐỊNH HƯỚNG VẬN MỆNH ✦", width / 2, height * 0.1);

        const boxW = width * 0.88;
        const boxX = (width - boxW) / 2;

        // 1. Dừng lại (Đỏ)
        ctx.fillStyle = "rgba(225, 29, 72, 0.28)";
        ctx.strokeStyle = "rgba(244, 63, 94, 0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(boxX, height * 0.16, boxW, height * 0.22, 18);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.fillStyle = "#fda4af";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("⚠️ THỨ NHẤT: ĐIỀU CON NÊN DỪNG LẠI NGAY", boxX + 20, height * 0.22);
        ctx.fillStyle = "#ffffff";
        ctx.font = "15px sans-serif";
        ctx.fillText(stopDoing.slice(0, 52) + (stopDoing.length > 52 ? "..." : ""), boxX + 20, height * 0.28);
        ctx.fillText("Ngăn chặn hao tài tốn của và thị phi trước khi quá muộn.", boxX + 20, height * 0.33);

        // 2. Nên làm (Vàng kim)
        ctx.fillStyle = "rgba(217, 119, 6, 0.28)";
        ctx.strokeStyle = "rgba(251, 191, 36, 0.7)";
        ctx.beginPath();
        ctx.roundRect(boxX, height * 0.42, boxW, height * 0.22, 18);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#fef08a";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("🌟 THỨ HAI: ĐIỀU CON NÊN NẮM BẮT THỰC THI", boxX + 20, height * 0.48);
        ctx.fillStyle = "#ffffff";
        ctx.font = "15px sans-serif";
        ctx.fillText(startDoing.slice(0, 52) + (startDoing.length > 52 ? "..." : ""), boxX + 20, height * 0.54);
        ctx.fillText("Vận cát đang tới, dũng cảm hành đạo sẽ gặt hái đại thành.", boxX + 20, height * 0.59);

        // 3. Liễu Phàm & Trì Niệm (Xanh ngọc)
        ctx.fillStyle = "rgba(5, 150, 105, 0.28)";
        ctx.strokeStyle = "rgba(52, 211, 153, 0.7)";
        ctx.beginPath();
        ctx.roundRect(boxX, height * 0.68, boxW, height * 0.24, 18);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#6ee7b7";
        ctx.font = "bold 18px sans-serif";
        ctx.fillText("📿 THỨ BA: LIỄU PHÀM TỨ HUẤN & NGŨ BÁCH DANH", boxX + 20, height * 0.74);
        ctx.fillStyle = "#ffffff";
        ctx.font = "15px sans-serif";
        ctx.fillText("“Mệnh do mình tạo, phước do mình cầu - Đức năng thắng số”", boxX + 20, height * 0.8);
        ctx.fillStyle = "#fef08a";
        ctx.fillText(`Chí thành niệm: ${remedyBuddha.slice(0, 42)}...`, boxX + 20, height * 0.86);

        ctx.restore();
      } else if (scene === 5) {
        // ==========================================
        // CẢNH 5: TRIỆN SON ĐỎ & THÔNG ĐIỆP CHÚC PHÚC (18s - 20s)
        // ==========================================
        ctx.save();
        ctx.textAlign = "center";

        // Vòng tròn hào quang bùng nổ
        const shockGrad = ctx.createRadialGradient(width / 2, height * 0.45, 10, width / 2, height * 0.45, width * 0.45);
        shockGrad.addColorStop(0, "rgba(239, 68, 68, 0.35)");
        shockGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = shockGrad;
        ctx.beginPath();
        ctx.arc(width / 2, height * 0.45, width * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Con Dấu Triện Son Đỏ "Tâm An Khai Tuệ"
        ctx.fillStyle = "#dc2626";
        ctx.strokeStyle = "#fef08a";
        ctx.lineWidth = 5;
        const sealSize = width * 0.36;
        ctx.beginPath();
        ctx.roundRect((width - sealSize) / 2, height * 0.32, sealSize, sealSize, 28);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 26px serif";
        ctx.fillText("TÂM AN", width / 2, height * 0.44);
        ctx.fillText("KHAI TUỆ", width / 2, height * 0.52);

        // Lời chúc phúc kết video
        ctx.fillStyle = "#fef08a";
        ctx.font = "bold 26px serif";
        ctx.fillText("BÌNH AN & ÁNH SÁNG Ở BÊN CON!", width / 2, height * 0.68);

        ctx.fillStyle = "#e2e8f0";
        ctx.font = "16px sans-serif";
        ctx.fillText("✦ Lưu lại video và chia sẻ để gieo duyên lành ✦", width / 2, height * 0.74);
        ctx.fillText("Tâm An AI • Cổng Không Gian Tâm Thức Số", width / 2, height * 0.8);

        ctx.restore();
      }

      // --- WATERMARK & SCENE INDICATOR ---
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "12px monospace";
      ctx.fillText(`Cảnh ${scene}/5 • ${Math.round(loopTime)}s/20s`, width - 20, height - 16);

      animFrameRef.current = requestAnimationFrame(renderCinematicFrame);
    };

    animFrameRef.current = requestAnimationFrame(renderCinematicFrame);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isOpen, aspectRatio, width, height, chanhName, bienName, movingLine, inputIdentifier, stopDoing, startDoing, remedyBuddha, lieuPhamLesson]);

  // Quay và kết xuất Video đầy đủ 20 giây (5 cảnh hoàn chỉnh)
  const handleStartRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    zenAudio.playCrystalChime(880, 0.1);
    setIsRecording(true);
    setRecordProgress(0);
    recordedChunksRef.current = [];

    const stream = canvas.captureStream(60);

    let mimeType = "video/webm;codecs=vp9";
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = "video/webm";
    }

    try {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 9000000, // 9 Mbps chuẩn nét 4K/Retina
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoBlobUrl(url);
        setIsRecording(false);
        zenAudio.playCrystalChime(1056, 0.15);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;

      // Giọng đọc Thầy Sinh toàn trình
      sacredVoice.speakReading(
        `Thầy Sinh tiếp nhận dãy số ${inputIdentifier} của con. Bấm đốt ngón tay khởi đài Bát Quái Liên Hoa Độn Pháp, quẻ ứng hiện ${chanhName} động hào ${movingLine} biến sang ${bienName}. Thầy thấu suốt lòng con đang mang nặng lo toan. Thứ nhất: ${stopDoing}. Thứ hai: ${startDoing}. Thứ ba, theo Liễu Phàm Tứ Huấn, hãy trì niệm danh hiệu ${remedyBuddha} để tiêu trừ nghiệp chướng. Tâm An Khai Tuệ, bình an luôn ở bên con!`
      );

      // Quay trọn vẹn 20 giây (5 cảnh điện ảnh)
      const durationMs = 20000;
      const intervalMs = 100;
      let elapsed = 0;

      const progressTimer = setInterval(() => {
        elapsed += intervalMs;
        setRecordProgress(Math.min(100, Math.round((elapsed / durationMs) * 100)));

        if (elapsed >= durationMs) {
          clearInterval(progressTimer);
          if (mediaRecorder.state === "recording") {
            mediaRecorder.stop();
          }
        }
      }, intervalMs);
    } catch (err) {
      console.error("Recording error:", err);
      setIsRecording(false);
    }
  };

  const handleDownloadVideo = () => {
    if (!videoBlobUrl) return;
    const a = document.createElement("a");
    a.href = videoBlobUrl;
    a.download = `Thay_Sinh_Cinematic_${chanhName}_${aspectRatio === "9:16" ? "TikTok_Reels_Shorts" : "YouTube_Facebook"}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090d1a] border-2 border-[#d4af37]/50 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.25)] p-6 sm:p-8 text-slate-100 flex flex-col md:flex-row gap-6"
        >
          {/* Nút đóng */}
          <button
            onClick={() => {
              sacredVoice.stopSpeaking();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* CỘT TRÁI: KHUNG XEM TRƯỚC CINEMATIC VIDEO */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <div
              className={`relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl bg-black flex items-center justify-center ${
                aspectRatio === "9:16" ? "w-[280px] h-[498px]" : "w-[440px] h-[248px]"
              }`}
            >
              <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="w-full h-full object-cover"
              />

              {/* Lớp phủ khi đang quay */}
              {isRecording && (
                <div className="absolute inset-0 bg-black/55 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin" />
                  <span className="text-sm font-serif font-bold text-amber-300">
                    Đang Quay Cảnh {currentSceneIndex}/5 ({recordProgress}%)
                  </span>
                  <div className="w-48 h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-yellow-300 transition-all"
                      style={{ width: `${recordProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                5 CẢNH PHIM ĐIỆN ẢNH (20 Giây)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                • 60 FPS HD / 4K
              </span>
            </div>
          </div>

          {/* CỘT PHẢI: BẢNG ĐIỀU KHIỂN & TÙY CHỌN */}
          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/40 text-xs font-mono text-amber-300 mb-2">
                <Film className="w-3.5 h-3.5 text-rose-400" />
                <span>Hệ Thống Video Chiêm Bốc Toàn Trình V7.0</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                Xuất Video Điện Ảnh Thầy Sinh
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Video được dàn dựng tự động trọn vẹn từ lúc <strong>tiếp nhận tâm nguyện</strong> $\rightarrow$ <strong>bấm đốt ngón tay nhập định</strong> $\rightarrow$ <strong>ứng hiện quẻ Dịch</strong> $\rightarrow$ <strong>khẩu truyền 3 lời răn Liễu Phàm</strong> $\rightarrow$ <strong>đóng triện son đỏ chúc phúc</strong>.
              </p>

              {/* CHỌN TỶ LỆ KHUNG HÌNH */}
              <div className="space-y-2 mb-4">
                <label className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Chọn Tỷ Lệ Khung Hình Mạng Xã Hội:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(600, 0.05);
                      setAspectRatio("9:16");
                    }}
                    className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-serif font-bold transition-all cursor-pointer ${
                      aspectRatio === "9:16"
                        ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Dọc 9:16 (TikTok, Reels, Shorts)</span>
                  </button>

                  <button
                    onClick={() => {
                      zenAudio.playSoftTap(600, 0.05);
                      setAspectRatio("16:9");
                    }}
                    className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-serif font-bold transition-all cursor-pointer ${
                      aspectRatio === "16:9"
                        ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                    <span>Ngang 16:9 (YouTube, Facebook)</span>
                  </button>
                </div>
              </div>

              {/* LỘ TRÌNH 5 CẢNH PHIM */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs space-y-1 font-mono">
                <div className="text-amber-300 font-bold mb-1">CẤU TRÚC 5 CẢNH ĐIỆN ẢNH:</div>
                <div className="text-slate-300">1. Tiếp nhận số seri {inputIdentifier} dâng lên (0s-4s)</div>
                <div className="text-slate-300">2. Bấm đốt ngón tay, Bát Quái xoay nhập định (4s-8s)</div>
                <div className="text-slate-300">3. Quẻ {chanhName} ➜ {bienName} ứng hiện (8s-13s)</div>
                <div className="text-slate-300">4. Ba khẩu truyền & Liễu Phàm Tứ Huấn (13s-18s)</div>
                <div className="text-slate-300">5. Triện son Tâm An Khai Tuệ chúc phúc (18s-20s)</div>
              </div>
            </div>

            {/* NÚT THAO TÁC QUAY & TẢI VIDEO */}
            <div className="space-y-3 pt-2">
              {!videoBlobUrl ? (
                <button
                  disabled={isRecording}
                  onClick={handleStartRecording}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-500 text-slate-950 font-serif font-bold text-sm shadow-[0_0_35px_rgba(244,63,94,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Flame className="w-5 h-5 text-slate-950" />
                  <span>
                    {isRecording ? `Đang Kết Xuất Toàn Trình (${recordProgress}%)` : "Bắt Đầu Quay Video Điện Ảnh 4K (20 Giây)"}
                  </span>
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleDownloadVideo}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-serif font-bold text-sm shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-5 h-5 text-slate-950" />
                    <span>Tải Video 20s Về Máy (Sẵn Sàng Đăng TikTok / Reels / YouTube)</span>
                  </button>

                  <button
                    onClick={() => {
                      setVideoBlobUrl(null);
                      handleStartRecording();
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Quay Lại Lượt Mới</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
