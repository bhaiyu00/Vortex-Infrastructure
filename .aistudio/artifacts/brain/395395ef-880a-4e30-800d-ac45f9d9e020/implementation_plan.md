# VORTEX Infrastructure & Civil Engineering — Implementation Plan

A cinematic, editorial-grade web platform for VORTEX Infrastructure & Civil Engineering, featuring a scroll-driven heavy dump truck construction journey across four engineering phases, an interactive project cost & timeline calculator, an architectural project showcase, and consultation inquiry workflows.

## User Review & Critical Decisions

> [!IMPORTANT]
> The architectural direction and brand identities have been aligned based on initial clarifications. The key confirmed parameters and design standards are summarized below.

- **Brand Identity**: VORTEX Infrastructure & Civil Engineering.
- **Color System**: Monochromatic industrial foundation (Pure White `#FFFFFF`, Deep Black `#111111`, Charcoal `#242424`, Concrete Light Grey `#F2F2F2`) ignited by High-Visibility Construction Orange (`#FF6B00`) for CTAs, active progress nodes, metric counters, and mechanical highlights.
- **Central Experience**: Pinned GSAP ScrollTrigger cinematic timeline where an articulated heavy dump truck travels left-to-right through 4 real-world construction phases (Planning CAD & Geotech -> Earthworks Excavation -> Structural Steel & Crane Erection -> Completed Architectural Landmark) with wheel rotation sync, particulate dust, and suspension dynamics.
- **Client Interactive Suite**: Interactive Project Cost & Scope Estimator, Live Timeline Milestone Tracker, and Full Consultation Booking Modal with validated inputs.

---

## 1. Overview & Core Concept

- **What It Does**: Delivers an immersive brand experience for an international tier-1 civil engineering and construction contractor. Visitors navigate through real project capabilities, interactive estimate modeling, structural portfolio case studies, and a scroll-synchronized vehicular journey that dramatizes the lifecycle of complex construction projects.
- **Target Audience / Persona**: Commercial real estate developers, municipal infrastructure authorities, industrial logistics operators, institutional partners, and corporate project owners looking for engineering precision, safety, and turnkey delivery.
- **Key Value**: Bridges the raw power of heavy civil engineering with high-end architectural polish, inspiring institutional trust and converting commercial inquiries with immediate self-service estimation tools.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **The Grand Entry (Hero)**: Full-viewport impact with masked editorial typography ("WE BUILD THE FOUNDATION OF TOMORROW"), live project KPI ticker, background atmospheric civil scene, and immediate dual actions: *Explore Our Projects* (smooth scroll to portfolio) or *Get a Free Consultation* (opens inquiry modal).
2. **The Cinematic Construction Journey (Pinned Scroll Section)**: Pinned 400vh scroll container powered by GSAP ScrollTrigger. As the user scrolls vertically, the camera tracks a photorealistic heavy dump truck traveling horizontally along an evolving job site:
   - **Phase 1: Planning & Surveying**: Blueprint vector grid, topographic contours, soil boreholes.
   - **Phase 2: Groundwork & Excavation**: Earthworks trenching, foundation piles, excavator silhouette, active dust plumes behind rotating wheels.
   - **Phase 3: Structural Assembly**: Lattice tower cranes, heavy rebar cages, structural I-beams, concrete pumping.
   - **Phase 4: Landmark Handover**: Transition into a pristine architectural glass-and-steel facade with finished roadway and landscaping.
3. **Core Capabilities & Services Bento**: 8 architectural disciplines (Residential, Commercial, Industrial, Infrastructure, Civil Engineering, Renovation, Project Management, Architectural Planning) rendered in an asymmetric editorial grid with photographic zoom and parameter reveals.
4. **Interactive Cost & Timeline Estimator**: Real-time project calculator where prospective clients select sector (Commercial, Infrastructure, Industrial, Residential), floor area / span scale, soil complexity, and finish grade to compute realistic budgetary ranges, phase milestones, and staffing allocations.
5. **Architectural Portfolio**: Category-filtered showcase (Commercial, Infrastructure, Industrial, Residential) with modal view detailing structural specs, concrete volume, steel tonnage, and client impact metrics.
6. **Execution Timeline & Trust Pillars**: 6-stage delivery methodology (Consultation to Handover) with active scroll progress line, accompanied by the "Difference is in the Details" 4-pillar safety and engineering matrix.
7. **Consultation & Lead Capture**: Multi-step inquiry form with field validation (budget brackets, site location, blueprint upload simulation), office location briefing, and direct WhatsApp connect.

### Visual Identity & Theme Tokens

- **Palette**:
  - Neutral Canvas: `--bg-primary: #FFFFFF`, `--bg-secondary: #F8F9FA`, `--bg-dark: #111111`, `--bg-charcoal: #1E1E1E`
  - High-Impact Accent: `--accent-orange: #FF6B00`, `--accent-orange-hover: #E05E00`, `--accent-orange-subtle: #FFF4EC`
  - Structural Borders: `--border-subtle: #E5E7EB`, `--border-dark: #2A2A2A`
  - Text Hierarchy: Primary `#111111`, Secondary `#4B5563`, Muted `#9CA3AF`, Inverse `#FFFFFF`
- **Typography**:
  - Headings: Bold modern geometric display (`Archivo` / `Plus Jakarta Sans`, 700/800 weight, tight tracking `-0.03em`, balanced line wrapping).
  - Body: Precision sans (`Inter` / `Manrope`, 400/500 weight, 1.6 line height).
  - Telemetry & Metrics: Monospace tabular numerals (`font-mono tabular-nums`).
- **Motion Principles**:
  - GSAP ScrollTrigger scrubbed timelines for pinned vehicle motion and progress gauges.
  - Sub-200ms cubic-bezier transitions for buttons, card reveals, and tab selectors.
  - Full `prefers-reduced-motion` compliance providing a clean static step-by-step layout for accessibility.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Realistic Multi-Layer Vector & High-Res Sprite Truck vs 3D Canvas**
  - *Chosen Approach*: Engineered high-fidelity transparent heavy dump truck composite with independent high-res chassis, multi-layer rotating wheels with rim parallax, suspension damper micro-bounce, ground shadow, and canvas dust particle emitter.
  - *Why*: Delivers guaranteed 60fps buttery scrolling without WebGL shader compilation lag or heavy 30MB 3D asset downloads, ensuring instant loading and perfect mobile compatibility across all screen sizes.
  - *Alternatives Considered*: Three.js 3D model (higher memory overhead, battery drain on mobile, potential canvas context loss).
- **Decision 2: GSAP ScrollTrigger Scrub Pinning with Lenis Smooth Scrolling**
  - *Chosen Approach*: GSAP 3 with native ScrollTrigger scrub pinning, synchronized with smooth touch/wheel damping.
  - *Why*: Guarantees rock-solid scrub synchronization where 1px of user scroll directly maps to exact truck position, stage backdrop transitions, and progress telemetry.
- **Decision 3: Interactive Cost Estimator Tool**
  - *Chosen Approach*: Client-side dynamic computational model simulating realistic civil construction cost modeling (cost per sq meter/sq foot, foundation multipliers, MEP overhead, timeline estimation).
  - *Why*: Gives commercial developers immediate value on-site and pre-populates the consultation modal with real project parameters.

---

## 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│  - Navigation State & Theme                                            │
│  - Consultation Modal Controller & Estimator Bridge                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌──────────────────┐    ┌─────────────────────────┐    ┌──────────────────┐
│    Navbar.tsx    │    │  TruckScrollSection.tsx │    │    Hero.tsx      │
│ - 3-Zone Header  │    │  - GSAP ScrollTrigger   │    │ - Masked Heading │
│ - Mobile Drawer  │    │  - 4-Stage Storyboard   │    │ - Key Statistics │
│ - Action Button  │    │  - Wheel/Dust Mechanics │    │ - Dual CTAs      │
└──────────────────┘    └───────────┬─────────────┘    └──────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌──────────────────┐    ┌─────────────────────────┐    ┌──────────────────┐
│   Services.tsx   │    │      Projects.tsx       │    │    About.tsx     │
│ - 8 Disciplines  │    │ - Category Filter       │    │ - Split Layout   │
│ - Editorial Grid │    │ - Project Specs Modal   │    │ - Certifications │
└──────────────────┘    └─────────────────────────┘    └──────────────────┘
    │                               │                               │
    └───────────────────────────────┼───────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌──────────────────┐    ┌─────────────────────────┐    ┌──────────────────┐
│  Estimator.tsx   │    │     Statistics.tsx      │    │  WhyChooseUs.tsx │
│ - Budget Compute │    │ - Charcoal Backdrop     │    │ - 4 Quality Core │
│ - Phase Milestones│   │ - Viewport Counters     │    │ - Safety Index   │
└──────────────────┘    └─────────────────────────┘    └──────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌──────────────────┐    ┌─────────────────────────┐    ┌──────────────────┐
│   Process.tsx    │    │    Testimonials.tsx     │    │   Contact.tsx    │
│ - 6-Stage River  │    │ - B2B Case Quotes       │    │ - Validated Form │
│ - Scroll Tracker │    │ - Enterprise Clients    │    │ - Map / WhatsApp │
└──────────────────┘    └─────────────────────────┘    └──────────────────┘
                                    │
                                    ▼
                        ┌─────────────────────────┐
                        │       Footer.tsx        │
                        │ - Brand Wordmark        │
                        │ - Back-To-Top Button    │
                        └─────────────────────────┘
```

---

## 5. Implementation Phases & Verification Milestones

1. **Phase 1: Dependencies & Asset Orchestration**
   - Install GSAP and `@types/gsap`.
   - Batch-generate authentic photorealistic construction photography (Hero mega-project, Excavation site, Structural steel erection, Finished glass skyscraper) using `generate_image`.
2. **Phase 2: Global Styling & Core Typography**
   - Configure Tailwind v4 tokens, industrial palette, and tabular typography.
   - Update `index.html` and `metadata.json` with VORTEX branding, SEO, and viewport settings.
3. **Phase 3: The Truck Scroll Journey Component**
   - Build `TruckScrollSection.tsx` using GSAP ScrollTrigger with horizontal truck translation, wheel rotation calculations, road surface parallax, stage indicators, and reactive dust particles.
4. **Phase 4: Editorial Content & Interactive Sections**
   - Build Hero, About, Services, Projects with filterable drawers, and Statistics counters.
   - Build the 6-stage Process Timeline and Why Choose Us pillars.
5. **Phase 5: Estimator & Lead Capture Modals**
   - Implement the Interactive Cost & Scope Estimator with instant itemized breakdown and "Transfer to Consultation" bridge.
   - Build the Consultation modal with strict email/phone validation and success feedback.
6. **Phase 6: Responsive Audit, Reduced-Motion & Build Verification**
   - Co-execute `compile_applet` and `lint_applet`.
   - Verify layout integrity at 1440px desktop, 1024px tablet, and 375px mobile.
