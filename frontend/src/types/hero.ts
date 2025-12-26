// Hero section type definitions

export type HeroVariant = 'centered' | 'asymmetric' | 'split';
export type BackgroundVariant = 'starfield' | 'nebula' | 'particles' | 'gradient' | 'none';

export interface DriftConfig {
  direction: { x: number; y: number }; // Normalized direction vector
  speed: number; // Pixels per second at max progress
  rotation: number; // Rotation in degrees
  scale: number; // Scale factor (0.8-1.0)
}

export interface IdleEffectConfig {
  drift: number; // Max drift distance in pixels
  rotation: number; // Max rotation in degrees
  scale: number; // Scale factor
  opacity: number; // Opacity factor
}

export interface HeroAnimationConfig {
  nameReveal?: {
    delay?: number;
    duration?: number;
    easing?: string;
  };
  titleFade?: {
    delay?: number;
    duration?: number;
    easing?: string;
  };
  taglineFade?: {
    delay?: number;
    duration?: number;
    easing?: string;
  };
  ctaStagger?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    easing?: string;
  };
  scrollIndicator?: {
    delay?: number;
    duration?: number;
    easing?: string;
  };
}

export interface HeroProps {
  variant?: HeroVariant;
  backgroundVariant?: BackgroundVariant;
  animationConfig?: HeroAnimationConfig;
  showScrollIndicator?: boolean;
  idleTimeout?: number; // Default: 4000ms
}

