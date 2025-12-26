import { ProjectCard } from './ProjectCard';
import type { Project } from '../../../types/portfolio';
import styles from './ProjectGrid.module.css';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>No projects found matching the selected filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.projectGrid}>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}

