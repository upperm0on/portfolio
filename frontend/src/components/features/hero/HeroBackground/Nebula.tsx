// Nebula gradient effect component
// Animated gradient mesh

import styles from './Nebula.module.css';

export function Nebula() {
  return (
    <div className={styles.nebula}>
      <div className={styles.gradient1} />
      <div className={styles.gradient2} />
      <div className={styles.gradient3} />
    </div>
  );
}

