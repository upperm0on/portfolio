// Icon Mapping for Social Platforms and Common Icons
// Maps platform names to Lucide React icons

import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Globe,
  ChevronUp,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FileText,
  MessageCircle,
  Code,
  Palette,
  type LucideIcon,
} from 'lucide-react';
import type { SocialPlatform } from '../../types/portfolio';

/**
 * Social platform to Lucide icon mapping
 */
export const socialIconMap: Record<SocialPlatform, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  behance: Palette, // Using Palette as closest match
  dribbble: Palette, // Using Palette as closest match
  medium: FileText, // Using FileText as closest match
  devto: Code,
  codepen: Code,
  stackoverflow: Code,
  discord: MessageCircle,
  telegram: MessageCircle, // Using MessageCircle as closest match
  email: Mail,
  website: Globe,
  other: Globe,
};

/**
 * Get Lucide icon component for a social platform
 */
export function getSocialIcon(platform: SocialPlatform): LucideIcon {
  return socialIconMap[platform] || Globe;
}

/**
 * Common icon mappings
 */
export const commonIcons = {
  home: Home,
  user: User,
  briefcase: Briefcase,
  fileText: FileText,
  messageCircle: MessageCircle,
  code: Code,
  palette: Palette,
  chevronUp: ChevronUp,
  menu: Menu,
  x: X,
  mail: Mail,
  globe: Globe,
} as const;

