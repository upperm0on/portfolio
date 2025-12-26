// Hero animation utilities
// GSAP timeline configs for hero section animations
import { gsap } from 'gsap';

/**
 * Create hero timeline with all animations
 */
export function createHeroTimeline(): gsap.core.Timeline {
  const tl = gsap.timeline();

  return tl;
}

/**
 * Animate name reveal
 */
export function animateNameReveal(
  element: HTMLElement,
  delay: number = 0.2,
  duration: number = 1
): gsap.core.Tween {
  gsap.set(element, { opacity: 0, y: 30 });

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease: 'power3.out',
  });
}

/**
 * Animate hero content fade-up
 */
export function animateHeroContent(
  elements: HTMLElement[],
  delay: number = 0.5,
  stagger: number = 0.1
): gsap.core.Timeline {
  const tl = gsap.timeline({ delay });

  elements.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 20 });
  });

  tl.to(elements, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger,
    ease: 'power2.out',
  });

  return tl;
}

/**
 * Animate CTAs with stagger
 */
export function animateCTAs(
  elements: HTMLElement[],
  delay: number = 0.9,
  stagger: number = 0.1
): gsap.core.Timeline {
  const tl = gsap.timeline({ delay });

  elements.forEach((el) => {
    gsap.set(el, { opacity: 0, scale: 0.8 });
  });

  tl.to(elements, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    stagger,
    ease: 'back.out(1.7)',
  });

  return tl;
}

/**
 * Animate scroll indicator
 */
export function animateScrollIndicator(
  element: HTMLElement,
  delay: number = 1.2
): gsap.core.Tween {
  gsap.set(element, { opacity: 0, y: 10 });

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay,
    ease: 'power2.out',
  });
}

/**
 * Animate background effects
 */
export function animateBackground(
  element: HTMLElement,
  delay: number = 0
): gsap.core.Tween {
  gsap.set(element, { opacity: 0 });

  return gsap.to(element, {
    opacity: 1,
    duration: 1.5,
    delay,
    ease: 'power2.out',
  });
}

