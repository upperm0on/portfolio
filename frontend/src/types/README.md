# Portfolio Types

Comprehensive TypeScript type definitions for the portfolio data structure.

## Overview

All portfolio-related types are defined in `src/types/portfolio.ts` and exported through `src/types/index.ts`.

## Core Types

### PersonalInfo
Personal information including name, title, bio, contact details, and avatar.

### SocialLink
Social media platform links with platform type, URL, and display order.

### WorkLink
Work and portfolio showcase links (blog, Behance, Dribbble, etc.).

### Project
Complete project information including:
- Basic info (title, description, dates)
- Media (images, videos)
- Technical details (tech stack)
- Links (demo, GitHub, case study)
- Metadata (category, status, tags)
- Animation configuration

### AboutSection
About section content with different types:
- `text`: Text content
- `skills`: Skills list
- `timeline`: Timeline items (experience, education)
- `stats`: Statistics
- `interests`: Personal interests
- `values`: Core values

### Portfolio
Complete portfolio data structure combining all above types.

## Enums

### SocialPlatform
Supported social media platforms (GitHub, LinkedIn, Twitter, etc.).

### ProjectCategory
Project categories (web, mobile, design, etc.).

### ProjectStatus
Project status (completed, in-progress, archived, planned).

### SkillLevel
Skill proficiency levels (beginner, intermediate, advanced, expert).

### TimelineItemType
Timeline item types (experience, education, achievement, certification).

### WorkLinkType
Work link types (portfolio, blog, Behance, etc.).

## Utility Types

### FeaturedProject
Project with `featured: true`.

### ActiveProject
Project with status `completed` or `in-progress`.

### SocialLinkGroup
Grouped social links by category.

### ProjectGroup
Grouped projects by category.

## Usage

```typescript
import type { 
  Project, 
  PersonalInfo, 
  SocialLink,
  Portfolio,
  ProjectCategory,
  ProjectStatus 
} from '@/types';

// Use in function parameters
function displayProject(project: Project) {
  // ...
}

// Use in component props
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

// Use enums
const category: ProjectCategory = ProjectCategory.WEB;
const status: ProjectStatus = ProjectStatus.COMPLETED;
```

## Type Guards

Runtime type checking utilities are available in `src/utils/data/typeGuards.ts`:

```typescript
import { isProject, isPersonalInfo, isSocialLink } from '@/utils/data/typeGuards';

if (isProject(data)) {
  // TypeScript knows data is Project here
  console.log(data.title);
}
```

## Best Practices

1. **Always use types** - Don't use `any`, use proper types
2. **Use enums** - Use enum values instead of string literals
3. **Leverage type guards** - Use type guards for runtime validation
4. **Import from barrel** - Import from `@/types` for convenience

