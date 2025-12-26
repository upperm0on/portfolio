import { useState } from 'react';
import type { Project } from '../../../types/portfolio';
import { ProjectCategory, ProjectStatus } from '../../../types/portfolio';
import { ExternalLink, Github, FileText } from 'lucide-react';
import styles from './FeaturedProject.module.css';

interface FeaturedProjectProps {
  project: Project;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const primaryImage = project.images.find(img => img.isPrimary) || project.images[0];

  const getCategoryLabel = (category: ProjectCategory) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getStatusLabel = (status: ProjectStatus) => {
    const labels: Record<ProjectStatus, string> = {
      completed: 'Completed',
      'in-progress': 'In Progress',
      archived: 'Archived',
      planned: 'Planned',
    };
    return labels[status] || status;
  };

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'github':
        return Github;
      case 'case-study':
        return FileText;
      default:
        return ExternalLink;
    }
  };

  return (
    <article
      className={styles.featuredProject}
      data-project-id={project.id}
      data-depth="foreground"
    >
      <div className={styles.featuredContent}>
        <div className={styles.featuredText} data-animate-direction="right" data-animate-delay="0.1" data-parallax="low">
          <div className={styles.featuredMeta}>
            <span className={styles.categoryChip}>{getCategoryLabel(project.category)}</span>
            <span className={styles.statusChip} data-status={project.status}>
              {getStatusLabel(project.status)}
            </span>
          </div>

          <h3 className={styles.featuredTitle}>{project.title}</h3>
          <p className={styles.featuredDescription}>{project.shortDescription}</p>

          {project.techStack.length > 0 && (
            <div className={styles.techStack}>
              {project.techStack.slice(0, 4).map((tech, index) => (
                <span key={index} className={styles.techTag}>
                  {tech.name}
                </span>
              ))}
            </div>
          )}

          {project.links.length > 0 && (
            <div className={styles.featuredLinks}>
              {project.links.map((link, index) => {
                const LinkIcon = getLinkIcon(link.type);
                return (
                  <a
                    key={index}
                    href={link.url}
                    className={styles.featuredLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <LinkIcon size={18} />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.featuredVisual} data-animate-direction="left" data-animate-delay="0.15" data-parallax="medium">
          {primaryImage && !imageError ? (
            <div className={styles.imageWrapper}>
              {!imageLoaded && <div className={styles.imagePlaceholder} />}
              <img
                src={primaryImage.url}
                alt={primaryImage.alt}
                className={styles.featuredImage}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(false);
                }}
                loading="lazy"
              />
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>
              <div className={styles.placeholderGradient} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

