/**
 * Directional Parallax & Reveal Animation System
 * 
 * Provides attribute-driven directional reveal animations and parallax effects
 * for elements across all sections. Elements fade in and slide from different
 * directions as they enter the viewport, with optional parallax behavior.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MOTION_CONFIG,
  type DirectionalRevealDirection,
  type ParallaxLevel,
  type DepthLevel,
} from './motionConfig';

gsap.registerPlugin(ScrollTrigger);

/**
 * Check if user prefers reduced motion
 */
function shouldReduceMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Options for directional reveal animation
 */
export interface DirectionalRevealOptions {
  direction?: DirectionalRevealDirection;
  delay?: number;
  duration?: number;
  ease?: string;
  offset?: { x?: number; y?: number; scale?: number };
}

/**
 * Options for parallax effect
 */
export interface ParallaxOptions {
  level?: ParallaxLevel;
  depth?: DepthLevel;
  ease?: string;
}

/**
 * Create a directional reveal animation for a single element
 * Returns a tween that can be added to a timeline
 * Note: This function sets initial state but doesn't create ScrollTrigger
 * Use initDirectionalReveals for automatic ScrollTrigger setup
 */
export function createDirectionalReveal(
  element: HTMLElement,
  options: DirectionalRevealOptions = {}
): gsap.core.Tween | null {
  if (shouldReduceMotion()) {
    // For reduced motion: fade only, no positional movement
    return gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: options.duration || 0.6,
        delay: options.delay || 0,
        ease: options.ease || 'power2.out',
      }
    );
  }

  const direction = options.direction || 'up';
  const config = MOTION_CONFIG.directionalReveal[direction];

  const offset = {
    x: options.offset?.x ?? config.offset.x,
    y: options.offset?.y ?? config.offset.y,
    scale: options.offset?.scale ?? config.offset.scale,
  };

  const duration = options.duration ?? config.duration;
  const ease = options.ease ?? config.ease;
  const delay = options.delay ?? 0;

  // Set initial state (no blur)
  gsap.set(element, {
    opacity: 0,
    x: offset.x,
    y: offset.y,
    scale: offset.scale,
  });

  // Animate to final state (no blur)
  return gsap.to(element, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    duration,
    delay,
    ease,
  });
}

/**
 * Create a parallax effect for a single element
 */
export function createParallaxEffect(
  element: HTMLElement,
  options: ParallaxOptions = {}
): ScrollTrigger | null {
  if (shouldReduceMotion()) {
    return null;
  }

  const level = options.level || 'none';
  if (level === 'none') {
    return null;
  }

  const parallaxConfig = MOTION_CONFIG.parallax[level];
  const depthLevel = options.depth || 'mid';
  const depthConfig = MOTION_CONFIG.depth[depthLevel];

  // Adjust parallax intensity based on depth
  const parallaxFactor = depthConfig.parallaxFactor;
  const offsetRange = parallaxConfig.offsetRange * parallaxFactor;

  if (offsetRange === 0) {
    return null;
  }

  // Create scrubbed parallax animation
  const scrollTrigger = ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const y = gsap.utils.interpolate(-offsetRange / 2, offsetRange / 2, progress);
      gsap.set(element, { y });
    },
  });

  return scrollTrigger;
}

/**
 * Check if element is already in viewport
 */
function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Initialize directional reveal animations for all elements with data-animate-direction
 */
export function initDirectionalReveals(rootEl?: HTMLElement | null): () => void {
  const scope = rootEl || document.body;
  const elements = Array.from(
    scope.querySelectorAll('[data-animate-direction]')
  ) as HTMLElement[];

  if (elements.length === 0) {
    return () => { };
  }

  const ctx = gsap.context(() => {
    // First, handle stagger groups
    const groups = new Map<string, HTMLElement[]>();
    const standaloneElements: HTMLElement[] = [];

    elements.forEach((el) => {
      const group = el.getAttribute('data-animate-group');
      if (group) {
        if (!groups.has(group)) {
          groups.set(group, []);
        }
        groups.get(group)!.push(el);
      } else {
        standaloneElements.push(el);
      }
    });

    // Process standalone elements
    standaloneElements.forEach((el) => {
      const direction = el.getAttribute('data-animate-direction') as DirectionalRevealDirection;
      const delay = parseFloat(el.getAttribute('data-animate-delay') || '0');
      const duration = parseFloat(el.getAttribute('data-animate-duration') || '');

      const config = MOTION_CONFIG.directionalReveal[direction];
      const offset = config.offset;

      // Check if element is already in viewport
      const alreadyInView = isElementInViewport(el);

      if (alreadyInView) {
        // If already in view, set to final state immediately
        gsap.set(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
        });
        return;
      }

      // Set initial state (no blur)
      gsap.set(el, {
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: offset.scale,
        pointerEvents: 'none',
      });

      // Create ScrollTrigger for reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 120%',
          end: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      // Animate to final state (no blur)
      tl.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        pointerEvents: 'auto',
        duration: isNaN(duration) ? config.duration : duration,
        delay: isNaN(delay) ? 0 : delay,
        ease: config.ease,
      });
    });

    // Process groups with stagger
    groups.forEach((groupElements, _) => {
      // Get stagger value from first element or use default
      const staggerAttr = groupElements[0].getAttribute('data-animate-stagger');
      const staggerValue = staggerAttr
        ? parseFloat(staggerAttr)
        : MOTION_CONFIG.stagger.cards;

      // Determine if this is a text group (smaller stagger) or card group
      const isTextGroup = groupElements.length > 3 && staggerValue < 0.08;
      const finalStagger = isTextGroup ? MOTION_CONFIG.stagger.text : staggerValue;

      groupElements.forEach((el, index) => {
        const direction = el.getAttribute('data-animate-direction') as DirectionalRevealDirection;
        const baseDelay = parseFloat(el.getAttribute('data-animate-delay') || '0');
        const duration = parseFloat(el.getAttribute('data-animate-duration') || '');
        const delay = baseDelay + index * finalStagger;

        const config = MOTION_CONFIG.directionalReveal[direction];
        const offset = config.offset;

        // Check if element is already in viewport
        const alreadyInView = isElementInViewport(el);

        if (alreadyInView) {
          // If already in view, set to final state immediately
          gsap.set(el, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            pointerEvents: 'auto',
          });
          return;
        }

        // Set initial state (no blur)
        gsap.set(el, {
          opacity: 0,
          x: offset.x,
          y: offset.y,
          scale: offset.scale,
          pointerEvents: 'none',
        });

        // Create ScrollTrigger for reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 120%',
            end: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        // Animate to final state (no blur)
        tl.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          pointerEvents: 'auto',
          duration: isNaN(duration) ? config.duration : duration,
          delay: isNaN(delay) ? index * finalStagger : delay,
          ease: config.ease,
        });
      });
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();
  }, scope);

  return () => ctx.revert();
}

/**
 * Initialize parallax effects for all elements with data-parallax
 */
export function initParallaxEffects(rootEl?: HTMLElement | null): () => void {
  const scope = rootEl || document.body;
  const elements = Array.from(
    scope.querySelectorAll('[data-parallax]')
  ) as HTMLElement[];

  if (elements.length === 0) {
    return () => { };
  }

  const ctx = gsap.context(() => {
    elements.forEach((el) => {
      const parallaxLevel = el.getAttribute('data-parallax') as ParallaxLevel;
      const depthLevel = (el.getAttribute('data-depth') || 'mid') as DepthLevel;

      if (parallaxLevel === 'none') {
        return;
      }

      const options: ParallaxOptions = {
        level: parallaxLevel,
        depth: depthLevel,
      };

      createParallaxEffect(el, options);
    });
  }, scope);

  return () => ctx.revert();
}

/**
 * Initialize both directional reveals and parallax effects
 */
export function initDirectionalParallax(rootEl?: HTMLElement | null): () => void {
  const cleanupReveals = initDirectionalReveals(rootEl);
  const cleanupParallax = initParallaxEffects(rootEl);

  return () => {
    cleanupReveals();
    cleanupParallax();
    ScrollTrigger.refresh();
  };
}

