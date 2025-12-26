// Floating Element Animation Hook
// Reusable hook for animating elements to float away and return on mouse movement

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

export interface UseFloatingElementOptions {
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
   * Stagger delay (in seconds)
   * @default 0
   */
  delay?: number;
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

export interface UseFloatingElementReturn {
  /**
   * Ref to attach to the element
   */
  elementRef: React.RefObject<HTMLElement>;
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
 * Hook for animating elements to float away and return on mouse movement
 * 
 * @param options Configuration options
 * @returns Object with refs and control functions
 */
export function useFloatingElement(
  options: UseFloatingElementOptions = {}
): UseFloatingElementReturn {
  const {
    enabled = true,
    distanceRange = { min: 100, max: 200 },
    scaleRange = { min: 0.3, max: 0.6 },
    durationRange = { min: 60, max: 120 },
    delay = 0,
    rotationRange = { min: -180, max: 180 },
    floatingOpacity = 0.2,
    returnDuration = 0.1,
    restartDelay = 5,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isReturningRef = useRef(false);
  const restartTimeoutRef = useRef<number | null>(null);

  // Function to start floating animation
  const startFloating = useCallback(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Kill any existing tween
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    // Reset element to original position first
    gsap.set(element, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });

    // Random direction (0 to 2π)
    const angle = Math.random() * Math.PI * 2;
    // Random distance within range
    const distance = distanceRange.min + Math.random() * (distanceRange.max - distanceRange.min);
    // Random scale down within range
    const finalScale = scaleRange.min + Math.random() * (scaleRange.max - scaleRange.min);
    // Random duration within range
    const duration = durationRange.min + Math.random() * (durationRange.max - durationRange.min);
    // Random rotation within range
    const rotation = rotationRange.min + Math.random() * (rotationRange.max - rotationRange.min);

    tweenRef.current = gsap.to(element, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotation: rotation,
      scale: finalScale,
      opacity: floatingOpacity,
      duration: duration,
      delay: delay,
      ease: 'none', // Linear ease for very slow, consistent floating
    });
  }, [
    enabled,
    distanceRange.min,
    distanceRange.max,
    scaleRange.min,
    scaleRange.max,
    durationRange.min,
    durationRange.max,
    delay,
    rotationRange.min,
    rotationRange.max,
    floatingOpacity,
  ]);

  // Function to return element to original position
  const returnToOriginal = useCallback(() => {
    const element = elementRef.current;
    if (!element || isReturningRef.current || !enabled) return;

    isReturningRef.current = true;

    // Clear any pending restart timeout
    if (restartTimeoutRef.current !== null) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    // Kill existing floating animation
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    // Animate element back to original position
    const tween = gsap.to(element, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: returnDuration,
      ease: 'power2.out',
      onComplete: () => {
        isReturningRef.current = false;
        // Wait for restart delay, then restart floating animation
        restartTimeoutRef.current = window.setTimeout(() => {
          startFloating();
          restartTimeoutRef.current = null;
        }, restartDelay * 1000);
      },
    });

    tweenRef.current = tween;
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

  // Initialize animation when element is ready
  useEffect(() => {
    if (!enabled) return;

    // Wait for element to be ready
    const checkAndStart = () => {
      if (elementRef.current) {
        startFloating();
        return true;
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
        if (tweenRef.current) {
          tweenRef.current.kill();
          tweenRef.current = null;
        }
        if (restartTimeoutRef.current !== null) {
          clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = null;
        }
      };
    }

    return () => {
      // Cleanup function
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
      if (restartTimeoutRef.current !== null) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
    };
  }, [enabled, startFloating]);

  return {
    elementRef,
    returnToOriginal,
    startFloating,
  };
}


