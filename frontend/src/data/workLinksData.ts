// Work/Portfolio Links Data
// Loads work and portfolio links from portfolio configuration

import { getPortfolioData } from '../utils/config/portfolioConfigLoader';
import type { WorkLink, WorkLinkType } from '../types/portfolio';

/**
 * Get all work links from portfolio config
 */
export function getWorkLinks(): WorkLink[] {
  const portfolio = getPortfolioData();
  return portfolio.workLinks;
}

/**
 * Get work links sorted by display order
 */
export function getWorkLinksSorted(): WorkLink[] {
  const links = getWorkLinks();
  return links.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
}

/**
 * Get work links by type
 */
export function getWorkLinksByType(type: WorkLinkType): WorkLink[] {
  return getWorkLinks().filter(link => link.type === type);
}

/**
 * Export work links as a constant for direct access
 */
export const workLinksData = getWorkLinksSorted();

