import type { ReactNode } from 'react';
import styles from './Container.module.css';

export type ContainerVariant = 'full' | 'wide' | 'standard' | 'narrow' | 'fluid';

interface ContainerProps {
  children: ReactNode;
  variant?: ContainerVariant;
  className?: string;
  'data-animate'?: string;
  'data-delay'?: string;
  'data-trigger'?: string;
}

export function Container({
  children,
  variant = 'standard',
  className,
  'data-animate': dataAnimate,
  'data-delay': dataDelay,
  'data-trigger': dataTrigger,
}: ContainerProps) {
  return (
    <div
      className={`${styles.container} ${styles[variant]} ${className || ''}`}
      data-animate={dataAnimate}
      data-delay={dataDelay}
      data-trigger={dataTrigger}
    >
      {children}
    </div>
  );
}

