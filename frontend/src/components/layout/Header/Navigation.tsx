import { type LucideIcon } from 'lucide-react';
import { Icon } from '../../common/Icon/Icon';
import styles from './Navigation.module.css';

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon | string; // Support both Lucide icons and string (for backward compatibility)
}

interface NavigationProps {
  items: NavItem[];
  activePath?: string;
  onNavigate?: (href: string) => void;
}

export function Navigation({ items, activePath, onNavigate }: NavigationProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      // Default smooth scroll behavior
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className={styles.navigation} data-animate="stagger-fade" data-delay="0.1">
      <ul className={styles.navList}>
        {items.map((item, index) => {
          const isActive = activePath === item.href;
          return (
            <li key={item.href} className={styles.navItem}>
              <a
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={(e) => handleClick(e, item.href)}
                data-animate="fade-in"
                data-delay={`${0.1 + index * 0.05}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon && (
                  <span className={styles.navIcon}>
                    {typeof item.icon === 'string' ? (
                      item.icon
                    ) : (
                      <Icon icon={item.icon} size={16} />
                    )}
                  </span>
                )}
                <span className={styles.navLabel}>{item.label}</span>
                <span className={styles.navUnderline} aria-hidden="true"></span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

