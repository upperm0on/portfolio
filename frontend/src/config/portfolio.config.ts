// Portfolio Configuration File
// This is the central configuration file for all portfolio data.
// In the future, this can be replaced with an API call to fetch from a backend.

import type { PortfolioConfig } from '../types/portfolio';
import { SocialPlatform, SkillLevel, WorkLinkType } from '../types/portfolio';

// ============================================================================
// PORTFOLIO CONFIGURATION
// ============================================================================
// Edit this file to update your portfolio data.
// All data files will read from this configuration.

export const portfolioConfig: PortfolioConfig = {
  version: '1.0.0',
  lastUpdated: new Date().toISOString(),

  // ============================================================================
  // Personal Information
  // ============================================================================
  personal: {
    name: 'Yaw Barimah Amponsah',
    title: 'Software / Systems Engineer',
    bio: {
      short: 'Building robust systems in a vast digital universe',
      long: 'I craft software systems that navigate the complexities of modern technology. With a passion for elegant solutions and scalable architecture, I bridge the gap between frontend experiences and backend infrastructure. My journey spans distributed systems, cloud platforms, and user-centric design—always exploring new frontiers in the digital cosmos.',
    },
    location: {
      city: 'Kumasi, Ashanti Region',
      country: 'Ghana',
      timezone: 'UTC+0',
    },
    contact: {
      email: 'barimahyawamponsah1844@gmail.com',
      phone: '+233 256614336',
      availability: 'Available for freelance work',
    },
    avatar: {
      url: '/images/avatar.jpg',
      alt: 'Yaw Barimah Amponsah',
    },
    resume: {
      url: '/resume.pdf',
      label: 'Download Resume',
    },
    meta: {
      seoDescription: 'Yaw Barimah Amponsah - Software & Systems Engineer from Ghana. Building robust systems and scalable architecture with expertise in distributed systems, cloud platforms, and modern web technologies.',
      keywords: ['portfolio', 'developer', 'designer',  'barimah', 'yaw', 'amponsah', 'dev barimah', 'developer in ghana', 'web developer in ghana', 'website developers around me', 'software engineer', 'systems engineer', 'full stack developer'],
    },
  },

  // ============================================================================
  // Social Media Links
  // ============================================================================
  social: [
    {
      platform: SocialPlatform.GITHUB,
      url: 'https://github.com/upperm0on',
      label: 'GitHub',
      displayOrder: 1,
      category: 'professional',
    },
    // LinkedIn profile - update with your actual LinkedIn URL
    // {
    //   platform: SocialPlatform.LINKEDIN,
    //   url: 'https://linkedin.com/in/yourusername',
    //   label: 'LinkedIn',
    //   displayOrder: 2,
    //   category: 'professional',
    // },
    {
      platform: SocialPlatform.TWITTER,
      url: 'https://twitter.com/barimahyaw',
      label: 'Twitter',
      displayOrder: 3,
      category: 'social',
    },
    // Add more social links as needed
  ],

  // ============================================================================
  // Work/Portfolio Links
  // ============================================================================
  workLinks: [
    {
      type: WorkLinkType.WEBSITE,
      url: 'https://hosttelz.com',
      label: 'Hosttelz',
      description: 'A Hostel Booking site for students in located in Ghana',
      displayOrder: 1,
    },
    {
      type: WorkLinkType.BLOG,
      url: 'https://kwabenaboakyeroyalventures.com',
      label: 'KB Royal Ventures',
      description: 'A website for the prestiguous KB royal ventures Business',
      displayOrder: 2,
    },
    // Add more work links as needed
  ],

  // ============================================================================
  // Projects
  // ============================================================================
  // Note: Projects are automatically fetched from GitHub (see ProjectsSection.tsx)
  // This array can be used as fallback or for manually curated projects
  projects: [],

  // ============================================================================
  // About Section
  // ============================================================================
  about: {
    sections: [
      {
        type: 'text',
        title: 'About Me',
        content: 'I am a passionate Software and Systems Engineer based in Kumasi, Ghana, with over 5 years of experience building scalable applications and robust systems. My expertise spans full-stack development, cloud infrastructure, and distributed systems architecture. I thrive on solving complex problems and creating elegant solutions that bridge the gap between user experience and technical excellence.',
        order: 1,
      },
      {
        type: 'skills',
        title: 'Skills',
        skills: [
          // Languages
          {
            name: 'JavaScript',
            level: SkillLevel.EXPERT,
            category: 'language',
            yearsOfExperience: 5,
          },
          {
            name: 'TypeScript',
            level: SkillLevel.EXPERT,
            category: 'language',
            yearsOfExperience: 4,
          },
          {
            name: 'Python',
            level: SkillLevel.ADVANCED,
            category: 'language',
            yearsOfExperience: 3,
          },
          {
            name: 'Go',
            level: SkillLevel.INTERMEDIATE,
            category: 'language',
            yearsOfExperience: 2,
          },
          // Frontend
          {
            name: 'React',
            level: SkillLevel.EXPERT,
            category: 'framework',
            yearsOfExperience: 4,
          },
          {
            name: 'Next.js',
            level: SkillLevel.ADVANCED,
            category: 'framework',
            yearsOfExperience: 3,
          },
          {
            name: 'Vue.js',
            level: SkillLevel.ADVANCED,
            category: 'framework',
            yearsOfExperience: 2,
          },
          // Backend
          {
            name: 'Node.js',
            level: SkillLevel.EXPERT,
            category: 'backend',
            yearsOfExperience: 5,
          },
          {
            name: 'Express',
            level: SkillLevel.ADVANCED,
            category: 'framework',
            yearsOfExperience: 4,
          },
          {
            name: 'FastAPI',
            level: SkillLevel.ADVANCED,
            category: 'framework',
            yearsOfExperience: 2,
          },
          // Systems
          {
            name: 'Docker',
            level: SkillLevel.ADVANCED,
            category: 'tool',
            yearsOfExperience: 4,
          },
          {
            name: 'Kubernetes',
            level: SkillLevel.INTERMEDIATE,
            category: 'tool',
            yearsOfExperience: 2,
          },
          {
            name: 'AWS',
            level: SkillLevel.ADVANCED,
            category: 'tool',
            yearsOfExperience: 3,
          },
          {
            name: 'Linux',
            level: SkillLevel.ADVANCED,
            category: 'tool',
            yearsOfExperience: 5,
          },
          // Databases
          {
            name: 'PostgreSQL',
            level: SkillLevel.ADVANCED,
            category: 'database',
            yearsOfExperience: 4,
          },
          {
            name: 'MongoDB',
            level: SkillLevel.ADVANCED,
            category: 'database',
            yearsOfExperience: 3,
          },
          {
            name: 'Redis',
            level: SkillLevel.INTERMEDIATE,
            category: 'database',
            yearsOfExperience: 2,
          },
        ],
        order: 2,
      },
      {
        type: 'stats',
        title: 'Statistics',
        stats: [
          {
            label: 'Years of Experience',
            value: '5+',
          },
          {
            label: 'Projects Completed',
            value: 50,
          },
          // Add more stats as needed
        ],
        order: 3,
      },
    ],
  },
};

