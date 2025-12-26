/**
 * Hero Turn-On "Light Bulb" Effect
 * 
 * Creates a dramatic power-on animation for the hero section:
 * - Initial delay (~1s) where hero is visually "off"
 * - Quick flicker flashes simulating a light bulb turning on
 * - Smooth stabilization to the normal state
 * - Respects prefers-reduced-motion
 */

import { gsap } from 'gsap';

// ============================================================================
// TIMING & VISUAL PARAMETERS
// ============================================================================

export const HERO_TURNON_CONFIG = {
  // Initial delay before turn-on sequence starts (ms)
  delay: 300, // Reduced from 1000ms for faster appearance
  
  // Flash 1 - Power surge (strongest flash)
  flash1: {
    duration: 0.12,
    opacity: { peak: 1.0, low: 0.25 },
    scale: { peak: 1.02, low: 0.98 },
    backgroundGlow: 1.4, // Multiplier for background brightness
  },
  
  // Flash 2 - Secondary flicker (softer)
  flash2: {
    duration: 0.15,
    opacity: { peak: 0.8, low: 0.3 },
    scale: { peak: 1.01, low: 0.99 },
    backgroundGlow: 1.2,
  },
  
  // Stabilization - smooth settle to final state
  stabilize: {
    duration: 0.5,
    ease: 'power3.out',
  },
  
  // Initial "off" state
  initial: {
    opacity: 0,
    scale: 0.97,
    blur: 5, // px
    backgroundOpacity: 0.3,
  },
  
  // Final stable state
  final: {
    opacity: 1,
    scale: 1.0,
    blur: 0,
    backgroundOpacity: 1,
  },
  
  // Reduced motion - simple fade-in
  reducedMotion: {
    duration: 0.45,
    ease: 'power2.out',
  },
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface HeroTurnOnElements {
  root: HTMLElement;
  background?: HTMLElement | null;
  content?: HTMLElement | null;
}

export interface HeroTurnOnOptions {
  onStart?: () => void;
  onComplete?: () => void;
  reducedMotion?: boolean;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Apply initial "off" state to hero elements
 */
export function setHeroTurnOnInitialState(elements: HeroTurnOnElements): void {
  const { root, background, content } = elements;
  const config = HERO_TURNON_CONFIG.initial;
  
  // Set root container to initial off state
  // Note: Removed blur from initial state to prevent blur getting stuck
  gsap.set(root, {
    opacity: config.opacity,
    scale: config.scale,
    // Removed blur - only using opacity/scale for the effect
  });
  
  // Dim the background
  if (background) {
    gsap.set(background, {
      opacity: config.backgroundOpacity,
    });
  }
  
  // Content inherits from root, but we can set it explicitly too
  if (content) {
    gsap.set(content, {
      opacity: 1, // Content opacity is controlled by root
    });
  }
}

/**
 * Clear initial state (for reduced motion or JS disabled fallback)
 */
export function clearHeroTurnOnInitialState(elements: HeroTurnOnElements): void {
  const { root, background, content } = elements;
  
  gsap.set(root, {
    opacity: 1,
    scale: 1,
    filter: 'none', // Explicitly remove blur
    clearProps: 'filter',
  });
  
  if (background) {
    gsap.set(background, { opacity: 1 });
  }
  
  if (content) {
    gsap.set(content, { clearProps: 'opacity' });
  }
}

// ============================================================================
// TIMELINE CREATION
// ============================================================================

/**
 * Create the hero turn-on timeline with flicker effect
 */
export function createHeroTurnOnTimeline(
  elements: HeroTurnOnElements,
  options: HeroTurnOnOptions = {}
): gsap.core.Timeline {
  const { root, background } = elements;
  const { onStart, onComplete, reducedMotion = prefersReducedMotion() } = options;
  const config = HERO_TURNON_CONFIG;
  
  const tl = gsap.timeline({
    paused: true,
    onStart,
    onComplete,
  });
  
  // Reduced motion: simple, elegant fade-in
  if (reducedMotion) {
    tl.to(root, {
      opacity: config.final.opacity,
      scale: config.final.scale,
      filter: 'none', // No blur for reduced motion
      duration: config.reducedMotion.duration,
      ease: config.reducedMotion.ease,
    });
    
    if (background) {
      tl.to(background, {
        opacity: config.final.backgroundOpacity,
        duration: config.reducedMotion.duration,
        ease: config.reducedMotion.ease,
      }, 0);
    }
    
    // Ensure filter is completely removed
    tl.set(root, { 
      filter: 'none',
      clearProps: 'filter' 
    });
    
    return tl;
  }
  
  // Full turn-on sequence with flickers
  // Note: Removed blur from flashes to avoid blur getting stuck
  
  // Ensure we start from invisible state
  tl.set(root, {
    opacity: 0,
    scale: config.initial.scale,
    filter: 'none',
    immediateRender: true,
  });
  
  if (background) {
    tl.set(background, {
      opacity: config.initial.backgroundOpacity,
      immediateRender: true,
    }, 0);
  }
  
  // --- FLASH 1: Power surge (strongest) ---
  const flash1 = config.flash1;
  const flash1Half = flash1.duration / 2;
  
  // Quick rise to peak
  tl.to(root, {
    opacity: flash1.opacity.peak,
    scale: flash1.scale.peak,
    filter: 'none', // No blur during flashes
    duration: flash1Half,
    ease: 'power2.in',
  });
  
  if (background) {
    tl.to(background, {
      opacity: flash1.backgroundGlow,
      duration: flash1Half,
      ease: 'power2.in',
    }, '<');
  }
  
  // Quick drop back
  tl.to(root, {
    opacity: flash1.opacity.low,
    scale: flash1.scale.low,
    filter: 'none', // Keep filter cleared
    duration: flash1Half,
    ease: 'power1.out',
  });
  
  if (background) {
    tl.to(background, {
      opacity: config.initial.backgroundOpacity * 1.5,
      duration: flash1Half,
      ease: 'power1.out',
    }, '<');
  }
  
  // --- FLASH 2: Secondary flicker (softer) ---
  const flash2 = config.flash2;
  const flash2Half = flash2.duration / 2;
  
  // Rise to secondary peak
  tl.to(root, {
    opacity: flash2.opacity.peak,
    scale: flash2.scale.peak,
    filter: 'none', // No blur during flashes
    duration: flash2Half,
    ease: 'power1.inOut',
  });
  
  if (background) {
    tl.to(background, {
      opacity: flash2.backgroundGlow,
      duration: flash2Half,
      ease: 'power1.inOut',
    }, '<');
  }
  
  // Drop again
  tl.to(root, {
    opacity: flash2.opacity.low,
    scale: flash2.scale.low,
    filter: 'none', // Keep filter cleared
    duration: flash2Half,
    ease: 'power1.out',
  });
  
  if (background) {
    tl.to(background, {
      opacity: config.initial.backgroundOpacity * 1.2,
      duration: flash2Half,
      ease: 'power1.out',
    }, '<');
  }
  
  // --- STABILIZATION: Smooth settle to final state ---
  const stabilize = config.stabilize;
  
  tl.to(root, {
    opacity: config.final.opacity,
    scale: config.final.scale,
    filter: 'none', // Explicitly ensure no blur
    duration: stabilize.duration,
    ease: stabilize.ease,
  });
  
  if (background) {
    tl.to(background, {
      opacity: config.final.backgroundOpacity,
      duration: stabilize.duration,
      ease: stabilize.ease,
    }, '<');
  }
  
  // Final cleanup - ensure filter is completely removed
  tl.set(root, { 
    filter: 'none',
    clearProps: 'filter' 
  });
  
  return tl;
}

/**
 * Get total duration of the turn-on sequence (for coordination)
 */
export function getHeroTurnOnDuration(reducedMotion = prefersReducedMotion()): number {
  const config = HERO_TURNON_CONFIG;
  
  if (reducedMotion) {
    return config.reducedMotion.duration;
  }
  
  return (
    config.flash1.duration +
    config.flash2.duration +
    config.stabilize.duration
  );
}

/**
 * Get total time including initial delay
 */
export function getHeroTurnOnTotalTime(reducedMotion = prefersReducedMotion()): number {
  return (HERO_TURNON_CONFIG.delay / 1000) + getHeroTurnOnDuration(reducedMotion);
}

