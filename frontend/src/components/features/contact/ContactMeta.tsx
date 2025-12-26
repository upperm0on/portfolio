import { Icon } from '../../common/Icon/Icon';
import { commonIcons } from '../../../utils/icons/iconMapping';
import styles from './ContactMeta.module.css';

interface ContactMetaProps {
  location: {
    city: string;
    country: string;
    timezone?: string;
  };
  availability?: string;
}

export function ContactMeta({ location }: ContactMetaProps) {
  return (
    <div className={styles.container}>
      <div className={styles.metaItem}>
        <span className={styles.icon}>
          <Icon icon={commonIcons.globe} size={16} />
        </span>
        <span className={styles.text}>
          Based in {location.city}, {location.country}
          {location.timezone && <span className={styles.timezone}> — {location.timezone}</span>}
        </span>
      </div>
      
      {/* Optional: Add more meta items here like local time or active hours */}
    </div>
  );
}

