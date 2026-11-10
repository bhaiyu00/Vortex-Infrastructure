import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TruckScrollSection from './components/TruckScrollSection';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Statistics from './components/Statistics';
import WhyChooseUs from './components/WhyChooseUs';
import Estimator from './components/Estimator';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import JcbPreloader from './components/JcbPreloader';
import ConsultationModal from './components/ConsultationModal';
import { ConsultationFormData } from './types';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<Partial<ConsultationFormData>>({});

  const handleOpenConsultation = (initialData?: Partial<ConsultationFormData>) => {
    if (initialData) {
      setModalInitialData(initialData);
    }
    setIsConsultationModalOpen(true);
  };

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    handleOpenConsultation({
      projectType: serviceTitle,
      projectDetails: `Inquiry regarding specialized scope for: ${serviceTitle}.`,
    });
  };

  const handleTransferFromEstimator = (params: {
    projectType: string;
    estimatedBudget: string;
    projectDetails: string;
  }) => {
    handleOpenConsultation({
      projectType: params.projectType,
      estimatedBudget: params.estimatedBudget,
      projectDetails: params.projectDetails,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans antialiased selection:bg-[#FF6B00] selection:text-white">
      {/* Landing JCB Machine Loading Interface */}
      {showPreloader && <JcbPreloader onComplete={() => setShowPreloader(false)} />}

      {/* Sticky Navigation Header */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onReplayJcbIntro={() => setShowPreloader(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Full Viewport Hero Section */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onExploreProjects={handleExploreProjects}
          onReplayJcbIntro={() => setShowPreloader(true)}
        />

        {/* Pinned GSAP ScrollTrigger Heavy Dump Truck Journey */}
        <TruckScrollSection />

        {/* Editorial About Us Section */}
        <About />

        {/* Core Specialized Services */}
        <Services onSelectServiceForQuote={handleSelectServiceForQuote} />

        {/* Landmark Featured Projects Portfolio */}
        <Projects />

        {/* Bold Statistics Counters Section */}
        <Statistics />

        {/* Why Choose Us: 4 Engineering Pillars */}
        <WhyChooseUs />

        {/* Interactive Cost & Scope Estimator */}
        <Estimator onTransferToConsultation={handleTransferFromEstimator} />

        {/* 6-Stage Construction Execution Protocol */}
        <Process />

        {/* Enterprise Client Testimonials */}
        <Testimonials />

        {/* Direct Contact & Consultation Section */}
        <Contact initialData={modalInitialData} />
      </main>

      {/* Bright Architectural Studio Footer with Back-To-Top */}
      <Footer />

      {/* Interactive Consultation & RFP Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialData={modalInitialData}
      />
    </div>
  );
}
