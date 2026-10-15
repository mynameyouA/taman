"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, HeartHandshake, ShieldCheck, Waves } from "lucide-react";
import { zenAudio } from "@/utils/zenAudio";

import SacredLotusLogo from "@/components/ui/SacredLotusLogo";

export default function ClientFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 backdrop-blur-2xl bg-[#060913]/90 relative z-20 py-12">
      {/* Subtle top ambient glow line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-xs text-slate-400">
        {/* Brand identity */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <SacredLotusLogo size="sm" />
            <span className="font-serif font-bold text-base tracking-wider font-display-gold">
              TÂM AN AI
            </span>
          </div>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="font-mono text-[11px] text-[#8f9779]">
            Active Theory WebGL 3D Quantum Space
          </span>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px]">
          <Link
            href="/lien-sinh-don-giap"
            onClick={() => zenAudio.playSoftTap(528, 0.03)}
            className="hover:text-amber-300 transition-colors relative group"
          >
            Liên Sinh Độn Giáp
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/tarot"
            onClick={() => zenAudio.playSoftTap(500, 0.03)}
            className="hover:text-[#fef08a] transition-colors relative group"
          >
            Tarot 3D
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/tu-vi"
            onClick={() => zenAudio.playSoftTap(512, 0.03)}
            className="hover:text-amber-200 transition-colors relative group"
          >
            Lá Số Tử Vi
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-300 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/dreams"
            onClick={() => zenAudio.playSoftTap(540, 0.03)}
            className="hover:text-purple-300 transition-colors relative group"
          >
            Giải Mộng
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-400 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/meditation"
            onClick={() => zenAudio.playSoftTap(432, 0.03)}
            className="hover:text-[#d9e2c6] transition-colors relative group"
          >
            Thiền Định 432Hz
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8f9779] group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/chat"
            onClick={() => zenAudio.playSoftTap(580, 0.03)}
            className="hover:text-teal-300 transition-colors relative group"
          >
            AI Guide
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-teal-400 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        {/* Copyright and signature */}
        <div className="text-center md:text-right font-mono text-[11px] space-y-1">
          <p className="text-slate-400">
            © 2026 Tâm An AI. An trú trong thực tại.
          </p>
          <p className="text-[10px] text-slate-500">
            Kiến tạo với chuẩn chuyển động vi mô cao cấp.
          </p>
        </div>
      </div>
    </footer>
  );
}
