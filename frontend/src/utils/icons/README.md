# Icon System

This project uses [Lucide React](https://lucide.dev/) for all icons, providing a consistent and beautiful icon set throughout the portfolio.

## Usage

### Social Media Icons

Social media icons are automatically mapped based on the platform:

```typescript
import { getSocialIcon } from '@/utils/icons';
import { Icon } from '@/components/common/Icon';
import { SocialPlatform } from '@/types';

const GithubIcon = getSocialIcon(SocialPlatform.GITHUB);

<Icon icon={GithubIcon} size={20} />
```

### Common Icons

Use common icons from the `commonIcons` object:

```typescript
import { commonIcons } from '@/utils/icons';
import { Icon } from '@/components/common/Icon';

<Icon icon={commonIcons.chevronUp} size={24} />
<Icon icon={commonIcons.menu} size={20} />
<Icon icon={commonIcons.x} size={18} />
```

### Available Common Icons

- `home` - Home icon
- `user` - User/profile icon
- `briefcase` - Work/briefcase icon
- `fileText` - Document icon
- `messageCircle` - Message/chat icon
- `code` - Code icon
- `palette` - Design/palette icon
- `chevronUp` - Up arrow
- `menu` - Hamburger menu
- `x` - Close/X icon
- `mail` - Email icon
- `globe` - Website/globe icon

### Icon Component

The `Icon` component provides consistent styling and sizing:

```tsx
import { Icon } from '@/components/common/Icon';
import { Mail } from 'lucide-react';

<Icon 
  icon={Mail} 
  size={20} 
  className="custom-class"
  aria-label="Send email"
/>
```

### Props

- `icon`: LucideIcon component (required)
- `size`: Number or string (default: 24)
- `className`: Additional CSS classes
- `aria-label`: Accessibility label
- `aria-hidden`: Hide from screen readers (default: false)

### Social Platform Mapping

All social platforms are mapped to appropriate Lucide icons:

- **GitHub** → `Github`
- **LinkedIn** → `Linkedin`
- **Twitter** → `Twitter`
- **Instagram** → `Instagram`
- **Facebook** → `Facebook`
- **YouTube** → `Youtube`
- **Behance** → `Palette`
- **Dribbble** → `Palette`
- **Medium** → `FileText`
- **Dev.to** → `Code`
- **CodePen** → `Code`
- **Stack Overflow** → `Code`
- **Discord** → `MessageCircle`
- **Telegram** → `MessageCircle`
- **Email** → `Mail`
- **Website** → `Globe`

### Navigation Icons

Navigation items can use Lucide icons:

```typescript
import { commonIcons } from '@/utils/icons';

const navItems = [
  { 
    label: 'Home', 
    href: '#home',
    icon: commonIcons.home 
  },
  { 
    label: 'About', 
    href: '#about',
    icon: commonIcons.user 
  },
];
```

### Adding New Icons

To add a new icon:

1. Import it from `lucide-react`
2. Add it to `commonIcons` in `iconMapping.tsx`
3. Use it via the `Icon` component

```typescript
// In iconMapping.tsx
import { NewIcon } from 'lucide-react';

export const commonIcons = {
  // ... existing icons
  newIcon: NewIcon,
};
```

## Benefits

- ✅ **Consistent** - All icons from the same design system
- ✅ **Scalable** - Vector icons that scale perfectly
- ✅ **Accessible** - Built-in accessibility support
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Customizable** - Easy to style and size
- ✅ **Tree-shakeable** - Only imports what you use

