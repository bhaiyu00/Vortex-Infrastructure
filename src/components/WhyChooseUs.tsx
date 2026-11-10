import React from 'react';
import { ShieldCheck, HardHat, Clock, Award, ArrowUpRight } from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../data/constructionData';

const ADVANTAGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  quality: Award,
  engineering: HardHat,
  delivery: Clock,
  safety: ShieldCheck,
};

export default function WhyChooseUs() {
  return (
    <section className="py-28 md:py-36 bg-[#FFFFFF] text-[#111111] overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 border-b border-gray-200 pb-8">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6B00]">
                SECTION 06 // INSTITUTIONAL VALUE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              The Difference Is In <br />
              <span className="text-[#FF6B00]">The Details.</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-normal">
              In heavy civil construction, tolerances are measured in millimeters. Discover how our engineering standards protect your capital deployment.
            </p>
          </div>
        </div>

        {/* Asymmetrical Layout: Photo Anchor + 4 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Architectural Anchor (5 cols) */}
          <div className="lg:col-span-5 relative bg-gray-900 border border-gray-200 overflow-hidden shadow-xl min-h-[440px] flex flex-col justify-end p-8 text-white group">
            <img
              src="/src/assets/images/bridge_infrastructure_viaduct_1794216527679.jpg"
              alt="Civil infrastructure viaduct engineering"
              className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 bg-[#FF6B00] text-black text-xs font-mono font-black uppercase tracking-wider inline-block">
                TOLERANCE SPECIFICATION
              </span>
              <h3 className="text-2xl font-black uppercase text-white leading-snug">
                Zero Compromise. Zero Deviation.
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Continuous laser scanning and digital twin surveying verify structural alignment before concrete placement.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Strategic Pillars (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US_DATA.map((item, idx) => {
              const Icon = ADVANTAGE_ICONS[item.id] || Award;

              return (
                <div
                  key={item.id}
                  className="bg-[#F9FAFB] p-6 sm:p-8 border border-gray-200 hover:border-[#FF6B00] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-[#FF6B00] text-white flex items-center justify-center transition-colors shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-gray-500 font-bold">
                        0{idx + 1}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase text-[#FF6B00] tracking-wider block mb-1">
                      {item.subtitle}
                    </span>
                    <h4 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-[#FF6B00] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-6 font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black font-mono text-[#111111] tabular-nums block">
                        {item.stat}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono block">
                        {item.statLabel}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6B00] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
