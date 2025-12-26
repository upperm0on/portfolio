# Scroll Depth & Idle Floating System Design

This document details the design for the global motion layer, as specified in Milestone 8 (Part 1).

## 1. Attribute Contracts

### Depth Model (`data-depth`)
Used to determine how strongly an element responds to scroll and idle motion.
- `background`: starfield, nebula, deep gradients.
- `mid`: main sections (hero, about, projects, contact).
- `foreground`: key text, CTAs, cards.
- `ui`: header, overlays, cursor.

### Floating Levels (`data-float`)
Standardizes idle floating motion per element.
- `none`: (default) no float.
- `low`: tiny motion, good for text/headings.
- `medium`: slightly more motion (icons, badges, cards).
- `high`: used sparingly (background blobs, decorative elements).

## 2. Idle Detection & Modulation

### Hook: `useIdleDetection`
Located in `frontend/src/hooks/useIdleDetection.ts`.
- **Events**: `scroll`, `mousemove`, `touchstart`, `touchmove`, `keydown`, `wheel`, `click`.
- **Timeout**: 4000ms (default).
- **State**: `isIdle`, `timeSinceActivity`.
- **Callbacks**: `onIdleStart`, `onIdleEnd`.

### Modulation Logic
Floating animations will listen to `isIdle` state from a global context (or hook at the layout level).
- **Active → Idle**: Tween amplitudes from `active` presets to `idle` presets over 1.5s.
- **Idle → Active**: Immediate or quick (0.5s) tween back to `active` presets.

## 3. Scroll Depth Animation Spec

Each section (`data-depth="mid"`) will have a ScrollTrigger-based animation:
- **Enter (first reveal)**:
  - From: `scale: 0.95`, `opacity: 0`, `blur: 8px`.
  - To: `scale: 1.0`, `opacity: 1`, `blur: 0px`.
  - Ease: `power2.out`.
- **Exit (past viewport)**:
  - While exiting: gently scale to `0.98`, opacity `0.9`, blur `2px`.

Intensity modifiers based on `data-depth` are defined in `MOTION_CONFIG`.

## 4. Integration Points

### Layout Components
- `Layout.tsx`: Initialize `useIdleDetection` and provide `isIdle` via a provider.
- `Layout.tsx`: Call `initScrollDepthAnimations` on the root container.
- `BackgroundEffects.tsx`: Apply `data-depth="background"` and `data-float="high"`.
- `Section.tsx`: Automatically apply `data-depth="mid"` and register with the scroll depth system.

### Foreground Components
- `HeroTitle.tsx`: `data-depth="foreground"`, `data-float="low"`.
- `ProjectCard.tsx`: `data-depth="foreground"`, `data-float="medium"`.
- `Header.tsx`: `data-depth="ui"`, `data-float="none"`.

## 5. GSAP Wiring Plan

### `initScrollDepthAnimations(rootEl)`
1. Scan for elements with `data-depth`.
2. For each element:
   - Create a `gsap.fromTo` timeline.
   - Attach `ScrollTrigger` with `scrub: true` or `toggleActions: "play none none reverse"`.
   - Use values from `MOTION_CONFIG.depth[level]`.

### `initFloatingAnimations(rootEl)`
1. Scan for elements with `data-float`.
2. For each element:
   - Create an infinite yoyo tween (`repeat: -1`).
   - Store the tween reference.
   - Listen for global `isIdle` changes to update the tween's `vars` (specifically `x` and `y` amplitudes).

### `useScrollDepthAnimation(ref, options)`
- React hook for custom tuning.
- Manually creates a ScrollTrigger on the provided ref.

### `useFloating(ref, { level })`
- React hook for per-component floating control.
- Returns an object to control or modulate the float manually if needed.

