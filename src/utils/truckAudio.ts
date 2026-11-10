/**
 * Procedural Web Audio Engine for Vortex Heavy Hauler Dump Truck
 * Generates diesel engine rumble, turbo whine, air brake hiss, and air horn
 * without any external audio dependencies or network requests.
 */

class TruckAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private engineGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private turboOsc: OscillatorNode | null = null;
  private turboGain: GainNode | null = null;
  private lastProgress: number = 0;
  private lastMoveTime: number = 0;
  private isBraking: boolean = false;

  private initContext() {
    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Audio autoplay policy or iframe permission fallback
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startEngine();
    } else {
      this.stopEngine();
    }

    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private startEngine() {
    if (!this.ctx || this.isMuted) return;

    try {
      // 1. Primary Low-Frequency Diesel Engine Rumble (Sawtooth + Sub-bass)
      this.engineOsc = this.ctx.createOscillator();
      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(42, this.ctx.currentTime); // Idle ~42Hz

      this.engineFilter = this.ctx.createBiquadFilter();
      this.engineFilter.type = 'lowpass';
      this.engineFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
      this.engineFilter.Q.setValueAtTime(3, this.ctx.currentTime);

      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      this.engineOsc.connect(this.engineFilter);
      this.engineFilter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);
      this.engineOsc.start();

      // 2. High-Pitched Turbocharger Whine
      this.turboOsc = this.ctx.createOscillator();
      this.turboOsc.type = 'sine';
      this.turboOsc.frequency.setValueAtTime(750, this.ctx.currentTime);

      this.turboGain = this.ctx.createGain();
      this.turboGain.gain.setValueAtTime(0.005, this.ctx.currentTime);

      this.turboOsc.connect(this.turboGain);
      this.turboGain.connect(this.ctx.destination);
      this.turboOsc.start();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public updateSpeed(currentProgress: number, isMoving: boolean) {
    if (this.isMuted || !this.ctx || !this.engineOsc || !this.engineGain || !this.engineFilter) return;

    const now = Date.now();
    const deltaProgress = Math.abs(currentProgress - this.lastProgress);
    const deltaTime = Math.max(16, now - this.lastMoveTime);
    const speed = isMoving ? Math.min(1, (deltaProgress / (deltaTime / 1000)) * 2.5 + 0.3) : 0;

    const t = this.ctx.currentTime;

    if (speed > 0.05) {
      // Engine Rev Up
      const targetFreq = 42 + speed * 45; // 42Hz to 87Hz
      const targetCutoff = 120 + speed * 180;
      const targetVol = 0.08 + speed * 0.07;

      this.engineOsc.frequency.setTargetAtTime(targetFreq, t, 0.1);
      this.engineFilter.frequency.setTargetAtTime(targetCutoff, t, 0.1);
      this.engineGain.gain.setTargetAtTime(targetVol, t, 0.1);

      if (this.turboOsc && this.turboGain) {
        this.turboOsc.frequency.setTargetAtTime(800 + speed * 1200, t, 0.15);
        this.turboGain.gain.setTargetAtTime(0.012 * speed, t, 0.15);
      }

      this.isBraking = false;
    } else {
      // Idle Rumble
      this.engineOsc.frequency.setTargetAtTime(40, t, 0.3);
      this.engineFilter.frequency.setTargetAtTime(110, t, 0.3);
      this.engineGain.gain.setTargetAtTime(0.05, t, 0.3);

      if (this.turboGain) {
        this.turboGain.gain.setTargetAtTime(0.002, t, 0.3);
      }

      if (!this.isBraking && deltaProgress > 0) {
        this.playAirBrakeHiss();
        this.isBraking = true;
      }
    }

    this.lastProgress = currentProgress;
    this.lastMoveTime = now;
  }

  public playAirBrakeHiss() {
    if (this.isMuted || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // Audio catch
    }
  }

  public playAirHorn() {
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const tones = [311.13, 370.0]; // Dual-tone heavy civil freight horn (Eb4 + F#4)

      tones.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.linearRampToValueAtTime(0.14, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(t);
        osc.stop(t + 0.75);
      });
    } catch {
      // Audio catch
    }
  }

  public playBedHydraulic() {
    this.initContext();
    if (this.isMuted || !this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.linearRampToValueAtTime(190, t + 1.2);

      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.35);
    } catch {
      // Audio catch
    }
  }

  private stopEngine() {
    try {
      if (this.engineOsc) {
        this.engineOsc.stop();
        this.engineOsc.disconnect();
        this.engineOsc = null;
      }
      if (this.turboOsc) {
        this.turboOsc.stop();
        this.turboOsc.disconnect();
        this.turboOsc = null;
      }
    } catch {
      // Audio cleanup
    }
  }
}

export const truckAudio = new TruckAudioEngine();
