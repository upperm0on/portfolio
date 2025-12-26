# Portfolio Data Structure

This directory contains all portfolio data that is loaded from a central configuration file. All data is type-safe and can be easily modified by editing the config file.

## Overview

All portfolio data (personal info, social links, projects, about section) is centralized in a single configuration file: `src/config/portfolio.config.ts`. This makes it easy to update your portfolio content without touching component code.

## File Structure

```
src/
├── config/
│   └── portfolio.config.ts    # ⭐ MAIN CONFIG FILE - Edit this to update your portfolio
├── data/
│   ├── personalData.ts        # Personal information getters
│   ├── socialData.ts          # Social links getters
│   ├── workLinksData.ts       # Work/portfolio links getters
│   ├── projectsData.ts         # Projects getters
│   ├── aboutData.ts           # About section getters
│   └── portfolioData.ts        # Master data export
└── utils/
    └── config/
        └── portfolioConfigLoader.ts  # Config loader (can be swapped for API later)
```

## How to Update Your Portfolio Data

### Quick Start

1. **Open** `src/config/portfolio.config.ts`
2. **Edit** the data in the `portfolioConfig` object
3. **Save** - Changes are automatically reflected throughout the app

### Example: Adding a Project

```typescript
// In src/config/portfolio.config.ts
projects: [
  // ... existing projects
  {
    id: 'my-new-project',
    title: 'My New Project',
    shortDescription: 'A brief description',
    description: 'A detailed description...',
    category: ProjectCategory.WEB,
    status: ProjectStatus.COMPLETED,
    featured: true,
    date: '2024-01-15',
    images: [
      {
        url: '/images/projects/my-project.jpg',
        alt: 'My New Project',
        isPrimary: true,
      },
    ],
    techStack: [
      {
        name: 'React',
        category: 'framework',
        level: SkillLevel.ADVANCED,
      },
    ],
    links: [
      {
        type: 'demo',
        url: 'https://myproject.com',
        label: 'Live Demo',
      },
    ],
    tags: ['web', 'react'],
  },
],
```

### Example: Updating Personal Info

```typescript
// In src/config/portfolio.config.ts
personal: {
  name: 'Your Name',
  title: 'Your Title',
  bio: {
    short: 'Your short bio',
    long: 'Your long bio',
  },
  // ... rest of personal info
},
```

## Using Data in Components

### Import Individual Data

```typescript
import { personalData, socialData, projectsData } from '@/data';
// or
import { getPersonalInfo, getSocialLinks, getProjects } from '@/data';
```

### Import Complete Portfolio

```typescript
import { portfolioData, getPortfolio } from '@/data';
// or
import portfolioData from '@/data'; // default export
```

### Using Helper Functions

```typescript
import { 
  getFeaturedProjects, 
  getProjectsByCategory,
  searchProjects 
} from '@/utils/data';

const featured = getFeaturedProjects(projectsData);
const webProjects = getProjectsByCategory(projectsData, ProjectCategory.WEB);
const results = searchProjects(projectsData, 'react');
```

## Future: Backend Integration

When you're ready to add a backend, you can easily swap the config loader:

1. **Modify** `src/utils/config/portfolioConfigLoader.ts`
2. **Replace** `loadPortfolioConfig()` with an API call:

```typescript
export async function loadPortfolioConfig(): Promise<PortfolioConfig> {
  const response = await fetch('/api/portfolio/config');
  return response.json();
}
```

All data files will automatically use the new loader without any other changes needed!

## Data Validation

The portfolio data is validated on load. You can validate manually:

```typescript
import { validatePortfolioConfig } from '@/utils/data/validation';

const result = validatePortfolioConfig(portfolioConfig);
if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

## Type Safety

All data is fully typed. Use TypeScript autocomplete to see available fields:

```typescript
import type { Project, PersonalInfo, SocialLink } from '@/types';

const project: Project = {
  // TypeScript will autocomplete all required fields
};
```

## Animation Support

Projects and sections can include animation configuration:

```typescript
{
  // ... project data
  animationConfig: {
    delay: 0.2,
    duration: 0.6,
    easing: 'power2.out',
    trigger: 'scroll',
    stagger: 0.1,
  },
}
```

This makes it easy to integrate with GSAP animations later.

