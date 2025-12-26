import { Icon } from '../../common/Icon/Icon';
import { commonIcons } from '../../../utils/icons/iconMapping';
import styles from './PrimaryContact.module.css';

interface PrimaryContactProps {
  email: string;
  availability?: string;
}

export function PrimaryContact({ email, availability }: PrimaryContactProps) {
  return (
    <div className={styles.container}>
      <a 
        href={`mailto:${email}`}
        className={styles.ctaButton}
        aria-label={`Email ${email}`}
        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
      >
        <span className={styles.iconWrapper}>
          <Icon icon={commonIcons.mail} size={24} />
        </span>
        <span className={styles.label}>Say Hello</span>
        <span className={styles.glowEffect}></span>
      </a>
      {availability && (
        <span className={styles.availability}>
          {availability}
        </span>
      )}
    </div>
  );
}

