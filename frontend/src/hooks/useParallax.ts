import { useEffect, useRef } from 'react';
import {
  createParallaxEffect,
  type ParallaxOptions,
} from '../utils/animation/directionalParallax';
import type { ParallaxLevel, DepthLevel } from '../utils/animation/motionConfig';

export interface UseParallaxOptions extends ParallaxOptions {
  level?: ParallaxLevel;
  depth?: DepthLevel;
  enabled?: boolean;
}

/**
 * React hook for parallax effect
 * 
 * @example
 * ```tsx
 * const ref = useParallax({ level: 'medium', depth: 'foreground' });
 * return <div ref={ref}>Content</div>;
 * ```
 */
export function useParallax(options: UseParallaxOptions = {}): React.RefObject<HTMLElement> {
  const elementRef = useRef<HTMLElement>(null);
  const { enabled = true, ...parallaxOptions } = options;

  useEffect(() => {
    if (!enabled || !elementRef.current) {
      return;
    }

    const trigger = createParallaxEffect(elementRef.current, parallaxOptions);

    return () => {
      if (trigger) {
        trigger.kill();
      }
    };
  }, [enabled, parallaxOptions.level, parallaxOptions.depth]);

  return elementRef;
}

