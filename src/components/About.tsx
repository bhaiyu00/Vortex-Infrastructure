import React from 'react';
import { ShieldCheck, HardHat, Award, Compass, Check, ArrowRight } from 'lucide-react';

export default function About() {
  const engineeringDisciplines = [
    {
      code: 'SPEC-01',
      title: 'Geotechnical & Structural Integrity',
      desc: 'Finite element structural analysis, deep seismic damping calculations, and soil stability borehole modeling conducted directly by registered PE directors.',
    },
    {
      code: 'SPEC-02',
      title: 'Zero-Harm Operational Protocol',
      desc: 'Accredited with ISO 45001 and OSHA Voluntary Protection status. Over 5 million consecutive field work-hours without a lost-time incident across high-risk civil operations.',
    },
    {
      code: 'SPEC-03',
      title: 'Integrated EPC Turnkey Governance',
      desc: 'Single-source responsibility combining architectural engineering, supply chain pre-fabrication, and site logistics to prevent cost escalation and schedule creep.',
    },
  ];

  return (
    <section id="about" className="py-28 md:py-36 bg-[#FFFFFF] text-[#111111] overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Editorial Index Kicker */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6B00]">
              SECTION 02 // CORPORATE PROFILE
            </span>
          </div>
          <span className="text-xs font-mono text-gray-400">
            FOUNDED 2011 · NEW YORK &amp; INTERNATIONAL
          </span>
        </div>

        {/* Main Monograph Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Monograph Content (7 cols) */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-[0.96] mb-8">
              We Don't Just Build Structures. <br />
              <span className="text-[#FF6B00]">We Build Trust.</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium mb-6">
              Founded on the principle that enduring infrastructure demands uncompromising engineering rigor, VORTEX has grown into an international general contractor delivering complex civil, commercial, and heavy industrial landmarks.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-12">
              From subterranean transit tunnels beneath historic urban cores to post-tensioned commercial supertowers, our operations unify 4D BIM logistics with generational field craft. We measure our legacy in structural permanence, zero-lost-time safety records, and institutional trust.
            </p>

            {/* Engineering Technical Specifications List */}
            <div className="space-y-6 border-t border-gray-200 pt-8">
              {engineeringDisciplines.map((item) => (
                <div key={item.code} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start group">
                  <div className="sm:col-span-3 text-xs font-mono font-bold text-[#FF6B00]">
                    {item.code}
                  </div>
                  <div className="sm:col-span-9">
                    <h3 className="text-base font-bold text-[#111111] mb-1.5 group-hover:text-[#FF6B00] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications Row */}
            <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-gray-600">
              <div className="p-3 bg-gray-50 border border-gray-200">
                <div className="text-[10px] text-gray-400">QUALITY MANAGEMENT</div>
                <div className="font-bold text-gray-900 mt-1">ISO 9001:2015</div>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200">
                <div className="text-[10px] text-gray-400">OCCUPATIONAL SAFETY</div>
                <div className="font-bold text-gray-900 mt-1">ISO 45001:2018</div>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200">
                <div className="text-[10px] text-gray-400">ENVIRONMENTAL MGMT</div>
                <div className="font-bold text-gray-900 mt-1">ISO 14001:2015</div>
              </div>
            </div>
          </div>

          {/* Right Column: Overlapping Architectural Composition (5 cols) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Primary Background Image: Raw Architectural Concrete Facade */}
            <div className="relative border border-gray-300 shadow-2xl bg-gray-900 overflow-hidden">
              <img
                src="/src/assets/images/architectural_concrete_facade_1794216527615.jpg"
                alt="Architectural raw concrete and structural steel cantilever"
                className="w-full h-[480px] object-cover object-center filter contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 text-[10px] font-mono text-white tracking-widest">
                FIG. 2.1 — STRUCTURAL CANTILEVER
              </div>
            </div>

            {/* Overlapping Inset Card: Engineers On-Site in Bright White */}
            <div className="absolute -bottom-10 -left-6 sm:-left-10 w-64 sm:w-80 bg-white text-gray-950 p-3 border-2 border-gray-900 shadow-2xl z-20">
              <div className="relative h-44 overflow-hidden mb-3 border border-gray-200">
                <img
                  src="/src/assets/images/about_civil_engineering_1794215391120.jpg"
                  alt="Senior civil engineers reviewing blueprints"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-2 space-y-1">
                <div className="text-[10px] font-mono font-bold text-[#FF6B00] uppercase tracking-wider">
                  DIRECT PE SUPERVISION
                </div>
                <p className="text-xs text-gray-700 leading-snug font-medium">
                  Licensed professional engineers present on-site across all continuous pour operations.
                </p>
              </div>
            </div>

            {/* Subtle Blueprint Pattern Accent in Corner */}
            <div className="absolute -top-6 -right-6 w-36 h-36 blueprint-grid opacity-60 -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
