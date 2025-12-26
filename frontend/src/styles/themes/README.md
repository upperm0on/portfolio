# Text Hierarchy System

A comprehensive white shade system for visual emphasis and hierarchy.

## Color Levels

The system uses 9 levels of white opacity for different emphasis levels:

| Level | Opacity | Usage | CSS Variable | Class |
|-------|---------|-------|--------------|-------|
| **Hero** | 100% | Hero text, main headlines | `--universe-text-hero` | `.text-hero` |
| **Primary** | 95% | Primary headings, important content | `--universe-text-primary` | `.text-primary` |
| **Emphasis** | 90% | Emphasized text, key information | `--universe-text-emphasis` | `.text-emphasis` |
| **Body** | 85% | Body text, main content | `--universe-text-body` | `.text-body` |
| **Secondary** | 70% | Secondary content, descriptions | `--universe-text-secondary` | `.text-secondary` |
| **Tertiary** | 60% | Metadata, labels, captions | `--universe-text-tertiary` | `.text-tertiary` |
| **Muted** | 50% | Less important info, helper text | `--universe-text-muted` | `.text-muted` |
| **Subtle** | 40% | Hints, placeholders | `--universe-text-subtle` | `.text-subtle` |
| **Disabled** | 25% | Disabled/inactive elements | `--universe-text-disabled` | `.text-disabled` |

## Default Hierarchy

### Headings
- **h1**: Hero (100% white) - Main page titles
- **h2**: Primary (95% white) - Section headings
- **h3, h4**: Emphasis (90% white) - Subheadings
- **h5, h6**: Body (85% white) - Minor headings

### Body Text
- **p, body**: Body (85% white) - Main content
- **small**: Secondary (70% white) - Small text
- **em**: Emphasis (90% white) - Italic emphasis
- **strong, b**: Primary (95% white) - Bold emphasis

### Special Elements
- **label**: Secondary (70% white) - Form labels
- **small, .text-sm**: Secondary (70% white) - Small text
- **.text-caption**: Tertiary (60% white) - Captions
- **.text-meta**: Tertiary (60% white) - Metadata
- **.text-helper**: Muted (50% white) - Helper text

## Usage Examples

### Using CSS Variables

```css
.my-important-text {
  color: var(--universe-text-primary); /* 95% white */
}

.my-secondary-text {
  color: var(--universe-text-secondary); /* 70% white */
}
```

### Using Utility Classes

```html
<h1 class="text-hero">Hero Title</h1>
<p class="text-body">Main content text</p>
<span class="text-secondary">Secondary information</span>
<small class="text-muted">Less important note</small>
```

### In React Components

```tsx
<div className="text-primary">Important content</div>
<p className="text-body">Regular paragraph</p>
<span className="text-tertiary">Metadata</span>
```

## Best Practices

1. **Use Hero (100%) sparingly** - Only for the most important hero text
2. **Primary (95%) for headings** - Main section headings
3. **Body (85%) for content** - Standard paragraph text
4. **Secondary (70%) for supporting text** - Descriptions, labels
5. **Tertiary (60%) for metadata** - Dates, tags, captions
6. **Muted (50%) for less important info** - Helper text, footnotes
7. **Subtle (40%) for hints** - Placeholders, hints
8. **Disabled (25%) for inactive** - Disabled buttons, inactive states

## Visual Hierarchy Example

```html
<h1 class="text-hero">Main Hero Title</h1>
<h2 class="text-primary">Section Heading</h2>
<p class="text-body">
  This is the main body text. It uses 85% opacity for good readability.
  <strong class="text-primary">Important words</strong> stand out more.
</p>
<p class="text-secondary">
  This secondary text provides supporting information at 70% opacity.
</p>
<small class="text-tertiary">Published on January 1, 2024</small>
```

## Links

Links use accent colors but adapt to context:
- **Body links**: Full accent color
- **Secondary links**: 90% opacity accent
- **Tertiary links**: 80% opacity accent

## Responsive Considerations

Text hierarchy remains consistent across breakpoints, but you may want to adjust opacity slightly for better readability on smaller screens if needed.

