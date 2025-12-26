// Floating Letters Animation Hook
// Reusable hook for animating text letters to float away and return on mouse movement

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export interface UseFloatingLettersOptions {
  /**
   * Whether the animation is enabled
   * @default true
   */
  enabled?: boolean;
  /**
   * Distance range for floating (in pixels)
   * @default { min: 100, max: 200 }
   */
  distanceRange?: { min: number; max: number };
  /**
   * Scale range when floating
   * @default { min: 0.3, max: 0.6 }
   */
  scaleRange?: { min: number; max: number };
  /**
   * Duration range for floating animation (in seconds)
   * @default { min: 60, max: 120 }
   */
  durationRange?: { min: number; max: number };
  /**
   * Stagger delay range (in seconds)
   * @default { min: 0, max: 3 }
   */
  staggerDelayRange?: { min: number; max: number };
  /**
   * Rotation range (in degrees)
   * @default { min: -180, max: 180 }
   */
  rotationRange?: { min: number; max: number };
  /**
   * Opacity when floating
   * @default 0.2
   */
  floatingOpacity?: number;
  /**
   * Return animation duration (in seconds)
   * @default 0.1
   */
  returnDuration?: number;
  /**
   * Delay before restarting animation after return (in seconds)
   * @default 5
   */
  restartDelay?: number;
}

export interface UseFloatingLettersReturn {
  /**
   * Ref to attach to the container element
   */
  containerRef: React.MutableRefObject<HTMLElement | null>;
  /**
   * Function to manually trigger return animation
   */
  returnToOriginal: () => void;
  /**
   * Function to manually start floating animation
   */
  startFloating: () => void;
}

/**
 * Hook for animating letters to float away and return on mouse movement
 * 
 * @param options Configuration options
 * @returns Object with refs and control functions
 */
export function useFloatingLetters(
  options: UseFloatingLettersOptions = {}
): UseFloatingLettersReturn {
  const {
    enabled = true,
    distanceRange = { min: 100, max: 200 },
    scaleRange = { min: 0.3, max: 0.6 },
    durationRange = { min: 60, max: 120 },
    staggerDelayRange = { min: 0, max: 3 },
    rotationRange = { min: -180, max: 180 },
    floatingOpacity = 0.2,
    returnDuration = 0.1,
    restartDelay = 5,
  } = options;

  const containerRef = useRef<HTMLElement | null>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const isReturningRef = useRef(false);
  const restartTimeoutRef = useRef<number | null>(null);

  // Function to start floating animation
  const startFloating = useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement || !enabled) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Get all letter spans
    const letters = Array.from(containerElement.querySelectorAll('span')) as HTMLElement[];
    if (letters.length === 0) return;

    // Kill any existing tweens
    tweensRef.current.forEach((tween) => {
      tween.kill();
    });
    tweensRef.current = [];

    // Reset letters to original position first
    gsap.set(letters, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });

    // Animate each letter to float away in random directions (very very slow)
    letters.forEach((letter) => {
      // Random direction (0 to 2π)
      const angle = Math.random() * Math.PI * 2;
      // Random distance within range
      const distance = distanceRange.min + Math.random() * (distanceRange.max - distanceRange.min);
      // Random scale down within range
      const finalScale = scaleRange.min + Math.random() * (scaleRange.max - scaleRange.min);
      // Random duration within range
      const duration = durationRange.min + Math.random() * (durationRange.max - durationRange.min);
      // Random stagger delay within range
      const delay = staggerDelayRange.min + Math.random() * (staggerDelayRange.max - staggerDelayRange.min);
      // Random rotation within range
      const rotation = rotationRange.min + Math.random() * (rotationRange.max - rotationRange.min);

      const tween = gsap.to(letter, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: rotation,
        scale: finalScale,
        opacity: floatingOpacity,
        duration: duration,
        delay: delay,
        ease: 'none', // Linear ease for very slow, consistent floating
      });

      tweensRef.current.push(tween);
    });
  }, [
    enabled,
    distanceRange.min,
    distanceRange.max,
    scaleRange.min,
    scaleRange.max,
    durationRange.min,
    durationRange.max,
    staggerDelayRange.min,
    staggerDelayRange.max,
    rotationRange.min,
    rotationRange.max,
    floatingOpacity,
  ]);

  // Function to return letters to original positions
  const returnToOriginal = useCallback(() => {
    const containerElement = containerRef.current;
    if (!containerElement || isReturningRef.current || !enabled) return;

    isReturningRef.current = true;
    const letters = Array.from(containerElement.querySelectorAll('span')) as HTMLElement[];

    // Clear any pending restart timeout
    if (restartTimeoutRef.current !== null) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    // Kill existing floating animations
    tweensRef.current.forEach((tween) => {
      tween.kill();
    });
    tweensRef.current = [];

    // Animate all letters back to original position
    letters.forEach((letter, index) => {
      const tween = gsap.to(letter, {
        x: 0,
        y: 0,
        rotation: 0, // Reset rotation to 0
        scale: 1,
        opacity: 1,
        duration: returnDuration,
        delay: 0, // No stagger for fast return
        ease: 'power2.out',
        onComplete: () => {
          if (index === letters.length - 1) {
            isReturningRef.current = false;
            // Wait for restart delay, then restart floating animation
            restartTimeoutRef.current = window.setTimeout(() => {
              startFloating();
              restartTimeoutRef.current = null;
            }, restartDelay * 1000);
          }
        },
      });
      tweensRef.current.push(tween);
    });
  }, [enabled, returnDuration, restartDelay, startFloating]);

  // Mouse movement event handler (triggers anywhere on page)
  useEffect(() => {
    if (!enabled) return;

    // Add mouse move event listener to window (triggers anywhere on page)
    window.addEventListener('mousemove', returnToOriginal, { passive: true });

    return () => {
      window.removeEventListener('mousemove', returnToOriginal);
      // Clear timeout on cleanup
      if (restartTimeoutRef.current !== null) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    };
  }, [enabled, returnToOriginal]);

  // Initialize animation when container is ready
  useEffect(() => {
    if (!enabled) return;

    // Wait for container and letters to be ready
    const checkAndStart = () => {
      const containerElement = containerRef.current;
      if (containerElement) {
        const letters = containerElement.querySelectorAll('span');
        if (letters.length > 0) {
          startFloating();
          return true;
        }
      }
      return false;
    };

    // Try immediately, then with a small delay if needed
    if (!checkAndStart()) {
      const timeout = setTimeout(() => {
        checkAndStart();
      }, 100);

      return () => {
        clearTimeout(timeout);
        // Cleanup function
        tweensRef.current.forEach((tween) => {
          tween.kill();
        });
        tweensRef.current = [];
        if (restartTimeoutRef.current !== null) {
          clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = null;
        }
      };
    }

    return () => {
      // Cleanup function
      tweensRef.current.forEach((tween) => {
        tween.kill();
      });
      tweensRef.current = [];
      if (restartTimeoutRef.current !== null) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    };
  }, [enabled, startFloating]);

  return {
    containerRef,
    returnToOriginal,
    startFloating,
  };
}

