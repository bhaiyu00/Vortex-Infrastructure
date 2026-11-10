import React, { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  index: string;
}

function StatCounter({ end, suffix = '', prefix = '', label, sublabel, index }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2000;
          const steps = 40;
          const stepTime = duration / steps;
          const stepValue = end / steps;

          let current = 0;
          const timer = setInterval(() => {
            current += stepValue;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={elementRef} className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-200 last:border-r-0 space-y-4 relative group bg-white hover:bg-orange-50/40 transition-colors">
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
        <span className="text-[#FF6B00] font-bold">{index}</span>
        <span className="font-semibold text-gray-600">VERIFIED RECORD</span>
      </div>

      <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-950 font-mono tabular-nums tracking-tight">
        {prefix}
        {count}
        <span className="text-[#FF6B00]">{suffix}</span>
      </div>

      <div>
        <div className="text-sm font-bold uppercase tracking-wider text-gray-950">
          {label}
        </div>
        <div className="text-xs text-gray-600 mt-1 font-mono font-medium">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="bg-[#FFFFFF] text-gray-950 border-b border-gray-200 relative overflow-hidden py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-2 border-gray-900 bg-white shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCounter
              index="METRIC 01"
              end={15}
              suffix="+"
              label="Years Experience"
              sublabel="Continuous Tier-1 operations"
            />
            <StatCounter
              index="METRIC 02"
              end={120}
              suffix="+"
              label="Megaprojects Completed"
              sublabel="High-density urban & civil contracts"
            />
            <StatCounter
              index="METRIC 03"
              end={80}
              suffix="+"
              label="Institutional Clients"
              sublabel="Municipalities & global REIT developers"
            />
            <StatCounter
              index="METRIC 04"
              end={50}
              suffix="+"
              label="Licensed Engineers"
              sublabel="Structural, geotechnical & MEP staff"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
