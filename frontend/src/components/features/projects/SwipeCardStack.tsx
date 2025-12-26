import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../../../types/portfolio';
import styles from './SwipeCardStack.module.css';

interface SwipeCardStackProps {
  projects: Project[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  maxVisible?: number;
}

interface CardState {
  projectIndex: number;
  offset: number;
  scale: number;
  rotation: number;
  zIndex: number;
}

export function SwipeCardStack({ projects, activeIndex, onIndexChange, maxVisible = 3 }: SwipeCardStackProps) {
  const [cardStates, setCardStates] = useState<CardState[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize and update card states based on activeIndex
  useEffect(() => {
    if (projects.length === 0) return;

    const visibleCount = Math.min(maxVisible, projects.length);
    const states: CardState[] = [];

    for (let i = 0; i < visibleCount; i++) {
      // Calculate the project index for each slot in the stack
      // The first slot (i=0) holds the activeIndex
      const projectIndex = (activeIndex + i) % projects.length;

      states.push({
        projectIndex,
        offset: i * 15,
        scale: 1 - i * 0.05,
        rotation: i * 2,
        zIndex: visibleCount - i,
      });
    }

    setCardStates(states);
  }, [activeIndex, projects, maxVisible]);

  const handleNext = () => {
    // Just notify parent
    const nextIndex = (activeIndex + 1) % projects.length;
    onIndexChange(nextIndex);
  };

  const handlePrevious = () => {
    // Just notify parent
    const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
    onIndexChange(prevIndex);
  };

  if (projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>No projects found.</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>No projects found.</p>
      </div>
    );
  }

  return (
    <div className={styles.swipeContainer}>
      <button
        className={`${styles.navButton} ${styles.navButtonLeft}`}
        onClick={handlePrevious}
        disabled={false} // Always loop
        aria-label="Previous project"
      >
        <ChevronLeft size={24} />
      </button>

      <div className={styles.cardsContainer} ref={containerRef}>
        {cardStates.map((state, stackIndex) => {
          const project = projects[state.projectIndex];
          if (!project) return null;

          return (
            <div
              key={`${project.id}-${state.projectIndex}`}
              className={`${styles.cardWrapper} ${stackIndex === 0 ? styles.topCard : ''}`}
              style={{
                transform: `translateX(${state.offset}px) scale(${state.scale}) rotate(${state.rotation}deg)`,
                zIndex: state.zIndex,
              }}
            >
              <ProjectCard project={project} index={stackIndex} />
            </div>
          );
        })}
      </div>

      <button
        className={`${styles.navButton} ${styles.navButtonRight}`}
        onClick={handleNext}
        disabled={false} // Always loop
        aria-label="Next project"
      >
        <ChevronRight size={24} />
      </button>

      {/* Counter moved to parent component */}
    </div>
  );
}

