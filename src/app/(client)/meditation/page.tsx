"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Bell,
  Waves,
  Clock,
  Infinity as InfinityIcon,
  CheckCircle2,
  Flower2,
  Heart,
  Volume2,
} from "lucide-react";
import MeditationScene, { BreathingPhase } from "@/components/3d/MeditationScene";
import ClientNavbar from "@/components/ui/ClientNavbar";
import ClientFooter from "@/components/ui/ClientFooter";
import ZenButton from "@/components/ui/ZenButton";
import ZenBadge from "@/components/ui/ZenBadge";
import PageTransition from "@/components/ui/PageTransition";
import { zenAudio } from "@/utils/zenAudio";
import {
  recordBrainEvent,
  getBrainMemory,
  recommendMeditationFromBrain,
} from "@/utils/unifiedBrain";
import { addMeritPoints, getMeritProfile } from "@/utils/meritSystem";
import SacredVoicePlayer from "@/components/audio/SacredVoicePlayer";

interface BreathingGuide {
  title: string;
  description: string;
  color: string;
  badge: string;
}

const BREATHING_PHASES: Record<BreathingPhase, BreathingGuide> = {
  inhale: {
    title: "Hít Vào...",
    description: "Đón nhận dưỡng khí trong lành và năng lượng vũ trụ tươi mới vào lồng ngực.",
    color: "#fef08a",
    badge: "Giai Đoạn 1 • Khai Mở",
  },
  "hold-in": {
    title: "Giữ Hơi Thở",
    description: "Tĩnh lặng cảm nhận nguồn sinh lực lan tỏa nuôi dưỡng từng tế bào.",
    color: "#d4af37",
    badge: "Giai Đoạn 2 • Hội Tụ",
  },
  exhale: {
    title: "Thở Ra...",
    description: "Chậm rãi trút bỏ mọi căng thẳng, âu lo và tạp niệm ra ngoài.",
    color: "#8f9779",
    badge: "Giai Đoạn 3 • Buông Bỏ",
  },
  "hold-out": {
    title: "Tĩnh Lặng",
    description: "Trạng thái thanh tịnh tuyệt đối, hòa làm một với không gian thiền định.",
    color: "#38bdf8",
    badge: "Giai Đoạn 4 • An Trú",
  },
};

const PHASE_ORDER: BreathingPhase[] = ["inhale", "hold-in", "exhale", "hold-out"];
const PHASE_DURATION = 4; // 4 seconds per phase (4-4-4-4 Box Breathing)

interface DurationOption {
  id: string;
  label: string;
  seconds: number | null; // null represents Infinity (Không giới hạn)
  subtitle: string;
}

const DURATION_OPTIONS: DurationOption[] = [
  {
    id: "3m",
    label: "3 Phút",
    seconds: 180,
    subtitle: "Thư giãn nhanh",
  },
  {
    id: "5m",
    label: "5 Phút",
    seconds: 300,
    subtitle: "Tái tạo năng lượng",
  },
  {
    id: "10m",
    label: "10 Phút",
    seconds: 600,
    subtitle: "Lắng đọng tâm thức",
  },
  {
    id: "15m",
    label: "15 Phút",
    seconds: 900,
    subtitle: "Thiền định sâu",
  },
  {
    id: "infinity",
    label: "Vô Cực",
    seconds: null,
    subtitle: "Buông thư tự do (∞)",
  },
];

export default function MeditationPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(300); // 5 phút mặc định
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0); // 0 to 1
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [strikeTrigger, setStrikeTrigger] = useState(0);
  const [bowlStrikesCount, setBowlStrikesCount] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState<"box" | "deep" | "zen">("box");
  const [selectedFrequency, setSelectedFrequency] = useState<432 | 528 | 639 | 852>(432);
  const [brainRec, setBrainRec] = useState<{ recommendedDuration: number; reason: string; focus: string } | null>(null);
  const [earnedMerit, setEarnedMerit] = useState<number>(0);
  const [meritProfile, setMeritProfile] = useState<any>(null);

  useEffect(() => {
    const mem = getBrainMemory();
    const rec = recommendMeditationFromBrain(mem);
    setBrainRec(rec);
    setMeritProfile(getMeritProfile());
  }, []);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentPhase = PHASE_ORDER[currentPhaseIndex];

  // Ref trackers for interval loop
  const sessionSecondsRef = useRef(sessionSeconds);
  useEffect(() => {
    sessionSecondsRef.current = sessionSeconds;
  }, [sessionSeconds]);

  const selectedDurationRef = useRef(selectedDuration);
  useEffect(() => {
    selectedDurationRef.current = selectedDuration;
  }, [selectedDuration]);

  // Synthesize authentic 432Hz Tibetan Singing Bowl chime via Web Audio API
  const playSingingBowlSound = useCallback((frequency = 432) => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Authentic singing bowl physical overtone spectrum
      const harmonics = [1, 2.01, 3.02, 4.15, 5.8];
      const gains = [0.28, 0.14, 0.07, 0.03, 0.01];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.7, now);
      masterGain.connect(ctx.destination);

      harmonics.forEach((multiplier, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency * multiplier, now);

        g.gain.setValueAtTime(gains[i], now);
        // Long reverberation resonance (7.5 seconds exponential decay)
        g.gain.exponentialRampToValueAtTime(0.00001, now + 7.5);

        osc.connect(g);
        g.connect(masterGain);

        osc.start(now);
        osc.stop(now + 7.6);
      });
    } catch (e) {
      console.warn("Singing bowl sound error:", e);
    }
  }, []);

  // Completion Tibetan Singing Bowl chime: deep majestic multi-harmonic temple chime
  const playCompletionSingingBowlChime = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Sacred harmonic multi-frequencies:
      // 216Hz: Deep grounding root
      // 432Hz: Sacred healing frequency (Tibetan Singing Bowl fundamental)
      // 434.2Hz: Micro-detuned beating overtone (creates natural acoustic tremolo shimmer)
      // 528Hz: Miraculous Solfeggio transformation tone
      // 864Hz: High crystal Tibetan temple bell octave
      // 1056Hz: Celestial overtone
      const bowlVoices = [
        { freq: 216, gain: 0.35, decay: 10.0 },
        { freq: 432, gain: 0.52, decay: 11.5 },
        { freq: 434.2, gain: 0.28, decay: 10.5 },
        { freq: 528, gain: 0.34, decay: 9.5 },
        { freq: 864, gain: 0.18, decay: 8.0 },
        { freq: 1056, gain: 0.08, decay: 6.5 },
      ];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.85, now);
      masterGain.connect(ctx.destination);

      bowlVoices.forEach((voice) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(voice.freq, now);

        // Soft mallet strike attack envelope (20ms attack to avoid clicks)
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(voice.gain, now + 0.02);
        // Majestic long decay
        g.gain.exponentialRampToValueAtTime(0.00001, now + voice.decay);

        osc.connect(g);
        g.connect(masterGain);

        osc.start(now);
        osc.stop(now + voice.decay + 0.1);
      });
    } catch (e) {
      console.warn("Completion chime error:", e);
    }
  }, []);

  // Strike bowl trigger
  const handleStrikeBowl = useCallback(() => {
    setStrikeTrigger((prev) => prev + 1);
    setBowlStrikesCount((prev) => prev + 1);
    playSingingBowlSound(432);
  }, [playSingingBowlSound]);

  // Breathing Box Timer Loop (4-4-4-4) & Session Countdown/Elapsed
  useEffect(() => {
    if (!isStarted) return;

    const baseElapsed = sessionSecondsRef.current;
    const startTimestamp = Date.now();
    let currentIdx = currentPhaseIndex;

    const interval = setInterval(() => {
      const now = Date.now();
      const deltaSeconds = (now - startTimestamp) / 1000;
      const totalElapsed = baseElapsed + deltaSeconds;
      const currentSecs = Math.floor(totalElapsed);

      // Check if session reached target duration
      const targetDuration = selectedDurationRef.current;
      if (targetDuration !== null && totalElapsed >= targetDuration) {
        setSessionSeconds(targetDuration);
        setIsStarted(false);
        setIsCompleted(true);
        playCompletionSingingBowlChime();
        setStrikeTrigger((prev) => prev + 1);
        setBowlStrikesCount((prev) => prev + 1);

        // Tích lũy Công Đức & Tuệ Căn
        const meritAward = Math.max(30, Math.floor(targetDuration / 6)); // Ví dụ 300s = 50 công đức
        setEarnedMerit(meritAward);
        const updatedProf = addMeritPoints(
          "MEDITATION",
          `Khóa tọa thiền ${Math.round(targetDuration / 60)} phút tần số ${selectedFrequency}Hz`,
          meritAward,
          { meditationSecs: targetDuration }
        );
        setMeritProfile(updatedProf);

        // Đồng bộ vào Bộ Não Tâm An duy nhất (Unified Brain)
        try {
          recordBrainEvent({
            type: "MEDITATION",
            data: {
              durationSeconds: targetDuration,
              completed: true,
              technique: selectedTechnique,
              frequency: selectedFrequency,
              bowlStrikes: bowlStrikesCount + 1,
              meritEarned: meritAward,
            },
          });
        } catch (e) {
          console.error("Lỗi đồng bộ thiền định vào Bộ Não Tâm An:", e);
        }

        clearInterval(interval);
        return;
      }

      setSessionSeconds(currentSecs);

      const cycleTime = totalElapsed % (PHASE_DURATION * 4);
      const phaseIdx = Math.floor(cycleTime / PHASE_DURATION);
      const prog = (cycleTime % PHASE_DURATION) / PHASE_DURATION;

      if (phaseIdx !== currentIdx) {
        currentIdx = phaseIdx;
        setCurrentPhaseIndex(phaseIdx);
        // Play subtle singing bowl ding when entering Inhale phase
        if (phaseIdx === 0) {
          playSingingBowlSound(528);
        }
      }
      setPhaseProgress(prog);
    }, 50);

    return () => clearInterval(interval);
  }, [isStarted, playSingingBowlSound, playCompletionSingingBowlChime, currentPhaseIndex]);

  const toggleSession = () => {
    if (!isStarted) {
      if (isCompleted) {
        setIsCompleted(false);
        setSessionSeconds(0);
      }
      setIsStarted(true);
      playSingingBowlSound(432);
    } else {
      setIsStarted(false);
      zenAudio.playSoftTap(400, 0.05);
    }
  };

  const resetSession = () => {
    zenAudio.playSoftTap(500, 0.04);
    setIsStarted(false);
    setIsCompleted(false);
    setSessionSeconds(0);
    setCurrentPhaseIndex(0);
    setPhaseProgress(0);
  };

  const handleSelectDuration = (seconds: number | null) => {
    zenAudio.playSoftTap(520, 0.04);
    setSelectedDuration(seconds);
    setIsCompleted(false);
    if (!isStarted) {
      setSessionSeconds(0);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Remaining seconds for countdown HUD
  const remainingSeconds =
    selectedDuration !== null ? Math.max(0, selectedDuration - sessionSeconds) : null;

  // Overall session progress (0 to 1)
  const overallProgress =
    selectedDuration !== null && selectedDuration > 0
      ? Math.min(1, sessionSeconds / selectedDuration)
      : 0;

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-[#fef08a] flex flex-col justify-between">
      {/* 3D WebGL Canvas Layer (Full Screen Background) */}
      <div className="fixed inset-0 z-0">
        <MeditationScene
          phase={currentPhase}
          progress={phaseProgress}
          isStarted={isStarted}
          onStrikeBowl={handleStrikeBowl}
          strikeTrigger={strikeTrigger}
        />
      </div>

      {/* Atmospheric Vignette & Subtle Radiance */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(6,9,19,0.3)_50%,_rgba(6,9,19,0.9)_100%)]" />

      {/* Unified Client Navigation Header */}
      <ClientNavbar />

      {/* Page Content Transition Container */}
      <PageTransition className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-20 flex flex-col items-center justify-between pointer-events-none">
        {/* Top Badges, Title & Duration Selector Chips */}
        <div className="text-center max-w-2xl mx-auto pointer-events-auto">
          <ZenBadge
            variant="sage"
            label="WebGL 3D Mandala & Tibetan Singing Bowl"
            size="sm"
            className="mb-2"
          />
          <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white drop-shadow-md">
            Thiền Định <span className="text-[#d4af37]">Sóng Não & Chuông Xoay</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Di chuyển chuột trên mặt nước thiền hoặc nhấp trực tiếp vào chuông xoay 3D để cộng hưởng tần số 432Hz.
          </p>

          {/* Khuyến nghị thông tuệ từ Bộ Não Tâm An (Unified Brain Synchronicity) */}
          {brainRec && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-400/30 backdrop-blur-md max-w-lg mx-auto flex items-center justify-between gap-3 text-left shadow-[0_0_15px_rgba(245,158,11,0.1)]"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
                <div>
                  <p className="text-[11px] font-medium text-amber-200">
                    Bộ Não Tâm An gợi ý: <span className="font-semibold text-white">{brainRec.focus}</span>
                  </p>
                  <p className="text-[10px] text-amber-300/70">{brainRec.reason}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleSelectDuration(brainRec.recommendedDuration)}
                className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-100 whitespace-nowrap active:scale-95 transition-all cursor-pointer"
              >
                Áp dụng {Math.round(brainRec.recommendedDuration / 60)} phút
              </button>
            </motion.div>
          )}

          {/* Duration Selector Chips */}
          <div className="mt-4 flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-[11px] text-[#d4af37]/80 font-mono tracking-wider mb-2 uppercase">
              <Clock className="w-3 h-3 text-[#d4af37]" />
              <span>Thời Lượng Thiền Định</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-xl">
              {DURATION_OPTIONS.map((opt) => {
                const isSelected = selectedDuration === opt.seconds;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectDuration(opt.seconds)}
                    className={`group relative px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5 border active:scale-95 ${
                      isSelected
                        ? "bg-[#d4af37]/20 border-[#d4af37] text-[#fef08a] shadow-[0_0_16px_rgba(212,175,55,0.35)]"
                        : "bg-black/40 backdrop-blur-md border-white/10 text-slate-300 hover:text-white hover:border-white/25 hover:bg-white/5"
                    }`}
                    title={`${opt.label}: ${opt.subtitle}`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#fef08a] animate-pulse" />
                    )}
                    {opt.seconds === null ? (
                      <InfinityIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                    ) : (
                      <Clock className="w-3 h-3 text-[#d4af37]/80" />
                    )}
                    <span className="font-semibold">{opt.label}</span>
                    <span
                      className={`hidden md:inline text-[10px] opacity-70 ${
                        isSelected ? "text-[#fef08a]" : "text-slate-400"
                      }`}
                    >
                      • {opt.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center mt-3">
            <ZenButton
              onClick={handleStrikeBowl}
              variant="gold"
              size="sm"
              borderBeam={true}
              icon={Bell}
              iconPosition="left"
              soundEnabled={false} // Handled by handleStrikeBowl
              className="text-xs"
            >
              Gõ Chuông Tây Tạng 432Hz
            </ZenButton>
          </div>
        </div>

        {/* Center Breathing HUD (Box Breathing 4-4-4-4 & Elegant Countdown HUD) */}
        <div className="my-auto py-6 sm:py-8 flex flex-col items-center justify-center text-center pointer-events-auto">
          {/* Circular Breathing Wave Indicator */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center mb-6">
            {/* Outer Pulsing Breath Aura Ring */}
            <motion.div
              animate={{
                scale: isStarted
                  ? currentPhase === "inhale"
                    ? 1 + phaseProgress * 0.25
                    : currentPhase === "hold-in"
                    ? 1.25
                    : currentPhase === "exhale"
                    ? 1.25 - phaseProgress * 0.25
                    : 1.0
                  : 1.0,
                borderColor: BREATHING_PHASES[currentPhase].color,
              }}
              transition={{ ease: "easeInOut", duration: 0.1 }}
              className="absolute inset-0 rounded-full border-2 border-[#d4af37]/40 shadow-[0_0_40px_rgba(212,175,55,0.25)]"
            />

            {/* Overall Session Progress Circle (When duration is finite) */}
            {selectedDuration !== null && (
              <svg className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="rgba(212,175,55,0.12)"
                  strokeWidth="2"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2.5"
                  strokeDasharray="100 100"
                  strokeDashoffset={100 - overallProgress * 100}
                  pathLength="100"
                  strokeLinecap="round"
                  className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                />
              </svg>
            )}

            {/* Glowing Inner Backdrop Circle */}
            <div className="absolute inset-4 rounded-full bg-black/45 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center p-4">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#8f9779] uppercase mb-0.5 sm:mb-1">
                {isStarted ? BREATHING_PHASES[currentPhase].badge : "Box Breathing 4-4"}
              </span>

              <motion.h2
                key={currentPhase}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-serif font-bold text-white mb-0.5 sm:mb-1"
                style={{ color: BREATHING_PHASES[currentPhase].color }}
              >
                {isStarted ? BREATHING_PHASES[currentPhase].title : "Sẵn Sàng"}
              </motion.h2>

              {/* Elegant Countdown / Elapsed HUD */}
              <div className="flex flex-col items-center mt-1">
                {remainingSeconds !== null ? (
                  <>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-[#fef08a] drop-shadow-[0_0_8px_rgba(254,240,138,0.3)]">
                      <Clock className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                      <span className="tracking-widest">
                        {formatTime(remainingSeconds)}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5 tracking-wider">
                      {isStarted
                        ? `Còn lại • ${Math.round(overallProgress * 100)}%`
                        : `Thời lượng: ${formatTime(selectedDuration!)}`}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-sky-200 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
                      <InfinityIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span className="tracking-widest">
                        {formatTime(sessionSeconds)}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5 tracking-wider">
                      Vô Cực • Không giới hạn
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* SVG Progress Circle for 4-4-4-4 Box Breathing Phase */}
            {isStarted && (
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                  cx="50%"
                  cy="50%"
                  r="46%"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="4"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="46%"
                  fill="none"
                  stroke={BREATHING_PHASES[currentPhase].color}
                  strokeWidth="5"
                  strokeDasharray="100 100"
                  strokeDashoffset={100 - phaseProgress * 100}
                  pathLength="100"
                  strokeLinecap="round"
                  className="transition-all duration-75"
                />
              </svg>
            )}
          </div>

          {/* Phase Guidance Text */}
          <motion.p
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm sm:text-base text-slate-200 max-w-md mx-auto italic font-serif leading-relaxed drop-shadow mb-4"
          >
            &ldquo;{isStarted ? BREATHING_PHASES[currentPhase].description : "Hãy giữ lưng thẳng, thả lỏng bờ vai và bắt đầu lắng nghe tiếng chuông."}&rdquo;
          </motion.p>

          {/* Lời Dẫn Thiền Tâm An Minh Triết (Sacred Guided Voice) */}
          <div className="w-full max-w-lg mx-auto">
            <SacredVoicePlayer
              title="Pháp Âm Dẫn Thiền: Thân Tâm An Tịnh"
              textToRead="Chào bạn, hãy ngồi thật thoải mái, giữ thẳng cột sống và nhẹ nhàng khép mi mắt lại. Hít vào thật sâu đón nhận năng lượng thanh khiết của vũ trụ. Giữ nhẹ hơi thở, cảm nhận sự an định lan tỏa khắp thân tâm. Rồi từ từ thở ra, buông bỏ mọi muộn phiền, lo âu và căng thẳng. Lắng nghe tiếng chuông xoay Tây Tạng ngân vang, đưa tâm thức trở về với giây phút hiện tại nhiệm màu."
            />
          </div>
        </div>

        {/* Bottom Control Dock */}
        <div className="w-full max-w-2xl bg-black/60 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Play/Pause Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <ZenButton
                onClick={toggleSession}
                variant="gold"
                size="md"
                borderBeam={true}
                soundEnabled={false} // Custom sound played in toggleSession
                icon={isStarted ? Pause : Play}
                iconPosition="left"
                className="font-serif font-bold tracking-wider"
              >
                {isStarted ? "TẠM DỪNG" : "BẮT ĐẦU THIỀN"}
              </ZenButton>

              {sessionSeconds > 0 && (
                <ZenButton
                  onClick={resetSession}
                  variant="glass"
                  size="icon"
                  borderBeam={false}
                  icon={RotateCcw}
                  aria-label="Đặt lại thời gian thiền"
                />
              )}
            </div>

            {/* Session Stats */}
            <div className="flex items-center gap-5 sm:gap-6 text-center sm:text-right">
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  {remainingSeconds !== null ? "Thời Gian Còn Lại" : "Đã Thiền Định"}
                </span>
                <span className="text-lg font-mono font-bold text-white">
                  {remainingSeconds !== null ? formatTime(remainingSeconds) : formatTime(sessionSeconds)}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Số Lần Ngân Chuông
                </span>
                <span className="text-lg font-mono font-bold text-[#fef08a]">
                  {bowlStrikesCount}
                </span>
              </div>
            </div>
          </div>

          {/* Solfeggio 4-Frequency Selector */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#fef08a] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                Tần Số Solfeggio Chữa Lành:
              </span>
              {meritProfile && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Công đức: {meritProfile.totalMerit} • {meritProfile.spiritualTier}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setSelectedFrequency(432);
                  playSingingBowlSound(432);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedFrequency === 432
                    ? "bg-[#d4af37]/20 border-[#d4af37] text-[#fef08a] shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold font-mono">432 Hz</div>
                <div className="text-[10px] text-slate-300">An Tịnh & Chữa Lành</div>
              </button>

              <button
                onClick={() => {
                  setSelectedFrequency(528);
                  playSingingBowlSound(528);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedFrequency === 528
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.3)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold font-mono">528 Hz</div>
                <div className="text-[10px] text-slate-300">Kỳ Diệu & Tái Tạo DNA</div>
              </button>

              <button
                onClick={() => {
                  setSelectedFrequency(639);
                  playSingingBowlSound(639);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedFrequency === 639
                    ? "bg-rose-500/20 border-rose-400 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold font-mono">639 Hz</div>
                <div className="text-[10px] text-slate-300">Gắn Kết Yêu Thương</div>
              </button>

              <button
                onClick={() => {
                  setSelectedFrequency(852);
                  playSingingBowlSound(852);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedFrequency === 852
                    ? "bg-sky-500/20 border-sky-400 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <div className="text-xs font-bold font-mono">852 Hz</div>
                <div className="text-[10px] text-slate-300">Khai Mở Tuệ Giác</div>
              </button>
            </div>
          </div>

          {/* Technique Selector Tabs */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-[11px] font-mono text-[#8f9779] whitespace-nowrap">
              ✦ Phương Pháp:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  zenAudio.playSoftTap(450, 0.03);
                  setSelectedTechnique("box");
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono active:scale-95 transition-all cursor-pointer ${
                  selectedTechnique === "box"
                    ? "bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#fef08a] shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                Hơi Thở 4-4 (Box)
              </button>
              <button
                onClick={() => {
                  zenAudio.playSoftTap(500, 0.03);
                  setSelectedTechnique("deep");
                  handleStrikeBowl();
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono active:scale-95 transition-all cursor-pointer ${
                  selectedTechnique === "deep"
                    ? "bg-[#8f9779]/20 border border-[#8f9779]/60 text-[#d9e2c6] shadow-[0_0_12px_rgba(143,151,121,0.2)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                Chuông Xoay Solfeggio
              </button>
              <button
                onClick={() => {
                  zenAudio.playSoftTap(550, 0.03);
                  setSelectedTechnique("zen");
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono active:scale-95 transition-all cursor-pointer ${
                  selectedTechnique === "zen"
                    ? "bg-[#38bdf8]/20 border border-[#38bdf8]/60 text-[#bae6fd] shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                Tĩnh Lặng Vô Thức
              </button>
            </div>
          </div>
        </div>
      </PageTransition>

      {/* Completion Peaceful Celebration Modal & Tâm An AI Blessing */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-gradient-to-b from-[#111827]/95 via-[#0a0f1d]/95 to-[#060913]/98 border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(212,175,55,0.25)] text-center overflow-hidden"
            >
              {/* Sacred Background Ambient Glow */}
              <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-br from-[#d4af37]/20 via-[#fef08a]/10 to-transparent blur-3xl" />

              {/* Lotus & Singing Bowl Sacred Emblem */}
              <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-[#d4af37]/30 to-[#fef08a]/10 border-2 border-[#d4af37]/60 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <Flower2 className="w-10 h-10 text-[#fef08a] animate-pulse" />
              </div>

              <ZenBadge
                variant="gold"
                label="Tâm An AI • Lời Chúc An Lành"
                size="sm"
                className="mb-3"
              />

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-md">
                Khóa Thiền Định <span className="text-[#d4af37]">Viên Mãn</span>
              </h2>

              <p className="text-xs sm:text-sm font-serif italic text-amber-100/90 mt-3 mb-4 max-w-md mx-auto leading-relaxed">
                &ldquo;Nguyện chúc thân tâm bạn luôn nhẹ nhàng như mây trời, tĩnh tại như ngọn núi và sáng tỏ như dòng suối trong. Hãy mang theo hơi thở bình an này vào từng bước chân và nụ cười hôm nay.&rdquo;
              </p>

              {/* Earned Merit Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border border-[#d4af37]/50 rounded-full px-4 py-1.5 mb-5 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                <Sparkles className="w-4 h-4 text-[#fef08a] animate-spin" />
                <span className="text-xs font-mono font-bold text-amber-200">
                  +{earnedMerit || 50} Điểm Công Đức &bull; {meritProfile?.spiritualTier || "Tuệ Căn An Trú"}
                </span>
              </div>

              {/* Zen Session Summary Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3 px-2 sm:px-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                <div className="flex flex-col items-center justify-center p-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    Thời Lượng
                  </span>
                  <span className="text-base sm:text-lg font-mono font-bold text-white">
                    {formatTime(sessionSeconds)}
                  </span>
                  <span className="text-[10px] text-slate-400">Đã định tâm</span>
                </div>

                <div className="flex flex-col items-center justify-center p-2 border-x border-white/10">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Waves className="w-3 h-3 text-[#8f9779]" />
                    Hơi Thở 4-4
                  </span>
                  <span className="text-base sm:text-lg font-mono font-bold text-[#fef08a]">
                    {Math.max(1, Math.floor(sessionSeconds / 16))}
                  </span>
                  <span className="text-[10px] text-slate-400">Chu kỳ trọn vẹn</span>
                </div>

                <div className="flex flex-col items-center justify-center p-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Bell className="w-3 h-3 text-[#38bdf8]" />
                    Chuông Xoay
                  </span>
                  <span className="text-base sm:text-lg font-mono font-bold text-[#bae6fd]">
                    {bowlStrikesCount}
                  </span>
                  <span className="text-[10px] text-slate-400">Lần ngân 432Hz</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <ZenButton
                  onClick={() => {
                    playCompletionSingingBowlChime();
                    setStrikeTrigger((prev) => prev + 1);
                    setBowlStrikesCount((prev) => prev + 1);
                  }}
                  variant="gold"
                  size="sm"
                  icon={Bell}
                  iconPosition="left"
                  soundEnabled={false}
                >
                  Ngân Lại Đại Hồng Chung
                </ZenButton>

                <ZenButton
                  onClick={() => {
                    setIsCompleted(false);
                    setSessionSeconds(0);
                    setCurrentPhaseIndex(0);
                    setPhaseProgress(0);
                    setIsStarted(true);
                    playSingingBowlSound(432);
                  }}
                  variant="glass"
                  size="sm"
                  icon={RotateCcw}
                  iconPosition="left"
                  soundEnabled={false}
                >
                  Tọa Thiền Khóa Mới
                </ZenButton>

                <ZenButton
                  onClick={() => setIsCompleted(false)}
                  variant="ghost"
                  size="sm"
                  icon={CheckCircle2}
                  iconPosition="left"
                >
                  Trở Về Tĩnh Lặng
                </ZenButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified Client Footer */}
      <ClientFooter />
    </div>
  );
}
