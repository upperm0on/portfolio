import { getSocialLinksSorted } from '../../../data/socialData';
import type { SocialLink } from '../../../types/portfolio';
import { getSocialIcon } from '../../../utils/icons/iconMapping';
import { Icon } from '../../common/Icon/Icon';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  socialLinks?: SocialLink[];
  className?: string;
}

export function SocialLinks({ socialLinks, className }: SocialLinksProps) {
  const links = socialLinks || getSocialLinksSorted();

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.socialLinks} ${className || ''}`} data-animate="stagger-fade">
      {links.map((link, index) => {
        const IconComponent = getSocialIcon(link.platform);
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={link.label || link.platform}
            data-animate="fade-in"
            data-delay={`${0.1 + index * 0.05}`}
          >
            <span className={styles.socialIcon} aria-hidden="true">
              <Icon icon={IconComponent} size={20} />
            </span>
            <span className={styles.socialGlow} aria-hidden="true"></span>
          </a>
        );
      })}
    </div>
  );
}

