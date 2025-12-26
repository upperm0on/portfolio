import { useState } from 'react';
import type { Project } from '../../../types/portfolio';
import { SwipeCardStack } from './SwipeCardStack';
import { ProjectInfo } from './ProjectInfo';
import styles from './ProjectShowcase.module.css';

interface ProjectShowcaseProps {
    projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // If no projects, return null or empty state
    if (!projects.length) return null;

    const activeProject = projects[activeIndex];

    return (
        <div className={styles.showcase}>
            <div className={styles.contentWrapper}>
                <div className={styles.stackSection}>
                    <SwipeCardStack
                        projects={projects}
                        activeIndex={activeIndex}
                        onIndexChange={setActiveIndex}
                        maxVisible={3}
                    />
                </div>

                <ProjectInfo
                    project={activeProject}
                />
            </div>
        </div>
    );
}
