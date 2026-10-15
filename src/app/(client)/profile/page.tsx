"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Sparkles,
  Calendar,
  Flame,
  Clock,
  BookOpen,
  Share2,
  ChevronRight,
  ShieldCheck,
  Heart,
  Compass,
} from "lucide-react";
import ClientNavbar from "@/components/ui/ClientNavbar";
import ClientFooter from "@/components/ui/ClientFooter";
import PageTransition from "@/components/ui/PageTransition";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";
import { zenAudio } from "@/utils/zenAudio";
import { getMeritProfile, UserMeritProfile, MeritLog } from "@/utils/meritSystem";
import MeritDonationModal from "@/components/merit/MeritDonationModal";

export default function ProfileMeritPage() {
  const [profile, setProfile] = useState<UserMeritProfile | null>(null);
  const [isDonationOpen, setIsDonationOpen] = useState<boolean>(false);

  useEffect(() => {
    setProfile(getMeritProfile());
    const handleUpdate = (e: any) => {
      setProfile(e.detail || getMeritProfile());
    };
    window.addEventListener("merit-profile-updated", handleUpdate);
    return () => window.removeEventListener("merit-profile-updated", handleUpdate);
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#03050c] text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-amber-300 font-mono text-sm">
          <Sparkles className="w-5 h-5 animate-spin" />
          <span>Đang mở sổ Công Đức & Tuệ Căn...</span>
        </div>
      </div>
    );
  }

  // Danh sách hành động tích lũy công đức
  const actionBadges: Record<MeritLog["action"], { label: string; color: string }> = {
    DIVINATION: { label: "Chiêm Bốc", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    BEAD_COUNT: { label: "Lần Chuỗi", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    MEDITATION: { label: "Tọa Thiền", color: "text-sky-400 bg-sky-500/10 border-sky-500/30" },
    DREAM_JOURNAL: { label: "Giải Mộng", color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
    CARD_SHARE: { label: "Gieo Duyên", color: "text-rose-400 bg-rose-500/10 border-rose-500/30" },
    MORNING_ORACLE: { label: "Khởi Tâm", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" },
  };

  return (
    <div className="relative min-h-screen bg-[#03050c] text-slate-100 flex flex-col justify-between selection:bg-[#d4af37]/30 selection:text-[#fef08a]">
      {/* Background Radiance 4K */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(3,5,12,0.6)_50%,_rgba(3,5,12,0.98)_100%)]" />
      <div className="pointer-events-none fixed top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#d4af37]/15 via-[#38bdf8]/10 to-transparent blur-3xl z-0" />

      {/* Global Navbar */}
      <ClientNavbar />

      <PageTransition className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header Phẩm Cấp Tuệ Căn */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            Sổ Công Đức & Vận Mệnh Tuệ Căn • Tâm An Đạo Tràng
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold font-display-gold">
            Hồ Sơ Tu Tập & Phước Báu
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Mỗi niệm lành, mỗi phút tọa thiền, mỗi quẻ bốc khởi tâm đều được ghi khắc vào dòng tâm thức vô vi.
            Đức năng thắng số, phước đức sâu dày sẽ chuyển hóa mọi chướng duyên.
          </p>
        </div>

        {/* Thẻ Bài Phẩm Cấp Vương Giả 4K */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121b2d] via-[#091124] to-[#040711] border-2 border-[#d4af37]/50 shadow-[0_20px_50px_rgba(212,175,55,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#fcd34d]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {/* Cột Trái: Huy Hiệu & Danh Hiệu */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400/20 via-yellow-500/20 to-amber-600/30 border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.35)] shrink-0">
                <Award className="w-12 h-12 text-[#fef08a] animate-pulse" />
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-mono text-amber-400/80 uppercase tracking-widest">
                  Phẩm Cấp Tuệ Căn Hiện Tại
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                  {profile.spiritualTier}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md italic leading-relaxed">
                  &ldquo;{profile.tierDescription}&rdquo;
                </p>
              </div>
            </div>

            {/* Cột Phải: Tổng Điểm & Nút Gieo Duyên */}
            <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
              <div className="text-center md:text-right">
                <div className="text-xs font-mono text-slate-400">Tổng Công Đức Tích Lũy</div>
                <div className="text-4xl sm:text-5xl font-serif font-bold text-[#fef08a] tracking-tight">
                  {profile.totalMerit.toLocaleString()}{" "}
                  <span className="text-sm font-mono text-amber-400 font-normal">điểm</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ZenButton
                  variant="gold"
                  size="sm"
                  icon={Heart}
                  onClick={() => {
                    zenAudio.playCrystalChime(784, 0.05);
                    setIsDonationOpen(true);
                  }}
                >
                  Tùy Hỷ Cúng Dường
                </ZenButton>
              </div>
            </div>
          </div>

          {/* 4 Chỉ Số Tu Tập Trực Quan */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center">
              <Flame className="w-5 h-5 text-orange-400 mb-1" />
              <div className="text-lg font-bold font-serif text-white">{profile.dailyStreak} ngày</div>
              <div className="text-[10px] font-mono text-slate-400">Chuỗi Tinh Tấn Liên Tục</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center">
              <Clock className="w-5 h-5 text-sky-400 mb-1" />
              <div className="text-lg font-bold font-serif text-white">{profile.meditationMinutes} phút</div>
              <div className="text-[10px] font-mono text-slate-400">Tọa Thiền Sóng Não</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-5 h-5 text-emerald-400 mb-1" />
              <div className="text-lg font-bold font-serif text-white">{profile.completedChantsCount} biến</div>
              <div className="text-[10px] font-mono text-slate-400">Lần Chuỗi 108 Hạt</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center">
              <Compass className="w-5 h-5 text-amber-400 mb-1" />
              <div className="text-lg font-bold font-serif text-white">{profile.divinationCount} lần</div>
              <div className="text-[10px] font-mono text-slate-400">Gieo Quẻ Khai Tuệ</div>
            </div>
          </div>
        </div>

        {/* Lịch Sử Tích Lũy Công Đức */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#fcd34d]" />
              <h3 className="font-serif text-xl font-bold text-white">
                Nhật Ký Tinh Tấn Gần Đây
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Hiển thị {profile.logs.length} sự kiện
            </span>
          </div>

          <div className="rounded-2xl bg-[#070d1e]/80 border border-white/10 divide-y divide-white/5 overflow-hidden backdrop-blur-xl">
            {profile.logs.slice().reverse().map((log) => {
              const badgeInfo = actionBadges[log.action] || { label: "Phước Báu", color: "text-amber-300 bg-amber-500/10 border-amber-500/30" };
              const dateStr = new Date(log.timestamp).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
              });

              return (
                <div key={log.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase border ${badgeInfo.color}`}>
                      {badgeInfo.label}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-white">{log.title}</div>
                      <div className="text-[11px] font-mono text-slate-400">{dateStr}</div>
                    </div>
                  </div>

                  <div className="font-mono text-sm font-bold text-emerald-400 shrink-0">
                    +{log.meritPoints} <span className="text-xs font-normal">điểm</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageTransition>

      {/* Modal Tùy Tâm Cúng Dường */}
      <MeritDonationModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} />

      {/* Global Footer */}
      <ClientFooter />
    </div>
  );
}
