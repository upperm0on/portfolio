// HeroScrollIndicator component
// Scroll indicator with bounce animation

import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { IdleElement } from '../Hero/IdleElement';
import type { IdleEffectConfig } from '@/types/hero';
import styles from './HeroScrollIndicator.module.css';

const idleConfig: IdleEffectConfig = {
  drift: 20, // 20px downward drift
  rotation: 0,
  scale: 0.9,
  opacity: 0.5,
};

interface HeroScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

export const HeroScrollIndicator = forwardRef<HTMLButtonElement, HeroScrollIndicatorProps>(
  function HeroScrollIndicator({ targetId = '#about', className }, ref) {
    const handleClick = () => {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    return (
      <IdleElement id="hero-scroll-indicator" config={idleConfig} className={className}>
        <button
          ref={ref}
          className={styles.indicator}
          onClick={handleClick}
          aria-label="Scroll to next section"
          data-hero-scroll-indicator
        >
          <ChevronDown size={24} aria-hidden="true" />
        </button>
      </IdleElement>
    );
  }
);

