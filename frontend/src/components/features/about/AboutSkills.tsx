import type { Skill } from '../../../types/portfolio';
import { SkillLevel } from '../../../types/portfolio';
import styles from './AboutSkills.module.css';

interface AboutSkillsProps {
  skills: Skill[];
}

// Group skills by category
function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

// Category display names
const categoryLabels: Record<string, string> = {
  language: 'Languages',
  framework: 'Frameworks',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  tool: 'Tools & Systems',
  library: 'Libraries',
  design: 'Design',
  other: 'Other',
};

// Skill level labels
const levelLabels: Record<SkillLevel, string> = {
  [SkillLevel.EXPERT]: 'Expert',
  [SkillLevel.ADVANCED]: 'Advanced',
  [SkillLevel.INTERMEDIATE]: 'Intermediate',
  [SkillLevel.BEGINNER]: 'Beginner',
};

export function AboutSkills({ skills }: AboutSkillsProps) {
  const groupedSkills = groupSkillsByCategory(skills);
  const categories = Object.keys(groupedSkills).sort();

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className={styles.skills} data-animate-direction="up" data-animate-delay="0.3" data-depth="foreground">
      <h3 className={styles.skillsTitle}>Systems I Navigate</h3>
      <div className={styles.skillsGrid}>
        {categories.map((category, categoryIndex) => {
          const direction = categoryIndex % 2 === 0 ? 'left' : 'right';
          return (
            <div
              key={category}
              className={styles.categoryGroup}
              data-animate-direction={direction}
              data-animate-delay={`${0.35 + categoryIndex * 0.05}`}
              data-depth="foreground"
              data-parallax="low"
            >
              <h4 className={styles.categoryTitle}>
                {categoryLabels[category] || category}
              </h4>
              <div className={styles.skillsList}>
                {groupedSkills[category].map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <span className={styles.skillName}>{skill.name}</span>
                    {skill.level && (
                      <span className={styles.skillLevel}>
                        {levelLabels[skill.level]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

