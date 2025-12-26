import { Container } from '../../layout';
import { PrimaryContact } from './PrimaryContact';
import { ContactMeta } from './ContactMeta';
import { ContactSocial } from './ContactSocial';
import { TerminalContact } from './TerminalContact';
import { portfolioConfig } from '../../../config/portfolio.config';
import styles from './ContactSection.module.css';

export function ContactSection() {
  const { personal } = portfolioConfig;

  return (
    <div className={styles.contactWrapper}>
      <Container variant="standard">
        <div className={styles.header}>
          <h2 className={styles.title} data-animate-direction="up" data-animate-delay="0" data-depth="foreground" data-parallax="low">Contact</h2>
          <p className={styles.subtitle} data-animate-direction="up" data-animate-delay="0.1" data-depth="foreground" data-parallax="low">
            Let's build something extraordinary together.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.primaryArea}>
            <div className={styles.contactStack}>
              <div data-animate-direction="up" data-animate-delay="0.2" data-depth="foreground" data-parallax="low">
                <PrimaryContact
                  email={personal.contact.email}
                  availability={personal.contact.availability}
                />
              </div>
              <div data-animate-direction="up" data-animate-delay="0.3" data-depth="foreground" data-parallax="low">
                <TerminalContact />
              </div>
            </div>
          </div>

          <div className={styles.metaArea} data-animate-direction="up" data-animate-delay="0.3" data-depth="foreground" data-parallax="low">
            <ContactMeta
              location={personal.location}
              availability={personal.contact.availability}
            />
          </div>

          <div className={styles.socialArea} data-animate-group="contact-social" data-animate-stagger="0.08" data-depth="foreground" data-parallax="low">
            <ContactSocial />
          </div>
        </div>
      </Container>
    </div>
  );
}

