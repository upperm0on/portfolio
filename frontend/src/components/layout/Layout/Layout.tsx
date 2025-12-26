import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Header, type NavItem } from '../Header';
import { Footer } from '../Footer';
import { BackgroundEffects } from './BackgroundEffects';
import { useGlobalAnimations } from '../../../hooks/useGlobalAnimations';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  navItems?: NavItem[];
  activePath?: string;
  onNavigate?: (href: string) => void;
  backgroundVariant?: 'starfield' | 'nebula' | 'gradient' | 'minimal';
  showFooter?: boolean;
  showBackToTop?: boolean;
}

export function Layout({
  children,
  navItems,
  activePath,
  onNavigate,
  backgroundVariant = 'starfield',
  showFooter = true,
  showBackToTop = true,
}: LayoutProps) {
  const layoutRef = useRef<HTMLDivElement>(null);

  // Initialize global animation systems
  // Delay initialization slightly to allow hero turn-on to start first
  useGlobalAnimations(layoutRef.current, {
    waitForHeroTurnOn: false,
  });

  return (
    <div ref={layoutRef} className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <BackgroundEffects
        variant={backgroundVariant}
      />

      <Header
        navItems={navItems}
        activePath={activePath}
        onNavigate={onNavigate}
      />

      <main id="main-content" className={styles.main}>
        {children}
      </main>

      {showFooter && <Footer showBackToTop={showBackToTop} />}
    </div>
  );
}

