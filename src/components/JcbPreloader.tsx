import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, HardHat, Compass, Sparkles, Volume2, VolumeX, ShieldCheck, Activity } from 'lucide-react';
import { truckAudio } from '../utils/truckAudio';

interface JcbPreloaderProps {
  onComplete: () => void;
}

const LOADING_STEPS = [
  { at: 15, msg: 'INITIALIZING JCB ECOMAX DIESEL POWERTRAIN (2,400 PSI)...' },
  { at: 35, msg: 'CALIBRATING DUAL HYDRAULIC RAMS & ARTICULATED BOOM...' },
  { at: 60, msg: 'SCANNING 3D TOPOGRAPHY & BEDROCK SUBTERRANEAN GRADES...' },
  { at: 85, msg: 'DEPLOYING 1.2M³ HEAVY SHOVEL & STABILIZER OUTRIGGERS...' },
  { at: 100, msg: 'SITE ACCESS AUTHORIZED // READY TO BUILD BEYOND LIMITS' },
];

export default function JcbPreloader({ onComplete }: JcbPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('ENGAGING HYDRAULIC STARTER...');
  const [isExiting, setIsExiting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boomRef = useRef<SVGGElement>(null);
  const bucketRef = useRef<SVGGElement>(null);

  // Sound toggle on preloader
  const handleToggleSound = () => {
    const active = truckAudio.toggleMute();
    setSoundEnabled(active);
  };

  // Skip / Instant Enter
  const handleSkip = () => {
    truckAudio.playAirBrakeHiss();
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  // Progress Counter Simulation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Faster progression
      const step = Math.floor(Math.random() * 4) + 2;
      current = Math.min(100, current + step);
      setProgress(current);

      // Match status text
      const matched = LOADING_STEPS.find((s) => current <= s.at);
      if (matched) {
        setStatusText(matched.msg);
      } else {
        setStatusText('SITE ACCESS AUTHORIZED // READY TO BUILD BEYOND LIMITS');
      }

      // Animate boom and bucket
      const cycle = (current % 40) / 40; // 0 to 1
      const boomAngle = Math.sin(cycle * Math.PI * 2) * 16;
      const bucketAngle = Math.cos(cycle * Math.PI * 2) * 24;

      if (boomRef.current) {
        boomRef.current.setAttribute('transform', `rotate(${boomAngle.toFixed(1)} 290 190)`);
      }
      if (bucketRef.current) {
        bucketRef.current.setAttribute('transform', `rotate(${bucketAngle.toFixed(1)} 410 240)`);
      }

      if (current >= 100) {
        clearInterval(interval);
        truckAudio.playAirBrakeHiss();
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 350);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Digging Dirt Sparks / Dust Simulation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    interface Dust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }

    const dusts: Dust[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn dust from the shovel digging point
      if (dusts.length < 40 && Math.random() > 0.3) {
        dusts.push({
          x: width * 0.72 + (Math.random() * 20 - 10),
          y: height * 0.82 + (Math.random() * 8 - 4),
          vx: -(Math.random() * 2.5 + 0.8),
          vy: -(Math.random() * 2.2 + 0.5),
          size: Math.random() * 6 + 3,
          opacity: 0.6,
          color: Math.random() > 0.5 ? 'rgba(217, 119, 6, ' : 'rgba(180, 83, 9, ',
        });
      }

      for (let i = dusts.length - 1; i >= 0; i--) {
        const d = dusts[i];
        d.x += d.vx;
        d.y += d.vy;
        d.size += 0.2;
        d.opacity -= 0.015;

        if (d.opacity <= 0) {
          dusts.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}${d.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-white text-gray-950 font-sans transition-all duration-500 overflow-hidden ${
        isExiting ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Top Industrial Warning Stripes */}
      <div className="w-full h-3 hazard-stripe opacity-95 shrink-0" />

      {/* Main High-Impact Loading Canvas */}
      <div className="max-w-4xl mx-auto w-full px-6 flex-1 flex flex-col justify-center items-center my-auto py-6">
        {/* Brand Wordmark & Department Tag */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-yellow-100 border-2 border-gray-900 text-gray-950 shadow-sm">
            <span className="w-2.5 h-2.5 bg-[#FF6B00] animate-ping" />
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#FF6B00]">
              JCB 3CX HEAVY EXCAVATOR // SYSTEM INITIALIZING
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-950">
            VORTEX <span className="text-[#FF6B00]">INFRASTRUCTURE</span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-gray-600 uppercase tracking-wider font-semibold max-w-md">
            Heavy Civil Engineering · Bedrock Excavation · Landmark Megaprojects
          </p>
        </div>

        {/* Animated Interactive JCB Machine Graphics */}
        <div className="relative w-full max-w-lg h-56 sm:h-64 border-2 border-gray-950 bg-gradient-to-b from-amber-50/50 via-white to-gray-100 shadow-xl overflow-hidden flex items-end justify-center">
          {/* Blueprint Grid Scrim */}
          <div className="absolute inset-0 blueprint-grid opacity-35 pointer-events-none" />

          {/* Dirt Particle Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

          {/* Authentic JCB 3CX Backhoe Loader SVG Animation */}
          <svg
            viewBox="0 0 540 280"
            className="w-full h-auto max-h-56 z-20 drop-shadow-[0_12px_18px_rgba(0,0,0,0.25)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Genuine JCB Industrial Yellow Gradient */}
              <linearGradient id="jcbYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF033" />
                <stop offset="40%" stopColor="#FFD600" />
                <stop offset="100%" stopColor="#E5A700" />
              </linearGradient>

              {/* Polished Chrome Hydraulic Cylinder */}
              <linearGradient id="jcbChrome" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="35%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
              </linearGradient>

              {/* Tinted Safety Glass */}
              <linearGradient id="jcbGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#0369A1" stopOpacity="0.85" />
              </linearGradient>

              {/* Earthmover Tire Rubber */}
              <linearGradient id="jcbRubber" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
            </defs>

            {/* Earth Excavation Mound under front bucket */}
            <path
              d="M 330 260 Q 380 230 460 260 Z"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="2"
            />
            <path
              d="M 360 260 Q 400 240 440 260 Z"
              fill="#92400E"
            />

            {/* JCB Main Heavy Cast Chassis Frame */}
            <rect x="110" y="160" width="220" height="42" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />

            {/* JCB ROPS Safety Operator Cab in Iconic Yellow */}
            <g id="jcb-cab">
              {/* Main Structural Pillars */}
              <path
                d="M 170 95 L 245 95 L 265 170 L 170 170 Z"
                fill="url(#jcbYellow)"
                stroke="#B45309"
                strokeWidth="3"
              />
              {/* Tinted Panoramic Front Windshield */}
              <path
                d="M 215 102 L 240 102 L 258 162 L 215 162 Z"
                fill="url(#jcbGlass)"
                stroke="#0284C7"
                strokeWidth="2"
              />
              {/* Side Window */}
              <rect x="178" y="104" width="30" height="58" rx="2" fill="url(#jcbGlass)" />

              {/* Operator with White OSHA Hardhat */}
              <circle cx="205" cy="125" r="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
              <path d="M 198 158 C 198 138, 218 138, 218 158 Z" fill="#FF6B00" />
              <line x1="200" y1="148" x2="216" y2="148" stroke="#FFFFFF" strokeWidth="2" />

              {/* Alternating Amber Safety Strobe Beacon */}
              <rect x="200" y="86" width="16" height="10" rx="3" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
              <circle cx="208" cy="91" r="3.5" fill="#FEF08A" className="animate-ping" />

              {/* JCB Brand Logo on Cab */}
              <rect x="180" y="148" width="45" height="16" rx="2" fill="#0F172A" />
              <text
                x="185"
                y="160"
                fill="#FFD600"
                fontFamily="Archivo, sans-serif"
                fontWeight="900"
                fontSize="11"
                letterSpacing="1"
              >
                JCB
              </text>
            </g>

            {/* JCB Front Sloping Engine Hood */}
            <path
              d="M 245 142 L 315 142 L 330 175 L 245 175 Z"
              fill="url(#jcbYellow)"
              stroke="#B45309"
              strokeWidth="2.5"
            />
            {/* Engine Hood Badge */}
            <text
              x="262"
              y="162"
              fill="#0F172A"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="900"
              fontSize="10"
              letterSpacing="1"
            >
              3CX ECO
            </text>
            {/* Front Headlight */}
            <circle cx="325" cy="160" r="5" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />

            {/* FRONT LOADER ARM & DIGGING BUCKET (Animated!) */}
            <g id="front-loader-assembly">
              {/* Heavy Lift Arm */}
              <g ref={boomRef} transform="rotate(0 290 190)">
                <polygon
                  points="290,185 390,195 405,215 295,195"
                  fill="url(#jcbYellow)"
                  stroke="#B45309"
                  strokeWidth="2.5"
                />
                {/* Hydraulic Ram */}
                <rect x="300" y="178" width="55" height="7" rx="2" fill="#475569" stroke="#0F172A" strokeWidth="1" />
                <rect x="340" y="179" width="35" height="5" fill="url(#jcbChrome)" />

                {/* 1.2 m³ Heavy Digging Shovel / Bucket */}
                <g ref={bucketRef} transform="rotate(0 410 240)">
                  <path
                    d="M 395 210 L 440 210 L 450 250 L 390 250 Z"
                    fill="#334155"
                    stroke="#0F172A"
                    strokeWidth="2.5"
                  />
                  {/* Heavy Steel Bucket Teeth */}
                  <polygon points="440,250 448,258 444,250" fill="#E2E8F0" />
                  <polygon points="425,250 433,258 429,250" fill="#E2E8F0" />
                  <polygon points="410,250 418,258 414,250" fill="#E2E8F0" />
                  <polygon points="395,250 403,258 399,250" fill="#E2E8F0" />

                  {/* Dirt in Bucket */}
                  <polygon points="400,215 435,215 440,230 402,230" fill="#92400E" />
                </g>
              </g>
            </g>

            {/* REAR BACKHOE ARTICULATING BOOM & EXTENSIBLE DIPPER */}
            <g id="rear-backhoe-assembly">
              {/* Kingpost Swing Post */}
              <rect x="95" y="145" width="22" height="38" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              {/* Curved Heavy Backhoe Boom */}
              <path
                d="M 105 155 Q 60 110 50 65 L 62 60 Q 75 105 115 150 Z"
                fill="url(#jcbYellow)"
                stroke="#B45309"
                strokeWidth="2.5"
              />
              {/* Black JCB Brand Text along Boom */}
              <text
                x="65"
                y="110"
                fill="#0F172A"
                fontFamily="Archivo, sans-serif"
                fontWeight="900"
                fontSize="12"
                transform="rotate(-58 65 110)"
              >
                JCB
              </text>
              {/* Hydraulic Cylinder on Boom */}
              <line x1="102" y1="140" x2="68" y2="85" stroke="url(#jcbChrome)" strokeWidth="4" />
              <line x1="95" y1="145" x2="80" y2="120" stroke="#475569" strokeWidth="6" />

              {/* Dipper Arm */}
              <path d="M 50 65 L 30 110 L 40 112 L 62 60 Z" fill="url(#jcbYellow)" stroke="#B45309" strokeWidth="2" />
              {/* Backhoe Bucket */}
              <path d="M 30 110 L 15 130 L 25 140 L 40 120 Z" fill="#334155" stroke="#0F172A" strokeWidth="2" />
            </g>

            {/* Hydraulic Stabilizer Outriggers */}
            <rect x="125" y="195" width="12" height="42" fill="#475569" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="120" y="235" width="22" height="6" rx="2" fill="#1E293B" />

            {/* MASSIVE HEAVY REAR WHEEL (Center: 155, 220) */}
            <g id="rear-wheel">
              <circle cx="155" cy="220" r="44" fill="url(#jcbRubber)" stroke="#0F172A" strokeWidth="4" />
              {/* Deep Rock Lug Treads */}
              {Array.from({ length: 12 }).map((_, i) => {
                const ang = (i * 360) / 12;
                const r = 44;
                const bx = 155 + Math.cos((ang * Math.PI) / 180) * r;
                const by = 220 + Math.sin((ang * Math.PI) / 180) * r;
                return <circle key={i} cx={bx} cy={by} r="3" fill="#0F172A" />;
              })}
              {/* JCB Yellow Rim */}
              <circle cx="155" cy="220" r="26" fill="url(#jcbYellow)" stroke="#B45309" strokeWidth="3" />
              <circle cx="155" cy="220" r="10" fill="#1E293B" />
              <circle cx="155" cy="220" r="4" fill="#FFD600" />
            </g>

            {/* FRONT STEERING WHEEL (Center: 295, 230) */}
            <g id="front-wheel">
              <circle cx="295" cy="230" r="34" fill="url(#jcbRubber)" stroke="#0F172A" strokeWidth="3" />
              {Array.from({ length: 10 }).map((_, i) => {
                const ang = (i * 360) / 10;
                const r = 34;
                const bx = 295 + Math.cos((ang * Math.PI) / 180) * r;
                const by = 230 + Math.sin((ang * Math.PI) / 180) * r;
                return <circle key={i} cx={bx} cy={by} r="2.5" fill="#0F172A" />;
              })}
              <circle cx="295" cy="230" r="18" fill="url(#jcbYellow)" stroke="#B45309" strokeWidth="2.5" />
              <circle cx="295" cy="230" r="7" fill="#1E293B" />
            </g>
          </svg>
        </div>

        {/* Dynamic Telemetry Loading Bar & Live Status */}
        <div className="w-full max-w-lg mt-6 space-y-3">
          {/* Header readout */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#FF6B00] animate-pulse" />
              LOADING PROGRESS
            </span>
            <span className="text-[#FF6B00] font-black text-base tabular-nums">
              {progress}%
            </span>
          </div>

          {/* Heavy Architectural Progress Track */}
          <div className="w-full h-4 bg-gray-200 border-2 border-gray-900 overflow-hidden relative shadow-inner p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#FFD600] to-[#FF6B00] transition-all duration-75 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          {/* Machine Telemetry Step Message */}
          <div className="p-2.5 bg-gray-50 border border-gray-300 flex items-center justify-between gap-3 min-h-[44px]">
            <span className="text-[11px] font-mono font-bold text-gray-800 leading-tight">
              {statusText}
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 animate-ping" />
          </div>

          {/* Control Triggers: Skip & Sound */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleToggleSound}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-600 hover:text-[#FF6B00] transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF6B00]" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'DIESEL SOUND: ON' : 'DIESEL SOUND: OFF'}</span>
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-mono font-black uppercase tracking-wider transition-all transform active:scale-95 shadow-md cursor-pointer"
            >
              <span>ENTER SITE NOW</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFD600]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Industrial Warning Stripes */}
      <div className="w-full h-3 hazard-stripe opacity-95 shrink-0" />
    </div>
  );
}
