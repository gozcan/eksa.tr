# Using Animation Libraries in Components

This guide shows how to integrate the new animation libraries into your existing components.

## 1. AnimatedButton Component

Replace regular buttons with animated versions for better UX.

```jsx
import { AnimatedButton } from '@/components/animated-button';

// In your component
<AnimatedButton 
  variant="primary" 
  size="md"
  onClick={() => console.log('Clicked')}
>
  Click Me
</AnimatedButton>

// Variants: primary, secondary, outline
// Sizes: sm, md, lg
```

**Where to use:**
- CTA buttons throughout the site
- Navigation buttons
- Form submission buttons
- Action buttons in sections

---

## 2. AnimatedCard & AnimatedCardGrid

Wrap cards in these components for smooth entrance animations on scroll.

```jsx
import { AnimatedCard, AnimatedCardGrid } from '@/components/animated-card';

// Single card
<AnimatedCard delay={0.1} className="p-6 border rounded">
  Card content
</AnimatedCard>

// Card grid with stagger
<AnimatedCardGrid columns={3} gap="md" staggerDelay={0.1}>
  {cards.map((card, i) => (
    <AnimatedCard key={card.id}>
      {card.content}
    </AnimatedCard>
  ))}
</AnimatedCardGrid>
```

**Where to use:**
- Project cards in ProjectsSection
- Service cards in ServiceLayerSection
- Team members
- Portfolio items
- Testimonials

---

## 3. AnimatedText & AnimatedCharacter

Create engaging text animations for headings and titles.

```jsx
import { AnimatedText, AnimatedCharacter } from '@/components/animated-text';

// Word-based stagger
<AnimatedText 
  text="Animate each word individually"
  className="text-4xl font-bold"
  staggerAmount={0.02}
/>

// Character-based animation (more dramatic)
<AnimatedCharacter 
  text="EKSA"
  className="text-6xl font-bold"
  staggerAmount={0.05}
/>
```

**Where to use:**
- Page titles and headings
- Section introductions
- Hero text
- Brand names (like "EKSA")
- Important copy

---

## 4. Interactive Elements (Drag & HoverReveal)

Add interactive gestures and hover effects.

```jsx
import { InteractiveDragCard, HoverReveal } from '@/components/interactive-elements';

// Draggable card
<InteractiveDragCard
  title="Draggable Item"
  description="Try dragging me"
  onDragEnd={(pos) => console.log('Position:', pos)}
>
  Additional content
</InteractiveDragCard>

// Hover reveal
<HoverReveal
  className="h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
  revealContent={<p>Hidden content revealed on hover!</p>}
>
  <p>Hover to reveal</p>
</HoverReveal>
```

**Where to use:**
- Interactive portfolio pieces
- Hover reveals for project previews
- Draggable elements for engagement
- Interactive demos

---

## 5. Enhanced Section with AOS

Use EnhancedSection to add scroll reveal animations to entire sections.

```jsx
import { EnhancedSection, AnimatedList } from '@/components/enhanced-section';

// Basic section with scroll animation
<EnhancedSection 
  className="py-12"
  aosAnimation="fade-up"
  aosDuration={1000}
>
  <h2>Section Title</h2>
  <p>Content that fades up when scrolled into view</p>
</EnhancedSection>

// List with staggered animations
<AnimatedList
  items={[
    { id: '1', content: 'First item' },
    { id: '2', content: 'Second item' },
    { id: '3', content: 'Third item' },
  ]}
  staggerDelay={100}
/>
```

**AOS animation options:**
- fade-in, fade-up, fade-down, fade-left, fade-right
- zoom-in, zoom-out
- flip-left, flip-right, flip-up, flip-down
- slide-up, slide-down, slide-left, slide-right
- bounce, rotate, roll

---

## 6. Combining Libraries

Mix libraries for powerful effects.

```jsx
// AOS for scroll reveal + AnimatedButton for interaction
<div data-aos="fade-up">
  <h2>Section Title</h2>
  <AnimatedButton variant="primary">
    Learn More
  </AnimatedButton>
</div>

// Drag interaction + Framer Motion hover
<InteractiveDragCard
  title="Interact with me"
  className="hover:shadow-xl transition-shadow"
>
  <p>I respond to both dragging and hovering</p>
</InteractiveDragCard>
```

---

## Integration Examples

### 1. Enhance ProjectsSection

```jsx
'use client';

import { AnimatedCard } from '@/components/animated-card';
import { AnimatedButton } from '@/components/animated-button';
import { useAOS } from '@/lib/animations';

export function ProjectsSection({ messages }) {
  useAOS(); // Initialize AOS

  return (
    <section className="py-12">
      {/* Title with AOS */}
      <h2 data-aos="fade-up">Our Projects</h2>

      {/* Cards with stagger */}
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <AnimatedCard 
            key={project.id}
            delay={i * 0.1}
            className="p-6 border rounded-lg"
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <AnimatedButton 
              variant="secondary"
              size="sm"
              className="mt-4"
            >
              View Project
            </AnimatedButton>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}
```

### 2. Enhance Contact Section

```jsx
import { AnimatedButton } from '@/components/animated-button';
import { AnimatedText } from '@/components/animated-text';
import { EnhancedSection } from '@/components/enhanced-section';

export function ContactSection() {
  return (
    <EnhancedSection 
      className="py-16"
      aosAnimation="fade-up"
    >
      <AnimatedText
        text="Get in Touch"
        className="text-4xl font-bold mb-6"
      />
      
      <form className="space-y-4">
        <input type="email" placeholder="Your email" />
        <textarea placeholder="Your message" />
        <AnimatedButton variant="primary" size="lg">
          Send Message
        </AnimatedButton>
      </form>
    </EnhancedSection>
  );
}
```

### 3. Enhance Navigation

```jsx
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/animated-button';

export function Navigation() {
  return (
    <nav className="flex items-center gap-4">
      {/* Logo with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        EKSA
      </motion.div>

      {/* Navigation links with stagger */}
      <motion.div
        className="flex gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {['Home', 'About', 'Services'].map((link) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.1 }}
          >
            {link}
          </motion.a>
        ))}
      </motion.div>

      <AnimatedButton variant="secondary" size="sm">
        Contact
      </AnimatedButton>
    </nav>
  );
}
```

---

## Performance Tips

1. **Use `whileInView` for Framer Motion** - Don't animate off-screen elements
2. **Limit staggering** - Use reasonable delays (0.05-0.15s per item)
3. **Throttle gestures** - Use `touchAction: 'none'` on draggable elements
4. **AOS with `once: true`** - Animations play only once when scrolled into view
5. **Test on mobile** - Ensure smooth performance on touch devices

---

## Quick Reference

| Component | Best For | Key Props |
|-----------|----------|-----------|
| `AnimatedButton` | Interactive buttons | variant, size, onClick |
| `AnimatedCard` | Card entrance animations | delay, hoverScale, revealed |
| `AnimatedText` | Text word stagger | text, staggerAmount |
| `AnimatedCharacter` | Character animation | text, staggerAmount |
| `InteractiveDragCard` | Drag interactions | title, onDragEnd |
| `HoverReveal` | Hover animations | children, revealContent |
| `EnhancedSection` | Scroll reveals | aosAnimation, aosDuration |
| `AnimatedList` | List stagger | items, staggerDelay |

---

## Test the Showcase

Visit `/animation-showcase` to see all animations in action!

---

## Troubleshooting

**Animations not working?**
- Ensure `'use client'` is at the top of the file
- Call `useAOS()` once per layout/page for AOS

**Performance issues?**
- Reduce animation duration
- Use `once: true` in AOS
- Limit simultaneous animations

**Interactions not responsive?**
- Check `touchAction` prop on draggable elements
- Verify gesture binding in InteractiveDragCard

---
