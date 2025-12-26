import { useEffect, useRef } from 'react';
import styles from './BackgroundEffects.module.css';

interface BackgroundEffectsProps {
  variant?: 'starfield' | 'nebula' | 'gradient' | 'minimal';
  intensity?: 'low' | 'medium' | 'high';
}

export function BackgroundEffects({ 
  variant = 'starfield', 
  intensity = 'medium' 
}: BackgroundEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (variant === 'starfield' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const stars: Array<{
        x: number;
        y: number;
        radius: number;
        opacity: number;
        speed: number;
      }> = [];

      const starCount = intensity === 'low' ? 50 : intensity === 'medium' ? 100 : 200;

      // Initialize stars
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          speed: Math.random() * 0.5 + 0.1,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach((star) => {
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resize();
      window.addEventListener('resize', resize);
      animate();

      return () => {
        window.removeEventListener('resize', resize);
      };
    }
  }, [variant, intensity]);

  if (variant === 'starfield') {
    return (
      <canvas
        ref={canvasRef}
        className={styles.starfieldCanvas}
        aria-hidden="true"
      />
    );
  }

  if (variant === 'nebula') {
    return (
      <div className={`${styles.backgroundEffect} ${styles.nebula}`} aria-hidden="true">
        <div className={styles.nebulaLayer1}></div>
        <div className={styles.nebulaLayer2}></div>
        <div className={styles.nebulaLayer3}></div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`${styles.backgroundEffect} ${styles.gradient}`} aria-hidden="true">
        <div className={styles.gradientMesh}></div>
      </div>
    );
  }

  return null;
}


