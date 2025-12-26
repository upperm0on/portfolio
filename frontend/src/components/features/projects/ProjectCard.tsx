import { useState } from 'react';
import type { Project } from '../../../types/portfolio';
import { useFloatingElement } from '@/hooks/useFloatingElement';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const primaryImage = project.images.find(img => img.isPrimary) || project.images[0];

  // Floating animation for the entire card
  const { elementRef: cardRef } = useFloatingElement({
    distanceRange: { min: 40, max: 80 }, // Reduced movement for stack
    scaleRange: { min: 0.95, max: 1.0 },
    durationRange: { min: 50, max: 100 },
    delay: index * 0.1,
    rotationRange: { min: -5, max: 5 },
    floatingOpacity: 0.8,
  });

  return (
    <article
      ref={cardRef}
      className={styles.projectCard}
      data-project-id={project.id}
    >
      <div className={styles.cardVisual}>
        {primaryImage && !imageError ? (
          <div className={styles.imageWrapper}>
            {!imageLoaded && <div className={styles.imagePlaceholder} />}
            <img
              src={primaryImage.url}
              alt={primaryImage.alt}
              className={styles.cardImage}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
              draggable={false}
              loading="lazy"
            />
          </div>
        ) : (
          <div className={styles.imagePlaceholder}>
            <div className={styles.placeholderGradient} />
            <div className={styles.fallbackTitle}>{project.title}</div>
          </div>
        )}

        <div className={styles.cardOverlay}>
          {/* Minimal Overlay for Stack View */}
          <div className={styles.miniMeta}>
            <span>{index + 1}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
