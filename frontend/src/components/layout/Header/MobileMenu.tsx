import { useEffect } from 'react';
import { Icon } from '../../common/Icon/Icon';
import { commonIcons } from '../../../utils/icons/iconMapping';
import styles from './MobileMenu.module.css';
import type { NavItem } from './Navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activePath?: string;
  onNavigate?: (href: string) => void;
}

export function MobileMenu({ isOpen, onClose, items, activePath, onNavigate }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    if (onNavigate) {
      onNavigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}
        aria-label="Mobile navigation"
        data-animate="slide-in"
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          <span className={styles.closeIcon}>
            <Icon icon={commonIcons.x} size={24} />
          </span>
        </button>
        <ul className={styles.mobileNavList}>
          {items.map((item, index) => {
            const isActive = activePath === item.href;
            return (
              <li key={item.href} className={styles.mobileNavItem}>
                <a
                  href={item.href}
                  className={`${styles.mobileNavLink} ${isActive ? styles.active : ''}`}
                  onClick={(e) => handleClick(e, item.href)}
                  data-animate="fade-up"
                  data-delay={`${0.1 + index * 0.1}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon && (
                    <span className={styles.mobileNavIcon}>
                      {typeof item.icon === 'string' ? (
                        item.icon
                      ) : (
                        <Icon icon={item.icon} size={18} />
                      )}
                    </span>
                  )}
                  <span className={styles.mobileNavLabel}>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

