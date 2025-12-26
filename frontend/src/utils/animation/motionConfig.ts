/**
 * Motion Configuration System
 * 
 * This file defines the central configuration for the scroll depth and floating systems.
 * It serves as the single source of truth for animation intensities, durations, and scales.
 */

// --- Attribute Contracts ---

/**
 * Depth Model (data-depth)
 * 
 * background: starfield, nebula, deep gradients. Low scale changes, strong parallax.
 * mid: main sections (hero, about, projects, contact). Standard depth scroll effects.
 * foreground: key text, CTAs, cards. Quicker response, smaller scale swings.
 * ui: header, overlays, cursor. Stable, minimal to no depth motion.
 */
export type DepthLevel = 'background' | 'mid' | 'foreground' | 'ui';

/**
 * Floating Levels (data-float)
 * 
 * none: No floating motion.
 * low: Tiny motion, good for text/headings.
 * medium: Moderate motion, good for icons, badges, cards.
 * high: Noticeable motion, used for decorative background elements.
 */
export type FloatLevel = 'none' | 'low' | 'medium' | 'high';

/**
 * Directional Reveal Directions (data-animate-direction)
 * 
 * up: Slides up into place (from below)
 * down: Slides down into place (from above)
 * left: Slides in from left
 * right: Slides in from right
 * in: Zooms in (scale from smaller)
 * out: Zooms out (scale from larger)
 */
export type DirectionalRevealDirection = 'up' | 'down' | 'left' | 'right' | 'in' | 'out';

/**
 * Parallax Intensity Levels (data-parallax)
 * 
 * none: No parallax motion (default)
 * low: Subtle parallax movement (±10-15px)
 * medium: Moderate parallax movement (±20-30px)
 * high: Strong parallax movement (±40-60px)
 */
export type ParallaxLevel = 'none' | 'low' | 'medium' | 'high';

// --- Motion Config Spec ---

export interface DepthConfig {
  zPosition: number; // Z-depth in 3D space (negative = further back, positive = closer)
  scale: {
    enter: number;
    exit: number;
    base: number;
  };
  opacity: {
    enter: number;
    exit: number;
    base: number;
  };
  blur: {
    enter: number;
    exit: number;
    base: number;
  };
  parallaxFactor: number;
}

export interface FloatConfig {
  amplitude: {
    active: { x: number; y: number };
    idle: { x: number; y: number };
  };
  duration: number;
  ease: string;
}

export interface DirectionalRevealConfig {
  offset: {
    x: number;
    y: number;
    scale: number;
  };
  blur: number;
  duration: number;
  ease: string;
}

export interface ParallaxConfig {
  offsetRange: number; // Total Y translation range (±offsetRange/2)
  ease: string;
}

export const MOTION_CONFIG = {
  depth: {
    background: {
      zPosition: -2000, // Far back in 3D space
      scale: { enter: 0.3, exit: 0.5, base: 0.4 },
      opacity: { enter: 0.2, exit: 0.4, base: 0.3 },
      blur: { enter: 0, exit: 0, base: 0 },
      parallaxFactor: 0.1,
    },
    mid: {
      zPosition: 0,
      scale: { enter: 0.3, exit: 1.2, base: 1.0 },
      opacity: { enter: 0, exit: 0.8, base: 1.0 },
      blur: { enter: 0, exit: 0, base: 0 },
      parallaxFactor: 1.0,
    },
    foreground: {
      zPosition: 500, // Closer to viewer
      scale: { enter: 0.6, exit: 0.95, base: 1.0 },
      opacity: { enter: 0, exit: 0.95, base: 1.0 },
      blur: { enter: 0, exit: 0, base: 0 },
      parallaxFactor: 1.2,
    },
    ui: {
      zPosition: 1000, // Closest - always visible
      scale: { enter: 1.0, exit: 1.0, base: 1.0 },
      opacity: { enter: 1.0, exit: 1.0, base: 1.0 },
      blur: { enter: 0, exit: 0, base: 0 },
      parallaxFactor: 0,
    },
  } as Record<DepthLevel, DepthConfig>,

  float: {
    none: {
      amplitude: {
        active: { x: 0, y: 0 },
        idle: { x: 0, y: 0 },
      },
      duration: 0,
      ease: 'none',
    },
    low: {
      amplitude: {
        active: { x: 0, y: 4 },
        idle: { x: 0, y: 6 },
      },
      duration: 5, // seconds
      ease: 'sine.inOut',
    },
    medium: {
      amplitude: {
        active: { x: 2, y: 8 },
        idle: { x: 4, y: 12 },
      },
      duration: 7,
      ease: 'sine.inOut',
    },
    high: {
      amplitude: {
        active: { x: 5, y: 15 },
        idle: { x: 10, y: 20 },
      },
      duration: 9,
      ease: 'sine.inOut',
    },
  } as Record<FloatLevel, FloatConfig>,

  idle: {
    timeout: 4000, // ms
    transitionDuration: 1.5, // seconds to transition between active/idle float
  },

  performance: {
    useBlur: false,
    maxBlur: 0,
    willChange: true,
  },
  
  // 3D Layer Stack Configuration
  perspective: {
    distance: 2000,
    origin: '50% 50%',
    sectionSpacing: 1500, // Z-distance between each section layer
  },

  // Directional Reveal Configuration
  directionalReveal: {
    up: {
      offset: { x: 0, y: 50, scale: 1 },
      blur: 0,
      duration: 0.7,
      ease: 'power2.out',
    },
    down: {
      offset: { x: 0, y: -50, scale: 1 },
      blur: 0,
      duration: 0.7,
      ease: 'power2.out',
    },
    left: {
      offset: { x: 60, y: 0, scale: 1 },
      blur: 0,
      duration: 0.7,
      ease: 'power2.out',
    },
    right: {
      offset: { x: -60, y: 0, scale: 1 },
      blur: 0,
      duration: 0.7,
      ease: 'power2.out',
    },
    in: {
      offset: { x: 0, y: 0, scale: 0.9 },
      blur: 0,
      duration: 0.8,
      ease: 'power3.out',
    },
    out: {
      offset: { x: 0, y: 0, scale: 1.1 },
      blur: 0,
      duration: 0.8,
      ease: 'power3.out',
    },
  } as Record<DirectionalRevealDirection, DirectionalRevealConfig>,

  // Parallax Configuration
  parallax: {
    none: {
      offsetRange: 0,
      ease: 'none',
    },
    low: {
      offsetRange: 12, // ±6px
      ease: 'power1.out',
    },
    medium: {
      offsetRange: 25, // ±12.5px
      ease: 'power1.out',
    },
    high: {
      offsetRange: 50, // ±25px
      ease: 'power1.out',
    },
  } as Record<ParallaxLevel, ParallaxConfig>,

  // Stagger Configuration
  stagger: {
    text: 0.05, // Small items, text lines
    cards: 0.1, // Cards, larger items
  },
};

