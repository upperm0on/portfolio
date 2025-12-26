import { getSocialLinksSorted } from '../../../data/socialData';
import { getSocialIcon } from '../../../utils/icons/iconMapping';
import { Icon } from '../../common/Icon/Icon';
import styles from './ContactSocial.module.css';

export function ContactSocial() {
  const socialLinks = getSocialLinksSorted();

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className={styles.socialContainer}>
      {socialLinks.map((link) => {
        const IconComponent = getSocialIcon(link.platform);
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label={link.label || link.platform}
            data-animate-direction="up"
            data-animate-group="contact-social"
          >
            <span className={styles.iconWrapper}>
              <Icon icon={IconComponent} size={24} />
            </span>
            <span className={styles.label}>{link.label}</span>
            <span className={styles.glowEffect}></span>
          </a>
        );
      })}
    </div>
  );
}

