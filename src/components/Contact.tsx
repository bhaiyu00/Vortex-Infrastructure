import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConsultationFormData } from '../types';

interface ContactProps {
  initialData?: Partial<ConsultationFormData>;
  onSuccess?: () => void;
}

export default function Contact({ initialData }: ContactProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    projectType: initialData?.projectType || 'Commercial Construction',
    projectLocation: initialData?.projectLocation || '',
    estimatedBudget: initialData?.estimatedBudget || '$10M – $25M',
    projectDetails: initialData?.projectDetails || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Principal contact name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Provide a valid corporate email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required for engineer verification';
    if (!formData.projectLocation.trim()) newErrors.projectLocation = 'Project site location is required';
    if (!formData.projectDetails.trim()) newErrors.projectDetails = 'Project scope or RFP overview is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `VTX-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FF6B00', '#111111', '#FFFFFF'],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#FFFFFF] text-[#111111] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6B00]">
                SECTION 09 // CONSULTATION &amp; RFP
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              Have A Project In Mind? <br />
              <span className="text-[#FF6B00]">Let's Build It.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed font-normal">
            Direct coordination with our senior estimating directors. Schedule a site constructability audit or submit your tender specifications.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Architectural Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#F9FAFB] p-8 sm:p-12 border border-gray-300 shadow-sm">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight">
                  Consultation Inquiry Dispatched
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Your project parameters have been routed to our chief civil estimating director. An initial site constructability assessment will follow within 24 business hours.
                </p>
                <div className="p-4 bg-white border border-gray-300 max-w-xs mx-auto text-xs font-mono">
                  <span className="text-gray-400 block mb-0.5">TENDER REFERENCE ID</span>
                  <span className="text-lg font-black text-[#FF6B00]">{referenceId}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      projectType: 'Commercial Construction',
                      projectLocation: '',
                      estimatedBudget: '$10M – $25M',
                      projectDetails: '',
                    });
                  }}
                  className="mt-6 px-6 py-3 bg-[#111111] text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-black"
                >
                  Submit Additional Scope
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Richard Hawthorne"
                      className={`w-full px-4 py-3.5 bg-white border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] transition-all rounded-none ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Corporate Email */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. hawthorne@reitcorp.com"
                      className={`w-full px-4 py-3.5 bg-white border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] transition-all rounded-none ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Direct Telephone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 (555) 349-8200"
                      className={`w-full px-4 py-3.5 bg-white border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] transition-all rounded-none ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Site Location */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Project Site Location *
                    </label>
                    <input
                      type="text"
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      placeholder="e.g. Chicago Metro Area, IL"
                      className={`w-full px-4 py-3.5 bg-white border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] transition-all rounded-none ${
                        errors.projectLocation ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.projectLocation && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" /> {errors.projectLocation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Engineering Discipline
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none"
                    >
                      <option>Commercial Construction</option>
                      <option>Infrastructure Development</option>
                      <option>Industrial Construction</option>
                      <option>Civil Engineering &amp; Earthworks</option>
                      <option>Residential Construction</option>
                      <option>Renovation &amp; Remodeling</option>
                      <option>Project Management &amp; EPC</option>
                      <option>Architectural Planning</option>
                    </select>
                  </div>

                  {/* Estimated Budget */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none"
                    >
                      <option>$2M – $5M</option>
                      <option>$5M – $10M</option>
                      <option>$10M – $25M</option>
                      <option>$25M – $50M</option>
                      <option>$50M – $100M+</option>
                    </select>
                  </div>
                </div>

                {/* Scope Details */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Project Scope &amp; Engineering Requirements *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Describe target site scale, required completion dates, geotechnical conditions, or tender requirements..."
                    className={`w-full px-4 py-3.5 bg-white border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] transition-all rounded-none ${
                      errors.projectDetails ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.projectDetails && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3" /> {errors.projectDetails}
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FF6B00] hover:bg-[#E05E00] text-black font-black font-mono text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Routing Scope Specification...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry &amp; Request Constructability Study</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Office Credentials & Interactive Map Card (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white text-gray-950 p-8 sm:p-10 border-2 border-gray-900 space-y-6 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-tight text-gray-950 border-b border-gray-200 pb-4">
                Executive Civil Division
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase font-bold">DIRECT CONTRACTOR HOTLINE</div>
                    <a href="tel:+18005849000" className="text-base font-bold font-mono hover:text-[#FF6B00] transition-colors text-gray-950">
                      +1 (800) 584-9000
                    </a>
                    <p className="text-xs text-gray-500 font-mono">EST: 07:00 – 19:00 Mon–Fri</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase font-bold">OFFICIAL TENDER DISPATCH</div>
                    <a
                      href="mailto:inquiries@vortex-infrastructure.com"
                      className="text-base font-bold font-mono hover:text-[#FF6B00] transition-colors break-all text-gray-950"
                    >
                      inquiries@vortex-infrastructure.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B00] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase font-bold">HEADQUARTERS LOCATION</div>
                    <p className="text-sm font-medium text-gray-800">
                      450 Lexington Avenue, Suite 3200<br />
                      New York, NY 10017, USA
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Connect */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="https://wa.me/18005849000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Direct Site Manager Dispatch (WhatsApp)</span>
                </a>
              </div>
            </div>

            {/* Architectural Location Map Card */}
            <div className="bg-white border border-gray-300 shadow">
              <div className="p-3 bg-gray-50 border-b border-gray-300 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-gray-800 uppercase">HQ SURVEY LOCATOR</span>
                <span className="text-gray-400">40.7527° N, 73.9755° W</span>
              </div>
              <div className="relative h-60 bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 blueprint-grid opacity-75" />
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-gray-300 transform -rotate-6" />
                <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-gray-300 transform rotate-12" />
                <div className="absolute top-0 bottom-0 right-1/4 w-4 bg-gray-300" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#FF6B00] border-2 border-black flex items-center justify-center text-white shadow-xl animate-bounce">
                    <MapPin className="w-6 h-6 fill-white text-[#FF6B00]" />
                  </div>
                  <div className="mt-1 px-2 py-0.5 bg-black text-white text-[10px] font-mono font-bold uppercase">
                    VORTEX HQ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
