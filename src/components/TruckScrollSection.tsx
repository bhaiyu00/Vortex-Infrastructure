import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  RotateCcw,
} from 'lucide-react';
import { truckAudio } from '../utils/truckAudio';

gsap.registerPlugin(ScrollTrigger);

interface StageData {
  step: string;
  title: string;
  subtitle: string;
  phaseCode: string;
  metric: string;
  metricLabel: string;
  elevation: string;
  soilSpec: string;
}

const STAGES: StageData[] = [
  {
    step: '01',
    title: 'Every Great Project Starts With A Plan',
    subtitle: 'Computational structural analysis, 3D laser topography scanning, and geotechnical soil testing before breaking ground.',
    phaseCode: 'PHASE-01 // ENGINEERING & CAD',
    metric: '4D BIM',
    metricLabel: 'Parametric Coordination',
    elevation: '+0.00 M (DATUM)',
    soilSpec: 'Substrata Borehole Sampling',
  },
  {
    step: '02',
    title: 'Strong Foundations. Stronger Futures.',
    subtitle: 'High-tonnage bedrock excavation, secant retention walls, and deep hydraulic pile driving engineered to anchor mega-structures.',
    phaseCode: 'PHASE-02 // BEDROCK EARTHWORKS',
    metric: '280,000 m³',
    metricLabel: 'Bedrock Excavated',
    elevation: '-28.50 M (SUB-GRADE)',
    soilSpec: 'Continuous Tieback Slurry Wall',
  },
  {
    step: '03',
    title: 'Precision In Every Detail.',
    subtitle: 'High-tensile structural steel erection, heavy crawler crane lifts, and post-tensioned reinforced concrete core construction.',
    phaseCode: 'PHASE-03 // SUPERSTRUCTURE STEEL',
    metric: '18,500 T',
    metricLabel: 'Fabricated Steel Assembled',
    elevation: '+184.00 M (CORE)',
    soilSpec: 'Post-Tensioned Slabs & Shear Cores',
  },
  {
    step: '04',
    title: 'Built To Last. Designed To Inspire.',
    subtitle: 'Double-glazed thermal curtain wall envelope, MEP building automation, and turnkey commissioning of an enduring civic landmark.',
    phaseCode: 'PHASE-04 // HANDOVER & LEASE',
    metric: 'LEED Gold',
    metricLabel: 'Certified Efficiency',
    elevation: '+240.00 M (CROWN)',
    soilSpec: 'Turnkey Commissioning Complete',
  },
];

export default function TruckScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const frontWheelRef = useRef<SVGGElement>(null);
  const rearWheel1Ref = useRef<SVGGElement>(null);
  const rearWheel2Ref = useRef<SVGGElement>(null);
  const dumpBedRef = useRef<SVGGElement>(null);
  const cylinderRamRef = useRef<SVGRectElement>(null);
  const cylinderInnerRef = useRef<SVGRectElement>(null);
  const mudFlap1Ref = useRef<SVGGElement>(null);
  const mudFlap2Ref = useRef<SVGGElement>(null);
  const foregroundLayerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoDriving, setIsAutoDriving] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isBedTilted, setIsBedTilted] = useState(false);
  const [truckSpeedKmh, setTruckSpeedKmh] = useState(0);

  const isAutoDrivingRef = useRef(false);
  const tiltProgressRef = useRef(0);
  const autoDriveTimeline = useRef<gsap.core.Tween | null>(null);
  const bedTiltTimeline = useRef<gsap.core.Tween | null>(null);
  const lastProgressRef = useRef(0);
  const lastTimestampRef = useRef(Date.now());

  // Dual Particle Simulation: Dust behind tires + Exhaust smoke from stack + Falling rocks when bed tilts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      type: 'dust' | 'smoke' | 'rock';
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
      color: string;
      rotation?: number;
      vRot?: number;
    }

    const particles: Particle[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (truckRef.current && canvas) {
        try {
          const truckRect = truckRef.current.getBoundingClientRect();
          const canvasRect = canvas.getBoundingClientRect();

          // 1. Spawning Ground Dust Behind Tandem Rear Wheels
          const dustSpawnX = truckRect.left - canvasRect.left + 50;
          const dustSpawnY = truckRect.bottom - canvasRect.top - 18;

          if (dustSpawnX > -50 && dustSpawnX < width + 100 && particles.length < 80) {
            particles.push({
              type: 'dust',
              x: dustSpawnX + (Math.random() * 16 - 8),
              y: dustSpawnY + (Math.random() * 6 - 3),
              size: Math.random() * 10 + 6,
              vx: -(Math.random() * 2.6 + 1.2),
              vy: -(Math.random() * 0.9 + 0.3),
              opacity: Math.random() * 0.4 + 0.2,
              color: 'rgba(215, 175, 120, ',
            });
          }

          // 2. Spawning Diesel Exhaust Smoke Puffs from Chrome Exhaust Stack
          const smokeSpawnX = truckRect.left - canvasRect.left + truckRect.width * 0.65;
          const smokeSpawnY = truckRect.top - canvasRect.top + truckRect.height * 0.16;

          if (smokeSpawnX > -50 && smokeSpawnX < width + 100 && Math.random() > 0.4) {
            particles.push({
              type: 'smoke',
              x: smokeSpawnX + (Math.random() * 6 - 3),
              y: smokeSpawnY + (Math.random() * 4 - 2),
              size: Math.random() * 6 + 4,
              vx: -(Math.random() * 2.0 + 0.8),
              vy: -(Math.random() * 1.5 + 0.8),
              opacity: Math.random() * 0.3 + 0.15,
              color: 'rgba(130, 140, 150, ',
            });
          }

          // 3. Spawning Falling Rocks when Bed is Tilted
          if (tiltProgressRef.current > 0.35 && Math.random() > 0.45) {
            const rockSpawnX = truckRect.left - canvasRect.left + truckRect.width * 0.18;
            const rockSpawnY = truckRect.top - canvasRect.top + truckRect.height * 0.42;

            particles.push({
              type: 'rock',
              x: rockSpawnX + (Math.random() * 12 - 6),
              y: rockSpawnY,
              size: Math.random() * 6 + 4,
              vx: -(Math.random() * 1.6 + 0.4),
              vy: Math.random() * 2 + 3,
              opacity: 1,
              color: Math.random() > 0.5 ? '#64748B' : '#475569',
              rotation: Math.random() * Math.PI,
              vRot: (Math.random() - 0.5) * 0.3,
            });
          }
        } catch {
          // Guard against unmounted rect access
        }
      }

      // Update & Render all particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.type === 'dust') {
          p.size += 0.35;
          p.opacity -= 0.009;
        } else if (p.type === 'smoke') {
          p.size += 0.45;
          p.vx *= 0.98;
          p.opacity -= 0.007;
        } else if (p.type === 'rock') {
          p.vy += 0.3;
          if (p.rotation !== undefined && p.vRot !== undefined) {
            p.rotation += p.vRot;
          }
          if (truckRef.current && canvas) {
            try {
              const groundY = truckRef.current.getBoundingClientRect().bottom - canvas.getBoundingClientRect().top - 12;
              if (p.y >= groundY) {
                p.vy = -p.vy * 0.25;
                p.y = groundY;
                p.vx *= 0.6;
                p.opacity -= 0.04;
              }
            } catch {
              // Null guard
            }
          }
        }

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        if (p.type === 'rock') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation || 0);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size * 0.8);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${Math.max(0, p.opacity)})`;
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Run once on mount

  // Synchronize Truck Position, Wheels, and Engine Telemetry
  const updateTruckPosition = (progress: number) => {
    setScrollProgress(progress);
    const stageIdx = Math.min(3, Math.floor(progress * 4));
    setActiveStageIndex(stageIdx);

    const now = Date.now();
    const dt = Math.max(16, now - lastTimestampRef.current);
    const dp = Math.abs(progress - lastProgressRef.current);
    const currentSpeed = Math.round(Math.min(65, (dp / (dt / 1000)) * 140));
    setTruckSpeedKmh(currentSpeed > 3 ? currentSpeed : isAutoDrivingRef.current ? 36 : 0);

    lastProgressRef.current = progress;
    lastTimestampRef.current = now;

    // Audio Engine Update (Safe)
    truckAudio.updateSpeed(progress, currentSpeed > 3 || isAutoDrivingRef.current);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const truckWidth = isMobile ? 300 : 480;
    const startX = isMobile ? 15 : 40;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const endX = Math.max(startX + 100, screenWidth - truckWidth - 40);

    const currentX = startX + progress * (endX - startX);
    const bounceY = Math.sin(progress * 55) * 3;
    const pitchTilt = Math.sin(progress * 40) * 1.1;

    if (truckRef.current) {
      gsap.set(truckRef.current, {
        x: currentX,
        y: bounceY,
        rotation: pitchTilt,
      });
    }

    // Native SVG Wheel Spins: Standard W3C SVG rotation attribute (100% immune to CSS transform-origin bugs)
    const wheelAngle = (progress * 3240) % 360;
    if (frontWheelRef.current) {
      frontWheelRef.current.setAttribute('transform', `rotate(${wheelAngle.toFixed(1)} 550 275)`);
    }
    if (rearWheel1Ref.current) {
      rearWheel1Ref.current.setAttribute('transform', `rotate(${wheelAngle.toFixed(1)} 245 275)`);
    }
    if (rearWheel2Ref.current) {
      rearWheel2Ref.current.setAttribute('transform', `rotate(${wheelAngle.toFixed(1)} 115 275)`);
    }

    // Native SVG Mud Flaps Swing
    const mudSwing = Math.min(22, (currentSpeed / 60) * 22);
    if (mudFlap1Ref.current) {
      mudFlap1Ref.current.setAttribute('transform', `rotate(${-mudSwing.toFixed(1)} 195 245)`);
    }
    if (mudFlap2Ref.current) {
      mudFlap2Ref.current.setAttribute('transform', `rotate(${-mudSwing.toFixed(1)} 65 245)`);
    }

    if (foregroundLayerRef.current) {
      gsap.set(foregroundLayerRef.current, { x: -progress * 650 });
    }
  };

  // GSAP ScrollTrigger Integration (Mounted ONCE on component lifecycle)
  useEffect(() => {
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const truck = truckRef.current;

    if (!container || !pinSection || !truck) return;

    updateTruckPosition(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinSection,
        scrub: 0.6,
        onUpdate: (self) => {
          if (!isAutoDrivingRef.current) {
            updateTruckPosition(self.progress);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []); // NEVER depend on isAutoDriving so pin never tears down!

  // Jump to specific stage
  const jumpToStage = (idx: number) => {
    if (autoDriveTimeline.current) {
      autoDriveTimeline.current.kill();
      isAutoDrivingRef.current = false;
      setIsAutoDriving(false);
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = scrollTop + (idx / 3) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    updateTruckPosition(idx / 3);
  };

  // Auto-drive simulation: Drives the truck across the screen smoothly
  const toggleAutoDrive = () => {
    if (isAutoDriving) {
      if (autoDriveTimeline.current) {
        autoDriveTimeline.current.pause();
      }
      isAutoDrivingRef.current = false;
      setIsAutoDriving(false);
      truckAudio.playAirBrakeHiss();
      return;
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < -50 || rect.top > 100) {
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }

    isAutoDrivingRef.current = true;
    setIsAutoDriving(true);
    const progressObj = { value: scrollProgress >= 0.98 ? 0 : scrollProgress };

    autoDriveTimeline.current = gsap.to(progressObj, {
      value: 1,
      duration: 11,
      ease: 'none',
      onUpdate: () => {
        updateTruckPosition(progressObj.value);

        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const scrollTop = window.scrollY + rect.top;
          const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
          window.scrollTo({
            top: scrollTop + progressObj.value * scrollDistance,
            behavior: 'auto',
          });
        }
      },
      onComplete: () => {
        isAutoDrivingRef.current = false;
        setIsAutoDriving(false);
        truckAudio.playAirBrakeHiss();
      },
    });
  };

  // Toggle Hydraulic Dump Bed Tipping with Native SVG attributes
  const toggleDumpBed = () => {
    truckAudio.playBedHydraulic();
    const nextState = !isBedTilted;
    setIsBedTilted(nextState);

    if (bedTiltTimeline.current) {
      bedTiltTimeline.current.kill();
    }

    const obj = { value: tiltProgressRef.current };
    bedTiltTimeline.current = gsap.to(obj, {
      value: nextState ? 1 : 0,
      duration: 1.4,
      ease: nextState ? 'power2.out' : 'power2.inOut',
      onUpdate: () => {
        const val = obj.value;
        tiltProgressRef.current = val;
        // Native SVG bed rotation around hinge (105, 205)
        if (dumpBedRef.current) {
          dumpBedRef.current.setAttribute('transform', `rotate(${(-val * 35).toFixed(1)} 105 205)`);
        }
        // Native SVG telescoping ram extension
        const cylinderExt = 18 + val * 42;
        if (cylinderRamRef.current) {
          cylinderRamRef.current.setAttribute('y', `${180 - cylinderExt * 0.6}`);
          cylinderRamRef.current.setAttribute('height', `${cylinderExt * 0.6 + 6}`);
        }
        if (cylinderInnerRef.current) {
          cylinderInnerRef.current.setAttribute('y', `${180 - cylinderExt}`);
          cylinderInnerRef.current.setAttribute('height', `${cylinderExt * 0.4 + 4}`);
        }
      },
      onComplete: () => {
        if (!nextState) {
          truckAudio.playAirBrakeHiss();
        }
      },
    });
  };

  // Toggle Audio Engine
  const handleToggleSound = () => {
    const active = truckAudio.toggleMute();
    setIsSoundOn(active);
  };

  // Honk Freight Air Horn
  const handleHonkHorn = () => {
    truckAudio.playAirHorn();
  };

  const currentStage = STAGES[activeStageIndex];

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative h-[400vh] bg-[#FFFFFF] text-gray-950 selection:bg-[#FF6B00]"
      aria-label="Construction Truck Scrolling Journey"
    >
      {/* Pinned Viewport Stage in Bright Sunlight */}
      <div
        ref={pinSectionRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Layered Background Environment (Bright Sunlit Cross-Fades) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Stage 1: Bright Architectural Blueprint Grid */}
          <div
            className={`absolute inset-0 blueprint-grid transition-opacity duration-700 bg-white ${
              activeStageIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/80" />
          </div>

          {/* Stage 2: Sunlit Bedrock Excavation */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeStageIndex === 1 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/src/assets/images/truck_journey_excavation_1794215391256.jpg"
              alt="Bedrock foundation excavation site in daylight"
              className="w-full h-full object-cover object-center filter brightness-110 contrast-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/70" />
          </div>

          {/* Stage 3: Sunlit Superstructure Steel Erection */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeStageIndex === 2 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/src/assets/images/truck_journey_structural_1794215392307.jpg"
              alt="Structural steel skyscraper framing under assembly under clear sky"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/70" />
          </div>

          {/* Stage 4: Sunlit Modern Landmark */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeStageIndex === 3 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/src/assets/images/truck_journey_completed_1794215391878.jpg"
              alt="Completed architectural landmark and civic plaza"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/70" />
          </div>
        </div>

        {/* Top Minimal Cockpit Bar - Truck 100% Unobstructed & Visible */}
        <div className="relative z-20 pt-16 sm:pt-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Slim, Minimal Stage Indicator Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/95 border-2 border-gray-900 shadow-md backdrop-blur-md">
              <span className="w-2.5 h-2.5 bg-[#FF6B00] animate-pulse" />
              <span className="text-xs font-mono font-black uppercase text-[#FF6B00] tracking-wider">
                0{activeStageIndex + 1}/04
              </span>
              <span className="text-gray-400 text-xs font-mono">·</span>
              <span className="text-xs font-mono font-black uppercase text-gray-950 tracking-wider">
                {currentStage.phaseCode.split('//')[1]?.trim() || currentStage.phaseCode}
              </span>
            </div>

            {/* Field Command Spec Box & Interactive Cockpit Controls */}
            <div className="flex items-center gap-3">
              {/* Telemetry Dashboard */}
              <div className="hidden md:flex items-center gap-4 bg-white/95 border-2 border-gray-900 px-4 py-2 shadow-md text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">SPEED:</span>
                  <span className="font-black text-[#FF6B00]">
                    {truckSpeedKmh > 0 ? `${truckSpeedKmh} KM/H` : 'IDLE'}
                  </span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">HYDRAULICS:</span>
                  <span className="font-black text-gray-900">{isBedTilted ? '4,200 PSI' : '2,400 PSI'}</span>
                </div>
              </div>

              {/* Truck Cockpit Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleAutoDrive}
                  className="px-4 py-2.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white border-2 border-gray-950 font-black font-mono text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isAutoDriving ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Drive Tour</span>
                    </>
                  )}
                </button>

                {/* Tip Bed Action */}
                <button
                  type="button"
                  onClick={toggleDumpBed}
                  className={`px-3 py-2.5 border-2 border-gray-950 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                    isBedTilted ? 'bg-amber-300 text-gray-950' : 'bg-white hover:bg-orange-50 text-gray-900'
                  }`}
                  title="Raise hydraulic hoist to dump gravel payload"
                >
                  <span>{isBedTilted ? 'Lower Bed ⬇' : 'Dump Load ⛏'}</span>
                </button>

                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className={`p-2.5 border-2 border-gray-950 transition-all flex items-center justify-center shadow-sm active:scale-95 cursor-pointer ${
                    isSoundOn ? 'bg-[#FF6B00] text-white' : 'bg-white hover:bg-orange-50 text-gray-900'
                  }`}
                  title={isSoundOn ? 'Mute engine audio' : 'Turn on diesel engine & air brake sound'}
                  aria-label="Toggle diesel engine sound"
                >
                  {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Freight Air Horn */}
                <button
                  type="button"
                  onClick={handleHonkHorn}
                  className="p-2.5 border-2 border-gray-950 bg-white hover:bg-amber-100 text-gray-950 transition-all flex items-center justify-center shadow-sm active:scale-95 cursor-pointer"
                  title="Honk heavy freight air horn"
                  aria-label="Honk air horn"
                >
                  <Radio className="w-4 h-4 text-[#FF6B00]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Construction Environment with the Hyper-Realistic Dump Truck */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-end pb-12 sm:pb-16 overflow-visible">
          {/* Billowing Dust & Diesel Smoke Particle Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Construction Road Surface & Heavy Dump Truck */}
          <div className="relative w-full z-20">
            {/* The Heavy Articulated Dump Truck — Grounded on asphalt with 3D depth */}
            <div
              ref={truckRef}
              className="absolute bottom-[calc(100%-24px)] left-0 will-change-transform z-30 pointer-events-none"
              style={{ width: 'clamp(300px, 34vw, 490px)', height: 'auto' }}
            >
              <svg
                viewBox="0 0 680 350"
                className="w-full h-auto drop-shadow-[0_20px_28px_rgba(0,0,0,0.4)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Volumetric Warm-White LED Projector Headlight Beam */}
                  <linearGradient id="headlightBeamRealistic" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FFFEEA" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.65" />
                    <stop offset="65%" stopColor="#FEF08A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Metallic Construction Safety Orange Gradients */}
                  <linearGradient id="bodyOrangeBevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF8F1F" />
                    <stop offset="25%" stopColor="#FF6B00" />
                    <stop offset="80%" stopColor="#D95700" />
                    <stop offset="100%" stopColor="#A83E00" />
                  </linearGradient>

                  {/* Operator Cab Safety Yellow Gradient */}
                  <linearGradient id="cabYellowRealistic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFE033" />
                    <stop offset="45%" stopColor="#FFC700" />
                    <stop offset="100%" stopColor="#E08B00" />
                  </linearGradient>

                  {/* Polished Chrome Hydraulic Cylinder */}
                  <linearGradient id="chromeRam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#94A3B8" />
                    <stop offset="35%" stopColor="#FFFFFF" />
                    <stop offset="70%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#64748B" />
                  </linearGradient>

                  {/* Tempered Tinted Safety Glass Windshield with Sky Reflection */}
                  <linearGradient id="glassReflectionDay" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="#7DD3FC" stopOpacity="0.80" />
                    <stop offset="100%" stopColor="#0369A1" stopOpacity="0.90" />
                  </linearGradient>

                  {/* Heavy Earthmover Tire Rubber Tread Texture Gradient */}
                  <linearGradient id="tireRubberGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="50%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>

                  {/* Machined Steel Deep-Dish Rim Center */}
                  <radialGradient id="rimCenterMachined" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFD600" />
                    <stop offset="65%" stopColor="#FF6B00" />
                    <stop offset="100%" stopColor="#9A3412" />
                  </radialGradient>
                </defs>

                {/* 1. Volumetric Headlight Light Cones Casting Forward */}
                <polygon
                  points="630,205 840,165 890,305 630,245"
                  fill="url(#headlightBeamRealistic)"
                  opacity="0.9"
                />

                {/* 2. Soft Ambient Ground Shadows (Direct Asphalt Contact) */}
                <ellipse cx="550" cy="336" rx="66" ry="10" fill="rgba(0,0,0,0.45)" />
                <ellipse cx="245" cy="336" rx="68" ry="10" fill="rgba(0,0,0,0.45)" />
                <ellipse cx="115" cy="336" rx="68" ry="10" fill="rgba(0,0,0,0.45)" />
                <rect x="70" y="328" width="530" height="10" fill="rgba(0,0,0,0.2)" rx="5" />

                {/* 3. Telescopic Hydraulic Hoist Cylinder (Controlled via SVG refs) */}
                <g id="hydraulic-hoist">
                  {/* Cylinder Base Trunnion Pin on Chassis */}
                  <rect x="290" y="215" width="22" height="14" rx="3" fill="#334155" stroke="#0F172A" strokeWidth="2" />
                  {/* Stage 1 Outer Barrel */}
                  <rect x="293" y="180" width="16" height="38" rx="3" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
                  {/* Stage 2 Chrome Telescoping Ram */}
                  <rect
                    ref={cylinderRamRef}
                    x="296"
                    y="169"
                    width="10"
                    height="17"
                    fill="url(#chromeRam)"
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                  {/* Stage 3 Inner Polished Ram to Bed Underbody */}
                  <rect
                    ref={cylinderInnerRef}
                    x="298"
                    y="162"
                    width="6"
                    height="11"
                    fill="url(#chromeRam)"
                  />
                </g>

                {/* 4. Tilting Dump Bed Group with Rock Payload (Native SVG transform) */}
                <g
                  ref={dumpBedRef}
                  id="dump-bed-assembly"
                  transform="rotate(0 105 205)"
                >
                  {/* Excavation Rock / Basalt Boulder Payload in the Bed */}
                  <g id="rock-payload">
                    <polygon points="120,80 145,55 175,68 160,85" fill="#64748B" stroke="#334155" strokeWidth="2" />
                    <polygon points="160,78 185,48 220,52 230,78" fill="#475569" stroke="#1E293B" strokeWidth="2" />
                    <polygon points="215,75 240,42 275,50 290,75" fill="#64748B" stroke="#334155" strokeWidth="2" />
                    <polygon points="275,72 310,46 345,58 355,80" fill="#475569" stroke="#1E293B" strokeWidth="2" />
                    <polygon points="335,78 365,58 395,72 405,92" fill="#334155" stroke="#0F172A" strokeWidth="2" />
                    <polygon points="180,62 195,50 215,56 200,68" fill="#94A3B8" />
                    <polygon points="245,52 265,45 280,55 260,65" fill="#94A3B8" />
                    <polygon points="312,58 330,48 348,60 330,70" fill="#94A3B8" />
                  </g>

                  {/* Main Dump Body Hull in Safety Orange */}
                  <path
                    d="M 80 140 L 410 140 L 450 78 L 80 78 Z"
                    fill="url(#bodyOrangeBevel)"
                    stroke="#9A3412"
                    strokeWidth="3.5"
                  />

                  {/* Front Cab-Over Spill Protection Canopy (Protects operator cab) */}
                  <path
                    d="M 410 78 L 545 60 L 535 98 L 410 98 Z"
                    fill="url(#bodyOrangeBevel)"
                    stroke="#9A3412"
                    strokeWidth="3"
                  />
                  <line x1="430" y1="96" x2="445" y2="78" stroke="#7C2D12" strokeWidth="3" />
                  <line x1="475" y1="92" x2="490" y2="72" stroke="#7C2D12" strokeWidth="3" />
                  <line x1="515" y1="88" x2="528" y2="68" stroke="#7C2D12" strokeWidth="3" />

                  {/* Heavy Box-Section Lateral Reinforcing Ribs */}
                  <g id="box-ribs">
                    <rect x="110" y="82" width="13" height="56" rx="2" fill="#C2410C" stroke="#7C2D12" strokeWidth="1.5" />
                    <rect x="175" y="82" width="13" height="56" rx="2" fill="#C2410C" stroke="#7C2D12" strokeWidth="1.5" />
                    <rect x="240" y="82" width="13" height="56" rx="2" fill="#C2410C" stroke="#7C2D12" strokeWidth="1.5" />
                    <rect x="305" y="82" width="13" height="56" rx="2" fill="#C2410C" stroke="#7C2D12" strokeWidth="1.5" />
                    <rect x="370" y="82" width="13" height="56" rx="2" fill="#C2410C" stroke="#7C2D12" strokeWidth="1.5" />
                  </g>

                  {/* Rear Tailgate Assembly with Safety Chains */}
                  <g id="tailgate">
                    <path d="M 80 78 L 80 140 L 72 138 L 72 82 Z" fill="#7C2D12" stroke="#431407" strokeWidth="2" />
                    <circle cx="80" cy="80" r="5" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
                    <circle cx="80" cy="80" r="2" fill="#334155" />
                    <circle cx="80" cy="138" r="4" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />
                  </g>

                  {/* Brand Stencil Typography & Technical Specification */}
                  <text
                    x="132"
                    y="122"
                    fill="#0F172A"
                    fontFamily="Archivo, sans-serif"
                    fontWeight="900"
                    fontSize="28"
                    letterSpacing="3"
                  >
                    VORTEX
                  </text>
                  <text
                    x="292"
                    y="122"
                    fill="#FFFFFF"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="900"
                    fontSize="14"
                    letterSpacing="1.5"
                  >
                    CIVIL-04
                  </text>
                  <text
                    x="134"
                    y="134"
                    fill="#431407"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="800"
                    fontSize="8.5"
                    letterSpacing="1"
                  >
                    45T PAYLOAD // CAT-745 SPEC CLASS
                  </text>

                  {/* High-Visibility Reflective Chevron Stripe along Bottom of Bed */}
                  <g id="safety-chevrons" opacity="0.9">
                    <line x1="85" y1="138" x2="405" y2="138" stroke="#FFD600" strokeWidth="4" />
                    <line x1="95" y1="138" x2="115" y2="138" stroke="#1E293B" strokeWidth="4" />
                    <line x1="145" y1="138" x2="165" y2="138" stroke="#1E293B" strokeWidth="4" />
                    <line x1="195" y1="138" x2="215" y2="138" stroke="#1E293B" strokeWidth="4" />
                    <line x1="245" y1="138" x2="265" y2="138" stroke="#1E293B" strokeWidth="4" />
                    <line x1="295" y1="138" x2="315" y2="138" stroke="#1E293B" strokeWidth="4" />
                    <line x1="345" y1="138" x2="365" y2="138" stroke="#1E293B" strokeWidth="4" />
                  </g>
                </g>

                {/* 5. Heavy Structural Chassis Frame & Articulation Hitch */}
                <g id="chassis-frame">
                  <rect x="65" y="195" width="560" height="34" rx="4" fill="#334155" stroke="#0F172A" strokeWidth="3" />
                  <circle cx="180" cy="212" r="7" fill="#1E293B" />
                  <circle cx="210" cy="212" r="7" fill="#1E293B" />
                  <circle cx="340" cy="212" r="7" fill="#1E293B" />
                  <circle cx="370" cy="212" r="7" fill="#1E293B" />

                  {/* Articulated Center Hitch Joint (Connects front tractor & trailer) */}
                  <g id="articulation-joint">
                    <rect x="420" y="185" width="34" height="48" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
                    <circle cx="437" cy="209" r="8" fill="#64748B" stroke="#0F172A" strokeWidth="2" />
                    <circle cx="437" cy="209" r="3" fill="#E2E8F0" />
                    <rect x="390" y="198" width="32" height="9" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />
                    <rect x="420" y="200" width="18" height="5" fill="#E2E8F0" />
                    <path d="M 400 216 Q 425 228 450 216" stroke="#0F172A" strokeWidth="3.5" fill="none" />
                    <path d="M 405 220 Q 428 234 452 220" stroke="#0F172A" strokeWidth="3.5" fill="none" />
                  </g>

                  {/* Heavy Diesel Fuel Tank with Level Sight Gauge */}
                  <rect x="315" y="228" width="95" height="36" rx="6" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
                  <rect x="325" y="234" width="75" height="4" fill="#334155" />
                  <circle cx="330" cy="248" r="5" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1.5" />
                  {/* Step Grates / Diamond Plate Ladder */}
                  <rect x="415" y="230" width="38" height="32" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                  <line x1="415" y1="238" x2="453" y2="238" stroke="#FFD600" strokeWidth="2.5" />
                  <line x1="415" y1="248" x2="453" y2="248" stroke="#FFD600" strokeWidth="2.5" />
                  <line x1="415" y1="258" x2="453" y2="258" stroke="#FFD600" strokeWidth="2.5" />
                </g>

                {/* 6. Front Tractor Operator Cab, Hood & Air Intake */}
                <g id="operator-cab-assembly">
                  {/* Heavy Sloping Engine Hood in Safety Yellow */}
                  <path
                    d="M 450 140 L 545 105 L 610 185 L 450 185 Z"
                    fill="url(#cabYellowRealistic)"
                    stroke="#B45309"
                    strokeWidth="3.5"
                  />
                  <line x1="520" y1="130" x2="570" y2="168" stroke="#9A3412" strokeWidth="2.5" />
                  <line x1="530" y1="126" x2="580" y2="164" stroke="#9A3412" strokeWidth="2.5" />
                  <line x1="540" y1="122" x2="590" y2="160" stroke="#9A3412" strokeWidth="2.5" />

                  {/* ROPS / FOPS Certified Safety Cab Structure */}
                  <path
                    d="M 450 95 L 530 95 L 585 185 L 450 185 Z"
                    fill="#1E293B"
                    stroke="#0F172A"
                    strokeWidth="3"
                  />

                  {/* Panoramic Curved Tempered Windshield */}
                  <path
                    d="M 495 102 L 526 102 L 575 180 L 495 180 Z"
                    fill="url(#glassReflectionDay)"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                  />
                  <line x1="510" y1="180" x2="545" y2="128" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />

                  {/* Operator Silhouette (OSHA Hardhat & Safety Vest) */}
                  <g id="operator-driver">
                    <ellipse cx="518" cy="130" rx="10" ry="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
                    <rect x="508" y="132" width="22" height="3" rx="1" fill="#FFFFFF" />
                    <circle cx="518" cy="137" r="7" fill="#F87171" />
                    <path d="M 508 178 C 508 148, 532 148, 532 178 Z" fill="#FF6B00" />
                    <line x1="510" y1="162" x2="530" y2="162" stroke="#FFFFFF" strokeWidth="2.5" />
                    <ellipse cx="542" cy="165" rx="4" ry="9" fill="none" stroke="#0F172A" strokeWidth="2.5" />
                  </g>

                  {/* Side Operator Window */}
                  <rect x="455" y="104" width="34" height="65" rx="3" fill="url(#glassReflectionDay)" />

                  {/* Dual West Coast Truck Mirrors */}
                  <rect x="555" y="122" width="7" height="34" rx="2" fill="#FF6B00" stroke="#7C2D12" strokeWidth="1.5" />
                  <line x1="542" y1="128" x2="555" y2="128" stroke="#334155" strokeWidth="2" />
                  <line x1="542" y1="148" x2="555" y2="148" stroke="#334155" strokeWidth="2" />

                  {/* Front Heavy Radiator Grille & Cast Bumper */}
                  <g id="front-bumper-grille">
                    <path d="M 605 185 L 638 185 L 638 225 L 605 225 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
                    <line x1="612" y1="192" x2="632" y2="192" stroke="#64748B" strokeWidth="2" />
                    <line x1="612" y1="200" x2="632" y2="200" stroke="#64748B" strokeWidth="2" />
                    <line x1="612" y1="208" x2="632" y2="208" stroke="#64748B" strokeWidth="2" />
                    <line x1="612" y1="216" x2="632" y2="216" stroke="#64748B" strokeWidth="2" />

                    {/* Heavy Steel Recovery Tow Shackle */}
                    <rect x="625" y="222" width="18" height="12" rx="2" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
                    <circle cx="634" cy="228" r="3.5" fill="#FF6B00" />

                    {/* Dual High-Intensity Projector Headlamps */}
                    <circle cx="628" cy="198" r="9" fill="#FFFBEB" stroke="#EAB308" strokeWidth="2.5" />
                    <circle cx="628" cy="198" r="5" fill="#FFFFFF" />
                  </g>

                  {/* Dual Alternating Flashing Amber Emergency Strobe Beacons */}
                  <g id="strobe-beacons">
                    <rect x="475" y="82" width="16" height="12" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
                    <circle cx="483" cy="88" r="4.5" fill="#FEF08A" className="animate-ping opacity-75" />
                    <rect x="515" y="82" width="16" height="12" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
                    <circle cx="523" cy="88" r="4.5" fill="#FEF08A" className="animate-ping opacity-75" />
                  </g>

                  {/* Chrome Freight Air Horns on Roof */}
                  <path d="M 495 86 L 525 82 L 530 87 L 495 87 Z" fill="url(#chromeRam)" stroke="#334155" strokeWidth="1.5" />

                  {/* Chrome Vertical Exhaust Stack with Bouncing Rain Flapper */}
                  <g id="exhaust-stack">
                    <rect x="440" y="38" width="14" height="130" rx="3" fill="url(#chromeRam)" stroke="#475569" strokeWidth="2" />
                    <rect x="437" y="58" width="20" height="70" rx="3" fill="#64748B" opacity="0.85" />
                    <line
                      x1="438"
                      y1="37"
                      x2="458"
                      y2={truckSpeedKmh > 0 ? 32 : 36}
                      stroke="#0F172A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </g>
                </g>

                {/* 7. Flexible Rubber Mud Flaps behind Rear Tires (Native SVG transform) */}
                <g id="mud-flaps">
                  <g ref={mudFlap2Ref} transform="rotate(0 65 245)">
                    <rect x="65" y="245" width="8" height="52" rx="1.5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                    <line x1="66" y1="290" x2="72" y2="290" stroke="#FFD600" strokeWidth="2" />
                  </g>

                  <g ref={mudFlap1Ref} transform="rotate(0 195 245)">
                    <rect x="195" y="245" width="8" height="52" rx="1.5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                    <line x1="196" y1="290" x2="202" y2="290" stroke="#FFD600" strokeWidth="2" />
                  </g>
                </g>

                {/* 8. Hyper-Realistic Heavy Earthmover Wheels (29.5R25 Deep Rock Lugs) */}
                {/* WHEEL 1: Front Steering Wheel (Center: 550, 275) */}
                <g ref={frontWheelRef} id="wheel-front" transform="rotate(0 550 275)">
                  {/* Deep Rock Lug Chevron Tread Perimeter (16 Protruding Lugs) */}
                  <g id="tread-lugs-front">
                    {Array.from({ length: 16 }).map((_, i) => {
                      const angle = (i * 360) / 16;
                      const rad = (angle * Math.PI) / 180;
                      const x = 550 + Math.cos(rad) * 58;
                      const y = 275 + Math.sin(rad) * 58;
                      return (
                        <rect
                          key={i}
                          x={x - 6}
                          y={y - 6}
                          width="12"
                          height="12"
                          rx="2"
                          fill="#0F172A"
                          stroke="#334155"
                          strokeWidth="1.5"
                          transform={`rotate(${angle + 45}, ${x}, ${y})`}
                        />
                      );
                    })}
                  </g>

                  {/* Main Tire Sidewall Body */}
                  <circle cx="550" cy="275" r="58" fill="url(#tireRubberGradient)" stroke="#0F172A" strokeWidth="5" />
                  <circle cx="550" cy="275" r="48" fill="#1E293B" stroke="#334155" strokeWidth="3" />

                  {/* Deep-Dish Machined Steel Rim */}
                  <circle cx="550" cy="275" r="32" fill="url(#rimCenterMachined)" stroke="#9A3412" strokeWidth="3.5" />
                  {/* 10 Hexagonal Wheel Studs & Nuts */}
                  {Array.from({ length: 10 }).map((_, i) => {
                    const ang = (i * 360) / 10;
                    const r = 24;
                    const bx = 550 + Math.cos((ang * Math.PI) / 180) * r;
                    const by = 275 + Math.sin((ang * Math.PI) / 180) * r;
                    return <circle key={i} cx={bx} cy={by} r="2.5" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />;
                  })}
                  {/* Central Planetary Reduction Gear Hub */}
                  <circle cx="550" cy="275" r="14" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
                  <circle cx="550" cy="275" r="5" fill="#FF6B00" />
                </g>

                {/* WHEEL 2: Tandem Axle 1 Wheel (Center: 245, 275) */}
                <g ref={rearWheel1Ref} id="wheel-tandem-1" transform="rotate(0 245 275)">
                  <g id="tread-lugs-rear-1">
                    {Array.from({ length: 16 }).map((_, i) => {
                      const angle = (i * 360) / 16;
                      const rad = (angle * Math.PI) / 180;
                      const x = 245 + Math.cos(rad) * 60;
                      const y = 275 + Math.sin(rad) * 60;
                      return (
                        <rect
                          key={i}
                          x={x - 6}
                          y={y - 6}
                          width="12"
                          height="12"
                          rx="2"
                          fill="#0F172A"
                          stroke="#334155"
                          strokeWidth="1.5"
                          transform={`rotate(${angle + 45}, ${x}, ${y})`}
                        />
                      );
                    })}
                  </g>
                  <circle cx="245" cy="275" r="60" fill="url(#tireRubberGradient)" stroke="#0F172A" strokeWidth="5" />
                  <circle cx="245" cy="275" r="50" fill="#1E293B" stroke="#334155" strokeWidth="3" />
                  <circle cx="245" cy="275" r="34" fill="url(#rimCenterMachined)" stroke="#9A3412" strokeWidth="3.5" />
                  {Array.from({ length: 10 }).map((_, i) => {
                    const ang = (i * 360) / 10;
                    const r = 26;
                    const bx = 245 + Math.cos((ang * Math.PI) / 180) * r;
                    const by = 275 + Math.sin((ang * Math.PI) / 180) * r;
                    return <circle key={i} cx={bx} cy={by} r="2.5" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />;
                  })}
                  <circle cx="245" cy="275" r="15" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
                  <circle cx="245" cy="275" r="5" fill="#FF6B00" />
                </g>

                {/* WHEEL 3: Tandem Axle 2 Wheel (Center: 115, 275) */}
                <g ref={rearWheel2Ref} id="wheel-tandem-2" transform="rotate(0 115 275)">
                  <g id="tread-lugs-rear-2">
                    {Array.from({ length: 16 }).map((_, i) => {
                      const angle = (i * 360) / 16;
                      const rad = (angle * Math.PI) / 180;
                      const x = 115 + Math.cos(rad) * 60;
                      const y = 275 + Math.sin(rad) * 60;
                      return (
                        <rect
                          key={i}
                          x={x - 6}
                          y={y - 6}
                          width="12"
                          height="12"
                          rx="2"
                          fill="#0F172A"
                          stroke="#334155"
                          strokeWidth="1.5"
                          transform={`rotate(${angle + 45}, ${x}, ${y})`}
                        />
                      );
                    })}
                  </g>
                  <circle cx="115" cy="275" r="60" fill="url(#tireRubberGradient)" stroke="#0F172A" strokeWidth="5" />
                  <circle cx="115" cy="275" r="50" fill="#1E293B" stroke="#334155" strokeWidth="3" />
                  <circle cx="115" cy="275" r="34" fill="url(#rimCenterMachined)" stroke="#9A3412" strokeWidth="3.5" />
                  {Array.from({ length: 10 }).map((_, i) => {
                    const ang = (i * 360) / 10;
                    const r = 26;
                    const bx = 115 + Math.cos((ang * Math.PI) / 180) * r;
                    const by = 275 + Math.sin((ang * Math.PI) / 180) * r;
                    return <circle key={i} cx={bx} cy={by} r="2.5" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />;
                  })}
                  <circle cx="115" cy="275" r="15" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
                  <circle cx="115" cy="275" r="5" fill="#FF6B00" />
                </g>
              </svg>
            </div>

            {/* Bright Paved Concrete Highway Road Surface */}
            <div className="relative w-full h-20 md:h-24 bg-[#CBD5E1] border-t-4 border-[#64748B] shadow-2xl">
              {/* Vibrant Hazard Stripe */}
              <div className="absolute top-0 inset-x-0 h-3 hazard-stripe opacity-95" />

              {/* Road Dash Lines in Bright Orange */}
              <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex justify-between gap-12 px-4 overflow-hidden">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-3 bg-[#FF6B00] rounded-full shrink-0 shadow-xs"
                    style={{ transform: `translateX(${-((scrollProgress * 260) % 70)}px)` }}
                  />
                ))}
              </div>

              {/* Highway Telemetry Readout in Clean High Contrast */}
              <div className="absolute bottom-1.5 right-8 flex items-center gap-3 text-xs font-mono text-gray-900 font-black">
                <span>CHAINAGE:</span>
                <span className="text-[#FF6B00] font-black tabular-nums">
                  KM {(scrollProgress * 4.8).toFixed(2)} / 4.80
                </span>
                <span className="hidden sm:inline text-gray-400">|</span>
                <span className="hidden sm:inline">VELOCITY: {truckSpeedKmh > 0 ? truckSpeedKmh : isAutoDriving ? '36' : '0'} KM/H</span>
                <span className="hidden sm:inline text-gray-400">|</span>
                <span className="hidden sm:inline text-gray-900">45T HAUL BED</span>
              </div>
            </div>

            {/* Foreground Parallax Layer: Bright Safety Orange Barrels */}
            <div
              ref={foregroundLayerRef}
              className="absolute -bottom-4 left-0 w-[200vw] pointer-events-none z-40 flex items-center gap-64 pl-32 will-change-transform"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-end gap-3 shrink-0">
                  <div className="w-6 h-12 bg-[#FF6B00] border border-orange-700 rounded-t-sm shadow-xl flex flex-col justify-around py-1">
                    <div className="h-2 bg-white" />
                    <div className="h-2 bg-white" />
                  </div>
                  <div className="w-1.5 h-16 bg-white border border-gray-400 flex flex-col justify-between py-1">
                    <div className="h-2.5 bg-[#FF6B00]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Interactive HUD Stage Selector in Bright White */}
        <div className="relative z-30 pb-6 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <div className="bg-white border-2 border-gray-900 p-3 sm:p-4 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            {/* Stage Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {STAGES.map((st, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={st.step}
                    type="button"
                    onClick={() => jumpToStage(idx)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-mono font-black uppercase transition-all whitespace-nowrap shrink-0 border-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-md'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:text-black hover:border-gray-900'
                    }`}
                  >
                    <span>0{idx + 1}.</span>
                    <span>{st.phaseCode.split('//')[1]?.trim() || st.phaseCode}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Progress Scrubber */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] font-mono uppercase text-gray-700 font-bold">SCRUB STAGE</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={scrollProgress}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateTruckPosition(val);
                }}
                className="w-28 sm:w-36 h-2.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-[#FF6B00]"
                aria-label="Scrub truck position"
              />
              <span className="text-xs font-mono font-black text-[#FF6B00] tabular-nums">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
