// Sacred Voice Engine & TTS Specialist
// Dual-Layer Audio: Web Speech API (Vietnamese Natural Voice ~85-95 WPM Alpha State)
// combined with Procedural Web Audio Ambient Chimes (Solfeggio 528Hz & Mountain Stream)

import { zenAudio } from "./zenAudio";

export interface SacredVoiceState {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  progress: number; // 0 to 1
  voiceName: string;
}

type SacredVoiceListener = (state: SacredVoiceState) => void;

class SacredVoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private ambientAudioCtx: AudioContext | null = null;
  private ambientGainNode: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientTimer: number | null = null;
  private waterNoiseNode: AudioNode | null = null;

  private isSpeakingInternal = false;
  private isPausedInternal = false;
  private activeText = "";
  private currentProgress = 0;
  private chosenVoiceName = "Tự Nhiên (Tiếng Việt)";
  private listeners: Set<SacredVoiceListener> = new Set();

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      // Kích hoạt lấy danh sách giọng ngay lập tức
      this.synth.getVoices();
      if ("onvoiceschanged" in this.synth) {
        this.synth.onvoiceschanged = () => {
          this.pickVietnameseVoice();
        };
      }
    }
  }

  public subscribe(listener: SacredVoiceListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error("Sacred voice listener error:", err);
      }
    });
  }

  public getState(): SacredVoiceState {
    return {
      isSpeaking: this.isSpeakingInternal,
      isPaused: this.isPausedInternal,
      currentText: this.activeText,
      progress: this.currentProgress,
      voiceName: this.chosenVoiceName,
    };
  }

  /**
   * Khởi tạo Web Audio Context cho tầng âm nền kép (Dual-Layer Ambient Solfeggio 528Hz + Tiếng Nước Suối)
   */
  private startAmbientLayer() {
    if (typeof window === "undefined") return;

    try {
      this.stopAmbientLayer();

      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      this.ambientAudioCtx = new AudioCtxClass();
      const ctx = this.ambientAudioCtx;

      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      // Master ambient gain (25% volume theo yêu cầu ban quản trị)
      const masterGain = ctx.createGain();
      const now = ctx.currentTime;
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.25, now + 1.5);
      masterGain.connect(ctx.destination);
      this.ambientGainNode = masterGain;

      // 1. Solfeggio 528Hz Drone (Transformation & DNA Miracle Frequency)
      // Hòa âm ấm áp với 528Hz, 264Hz (octave trầm) và 1056Hz
      const solfeggioFrequencies = [264, 528, 792];
      solfeggioFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        // Micro-detune tạo binaural shimmer
        osc.detune.setValueAtTime((idx - 1) * 1.5, now);

        const targetG = idx === 1 ? 0.35 : idx === 0 ? 0.25 : 0.12;
        oscGain.gain.setValueAtTime(0.0001, now);
        oscGain.gain.linearRampToValueAtTime(targetG, now + 2.0);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        this.ambientOscillators.push(osc);
      });

      // 2. Tiếng nước suối ngàn / gió lành (Pink/Brown noise filter)
      try {
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0,
          b1 = 0,
          b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          output[i] = (b0 + b1 + b2) * 0.04;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.setValueAtTime(650, now);
        noiseFilter.Q.setValueAtTime(1.2, now);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.0001, now);
        noiseGain.gain.linearRampToValueAtTime(0.18, now + 2.0);

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        whiteNoise.start(now);
        this.waterNoiseNode = whiteNoise;
      } catch {
        // Fallback if audio buffer fails
      }

      // 3. Chuông xoay Tây Tạng Solfeggio 528Hz ngân định kỳ mỗi 14 giây
      const strikeAmbientBell = () => {
        if (!this.isSpeakingInternal || !this.ambientAudioCtx) return;
        zenAudio.playZenBell(528, 0.12);
      };

      strikeAmbientBell();
      this.ambientTimer = window.setInterval(strikeAmbientBell, 14000);
    } catch (err) {
      console.warn("Ambient layer failed to start:", err);
    }
  }

  /**
   * Ngừng tầng âm nền êm ái với fade-out
   */
  private stopAmbientLayer() {
    if (this.ambientTimer) {
      window.clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }

    if (this.ambientGainNode && this.ambientAudioCtx) {
      try {
        const now = this.ambientAudioCtx.currentTime;
        this.ambientGainNode.gain.cancelScheduledValues(now);
        this.ambientGainNode.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      } catch {
        // Ignore ramp error
      }
    }

    setTimeout(() => {
      this.ambientOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });
      this.ambientOscillators = [];

      if (this.waterNoiseNode) {
        try {
          (this.waterNoiseNode as AudioBufferSourceNode).stop();
          this.waterNoiseNode.disconnect();
        } catch {
          // Ignore
        }
        this.waterNoiseNode = null;
      }

      if (this.ambientAudioCtx && this.ambientAudioCtx.state !== "closed") {
        this.ambientAudioCtx.close().catch(() => {});
        this.ambientAudioCtx = null;
      }
    }, 900);
  }

  /**
   * Bộ chuyển đổi khẩu âm & từ ngữ sang phương ngữ Nam Bộ đậm đà của cụ Thầy Sinh
   * Thêm các trợ từ ngữ khí, thán từ cảm xúc ("Dạ", "Nè con", "Nghen con", "Á con", "Đó đa")
   * và chèn dấu phẩy, dấu chấm lửng để tạo nhịp điệu trầm bổng, khoan thai khi đọc.
   */
  public convertToSouthernSpokenDialect(text: string): string {
    // Nếu có lời thoại trích dẫn (ví dụ: ... cười hiền từ: "..."), chỉ lấy phần lời thoại trực tiếp
    let dialogueText = text;
    const quoteMatch = text.match(/["“]([^"”]+)["”]/);
    if (quoteMatch && quoteMatch[1] && quoteMatch[1].trim().length > 15) {
      dialogueText = quoteMatch[1].trim();
    }

    let t = dialogueText;

    // 1. Thay thế cụm từ và thành ngữ phổ biến sang phương ngữ Nam Bộ
    const phraseMap: [RegExp, string][] = [
      [/\bchào bạn\b/gi, "Thầy chào con nghen,"],
      [/\bxin chào\b/gi, "Chào con nghen,"],
      [/\bkhông thể nào\b/gi, "hổng thể nào"],
      [/\bkhông thể\b/gi, "hổng thể"],
      [/\bkhông có\b/gi, "hổng có"],
      [/\bkhông phải\b/gi, "hổng phải"],
      [/\bkhông được\b/gi, "hổng đặng"],
      [/\bkhông biết\b/gi, "hổng rành"],
      [/\bkhông nên\b/gi, "chớ có nên"],
      [/\bthế nào\b/gi, "mần sao nè"],
      [/\bnhư thế nào\b/gi, "mần sao nè con"],
      [/\bthế này\b/gi, "như vầy nè"],
      [/\bnhư thế này\b/gi, "như vầy nè con,"],
      [/\blàm sao\b/gi, "mần sao"],
      [/\blàm gì\b/gi, "mần chi"],
      [/\blàm ăn\b/gi, "mần ăn"],
      [/\blàm việc\b/gi, "mần việc"],
      [/\bphải không\b/gi, "phải hôn con?"],
      [/\bđúng không\b/gi, "đúng hôn nè?"],
      [/\bbạn ơi\b/gi, "con nghen,"],
      [/\bở đây\b/gi, "ở đây nè,"],
      [/\btại sao\b/gi, "cớ sao nè"],
      [/\bbuồn phiền\b/gi, "rầu rĩ trong dạ"],
      [/\blo lắng\b/gi, "lo ngay ngáy"],
      [/\bvội vàng\b/gi, "hấp tấp nóng vội"],
      [/\bthật là\b/gi, "thiệt là"],
      [/\brất nhiều\b/gi, "nhiều dữ lắm"],
      [/\bvào trong\b/gi, "vô trỏng"],
      [/\bđi vào\b/gi, "đi vô"],
      [/\bbước vào\b/gi, "bước vô"],
      [/\bnhìn thấy\b/gi, "ngó thấy"],
      [/\bnhìn xem\b/gi, "ngó coi"],
      [/\bquan sát\b/gi, "dòm ngó kỹ"],
      [/\bnhé con\b/gi, "nghen con,"],
      [/\bnhé bạn\b/gi, "nghen con,"],
      [/\bnhé\b/gi, "nghen,"],
      [/\bnhỉ\b/gi, "hén con,"],
      [/\bvào\b/gi, "vô"],
      [/\bkhông\b/gi, "hổng"],
      [/\bgì\b/gi, "chi"],
      [/\bđược\b/gi, "đặng"],
      [/\brất\b/gi, "thiệt là"],
      [/\bbảo\b/gi, "biểu"],
      [/\bhãy\b/gi, "con hãy ráng"],
      [/\bchút nữa\b/gi, "chút xíu nữa"],
      [/\bmột chút\b/gi, "chút đỉnh"],
      [/\btiền bạc\b/gi, "tiền bạc đồng ngân"],
      [/\bnhưng mà\b/gi, "ngặt nỗi là,"],
      [/\btuy nhiên\b/gi, "ngặt nỗi,"],
      [/\bcho nên\b/gi, "bởi vậy cho nên,"],
      [/\bvì vậy\b/gi, "bởi vậy á con,"],
    ];

    for (const [pattern, replacement] of phraseMap) {
      t = t.replace(pattern, replacement);
    }

    // 2. Chèn nhịp thở đôn hậu và âm điệu Nam Bộ ở các điểm ngắt câu
    t = t
      .replace(/\.\s+/g, "... ") // Tạo khoảng dừng trầm ngâm
      .replace(/!\s+/g, "! Dạ, ") // Trợ từ đôn hậu Nam Bộ
      .replace(/\?\s+/g, "? Dạ, ")
      .replace(/\s*,\s*/g, ", ");

    return t;
  }

  /**
   * Tìm giọng đọc tiếng Việt miền Nam (ưu tiên NamMinh, HoaiMy, hoặc giọng chuẩn Nam Bộ)
   */
  private pickVietnameseVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();

    // 1. Lọc tất cả các giọng tiếng Việt có sẵn trên hệ thống
    const viVoices = voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith("vi") ||
        v.name.toLowerCase().includes("vietnam") ||
        v.name.toLowerCase().includes("vietnamese")
    );

    if (viVoices.length > 0) {
      // Ưu tiên 1: Giọng nam miền Nam chuẩn Microsoft NamMinh Neural
      const namMinhVoice = viVoices.find((v) => {
        const n = v.name.toLowerCase();
        return n.includes("namminh") || (n.includes("nam") && n.includes("minh") && !n.includes("vietnam"));
      });
      if (namMinhVoice) {
        this.chosenVoiceName = `Thầy Sinh (Nam Bộ Nam) - ${namMinhVoice.name}`;
        return namMinhVoice;
      }

      // Ưu tiên 2: Giọng nữ miền Nam HoaiMy Neural (hạ pitch để thành ông cụ Nam Bộ)
      const hoaiMyVoice = viVoices.find((v) => {
        const n = v.name.toLowerCase();
        return n.includes("hoaimy") || n.includes("south") || n.includes("saigon") || n.includes("nam bộ") || n.includes("southern");
      });
      if (hoaiMyVoice) {
        this.chosenVoiceName = `Thầy Sinh (Nam Bộ Hạ Pitch) - ${hoaiMyVoice.name}`;
        return hoaiMyVoice;
      }

      // Ưu tiên 3: Giọng nam tiếng Việt bất kỳ (loại trừ từ "vietnam")
      const generalMale = viVoices.find((v) => {
        const cleanName = v.name.toLowerCase().replace(/vietnam|vietnamese/g, "");
        return cleanName.includes("male") || cleanName.includes("nam") || cleanName.includes("minh");
      });
      if (generalMale) {
        this.chosenVoiceName = `Thầy Sinh (Tiếng Việt) - ${generalMale.name}`;
        return generalMale;
      }

      // Ưu tiên 4: Giọng tiếng Việt tự nhiên bất kỳ
      const anyVi =
        viVoices.find(
          (v) =>
            v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Microsoft") ||
            v.name.includes("Linh") ||
            v.name.includes("An")
        ) || viVoices[0];

      this.chosenVoiceName = `Thầy Sinh (Bản Địa) - ${anyVi.name}`;
      return anyVi;
    }

    // 2. Dự phòng giọng mặc định
    const defaultVoice = voices.find((v) => v.default) || voices[0] || null;
    if (defaultVoice) {
      this.chosenVoiceName = defaultVoice.name;
    }
    return defaultVoice;
  }

  /**
   * Làm sạch văn bản trước khi đọc (bỏ ký tự emoji, markdown, chuyển đổi sang khẩu âm Nam Bộ)
   */
  private sanitizeSpeechText(text: string): string {
    const southernConverted = this.convertToSouthernSpokenDialect(text);
    return southernConverted
      .replace(/[#*_~`>[\]()]/g, " ")
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, "") // bỏ emoji
      .replace(/\s+/g, " ")
      .trim();
  }

  private audioPlayer: HTMLAudioElement | null = null;

  /**
   * Phát đọc lời luận giải tâm linh với giọng ông cụ miền Nam (ấm áp, chậm rãi, trầm đôn hậu)
   * Sử dụng cơ chế Hybrid:
   * 1. Ưu tiên gọi /api/tts sinh audio giọng Nam Bộ chuẩn xác có âm điệu, nhịp điệu ngắt nghỉ đôn hậu.
   * 2. Nếu môi trường không có mạng hoặc API gặp sự cố, tự động fallback sang Web Speech Synthesis.
   */
  public async speakReading(text: string, onEnd?: () => void) {
    this.stopSpeaking();

    const cleanText = this.sanitizeSpeechText(text);
    if (!cleanText) {
      onEnd?.();
      return;
    }

    this.activeText = cleanText;
    this.isSpeakingInternal = true;
    this.isPausedInternal = false;
    this.currentProgress = 0;

    // Kích hoạt chuông Tây Tạng chào đón khai mở lời quẻ
    zenAudio.playZenBell(528, 0.16);

    // Bật tầng âm kép Ambient Binaural 528Hz ở mức âm lượng 25%
    this.startAmbientLayer();
    this.notify();

    // Thử phát qua API TTS chất lượng cao
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanText }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        this.audioPlayer = audio;

        // Tinh chỉnh âm điệu: tốc độ đọc chậm rãi, trầm ấm (0.88x)
        audio.playbackRate = 0.88;

        audio.ontimeupdate = () => {
          if (audio.duration) {
            this.currentProgress = Math.min(1, audio.currentTime / audio.duration);
            this.notify();
          }
        };

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          this.audioPlayer = null;
          this.isSpeakingInternal = false;
          this.isPausedInternal = false;
          this.currentProgress = 1;
          this.stopAmbientLayer();
          this.notify();
          zenAudio.playCrystalChime(1056, 0.08);
          onEnd?.();
        };

        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          this.audioPlayer = null;
          this.fallbackSpeechSynthesis(cleanText, onEnd);
        };

// Ensure volume is max and attempt playback with error handling
        audio.volume = 1;
        await audio.play().catch((err) => {
          console.warn('Audio play rejected (likely autoplay policy):', err);
          // Fallback to speech synthesis if playback fails
          this.fallbackSpeechSynthesis(cleanText, onEnd);
        });
        this.chosenVoiceName = "Cụ Thầy Sinh (Nam Bộ Tự Nhiên - NamMinh)";
        this.notify();
        console.log("[SacredVoice] Đang phát audio giọng Nam Bộ NamMinhNeural chất lượng cao.");
        return;
      } else {
        const errText = await response.text().catch(() => "");
        console.warn("[SacredVoice] TTS API trả về mã lỗi:", response.status, errText);
      }
    } catch (fetchErr) {
      console.warn("[SacredVoice] Lỗi gọi /api/tts:", fetchErr);
    }

    // Fallback sang Web Speech Synthesis API
    console.log("[SacredVoice] Fallback sang trình tổng hợp giọng Web Speech...");
    this.fallbackSpeechSynthesis(cleanText, onEnd);
  }

  private fallbackSpeechSynthesis(cleanText: string, onEnd?: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !this.synth) {
      this.isSpeakingInternal = false;
      this.stopAmbientLayer();
      this.notify();
      onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const chosenVoice = this.pickVietnameseVoice();
    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang || "vi-VN";

      const vName = chosenVoice.name.toLowerCase();
      if (vName.includes("hoaimy") || vName.includes("female") || vName.includes("linh") || vName.includes("an")) {
        utterance.pitch = 0.72;
        utterance.rate = 0.82;
      } else {
        utterance.pitch = 0.76;
        utterance.rate = 0.84;
      }
    } else {
      utterance.lang = "vi-VN";
      utterance.pitch = 0.74;
      utterance.rate = 0.82;
    }

    utterance.onboundary = (event) => {
      if (cleanText.length > 0 && event.charIndex !== undefined) {
        this.currentProgress = Math.min(1, event.charIndex / cleanText.length);
        this.notify();
      }
    };

    utterance.onend = () => {
      this.isSpeakingInternal = false;
      this.isPausedInternal = false;
      this.currentProgress = 1;
      this.stopAmbientLayer();
      this.notify();
      zenAudio.playCrystalChime(1056, 0.08);
      onEnd?.();
    };

    utterance.onerror = (e) => {
      if ((e as SpeechSynthesisErrorEvent).error !== "canceled" && (e as SpeechSynthesisErrorEvent).error !== "interrupted") {
        console.warn("Speech synthesis error:", e);
      }
      this.isSpeakingInternal = false;
      this.isPausedInternal = false;
      this.stopAmbientLayer();
      this.notify();
      onEnd?.();
    };

    this.currentUtterance = utterance;

    setTimeout(() => {
      if (this.synth && this.isSpeakingInternal) {
        this.synth.speak(utterance);
      }
    }, 60);

    this.notify();
  }

  public pauseSpeaking() {
    if (this.audioPlayer && !this.audioPlayer.paused) {
      this.audioPlayer.pause();
      this.isPausedInternal = true;
    } else if (this.synth && this.isSpeakingInternal && !this.isPausedInternal) {
      this.synth.pause();
      this.isPausedInternal = true;
    }

    if (this.ambientAudioCtx && this.ambientGainNode) {
      const now = this.ambientAudioCtx.currentTime;
      this.ambientGainNode.gain.linearRampToValueAtTime(0.05, now + 0.3);
    }
    this.notify();
  }

  public resumeSpeaking() {
    if (this.audioPlayer && this.isPausedInternal) {
      this.audioPlayer.play().catch(() => {});
      this.isPausedInternal = false;
    } else if (this.synth && this.isPausedInternal) {
      this.synth.resume();
      this.isPausedInternal = false;
    }

    if (this.ambientAudioCtx && this.ambientGainNode) {
      const now = this.ambientAudioCtx.currentTime;
      this.ambientGainNode.gain.linearRampToValueAtTime(0.25, now + 0.5);
    }
    this.notify();
  }

  public stopSpeaking() {
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      } catch {}
      this.audioPlayer = null;
    }

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
    }
    this.isSpeakingInternal = false;
    this.isPausedInternal = false;
    this.currentProgress = 0;
    this.activeText = "";
    this.currentUtterance = null;
    this.stopAmbientLayer();
    this.notify();
  }

  public isSpeaking(): boolean {
    return this.isSpeakingInternal;
  }

  public isPaused(): boolean {
    return this.isPausedInternal;
  }
}

export const sacredVoice = new SacredVoiceEngine();

// Export convenience functions theo yêu cầu nhiệm vụ
export const speakReading = (text: string, onEnd?: () => void) =>
  sacredVoice.speakReading(text, onEnd);
export const pauseSpeaking = () => sacredVoice.pauseSpeaking();
export const resumeSpeaking = () => sacredVoice.resumeSpeaking();
export const stopSpeaking = () => sacredVoice.stopSpeaking();
export const isSpeaking = () => sacredVoice.isSpeaking();


/**
 * Bộ sinh khẩu truyền truyền cảm của Tiên Ông Thầy Sinh (Thay Sinh Emotional Narrative Generator)
 * Chuẩn phong cách: Vuốt râu mỉm cười, ánh mắt từ bi, bấm đốt ngón tay, xưng Thầy gọi Con,
 * khuyên răn dứt khoát "Con nên dừng lại...", "Con nên làm...", "Con nên chí thành niệm..."
 */
export interface ThaySinhScriptOptions {
  methodName?: string;       // "Số seri tiền", "Thời không", "3 Đồng xu Khang Hy"
  inputIdentifier?: string;  // Ví dụ: "25221064", "Giờ Giáp Thân", "0988xxxx"
  hexagramName?: string;     // Tên quẻ: "Địa Thiên Thái", "Hỏa Thiên Đại Hữu"
  movingLine?: number;       // Hào động: 1 -> 6
  painPoint?: string;        // Thấu cảm tâm cảnh
  stopDoing?: string;        // "Con nên dừng lại việc..."
  startDoing?: string;       // "Con nên làm việc..."
  remedyBuddha?: string;     // Danh hiệu Bồ Tát trong Ngũ Bách Danh
  lieuPhamLesson?: string;   // Bài học Liễu Phàm Tứ Huấn
  lieuPhamAction?: string;   // Việc thiện tích đức chuyển họa thành phúc
  category?: "tai_loc" | "tinh_duyen" | "cong_danh";
  guestName?: string;
}

export function generateThaySinhSpeech(options: ThaySinhScriptOptions): string {
  const {
    methodName = "dãy số linh nghiệm",
    inputIdentifier = "duyên lành",
    hexagramName = "Liên Hoa Bản Quái",
    movingLine = 1,
    category = "tai_loc",
    guestName = "con",
    painPoint = "",
  } = options;

  // Sử dụng Bộ Sinh Hội Thoại Vô Tận Ông Cụ Miền Nam (Infinite Southern Sage Engine)
  try {
    const { generateInfiniteThaySinhSpeech } = require("./thaySinhInfiniteKnowledge");
    return generateInfiniteThaySinhSpeech({
      methodName,
      inputIdentifier,
      hexagramName,
      movingLine,
      category,
      guestName,
      question: painPoint,
    });
  } catch {
    // Fallback nếu chưa nạp được module
    return `Vuốt chòm râu bạc phơ, Thầy Sinh cười hiền từ nhìn vô ${methodName} ${inputIdentifier} của ${guestName}. Thầy bấm nhẹ mấy đốt ngón tay theo Can Chi, càn khôn ứng hiện quẻ ${hexagramName}, chuyển động tại hào ${movingLine}. Thầy dặn con: Hãy dừng việc nóng vội, siêng làm việc nghĩa tích phước đức theo lời cụ Liễu Phàm thì họa ắt chuyển thành phước, bình an tự tại nghen con!`;
  }
}


