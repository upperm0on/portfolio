import { useState, useEffect } from 'react';
import { Icon } from '../../common/Icon/Icon';
import { commonIcons } from '../../../utils/icons/iconMapping';
import styles from './Header.module.css';
import { Navigation, type NavItem } from './Navigation';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  logo?: React.ReactNode;
  navItems?: NavItem[];
  activePath?: string;
  onNavigate?: (href: string) => void;
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export function Header({ 
  logo, 
  navItems = defaultNavItems,
  activePath,
  onNavigate 
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        data-animate="header"
        data-delay="0"
      >
        <div className={styles.headerContainer}>
          <div className={styles.brand}>
            {logo || (
              <a href="#home" className={styles.logoLink} aria-label="Home">
                <span className={styles.logoText}>Portfolio</span>
              </a>
            )}
          </div>

          <Navigation
            items={navItems}
            activePath={activePath}
            onNavigate={onNavigate}
          />

          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburger}>
              <Icon icon={commonIcons.menu} size={24} />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={navItems}
        activePath={activePath}
        onNavigate={onNavigate}
      />
    </>
  );
}

