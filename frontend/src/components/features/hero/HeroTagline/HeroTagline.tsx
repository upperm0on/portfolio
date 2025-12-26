// HeroTagline component
// Short bio/tagline with idle effects

import { forwardRef } from 'react';
import { IdleElement } from '../Hero/IdleElement';
import type { IdleEffectConfig } from '@/types/hero';
import styles from './HeroTagline.module.css';

interface HeroTaglineProps {
  tagline: string;
  className?: string;
}

const idleConfig: IdleEffectConfig = {
  drift: 25, // 20-30px range
  rotation: 0, // No rotation
  scale: 0.98,
  opacity: 0.8,
};

export const HeroTagline = forwardRef<HTMLParagraphElement, HeroTaglineProps>(
  function HeroTagline({ tagline, className }, ref) {
    return (
      <IdleElement id="hero-tagline" config={idleConfig} className={className}>
        <p
          ref={ref}
          className={styles.tagline}
          data-hero-tagline
          data-animate-direction="up"
          data-animate-delay="0.2"
          data-depth="foreground"
          data-parallax="low"
        >
          {tagline}
        </p>
      </IdleElement>
    );
  }
);

