// Projects Data
// Loads projects from portfolio configuration

import { getPortfolioData } from '../utils/config/portfolioConfigLoader';
import type { Project, ProjectCategory } from '../types/portfolio';
import { ProjectStatus } from '../types/portfolio';

/**
 * Get all projects from portfolio config
 */
export function getProjects(): Project[] {
  const portfolio = getPortfolioData();
  return portfolio.projects;
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return getProjects().filter(project => project.featured);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getProjects().filter(project => project.category === category);
}

/**
 * Get projects by status
 */
export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return getProjects().filter(project => project.status === status);
}

/**
 * Get project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return getProjects().find(project => project.id === id);
}

/**
 * Get active projects (completed or in-progress)
 */
export function getActiveProjects(): Project[] {
  return getProjects().filter(
    project => 
      project.status === ProjectStatus.COMPLETED || 
      project.status === ProjectStatus.IN_PROGRESS
  );
}

/**
 * Export projects as a constant for direct access
 */
export const projectsData = getProjects();

