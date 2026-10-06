export type ViewMode = 'single' | 'deck' | 'scroll' | 'interactive';

export interface ProjectOption {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  architecturalModel: string;
  keyPoints: {
    title: string;
    description: string;
    metric?: string;
  }[];
  workflows: {
    step: number;
    title: string;
    tool: string;
    frictionOrBenefit: string;
    status: 'friction' | 'optimized';
  }[];
}

export interface SlideItem {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  contentVariant: 'overview' | 'fragmented_deepdive' | 'gemini_deepdive' | 'simulation_compare' | 'architecture_matrix' | 'strategic_verdict';
  keyTakeaway: string;
  presenterNotes?: string;
}

export interface ProjectData {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  status: 'Ready' | 'Draft' | 'Concept';
  options: {
    legacy: ProjectOption;
    unified: ProjectOption;
  };
  slides: SlideItem[];
  metrics: {
    label: string;
    legacyValue: string;
    legacyUnit: string;
    geminiValue: string;
    geminiUnit: string;
    improvement: string;
  }[];
}
