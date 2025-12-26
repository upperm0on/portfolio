// HeroTitle component
// Professional title with idle effects

import { forwardRef } from 'react';
import { IdleElement } from '../Hero/IdleElement';
import type { IdleEffectConfig } from '@/types/hero';
import styles from './HeroTitle.module.css';

interface HeroTitleProps {
  title: string;
  className?: string;
}

const idleConfig: IdleEffectConfig = {
  drift: 40, // 30-50px range
  rotation: 2, // ±2 degrees
  scale: 0.97,
  opacity: 0.85,
};

export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  function HeroTitle({ title, className }, ref) {
    return (
      <IdleElement id="hero-title" config={idleConfig} className={className}>
        <h2
          ref={ref}
          className={styles.title}
          data-hero-title
          data-animate-direction="up"
          data-animate-delay="0.1"
          data-depth="foreground"
          data-parallax="low"
        >
          {title}
        </h2>
      </IdleElement>
    );
  }
);

