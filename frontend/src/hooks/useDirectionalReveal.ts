import { useEffect, useRef } from 'react';
import {
  createDirectionalReveal,
  type DirectionalRevealOptions,
} from '../utils/animation/directionalParallax';
import type { DirectionalRevealDirection } from '../utils/animation/motionConfig';

export interface UseDirectionalRevealOptions extends DirectionalRevealOptions {
  direction?: DirectionalRevealDirection;
  enabled?: boolean;
}

/**
 * React hook for directional reveal animation
 * 
 * @example
 * ```tsx
 * const ref = useDirectionalReveal({ direction: 'up', delay: 0.2 });
 * return <div ref={ref}>Content</div>;
 * ```
 */
export function useDirectionalReveal(
  options: UseDirectionalRevealOptions = {}
): React.RefObject<HTMLElement> {
  const elementRef = useRef<HTMLElement>(null);
  const { enabled = true, ...revealOptions } = options;

  useEffect(() => {
    if (!enabled || !elementRef.current) {
      return;
    }

    const cleanup = createDirectionalReveal(elementRef.current, revealOptions);

    return () => {
      if (cleanup) {
        cleanup.kill();
      }
    };
  }, [enabled, revealOptions.direction, revealOptions.delay, revealOptions.duration]);

  return elementRef;
}

