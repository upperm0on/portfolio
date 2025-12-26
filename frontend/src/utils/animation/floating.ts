/**
 * Floating Animation Utility
 * 
 * Implements the "zero-gravity" idle floating effect that modulates 
 * intensity based on user activity.
 */

import gsap from 'gsap';
import { MOTION_CONFIG, type FloatLevel } from './motionConfig';
import { MOTION_SELECTORS } from './dataSelectors';

// Track active floating tweens
const floatingTweens = new Map<HTMLElement, gsap.core.Timeline>();

/**
 * Initialize floating animations for all elements with data-float
 */
export function initFloatingAnimations(rootEl?: HTMLElement | null) {
  const scope = rootEl || document.body;
  const elements = scope.querySelectorAll(MOTION_SELECTORS.float());
  
  const ctx = gsap.context(() => {
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      setupFloatingForElement(htmlEl);
    });
  }, scope);

  return () => {
    ctx.revert();
    floatingTweens.clear();
  };
}

/**
 * Setup floating for a single element
 */
function setupFloatingForElement(el: HTMLElement, isIdle: boolean = false) {
  const level = el.getAttribute('data-float') as FloatLevel || 'none';
  if (level === 'none') return;
  
  const config = MOTION_CONFIG.float[level];
  if (!config) return;

  const amp = isIdle ? config.amplitude.idle : config.amplitude.active;
  
  // Kill existing if any
  if (floatingTweens.has(el)) {
    floatingTweens.get(el)?.kill();
  }

  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    delay: Math.random() * 2,
  });

  tl.to(el, {
    x: amp.x,
    y: amp.y,
    duration: config.duration,
    ease: config.ease,
  });

  floatingTweens.set(el, tl);
}

/**
 * Update all floating animations based on idle state
 */
export function updateFloatingState(isIdle: boolean) {
  floatingTweens.forEach((_, el) => {
    setupFloatingForElement(el, isIdle);
  });
}

/**
 * Hook-like function for individual component control
 */
export function useFloating(
  element: HTMLElement | null,
  options: { level?: FloatLevel } = {}
) {
  if (!element) return;

  const level = options.level || (element.getAttribute('data-float') as FloatLevel) || 'none';
  if (level === 'none') return;

  setupFloatingForElement(element);

  return () => {
    floatingTweens.get(element)?.kill();
    floatingTweens.delete(element);
  };
}
