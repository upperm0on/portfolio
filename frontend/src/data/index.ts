// Data Barrel Export
// Central export for all portfolio data

export * from './portfolioData';
export * from './personalData';
export * from './socialData';
export * from './workLinksData';
export * from './projectsData';
export * from './aboutData';

// Default export: complete portfolio data
export { portfolioData as default, getPortfolio } from './portfolioData';

