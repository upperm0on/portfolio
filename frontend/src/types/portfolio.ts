// Portfolio-related type definitions
// Comprehensive type system for portfolio data structure

// ============================================================================
// Enums
// ============================================================================

export const SocialPlatform = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  YOUTUBE: 'youtube',
  BEHANCE: 'behance',
  DRIBBBLE: 'dribbble',
  MEDIUM: 'medium',
  DEVTO: 'devto',
  CODEPEN: 'codepen',
  STACKOVERFLOW: 'stackoverflow',
  DISCORD: 'discord',
  TELEGRAM: 'telegram',
  EMAIL: 'email',
  WEBSITE: 'website',
  OTHER: 'other',
} as const;

export type SocialPlatform = typeof SocialPlatform[keyof typeof SocialPlatform];

export const ProjectCategory = {
  WEB: 'web',
  MOBILE: 'mobile',
  DESIGN: 'design',
  DESKTOP: 'desktop',
  GAME: 'game',
  API: 'api',
  LIBRARY: 'library',
  TOOL: 'tool',
  OTHER: 'other',
} as const;

export type ProjectCategory = typeof ProjectCategory[keyof typeof ProjectCategory];

export const ProjectStatus = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  ARCHIVED: 'archived',
  PLANNED: 'planned',
} as const;

export type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

export const SkillLevel = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
} as const;

export type SkillLevel = typeof SkillLevel[keyof typeof SkillLevel];

export const TimelineItemType = {
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  ACHIEVEMENT: 'achievement',
  CERTIFICATION: 'certification',
  PROJECT: 'project',
} as const;

export type TimelineItemType = typeof TimelineItemType[keyof typeof TimelineItemType];

export const WorkLinkType = {
  PORTFOLIO: 'portfolio',
  BLOG: 'blog',
  BEHANCE: 'behance',
  DRIBBBLE: 'dribbble',
  GITHUB: 'github',
  WEBSITE: 'website',
  CASE_STUDY: 'case-study',
  DOCUMENTATION: 'documentation',
  OTHER: 'other',
} as const;

export type WorkLinkType = typeof WorkLinkType[keyof typeof WorkLinkType];

// ============================================================================
// Core Types
// ============================================================================

export interface PersonalInfo {
  name: string;
  title: string;
  bio: {
    short: string; // For hero section
    long: string; // For about section
  };
  location: {
    city: string;
    country: string;
    timezone?: string;
  };
  contact: {
    email: string;
    phone?: string;
    availability?: string;
  };
  avatar: {
    url: string;
    alt?: string;
  };
  resume?: {
    url: string;
    label?: string;
  };
  meta?: {
    seoDescription?: string;
    keywords?: string[];
  };
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string;
  icon?: string; // For custom icons
  displayOrder: number;
  category?: 'professional' | 'social' | 'creative' | 'other';
}

export interface WorkLink {
  type: WorkLinkType;
  url: string;
  label: string;
  description?: string;
  icon?: string;
  displayOrder?: number;
}

export interface TechStack {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'language' | 'framework' | 'library' | 'other';
  icon?: string;
  level?: SkillLevel;
}

export interface ProjectImage {
  url: string;
  alt: string;
  thumbnail?: string;
  isPrimary?: boolean;
}

export interface ProjectLink {
  type: 'demo' | 'github' | 'case-study' | 'documentation' | 'app-store' | 'play-store' | 'other';
  url: string;
  label: string;
}

export interface AnimationConfig {
  delay?: number;
  duration?: number;
  easing?: string;
  trigger?: 'scroll' | 'hover' | 'load' | 'click';
  stagger?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  images: ProjectImage[];
  techStack: TechStack[];
  links: ProjectLink[];
  category: ProjectCategory;
  featured: boolean;
  date: string; // ISO date string
  endDate?: string; // For ongoing projects
  status: ProjectStatus;
  tags?: string[];
  animationConfig?: AnimationConfig;
}

export interface Skill {
  name: string;
  level: SkillLevel;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'language' | 'framework' | 'library' | 'design' | 'other';
  icon?: string;
  yearsOfExperience?: number;
}

export interface TimelineItem {
  type: TimelineItemType;
  title: string;
  organization: string;
  location?: string;
  date: string; // ISO date string
  endDate?: string; // For ongoing items
  description?: string;
  tags?: string[];
  links?: Array<{
    label: string;
    url: string;
  }>;
  animationConfig?: AnimationConfig;
}

export interface AboutSection {
  type: 'text' | 'skills' | 'timeline' | 'stats' | 'interests' | 'values';
  title: string;
  content?: string; // For text sections
  skills?: Skill[]; // For skills sections
  timelineItems?: TimelineItem[]; // For timeline sections
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: string;
  }>; // For stats sections
  interests?: string[]; // For interests sections
  values?: Array<{
    title: string;
    description: string;
  }>; // For values sections
  order: number;
  animationConfig?: AnimationConfig;
}

export interface About {
  sections: AboutSection[];
}

export interface Portfolio {
  personal: PersonalInfo;
  social: SocialLink[];
  workLinks: WorkLink[];
  projects: Project[];
  about: About;
}

// ============================================================================
// Utility Types
// ============================================================================

export type FeaturedProject = Project & { featured: true };
export type ActiveProject = Project & { status: typeof ProjectStatus.COMPLETED | typeof ProjectStatus.IN_PROGRESS };
export type SocialLinkGroup = {
  category: string;
  links: SocialLink[];
};
export type ProjectGroup = {
  category: ProjectCategory;
  projects: Project[];
};
export type ProjectStatusGroup = {
  status: ProjectStatus;
  projects: Project[];
};

// ============================================================================
// Config Types (for file-based configuration)
// ============================================================================

export interface PortfolioConfig {
  personal: PersonalInfo;
  social: SocialLink[];
  workLinks: WorkLink[];
  projects: Project[];
  about: About;
  // Metadata for config management
  version?: string;
  lastUpdated?: string;
}

