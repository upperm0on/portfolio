import styles from './AboutIntro.module.css';

interface AboutIntroProps {
  name: string;
  title: string;
  tagline: string;
}

export function AboutIntro({ name, title, tagline }: AboutIntroProps) {
  return (
    <div className={styles.intro} data-animate-direction="right" data-animate-delay="0.1" data-depth="foreground" data-parallax="low">
      <div className={styles.introHeader}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>
          <span className={styles.universeSymbol}>✦</span>
        </div>
      </div>
      <p className={styles.tagline}>{tagline}</p>
    </div>
  );
}

