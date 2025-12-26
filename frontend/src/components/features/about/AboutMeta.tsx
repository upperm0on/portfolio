import { MapPin, Clock } from 'lucide-react';
import styles from './AboutMeta.module.css';

interface AboutMetaProps {
  location: {
    city: string;
    country: string;
    timezone?: string;
  };
  availability?: string;
}

export function AboutMeta({ location, availability }: AboutMetaProps) {
  const locationString = `${location.city}, ${location.country}`;

  return (
    <div className={styles.meta} data-animate-direction="left" data-animate-delay="0.5" data-depth="foreground" data-parallax="low">
      <h4 className={styles.metaTitle}>Details</h4>
      <div className={styles.metaList}>
        <div className={styles.metaItem}>
          <MapPin className={styles.metaIcon} size={16} />
          <div className={styles.metaContent}>
            <span className={styles.metaLabel}>Location</span>
            <span className={styles.metaValue}>{locationString}</span>
            {location.timezone && (
              <span className={styles.metaSubtext}>{location.timezone}</span>
            )}
          </div>
        </div>
        
        {availability && (
          <div className={styles.metaItem}>
            <Clock className={styles.metaIcon} size={16} />
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Availability</span>
              <span className={styles.metaValue}>{availability}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

