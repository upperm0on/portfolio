import styles from './AboutStory.module.css';

interface AboutStoryProps {
  bio: string;
}

export function AboutStory({ bio }: AboutStoryProps) {
  // Split bio into paragraphs (split by periods followed by space or end of string)
  const paragraphs = bio
    .split(/\.\s+/)
    .filter(p => p.trim().length > 0)
    .map(p => p.trim() + (p.endsWith('.') ? '' : '.'));

  return (
    <div className={styles.story} data-animate-direction="up" data-animate-delay="0.2" data-depth="foreground" data-parallax="low">
      <div className={styles.storyContent}>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

