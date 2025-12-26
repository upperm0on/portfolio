/**
 * useHeroTurnOn Hook
 * 
 * React hook that manages the hero "turn-on" light bulb effect:
 * - Applies initial "off" state on mount
 * - Waits for specified delay, then plays the turn-on timeline
 * - Exposes completion state for coordinating with other animations
 * - Handles cleanup on unmount
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  HERO_TURNON_CONFIG,
  setHeroTurnOnInitialState,
  clearHeroTurnOnInitialState,
  createHeroTurnOnTimeline,
  prefersReducedMotion,
  type HeroTurnOnElements,
} from '@/utils/animation/heroTurnOn';

export interface UseHeroTurnOnOptions {
  /** Whether the effect is enabled (default: true) */
  enabled?: boolean;
  /** Callback when turn-on animation starts */
  onStart?: () => void;
  /** Callback when turn-on animation completes */
  onComplete?: () => void;
  /** Custom delay in ms (overrides config default) */
  delay?: number;
}

export interface UseHeroTurnOnReturn {
  /** Whether the hero has completed its turn-on animation */
  isTurnedOn: boolean;
  /** Whether the turn-on animation is currently playing */
  isAnimating: boolean;
  /** Manually trigger the turn-on (useful for replay/demo) */
  triggerTurnOn: () => void;
  /** Force-complete the turn-on (skip animation) */
  skipTurnOn: () => void;
}

/**
 * Hook to manage the hero turn-on animation sequence
 */
export function useHeroTurnOn(
  elements: HeroTurnOnElements | null,
  options: UseHeroTurnOnOptions = {}
): UseHeroTurnOnReturn {
  const {
    enabled = true,
    onStart,
    onComplete,
    delay = HERO_TURNON_CONFIG.delay,
  } = options;

  const [isTurnedOn, setIsTurnedOn] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const delayTimeoutRef = useRef<number | null>(null);
  const hasInitializedRef = useRef(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (delayTimeoutRef.current !== null) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  // Force-complete the turn-on (skip animation)
  const skipTurnOn = useCallback(() => {
    cleanup();
    if (elements) {
      clearHeroTurnOnInitialState(elements);
    }
    setIsAnimating(false);
    setIsTurnedOn(true);
    onComplete?.();
  }, [elements, cleanup, onComplete]);

  // Trigger the turn-on animation
  const triggerTurnOn = useCallback(() => {
    if (!elements?.root || isAnimating || isTurnedOn) return;

    setIsAnimating(true);
    
    const timeline = createHeroTurnOnTimeline(elements, {
      reducedMotion: prefersReducedMotion(),
      onStart: () => {
        onStart?.();
      },
      onComplete: () => {
        setIsAnimating(false);
        setIsTurnedOn(true);
        timelineRef.current = null;
        onComplete?.();
      },
    });

    timelineRef.current = timeline;
    timeline.play();
  }, [elements, isAnimating, isTurnedOn, onStart, onComplete]);

  // Main effect: initialize and start sequence
  useEffect(() => {
    // Skip if disabled or no elements
    if (!enabled || !elements?.root) {
      // If elements are null but we should be enabled, ensure hero is visible as fallback
      if (enabled && !elements?.root) {
        // Fallback: make sure hero isn't stuck invisible or blurry
        const heroRoot = document.querySelector('[data-hero-root]') as HTMLElement | null;
        if (heroRoot) {
          // Clear any stuck initial state including blur
          gsap.set(heroRoot, { 
            opacity: 1, 
            scale: 1, 
            filter: 'none',
            clearProps: 'all' 
          });
        }
      }
      return;
    }

    // Skip if already initialized (prevent re-initialization)
    if (hasInitializedRef.current) {
      return;
    }

    // Safety: Clear any existing blur first
    gsap.set(elements.root, {
      filter: 'none',
      clearProps: 'filter'
    });

    // Check for reduced motion preference
    const reducedMotion = prefersReducedMotion();

    // Apply initial "off" state
    setHeroTurnOnInitialState(elements);
    hasInitializedRef.current = true;

    // Schedule the turn-on animation after delay
    const effectiveDelay = reducedMotion ? delay * 0.5 : delay;
    
    delayTimeoutRef.current = window.setTimeout(() => {
      triggerTurnOn();
    }, effectiveDelay);

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [enabled, elements, delay, triggerTurnOn, cleanup]);

  return {
    isTurnedOn,
    isAnimating,
    triggerTurnOn,
    skipTurnOn,
  };
}

