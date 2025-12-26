// Stability return hook
// Manages return animation when user becomes active

import { useEffect, useRef, useState } from 'react';
import { animateStabilityReturn, animateZoomReturn } from '@/utils/animation/stabilityReturn';
import type { DriftConfig } from '@/types/hero';

export interface StabilityReturnOptions {
  containerRef?: React.RefObject<HTMLElement>;
  currentProgress?: number;
  duration?: number;
}

export function useStabilityReturn(
  isIdle: boolean,
  elements: Map<string, HTMLElement>,
  driftConfigs: Map<string, DriftConfig>,
  options?: StabilityReturnOptions
): {
  isReturning: boolean;
  returnProgress: number;
} {
  const { containerRef, currentProgress = 0, duration = 300 } = options || {};
  const [isReturning, setIsReturning] = useState(false);
  const [returnProgress, setReturnProgress] = useState(0);
  const previousIdleRef = useRef<boolean>(isIdle);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // If transitioning from idle to active, trigger return animation
    if (previousIdleRef.current && !isIdle) {
      setIsReturning(true);
      setReturnProgress(0);

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Animate elements back
      animateStabilityReturn(
        elements,
        driftConfigs,
        currentProgress,
        duration
      );

      // Animate container zoom back
      if (containerRef?.current) {
        const zoomTimeline = animateZoomReturn(
          containerRef.current,
          0.85, // Current zoom scale
          duration
        );
        timelineRef.current = zoomTimeline;
      }

      // Update progress during animation
      const startTime = Date.now();
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setReturnProgress(progress);

        if (progress < 1) {
          requestAnimationFrame(updateProgress);
        } else {
          setIsReturning(false);
          setReturnProgress(1);
        }
      };

      requestAnimationFrame(updateProgress);
    }

    previousIdleRef.current = isIdle;
  }, [isIdle, elements, driftConfigs, currentProgress, duration, containerRef]);

  return {
    isReturning,
    returnProgress,
  };
}

