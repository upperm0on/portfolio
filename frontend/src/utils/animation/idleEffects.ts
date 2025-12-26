// Idle effect utilities
// Calculates transforms for idle "tearing apart" effect

import { gsap } from 'gsap';
import type { DriftConfig } from '@/types/hero';

export interface IdleTransform {
  translateX: number;
  translateY: number;
  rotate: number;
  scale: number;
  opacity: number;
}

/**
 * Calculate idle transform based on progress and drift config
 */
export function calculateIdleTransform(
  progress: number, // 0-1
  config: DriftConfig
): IdleTransform {
  // Ease-out function for smooth deceleration
  const easedProgress = 1 - Math.pow(1 - progress, 3);

  const translateX = config.direction.x * config.speed * easedProgress;
  const translateY = config.direction.y * config.speed * easedProgress;
  const rotate = config.rotation * easedProgress;
  const scale = 1 - (1 - config.scale) * easedProgress;
  const opacity = 1 - (1 - 0.8) * easedProgress; // Fade to 80% opacity

  return {
    translateX,
    translateY,
    rotate,
    scale,
    opacity,
  };
}

/**
 * Generate random drift configuration for an element
 */
export function generateDriftConfig(
  driftRange: { min: number; max: number },
  rotationRange: { min: number; max: number } = { min: -5, max: 5 },
  scaleRange: { min: number; max: number } = { min: 0.9, max: 0.98 }
): DriftConfig {
  // Random direction vector (normalized)
  const angle = Math.random() * Math.PI * 2;
  const direction = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  // Random speed within range
  const speed = driftRange.min + Math.random() * (driftRange.max - driftRange.min);

  // Random rotation within range
  const rotation = rotationRange.min + Math.random() * (rotationRange.max - rotationRange.min);

  // Random scale within range
  const scale = scaleRange.min + Math.random() * (scaleRange.max - scaleRange.min);

  return {
    direction,
    speed,
    rotation,
    scale,
  };
}

/**
 * Apply idle effect to an element
 */
export function applyIdleEffect(
  element: HTMLElement,
  transform: IdleTransform
): void {
  element.style.transform = `
    translate(${transform.translateX}px, ${transform.translateY}px)
    rotate(${transform.rotate}deg)
    scale(${transform.scale})
  `.trim();
  element.style.opacity = transform.opacity.toString();
}

/**
 * Reset idle effect on an element
 */
export function resetIdleEffect(element: HTMLElement): void {
  element.style.transform = '';
  element.style.opacity = '';
}

/**
 * Create GSAP timeline for idle effect
 */
export function createIdleTimeline(
  elements: Map<string, HTMLElement>,
  driftConfigs: Map<string, DriftConfig>,
  duration: number = 2000
): gsap.core.Timeline {
  const tl = gsap.timeline();

  elements.forEach((element, id) => {
    const config = driftConfigs.get(id);
    if (!config) return;

    const maxTransform = calculateIdleTransform(1, config);

    tl.to(
      element,
      {
        x: maxTransform.translateX,
        y: maxTransform.translateY,
        rotation: maxTransform.rotate,
        scale: maxTransform.scale,
        opacity: maxTransform.opacity,
        duration: duration / 1000, // Convert to seconds
        ease: 'power2.out',
      },
      0 // Start all animations at the same time
    );
  });

  return tl;
}

