// Starfield effect component
// CSS-based starfield with parallax layers

import { useMouseParallax } from '@/hooks/useMouseParallax';
import styles from './Starfield.module.css';

export function Starfield() {
  const { containerRef } = useMouseParallax({ intensity: 30 });

  return (
    <div className={styles.starfield} ref={containerRef as any}>
      <div className={styles.layer} data-layer="1">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <div className={styles.layer} data-layer="2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`${styles.star} ${styles.starMedium}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <div className={styles.layer} data-layer="3">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`${styles.star} ${styles.starLarge}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

