// Web Audio API Synthesized Sound Effects for ASMR / Micro-Interactions
// Pure procedural synthesis - no external audio files required

class SoundFXManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  /**
   * Subtle high-pitched crystal click synth
   * Designed for premium micro-interactions: crisp, tactile, relaxing ASMR click
   */
  public playCrystalClick(frequency = 1960, volume = 0.08) {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Crisp high transient spike (crystal click)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.45, now + 0.045);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);

      // 2. Harmonic bell shimmer overtone
      const overtoneOsc = ctx.createOscillator();
      const overtoneGain = ctx.createGain();

      overtoneOsc.type = "triangle";
      overtoneOsc.frequency.setValueAtTime(frequency * 1.5, now);
      overtoneOsc.frequency.exponentialRampToValueAtTime(frequency * 1.2, now + 0.06);

      overtoneGain.gain.setValueAtTime(volume * 0.4, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      overtoneOsc.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);

      overtoneOsc.start(now);
      overtoneOsc.stop(now + 0.065);
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  /**
   * Ultra-soft harmonic tick on hover
   */
  public playSubtleHover(frequency = 880, volume = 0.02) {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.2, now + 0.03);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Zen Singing Chime bell for special actions / modal open
   */
  public playZenChime(frequency = 528, volume = 0.12) {
    if (!this.soundEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const harmonics = [1, 2.01, 3.02];
      const gains = [volume, volume * 0.45, volume * 0.18];

      harmonics.forEach((h, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency * h, now);

        gain.gain.setValueAtTime(gains[i], now);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.85);
      });
    } catch {
      // Graceful fallback
    }
  }
}

export const soundFX = new SoundFXManager();
