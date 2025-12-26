import { useEffect, useRef } from 'react';
import type { Project } from '../../../types/portfolio';
import { ProjectStatus } from '../../../types/portfolio';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import styles from './ProjectInfo.module.css';

interface ProjectInfoProps {
    project: Project;
}

export function ProjectInfo({ project }: ProjectInfoProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation on project change
    useEffect(() => {
        if (!containerRef.current) return;

        // Reset and animate in
        const ctx = gsap.context(() => {
            // Split text or just fade in elements
            const tl = gsap.timeline();

            tl.fromTo(
                [
                    `.${styles.meta}`,
                    `.${styles.title}`,
                    `.${styles.description}`,
                    `.${styles.techStack}`,
                    `.${styles.links}`
                ],
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power2.out'
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [project.id]); // Re-run when project changes

    const getStatusLabel = (status: ProjectStatus) => {
        const labels: Record<ProjectStatus, string> = {
            completed: 'Completed',
            'in-progress': 'In Progress',
            archived: 'Archived',
            planned: 'Planned',
        };
        return labels[status] || status;
    };

    return (
        <div ref={containerRef} className={styles.projectInfo}>
            <header className={styles.header}>
                <div className={styles.meta}>
                    <span className={styles.category}>{project.category}</span>
                    <span className={styles.status} data-status={project.status}>
                        {getStatusLabel(project.status)}
                    </span>
                </div>

                <h3 className={styles.title}>{project.title}</h3>
            </header>

            <p className={styles.description}>{project.description || project.shortDescription}</p>

            <div className={styles.techStack}>
                {project.techStack.map((tech, i) => (
                    <span key={i} className={styles.techTag}>
                        {tech.name}
                    </span>
                ))}
            </div>

            <div className={styles.links}>
                {project.links.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.linkButton} ${link.type === 'demo' ? styles.linkPrimary : styles.linkSecondary
                            }`}
                        aria-label={link.label}
                    >
                        {link.type === 'github' && <Github size={18} />}
                        {link.type === 'demo' && <ExternalLink size={18} />}
                        <span>{link.label}</span>
                        {link.type === 'demo' && <ArrowRight size={16} />}
                    </a>
                ))}
            </div>
        </div>
    );
}
