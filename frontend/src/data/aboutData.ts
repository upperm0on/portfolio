// About Section Data
// Loads about section content from portfolio configuration

import { getPortfolioData } from '../utils/config/portfolioConfigLoader';
import type { About, AboutSection, Skill, TimelineItem } from '../types/portfolio';

/**
 * Get about section data from portfolio config
 */
export function getAboutData(): About {
  const portfolio = getPortfolioData();
  return portfolio.about;
}

/**
 * Get all about sections sorted by order
 */
export function getAboutSections(): AboutSection[] {
  const about = getAboutData();
  return about.sections.sort((a, b) => a.order - b.order);
}

/**
 * Get about section by type
 */
export function getAboutSectionByType(type: AboutSection['type']): AboutSection | undefined {
  return getAboutSections().find(section => section.type === type);
}

/**
 * Get all skills from about sections
 */
export function getAllSkills(): Skill[] {
  const sections = getAboutSections();
  const skills: Skill[] = [];
  
  sections.forEach(section => {
    if (section.skills) {
      skills.push(...section.skills);
    }
  });
  
  return skills;
}

/**
 * Get all timeline items from about sections
 */
export function getAllTimelineItems(): TimelineItem[] {
  const sections = getAboutSections();
  const timelineItems: TimelineItem[] = [];
  
  sections.forEach(section => {
    if (section.timelineItems) {
      timelineItems.push(...section.timelineItems);
    }
  });
  
  return timelineItems;
}

/**
 * Export about data as a constant for direct access
 */
export const aboutData = getAboutData();

