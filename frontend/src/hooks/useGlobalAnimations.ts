import { useEffect, useRef } from 'react';
import { initScrollDepthAnimations } from '../utils/animation/scrollDepth';
import { initFloatingAnimations } from '../utils/animation/floating';
import { initDirectionalParallax } from '../utils/animation/directionalParallax';

/**
 * Hook to initialize all global animation systems
 * 
 * Initializes:
 * - Scroll depth animations (3D layer stack)
 * - Floating animations (idle effects)
 * - Directional parallax & reveal animations
 * 
 * Should be called once at the Layout level, after hero turn-on completes.
 */
export function useGlobalAnimations(
  rootEl?: HTMLElement | null,
  options: {
    waitForHeroTurnOn?: boolean;
    heroTurnOnComplete?: boolean;
  } = {}
) {
  const { waitForHeroTurnOn = false, heroTurnOnComplete = false } = options;
  const cleanupRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    // If waiting for hero turn-on, don't initialize until it's complete
    if (waitForHeroTurnOn && !heroTurnOnComplete) {
      return;
    }

    const root = rootEl || document.body;
    const cleanups: (() => void)[] = [];

    // Delay initialization slightly to ensure DOM is ready and ScrollTrigger can calculate positions
    const timer = setTimeout(() => {
      // Initialize scroll depth animations
      const cleanupDepth = initScrollDepthAnimations(root);
      cleanups.push(cleanupDepth);

      // Initialize floating animations
      const cleanupFloating = initFloatingAnimations(root);
      cleanups.push(cleanupFloating);

      // Initialize directional parallax & reveal animations
      // This should run after scroll depth to avoid conflicts
      const cleanupDirectional = initDirectionalParallax(root);
      cleanups.push(cleanupDirectional);

      cleanupRef.current = cleanups;
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanups.forEach((cleanup) => cleanup());
      cleanupRef.current = [];
    };
  }, [rootEl, waitForHeroTurnOn, heroTurnOnComplete]);

  return cleanupRef.current;
}

