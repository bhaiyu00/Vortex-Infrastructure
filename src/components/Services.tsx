import React, { useState } from 'react';
import { ArrowUpRight, Check, Compass, Building, Factory, Layers, Landmark, Wrench, Calendar, ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/constructionData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectServiceForQuote?: (serviceTitle: string) => void;
}

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  commercial: Building,
  infrastructure: Compass,
  industrial: Factory,
  'civil-engineering': Layers,
  residential: Landmark,
  renovation: Wrench,
  'project-management': Calendar,
  'architectural-planning': Compass,
};

export default function Services({ onSelectServiceForQuote }: ServicesProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);

  const activeService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];
  const ActiveIcon = SERVICE_ICONS[activeService.id] || Building;

  return (
    <section id="services" className="py-28 md:py-36 bg-[#F5F5F5] text-[#111111] overflow-hidden border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 border-b border-gray-300 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6B00]">
                SECTION 03 // DISCIPLINE INDEX
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              Engineering Disciplines &amp; <br />
              <span className="text-[#FF6B00]">Contracting Scope</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed font-normal">
            Select an engineering practice to review technical tolerances, structural deliverables, and compliance certifications.
          </p>
        </div>

        {/* Interactive Architectural Dossier Split (Not Generic 3-Column Cards!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-white border border-gray-200 shadow-xl overflow-hidden">
          {/* Left Column: Interactive Service Directory (5 cols) */}
          <div className="lg:col-span-5 border-r border-gray-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-4 pb-2 border-b border-gray-100">
                SELECT ENGINEERING DISCIPLINE [01–08]
              </div>

              <div className="divide-y divide-gray-100">
                {SERVICES_DATA.map((service, idx) => {
                  const isSelected = service.id === selectedServiceId;
                  const Icon = SERVICE_ICONS[service.id] || Building;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      onMouseEnter={() => setSelectedServiceId(service.id)}
                      className={`w-full py-3.5 px-3 flex items-center justify-between text-left transition-all group ${
                        isSelected
                          ? 'bg-[#FF6B00] text-white font-black shadow-sm'
                          : 'hover:bg-orange-50/60 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-mono font-bold ${
                            isSelected ? 'text-white' : 'text-gray-500 group-hover:text-black'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="text-sm font-bold tracking-tight">
                          {service.title}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected
                            ? 'text-white translate-x-1'
                            : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs font-mono text-gray-500 flex items-center justify-between">
              <span>SINGLE-SOURCE EPC TURNKEY CONTRACTOR</span>
              <span className="text-[#FF6B00]">ISO 9001</span>
            </div>
          </div>

          {/* Right Column: Live Technical Dossier Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 bg-white">
            <div className="space-y-6">
              {/* Image Preview with High-End Architectural Scrim */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-900 border border-gray-200">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Overhead Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-black/70 px-3 py-1 backdrop-blur-md">
                    {activeService.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FF6B00] flex items-center justify-center text-white">
                    <ActiveIcon className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              {/* Scope Narrative */}
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  {activeService.fullDesc}
                </p>
              </div>

              {/* Deliverables Checklist */}
              <div className="bg-gray-50 p-5 border border-gray-200">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-3">
                  PRIMARY CONTRACTUAL DELIVERABLES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-gray-800 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Tolerances */}
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2">
                  COMPLIANCE &amp; TOLERANCE BENCHMARKS
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeService.keySpecs.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-xs font-mono text-gray-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fast Quote CTA */}
            <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <span className="text-xs font-mono text-gray-500">
                Ready to review site plans or request a preliminary constructability study?
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onSelectServiceForQuote) {
                    onSelectServiceForQuote(activeService.title);
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all transform active:scale-95 shadow flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Request Scope For This Discipline</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
