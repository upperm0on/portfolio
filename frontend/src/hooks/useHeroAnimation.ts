// Hero animation hook
// Coordinates all hero section animations
// Designed to work with useHeroTurnOn for sequenced animations

import { useEffect, useRef } from 'react';
import {
  animateNameReveal,
  animateHeroContent,
  animateCTAs,
  animateScrollIndicator,
  animateBackground,
} from '@/utils/animation/heroAnimations';

interface UseHeroAnimationOptions {
  /** Whether animations should run (use to wait for turn-on) */
  enabled?: boolean;
  nameElement?: HTMLElement | null;
  titleElement?: HTMLElement | null;
  taglineElement?: HTMLElement | null;
  ctaElements?: HTMLElement[];
  scrollIndicatorElement?: HTMLElement | null;
  backgroundElement?: HTMLElement | null;
}

export function useHeroAnimation(options: UseHeroAnimationOptions = {}) {
  const {
    enabled = true,
    nameElement,
    titleElement,
    taglineElement,
    ctaElements = [],
    scrollIndicatorElement,
    backgroundElement,
  } = options;

  const hasAnimatedRef = useRef(false);
  const prevEnabledRef = useRef(enabled);

  // Track if enabled changed from false -> true
  useEffect(() => {
    // If enabled just became true and we haven't animated yet
    if (enabled && !prevEnabledRef.current) {
      hasAnimatedRef.current = false; // Allow animation to run
    }
    prevEnabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    if (!enabled || hasAnimatedRef.current) return;

    // Small delay to ensure DOM is ready and refs are set
    const timeout = setTimeout(() => {
      // Check if reduced motion is preferred
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        // Just show elements without animation
        [nameElement, titleElement, taglineElement, ...ctaElements, scrollIndicatorElement, backgroundElement].forEach(
          (el) => {
            if (el) {
              el.style.opacity = '1';
              el.style.transform = '';
            }
          }
        );
        hasAnimatedRef.current = true;
        return;
      }

      // Animate background first (if provided - may be handled by turn-on)
      if (backgroundElement) {
        animateBackground(backgroundElement, 0);
      }

      // Animate name reveal (faster timing since turn-on provides the dramatic pause)
      if (nameElement) {
        animateNameReveal(nameElement, 0.1, 0.8);
      }

      // Animate title and tagline
      const contentElements = [titleElement, taglineElement].filter(Boolean) as HTMLElement[];
      if (contentElements.length > 0) {
        animateHeroContent(contentElements, 0.3, 0.1);
      }

      // Animate CTAs
      if (ctaElements.length > 0) {
        animateCTAs(ctaElements, 0.6, 0.1);
      }

      // Animate scroll indicator
      if (scrollIndicatorElement) {
        animateScrollIndicator(scrollIndicatorElement, 0.9);
      }

      hasAnimatedRef.current = true;
    }, 50); // Reduced delay since turn-on already provided the main pause

    return () => clearTimeout(timeout);
  }, [
    enabled,
    nameElement,
    titleElement,
    taglineElement,
    ctaElements.length, // Use length instead of array to avoid unnecessary re-renders
    scrollIndicatorElement,
    backgroundElement,
  ]);
}
