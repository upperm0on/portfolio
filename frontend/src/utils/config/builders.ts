// Type-Safe Config Builders
// Helper functions to create config entries with full type safety and autocomplete

import type {
  Project,
  SocialLink,
  WorkLink,
  TechStack,
  ProjectImage,
  ProjectLink,
  TimelineItem,
  Skill,
  AboutSection,
} from '../../types/portfolio';
import {
  ProjectCategory,
  ProjectStatus,
  SocialPlatform,
} from '../../types/portfolio';

/**
 * Create a project with auto-generated ID if not provided
 */
export function createProject(
  project: Omit<Project, 'id'> & { id?: string }
): Project {
  return {
    id: project.id || `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: project.title,
    shortDescription: project.shortDescription,
    description: project.description,
    category: project.category,
    status: project.status,
    featured: project.featured ?? false,
    date: project.date,
    endDate: project.endDate,
    images: project.images,
    techStack: project.techStack,
    links: project.links,
    tags: project.tags,
    animationConfig: project.animationConfig,
  };
}

/**
 * Create a social link with optional display order
 */
export function createSocialLink(
  link: Omit<SocialLink, 'displayOrder'> & { displayOrder?: number }
): SocialLink {
  return {
    platform: link.platform,
    url: link.url,
    label: link.label,
    icon: link.icon,
    displayOrder: link.displayOrder ?? 999,
    category: link.category,
  };
}

/**
 * Create a work link with optional display order
 */
export function createWorkLink(
  link: Omit<WorkLink, 'displayOrder'> & { displayOrder?: number }
): WorkLink {
  return {
    type: link.type,
    url: link.url,
    label: link.label,
    description: link.description,
    icon: link.icon,
    displayOrder: link.displayOrder ?? 999,
  };
}

/**
 * Create a tech stack item
 */
export function createTechStack(tech: TechStack): TechStack {
  return {
    name: tech.name,
    category: tech.category,
    icon: tech.icon,
    level: tech.level,
  };
}

/**
 * Create a project image
 */
export function createProjectImage(image: ProjectImage): ProjectImage {
  return {
    url: image.url,
    alt: image.alt,
    thumbnail: image.thumbnail,
    isPrimary: image.isPrimary ?? false,
  };
}

/**
 * Create a project link
 */
export function createProjectLink(link: ProjectLink): ProjectLink {
  return {
    type: link.type,
    url: link.url,
    label: link.label,
  };
}

/**
 * Create a skill
 */
export function createSkill(skill: Skill): Skill {
  return {
    name: skill.name,
    level: skill.level,
    category: skill.category,
    icon: skill.icon,
    yearsOfExperience: skill.yearsOfExperience,
  };
}

/**
 * Create a timeline item
 */
export function createTimelineItem(item: TimelineItem): TimelineItem {
  return {
    type: item.type,
    title: item.title,
    organization: item.organization,
    location: item.location,
    date: item.date,
    endDate: item.endDate,
    description: item.description,
    tags: item.tags,
    links: item.links,
    animationConfig: item.animationConfig,
  };
}

/**
 * Create an about section
 */
export function createAboutSection(section: AboutSection): AboutSection {
  return {
    type: section.type,
    title: section.title,
    content: section.content,
    skills: section.skills,
    timelineItems: section.timelineItems,
    stats: section.stats,
    interests: section.interests,
    values: section.values,
    order: section.order,
    animationConfig: section.animationConfig,
  };
}

/**
 * Helper to create a complete project with all required fields
 */
export function createProjectHelper(
  title: string,
  description: string,
  shortDescription: string,
  category: ProjectCategory,
  options?: {
    id?: string;
    status?: ProjectStatus;
    featured?: boolean;
    date?: string;
    images?: ProjectImage[];
    techStack?: TechStack[];
    links?: ProjectLink[];
    tags?: string[];
  }
): Project {
  return createProject({
    id: options?.id,
    title,
    shortDescription,
    description,
    category,
    status: options?.status ?? ProjectStatus.COMPLETED,
    featured: options?.featured ?? false,
    date: options?.date ?? new Date().toISOString().split('T')[0],
    images: options?.images ?? [],
    techStack: options?.techStack ?? [],
    links: options?.links ?? [],
    tags: options?.tags,
  });
}

/**
 * Helper to create a social link with common defaults
 */
export function createSocialLinkHelper(
  platform: SocialPlatform,
  url: string,
  options?: {
    label?: string;
    displayOrder?: number;
    category?: 'professional' | 'social' | 'creative' | 'other';
  }
): SocialLink {
  return createSocialLink({
    platform,
    url,
    label: options?.label ?? platform.charAt(0).toUpperCase() + platform.slice(1),
    displayOrder: options?.displayOrder,
    category: options?.category,
  });
}

