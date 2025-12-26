// GSAP Data Selectors
// Utilities for generating CSS selectors and ScrollTrigger configs for GSAP

import type { Project, AboutSection, TimelineItem, AnimationConfig } from '../../types/portfolio';
import { createScrollTriggerConfig, getAnimationDataAttributes } from '../data/animationHelpers';
import type {
  DepthLevel,
  FloatLevel,
  DirectionalRevealDirection,
  ParallaxLevel,
} from './motionConfig';

/**
 * Generate CSS selectors for GSAP targeting
 */
export function getAnimateSelectors(data: {
  projects?: Project[];
  sections?: AboutSection[];
  timelineItems?: TimelineItem[];
}): {
  projectSelectors: string[];
  sectionSelectors: string[];
  timelineSelectors: string[];
  allSelectors: string[];
} {
  const projectSelectors: string[] = [];
  const sectionSelectors: string[] = [];
  const timelineSelectors: string[] = [];

  if (data.projects) {
    data.projects.forEach(project => {
      projectSelectors.push(`[data-project-id="${project.id}"]`);
    });
  }

  if (data.sections) {
    data.sections.forEach(section => {
      sectionSelectors.push(`[data-section-type="${section.type}"][data-section-order="${section.order}"]`);
    });
  }

  if (data.timelineItems) {
    data.timelineItems.forEach((_, index) => {
      timelineSelectors.push(`[data-timeline-index="${index}"]`);
    });
  }

  return {
    projectSelectors,
    sectionSelectors,
    timelineSelectors,
    allSelectors: [...projectSelectors, ...sectionSelectors, ...timelineSelectors],
  };
}

/**
 * Create ScrollTrigger configurations from data
 */
export function createScrollTriggers(data: {
  projects?: Project[];
  sections?: AboutSection[];
  timelineItems?: TimelineItem[];
}): Array<{
  selector: string;
  config: ReturnType<typeof createScrollTriggerConfig>;
  animationConfig?: AnimationConfig;
}> {
  const triggers: Array<{
    selector: string;
    config: ReturnType<typeof createScrollTriggerConfig>;
    animationConfig?: AnimationConfig;
  }> = [];

  if (data.projects) {
    data.projects.forEach(project => {
      const selector = `[data-project-id="${project.id}"]`;
      triggers.push({
        selector,
        config: createScrollTriggerConfig(project.animationConfig || {}, selector),
        animationConfig: project.animationConfig,
      });
    });
  }

  if (data.sections) {
    data.sections.forEach(section => {
      const selector = `[data-section-type="${section.type}"][data-section-order="${section.order}"]`;
      triggers.push({
        selector,
        config: createScrollTriggerConfig(section.animationConfig || {}, selector),
        animationConfig: section.animationConfig,
      });
    });
  }

  if (data.timelineItems) {
    data.timelineItems.forEach((item, index) => {
      const selector = `[data-timeline-index="${index}"]`;
      triggers.push({
        selector,
        config: createScrollTriggerConfig(item.animationConfig || {}, selector),
        animationConfig: item.animationConfig,
      });
    });
  }

  return triggers;
}

/**
 * Calculate stagger delays for animations
 */
export function getStaggerConfig(
  items: Array<{ animationConfig?: AnimationConfig }>,
  defaultStagger: number = 0.1
): {
  stagger: number;
  delays: number[];
} {
  const delays = items.map((item, index) => {
    return item.animationConfig?.stagger ?? item.animationConfig?.delay ?? index * defaultStagger;
  });

  return {
    stagger: defaultStagger,
    delays,
  };
}

/**
 * Generate data attributes for HTML elements
 */
export function generateDataAttributes(
  id: string,
  type: 'project' | 'section' | 'timeline',
  index: number,
  animationConfig?: AnimationConfig
): Record<string, string> {
  const baseAttrs: Record<string, string> = {
    'data-animate': 'true',
    'data-animate-type': type,
  };

  if (type === 'project') {
    baseAttrs['data-project-id'] = id;
  } else if (type === 'section') {
    baseAttrs['data-section-type'] = id;
  } else if (type === 'timeline') {
    baseAttrs['data-timeline-index'] = index.toString();
  }

  const animationAttrs = getAnimationDataAttributes(id, animationConfig);

  return {
    ...baseAttrs,
    ...animationAttrs,
  };
}

/**
 * Generate depth and float attributes for motion system
 */
export function generateMotionAttributes(options: {
  depth?: DepthLevel;
  float?: FloatLevel;
}): Record<string, string> {
  const attrs: Record<string, string> = {};
  
  if (options.depth) {
    attrs['data-depth'] = options.depth;
  }
  
  if (options.float) {
    attrs['data-float'] = options.float;
  }
  
  return attrs;
}

/**
 * Selectors for the global motion system
 */
export const MOTION_SELECTORS = {
  depth: (level?: DepthLevel) => level ? `[data-depth="${level}"]` : '[data-depth]',
  float: (level?: FloatLevel) => level ? `[data-float="${level}"]` : '[data-float]',
  directionalReveal: (direction?: DirectionalRevealDirection) =>
    direction ? `[data-animate-direction="${direction}"]` : '[data-animate-direction]',
  parallax: (level?: ParallaxLevel) =>
    level ? `[data-parallax="${level}"]` : '[data-parallax]',
  animateGroup: (groupId?: string) =>
    groupId ? `[data-animate-group="${groupId}"]` : '[data-animate-group]',
};

/**
 * Create GSAP timeline configuration
 */
export function createTimelineConfig(
  items: Array<{ animationConfig?: AnimationConfig }>,
  options?: {
    defaultDuration?: number;
    defaultEasing?: string;
    stagger?: number;
  }
): {
  duration: number;
  easing: string;
  stagger: number;
  delays: number[];
} {
  const defaultDuration = options?.defaultDuration ?? 0.6;
  const defaultEasing = options?.defaultEasing ?? 'power2.out';
  const stagger = options?.stagger ?? 0.1;

  const delays = items.map((item, index) => {
    return item.animationConfig?.delay ?? index * stagger;
  });

  return {
    duration: defaultDuration,
    easing: defaultEasing,
    stagger,
    delays,
  };
}

/**
 * Get animation-ready data structure for GSAP
 */
export function getAnimationReadyData(data: {
  projects?: Project[];
  sections?: AboutSection[];
  timelineItems?: TimelineItem[];
}): {
  projects?: Array<Project & { selector: string; dataAttributes: Record<string, string> }>;
  sections?: Array<AboutSection & { selector: string; dataAttributes: Record<string, string> }>;
  timelineItems?: Array<TimelineItem & { selector: string; dataAttributes: Record<string, string> }>;
} {
  const result: any = {};

  if (data.projects) {
    result.projects = data.projects.map((project, index) => ({
      ...project,
      selector: `[data-project-id="${project.id}"]`,
      dataAttributes: generateDataAttributes(project.id, 'project', index, project.animationConfig),
    }));
  }

  if (data.sections) {
    result.sections = data.sections.map((section, index) => ({
      ...section,
      selector: `[data-section-type="${section.type}"][data-section-order="${section.order}"]`,
      dataAttributes: generateDataAttributes(section.type, 'section', index, section.animationConfig),
    }));
  }

  if (data.timelineItems) {
    result.timelineItems = data.timelineItems.map((item, index) => ({
      ...item,
      selector: `[data-timeline-index="${index}"]`,
      dataAttributes: generateDataAttributes(item.type, 'timeline', index, item.animationConfig),
    }));
  }

  return result;
}

