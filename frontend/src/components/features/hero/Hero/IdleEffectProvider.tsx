// IdleEffectProvider component
// Wraps hero content and provides idle context

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { IdleEffectProvider as ContextProvider } from '@/context/IdleEffectContext';
import { useIdleDetection } from '@/hooks/useIdleDetection';

interface IdleEffectProviderProps {
  children: ReactNode;
  idleTimeout?: number;
  containerRef?: React.RefObject<HTMLElement>;
}

export function IdleEffectProvider({ children, idleTimeout = 4000, containerRef }: IdleEffectProviderProps) {
  const { isIdle } = useIdleDetection({
    timeout: idleTimeout,
    events: ['mousemove', 'scroll', 'touch', 'keydown'],
  });

  const [idleProgress, setIdleProgress] = useState(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Update idle progress
  useEffect(() => {
    if (!isIdle) {
      setIdleProgress(0);
      startTimeRef.current = null;

      // Kill any existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      return;
    }

    // Start idle animation
    startTimeRef.current = Date.now();
    const duration = 2000; // 2 seconds to full tear

    const updateProgress = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setIdleProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [isIdle]);

  // Handle container zoom out
  useEffect(() => {
    if (!containerRef?.current) return;

    if (isIdle && idleProgress > 0) {
      const zoomScale = 1 - (idleProgress * 0.15); // 1.0 to 0.85
      gsap.to(containerRef.current, {
        scale: zoomScale,
        duration: 0.1,
        ease: 'power2.out',
      });
    } else {
      gsap.to(containerRef.current, {
        scale: 1.0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isIdle, idleProgress, containerRef]);

  return (
    <ContextProvider isIdle={isIdle} idleProgress={idleProgress}>
      {children}
    </ContextProvider>
  );
}

