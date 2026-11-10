import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/constructionData';
import { CheckCircle2, ChevronRight, Compass } from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-28 md:py-36 bg-[#F8F9FA] text-[#111111] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 border-b border-gray-300 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6B00]">
                SECTION 07 // PROJECT LIFECYCLE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              Engineered Execution <br />
              <span className="text-[#FF6B00]">From Datum To Handover</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed font-normal">
            A battle-tested 6-phase EPC methodology designed to eliminate milestone ambiguity, prevent cost overruns, and ensure millimetric structural accuracy.
          </p>
        </div>

        {/* Industrial Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-8 transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'border-[#FF6B00] bg-white shadow-xl ring-2 ring-[#FF6B00]/20'
                    : 'border-gray-200 bg-white hover:border-gray-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                    <span
                      className={`text-2xl font-black font-mono transition-colors ${
                        isSelected ? 'text-[#FF6B00]' : 'text-gray-400'
                      }`}
                    >
                      PHASE {step.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-600 bg-gray-100 px-2 py-0.5">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111111] uppercase tracking-tight mb-3 group-hover:text-[#FF6B00] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                    CONTRACT DELIVERABLE:
                  </span>
                  <div className="text-xs font-semibold text-gray-900 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                    <span>{step.keyAction}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Guarantee Strip in Bright Palette */}
        <div className="mt-12 p-6 sm:p-8 bg-orange-50 border-2 border-[#FF6B00] text-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase text-[#FF6B00] tracking-widest block">
              4D BIM &amp; CONTINUOUS SURVEY VERIFICATION
            </span>
            <p className="text-xs sm:text-sm text-gray-700 max-w-2xl leading-relaxed font-medium">
              Every phase is laser-surveyed against our master 4D Building Information Model to eliminate spatial collisions prior to structural fabrication.
            </p>
          </div>
          <div className="text-xs font-mono text-gray-600 font-bold shrink-0">
            FRAMEWORK: ISO 19650 BIM &amp; ASTM E1155
          </div>
        </div>
      </div>
    </section>
  );
}
