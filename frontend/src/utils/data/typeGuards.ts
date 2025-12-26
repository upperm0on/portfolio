// Type Guard Functions
// Runtime type checking utilities

import type {
  PersonalInfo,
  SocialLink,
  Project,
  WorkLink,
  Skill,
  TimelineItem,
  AboutSection,
  Portfolio,
  TechStack,
  ProjectImage,
  ProjectLink,
} from '../../types/portfolio';
import {
  SocialPlatform,
  ProjectCategory,
  ProjectStatus,
  SkillLevel,
  TimelineItemType,
  WorkLinkType,
} from '../../types/portfolio';

/**
 * Type guard for PersonalInfo
 */
export function isPersonalInfo(obj: unknown): obj is PersonalInfo {
  if (typeof obj !== 'object' || obj === null) return false;

  const personal = obj as Partial<PersonalInfo>;

  return (
    typeof personal.name === 'string' &&
    typeof personal.title === 'string' &&
    typeof personal.bio === 'object' &&
    personal.bio !== null &&
    typeof personal.bio.short === 'string' &&
    typeof personal.bio.long === 'string' &&
    typeof personal.location === 'object' &&
    personal.location !== null &&
    typeof personal.location.city === 'string' &&
    typeof personal.location.country === 'string' &&
    typeof personal.contact === 'object' &&
    personal.contact !== null &&
    typeof personal.contact.email === 'string' &&
    typeof personal.avatar === 'object' &&
    personal.avatar !== null &&
    typeof personal.avatar.url === 'string'
  );
}

/**
 * Type guard for SocialLink
 */
export function isSocialLink(obj: unknown): obj is SocialLink {
  if (typeof obj !== 'object' || obj === null) return false;

  const link = obj as Partial<SocialLink>;

  return (
    typeof link.platform === 'string' &&
    Object.values(SocialPlatform).includes(link.platform as SocialPlatform) &&
    typeof link.url === 'string' &&
    typeof link.displayOrder === 'number'
  );
}

/**
 * Type guard for Project
 */
export function isProject(obj: unknown): obj is Project {
  if (typeof obj !== 'object' || obj === null) return false;

  const project = obj as Partial<Project>;

  return (
    typeof project.id === 'string' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    typeof project.shortDescription === 'string' &&
    Array.isArray(project.images) &&
    Array.isArray(project.techStack) &&
    Array.isArray(project.links) &&
    typeof project.category === 'string' &&
    Object.values(ProjectCategory).includes(project.category as ProjectCategory) &&
    typeof project.featured === 'boolean' &&
    typeof project.date === 'string' &&
    typeof project.status === 'string' &&
    Object.values(ProjectStatus).includes(project.status as ProjectStatus)
  );
}

/**
 * Type guard for WorkLink
 */
export function isWorkLink(obj: unknown): obj is WorkLink {
  if (typeof obj !== 'object' || obj === null) return false;

  const link = obj as Partial<WorkLink>;

  return (
    typeof link.type === 'string' &&
    Object.values(WorkLinkType).includes(link.type as WorkLinkType) &&
    typeof link.url === 'string' &&
    typeof link.label === 'string'
  );
}

/**
 * Type guard for Skill
 */
export function isSkill(obj: unknown): obj is Skill {
  if (typeof obj !== 'object' || obj === null) return false;

  const skill = obj as Partial<Skill>;

  return (
    typeof skill.name === 'string' &&
    typeof skill.level === 'string' &&
    Object.values(SkillLevel).includes(skill.level as SkillLevel) &&
    typeof skill.category === 'string'
  );
}

/**
 * Type guard for TimelineItem
 */
export function isTimelineItem(obj: unknown): obj is TimelineItem {
  if (typeof obj !== 'object' || obj === null) return false;

  const item = obj as Partial<TimelineItem>;

  return (
    typeof item.type === 'string' &&
    Object.values(TimelineItemType).includes(item.type as TimelineItemType) &&
    typeof item.title === 'string' &&
    typeof item.organization === 'string' &&
    typeof item.date === 'string'
  );
}

/**
 * Type guard for AboutSection
 */
export function isAboutSection(obj: unknown): obj is AboutSection {
  if (typeof obj !== 'object' || obj === null) return false;

  const section = obj as Partial<AboutSection>;

  return (
    typeof section.type === 'string' &&
    ['text', 'skills', 'timeline', 'stats', 'interests', 'values'].includes(section.type) &&
    typeof section.title === 'string' &&
    typeof section.order === 'number'
  );
}

/**
 * Type guard for TechStack
 */
export function isTechStack(obj: unknown): obj is TechStack {
  if (typeof obj !== 'object' || obj === null) return false;

  const tech = obj as Partial<TechStack>;

  return typeof tech.name === 'string' && typeof tech.category === 'string';
}

/**
 * Type guard for ProjectImage
 */
export function isProjectImage(obj: unknown): obj is ProjectImage {
  if (typeof obj !== 'object' || obj === null) return false;

  const image = obj as Partial<ProjectImage>;

  return typeof image.url === 'string' && typeof image.alt === 'string';
}

/**
 * Type guard for ProjectLink
 */
export function isProjectLink(obj: unknown): obj is ProjectLink {
  if (typeof obj !== 'object' || obj === null) return false;

  const link = obj as Partial<ProjectLink>;

  return (
    typeof link.type === 'string' &&
    ['demo', 'github', 'case-study', 'documentation', 'app-store', 'play-store', 'other'].includes(
      link.type
    ) &&
    typeof link.url === 'string' &&
    typeof link.label === 'string'
  );
}

/**
 * Type guard for Portfolio
 */
export function isPortfolio(obj: unknown): obj is Portfolio {
  if (typeof obj !== 'object' || obj === null) return false;

  const portfolio = obj as Partial<Portfolio>;

  return (
    isPersonalInfo(portfolio.personal) &&
    Array.isArray(portfolio.social) &&
    portfolio.social.every(isSocialLink) &&
    Array.isArray(portfolio.workLinks) &&
    portfolio.workLinks.every(isWorkLink) &&
    Array.isArray(portfolio.projects) &&
    portfolio.projects.every(isProject) &&
    typeof portfolio.about === 'object' &&
    portfolio.about !== null &&
    Array.isArray(portfolio.about.sections) &&
    portfolio.about.sections.every(isAboutSection)
  );
}

/**
 * Narrow array type
 */
export function filterByType<T>(
  items: unknown[],
  typeGuard: (item: unknown) => item is T
): T[] {
  return items.filter(typeGuard);
}

