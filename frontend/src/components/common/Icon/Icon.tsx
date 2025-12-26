// Reusable Icon Component
// Wrapper for Lucide icons with consistent styling

import { type LucideIcon } from 'lucide-react';
import styles from './Icon.module.css';

export interface IconProps {
  icon: LucideIcon;
  size?: number | string;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export function Icon({
  icon: IconComponent,
  size = 24,
  className = '',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = false,
}: IconProps) {
  return (
    <IconComponent
      size={size}
      className={`${styles.icon} ${className}`}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  );
}

