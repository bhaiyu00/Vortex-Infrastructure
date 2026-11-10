import React, { useState } from 'react';
import { ArrowUpRight, X, MapPin, Calendar, Layers, ShieldCheck, Check, Building2 } from 'lucide-react';
import { PROJECTS_DATA } from '../data/constructionData';
import { ProjectItem } from '../types';

export default function Projects() {
  const [filter, setFilter] = useState<'All' | 'Commercial' | 'Infrastructure' | 'Industrial' | 'Residential'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  const categories: Array<'All' | 'Commercial' | 'Infrastructure' | 'Industrial' | 'Residential'> = [
    'All',
    'Commercial',
    'Infrastructure',
    'Industrial',
    'Residential',
  ];

  const flagshipProject = filteredProjects[0];
  const secondaryProjects = filteredProjects.slice(1);

  return (
    <section id="projects" className="py-28 md:py-36 bg-[#FFFFFF] text-[#111111] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-gray-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 bg-[#FF6B00]" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#FF6B00]">
                SECTION 04 // CASEBOOK ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-tight">
              Selected Landmark <br />
              <span className="text-[#FF6B00]">Civil &amp; Structural Works</span>
            </h2>
          </div>

          {/* Precision Industrial Filter Segmented Controls (No Pill Boxes) */}
          <div className="flex flex-wrap items-center gap-1 border border-gray-300 p-1 bg-gray-50">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                  filter === cat
                    ? 'bg-[#FF6B00] text-white shadow-sm font-black'
                    : 'text-gray-700 hover:text-black hover:bg-orange-50'
                }`}
              >
                {cat === 'All' ? 'All Disciplines' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Curated Casebook Layout */}
        <div className="space-y-12">
          {/* 1. Flagship Marquee Project (Spanning Full Width) */}
          {flagshipProject && (
            <div
              onClick={() => setSelectedProject(flagshipProject)}
              className="group cursor-pointer border border-gray-300 bg-white shadow-xl hover:border-[#FF6B00] transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Visual Area (7 cols) */}
                <div className="lg:col-span-7 relative h-80 sm:h-96 lg:h-[500px] overflow-hidden bg-gray-900">
                  <img
                    src={flagshipProject.image}
                    alt={flagshipProject.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#FF6B00] text-black text-xs font-mono font-black uppercase tracking-widest">
                      FLAGSHIP CASE STUDY
                    </span>
                    <span className="px-3 py-1 bg-black/80 text-white text-xs font-mono">
                      {flagshipProject.category}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white lg:hidden">
                    <h3 className="text-2xl font-black text-white">{flagshipProject.name}</h3>
                  </div>
                </div>

                {/* Editorial Data Sheet (5 cols) */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>{flagshipProject.location}</span>
                      <span>·</span>
                      <span>COMPLETED {flagshipProject.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mb-4 group-hover:text-[#FF6B00] transition-colors">
                      {flagshipProject.name}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                      {flagshipProject.description}
                    </p>

                    {/* Structural Benchmark Metrics */}
                    <div className="space-y-3 py-4 border-t border-b border-gray-100">
                      {flagshipProject.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-gray-800">
                          <Check className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">CAPITAL INVESTMENT</span>
                      <span className="text-xl font-black font-mono text-[#FF6B00]">{flagshipProject.value}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111] group-hover:text-[#FF6B00] transition-colors">
                      <span>INSPECT CASEBOOK</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Secondary Curated Projects (Asymmetrical 2-Column Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secondaryProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-white border border-gray-300 hover:border-[#FF6B00] transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-900">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white bg-black/70 px-2.5 py-1">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#FF6B00] bg-black/70 px-2.5 py-1">
                      {project.value}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[11px] font-mono text-gray-300 mb-1">
                      {project.location} · {project.year}
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#FF6B00] transition-colors leading-snug">
                      {project.name}
                    </h4>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-gray-500 uppercase mb-2">
                      SCALE: {project.scale}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-bold text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                    <span>EXPLORE SPECIFICATIONS</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-300 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header Image */}
            <div className="relative h-72 sm:h-80 w-full bg-gray-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-2.5 py-1 bg-[#FF6B00] text-black text-xs font-mono font-bold uppercase tracking-wider inline-block mb-2">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                  {selectedProject.name}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-gray-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                    {selectedProject.location}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                    Completed {selectedProject.year}
                  </span>
                  <span>·</span>
                  <span className="text-[#FF6B00] font-bold">Capital: {selectedProject.value}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Project Scope &amp; Engineering Narrative
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technical Milestones */}
              <div className="bg-gray-50 border border-gray-200 p-5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-600 mb-3">
                  Engineering Benchmarks &amp; Milestones
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-gray-800">
                      <Check className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-gray-200 pt-4">
                <div>
                  <span className="text-gray-400 block uppercase">TOTAL SCALE</span>
                  <span className="text-sm font-bold text-gray-900">{selectedProject.scale}</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase">PRIMARY CONTRACT</span>
                  <span className="text-sm font-bold text-gray-900">EPC Turnkey Contractor</span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm"
                >
                  Close Casebook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
