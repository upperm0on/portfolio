// HeroContent wrapper component
// Content container with variants and responsive layout

import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import type { HeroVariant } from '@/types/hero';
import styles from './Hero.module.css';

interface HeroContentProps {
  children: ReactNode;
  variant?: HeroVariant;
  className?: string;
}

export const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(function HeroContent(
  { children, variant = 'centered', className },
  ref
) {
  return (
    <div
      ref={ref}
      className={`${styles.content} ${styles[`content--${variant}`]} ${className || ''}`}
      data-hero-content
      data-hero-turnon-content
      data-hero-variant={variant}
    >
      {children}
    </div>
  );
});

