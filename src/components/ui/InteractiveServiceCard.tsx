"use client";

import React, { useState, useRef, MouseEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Flower2,
  Compass,
  Moon,
  Waves,
  MessageSquare,
  Clock,
  Users,
} from "lucide-react";
import ZenBadge, { ZenBadgeVariant } from "@/components/ui/ZenBadge";
import ZenButton from "@/components/ui/ZenButton";
import { zenAudio } from "@/utils/zenAudio";

export interface ServiceCardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tag: string;
  accentColor: "gold" | "sage" | "purple" | "cyan";
  type: "tarot" | "dream" | "meditation" | "chat" | "liensinh" | "lotus";
  practitionersCount?: string;
  duration?: string;
}

interface InteractiveServiceCardProps {
  service: ServiceCardData;
  index: number;
}

export default function InteractiveServiceCard({
  service,
  index,
}: InteractiveServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTarotFlipped, setIsTarotFlipped] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    // 3D tilt
    setRotate({
      x: -normY * 10,
      y: normX * 10,
    });

    // Magnetic pull (gentle pull toward mouse center)
    setMagneticOffset({
      x: normX * 5,
      y: normY * 5,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    zenAudio.playSoftTap(600, 0.02);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setMagneticOffset({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  // Color mappings
  const colorStyles: Record<
    "gold" | "sage" | "purple" | "cyan",
    {
      border: string;
      glow: string;
      badgeVariant: ZenBadgeVariant;
      accent: string;
      beamGradient: string;
    }
  > = {
    gold: {
      border: "border-[#d4af37]/35 hover:border-[#d4af37]/80",
      glow: "hover:shadow-[0_0_45px_rgba(212,175,55,0.28)]",
      badgeVariant: "gold",
      accent: "#d4af37",
      beamGradient: "from-transparent via-[#fef08a] to-transparent",
    },
    sage: {
      border: "border-[#8f9779]/35 hover:border-[#8f9779]/80",
      glow: "hover:shadow-[0_0_45px_rgba(143,151,121,0.28)]",
      badgeVariant: "sage",
      accent: "#8f9779",
      beamGradient: "from-transparent via-[#d9e2c6] to-transparent",
    },
    purple: {
      border: "border-purple-500/35 hover:border-purple-400/80",
      glow: "hover:shadow-[0_0_45px_rgba(168,85,247,0.28)]",
      badgeVariant: "purple",
      accent: "#a855f7",
      beamGradient: "from-transparent via-purple-300 to-transparent",
    },
    cyan: {
      border: "border-teal-500/35 hover:border-teal-400/80",
      glow: "hover:shadow-[0_0_45px_rgba(20,184,166,0.28)]",
      badgeVariant: "cyan",
      accent: "#14b8a6",
      beamGradient: "from-transparent via-teal-300 to-transparent",
    },
  };

  const currentStyle = colorStyles[service.accentColor];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl p-6 backdrop-blur-2xl bg-[#080d1e]/80 border shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),inset_0_-1px_1px_0_rgba(0,0,0,0.6)] transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default active:scale-[0.985] ${currentStyle.border} ${currentStyle.glow}`}
      style={{
        transform: `perspective(1000px) translate3d(${magneticOffset.x}px, ${magneticOffset.y}px, 0) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Viền sáng quét tia hào quang khi hover (Border beam) */}
      {isHovered && (
        <div className="pointer-events-none absolute -inset-[1px] rounded-2xl overflow-hidden p-[1px] z-30">
          <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_65%,rgba(255,255,255,0.7)_85%,transparent_100%)] opacity-70" />
        </div>
      )}

      {/* Particle Hover Sparkles */}
      {isHovered && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          <span className="absolute top-4 left-6 w-1 h-1 rounded-full bg-white animate-ping opacity-80" />
          <span className="absolute bottom-10 right-8 w-1.5 h-1.5 rounded-full bg-white animate-pulse opacity-90" />
          <span className="absolute top-1/2 right-4 w-1 h-1 rounded-full bg-white opacity-60 animate-ping delay-150" />
        </div>
      )}

      {/* Glare spotlight following mouse cursor */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(400px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12), transparent 80%)`,
          opacity: glare.opacity,
        }}
      />

      {/* Decorative ambient background blur */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-45 transition-opacity duration-500"
        style={{ backgroundColor: currentStyle.accent }}
      />

      {/* Header Info */}
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-4">
          <ZenBadge
            variant={currentStyle.badgeVariant}
            label={service.tag}
            size="xs"
          />
          <span className="text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
            0{index + 1}
          </span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-white mb-1.5 group-hover:text-[#fef08a] transition-colors flex items-center gap-2">
          {service.title}
        </h3>
        <p className="text-xs font-medium text-slate-400 mb-4 font-mono">
          {service.subtitle}
        </p>
      </div>

      {/* Interactive Micro Visualizations based on service type */}
      <div className="relative z-20 my-4 py-3 flex items-center justify-center min-h-[140px] bg-black/30 rounded-xl border border-white/5 overflow-hidden">
        {service.type === "tarot" && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Lật thẻ bài Tarot chiêm nghiệm"
            aria-pressed={isTarotFlipped}
            onClick={(e) => {
              e.stopPropagation();
              zenAudio.playCrystalChime(1080, 0.08);
              setIsTarotFlipped(!isTarotFlipped);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                zenAudio.playCrystalChime(1080, 0.08);
                setIsTarotFlipped((prev) => !prev);
              }
            }}
            title="Nhấn hoặc phím Cách/Enter để lật bài chiêm nghiệm"
            className="cursor-pointer group/tarot perspective-800 outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-lg active:scale-95 transition-transform"
          >
            <div
              className={`relative w-24 h-36 rounded-lg transition-transform duration-700 ease-out transform-style-3d shadow-xl ${
                isTarotFlipped ? "rotate-y-180" : "rotate-y-0"
              }`}
              style={{
                transformStyle: "preserve-3d",
                transform: isTarotFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Card Back (Lưng bài huyền bí) */}
              <div
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#12182b] to-[#080d1a] border-2 border-[#d4af37]/60 p-2 flex flex-col items-center justify-center backface-hidden shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="w-full h-full border border-[#d4af37]/30 rounded flex flex-col items-center justify-center p-1">
                  <div className="w-9 h-9 rounded-full border border-[#d4af37]/50 flex items-center justify-center mb-1">
                    <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
                  </div>
                  <span className="text-[9px] font-mono text-[#d4af37]/90 tracking-tighter uppercase">
                    TÂM AN
                  </span>
                  <span className="text-[8px] text-slate-400 mt-1">Chạm để lật</span>
                </div>
              </div>

              {/* Card Front (Mặt bài thần bí) */}
              <div
                className="absolute inset-0 rounded-lg bg-[#e8e6dc] border-2 border-[#d4af37] p-2 flex flex-col items-center justify-between text-slate-900 backface-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="text-[10px] font-serif font-bold text-[#b38a20]">XVII • THE STAR</span>
                <div className="w-10 h-10 rounded-full border-2 border-[#b38a20] flex items-center justify-center bg-white/70">
                  <Compass className="w-5 h-5 text-[#b38a20]" />
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-bold tracking-tight">HY VỌNG & TRÍ TUỆ</p>
                  <p className="text-[7.5px] text-slate-600">Đón nhận ánh sáng</p>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-2 font-mono">
              {isTarotFlipped ? "Đã khai mở quẻ bài ✨" : "Chạm nhẹ để bốc bài 🔮"}
            </p>
          </div>
        )}

        {service.type === "dream" && (
          <div
            onClick={() => zenAudio.playCrystalChime(768, 0.06)}
            className="relative flex flex-col items-center justify-center cursor-pointer group/moon"
          >
            {/* Glowing moon sphere */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-purple-900 via-indigo-700 to-amber-200/90 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center group-hover/moon:scale-110 active:scale-95 transition-transform duration-500">
              <Moon className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
              {/* Orbital rings */}
              <div className="absolute inset-0 -m-2 rounded-full border border-purple-400/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 -m-4 rounded-full border border-amber-300/20 animate-[spin_15s_linear_infinite_reverse]" />
            </div>
            <p className="text-[10px] text-center text-purple-200/80 mt-2 font-mono">
              Giải mã biểu tượng vô thức
            </p>
          </div>
        )}

        {service.type === "meditation" && (
          <div
            onClick={() => zenAudio.playCrystalChime(432, 0.08)}
            className="relative flex flex-col items-center justify-center cursor-pointer group/zen"
          >
            {/* Pulsating Harmonic Zen Ring */}
            <div className="relative flex items-center justify-center w-20 h-20 group-hover/zen:scale-110 active:scale-95 transition-transform duration-500">
              <span className="absolute w-20 h-20 rounded-full border-2 border-[#8f9779]/30 animate-ping opacity-60 duration-1000" />
              <span className="absolute w-14 h-14 rounded-full border border-[#8f9779]/60 animate-pulse" />
              <div className="w-10 h-10 rounded-full bg-[#8f9779]/20 border border-[#8f9779] flex items-center justify-center text-[#d9e2c6] shadow-[0_0_20px_rgba(143,151,121,0.4)]">
                <Waves className="w-5 h-5 text-[#d9e2c6]" />
              </div>
            </div>
            <p className="text-[10px] text-center text-[#d9e2c6]/90 mt-2 font-mono">
              Chu kỳ thở 4-7-8 • Sóng Alpha
            </p>
          </div>
        )}

        {service.type === "chat" && (
          <div
            onClick={() => zenAudio.playCrystalChime(852, 0.06)}
            className="relative flex flex-col items-center justify-center cursor-pointer group/chat"
          >
            {/* Glowing AI Oracle Core */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-teal-500/30 via-slate-900 to-teal-900/60 border border-teal-400/50 shadow-[0_0_25px_rgba(20,184,166,0.3)] flex items-center justify-center group-hover/chat:scale-110 active:scale-95 transition-transform duration-500">
              <div className="w-10 h-10 rounded-full bg-teal-400/20 border border-teal-300 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-teal-200 animate-bounce duration-1000" />
              </div>
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
            <p className="text-[10px] text-center text-teal-200/80 mt-2 font-mono">
              Trực tuyến • Sẵn sàng khai vấn
            </p>
          </div>
        )}

        {(service.type === "liensinh" || service.type === "lotus") && (
          <div
            onClick={() => zenAudio.playTibetanBowl(216, 0.15)}
            className="relative flex flex-col items-center justify-center cursor-pointer group/lotus"
          >
            {/* Pulsating Sacred Golden Lotus */}
            <div className="relative flex items-center justify-center w-20 h-20 group-hover/lotus:scale-110 active:scale-95 transition-transform duration-500">
              <span className="absolute w-20 h-20 rounded-full border border-[#d4af37]/40 animate-ping opacity-60 duration-1000" />
              <span className="absolute w-16 h-16 rounded-full border border-[#fef08a]/60 animate-pulse" />
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#121b2d] to-[#070c18] border border-[#d4af37] flex items-center justify-center text-[#fef08a] shadow-[0_0_25px_rgba(212,175,55,0.6)]">
                <Flower2 className="w-6 h-6 text-[#fef08a] animate-spin-slow" />
              </div>
            </div>
            <p className="text-[10px] text-center text-amber-200/90 mt-2 font-mono">
              Bát Diệp Liên Hoa • Chuông xoay
            </p>
          </div>
        )}
      </div>

      {/* Description & Action Link */}
      <div className="relative z-20 mt-2">
        {(service.practitionersCount || service.duration) && (
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3 pb-2.5 border-b border-white/10">
            {service.duration && (
              <span className="flex items-center gap-1.5 text-amber-200/90">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                {service.duration}
              </span>
            )}
            {service.practitionersCount && (
              <span className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                {service.practitionersCount}
              </span>
            )}
          </div>
        )}

        <p className="text-sm text-slate-300 leading-relaxed mb-5 line-clamp-2">
          {service.description}
        </p>

        <ZenButton
          href={service.href}
          variant={service.accentColor === "gold" ? "gold" : service.accentColor === "purple" ? "purple" : service.accentColor === "cyan" ? "cyan" : "sage"}
          size="sm"
          borderBeam={true}
          magnetic={true}
          icon={ArrowUpRight}
          iconPosition="right"
          className="w-full justify-between font-mono"
        >
          Khám Phá Ngay
        </ZenButton>
      </div>
    </div>
  );
}
