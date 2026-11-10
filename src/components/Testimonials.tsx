import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Building2, CheckCircle } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/constructionData';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? TESTIMONIALS_DATA.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === TESTIMONIALS_DATA.length - 1 ? 0 : current + 1));
  };

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <section className="py-28 md:py-36 bg-[#FFFFFF] text-[#111111] overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6B00]">
              SECTION 08 // CLIENT DISPATCHES
            </span>
          </div>
          <span className="text-xs font-mono text-gray-400">
            THIRD-PARTY VERIFIED PROJECT REVIEWS
          </span>
        </div>

        {/* Editorial Quote Presentation */}
        <div className="bg-[#F9FAFB] border border-gray-200 p-8 sm:p-14 lg:p-20 relative shadow-sm">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Project citation tag */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-600 uppercase">
                <Building2 className="w-4 h-4 text-[#FF6B00]" />
                <span className="font-bold text-gray-900">{current.project}</span>
                <span>·</span>
                <span>HANDOVER {current.year}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>ON-TIME &amp; ON-BUDGET DELIVERY</span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 leading-tight uppercase tracking-tight">
              "{current.quote}"
            </blockquote>

            {/* Author Attribution & Slider Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-gray-200 pt-8">
              <div>
                <div className="text-lg font-black text-[#111111] uppercase tracking-tight">
                  {current.author}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-mono mt-0.5">
                  {current.role} — <span className="font-bold text-gray-900">{current.organization}</span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="w-12 h-12 border border-gray-300 hover:border-black bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="px-3 text-xs font-mono text-gray-500">
                  0{activeIndex + 1} / 0{TESTIMONIALS_DATA.length}
                </div>
                <button
                  type="button"
                  onClick={next}
                  className="w-12 h-12 border border-gray-300 hover:border-black bg-white hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
