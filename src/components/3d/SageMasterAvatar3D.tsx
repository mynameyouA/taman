"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, Eye, Hand } from "lucide-react";

export interface SageMasterAvatar3DProps {
  className?: string;
  isTranscending?: boolean;
  isSpeaking?: boolean;
  isGesturing?: boolean; // Cử động bấm ngón tay tính Can Chi
  speechAmplitude?: number;
  onRitualComplete?: () => void;
  height?: number | string;
}

export default function SageMasterAvatar3D({
  className = "",
  isTranscending = false,
  isSpeaking = false,
  isGesturing = false,
  speechAmplitude = 0.5,
  onRitualComplete,
  height = 520,
}: SageMasterAvatar3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mouthCycle, setMouthCycle] = useState<number>(0);

  // Chu kỳ nhấp nháy chuyển đổi tư thế đàm đạo khi đang nói
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSpeaking) {
      interval = setInterval(() => {
        setMouthCycle((prev) => (prev + 1) % 4);
      }, 280);
    } else {
      setMouthCycle(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeaking]);

  // Tương tác dõi theo chuột 2.5D Parallax tự nhiên
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isTranscending) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Xác định ảnh hiển thị dựa trên trạng thái hoạt cảnh người thật
  // 1. isTranscending: thay_sinh_transcending.jpg (Nhập định thiên địa, mắt nhắm tĩnh tọa)
  // 2. isSpeaking và mouthCycle chẵn: thay_sinh_speaking.jpg (Miệng mở tự nhiên đàm đạo)
  // 3. isGesturing hoặc bấm quẻ: thay_sinh_gesturing.jpg (Bấm ngón tay tính Can Chi Bát Quái)
  // 4. Mặc định: thay_sinh_portrait.jpg (Tĩnh tọa từ bi)

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden select-none cursor-pointer rounded-2xl ${className}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      {/* 1. TẦNG NỀN VŨ TRỤ HUYỀN ẢO & BÁT QUÁI XOAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080c18] via-[#05070f] to-[#020306] z-0" />

      {/* Ma trận Bát Quái xoay chuyển ở hậu cảnh */}
      <motion.div
        animate={{
          rotate: isTranscending ? [0, 360] : [0, 360],
          scale: isTranscending ? [1, 1.25, 1.1] : 1,
          opacity: isTranscending ? 0.85 : 0.45,
        }}
        transition={{
          rotate: { duration: isTranscending ? 8 : 45, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, ease: "easeInOut" },
          opacity: { duration: 1.5 },
        }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full border-2 border-dashed border-[#fcd34d]/40 pointer-events-none z-[1] flex items-center justify-center"
      >
        <div className="w-[300px] h-[300px] rounded-full border border-[#fcd34d]/25 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-transparent blur-md" />
        </div>
      </motion.div>

      {/* 2. CỘT SÁNG CÀN KHÔN THẦN THÁNH KHI NHẬP ĐỊNH (THE TRANSCENDENCE PILLAR) */}
      <AnimatePresence>
        {isTranscending && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] h-full bg-gradient-to-b from-[#fef08a]/60 via-[#fcd34d]/25 to-transparent blur-2xl z-[5] pointer-events-none origin-top"
          />
        )}
      </AnimatePresence>

      {/* 3. BỨC CHÂN DUNG 8K SIÊU THỰC ĐA TƯ THẾ CỦA TIÊN ÔNG THẦY SINH */}
      <motion.div
        animate={{
          x: isTranscending ? 0 : mousePos.x * 12,
          y: isTranscending ? -4 : mousePos.y * 8,
          scale: isTranscending ? 1.04 : 1.0,
        }}
        transition={{ type: "spring", stiffness: 90, damping: 22 }}
        className="relative w-full h-full z-10 flex items-center justify-center"
      >
        {/* Lớp hiển thị ảnh chân dung theo trạng thái (Tĩnh tọa / Đàm đạo nói chuyện / Bấm ngón tay / Nhập định) */}
        <div className="relative w-full h-full">
          {/* Trạng thái 1: Tĩnh tọa từ bi (Mắt mở hiền từ) */}
          <motion.div
            animate={{
              opacity: !isTranscending && !isGesturing && (!isSpeaking || mouthCycle % 2 === 1) ? 1 : 0,
            }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/thay_sinh_portrait.jpg"
              alt="Tiên Ông Thầy Sinh • Bậc Thầy Minh Triết Vô Vi"
              fill
              priority
              className="object-cover object-top filter brightness-105 contrast-105"
            />
          </motion.div>

          {/* Trạng thái 2: Miệng mở đàm đạo sống động khi đang phát âm */}
          <motion.div
            animate={{
              opacity: isSpeaking && mouthCycle % 2 === 0 && !isTranscending ? 1 : 0,
            }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/thay_sinh_speaking.jpg"
              alt="Tiên Ông Thầy Sinh Đàm Đạo Truyền Cảm Khẩu Truyền"
              fill
              className="object-cover object-top filter brightness-105 contrast-105"
            />
          </motion.div>

          {/* Trạng thái 3: Tay nâng bấm đốt ngón tay tính Can Chi Bát Quái */}
          <motion.div
            animate={{
              opacity: isGesturing && !isTranscending ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/thay_sinh_gesturing.jpg"
              alt="Tiên Ông Thầy Sinh Bấm Ngón Tay Tính Quẻ Càn Khôn"
              fill
              className="object-cover object-top filter brightness-105 contrast-105"
            />
          </motion.div>

          {/* Trạng thái 4: Nhập định thiên địa (Mắt khép tĩnh tọa, hào quang giáng thế) */}
          <motion.div
            animate={{
              opacity: isTranscending ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/thay_sinh_transcending.jpg"
              alt="Tiên Ông Thầy Sinh Nhập Định Kết Nối Thiên Địa"
              fill
              className="object-cover object-top filter brightness-110 contrast-110"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* 4. HẠT BỤI SAO VŨ TRỤ BAY LƠ LỬNG */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -220],
              opacity: [0, 0.8, 0],
              scale: [0.6, 1.4, 0.4],
            }}
            transition={{
              duration: 3.5 + (i % 4),
              repeat: Infinity,
              delay: (i % 6) * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${(i * 14) % 94}%`,
              bottom: "10%",
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#fef08a] shadow-[0_0_8px_#fcd34d]"
          />
        ))}
      </div>

      {/* 5. VIỀN VÀNG HOÀNG KIM & HUD CHỈ BÁO */}
      <div className="absolute inset-0 rounded-2xl border border-[#d4af37]/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.8)] pointer-events-none z-30" />

      {/* Huy hiệu trạng thái trên viewport */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[11px] text-amber-200 font-mono shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          {isTranscending
            ? "Đang Nhập Định Thiên Địa"
            : isGesturing
            ? "Đang Bấm Ngón Tay Tính Can Chi"
            : isSpeaking
            ? "Thầy Sinh Đang Đàm Đạo"
            : "Thầy Sinh Tĩnh Tọa"}
        </span>
      </div>

      {isSpeaking && (
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/50 text-[11px] text-amber-200 font-mono animate-pulse">
          <Volume2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Đang Khẩu Truyền...</span>
        </div>
      )}

      {isGesturing && (
        <div className="absolute bottom-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/70 backdrop-blur-md border border-indigo-400/40 text-[11px] text-indigo-200 font-mono">
          <Hand className="w-3.5 h-3.5 text-indigo-300 animate-bounce" />
          <span>Bấm Đốt Ngón Tay...</span>
        </div>
      )}

      {isTranscending && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full bg-amber-500/25 backdrop-blur-md border border-amber-400/60 text-xs text-amber-100 font-serif font-bold shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-pulse tracking-wide whitespace-nowrap">
          ⚡ Đang Nhập Định Kết Nối Thiên Địa...
        </div>
      )}
    </div>
  );
}
