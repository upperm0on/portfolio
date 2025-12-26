// HeroCTAs group component
// Multiple CTA buttons with layout

import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { HeroCTA } from '../HeroCTA';
import styles from './HeroCTAs.module.css';

interface CTAItem {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'icon' | 'text';
  icon?: ReactNode;
  'aria-label'?: string;
}

interface HeroCTAsProps {
  items: CTAItem[];
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export const HeroCTAs = forwardRef<HTMLDivElement, HeroCTAsProps>(
  function HeroCTAs({ items, layout = 'horizontal', className }, ref) {
    return (
      <div
        ref={ref}
        className={`${styles.ctas} ${styles[`ctas--${layout}`]} ${className || ''}`}
        data-hero-ctas
        data-animate-group="hero-ctas"
        data-animate-stagger="0.1"
        data-depth="foreground"
        data-parallax="low"
      >
        {items.map((item, index) => (
          <HeroCTA
            key={index}
            href={item.href}
            onClick={item.onClick}
            variant={item.variant}
            icon={item.icon}
            aria-label={item['aria-label']}
            data-animate-direction="up"
            data-animate-group="hero-ctas"
          >
            {item.label}
          </HeroCTA>
        ))}
      </div>
    );
  }
);

