"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Sliders,
  ChevronDown,
  Music2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { zenAudio } from "@/utils/zenAudio";

interface SoundscapeOption {
  id: "432" | "528" | "639" | "bowl";
  title: string;
  hzText: string;
  desc: string;
  primaryFreq: number;
  binauralDelta: number;
}

const SOUNDSCAPES: SoundscapeOption[] = [
  {
    id: "432",
    title: "Sóng Não Alpha 432Hz",
    hzText: "432 Hz • Bình An",
    desc: "Đồng bộ tần số vũ trụ tự nhiên, giải tỏa căng thẳng",
    primaryFreq: 108, // 108 * 4 = 432Hz harmonic
    binauralDelta: 10, // 10Hz Alpha wave
  },
  {
    id: "528",
    title: "Tần Số Chữa Lành 528Hz",
    hzText: "528 Hz • Chuyển Hóa",
    desc: "Tần số Solfeggio Mi, chữa lành tế bào và luân xa tim",
    primaryFreq: 132, // 132 * 4 = 528Hz harmonic
    binauralDelta: 8, // 8Hz Theta-Alpha bridge
  },
  {
    id: "639",
    title: "Giao Cảm Yêu Thương 639Hz",
    hzText: "639 Hz • Hòa Hợp",
    desc: "Solfeggio Fa, hòa giải năng lượng và kết nối tâm giao",
    primaryFreq: 159.75, // harmonic to 639Hz
    binauralDelta: 6, // 6Hz Theta deep relaxation
  },
  {
    id: "bowl",
    title: "Chuông Xoay & Mõ Trầm",
    hzText: "Tibetan Bowl • Gia Trì",
    desc: "Chuông xoay Tây Tạng định tâm cùng tiếng mõ ấm trầm",
    primaryFreq: 216,
    binauralDelta: 4.5,
  },
];

export default function MeditativeAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState<SoundscapeOption["id"]>("432");
  const [volume, setVolume] = useState(0.2);
  const [menuOpen, setMenuOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const droneOscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalIdRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stopDrones = () => {
    if (intervalIdRef.current) {
      window.clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    droneOscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Already stopped
      }
    });
    droneOscillatorsRef.current = [];
  };

  const startSoundscape = async (scapeId: SoundscapeOption["id"]) => {
    try {
      stopDrones();

      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume), ctx.currentTime + 1.8);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      const scape = SOUNDSCAPES.find((s) => s.id === scapeId) || SOUNDSCAPES[0];
      const activeOscs: OscillatorNode[] = [];

      // Binaural & Solfeggio Dual-Generator
      const oscLeft = ctx.createOscillator();
      const oscRight = ctx.createOscillator();

      oscLeft.type = "sine";
      oscRight.type = "sine";

      oscLeft.frequency.setValueAtTime(scape.primaryFreq, ctx.currentTime);
      oscRight.frequency.setValueAtTime(scape.primaryFreq + scape.binauralDelta, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.35, ctx.currentTime);

      oscLeft.connect(filter);
      oscRight.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(masterGain);

      oscLeft.start();
      oscRight.start();
      activeOscs.push(oscLeft, oscRight);

      // Solfeggio Higher Overtones (Warm shimmer)
      const overtoneOsc = ctx.createOscillator();
      overtoneOsc.type = "triangle";
      overtoneOsc.frequency.setValueAtTime(scape.primaryFreq * 4, ctx.currentTime);

      const overtoneFilter = ctx.createBiquadFilter();
      overtoneFilter.type = "bandpass";
      overtoneFilter.frequency.setValueAtTime(scape.primaryFreq * 4, ctx.currentTime);
      overtoneFilter.Q.setValueAtTime(8, ctx.currentTime);

      const overtoneGain = ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.08, ctx.currentTime);

      overtoneOsc.connect(overtoneFilter);
      overtoneFilter.connect(overtoneGain);
      overtoneGain.connect(masterGain);

      overtoneOsc.start();
      activeOscs.push(overtoneOsc);

      droneOscillatorsRef.current = activeOscs;

      // Periodic Tibetan singing bowl resonance
      const strikeInterval = scape.id === "bowl" ? 12000 : 24000;
      intervalIdRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
        zenAudio.playTibetanBowl(scape.primaryFreq * 2, volume * 0.9);
      }, strikeInterval);

      // Play initial gentle welcoming bowl
      zenAudio.playTibetanBowl(scape.primaryFreq * 2, volume * 0.7);

      setIsPlaying(true);
    } catch (err) {
      console.error("Soundscape start error:", err);
    }
  };

  const toggleSound = async () => {
    if (isPlaying) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.25);
      }
      setIsPlaying(false);
      window.setTimeout(() => {
        stopDrones();
      }, 500);
    } else {
      await startSoundscape(activeSoundscape);
    }
  };

  const switchSoundscape = async (id: SoundscapeOption["id"]) => {
    setActiveSoundscape(id);
    zenAudio.playCrystalClick(1200, 0.05);
    if (isPlaying) {
      await startSoundscape(id);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        Math.max(0.0001, newVol),
        audioCtxRef.current.currentTime,
        0.05
      );
    }
  };

  useEffect(() => {
    return () => {
      stopDrones();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const currentScape = SOUNDSCAPES.find((s) => s.id === activeSoundscape) || SOUNDSCAPES[0];

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      {/* Nút bật/tắt chính mạ vàng */}
      <div className="flex items-center rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl p-0.5 hover:border-[#d4af37]/40 transition-colors shadow-sm">
        <button
          onClick={toggleSound}
          title={isPlaying ? "Tắt âm thanh tĩnh tâm" : "Bật âm thanh tĩnh tâm"}
          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
            isPlaying
              ? "bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#fef08a] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              : "text-slate-300 hover:text-white hover:bg-white/5"
          }`}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-3.5 h-3.5 text-[#fef08a] animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#fef08a] animate-ping" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-400 opacity-75" />
          )}

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-medium leading-none tracking-wide">
              {isPlaying ? currentScape.hzText : "Nhạc Thiền"}
            </span>
          </div>

          {isPlaying && (
            <div className="flex items-end gap-0.5 h-2.5 ml-0.5">
              <span className="w-0.5 bg-[#fef08a] rounded-full animate-[bounce_1.2s_infinite_100ms] h-full" />
              <span className="w-0.5 bg-[#fef08a] rounded-full animate-[bounce_1.4s_infinite_300ms] h-2" />
              <span className="w-0.5 bg-[#fef08a] rounded-full animate-[bounce_1s_infinite_200ms] h-2.5" />
            </div>
          )}
        </button>

        {/* Nút mở rộng bảng chọn tần số */}
        <button
          onClick={() => {
            zenAudio.playSoftTap(600, 0.03);
            setMenuOpen(!menuOpen);
          }}
          title="Chọn tần số thiền định & âm lượng"
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-0.5"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              menuOpen ? "rotate-180 text-[#fef08a]" : ""
            }`}
          />
        </button>
      </div>

      {/* Popover Menu Điều Khiển Âm Cảnh Đa Tần Số */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-[#070d1e]/95 backdrop-blur-2xl border border-[#d4af37]/35 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.2)] p-4 z-50 space-y-3.5"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-[#fef08a]" />
                <span className="font-serif font-bold text-sm text-white">
                  Pháp Âm Tĩnh Tâm
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#8f9779] uppercase">
                Solfeggio & Binaural
              </span>
            </div>

            {/* Danh sách 4 Tần số */}
            <div className="space-y-1.5">
              {SOUNDSCAPES.map((item) => {
                const isSelected = activeSoundscape === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => switchSoundscape(item.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-2.5 ${
                      isSelected
                        ? "bg-[#d4af37]/15 border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] text-white"
                        : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.05] text-slate-300"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span className={isSelected ? "text-[#fef08a]" : ""}>
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#fef08a] shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Điều chỉnh âm lượng */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
                <span>Âm lượng:</span>
                <span className="text-[#fef08a]">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
