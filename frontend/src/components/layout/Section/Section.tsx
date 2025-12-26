import type { ReactNode } from 'react';
import styles from './Section.module.css';

export type SectionVariant = 'spacious' | 'compact' | 'full-height' | 'with-background';

interface SectionProps {
  children: ReactNode;
  id?: string;
  variant?: SectionVariant;
  className?: string;
  backgroundVariant?: 'cosmic' | 'nebula' | 'gradient' | 'none';
  'data-animate'?: string;
  'data-delay'?: string;
  'data-trigger'?: string;
}

export function Section({
  children,
  id,
  variant = 'spacious',
  className,
  backgroundVariant = 'none',
  'data-animate': dataAnimate,
  'data-delay': dataDelay,
  'data-trigger': dataTrigger,
}: SectionProps) {
  const backgroundClass = backgroundVariant !== 'none' ? styles[`bg-${backgroundVariant}`] : '';

  return (
    <section
      id={id}
      className={`${styles.section} ${styles[variant]} ${backgroundClass} ${className || ''}`}
      data-animate={dataAnimate}
      data-delay={dataDelay}
      data-trigger={dataTrigger}
      data-depth="mid"
    >
      {children}
    </section>
  );
}

