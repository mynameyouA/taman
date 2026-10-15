// Web Audio API Synthesizer for Zen ASMR micro-interactions
// Designed specifically for high-fidelity tactile auditory feedback without external audio files

class ZenAudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      if (!this.ctx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Subtle high-pitched crystal click synth for micro-interactions
   */
  public playCrystalClick(freq = 1960, volume = 0.08) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, now + 0.045);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);

      // Overtone
      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtone.type = "triangle";
      overtone.frequency.setValueAtTime(freq * 1.5, now);
      overtone.frequency.exponentialRampToValueAtTime(freq * 1.2, now + 0.05);

      overtoneGain.gain.setValueAtTime(volume * 0.4, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      overtone.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);

      overtone.start(now);
      overtone.stop(now + 0.055);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Soft hover audio tick
   */
  public playSoftHover(freq = 920, volume = 0.02) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + 0.03);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Audio fallback
    }
  }

  /**
   * Delicate crystal chime sound for clicks (ASMR harmonic ping ~852Hz / 1024Hz)
   */
  public playCrystalChime(freq = 852, volume = 0.07) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const gain = ctx.createGain();

      // Fundamental crystal tone (Pure sine)
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      // Soft pitch decay simulating bell impact
      osc.frequency.exponentialRampToValueAtTime(freq * 0.99, now + 0.35);

      // Celestial overtone (2.05x for natural metallic sparkle)
      overtone.type = "sine";
      overtone.frequency.setValueAtTime(freq * 2.05, now);

      // Envelope: Instant transient attack, gentle exponential decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      overtone.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 0.42);
      overtone.stop(now + 0.42);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Warm gentle tap for buttons
   */
  public playSoftTap(freq = 432, volume = 0.05) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.12);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Audio context ignore
    }
  }

  /**
   * Harmonious chime chord for successful reveals or card turns
   */
  public playHarmonicChord() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // Sacred triad: 528Hz (Mi - Transformation), 660Hz, 792Hz
    const freqs = [528, 660, 792];
    freqs.forEach((freq, idx) => {
      setTimeout(() => {
        this.playCrystalChime(freq, 0.05);
      }, idx * 60);
    });
  }

  /**
   * Sacred Tibetan Singing Bowl synthesis with deep multi-harmonic resonance
   * Pure procedural Web Audio API synthesis with natural binaural acoustic beats
   */
  public playTibetanBowl(baseFreq = 216, volume = 0.16) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Tibetan singing bowl acoustic harmonics with slight detune for warm beating resonance
      const harmonics = [
        { mult: 1.0, detune: 0, gain: volume, decay: 4.2 },
        { mult: 2.76, detune: 1.5, gain: volume * 0.45, decay: 3.8 },
        { mult: 5.4, detune: -2.0, gain: volume * 0.22, decay: 2.9 },
        { mult: 8.9, detune: 3.0, gain: volume * 0.1, decay: 2.0 },
      ];

      harmonics.forEach(({ mult, detune, gain: hGain, decay }) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq * mult, now);
        osc.detune.setValueAtTime(detune, now);

        // Strike transient & gentle long resonant ring
        gainNode.gain.setValueAtTime(0.0001, now);
        gainNode.gain.linearRampToValueAtTime(hGain, now + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + decay);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });

      // Warm gong sub-rumble
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(baseFreq * 0.5, now);
      subGain.gain.setValueAtTime(0.0001, now);
      subGain.gain.linearRampToValueAtTime(volume * 0.35, now + 0.08);
      subGain.gain.exponentialRampToValueAtTime(0.00001, now + 3.0);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 3.1);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Tiếng Mõ Thiền (Buddhist Wooden Fish / Muyu)
   * Tạo âm gõ mõ mộc, trầm ấm, thanh tịnh cho khóa lễ niệm danh hiệu và lần chuỗi tràng hạt
   */
  public playWoodenFish(volume = 0.14) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Transient click (đầu dùi gõ vào thân gỗ)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "sine";
      clickOsc.frequency.setValueAtTime(980, now);
      clickOsc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

      clickGain.gain.setValueAtTime(volume * 0.8, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.05);

      // 2. Body resonance: Thân mõ rỗng gỗ mít (hollow wood cavity)
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      bodyOsc.type = "triangle";
      bodyOsc.frequency.setValueAtTime(620, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(460, now + 0.09);

      // Bộ lọc dải băng Bandpass mô phỏng buồng gỗ
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(580, now);
      filter.Q.setValueAtTime(4.5, now);

      bodyGain.gain.setValueAtTime(0.001, now);
      bodyGain.gain.linearRampToValueAtTime(volume, now + 0.006);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

      bodyOsc.connect(filter);
      filter.connect(bodyGain);
      bodyGain.connect(ctx.destination);

      bodyOsc.start(now);
      bodyOsc.stop(now + 0.12);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Tiếng Chuông Bát / Chuông Gia Trì Thiền (Buddhist Temple Singing Chime / Bell)
   * Âm thanh thanh thoát, ngân vang, dập tắt lửa phiền não
   */
  public playZenBell(baseFreq = 528, volume = 0.15) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Tần số hòa âm chuông đồng: 528Hz (Love/Healing), 1056Hz, 1584Hz
      const partials = [
        { f: baseFreq, g: volume, decay: 3.2 },
        { f: baseFreq * 2.02, g: volume * 0.4, decay: 2.5 },
        { f: baseFreq * 3.01, g: volume * 0.18, decay: 1.8 },
      ];

      partials.forEach(({ f, g, decay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);
        osc.frequency.exponentialRampToValueAtTime(f * 0.998, now + decay);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(g, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + decay + 0.05);
      });
    } catch {
      // AudioContext fallback
    }
  }
  /**
   * Procedural Web Audio API synthesis for 3 ancient bronze coins colliding
   * Generates crisp, realistic metallic harmonics at 2400Hz, 3800Hz, 5200Hz
   */
  public playCoinClink(intensity = 1.0) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Resonant frequencies of ancient Khang Hy bronze coins striking brass plate
      const frequencies = [2400, 3180, 3800, 4420, 5200];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Alternate sine and triangle for authentic metallic clang
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        // Subtle natural random pitch variance
        const detuneVariance = Math.random() * 60 - 30;
        osc.frequency.setValueAtTime(freq + detuneVariance, now);

        // Bandpass filter to sculpt rich metallic resonance
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(freq, now);
        filter.Q.setValueAtTime(14 + idx * 2, now);

        // Sharp strike attack with gentle exponential ring
        const peak = (0.22 / (idx + 1)) * intensity;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(peak, now + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.00005, now + 0.28 + idx * 0.07);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.55);
      });

      // Quick secondary clink simulating coins rolling & settling
      setTimeout(() => {
        if (!ctx || ctx.state === "closed") return;
        const subNow = ctx.currentTime;
        const subFreqs = [2650, 4100, 5350];
        subFreqs.forEach((sf, sIdx) => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(sf + Math.random() * 40 - 20, subNow);
          const p = 0.08 * intensity;
          gain2.gain.setValueAtTime(0.0001, subNow);
          gain2.gain.linearRampToValueAtTime(p, subNow + 0.003);
          gain2.gain.exponentialRampToValueAtTime(0.00005, subNow + 0.2);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(subNow);
          osc2.stop(subNow + 0.22);
        });
      }, 75);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Alias for playCoinClink
   */
  public playCoinClash(intensity = 1.0) {
    this.playCoinClink(intensity);
  }
}

export const zenAudio = new ZenAudioManager();
