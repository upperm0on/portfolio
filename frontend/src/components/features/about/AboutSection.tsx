import { Container } from '../../layout';
import { AboutIntro } from './AboutIntro';
import { AboutStory } from './AboutStory';
import { AboutSkills } from './AboutSkills';
import { AboutMeta } from './AboutMeta';
import { portfolioConfig } from '../../../config/portfolio.config';
import styles from './AboutSection.module.css';

export function AboutSection() {
  const { personal, about } = portfolioConfig;
  
  // Extract skills from about sections (timeline removed)
  const skillsSection = about.sections.find(s => s.type === 'skills');
  const skills = skillsSection?.skills || [];

  return (
    <Container variant="standard" className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <AboutIntro 
          name={personal.name}
          title={personal.title}
          tagline={personal.bio.short}
        />
        
        <AboutStory bio={personal.bio.long} />
        
        {skills.length > 0 && (
          <AboutSkills skills={skills} />
        )}
        
        <AboutMeta 
          location={personal.location}
          availability={personal.contact.availability}
        />
      </div>
    </Container>
  );
}

