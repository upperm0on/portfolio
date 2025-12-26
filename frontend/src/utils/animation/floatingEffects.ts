// Floating effects utilities
// Subtle floating animations for normal state
import { gsap } from 'gsap';

/**
 * Create floating animation for an element
 */
export function createFloatingAnimation(
  element: HTMLElement,
  intensity: number = 1,
  duration: number = 6
): void {
  // Random starting offset for variety
  const offsetX = (Math.random() - 0.5) * 10 * intensity;
  const offsetY = (Math.random() - 0.5) * 10 * intensity;

  gsap.to(element, {
    x: `+=${offsetX}`,
    y: `+=${offsetY}`,
    duration: duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

/**
 * Create parallax effect based on mouse position
 */
export function createMouseParallax(
  element: HTMLElement,
  mouseX: number,
  mouseY: number,
  intensity: number = 0.1
): void {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const offsetX = (mouseX - centerX) * intensity;
  const offsetY = (mouseY - centerY) * intensity;

  gsap.to(element, {
    x: offsetX,
    y: offsetY,
    duration: 0.5,
    ease: 'power2.out',
  });
}

