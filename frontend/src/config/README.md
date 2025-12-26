# Portfolio Configuration

## Overview

The portfolio configuration is centralized in `portfolio.config.ts`. This file contains all your portfolio data and can be easily edited to update your portfolio content.

## Quick Start

1. **Edit** `src/config/portfolio.config.ts`
2. **Update** the data in the `portfolioConfig` object
3. **Save** - Changes are automatically available throughout the app

## Configuration Structure

```typescript
export const portfolioConfig: PortfolioConfig = {
  version: '1.0.0',
  lastUpdated: '...',
  
  personal: { /* Your personal info */ },
  social: [ /* Social media links */ ],
  workLinks: [ /* Work/portfolio links */ ],
  projects: [ /* Your projects */ ],
  about: { /* About section content */ },
};
```

## Environment-Based Configs

The system supports different configs for different environments:

- **Development**: Uses `portfolio.config.dev.ts` (can override production config)
- **Production**: Uses `portfolio.config.ts`

Edit `portfolio.config.dev.ts` to customize development data.

## Auto-Validation

In development mode, the config is automatically validated on load. You'll see:
- ✅ Success message if config is valid
- ❌ Error messages with context if validation fails  
- ⚠️ Warnings for missing optional data

## Type-Safe Builders

Use builder functions for creating config entries with full autocomplete:

```typescript
import { createProjectHelper, createSocialLinkHelper } from '@/utils/config/builders';
import { ProjectCategory, SocialPlatform } from '@/types';

const project = createProjectHelper(
  'My Project',
  'Description...',
  'Short desc',
  ProjectCategory.WEB
);

const socialLink = createSocialLinkHelper(
  SocialPlatform.GITHUB,
  'https://github.com/username'
);
```

See `src/utils/config/README.md` for more builder examples.

## Future: Backend Integration

When you're ready to add a backend, you can easily swap the config loader:

### Current (File-based)
```typescript
// src/utils/config/portfolioConfigLoader.ts
export function loadPortfolioConfig(): PortfolioConfig {
  return portfolioConfig; // Static config
}
```

### Future (API-based)
```typescript
// src/utils/config/portfolioConfigLoader.ts
export async function loadPortfolioConfig(): Promise<PortfolioConfig> {
  const response = await fetch('/api/portfolio/config');
  return response.json();
}
```

**No other changes needed!** All data files automatically use the loader.

## Benefits

- ✅ **Single source of truth** - All data in one place
- ✅ **Easy to edit** - Just update the config file
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Future-ready** - Easy to swap for API calls
- ✅ **Validated** - Runtime validation available

## See Also

- `src/data/README.md` - Data structure documentation
- `src/types/README.md` - Type definitions documentation

