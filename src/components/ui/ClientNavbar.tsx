"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Flower2,
  Compass,
  Moon,
  Waves,
  MessageSquare,
  Home,
  Menu,
  X,
  Volume2,
  Award,
  Sun,
} from "lucide-react";
import MeditativeAudioPlayer from "@/components/audio/MeditativeAudioPlayer";
import { zenAudio } from "@/utils/zenAudio";
import { getMeritProfile, UserMeritProfile } from "@/utils/meritSystem";
import MeritDonationModal from "@/components/merit/MeritDonationModal";

import SacredLotusLogo from "@/components/ui/SacredLotusLogo";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Trang Chủ",
    href: "/",
    icon: Home,
    accentColor: "#d4af37",
  },
  {
    name: "Liên Sinh Độn Giáp",
    href: "/lien-sinh-don-giap",
    icon: Flower2,
    accentColor: "#f59e0b",
    badge: "Bát Môn",
  },
  {
    name: "Tarot",
    href: "/tarot",
    icon: Compass,
    accentColor: "#d4af37",
    badge: "3D",
  },
  {
    name: "Giải Mộng",
    href: "/dreams",
    icon: Moon,
    accentColor: "#c084fc",
    badge: "Vô Thức",
  },
  {
    name: "Lá Số Tử Vi",
    href: "/tu-vi",
    icon: Compass,
    accentColor: "#f59e0b",
    badge: "12 Cung",
  },
  {
    name: "Số Học Mặt Trời",
    href: "/so-hoc-mat-troi",
    icon: Sun,
    accentColor: "#fbbf24",
    badge: "Gen Z",
  },
  {
    name: "Thiền Định",
    href: "/meditation",
    icon: Waves,
    accentColor: "#8f9779",
    badge: "432Hz",
  },
  {
    name: "AI Guide",
    href: "/chat",
    icon: MessageSquare,
    accentColor: "#2dd4bf",
    badge: "Live",
  },
];

export default function ClientNavbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [meritProfile, setMeritProfile] = useState<UserMeritProfile | null>(null);

  useEffect(() => {
    setMeritProfile(getMeritProfile());
    const handleUpdate = (e: any) => {
      setMeritProfile(e.detail || getMeritProfile());
    };
    window.addEventListener("merit-profile-updated", handleUpdate);
    return () => window.removeEventListener("merit-profile-updated", handleUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060913]/75 border-b border-white/10 transition-all duration-300">
      {/* Viền sáng gradient mỏng dưới thanh điều hướng */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/45 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Tâm An AI với Bát Diệp Liên Hoa mạ vàng */}
        <Link
          href="/"
          onClick={() => zenAudio.playCrystalChime(960, 0.05)}
          className="flex items-center gap-3.5 group select-none relative"
        >
          <SacredLotusLogo size="md" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-bold tracking-wider font-display-gold transition-colors">
                TÂM AN AI
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fef08a]">
                Active Theory
              </span>
            </div>
            <span className="block text-[10px] font-mono tracking-widest text-[#8f9779] uppercase group-hover:text-slate-300 transition-colors">
              Thiền • Trí Tuệ • Bình Yên
            </span>
          </div>
        </Link>

        {/* Menu Items Desktop với Sliding Underline Indicator */}
        <nav
          className="hidden md:flex items-center gap-1 text-sm font-medium p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const isHovered = hoveredPath === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                onClick={() => zenAudio.playSoftTap(520, 0.04)}
                className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 select-none ${
                  isActive
                    ? "text-[#fef08a] font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {/* Sliding indicator background on hover / active */}
                {isHovered && (
                  <motion.div
                    layoutId="navbar-hover-glow"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                  />
                )}

                <Icon
                  className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{
                    color: isActive || isHovered ? item.accentColor : undefined,
                  }}
                />
                <span className="relative z-10">{item.name}</span>

                {item.badge && (
                  <span className="relative z-10 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-black/50 border border-white/15 text-slate-300">
                    {item.badge}
                  </span>
                )}

                {/* Sliding Underline Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-underline"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                    className="absolute bottom-0.5 inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_8px_#d4af37]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Ambient Sound Controller & Merit Indicator & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Nút Cúng Dường Gieo Duyên Tùy Tâm */}
          <button
            onClick={() => {
              zenAudio.playCrystalChime(784, 0.05);
              setIsDonationOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all active:scale-95 cursor-pointer"
            title="Tùy tâm cúng dường gieo duyên hộ trì máy chủ Tâm An"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span className="text-yellow-200">Gieo Duyên</span>
          </button>

          {/* Tuệ Căn & Điểm Công Đức Badge */}
          {meritProfile && (
            <div
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-mono shadow-[0_0_15px_rgba(245,158,11,0.15)] select-none cursor-default"
              title={`Tổng công đức tích lũy: ${meritProfile.totalMerit} điểm • Phẩm cấp: ${meritProfile.spiritualTier}`}
            >
              <Award className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="font-bold text-[#fef08a]">{meritProfile.totalMerit}</span>
              <span className="text-[10px] text-emerald-300/90">&bull; {meritProfile.spiritualTier}</span>
            </div>
          )}

          <div className="hidden sm:flex items-center">
            <MeditativeAudioPlayer />
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              zenAudio.playSoftTap(600, 0.04);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white active:scale-95 transition-all"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#fef08a]" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 bg-[#060913]/95 backdrop-blur-2xl overflow-hidden px-4 py-4 space-y-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    zenAudio.playCrystalChime();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    isActive
                      ? "bg-[#d4af37]/15 border-[#d4af37]/50 text-[#fef08a]"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#d4af37]" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-slate-400">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-white/10 flex justify-center">
              <MeditativeAudioPlayer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Tùy Tâm Cúng Dường VietQR */}
      <MeritDonationModal
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />
    </header>
  );
}
