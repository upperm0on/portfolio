/**
 * Layout Animation Utilities
 * Configuration objects for GSAP animations
 * These can be used with GSAP when it's integrated
 */

export interface AnimationConfig {
  delay?: number;
  duration?: number;
  easing?: string;
  trigger?: 'scroll' | 'hover' | 'load' | 'click';
  stagger?: number;
}

/**
 * Header scroll animation configuration
 */
export const headerScrollConfig: AnimationConfig = {
  duration: 0.3,
  easing: 'power2.out',
  trigger: 'scroll',
};

/**
 * Footer reveal animation configuration
 */
export const footerRevealConfig: AnimationConfig = {
  delay: 0.2,
  duration: 0.6,
  easing: 'power2.out',
  trigger: 'scroll',
};

/**
 * Navigation stagger animation configuration
 */
export const navigationStaggerConfig: AnimationConfig = {
  delay: 0.1,
  duration: 0.4,
  easing: 'power2.out',
  stagger: 0.1,
  trigger: 'load',
};

/**
 * Mobile menu animation configuration
 */
export const mobileMenuConfig: AnimationConfig = {
  duration: 0.4,
  easing: 'power3.inOut',
  trigger: 'click',
};

/**
 * Scroll reveal animation configuration
 */
export const scrollRevealConfig: AnimationConfig = {
  delay: 0,
  duration: 0.8,
  easing: 'power2.out',
  trigger: 'scroll',
};

/**
 * Stagger fade animation configuration
 */
export const staggerFadeConfig: AnimationConfig = {
  delay: 0.1,
  duration: 0.5,
  easing: 'power2.out',
  stagger: 0.1,
  trigger: 'scroll',
};

/**
 * Fade in animation configuration
 */
export const fadeInConfig: AnimationConfig = {
  delay: 0,
  duration: 0.6,
  easing: 'power2.out',
  trigger: 'scroll',
};

/**
 * Fade up animation configuration
 */
export const fadeUpConfig: AnimationConfig = {
  delay: 0,
  duration: 0.6,
  easing: 'power2.out',
  trigger: 'scroll',
};

/**
 * Slide in animation configuration
 */
export const slideInConfig: AnimationConfig = {
  delay: 0,
  duration: 0.5,
  easing: 'power3.out',
  trigger: 'click',
};

/**
 * Get animation config by type
 */
export function getAnimationConfig(type: string): AnimationConfig {
  const configs: Record<string, AnimationConfig> = {
    'header': headerScrollConfig,
    'footer': footerRevealConfig,
    'navigation': navigationStaggerConfig,
    'mobile-menu': mobileMenuConfig,
    'scroll-reveal': scrollRevealConfig,
    'stagger-fade': staggerFadeConfig,
    'fade-in': fadeInConfig,
    'fade-up': fadeUpConfig,
    'slide-in': slideInConfig,
  };

  return configs[type] || fadeInConfig;
}

/**
 * Parse data attributes for animation config
 */
export function parseAnimationAttributes(element: HTMLElement): AnimationConfig {
  const animate = element.getAttribute('data-animate');
  const delay = element.getAttribute('data-delay');
  const duration = element.getAttribute('data-duration');
  const trigger = element.getAttribute('data-trigger');

  const config = animate ? getAnimationConfig(animate) : fadeInConfig;

  return {
    ...config,
    delay: delay ? parseFloat(delay) : config.delay,
    duration: duration ? parseFloat(duration) : config.duration,
    trigger: (trigger as AnimationConfig['trigger']) || config.trigger,
  };
}



