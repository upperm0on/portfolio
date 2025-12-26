import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MouseParallaxOptions {
  /**
   * Sensitivity of the parallax effect. Higher values mean more movement.
   * @default 20
   */
  intensity?: number;
  /**
   * Whether to invert the movement direction.
   * @default false
   */
  invert?: boolean;
  /**
   * Smoothing factor for the animation (0 to 1).
   * @default 0.1
   */
  smoothing?: number;
}

/**
 * Hook to apply mouse-follow parallax effect to multiple layers.
 * Expects elements with data-layer attribute.
 */
export function useMouseParallax(options: MouseParallaxOptions = {}) {
  const { intensity = 20, invert = false, smoothing = 0.1 } = options;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers = container.querySelectorAll('[data-layer]');
    if (layers.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate normalized mouse position (-0.5 to 0.5)
      const xPos = (clientX / innerWidth) - 0.5;
      const yPos = (clientY / innerHeight) - 0.5;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-layer') || '1');
        const factor = invert ? -1 : 1;
        
        // Faster layers (higher depth) move more
        const moveX = xPos * intensity * depth * factor;
        const moveY = yPos * intensity * depth * factor;

        gsap.to(layer, {
          x: moveX,
          y: moveY,
          duration: smoothing,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity, invert, smoothing]);

  return { containerRef };
}
