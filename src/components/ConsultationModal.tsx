import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConsultationFormData } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<ConsultationFormData>;
}

export default function ConsultationModal({ isOpen, onClose, initialData }: ConsultationModalProps) {
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

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Provide a valid corporate email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.projectLocation.trim()) newErrors.projectLocation = 'Site location is required';
    if (!formData.projectDetails.trim()) newErrors.projectDetails = 'Brief project scope is required';

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
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#111111', '#FFFFFF'],
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-300 p-6 sm:p-10 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-black hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#FF6B00]" />
          <span className="text-xs font-mono font-bold uppercase text-[#FF6B00] tracking-widest">
            ENGINEERING CONSULTATION // RFP
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mb-2">
          Schedule A Project Audit
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
          Direct engagement with our senior estimating directors to review structural feasibility, zoning entitlements, and capital schedules.
        </p>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-[#111111] uppercase tracking-tight">
              Inquiry Dispatched
            </h4>
            <p className="text-sm text-gray-600 font-mono">
              TENDER REF: <span className="font-bold text-[#FF6B00]">{referenceId}</span>
            </p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Our engineering team will conduct an initial site assessment and respond within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#111111] text-white text-xs font-mono font-bold uppercase tracking-wider"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Full Name"
                className={`w-full px-3.5 py-3 bg-gray-50 border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-red-500 mt-0.5">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className={`w-full px-3.5 py-3 bg-gray-50 border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                  Telephone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className={`w-full px-3.5 py-3 bg-gray-50 border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                  Discipline / Scope
                </label>
                <input
                  type="text"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-300 text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                  Estimated Budget
                </label>
                <input
                  type="text"
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-300 text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                Project Site Location *
              </label>
              <input
                type="text"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                placeholder="City, State / Region"
                className={`w-full px-3.5 py-3 bg-gray-50 border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none ${
                  errors.projectLocation ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.projectLocation && <p className="text-[11px] text-red-500 mt-0.5">{errors.projectLocation}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                Project Scope &amp; Engineering Requirements *
              </label>
              <textarea
                rows={3}
                value={formData.projectDetails}
                onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                placeholder="Details on floor area, site conditions, timeline..."
                className={`w-full px-3.5 py-3 bg-gray-50 border text-sm text-[#111111] focus:outline-none focus:ring-1 focus:ring-[#FF6B00] rounded-none ${
                  errors.projectDetails ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.projectDetails && <p className="text-[11px] text-red-500 mt-0.5">{errors.projectDetails}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#FF6B00] hover:bg-[#E05E00] text-black font-black font-mono text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Dispatching Scope...' : 'Schedule Engineering Consultation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
