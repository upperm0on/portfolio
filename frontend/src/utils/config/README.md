# Config Utilities

Utilities for loading and managing portfolio configuration.

## Features

- ✅ **Auto-validation** - Config is automatically validated in development mode
- ✅ **Hot reload support** - Config changes trigger hot module reload
- ✅ **Environment-based configs** - Different configs for dev/prod
- ✅ **Type-safe builders** - Helper functions for creating config entries

## Config Loader

The `portfolioConfigLoader` automatically:
- Loads the appropriate config based on environment
- Validates config in development mode
- Supports hot module reload
- Provides clear error messages

### Usage

```typescript
import { loadPortfolioConfig, getPortfolioData } from '@/utils/config';

// Load raw config
const config = loadPortfolioConfig();

// Get portfolio data (validated)
const portfolio = getPortfolioData();
```

## Type-Safe Builders

Use builder functions to create config entries with full type safety:

### Creating Projects

```typescript
import { createProject, createProjectHelper } from '@/utils/config/builders';
import { ProjectCategory, ProjectStatus } from '@/types';

// Using helper (recommended)
const project = createProjectHelper(
  'My Project',
  'Full description...',
  'Short description',
  ProjectCategory.WEB,
  {
    status: ProjectStatus.COMPLETED,
    featured: true,
    tags: ['react', 'typescript'],
  }
);

// Using builder
const project2 = createProject({
  title: 'Another Project',
  // ... other fields
});
```

### Creating Social Links

```typescript
import { createSocialLink, createSocialLinkHelper } from '@/utils/config/builders';
import { SocialPlatform } from '@/types';

// Using helper
const link = createSocialLinkHelper(
  SocialPlatform.GITHUB,
  'https://github.com/username',
  {
    displayOrder: 1,
    category: 'professional',
  }
);
```

### Creating Other Config Items

```typescript
import {
  createWorkLink,
  createTechStack,
  createProjectImage,
  createSkill,
  createTimelineItem,
} from '@/utils/config/builders';

const workLink = createWorkLink({
  type: WorkLinkType.WEBSITE,
  url: 'https://example.com',
  label: 'My Website',
});

const tech = createTechStack({
  name: 'React',
  category: 'framework',
  level: SkillLevel.ADVANCED,
});
```

## Environment-Based Configs

Different configs are loaded based on environment:

- **Development**: `portfolio.config.dev.ts`
- **Production**: `portfolio.config.ts`

To customize dev config, edit `src/config/portfolio.config.dev.ts`.

## Validation

Config is automatically validated in development mode. You'll see:
- ✅ Success message if config is valid
- ❌ Error messages with context if validation fails
- ⚠️ Warnings for missing optional data

## Future: API Integration

When ready to use an API, modify `loadPortfolioConfig()`:

```typescript
export async function loadPortfolioConfig(): Promise<PortfolioConfig> {
  try {
    const response = await fetch('/api/portfolio/config');
    if (!response.ok) throw new Error('Failed to load config');
    return await response.json();
  } catch (error) {
    console.error('Error loading config:', error);
    // Fallback to local config
    return portfolioConfig;
  }
}
```

