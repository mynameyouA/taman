"use client";

import React from "react";
import { motion } from "framer-motion";

interface SacredLotusLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const SIZE_MAP = {
  xs: { box: "w-5 h-5", px: 20 },
  sm: { box: "w-7 h-7", px: 28 },
  md: { box: "w-11 h-11", px: 44 },
  lg: { box: "w-14 h-14", px: 56 },
  xl: { box: "w-20 h-20", px: 80 },
};

/**
 * SacredLotusLogo — Biểu Tượng Nhận Diện Tối Cao của Tâm An AI
 * Bát Diệp Liên Hoa mạ vàng Imperial Gold 3D với đài sen ngọc bích phát quang
 * Đại diện cho: Bát Quái Cửu Cung, Bát Môn Độn Giáp và Bát Chánh Đạo Minh Triết
 */
export default function SacredLotusLogo({
  size = "md",
  className = "",
  animate = true,
}: SacredLotusLogoProps) {
  const { box } = SIZE_MAP[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${box} ${className} group select-none`}
    >
      {/* Vầng hào quang nền đa tầng (Multi-layer Ambient Aura) */}
      <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#d4af37]/30 via-[#fef08a]/20 to-[#34d399]/25 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* SVG Bát Diệp Liên Hoa Vector Tinh Xảo */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)] group-hover:drop-shadow-[0_4px_20px_rgba(254,240,138,0.75)] transition-all duration-500"
        whileHover={animate ? { scale: 1.08, rotate: 6 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <defs>
          {/* Gradient Vàng Hoàng Gia 3D */}
          <linearGradient id="lotusGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#d4af37" />
            <stop offset="85%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Gradient Cánh Sen Trong (Phản chiếu ánh ngọc) */}
          <linearGradient id="innerPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="80%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Gradient Đài Sen Tâm Thức (Ngọc Như Ý) */}
          <radialGradient id="lotusCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#67e8f9" />
            <stop offset="55%" stopColor="#38bdf8" />
            <stop offset="85%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>

          {/* Hào quang viền ngoài */}
          <linearGradient id="outerRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Vòng hào quang cổ phong ngoài cùng (Celestial Ring) */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="url(#outerRingGrad)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          className="animate-[spin_60s_linear_infinite]"
        />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="url(#lotusGoldGrad)"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* 8 Cánh Sen Vòng Ngoài (8 Outer Petals - Bát Môn / Bát Quái) */}
        <g transform="translate(50, 50)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <g key={`outer-${index}`} transform={`rotate(${angle})`}>
              <path
                d="M 0 -14 C -9 -25 -10 -36 0 -44 C 10 -36 9 -25 0 -14 Z"
                fill="url(#lotusGoldGrad)"
                stroke="#fffbeb"
                strokeWidth="0.6"
                strokeOpacity="0.7"
              />
              {/* Sống gân cánh hoa sen mạ vàng */}
              <line
                x1="0"
                y1="-14"
                x2="0"
                y2="-42"
                stroke="#fffbeb"
                strokeWidth="0.5"
                strokeOpacity="0.9"
              />
            </g>
          ))}
        </g>

        {/* 8 Cánh Sen Lớp Trong Đan Xen (8 Inner Interlocking Petals) */}
        <g transform="translate(50, 50)">
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, index) => (
            <g key={`inner-${index}`} transform={`rotate(${angle})`}>
              <path
                d="M 0 -9 C -6 -18 -7 -27 0 -33 C 7 -27 6 -18 0 -9 Z"
                fill="url(#innerPetalGrad)"
                stroke="#fef08a"
                strokeWidth="0.5"
                strokeOpacity="0.8"
                opacity="0.95"
              />
            </g>
          ))}
        </g>

        {/* Đài Sen Nở Tinh Khiết (Lotus Receptacle Core Ring) */}
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="#070d1e"
          stroke="url(#lotusGoldGrad)"
          strokeWidth="1.2"
        />

        {/* Tâm Đài Sen — Viên Ngọc Như Ý Phát Quang (Cintamani Jewel) */}
        <circle
          cx="50"
          cy="50"
          r="8.5"
          fill="url(#lotusCoreGrad)"
          className="animate-pulse"
        />

        {/* Điểm sáng quang phổ bản thể (Spiritual Spark) */}
        <circle cx="47.5" cy="47.5" r="2.2" fill="#ffffff" opacity="0.95" />
        <circle cx="51.8" cy="51.8" r="1.1" fill="#a5f3fc" opacity="0.8" />
      </motion.svg>
    </div>
  );
}
