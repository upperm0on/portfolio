# Directional Parallax & Reveal System

A unified scroll animation system where elements fade in and slide from different directions as they enter the viewport, with optional parallax behavior tied to scroll progress.

## Overview

This system provides:
- **Directional reveals**: Elements fade in and slide from different directions (up, down, left, right, in, out)
- **Parallax effects**: Subtle movement at different speeds while scrolling
- **Attribute-driven**: Simple data attributes control all behavior
- **Accessibility**: Respects `prefers-reduced-motion` preferences
- **Performance**: Uses GSAP with ScrollTrigger for smooth, performant animations

## Attributes

### Directional Reveal

- `data-animate-direction`: Direction of reveal animation
  - `up`: Slides up into place (from below)
  - `down`: Slides down into place (from above)
  - `left`: Slides in from left
  - `right`: Slides in from right
  - `in`: Zooms in (scale from smaller)
  - `out`: Zooms out (scale from larger)

- `data-animate-delay`: Delay before animation starts (in seconds, e.g., "0.2")
- `data-animate-duration`: Duration of animation (in seconds, e.g., "0.8")
- `data-animate-group`: Group ID for stagger effects (e.g., "hero-ctas")
- `data-animate-stagger`: Stagger delay between group items (in seconds, e.g., "0.1")

### Parallax

- `data-parallax`: Parallax intensity level
  - `none`: No parallax (default)
  - `low`: Subtle movement (±6px)
  - `medium`: Moderate movement (±12.5px)
  - `high`: Strong movement (±25px)

### Depth Integration

- `data-depth`: Depth level (affects parallax intensity)
  - `background`: Strong parallax
  - `mid`: Standard parallax
  - `foreground`: Subtle parallax
  - `ui`: No parallax

## Usage

### Basic Example

```tsx
<div data-animate-direction="up" data-animate-delay="0.2">
  Content that slides up when scrolled into view
</div>
```

### With Parallax

```tsx
<div 
  data-animate-direction="left" 
  data-parallax="medium"
  data-depth="foreground"
>
  Content with parallax effect
</div>
```

### Staggered Group

```tsx
<div data-animate-group="my-group" data-animate-stagger="0.1">
  <div data-animate-direction="up" data-animate-group="my-group">Item 1</div>
  <div data-animate-direction="up" data-animate-group="my-group">Item 2</div>
  <div data-animate-direction="up" data-animate-group="my-group">Item 3</div>
</div>
```

## API

### Functions

#### `initDirectionalParallax(rootEl?)`

Initialize both directional reveals and parallax effects for all elements with the appropriate data attributes.

```ts
import { initDirectionalParallax } from '@/utils/animation/directionalParallax';

const cleanup = initDirectionalParallax(document.body);
// Later: cleanup();
```

#### `createDirectionalReveal(element, options)`

Create a directional reveal animation for a single element.

```ts
import { createDirectionalReveal } from '@/utils/animation/directionalParallax';

const tween = createDirectionalReveal(element, {
  direction: 'up',
  delay: 0.2,
  duration: 0.7,
});
```

#### `createParallaxEffect(element, options)`

Create a parallax effect for a single element.

```ts
import { createParallaxEffect } from '@/utils/animation/directionalParallax';

const trigger = createParallaxEffect(element, {
  level: 'medium',
  depth: 'foreground',
});
```

### React Hooks

#### `useDirectionalReveal(options)`

React hook for directional reveal animation.

```tsx
import { useDirectionalReveal } from '@/hooks/useDirectionalReveal';

function MyComponent() {
  const ref = useDirectionalReveal({ direction: 'up', delay: 0.2 });
  return <div ref={ref}>Content</div>;
}
```

#### `useParallax(options)`

React hook for parallax effect.

```tsx
import { useParallax } from '@/hooks/useParallax';

function MyComponent() {
  const ref = useParallax({ level: 'medium', depth: 'foreground' });
  return <div ref={ref}>Content</div>;
}
```

## Section Mapping

### Hero Section
- Name: `direction="up"`, `parallax="low"`
- Title: `direction="up"`, `parallax="low"`, delay 0.1s
- Tagline: `direction="up"`, `parallax="low"`, delay 0.2s
- CTAs: `direction="up"`, `parallax="low"`, staggered

### About Section
- Heading: `direction="right"`
- Story text: `direction="up"`
- Skills categories: Alternate `left`/`right`
- Meta panel: `direction="left"`

### Projects Section
- Section heading: `direction="up"`
- Featured text: `direction="right"`
- Featured image: `direction="left"`, `parallax="medium"`
- Grid cards: `direction="up"`, staggered

### Contact Section
- Heading: `direction="up"`
- Primary CTA: `direction="up"`
- Meta: `direction="up"`
- Social icons: `direction="up"`, staggered

## Reduced Motion

The system automatically respects `prefers-reduced-motion`:
- Directional reveals become fade-only (no positional movement)
- Parallax effects are disabled
- Animations use shorter durations

## Performance

- Only animates `transform` and `opacity` properties
- Uses GSAP's optimized ScrollTrigger
- Limits blur effects to reduce GPU load
- Groups elements where possible to reduce ScrollTrigger instances

## Integration

The system is automatically initialized in `Layout.tsx` via `useGlobalAnimations` hook. It coordinates with:
- Scroll depth animations (3D layer stack)
- Floating animations (idle effects)
- Hero turn-on timeline

