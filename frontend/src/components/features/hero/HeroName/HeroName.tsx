// HeroName component
// Large display name with idle effects

import { forwardRef } from 'react';
import { IdleElement } from '../Hero/IdleElement';
import type { IdleEffectConfig } from '@/types/hero';
import { useFloatingLetters } from '@/hooks/useFloatingLetters';
import styles from './HeroName.module.css';

interface HeroNameProps {
  name: string;
  className?: string;
}

const idleConfig: IdleEffectConfig = {
  drift: 75, // 50-100px range
  rotation: 5, // ±5 degrees
  scale: 0.95,
  opacity: 0.9,
};

export const HeroName = forwardRef<HTMLHeadingElement, HeroNameProps>(
  function HeroName({ name, className }, ref) {
    const { containerRef } = useFloatingLetters();

    // Combine refs: forward the ref and also set containerRef
    const combinedRef = (node: HTMLHeadingElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Split name into letters for rendering
    const letters = name.split('').map((char, index) => (
      <span
        key={index}
        style={{ display: 'inline-block', willChange: 'transform' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

    return (
      <IdleElement id="hero-name" config={idleConfig} className={className}>
        <h1
          ref={combinedRef}
          className={styles.name}
          data-hero-name
          data-animate-direction="up"
          data-animate-delay="0"
          data-depth="foreground"
          data-parallax="low"
        >
          {letters}
        </h1>
      </IdleElement>
    );
  }
);
