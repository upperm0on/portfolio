import { getPersonalInfo } from '../../../data/personalData';
import { Icon } from '../../common/Icon/Icon';
import { commonIcons } from '../../../utils/icons/iconMapping';
import { SocialLinks } from './SocialLinks';
import styles from './Footer.module.css';

interface FooterProps {
  showBackToTop?: boolean;
}

export function Footer({ showBackToTop = true }: FooterProps) {
  const personalData = getPersonalInfo();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={styles.footer}
      data-animate="fade-up"
      data-delay="0"
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <SocialLinks className={styles.footerSocial} />
            <a href={`mailto:${personalData.contact.email}`} className={styles.footerContact}>
              <Icon icon={commonIcons.mail} size={16} />
              <span>Get in touch</span>
            </a>
          </div>

          <div className={styles.footerCopyright}>
            <span className={styles.copyrightSymbol}>©</span>
            <span className={styles.copyrightYear}>{currentYear}</span>
            {personalData.name && (
              <span className={styles.copyrightName}>{personalData.name}</span>
            )}
          </div>

          {showBackToTop && (
            <button
              className={styles.backToTop}
              onClick={scrollToTop}
              aria-label="Back to top"
              data-animate="fade-in"
              data-delay="0.2"
            >
              <span className={styles.backToTopIcon}>
                <Icon icon={commonIcons.chevronUp} size={20} />
              </span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

