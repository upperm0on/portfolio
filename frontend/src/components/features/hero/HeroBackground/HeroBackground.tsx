// HeroBackground component
// Background effects with variants

import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { IdleElement } from '../Hero/IdleElement';
import { Starfield } from './Starfield';
import { Nebula } from './Nebula';
import type { BackgroundVariant } from '@/types/hero';
import type { IdleEffectConfig } from '@/types/hero';
import styles from './HeroBackground.module.css';

interface HeroBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
}

const idleConfig: IdleEffectConfig = {
  drift: 30, // Parallax drift
  rotation: 0,
  scale: 0.9,
  opacity: 0.7,
};

export const HeroBackground = forwardRef<HTMLDivElement, HeroBackgroundProps>(
  function HeroBackground({ variant = 'starfield', className }, ref) {
    if (variant === 'none') {
      return null;
    }

    let backgroundContent: ReactNode;

    switch (variant) {
      case 'starfield':
        backgroundContent = <Starfield />;
        break;
      case 'nebula':
        backgroundContent = <Nebula />;
        break;
      case 'particles':
        // Particles component can be added later
        backgroundContent = <Starfield />;
        break;
      case 'gradient':
        backgroundContent = <div className={styles.gradient} />;
        break;
      default:
        backgroundContent = <Starfield />;
    }

    return (
      <IdleElement id="hero-background" config={idleConfig} className={className}>
        <div ref={ref} className={styles.background} data-hero-background data-hero-turnon-background>
          {backgroundContent}
        </div>
      </IdleElement>
    );
  }
);

