"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, RotateCcw } from "lucide-react";
import ZenButton from "@/components/ui/ZenButton";
import { zenAudio } from "@/utils/zenAudio";

export interface DreamMandalaProps {
  themeId?: string;
  themeName?: string;
  archetypeName?: string;
  className?: string;
}

/**
 * DreamMandala: Bộ máy đồ họa Mandala tâm thức tự sinh (Generative Jungian Mandala)
 * Dựa trên triết lý Carl Jung về Mandala như biểu tượng của Sự Toàn Vẹn Bản Thể (The Self).
 * Tạo các cánh hoa thiền, hình học thiêng liêng (Sacred Geometry) và luân xa ánh sáng.
 */
export default function DreamMandala({
  themeId = "water",
  themeName = "Cảm Xúc Vô Thức",
  archetypeName = "The Great Mother",
  className = "",
}: DreamMandalaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Bảng màu Mandala dựa trên Theme của Giấc mơ
  const getThemeColors = (id: string) => {
    switch (id) {
      case "water":
        return {
          primary: "#38bdf8",
          secondary: "#818cf8",
          accent: "#c084fc",
          glow: "rgba(56, 189, 248, 0.4)",
          bg: "#040b19",
        };
      case "falling":
        return {
          primary: "#f43f5e",
          secondary: "#fb923c",
          accent: "#fef08a",
          glow: "rgba(244, 63, 94, 0.4)",
          bg: "#180509",
        };
      case "flying":
        return {
          primary: "#a855f7",
          secondary: "#38bdf8",
          accent: "#34d399",
          glow: "rgba(168, 85, 247, 0.4)",
          bg: "#0c0517",
        };
      case "chased":
        return {
          primary: "#e11d48",
          secondary: "#6366f1",
          accent: "#f59e0b",
          glow: "rgba(225, 29, 72, 0.4)",
          bg: "#14040a",
        };
      case "deceased":
        return {
          primary: "#fcd34d",
          secondary: "#fbbf24",
          accent: "#ffffff",
          glow: "rgba(252, 211, 77, 0.4)",
          bg: "#161003",
        };
      case "ancient_house":
      default:
        return {
          primary: "#34d399",
          secondary: "#2dd4bf",
          accent: "#fde047",
          glow: "rgba(52, 211, 153, 0.4)",
          bg: "#04140e",
        };
    }
  };

  const colors = getThemeColors(themeId);

  // Vẽ Mandala hình học thiêng liêng
  const drawMandala = (rot: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Vòng phát quang nền (Aura)
    const radialGlow = ctx.createRadialGradient(center, center, 10, center, center, center * 0.95);
    radialGlow.addColorStop(0, colors.glow);
    radialGlow.addColorStop(0.6, colors.glow.replace("0.4", "0.15"));
    radialGlow.addColorStop(1, "transparent");
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((rot * Math.PI) / 180);

    // 1. Vòng tròn ngoài bảo hộ (Outer Sacred Circle)
    ctx.beginPath();
    ctx.arc(0, 0, center * 0.88, 0, Math.PI * 2);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, center * 0.84, 0, Math.PI * 2);
    ctx.strokeStyle = colors.secondary;
    ctx.setLineDash([4, 6]);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Vòng hoa 12 cánh thiêng (12 Petals of Consciousness)
    const petals12 = 12;
    for (let i = 0; i < petals12; i++) {
      const angle = (i * 2 * Math.PI) / petals12;
      ctx.save();
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(center * 0.28, center * 0.5, 0, center * 0.82);
      ctx.quadraticCurveTo(-center * 0.28, center * 0.5, 0, 0);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Đốm sáng tinh vân ở đầu cánh hoa
      ctx.beginPath();
      ctx.arc(0, center * 0.82, 3, 0, Math.PI * 2);
      ctx.fillStyle = colors.accent;
      ctx.fill();

      ctx.restore();
    }

    // 3. Vòng hoa 8 hướng Bát Quái / Bát Môn (8 Lotus Petals)
    const petals8 = 8;
    for (let i = 0; i < petals8; i++) {
      const angle = (i * 2 * Math.PI) / petals8 + Math.PI / 8;
      ctx.save();
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(center * 0.2, center * 0.35, center * 0.15, center * 0.6, 0, center * 0.65);
      ctx.bezierCurveTo(-center * 0.15, center * 0.6, -center * 0.2, center * 0.35, 0, 0);
      ctx.fillStyle = colors.secondary + "22"; // 13% opacity
      ctx.fill();
      ctx.strokeStyle = colors.secondary;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    }

    // 4. Lục Giác Sao Vô Vi / Tam Giác Lồng Nhau (Merkaba / Star Polygon)
    for (let k = 0; k < 6; k++) {
      const angle = (k * 2 * Math.PI) / 6;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, center * 0.42);
      ctx.lineTo(center * 0.24, center * 0.12);
      ctx.lineTo(-center * 0.24, center * 0.12);
      ctx.closePath();
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // 5. Đài Sen Tâm Thức Trung Tâm (The Central Self Core)
    ctx.beginPath();
    ctx.arc(0, 0, center * 0.16, 0, Math.PI * 2);
    ctx.fillStyle = colors.primary;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, center * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = colors.accent;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  };

  useEffect(() => {
    let animId: number;
    let currentRot = 0;

    const animate = () => {
      currentRot = (currentRot + (isHovered ? 0.35 : 0.12)) % 360;
      setRotation(currentRot);
      drawMandala(currentRot);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [themeId, isHovered]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    zenAudio.playCrystalClick(900, 0.08);

    const link = document.createElement("a");
    link.download = `tam_an_mandala_${themeId}_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className={`flex flex-col items-center p-6 rounded-3xl bg-black/60 border border-purple-500/30 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="flex items-center justify-between w-full mb-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono font-bold text-purple-200 uppercase tracking-wider">
            Mandala Tâm Thức Tự Sinh (Jungian Mandala)
          </span>
        </div>
        <span className="text-[10px] font-mono text-purple-400/80 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/20">
          The Self • Biểu Tượng Toàn Vẹn
        </span>
      </div>

      <div
        className="relative my-2 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <canvas
          ref={canvasRef}
          width={380}
          height={380}
          className="rounded-full shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none group-hover:border-purple-400/50 transition-colors" />
      </div>

      <div className="text-center mt-3 max-w-sm">
        <h4 className="font-serif text-lg font-bold text-white mb-1">
          {themeName}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Biểu tượng hình học thiêng liêng phản ánh cấu trúc hài hòa của cõi vô thức. Đưa mắt ngắm nhìn trung tâm Mandala 3 phút sẽ giúp định thần, tái lập sự cân bằng sinh học.
        </p>

        <div className="flex items-center justify-center gap-3">
          <ZenButton
            onClick={handleDownload}
            variant="purple"
            size="sm"
            icon={Download}
          >
            Tải Ảnh Mandala 4K
          </ZenButton>
          <ZenButton
            onClick={() => {
              zenAudio.playSoftTap(600, 0.05);
              drawMandala((rotation + 45) % 360);
            }}
            variant="ghost"
            size="sm"
            icon={RotateCcw}
          >
            Xoay Chiêm Ngưỡng
          </ZenButton>
        </div>
      </div>
    </div>
  );
}
