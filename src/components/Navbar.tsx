import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: (initialData?: Record<string, string>) => void;
  onReplayJcbIntro?: () => void;
}

export default function Navbar({ onOpenConsultation, onReplayJcbIntro }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'journey', 'about', 'services', 'projects', 'estimator', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 240) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'JCB Machines 🚜', href: '#hero' },
    { name: 'Truck Journey 🚚', href: '#journey', highlight: true },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Estimator', href: '#estimator' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-md'
            : 'bg-white/90 backdrop-blur-sm border-b border-gray-100 py-4 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Wordmark with Bright Orange Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2.5 text-gray-950 group whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 bg-[#FF6B00] border border-[#FF6B00] flex items-center justify-center text-white font-black font-mono text-sm shadow-sm group-hover:bg-[#E05E00] transition-colors">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg md:text-xl tracking-tight text-gray-950 leading-none">
                VORTEX
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#FF6B00] uppercase font-bold">
                INFRASTRUCTURE
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 Clean Single-Line Navigation Links with Bright Orange Underline */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`transition-colors py-1 whitespace-nowrap shrink-0 relative flex items-center gap-1.5 ${
                    link.highlight
                      ? 'text-[#FF6B00] font-black'
                      : isActive
                      ? 'text-[#FF6B00]'
                      : 'text-gray-600 hover:text-gray-950'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.highlight && (
                    <span className="text-[9px] bg-amber-100 text-[#FF6B00] border border-[#FF6B00]/40 px-1 py-0.5 font-mono font-black">
                      LIVE
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#FF6B00] animate-in fade-in duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {onReplayJcbIntro && (
              <button
                type="button"
                onClick={onReplayJcbIntro}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-bold uppercase tracking-wider text-gray-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-all cursor-pointer shadow-xs"
                title="Replay JCB machine loading screen"
              >
                <span>JCB Intro 🚜</span>
              </button>
            )}

            <button
              onClick={() => onOpenConsultation()}
              className="px-5 py-2.5 text-xs font-mono font-black uppercase tracking-widest text-white bg-[#FF6B00] hover:bg-[#E05E00] transition-all transform active:scale-95 shadow-md flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Bright Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 shadow-2xl">
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-mono uppercase text-[#FF6B00] tracking-widest font-bold">
                ARCHITECTURAL DIRECTORY
              </span>
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-2xl font-black uppercase tracking-tight text-gray-950 hover:text-[#FF6B00] transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-3 text-xs font-mono text-gray-700">
              <Phone className="w-4 h-4 text-[#FF6B00]" />
              <span className="font-bold">+1 (800) 584-9000</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-700">
              <Mail className="w-4 h-4 text-[#FF6B00]" />
              <span>inquiries@vortex-infrastructure.com</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-4 bg-[#FF6B00] text-white font-black uppercase tracking-widest text-xs font-mono shadow-lg text-center"
            >
              Schedule Engineering Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
}
