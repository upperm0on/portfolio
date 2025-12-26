// Stability return animation utilities
// Handles smooth return to stable state when user becomes active

import { gsap } from 'gsap';
import type { DriftConfig } from '@/types/hero';
import { calculateIdleTransform } from './idleEffects';

/**
 * Animate elements back to stable position
 */
export function animateStabilityReturn(
  elements: Map<string, HTMLElement>,
  driftConfigs: Map<string, DriftConfig>,
  currentProgress: number,
  duration: number = 300
): gsap.core.Timeline {
  const tl = gsap.timeline();

  // Calculate current transforms
  const currentTransforms = new Map<string, ReturnType<typeof calculateIdleTransform>>();
  elements.forEach((_element, id) => {
    const config = driftConfigs.get(id);
    if (config) {
      currentTransforms.set(id, calculateIdleTransform(currentProgress, config));
    }
  });

  // Animate back to origin with slight stagger
  let stagger = 0;
  elements.forEach((element, _id) => {
    tl.to(
      element,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: duration / 1000, // Convert to seconds
        ease: 'power2.out',
      },
      stagger
    );
    stagger += 0.02; // 20ms stagger between elements
  });

  return tl;
}

/**
 * Animate container zoom back to 1.0
 */
export function animateZoomReturn(
  container: HTMLElement,
  _currentScale: number,
  duration: number = 300
): gsap.core.Timeline {
  const tl = gsap.timeline();

  tl.to(container, {
    scale: 1.0,
    duration: duration / 1000,
    ease: 'power2.out',
  });

  return tl;
}

