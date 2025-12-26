// Data Manipulation Helper Functions
// Utility functions for filtering, sorting, and searching portfolio data

import type {
  Project,
  SocialLink,
  Skill,
  TimelineItem,
  ProjectCategory,
  ProjectStatus,
  SocialLinkGroup,
  ProjectGroup,
  ProjectStatusGroup,
} from '../../types/portfolio';
import { ProjectStatus as ProjectStatusEnum } from '../../types/portfolio';

/**
 * Get featured projects
 */
export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter(project => project.featured);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(projects: Project[], category: ProjectCategory): Project[] {
  return projects.filter(project => project.category === category);
}

/**
 * Get projects by status
 */
export function getProjectsByStatus(projects: Project[], status: ProjectStatus): Project[] {
  return projects.filter(project => project.status === status);
}

/**
 * Get active projects (completed or in-progress)
 */
export function getActiveProjects(projects: Project[]): Project[] {
  return projects.filter(
    project =>
      project.status === ProjectStatusEnum.COMPLETED ||
      project.status === ProjectStatusEnum.IN_PROGRESS
  );
}

/**
 * Sort projects by date (newest first by default)
 */
export function sortProjectsByDate(projects: Project[], order: 'asc' | 'desc' = 'desc'): Project[] {
  const sorted = [...projects].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
  return sorted;
}

/**
 * Sort projects by featured status (featured first)
 */
export function sortProjectsByFeatured(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

/**
 * Group projects by category
 */
export function groupProjectsByCategory(projects: Project[]): ProjectGroup[] {
  const groups = new Map<ProjectCategory, Project[]>();

  projects.forEach(project => {
    const existing = groups.get(project.category) || [];
    groups.set(project.category, [...existing, project]);
  });

  return Array.from(groups.entries()).map(([category, projects]) => ({
    category,
    projects,
  }));
}

/**
 * Group projects by status
 */
export function groupProjectsByStatus(projects: Project[]): ProjectStatusGroup[] {
  const groups = new Map<ProjectStatus, Project[]>();

  projects.forEach(project => {
    const existing = groups.get(project.status) || [];
    groups.set(project.status, [...existing, project]);
  });

  return Array.from(groups.entries()).map(([status, projects]) => ({
    status,
    projects,
  }));
}

/**
 * Get social links by category
 */
export function getSocialLinksByCategory(links: SocialLink[]): SocialLinkGroup[] {
  const groups = new Map<string, SocialLink[]>();

  links.forEach(link => {
    const category = link.category || 'other';
    const existing = groups.get(category) || [];
    groups.set(category, [...existing, link]);
  });

  return Array.from(groups.entries()).map(([category, links]) => ({
    category,
    links: links.sort((a, b) => a.displayOrder - b.displayOrder),
  }));
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(skills: Skill[]): Map<string, Skill[]> {
  const groups = new Map<string, Skill[]>();

  skills.forEach(skill => {
    const category = skill.category;
    const existing = groups.get(category) || [];
    groups.set(category, [...existing, skill]);
  });

  return groups;
}

/**
 * Get timeline items by type
 */
export function getTimelineItemsByType(items: TimelineItem[], type: TimelineItem['type']): TimelineItem[] {
  return items.filter(item => item.type === type);
}

/**
 * Sort timeline items by date (newest first by default)
 */
export function sortTimelineItemsByDate(items: TimelineItem[], order: 'asc' | 'desc' = 'desc'): TimelineItem[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Search projects by query
 */
export function searchProjects(projects: Project[], query: string): Project[] {
  if (!query || query.trim().length === 0) {
    return projects;
  }

  const lowerQuery = query.toLowerCase().trim();

  return projects.filter(project => {
    const searchableText = [
      project.title,
      project.description,
      project.shortDescription,
      ...(project.tags || []),
      ...project.techStack.map(tech => tech.name),
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

/**
 * Get projects by tag
 */
export function getProjectsByTag(projects: Project[], tag: string): Project[] {
  return projects.filter(project => project.tags?.includes(tag));
}

/**
 * Get all unique tags from projects
 */
export function getAllProjectTags(projects: Project[]): string[] {
  const tags = new Set<string>();

  projects.forEach(project => {
    project.tags?.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get all unique tech stack items from projects
 */
export function getAllTechStack(projects: Project[]): string[] {
  const tech = new Set<string>();

  projects.forEach(project => {
    project.techStack.forEach(item => tech.add(item.name));
  });

  return Array.from(tech).sort();
}

/**
 * Get recent projects (within last N days)
 */
export function getRecentProjects(projects: Project[], days: number = 30): Project[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return projects.filter(project => {
    const projectDate = new Date(project.date);
    return projectDate >= cutoffDate;
  });
}

/**
 * Get projects count by category
 */
export function getProjectsCountByCategory(projects: Project[]): Map<ProjectCategory, number> {
  const counts = new Map<ProjectCategory, number>();

  projects.forEach(project => {
    const current = counts.get(project.category) || 0;
    counts.set(project.category, current + 1);
  });

  return counts;
}

