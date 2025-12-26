import type { ReactNode } from 'react';
import styles from './Grid.module.css';

export type GridVariant = 'magazine-2' | 'magazine-3' | 'featured' | 'masonry';

interface GridProps {
  children: ReactNode;
  variant?: GridVariant;
  columns?: number;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
  'data-animate'?: string;
  'data-delay'?: string;
  'data-trigger'?: string;
}

export function Grid({
  children,
  variant = 'magazine-3',
  columns,
  gap = 'medium',
  className,
  'data-animate': dataAnimate,
  'data-delay': dataDelay,
  'data-trigger': dataTrigger,
}: GridProps) {
  const gapClass = styles[`gap-${gap}`];
  const customColumns = columns ? { '--grid-columns': columns } as React.CSSProperties : undefined;

  return (
    <div
      className={`${styles.grid} ${styles[variant]} ${gapClass} ${className || ''}`}
      style={customColumns}
      data-animate={dataAnimate}
      data-delay={dataDelay}
      data-trigger={dataTrigger}
    >
      {children}
    </div>
  );
}

