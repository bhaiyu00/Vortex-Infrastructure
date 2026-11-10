export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  keySpecs: string[];
  deliverables: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure';
  location: string;
  year: string;
  value: string;
  scale: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  keyAction: string;
  duration: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  project: string;
  year: string;
}

export interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  projectLocation: string;
  estimatedBudget: string;
  projectDetails: string;
}
