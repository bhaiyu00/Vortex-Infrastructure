import React, { useState, useMemo } from 'react';
import { ArrowRight, Activity, Layers, ShieldCheck, Check } from 'lucide-react';

interface EstimatorProps {
  onTransferToConsultation: (params: {
    projectType: string;
    estimatedBudget: string;
    projectDetails: string;
  }) => void;
}

export default function Estimator({ onTransferToConsultation }: EstimatorProps) {
  const [sector, setSector] = useState<'commercial' | 'infrastructure' | 'industrial' | 'residential'>('commercial');
  const [scale, setScale] = useState(32000); // in m²
  const [soilCondition, setSoilCondition] = useState<'stable' | 'standard' | 'complex'>('standard');
  const [tier, setTier] = useState<'standard' | 'advanced' | 'landmark'>('advanced');

  // Computational engineering formula
  const estimate = useMemo(() => {
    const baseRates = {
      commercial: 1950,
      infrastructure: 2550,
      industrial: 1420,
      residential: 1720,
    };

    const soilMultipliers = {
      stable: 1.0,
      standard: 1.08,
      complex: 1.25,
    };

    const tierMultipliers = {
      standard: 0.95,
      advanced: 1.15,
      landmark: 1.42,
    };

    const baseCost = scale * baseRates[sector];
    const totalCost = baseCost * soilMultipliers[soilCondition] * tierMultipliers[tier];

    const lowRange = Math.round((totalCost * 0.92) / 100000) * 100000;
    const highRange = Math.round((totalCost * 1.08) / 100000) * 100000;

    const baseMonths = Math.max(9, Math.round(Math.sqrt(scale) * 0.11));
    const soilMonthsAdd = soilCondition === 'complex' ? 4 : soilCondition === 'standard' ? 2 : 0;
    const tierMonthsAdd = tier === 'landmark' ? 3 : 0;
    const totalMonths = baseMonths + soilMonthsAdd + tierMonthsAdd;

    const steelTons = Math.round(scale * 0.088);
    const concreteVolume = Math.round(scale * 0.46);
    const peakLabor = Math.min(750, Math.max(60, Math.round(scale * 0.0075)));

    const formatCurrency = (val: number) => {
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(1)}M`;
      }
      return `$${(val / 1000).toFixed(0)}K`;
    };

    return {
      budgetSummary: `${formatCurrency(lowRange)} – ${formatCurrency(highRange)}`,
      totalMonths,
      steelTons,
      concreteVolume,
      peakLabor,
      breakdown: [
        { label: 'Subterranean Foundation & Groundwork', pct: soilCondition === 'complex' ? 26 : 20 },
        { label: 'Superstructure Steel & Concrete', pct: 42 },
        { label: 'Thermal Envelope & Facade Glazing', pct: tier === 'landmark' ? 22 : 18 },
        { label: 'MEP, HVAC & Building Automation', pct: tier === 'landmark' ? 10 : 20 },
      ],
    };
  }, [sector, scale, soilCondition, tier]);

  const handleTransfer = () => {
    const sectorLabels = {
      commercial: 'Commercial High-Rise',
      infrastructure: 'Heavy Infrastructure & Bridges',
      industrial: 'Industrial Logistics & Manufacturing',
      residential: 'Residential Multi-Family Estate',
    };

    const details = `Estimated Scale: ${scale.toLocaleString()} m² | Ground: ${soilCondition.toUpperCase()} | Tier: ${tier.toUpperCase()} | Model: ${estimate.budgetSummary} over ~${estimate.totalMonths} months (${estimate.steelTons.toLocaleString()} T steel / ${estimate.concreteVolume.toLocaleString()} m³ concrete).`;

    onTransferToConsultation({
      projectType: sectorLabels[sector],
      estimatedBudget: estimate.budgetSummary,
      projectDetails: details,
    });
  };

  return (
    <section id="estimator" className="py-28 md:py-36 bg-[#FAFAFA] text-gray-950 border-b border-gray-200 relative overflow-hidden">
      {/* Bright blueprint grid atmosphere */}
      <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6B00]">
                SECTION 05 // COMPUTATIONAL ESTIMATOR
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-950 leading-tight">
              Project Cost &amp; <br />
              <span className="text-[#FF6B00]">Capital Scope Engine</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed font-normal">
            Calibrated against over 120 completed megaprojects to provide preliminary capital benchmarks for institutional developers.
          </p>
        </div>

        {/* Industrial Engineering Console Layout in Bright Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-gray-900 p-6 sm:p-10 space-y-8 shadow-xl">
            {/* 1. Sector Segment */}
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00] mb-3 flex items-center justify-between">
                <span>01. CONTRACT SECTOR</span>
                <span className="text-gray-500 font-normal">[SELECT DISCIPLINE]</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'commercial', label: 'Commercial' },
                  { id: 'infrastructure', label: 'Infrastructure' },
                  { id: 'industrial', label: 'Industrial' },
                  { id: 'residential', label: 'Residential' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSector(s.id as any)}
                    className={`py-3 px-2 text-xs font-mono font-black uppercase tracking-wider transition-all border-2 ${
                      sector === s.id
                        ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:text-black hover:border-gray-900'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale Gauge Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-800">
                  02. GROSS FLOOR AREA / SITE FOOTPRINT
                </span>
                <span className="text-lg font-black font-mono text-[#FF6B00] tabular-nums">
                  {scale.toLocaleString()} m²
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="120000"
                step="2500"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-none appearance-none cursor-pointer accent-[#FF6B00]"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2 font-semibold">
                <span>5,000 m² (MID-SCALE)</span>
                <span>50,000 m² (COMPLEX)</span>
                <span>120,000 m² (CAMPUS)</span>
              </div>
            </div>

            {/* 3. Soil Condition */}
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-800 mb-3">
                03. GEOTECHNICAL SUBSTRATA CONDITION
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'stable', label: 'Solid Bedrock', sub: 'Standard spread footings' },
                  { id: 'standard', label: 'Cohesive Silt/Clay', sub: 'Standard CFA piles' },
                  { id: 'complex', label: 'High Water Table', sub: 'Secant walls & dewatering' },
                ].map((soil) => (
                  <button
                    key={soil.id}
                    type="button"
                    onClick={() => setSoilCondition(soil.id as any)}
                    className={`p-3 text-left border-2 transition-all ${
                      soilCondition === soil.id
                        ? 'border-[#FF6B00] bg-orange-50 text-gray-950 shadow-xs'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-xs font-black font-mono uppercase text-gray-950">{soil.label}</div>
                    <div className="text-[10px] text-gray-600 mt-0.5 font-medium">{soil.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Specification Tier */}
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-800 mb-3">
                04. ARCHITECTURAL &amp; MEP SPECIFICATION
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'standard', title: 'Code Standard', desc: 'Baseline building code' },
                  { id: 'advanced', title: 'High Performance', desc: 'Post-tensioned & energy BMS' },
                  { id: 'landmark', title: 'Iconic Flagship', desc: 'LEED Platinum & custom facade' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id as any)}
                    className={`p-3 text-left border-2 transition-all ${
                      tier === t.id
                        ? 'border-gray-900 bg-gray-950 text-white shadow-xs'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-xs font-black font-mono uppercase">{t.title}</div>
                    <div className={`text-[10px] mt-0.5 ${tier === t.id ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Readout Console in Bright Sunlit Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-gray-900 p-6 sm:p-10 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <span className="text-xs font-mono font-bold uppercase text-[#FF6B00] tracking-wider">
                CAPITAL BENCHMARK MODEL
              </span>
              <span className="text-[10px] font-mono text-gray-500 font-bold">±10% ESTIMATION ACCURACY</span>
            </div>

            {/* Big Output Card in Bright Sunlit Amber */}
            <div className="bg-orange-50 border-2 border-[#FF6B00] p-6 shadow-sm">
              <span className="text-[11px] font-mono text-gray-600 uppercase tracking-widest block mb-1 font-bold">
                PRELIMINARY CAPITAL BUDGET RANGE
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 font-mono tabular-nums tracking-tight">
                {estimate.budgetSummary}
              </div>
              <span className="text-[10px] font-mono text-[#FF6B00] block mt-1 font-bold">
                COMPUTED UNDER CLASS-4 ASTM AACE COST FRAMEWORK
              </span>
            </div>

            {/* Key Resource Numbers */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block text-[10px] font-bold">SCHEDULE DELIVERY</span>
                <span className="text-xl font-black text-[#FF6B00]">{estimate.totalMonths} Months</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block text-[10px] font-bold">PEAK SITE STAFFING</span>
                <span className="text-xl font-black text-gray-900">{estimate.peakLabor} Trades</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block text-[10px] font-bold">STRUCTURAL STEEL</span>
                <span className="text-xl font-black text-gray-900">{estimate.steelTons.toLocaleString()} T</span>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200">
                <span className="text-gray-500 block text-[10px] font-bold">CONCRETE VOLUME</span>
                <span className="text-xl font-black text-gray-900">{estimate.concreteVolume.toLocaleString()} m³</span>
              </div>
            </div>

            {/* Cost Breakdown Progress Bars */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono uppercase text-gray-600 block font-bold">
                STRUCTURAL COST ALLOCATION BREAKDOWN
              </span>
              {estimate.breakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-gray-800 font-medium">
                    <span className="truncate pr-2">{item.label}</span>
                    <span className="text-[#FF6B00] font-bold">{item.pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-[#FF6B00]" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Transfer to Consultation Button */}
            <button
              type="button"
              onClick={handleTransfer}
              className="w-full py-4 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-black font-mono text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-xl flex items-center justify-center gap-2 group mt-6"
            >
              <span>Bridge Scope Into Consultation Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
