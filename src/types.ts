export type AppID =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'github'
  | 'resume'
  | 'contact'
  | 'terminal'
  | 'settings';

export interface AppMetadata {
  id: AppID;
  title: string;
  shortTitle?: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind bg or border color token
  description: string;
  isPinned?: boolean;
  category?: 'core' | 'engineering' | 'system';
}

export interface WindowState {
  id: string; // Unique window instance ID
  appId: AppID;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  params?: any; // e.g. project ID if opened directly
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: 'AI / Machine Learning' | 'Full Stack Projects';
  githubUrl: string;
  liveDemoUrl?: string;
  overview: string;
  features: string[];
  architecture?: string;
  techStack: string[];
  challenges?: string;
  learnings?: string;
  stars?: number;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  date?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  experienceYears?: string;
  description?: string;
  tags?: string[];
  isTopSkill?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: 'Internship' | 'Full-time' | 'Project / Academic';
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  impactMetrics?: { label: string; value: string }[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  description: string;
  coursework: string[];
  achievements: string[];
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: 'info' | 'success' | 'alert' | 'system';
  actionAppId?: AppID;
}

export type ThemeMode = 'linear-dark' | 'vercel-light' | 'dracula' | 'monochrome' | 'neo-brutal';
export type AccentColor = 'emerald' | 'violet' | 'cyan' | 'amber' | 'rose' | 'indigo' | 'tomato' | 'mustard' | 'grape';

export interface WallpaperOption {
  id: string;
  name: string;
  type: 'mesh' | 'waves' | 'particles' | 'dark-gradient' | 'minimal-light';
  previewBg: string;
  bgClass: string;
}
