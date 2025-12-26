// Master Portfolio Data Export
// Central export combining all portfolio data sources

import { getPortfolioData } from '../utils/config/portfolioConfigLoader';
import type { Portfolio } from '../types/portfolio';

// Re-export individual data getters
export * from './personalData';
export * from './socialData';
export * from './workLinksData';
export * from './projectsData';
export * from './aboutData';

/**
 * Get complete portfolio data
 */
export function getPortfolio(): Portfolio {
  return getPortfolioData();
}

/**
 * Export portfolio data as default
 */
export const portfolioData = getPortfolio();

