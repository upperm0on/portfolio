// HeroCTA button component
// Call-to-action button with variants and idle effects

import type { ReactNode } from 'react';
import { IdleElement } from '../Hero/IdleElement';
import type { IdleEffectConfig } from '@/types/hero';
import styles from './HeroCTA.module.css';

export type CTAVariant = 'primary' | 'secondary' | 'icon' | 'text';

interface HeroCTAProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: CTAVariant;
  icon?: ReactNode;
  className?: string;
  'aria-label'?: string;
  'data-animate-direction'?: string;
  'data-animate-group'?: string;
}

const idleConfig: IdleEffectConfig = {
  drift: 20, // 15-25px range
  rotation: 3, // ±3 degrees
  scale: 0.96,
  opacity: 0.9,
};

export function HeroCTA({
  children,
  href,
  onClick,
  variant = 'primary',
  icon,
  className,
  'aria-label': ariaLabel,
  'data-animate-direction': dataAnimateDirection,
  'data-animate-group': dataAnimateGroup,
}: HeroCTAProps) {
  const buttonId = `hero-cta-${Math.random().toString(36).substr(2, 9)}`;

  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.text}>{children}</span>}
    </>
  );

  const buttonClasses = `${styles.cta} ${styles[`cta--${variant}`]} ${className || ''}`;

  if (href) {
    return (
      <IdleElement id={buttonId} config={idleConfig} className={styles.wrapper}>
        <a
          href={href}
          className={buttonClasses}
          data-hero-cta
          aria-label={ariaLabel}
          data-animate-direction={dataAnimateDirection}
          data-animate-group={dataAnimateGroup}
        >
          {content}
        </a>
      </IdleElement>
    );
  }

  return (
    <IdleElement id={buttonId} config={idleConfig} className={styles.wrapper}>
      <button
        onClick={onClick}
        className={buttonClasses}
        data-hero-cta
        aria-label={ariaLabel}
        data-animate-direction={dataAnimateDirection}
        data-animate-group={dataAnimateGroup}
      >
        {content}
      </button>
    </IdleElement>
  );
}

