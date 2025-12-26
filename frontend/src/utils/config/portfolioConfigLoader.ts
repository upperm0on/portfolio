// Portfolio Config Loader
// This utility loads portfolio configuration from the config file.
// In the future, this can be modified to fetch from an API endpoint.

import { portfolioConfig } from '../../config/portfolio.config';
import { portfolioConfigDev } from '../../config/portfolio.config.dev';
import type { PortfolioConfig, Portfolio } from '../../types/portfolio';
import { validateOnLoad } from '../data/validation';

// Cache for config (cleared in dev mode for hot reload)
let cachedConfig: PortfolioConfig | null = null;
let validationPerformed = false;

/**
 * Loads portfolio configuration from the config file.
 * In the future, this can be replaced with an API call:
 * 
 * Example future implementation:
 * ```typescript
 * export async function loadPortfolioConfig(): Promise<PortfolioConfig> {
 *   const response = await fetch('/api/portfolio/config');
 *   return response.json();
 * }
 * ```
 */
export function loadPortfolioConfig(): PortfolioConfig {
  // In development, always reload to support HMR
  if (import.meta.env.DEV) {
    cachedConfig = null;
    validationPerformed = false;
  }
  
  // Return cached config if available
  if (cachedConfig) {
    return cachedConfig;
  }
  
  // Load config based on environment
  const env = import.meta.env.MODE;
  const config = env === 'development' ? portfolioConfigDev : portfolioConfig;
  
  // Auto-validate in development mode
  if (import.meta.env.DEV && !validationPerformed) {
    const validation = validateOnLoad(config);
    
    if (!validation.success) {
      console.error('❌ Portfolio config validation failed:');
      validation.errors.forEach(error => {
        console.error(`   • ${error}`);
      });
      
      if (validation.warnings.length > 0) {
        console.warn('⚠️  Warnings:');
        validation.warnings.forEach(warning => {
          console.warn(`   • ${warning}`);
        });
      }
    } else if (validation.warnings.length > 0) {
      console.warn('⚠️  Portfolio config warnings:');
      validation.warnings.forEach(warning => {
        console.warn(`   • ${warning}`);
      });
    } else {
      console.log('✅ Portfolio config is valid');
    }
    
    validationPerformed = true;
  }
  
  cachedConfig = config;
  return cachedConfig;
}

/**
 * Converts PortfolioConfig to Portfolio type
 * (They're the same structure, but this provides a clear interface)
 */
export function getPortfolioData(): Portfolio {
  const config = loadPortfolioConfig();
  
  return {
    personal: config.personal,
    social: config.social,
    workLinks: config.workLinks,
    projects: config.projects,
    about: config.about,
  };
}

/**
 * Future: Load config from API
 * Uncomment and modify when backend is ready
 */
/*
export async function loadPortfolioConfigFromAPI(): Promise<PortfolioConfig> {
  try {
    const response = await fetch('/api/portfolio/config');
    if (!response.ok) {
      throw new Error('Failed to load portfolio config');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading portfolio config from API:', error);
    // Fallback to local config
    return portfolioConfig;
  }
}
*/

