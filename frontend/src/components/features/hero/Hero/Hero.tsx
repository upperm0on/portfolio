// Main Hero component
// Full viewport hero section with idle effects and turn-on animation

import { useRef, forwardRef } from 'react';
import type { ReactNode } from 'react';
import { IdleEffectProvider } from './IdleEffectProvider';
import { HeroContent } from './HeroContent';
import type { HeroProps } from '@/types/hero';
import styles from './Hero.module.css';

export const Hero = forwardRef<HTMLElement, HeroProps & { children?: ReactNode }>(function Hero({
  variant = 'centered',
  idleTimeout = 4000,
  children,
}, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Combine refs - forward ref to section element
  const combinedRef = (node: HTMLElement | null) => {
    containerRef.current = node as HTMLDivElement;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <section
      ref={combinedRef}
      className={styles.hero}
      data-hero-section
      data-hero-root
      data-hero-turnon="true"
      data-hero-idle="true"
      data-floating="true"
      id="home"
    >
      <IdleEffectProvider idleTimeout={idleTimeout} containerRef={containerRef}>
        <HeroContent variant={variant}>
          {children}
        </HeroContent>
      </IdleEffectProvider>
    </section>
  );
});

