export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack & Web" | "ML & Data Systems" | "Hackathon & Innovation";
  period: string;
  description: string;
  longDescription: string;
  highlights: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  imageAlt: string;
  badge?: string;
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  type: string;
  description: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: Array<{
    name: string;
    level: string;
    percentage: number;
    tag?: string;
  }>;
}

export interface EducationItem {
  institution: string;
  degree: string;
  focus?: string;
  period: string;
  location?: string;
  details: string[];
  badges: string[];
}

export interface AchievementItem {
  title: string;
  description: string;
  metric: string;
  iconName: string;
  tag: string;
}

export interface StoredContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  service?: string;
  createdAt: string;
  read: boolean;
}

export interface PortfolioStats {
  resumeDownloads: number;
  contactSubmissions: number;
  chatbotQueries: number;
  projectViews: number;
}
