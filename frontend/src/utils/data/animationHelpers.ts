// Animation Helper Functions
// GSAP-ready utilities for animation integration

import type {
  Project,
  AboutSection,
  TimelineItem,
  AnimationConfig,
} from '../../types/portfolio';

/**
 * Get animation targets from data
 * Returns selectors and data attributes for GSAP targeting
 */
export function getAnimationTargets(data: {
  projects?: Project[];
  sections?: AboutSection[];
  timelineItems?: TimelineItem[];
}): {
  projectSelectors: string[];
  sectionSelectors: string[];
  timelineSelectors: string[];
} {
  const projectSelectors: string[] = [];
  const sectionSelectors: string[] = [];
  const timelineSelectors: string[] = [];

  if (data.projects) {
    data.projects.forEach((project, index) => {
      projectSelectors.push(`[data-project-id="${project.id}"]`);
      projectSelectors.push(`[data-project-index="${index}"]`);
    });
  }

  if (data.sections) {
    data.sections.forEach((section, index) => {
      sectionSelectors.push(`[data-section-type="${section.type}"]`);
      sectionSelectors.push(`[data-section-index="${index}"]`);
      sectionSelectors.push(`[data-section-order="${section.order}"]`);
    });
  }

  if (data.timelineItems) {
    data.timelineItems.forEach((item, index) => {
      timelineSelectors.push(`[data-timeline-index="${index}"]`);
      timelineSelectors.push(`[data-timeline-type="${item.type}"]`);
    });
  }

  return {
    projectSelectors,
    sectionSelectors,
    timelineSelectors,
  };
}

/**
 * Create animation sequence data from items
 */
export function createAnimationSequence<T extends { animationConfig?: AnimationConfig }>(
  items: T[],
  defaultConfig?: Partial<AnimationConfig>
): Array<T & { animation: AnimationConfig }> {
  return items.map((item, index) => {
    const config: AnimationConfig = {
      delay: item.animationConfig?.delay ?? defaultConfig?.delay ?? index * 0.1,
      duration: item.animationConfig?.duration ?? defaultConfig?.duration ?? 0.6,
      easing: item.animationConfig?.easing ?? defaultConfig?.easing ?? 'power2.out',
      trigger: item.animationConfig?.trigger ?? defaultConfig?.trigger ?? 'scroll',
      stagger: item.animationConfig?.stagger ?? defaultConfig?.stagger,
    };

    return {
      ...item,
      animation: config,
    };
  });
}

/**
 * Get reveal order for staggered animations
 */
export function getRevealOrder<T>(items: T[]): number[] {
  return items.map((_, index) => index);
}

/**
 * Calculate stagger delays for animations
 */
export function calculateStaggerDelays(
  count: number,
  baseDelay: number = 0.1,
  customDelays?: number[]
): number[] {
  if (customDelays && customDelays.length === count) {
    return customDelays;
  }

  return Array.from({ length: count }, (_, index) => index * baseDelay);
}

/**
 * Prepare animation data with metadata
 */
export function prepareAnimationData(componentData: {
  projects?: Project[];
  sections?: AboutSection[];
  timelineItems?: TimelineItem[];
}): {
  projects?: Array<Project & { animationMetadata: AnimationConfig & { selector: string } }>;
  sections?: Array<AboutSection & { animationMetadata: AnimationConfig & { selector: string } }>;
  timelineItems?: Array<TimelineItem & { animationMetadata: AnimationConfig & { selector: string } }>;
} {
  const result: any = {};

  if (componentData.projects) {
    result.projects = componentData.projects.map((project, index) => ({
      ...project,
      animationMetadata: {
        ...(project.animationConfig || {}),
        delay: project.animationConfig?.delay ?? index * 0.1,
        duration: project.animationConfig?.duration ?? 0.6,
        easing: project.animationConfig?.easing ?? 'power2.out',
        trigger: project.animationConfig?.trigger ?? 'scroll',
        selector: `[data-project-id="${project.id}"]`,
      },
    }));
  }

  if (componentData.sections) {
    result.sections = componentData.sections.map((section, index) => ({
      ...section,
      animationMetadata: {
        ...(section.animationConfig || {}),
        delay: section.animationConfig?.delay ?? index * 0.15,
        duration: section.animationConfig?.duration ?? 0.8,
        easing: section.animationConfig?.easing ?? 'power2.out',
        trigger: section.animationConfig?.trigger ?? 'scroll',
        selector: `[data-section-type="${section.type}"][data-section-order="${section.order}"]`,
      },
    }));
  }

  if (componentData.timelineItems) {
    result.timelineItems = componentData.timelineItems.map((item, index) => ({
      ...item,
      animationMetadata: {
        ...(item.animationConfig || {}),
        delay: item.animationConfig?.delay ?? index * 0.1,
        duration: item.animationConfig?.duration ?? 0.6,
        easing: item.animationConfig?.easing ?? 'power2.out',
        trigger: item.animationConfig?.trigger ?? 'scroll',
        selector: `[data-timeline-index="${index}"]`,
      },
    }));
  }

  return result;
}

/**
 * Create ScrollTrigger configuration from animation config
 */
export function createScrollTriggerConfig(
  _animationConfig: AnimationConfig,
  elementSelector: string
): {
  trigger: string;
  start: string;
  toggleActions: string;
  markers?: boolean;
} {
  // animationConfig can be used for future customization (e.g., custom start position)
  return {
    trigger: elementSelector,
    start: 'top 80%',
    toggleActions: 'play none none reverse',
    // markers: import.meta.env.DEV, // Enable in development
  };
}

/**
 * Get animation data attributes for HTML elements
 */
export function getAnimationDataAttributes(
  id: string,
  animationConfig?: AnimationConfig
): Record<string, string> {
  const attrs: Record<string, string> = {
    'data-animate': 'true',
    'data-animate-id': id,
  };

  if (animationConfig) {
    if (animationConfig.delay !== undefined) {
      attrs['data-animate-delay'] = animationConfig.delay.toString();
    }
    if (animationConfig.duration !== undefined) {
      attrs['data-animate-duration'] = animationConfig.duration.toString();
    }
    if (animationConfig.easing) {
      attrs['data-animate-easing'] = animationConfig.easing;
    }
    if (animationConfig.trigger) {
      attrs['data-animate-trigger'] = animationConfig.trigger;
    }
  }

  return attrs;
}

