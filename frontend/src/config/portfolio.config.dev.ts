// Development Portfolio Configuration
// This file contains test/development data for local development

import type { PortfolioConfig } from '../types/portfolio';
import { portfolioConfig } from './portfolio.config';

// For now, use the same config as production
// You can customize this for development-specific data
export const portfolioConfigDev: PortfolioConfig = {
  ...portfolioConfig,
  // Override with dev-specific values if needed
  // For example:
  // personal: {
  //   ...portfolioConfig.personal,
  //   name: 'Dev Mode - Your Name',
  // },
};

