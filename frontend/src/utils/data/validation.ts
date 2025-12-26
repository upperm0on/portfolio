// Runtime Data Validation
// Comprehensive validation using type guards and validators

import { validatePortfolio, validatePersonalInfo, validateProject, validateSocialLink } from './validators';
import { isPortfolio, isPersonalInfo, isProject, isSocialLink } from './typeGuards';
import type { Portfolio, PortfolioConfig, PersonalInfo, Project, SocialLink } from '../../types/portfolio';

/**
 * Validate and ensure type safety for portfolio data
 */
export function validateAndEnsurePortfolio(data: unknown): {
  valid: boolean;
  data?: Portfolio;
  errors: string[];
} {
  // First check if it's the right shape
  if (!isPortfolio(data)) {
    return {
      valid: false,
      errors: ['Data does not match Portfolio type structure'],
    };
  }

  // Then validate the content
  const validation = validatePortfolio(data);

  return {
    valid: validation.valid,
    data: validation.valid ? data : undefined,
    errors: validation.errors,
  };
}

/**
 * Validate portfolio config
 */
export function validatePortfolioConfig(config: unknown): {
  valid: boolean;
  data?: PortfolioConfig;
  errors: string[];
} {
  if (!isPortfolio(config)) {
    return {
      valid: false,
      errors: ['Config does not match PortfolioConfig type structure'],
    };
  }

  const validation = validatePortfolio(config);

  return {
    valid: validation.valid,
    data: validation.valid ? (config as PortfolioConfig) : undefined,
    errors: validation.errors,
  };
}

/**
 * Safe data access with validation
 */
export function safeGetPortfolioData(data: unknown): Portfolio | null {
  const result = validateAndEnsurePortfolio(data);
  return result.valid && result.data ? result.data : null;
}

/**
 * Validate personal info with type checking
 */
export function validatePersonalInfoSafe(data: unknown): {
  valid: boolean;
  data?: PersonalInfo;
  errors: string[];
} {
  if (!isPersonalInfo(data)) {
    return {
      valid: false,
      errors: ['Data does not match PersonalInfo type structure'],
    };
  }

  const validation = validatePersonalInfo(data);

  return {
    valid: validation.valid,
    data: validation.valid ? data : undefined,
    errors: validation.errors,
  };
}

/**
 * Validate project with type checking
 */
export function validateProjectSafe(data: unknown): {
  valid: boolean;
  data?: Project;
  errors: string[];
} {
  if (!isProject(data)) {
    return {
      valid: false,
      errors: ['Data does not match Project type structure'],
    };
  }

  const validation = validateProject(data);

  return {
    valid: validation.valid,
    data: validation.valid ? data : undefined,
    errors: validation.errors,
  };
}

/**
 * Validate social link with type checking
 */
export function validateSocialLinkSafe(data: unknown): {
  valid: boolean;
  data?: SocialLink;
  errors: string[];
} {
  if (!isSocialLink(data)) {
    return {
      valid: false,
      errors: ['Data does not match SocialLink type structure'],
    };
  }

  const validation = validateSocialLink(data);

  return {
    valid: validation.valid,
    data: validation.valid ? data : undefined,
    errors: validation.errors,
  };
}

/**
 * Validate data on load
 * Call this when loading portfolio config to ensure data integrity
 */
export function validateOnLoad(config: PortfolioConfig): {
  success: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  const validation = validatePortfolioConfig(config);

  if (!validation.valid) {
    errors.push(...validation.errors);
  }

  // Additional warnings
  if (config.projects.length === 0) {
    warnings.push('No projects found in portfolio');
  }

  if (config.social.length === 0) {
    warnings.push('No social links found in portfolio');
  }

  if (!config.about?.sections || config.about.sections.length === 0) {
    warnings.push('No about sections found in portfolio');
  }

  return {
    success: validation.valid,
    errors,
    warnings,
  };
}

