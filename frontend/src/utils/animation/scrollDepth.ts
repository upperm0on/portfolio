/**
 * Scroll Depth Animation - 3D Layer Stack
 * 
 * Simple concept: Sections are layers stacked in Z-space.
 * Scrolling moves forward through layers (zoom-in effect).
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION_CONFIG, type DepthLevel } from './motionConfig';

gsap.registerPlugin(ScrollTrigger);

function shouldReduceMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initScrollDepthAnimations(rootEl?: HTMLElement | null) {
  if (shouldReduceMotion()) return () => { };

  const scope = rootEl || document.body;
  const sections = Array.from(scope.querySelectorAll('[data-depth="mid"]')) as HTMLElement[];

  if (sections.length === 0) return () => { };

  const ctx = gsap.context(() => {
    const spacing = MOTION_CONFIG.perspective.sectionSpacing;
    const config = MOTION_CONFIG.depth.mid;

    sections.forEach((section, index) => {
      // Each section starts further back in Z-space
      const startZ = -(index * spacing);

      // Set initial position: far back, small
      gsap.set(section, {
        z: startZ,
        scale: config.scale.enter,
        opacity: config.opacity.enter,
        transformStyle: 'preserve-3d',
      });

      // As you scroll, section moves forward through Z-space
      // Timeline: far back -> viewport (clear) -> past viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Start: far back
      tl.set(section, {
        z: startZ,
        scale: config.scale.enter,
        opacity: config.opacity.enter,
      }, 0);

      // Middle: reach viewport (clear focus)
      tl.to(section, {
        z: 0,
        scale: config.scale.base,
        opacity: config.opacity.base,
        ease: 'power2.out',
      }, 0.4);

      // End: past viewport
      tl.to(section, {
        z: spacing * 0.5,
        scale: config.scale.exit,
        opacity: config.opacity.exit,
        ease: 'power1.in',
      }, 1);
    });

    // Background elements stay far back, move slower
    const backgrounds = Array.from(scope.querySelectorAll('[data-depth="background"]')) as HTMLElement[];
    backgrounds.forEach((bg) => {
      const config = MOTION_CONFIG.depth.background;
      gsap.set(bg, { z: config.zPosition });

      gsap.to(bg, {
        z: config.zPosition + 300,
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });
    });

    ScrollTrigger.refresh();
  }, scope);

  return () => ctx.revert();
}

export function useScrollDepthAnimation(
  element: HTMLElement | null,
  _options: { depth?: DepthLevel } = {}
) {
  if (!element || shouldReduceMotion()) return;
  return () => { };
}
