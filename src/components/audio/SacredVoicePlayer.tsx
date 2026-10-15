"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Sparkles,
  Waves,
  Feather,
} from "lucide-react";
import {
  sacredVoice,
  SacredVoiceState,
  speakReading,
  pauseSpeaking,
  resumeSpeaking,
  stopSpeaking,
} from "@/utils/sacredVoice";
import { zenAudio } from "@/utils/zenAudio";

interface SacredVoicePlayerProps {
  textToRead?: string;
  title?: string;
  className?: string;
  compact?: boolean;
}

export default function SacredVoicePlayer({
  textToRead,
  title = "Bậc Thầy Tâm An đang khai mở lời quẻ...",
  className = "",
  compact = false,
}: SacredVoicePlayerProps) {
  const [voiceState, setVoiceState] = useState<SacredVoiceState>(
    sacredVoice.getState()
  );

  useEffect(() => {
    const unsubscribe = sacredVoice.subscribe((state) => {
      setVoiceState(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleTogglePlay = () => {
    if (voiceState.isSpeaking) {
      if (voiceState.isPaused) {
        zenAudio.playSoftTap(528, 0.05);
        resumeSpeaking();
      } else {
        zenAudio.playSoftTap(432, 0.05);
        pauseSpeaking();
      }
    } else {
      if (!textToRead) return;
      zenAudio.playCrystalChime(852, 0.08);
      speakReading(textToRead);
    }
  };

  const handleStop = () => {
    zenAudio.playCrystalClick(920, 0.05);
    stopSpeaking();
  };

  // Nếu ở chế độ compact (nút bấm gọn trên header/card)
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <button
          onClick={handleTogglePlay}
          className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-semibold border transition-all duration-300 cursor-pointer active:scale-95 ${
            voiceState.isSpeaking
              ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
              : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-amber-400/40 hover:bg-white/10"
          }`}
          title={
            voiceState.isSpeaking
              ? voiceState.isPaused
                ? "Tiếp tục đọc lời khai thị"
                : "Tạm dừng giọng đọc"
              : "Lắng nghe lời khai thị (Giọng AI Tâm An)"
          }
        >
          {voiceState.isSpeaking && !voiceState.isPaused ? (
            <Pause className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          )}

          <span>
            {voiceState.isSpeaking
              ? voiceState.isPaused
                ? "Tiếp Tục Đọc"
                : "Đang Khai Mở..."
              : "Nghe Lời Khai Thị"}
          </span>

          {voiceState.isSpeaking && !voiceState.isPaused && (
            <div className="flex items-center gap-0.5 ml-1">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  animate={{ height: ["4px", "12px", "4px"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-0.5 bg-amber-400 rounded-full"
                />
              ))}
            </div>
          )}
        </button>

        {voiceState.isSpeaking && (
          <button
            onClick={handleStop}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-rose-400 border border-white/10 transition-all cursor-pointer"
            title="Dừng giọng đọc"
          >
            <Square className="w-3 h-3 fill-current" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-br from-[#141007]/95 via-[#0b0f1a]/95 to-black/95 p-5 sm:p-6 shadow-[0_0_40px_rgba(245,158,11,0.18)] backdrop-blur-2xl ${className}`}
    >
      {/* Visualizer Sóng Âm Mandala Phát Sáng Lung Linh */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 pointer-events-none opacity-20">
        <motion.div
          animate={{
            rotate: voiceState.isSpeaking && !voiceState.isPaused ? 360 : 0,
            scale: voiceState.isSpeaking && !voiceState.isPaused ? [1, 1.08, 1] : 1,
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 25, ease: "linear" },
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          }}
          className="w-full h-full rounded-full border-2 border-dashed border-amber-400"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Phần Thông Tin Trạng Thái & Mandala Visualizer Center */}
        <div className="flex items-center gap-4">
          {/* Vòng Tròn Mandala Sóng Âm Phát Sáng */}
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/25 to-yellow-600/10 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] shrink-0 overflow-hidden">
            {voiceState.isSpeaking && !voiceState.isPaused ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="absolute inset-1 rounded-xl border border-dashed border-amber-300/40"
              />
            ) : null}

            <AnimatePresence mode="wait">
              {voiceState.isSpeaking && !voiceState.isPaused ? (
                <motion.div
                  key="speaking"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-0.5"
                >
                  {[0, 1, 2, 3, 4].map((bar) => (
                    <motion.div
                      key={bar}
                      animate={{
                        height: [6, 22, 10, 26, 8][(bar + 1) % 5],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 0.6 + bar * 0.12,
                        ease: "easeInOut",
                      }}
                      className="w-1 bg-gradient-to-t from-amber-400 to-yellow-200 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                    />
                  ))}
                </motion.div>
              ) : (
                <Volume2 className="w-6 h-6 text-amber-300" />
              )}
            </AnimatePresence>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                GIỌNG NÓI MINH TRIẾT AI
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Solfeggio 528Hz & Nhịp Alpha 88 WPM
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
              <span>{title}</span>
            </h4>

            <p className="text-xs text-amber-200/80 italic font-serif">
              {voiceState.isSpeaking
                ? voiceState.isPaused
                  ? "Tạm dừng phát âm • Nhấn Tiếp tục để nghe tiếp lời chỉ dẫn"
                  : "Đang hòa âm chuông xoay Tây Tạng và truyền tải tâm thức thanh tịnh..."
                : "Tự động kích hoạt âm nền chuông Tây Tạng 528Hz và nhịp đọc đưa não bộ về trạng thái an tĩnh"}
            </p>
          </div>
        </div>

        {/* Cụm Điều Khiển Phát / Dừng */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={handleTogglePlay}
            disabled={!textToRead && !voiceState.isSpeaking}
            className={`flex-1 md:flex-none px-5 py-2.5 rounded-2xl font-serif font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              voiceState.isSpeaking && !voiceState.isPaused
                ? "bg-amber-500/30 border border-amber-400 text-amber-100 hover:bg-amber-500/40"
                : "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110"
            }`}
          >
            {voiceState.isSpeaking && !voiceState.isPaused ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Tạm Dừng</span>
              </>
            ) : voiceState.isPaused ? (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Tiếp Tục Đọc</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Phát Pháp Âm</span>
              </>
            )}
          </button>

          {voiceState.isSpeaking && (
            <button
              type="button"
              onClick={handleStop}
              className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-400/40 transition-all flex items-center justify-center gap-1.5 text-xs font-mono cursor-pointer active:scale-95"
              title="Đóng / Dừng hẳn giọng đọc"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Dừng</span>
            </button>
          )}
        </div>
      </div>

      {/* Thanh Tiến Độ Đọc (Visualizer Progress Bar) */}
      {voiceState.isSpeaking && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
            <span className="flex items-center gap-1 text-amber-300">
              <Waves className="w-3 h-3 text-amber-400" />
              Đang khai mở lời pháp thoại:
            </span>
            <span>{Math.round(voiceState.progress * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/10">
            <motion.div
              style={{ width: `${voiceState.progress * 100}%` }}
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
