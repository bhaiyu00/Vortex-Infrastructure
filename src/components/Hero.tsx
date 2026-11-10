import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Crosshair,
  Compass,
  HardHat,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Activity,
} from 'lucide-react';

interface HeroProps {
  onOpenConsultation: (initialData?: Record<string, string>) => void;
  onExploreProjects: () => void;
  onReplayJcbIntro?: () => void;
}

interface JCBModel {
  id: string;
  name: string;
  tagline: string;
  image: string;
  digDepth: string;
  bucketCapacity: string;
  enginePower: string;
  operatingWeight: string;
  breakoutForce: string;
  primaryRole: string;
}

const JCB_FLEET: JCBModel[] = [
  {
    id: 'jcb-3cx',
    name: 'JCB 3CX ECO Backhoe Loader',
    tagline: 'World-Renowned Dual-Action Earthmover & Foundation Digging Workhorse',
    image: '/src/assets/images/jcb_excavator_hero_1794291574934.jpg',
    digDepth: '5.46 Meters',
    bucketCapacity: '1.2 m³ 6-in-1 Shovel',
    enginePower: '74 HP JCB EcoMAX',
    operatingWeight: '8,135 kg',
    breakoutForce: '6,590 kgf',
    primaryRole: 'Sub-grade Foundation Excavation & Utility Trenching',
  },
  {
    id: 'jcb-220x',
    name: 'JCB 220X Heavy Crawler Excavator',
    tagline: 'High-Tonnage Hydraulic Rock Breaker & Deep Earthworks Excavator',
    image: '/src/assets/images/jcb_heavy_excavator_1794291595370.jpg',
    digDepth: '6.70 Meters',
    bucketCapacity: '1.25 m³ Heavy Rock Bucket',
    enginePower: '173 HP Turbocharged',
    operatingWeight: '22,500 kg',
    breakoutForce: '15,200 kgf',
    primaryRole: 'Mass Bedrock Earthmoving & Heavy Bridge Abutments',
  },
];

export default function Hero({ onOpenConsultation, onExploreProjects, onReplayJcbIntro }: HeroProps) {
  const [selectedJCBIndex, setSelectedJCBIndex] = useState(0);
  const activeJCB = JCB_FLEET[selectedJCBIndex];

  const scrollToJourney = () => {
    const el = document.getElementById('journey');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookJCB = () => {
    onOpenConsultation({
      projectType: `Equipment Deployment: ${activeJCB.name}`,
      projectDetails: `Inquiry regarding active deployment of ${activeJCB.name} (${activeJCB.primaryRole}) for upcoming civil infrastructure earthworks.`,
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden bg-[#FFFFFF] text-gray-950"
    >
      {/* Background Architectural Canvas featuring Authentic Sunlit JCB Machine */}
      <div className="absolute inset-0 z-0">
        <img
          key={activeJCB.id}
          src={activeJCB.image}
          alt={`Authentic ${activeJCB.name} civil machine on active site`}
          className="w-full h-full object-cover object-center filter brightness-105 contrast-95 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Bright luminous gradient scrims for clean typographic contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/70" />
        <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
      </div>

      {/* Main Editorial Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Typographic Statement & JCB Commissioning (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Technical Datum Line */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#FF6B00] font-black">
                [ JCB HEAVY FLEET // TIER-1 CIVIL CONTRACTOR ]
              </span>
              <span className="text-gray-300 text-xs font-mono">/</span>
              <span className="text-[11px] font-mono text-gray-700 tracking-wider uppercase font-bold">
                HIGH-PRECISION EARTHWORKS
              </span>
            </div>

            {/* Master Headline: Bold, High-Contrast, Archivo Black */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.035em] leading-[0.92] uppercase text-gray-950">
              We Build The <br />
              <span className="text-[#FF6B00] relative inline-block">
                Foundation
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2 text-[#FF6B00]/40"
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                >
                  <line x1="0" y1="4" x2="100" y2="4" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" />
                </svg>
              </span> <br />
              Of Tomorrow.
            </h1>

            {/* Precision Editorial Narrative */}
            <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-normal max-w-xl text-balance">
              Operating world-class JCB earthmoving machinery, executing deep bedrock foundation excavations, and building critical civil infrastructure engineered for the next century.
            </p>

            {/* JCB Machine Quick Toggle Selector (On-Page Landing Controller) */}
            <div className="p-3 bg-white/95 border-2 border-gray-900 shadow-md backdrop-blur-md max-w-xl">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
                <span className="text-[10px] font-mono uppercase font-black text-gray-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FFD600] border border-black inline-block animate-pulse" />
                  ACTIVE HEAVY EQUIPMENT SELECTOR
                </span>
                <span className="text-[10px] font-mono font-bold text-[#FF6B00]">CLICK TO SWITCH MACHINE</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {JCB_FLEET.map((model, idx) => {
                  const isSelected = selectedJCBIndex === idx;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedJCBIndex(idx)}
                      className={`px-3 py-2 text-left border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFD600] border-gray-950 text-gray-950 font-black shadow-xs'
                          : 'bg-gray-50 hover:bg-orange-50 border-gray-300 text-gray-700 font-bold'
                      }`}
                    >
                      <div className="text-[11px] font-mono uppercase leading-tight line-clamp-1">
                        {model.name}
                      </div>
                      <div className="text-[9px] font-mono text-gray-600 font-semibold mt-0.5">
                        {model.digDepth} Dig · {model.operatingWeight}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bright High-Visibility Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 flex-wrap">
              <button
                onClick={handleBookJCB}
                className="group relative px-7 py-4 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs md:text-sm font-black font-mono uppercase tracking-wider transition-all transform active:scale-95 shadow-xl flex items-center justify-center gap-3 whitespace-nowrap cursor-pointer"
              >
                <span>Deploy Machine / Get Quote</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={scrollToJourney}
                className="px-6 py-4 bg-white hover:bg-orange-50 text-gray-950 text-xs md:text-sm font-black font-mono uppercase tracking-wider border-2 border-gray-900 transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping inline-block" />
                <span>Launch Live Truck Tour 🚚</span>
                <ArrowDown className="w-4 h-4 text-[#FF6B00]" />
              </button>

              <button
                onClick={onExploreProjects}
                className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs md:text-sm font-bold font-mono uppercase tracking-wider border border-gray-300 transition-all transform active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Explore Projects</span>
              </button>

              {onReplayJcbIntro && (
                <button
                  type="button"
                  onClick={onReplayJcbIntro}
                  className="px-5 py-4 bg-amber-100 hover:bg-amber-200 text-gray-950 text-xs md:text-sm font-bold font-mono uppercase tracking-wider border-2 border-amber-400 transition-all transform active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-sm"
                  title="Watch the JCB landing loading interface again"
                >
                  <span>🚜 JCB Intro Screen</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: High-Impact JCB Machine Telemetry Dossier (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/98 border-2 border-gray-900 p-6 backdrop-blur-xl shadow-2xl space-y-5 relative">
              {/* Corner industrial registration marks */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-[#FF6B00] font-bold">+</div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-[#FF6B00] font-bold">+</div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#FF6B00] font-bold">+</div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#FF6B00] font-bold">+</div>

              {/* Header Badge */}
              <div className="flex items-center justify-between border-b-2 border-gray-900 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FFD600] border border-black flex items-center justify-center font-black font-mono text-[9px]">
                    J
                  </div>
                  <span className="text-xs font-mono font-black uppercase text-gray-950 tracking-wider">
                    JCB FLEET TELEMETRY
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-green-100 border border-green-700 text-green-900 font-mono text-[9px] font-black uppercase">
                  READY ON SITE
                </span>
              </div>

              {/* Active Machine Preview Card */}
              <div className="relative border-2 border-gray-900 overflow-hidden group shadow-inner bg-gray-950">
                <img
                  src={activeJCB.image}
                  alt={activeJCB.name}
                  className="w-full h-48 sm:h-52 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[10px] font-mono text-[#FFD600] font-black uppercase tracking-wider">
                    SPECIFICATION DOSSIER
                  </div>
                  <div className="text-sm font-black uppercase leading-tight font-sans">
                    {activeJCB.name}
                  </div>
                  <div className="text-[10px] text-gray-300 font-mono mt-0.5">
                    {activeJCB.primaryRole}
                  </div>
                </div>
              </div>

              {/* Machine Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-gray-50 border border-gray-200">
                  <span className="text-[9px] text-gray-500 uppercase block font-bold">MAX DIG DEPTH</span>
                  <span className="text-sm font-black text-gray-950">{activeJCB.digDepth}</span>
                </div>

                <div className="p-2.5 bg-gray-50 border border-gray-200">
                  <span className="text-[9px] text-gray-500 uppercase block font-bold">SHOVEL CAPACITY</span>
                  <span className="text-sm font-black text-[#FF6B00]">{activeJCB.bucketCapacity}</span>
                </div>

                <div className="p-2.5 bg-gray-50 border border-gray-200">
                  <span className="text-[9px] text-gray-500 uppercase block font-bold">BREAKOUT FORCE</span>
                  <span className="text-sm font-black text-gray-950">{activeJCB.breakoutForce}</span>
                </div>

                <div className="p-2.5 bg-gray-50 border border-gray-200">
                  <span className="text-[9px] text-gray-500 uppercase block font-bold">OPERATING WEIGHT</span>
                  <span className="text-sm font-black text-gray-950">{activeJCB.operatingWeight}</span>
                </div>
              </div>

              {/* Interactive Booking Banner */}
              <button
                type="button"
                onClick={handleBookJCB}
                className="w-full py-3 bg-[#FFD600] hover:bg-yellow-400 text-gray-950 border-2 border-gray-950 font-black font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <span>Book This {activeJCB.name.split(' ')[1]} Machine</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Monolithic Datum Bar in Bright Styling */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-300 bg-white shadow-lg">
          <div className="p-4 sm:p-6 border-r border-gray-200 space-y-1">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 font-mono tabular-nums">
              45<span className="text-[#FF6B00]">+</span>
            </span>
            <span className="text-[11px] font-mono text-gray-600 uppercase tracking-wider block font-semibold">
              Heavy JCB &amp; Haul Machines
            </span>
          </div>

          <div className="p-4 sm:p-6 border-r md:border-r border-gray-200 space-y-1">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 font-mono tabular-nums">
              $2.4B<span className="text-[#FF6B00]">+</span>
            </span>
            <span className="text-[11px] font-mono text-gray-600 uppercase tracking-wider block font-semibold">
              Capital Infrastructure Delivered
            </span>
          </div>

          <div className="p-4 sm:p-6 border-r border-gray-200 space-y-1">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 font-mono tabular-nums">
              120<span className="text-[#FF6B00]">+</span>
            </span>
            <span className="text-[11px] font-mono text-gray-600 uppercase tracking-wider block font-semibold">
              Megaprojects Completed
            </span>
          </div>

          <div className="p-4 sm:p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-black text-[#FF6B00] font-mono tabular-nums">
                0.00
              </span>
              <span className="text-[11px] font-mono text-gray-600 uppercase tracking-wider block font-semibold">
                OSHA Incident Rate
              </span>
            </div>

            {/* Scroll Indicator */}
            <button
              onClick={scrollToJourney}
              className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FF6B00] transition-colors cursor-pointer"
              aria-label="Scroll to vehicle journey"
            >
              <span className="text-[9px] font-mono tracking-widest uppercase text-[#FF6B00] font-bold">TRUCK TOUR</span>
              <div className="w-8 h-8 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-orange-50 transition-colors shadow-xs">
                <ArrowDown className="w-3.5 h-3.5 text-[#FF6B00]" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
