// IdleElement wrapper component
// Wraps hero elements and applies idle transforms

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useIdleEffectContext } from '@/context/IdleEffectContext';
import { generateDriftConfig, calculateIdleTransform, applyIdleEffect, resetIdleEffect } from '@/utils/animation/idleEffects';
import type { IdleEffectConfig } from '@/types/hero';
import styles from './IdleElement.module.css';

interface IdleElementProps {
  children: ReactNode;
  id: string;
  config?: IdleEffectConfig;
  className?: string;
}

export function IdleElement({ children, id, config, className }: IdleElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isIdle, idleProgress, registerElement, unregisterElement } = useIdleEffectContext();
  const driftConfigRef = useRef(createDriftConfig(config));
  const animationFrameRef = useRef<number | null>(null);

  // Create drift config based on element config
  function createDriftConfig(elementConfig?: IdleEffectConfig) {
    if (!elementConfig) {
      return generateDriftConfig(
        { min: 20, max: 50 },
        { min: -2, max: 2 },
        { min: 0.95, max: 0.98 }
      );
    }

    const driftRange = {
      min: elementConfig.drift * 0.5,
      max: elementConfig.drift,
    };

    const rotationRange = {
      min: -elementConfig.rotation,
      max: elementConfig.rotation,
    };

    const scaleRange = {
      min: elementConfig.scale,
      max: Math.min(elementConfig.scale + 0.03, 1),
    };

    return generateDriftConfig(driftRange, rotationRange, scaleRange);
  }

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    registerElement(id, element);

    return () => {
      unregisterElement(id);
    };
  }, [id, registerElement, unregisterElement]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateTransform = () => {
      if (isIdle && idleProgress > 0) {
        const transform = calculateIdleTransform(idleProgress, driftConfigRef.current);
        applyIdleEffect(element, transform);
      } else {
        resetIdleEffect(element);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(updateTransform);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isIdle, idleProgress]);

  return (
    <div
      ref={elementRef}
      className={`${styles.idleElement} ${className || ''}`}
      data-idle-element={id}
    >
      {children}
    </div>
  );
}

