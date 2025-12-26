// Personal Information Data
// Loads personal information from portfolio configuration

import { getPortfolioData } from '../utils/config/portfolioConfigLoader';
import type { PersonalInfo } from '../types/portfolio';

/**
 * Get personal information from portfolio config
 */
export function getPersonalInfo(): PersonalInfo {
  const portfolio = getPortfolioData();
  return portfolio.personal;
}

/**
 * Export personal info as a constant for direct access
 */
export const personalData = getPersonalInfo();

