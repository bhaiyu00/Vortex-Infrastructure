import React from 'react';
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Truck Journey', href: '#journey' },
    { name: 'Core Services', href: '#services' },
    { name: 'Featured Projects', href: '#projects' },
    { name: 'Cost Estimator', href: '#estimator' },
    { name: 'Process Protocol', href: '#process' },
    { name: 'Contact & RFP', href: '#contact' },
  ];

  const serviceLinks = [
    'Commercial High-Rise',
    'Infrastructure & Viaducts',
    'Industrial Gigafactories',
    'Deep Civil Earthworks',
    'Residential Communities',
    'Seismic Structural Retrofit',
    'BIM 4D Project Management',
    'Parametric Architectural Planning',
  ];

  return (
    <footer className="bg-[#F8FAFC] text-gray-950 border-t-2 border-gray-900 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-gray-200">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF6B00] border border-[#FF6B00] flex items-center justify-center text-white font-black font-mono text-sm shadow-xs">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-gray-950 leading-none">
                  VORTEX
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[#FF6B00] uppercase font-bold">
                  INFRASTRUCTURE &amp; CIVIL
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm font-normal">
              Engineering reliable structures, developing modern infrastructure, and transforming ambitious ideas into lasting landmarks across global urban centers.
            </p>

            <div className="text-xs font-mono text-gray-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                <span>LICENSED TIER-1 GENERAL CONTRACTOR</span>
              </div>
              <div className="text-gray-500 font-semibold">
                GENERAL CONTRACTOR LICENSE #VTX-84920-NYC
              </div>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-[#FF6B00] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Portfolio (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00]">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 font-mono font-medium">
              {serviceLinks.map((srv) => (
                <li key={srv} className="hover:text-[#FF6B00] transition-colors">
                  {srv}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF6B00]">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs text-gray-700 font-mono">
              <p className="leading-relaxed">
                450 Lexington Avenue, Suite 3200<br />
                New York, NY 10017
              </p>
              <p>
                <span className="text-gray-500 block">DIRECT:</span>
                <span className="text-gray-950 font-bold">+1 (800) 584-9000</span>
              </p>
              <p>
                <span className="text-gray-500 block">EMAIL:</span>
                <span className="text-gray-950 font-bold break-all">inquiries@vortex-infrastructure.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top in Bright Safety Orange */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} VORTEX Infrastructure &amp; Civil Engineering LLC. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-mono font-bold uppercase text-xs shadow-md transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
}
