// Data Validation Functions
// Runtime validation for portfolio data

import type {
  PersonalInfo,
  SocialLink,
  Project,
  Portfolio,
  PortfolioConfig,
} from '../../types/portfolio';
import { SocialPlatform, ProjectStatus, ProjectCategory } from '../../types/portfolio';

/**
 * Validation context for better error messages
 */
export interface ValidationContext {
  index?: number;
  field?: string;
  parent?: string;
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates phone number format (basic validation)
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Basic phone validation - accepts international format
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
}

/**
 * Format error message with context
 */
function formatError(message: string, context?: ValidationContext): string {
  if (!context) return message;
  
  const parts: string[] = [];
  if (context.parent) parts.push(context.parent);
  if (context.index !== undefined) parts.push(`[${context.index}]`);
  if (context.field) parts.push(context.field);
  
  const prefix = parts.length > 0 ? `${parts.join(' ')}: ` : '';
  return `${prefix}${message}`;
}

/**
 * Validates personal information
 */
export function validatePersonalInfo(
  personal: PersonalInfo,
  context?: ValidationContext
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!personal.name || personal.name.trim().length === 0) {
    errors.push(formatError('Name is required', { ...context, field: 'personal.name' }));
  }

  if (!personal.title || personal.title.trim().length === 0) {
    errors.push(formatError('Title is required', { ...context, field: 'personal.title' }));
  }

  if (!personal.bio?.short || personal.bio.short.trim().length === 0) {
    errors.push(formatError('Short bio is required', { ...context, field: 'personal.bio.short' }));
  }

  if (!personal.contact?.email) {
    errors.push(formatError('Email is required', { ...context, field: 'personal.contact.email' }));
  } else if (!isValidEmail(personal.contact.email)) {
    errors.push(formatError('Invalid email format', { ...context, field: 'personal.contact.email' }));
  }

  if (personal.contact?.phone && !isValidPhoneNumber(personal.contact.phone)) {
    errors.push(formatError('Invalid phone number format', { ...context, field: 'personal.contact.phone' }));
  }

  if (!personal.avatar?.url) {
    errors.push(formatError('Avatar URL is required', { ...context, field: 'personal.avatar.url' }));
  } else if (!isValidUrl(personal.avatar.url) && !personal.avatar.url.startsWith('/')) {
    errors.push(formatError('Invalid avatar URL', { ...context, field: 'personal.avatar.url' }));
  }

  if (personal.resume?.url && !isValidUrl(personal.resume.url) && !personal.resume.url.startsWith('/')) {
    errors.push(formatError('Invalid resume URL', { ...context, field: 'personal.resume.url' }));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates social link
 */
export function validateSocialLink(
  link: SocialLink,
  context?: ValidationContext
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!Object.values(SocialPlatform).includes(link.platform)) {
    errors.push(
      formatError(`Invalid social platform: ${link.platform}`, { ...context, field: 'platform' })
    );
  }

  if (!link.url || !isValidUrl(link.url)) {
    errors.push(formatError('Invalid or missing URL', { ...context, field: 'url' }));
  }

  if (typeof link.displayOrder !== 'number' || link.displayOrder < 0) {
    errors.push(formatError('Display order must be a non-negative number', { ...context, field: 'displayOrder' }));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates project
 */
export function validateProject(
  project: Project,
  context?: ValidationContext
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!project.id || project.id.trim().length === 0) {
    errors.push(formatError('Project ID is required', { ...context, field: 'id' }));
  }

  if (!project.title || project.title.trim().length === 0) {
    errors.push(formatError('Project title is required', { ...context, field: 'title' }));
  }

  if (!project.description || project.description.trim().length === 0) {
    errors.push(formatError('Project description is required', { ...context, field: 'description' }));
  }

  if (!project.shortDescription || project.shortDescription.trim().length === 0) {
    errors.push(formatError('Project short description is required', { ...context, field: 'shortDescription' }));
  }

  if (!Object.values(ProjectCategory).includes(project.category)) {
    errors.push(
      formatError(`Invalid project category: ${project.category}`, { ...context, field: 'category' })
    );
  }

  if (!Object.values(ProjectStatus).includes(project.status)) {
    errors.push(
      formatError(`Invalid project status: ${project.status}`, { ...context, field: 'status' })
    );
  }

  if (!project.date) {
    errors.push(formatError('Project date is required', { ...context, field: 'date' }));
  } else {
    const date = new Date(project.date);
    if (isNaN(date.getTime())) {
      errors.push(formatError('Invalid project date format', { ...context, field: 'date' }));
    }
  }

  if (project.images.length === 0) {
    errors.push(formatError('At least one project image is required', { ...context, field: 'images' }));
  }

  project.images.forEach((image, index) => {
    if (!image.url) {
      errors.push(formatError('URL is required', { ...context, field: `images[${index}].url` }));
    } else if (!isValidUrl(image.url) && !image.url.startsWith('/')) {
      errors.push(formatError('Invalid URL', { ...context, field: `images[${index}].url` }));
    }
    if (!image.alt) {
      errors.push(formatError('Alt text is required', { ...context, field: `images[${index}].alt` }));
    }
  });

  project.links.forEach((link, index) => {
    if (!link.url) {
      errors.push(formatError('URL is required', { ...context, field: `links[${index}].url` }));
    } else if (!isValidUrl(link.url) && !link.url.startsWith('/')) {
      errors.push(formatError('Invalid URL', { ...context, field: `links[${index}].url` }));
    }
    if (!link.label) {
      errors.push(formatError('Label is required', { ...context, field: `links[${index}].label` }));
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates complete portfolio
 */
export function validatePortfolio(
  portfolio: Portfolio | PortfolioConfig,
  context?: ValidationContext
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate personal info
  const personalValidation = validatePersonalInfo(portfolio.personal, { ...context, parent: 'personal' });
  if (!personalValidation.valid) {
    errors.push(...personalValidation.errors);
  }

  // Validate social links
  portfolio.social.forEach((link, index) => {
    const linkValidation = validateSocialLink(link, {
      ...context,
      parent: 'social',
      index,
    });
    if (!linkValidation.valid) {
      errors.push(...linkValidation.errors);
    }
  });

  // Validate projects
  portfolio.projects.forEach((project, index) => {
    const projectValidation = validateProject(project, {
      ...context,
      parent: 'projects',
      index,
    });
    if (!projectValidation.valid) {
      errors.push(...projectValidation.errors);
    }
  });

  // Validate about sections
  if (!portfolio.about?.sections || portfolio.about.sections.length === 0) {
    errors.push(formatError('At least one about section is required', { ...context, field: 'about.sections' }));
  }

  portfolio.about.sections.forEach((section, index) => {
    if (!section.title) {
      errors.push(
        formatError('Title is required', { ...context, parent: 'about.sections', index, field: 'title' })
      );
    }
    if (typeof section.order !== 'number') {
      errors.push(
        formatError('Order must be a number', { ...context, parent: 'about.sections', index, field: 'order' })
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Type guard: Check if object is valid PersonalInfo
 */
export function isValidPersonalInfo(obj: unknown): obj is PersonalInfo {
  if (typeof obj !== 'object' || obj === null) return false;
  const personal = obj as Partial<PersonalInfo>;
  return (
    typeof personal.name === 'string' &&
    typeof personal.title === 'string' &&
    typeof personal.bio?.short === 'string' &&
    typeof personal.contact?.email === 'string'
  );
}

/**
 * Type guard: Check if object is valid Project
 */
export function isValidProject(obj: unknown): obj is Project {
  if (typeof obj !== 'object' || obj === null) return false;
  const project = obj as Partial<Project>;
  return (
    typeof project.id === 'string' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    Array.isArray(project.images) &&
    Array.isArray(project.techStack)
  );
}

/**
 * Type guard: Check if object is valid SocialLink
 */
export function isValidSocialLink(obj: unknown): obj is SocialLink {
  if (typeof obj !== 'object' || obj === null) return false;
  const link = obj as Partial<SocialLink>;
  return (
    typeof link.platform === 'string' &&
    typeof link.url === 'string' &&
    typeof link.displayOrder === 'number'
  );
}
