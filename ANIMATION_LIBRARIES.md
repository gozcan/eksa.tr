# Animation Libraries Integration Guide

This document explains how to use the three animation/gesture libraries that have been added to the project.

## Installed Libraries

1. **Framer Motion** (v12.38.0) - React animation library with gesture support
2. **React Use Gesture** (v10.3.1) - Unified gesture detection for mouse/touch/pointer events
3. **AOS** (v2.3.4) - Animate on Scroll library for scroll reveal animations
4. **React Spring** (included for gesture animations) - Spring physics animation library

---

## 1. Framer Motion

### What it is
Framer Motion is the most popular React animation library. It provides a simple declarative API for complex animations with excellent TypeScript support.

### When to use
- Page transitions
- Micro-interactions (hover, click effects)
- Complex interactive animations
- Staggered animations for lists
- Gesture-based animations (swipe, drag)

### Basic Usage

```jsx
import { motion } from 'framer-motion';

// Simple fade-in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// With variants for reusability
<motion.button
  variants={animationVariants.slideInUp}
  initial="initial"
  animate="animate"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### Available Variants in `src/lib/animations.ts`
- `fadeIn` - Fade in animation
- `slideInUp` - Slide up and fade in
- `slideInDown` - Slide down and fade in
- `slideInLeft` - Slide from left and fade in
- `slideInRight` - Slide from right and fade in
- `scaleIn` - Scale from small to full size
- `rotateIn` - Rotate while fading in
- `staggerContainer` - Container for staggered children
- `staggerItem` - Individual item in stagger animation
- `hoverVariants` - Hover and tap effects
- `listContainerVariants` - List container with stagger
- `listItemVariants` - List item with spring animation

### Advanced Features
```jsx
// Animate on hover
<motion.div whileHover={{ scale: 1.1 }}>
  Hover me!
</motion.div>

// Gesture support (drag, gesture)
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100 }}
  onDragEnd={(event, info) => console.log(info.point.x)}
>
  Draggable
</motion.div>

// Exit animations
<motion.div
  exit={{ opacity: 0 }}
  layoutId="uniqueId"
>
  I'll animate out when removed
</motion.div>
```

---

## 2. React Use Gesture

### What it is
A unified library for detecting gestures in React apps. Works with mouse, touch, and pointer events.

### When to use
- Drag and drop interactions
- Swipe gestures
- Multi-touch detection
- Complex gesture combinations
- Cross-device compatibility (mouse + touch)

### Basic Usage

```jsx
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

export function DraggableComponent() {
  const [{ x, y }, springsApi] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useGesture({
    onDrag: ({ offset: [ox, oy] }) => {
      springsApi.start({ x: ox, y: oy });
    },
    onHover: ({ hovering }) => {
      // Handle hover
    },
    onClick: () => {
      // Handle click
    },
  });

  return (
    <animated.div
      {...bind()}
      style={{ x, y, touchAction: 'none' }}
    >
      Drag me!
    </animated.div>
  );
}
```

### Supported Gestures
- `onDrag` - Mouse drag or touch drag
- `onHover` - Mouse hover detection
- `onWheel` - Mouse wheel events
- `onScroll` - Scroll events
- `onClick` - Click events
- `onPinch` - Pinch gesture (touch)
- `onMove` - Any mouse movement

### With Framer Motion
```jsx
import { motion } from 'framer-motion';

const bind = useGesture({
  onDrag: ({ offset: [ox, oy] }) => {
    // Update animation
  },
});

<motion.div {...bind()} drag>
  Draggable with Framer Motion
</motion.div>
```

---

## 3. AOS (Animate on Scroll)

### What it is
A lightweight JavaScript library that triggers CSS animations when elements scroll into view.

### When to use
- Scroll reveal animations
- Simple entrance animations based on scroll
- Performance-critical sites (lighter than GSAP)
- Mobile-friendly scroll animations

### Basic Setup

```jsx
// In a client component or layout:
import { useAOS } from '@/lib/animations';

export function Page() {
  useAOS(); // Initialize AOS once per page/layout

  return (
    <div>
      {/* Elements will animate when scrolled into view */}
    </div>
  );
}
```

### Usage Examples

```jsx
// Fade in
<div data-aos="fade-in">
  Fades in when visible
</div>

// Slide up
<div data-aos="fade-up">
  Slides and fades up
</div>

// With delay
<div data-aos="fade-up" data-aos-delay="200">
  Starts animating 200ms after entering viewport
</div>

// With custom duration
<div data-aos="zoom-in" data-aos-duration="2000">
  Takes 2 seconds to animate
</div>

// Repeat animation
<div data-aos="bounce" data-aos-once="false">
  Animates every time it enters viewport
</div>
```

### Available AOS Animations
- `fade-in`, `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `flip-left`, `flip-right`, `flip-up`, `flip-down`
- `slide-up`, `slide-down`, `slide-left`, `slide-right`
- `zoom-in`, `zoom-in-up`, `zoom-in-down`, `zoom-in-left`, `zoom-in-right`
- `bounce`, `bounce-up`, `bounce-down`, `bounce-left`, `bounce-right`
- `rotate`, `roll`

### AOS Attributes
- `data-aos` - Animation type
- `data-aos-offset` - Offset (in px) from the original trigger point
- `data-aos-delay` - Delay in milliseconds
- `data-aos-duration` - Duration in milliseconds (default: 1000)
- `data-aos-once` - Whether animation happens only once (default: true)
- `data-aos-easing` - Easing type (linear, ease-in, ease-out, etc.)

---

## Integration Tips

### Combine Libraries for Best Results

```jsx
// Use AOS for scroll reveals, Framer Motion for interactions
<motion.div
  data-aos="fade-up"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  I animate on scroll AND on interaction!
</motion.div>
```

### Performance Considerations

1. **AOS** - Best for performance, uses CSS animations
2. **Framer Motion** - Good performance, GPU-accelerated transforms
3. **React Use Gesture + Springs** - Higher performance cost, use sparingly
4. **GSAP** - Already in project, use for complex timeline animations

### Memory Management

```jsx
// Always clean up in useEffect if needed
useEffect(() => {
  // Setup animation
  return () => {
    // Cleanup if necessary
  };
}, []);
```

---

## Example Components

Ready-to-use example components are available in `src/components/examples/`:

- `framer-motion-example.tsx` - Framer Motion demonstrations
- `react-use-gesture-example.tsx` - Gesture handling examples
- `aos-example.tsx` - Scroll reveal animations

---

## What to Use When

| Situation | Best Library |
|-----------|--------------|
| Scroll reveal animations | **AOS** |
| Button hover effects | **Framer Motion** |
| Complex timeline animations | **GSAP** (already in project) |
| Drag and drop | **React Use Gesture** |
| Page transitions | **Framer Motion** |
| Gesture detection (pinch, swipe) | **React Use Gesture** |
| Staggered list animations | **Framer Motion** |
| Performance-critical features | **AOS** |
| Interactive animations | **Framer Motion** + **React Use Gesture** |

---

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Use Gesture Docs](https://use-gesture.netlify.app/)
- [AOS Docs](https://michalsnik.github.io/aos/)
- [React Spring Docs](https://www.react-spring.dev/)
