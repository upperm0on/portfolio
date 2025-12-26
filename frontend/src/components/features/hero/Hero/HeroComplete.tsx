// Complete Hero component with all features integrated
// This is the main component to use in the app

import { useRef, useEffect, useState, useCallback } from 'react';
import { Hero } from './Hero';
import { HeroBackground } from '../HeroBackground';
import { HeroName } from '../HeroName';
import { HeroTitle } from '../HeroTitle';
import { HeroTagline } from '../HeroTagline';
import { HeroCTAs } from '../HeroCTAs';
import { HeroScrollIndicator } from '../HeroScrollIndicator';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { useHeroTurnOn } from '@/hooks/useHeroTurnOn';
import { getPersonalInfo } from '@/data/personalData';
import { getSocialLinksSorted } from '@/data/socialData';
import { getWorkLinksSorted } from '@/data/workLinksData';
import { socialIconMap } from '@/utils/icons/iconMapping';
import { ExternalLink, Mail } from 'lucide-react';
import type { HeroProps } from '@/types/hero';
import type { HeroTurnOnElements } from '@/utils/animation/heroTurnOn';

export function HeroComplete(props: HeroProps) {
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinksSorted();
  const workLinks = getWorkLinksSorted();

  // Refs for hero section elements
  const heroRootRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRefs = useRef<(HTMLAnchorElement | HTMLButtonElement)[]>([]);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // State for coordinating turn-on with content animations
  const [turnOnElements, setTurnOnElements] = useState<HeroTurnOnElements | null>(null);
  
  // Build turn-on elements once refs are available
  useEffect(() => {
    if (heroRootRef.current) {
      // Find content element via DOM query since HeroContent is inside Hero
      const content = document.querySelector('[data-hero-turnon-content]') as HTMLElement | null;
      setTurnOnElements({
        root: heroRootRef.current,
        background: backgroundRef.current,
        content,
      });
    }
  }, [heroRootRef.current, backgroundRef.current]);
  
  // Handle turn-on completion - set data attribute for CSS fallback
  const handleTurnOnComplete = useCallback(() => {
    const heroRoot = document.querySelector('[data-hero-root]');
    if (heroRoot) {
      heroRoot.setAttribute('data-hero-turnon-complete', 'true');
    }
  }, []);
  
  // Hero turn-on effect (runs first, before content animations)
  const { isTurnedOn } = useHeroTurnOn(turnOnElements, {
    enabled: true,
    onComplete: handleTurnOnComplete,
  });

  // Build CTA items from portfolio data
  const ctaItems = [];

  // Primary CTA: Contact me (scrolls to contact section)
  ctaItems.push({
    label: 'Contact Me',
    href: '#contact',
    variant: 'primary' as const,
    icon: <Mail size={18} />,
    'aria-label': 'Contact me',
  });

  // Work links (first 2)
  workLinks.slice(0, 2).forEach((link) => {
    ctaItems.push({
      label: link.label,
      href: link.url,
      variant: 'secondary' as const,
      icon: <ExternalLink size={18} />,
      'aria-label': link.label,
    });
  });

  // Social links (first 2-3)
  socialLinks.slice(0, 3).forEach((link) => {
    const IconComponent = socialIconMap[link.platform];
    ctaItems.push({
      label: link.label || link.platform,
      href: link.url,
      variant: 'icon' as const,
      icon: <IconComponent size={18} />,
      'aria-label': link.label || `${link.platform} profile`,
    });
  });

  // Setup content animations - only run AFTER turn-on completes
  useHeroAnimation({
    enabled: isTurnedOn, // Wait for turn-on to complete
    nameElement: nameRef.current,
    titleElement: titleRef.current,
    taglineElement: taglineRef.current,
    ctaElements: ctaRefs.current.filter(Boolean) as HTMLElement[],
    scrollIndicatorElement: scrollIndicatorRef.current,
    backgroundElement: null, // Background is handled by turn-on effect
  });

  return (
    <Hero {...props} ref={heroRootRef}>
      <HeroBackground variant={props.backgroundVariant} ref={backgroundRef} />
      <HeroName name={personalInfo.name} ref={nameRef} />
      <HeroTitle title={personalInfo.title} ref={titleRef} />
      <HeroTagline tagline={personalInfo.bio.short} ref={taglineRef} />
      {ctaItems.length > 0 && (
        <HeroCTAs
          items={ctaItems}
          layout="horizontal"
          ref={(el) => {
            if (el) {
              const buttons = el.querySelectorAll('[data-hero-cta]');
              ctaRefs.current = Array.from(buttons) as (HTMLAnchorElement | HTMLButtonElement)[];
            }
          }}
        />
      )}
      {props.showScrollIndicator !== false && (
        <HeroScrollIndicator targetId="#about" ref={scrollIndicatorRef} />
      )}
    </Hero>
  );
}

// Export as default Hero component
export { HeroComplete as Hero };

