// Idle detection hook
// Tracks user activity and detects when user is idle

import { useState, useEffect, useCallback, useRef } from 'react';

export interface IdleDetectionOptions {
  timeout?: number; // Default: 4000ms
  events?: ('mousemove' | 'scroll' | 'touch' | 'keydown')[];
  onIdleStart?: () => void;
  onIdleEnd?: () => void;
}

export function useIdleDetection(options?: IdleDetectionOptions): {
  isIdle: boolean;
  timeSinceActivity: number;
  resetIdle: () => void;
} {
  const {
    timeout = 4000,
    events = ['mousemove', 'scroll', 'touch', 'keydown'],
    onIdleStart,
    onIdleEnd,
  } = options || {};

  const [isIdle, setIsIdle] = useState(false);
  const [timeSinceActivity, setTimeSinceActivity] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const wasIdleRef = useRef<boolean>(false);

  const resetIdle = useCallback(() => {
    lastActivityRef.current = Date.now();
    setTimeSinceActivity(0);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (wasIdleRef.current) {
      setIsIdle(false);
      wasIdleRef.current = false;
      onIdleEnd?.();
    }

    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      wasIdleRef.current = true;
      onIdleStart?.();
    }, timeout);
  }, [timeout, onIdleStart, onIdleEnd]);

  useEffect(() => {
    // Initial timeout
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      wasIdleRef.current = true;
      onIdleStart?.();
    }, timeout);

    // Event handlers
    const handleActivity = () => {
      resetIdle();
    };

    const eventMap: Record<string, () => void> = {};
    
    if (events.includes('mousemove')) {
      eventMap.mousemove = handleActivity;
      window.addEventListener('mousemove', handleActivity, { passive: true });
    }
    
    if (events.includes('scroll')) {
      eventMap.scroll = handleActivity;
      window.addEventListener('scroll', handleActivity, { passive: true });
    }
    
    if (events.includes('touch')) {
      eventMap.touchstart = handleActivity;
      eventMap.touchmove = handleActivity;
      window.addEventListener('touchstart', handleActivity, { passive: true });
      window.addEventListener('touchmove', handleActivity, { passive: true });
    }
    
    if (events.includes('keydown')) {
      eventMap.keydown = handleActivity;
      window.addEventListener('keydown', handleActivity, { passive: true });
    }

    // Also track click and wheel events
    window.addEventListener('click', handleActivity, { passive: true });
    window.addEventListener('wheel', handleActivity, { passive: true });

    // Update time since activity
    const interval = setInterval(() => {
      setTimeSinceActivity(Date.now() - lastActivityRef.current);
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('touchmove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('wheel', handleActivity);
      clearInterval(interval);
    };
  }, [events, resetIdle, timeout, onIdleStart]);

  return {
    isIdle,
    timeSinceActivity,
    resetIdle,
  };
}

