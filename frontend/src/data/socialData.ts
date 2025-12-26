// Social Media Links Data
// Loads social media links from portfolio configuration

import { getPortfolioData } from '../utils/config/portfolioConfigLoader';
import type { SocialLink } from '../types/portfolio';

/**
 * Get all social links from portfolio config
 */
export function getSocialLinks(): SocialLink[] {
  const portfolio = getPortfolioData();
  return portfolio.social;
}

/**
 * Get social links sorted by display order
 */
export function getSocialLinksSorted(): SocialLink[] {
  return getSocialLinks().sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Get social links by category
 */
export function getSocialLinksByCategory(category: 'professional' | 'social' | 'creative' | 'other'): SocialLink[] {
  return getSocialLinks().filter(link => link.category === category);
}

/**
 * Export social links as a constant for direct access
 */
export const socialData = getSocialLinksSorted();

