'use client';

import { useAOS } from '@/lib/animations';
import type { ReactNode } from 'react';

interface EnhancedSectionProps {
  children: ReactNode;
  className?: string;
  enableAOS?: boolean;
  aosAnimation?: string;
  aosDelay?: number;
  aosDuration?: number;
}

/**
 * Enhanced section wrapper that adds AOS scroll reveal animations
 * and ensures AOS is properly initialized
 */
export function EnhancedSection({
  children,
  className = '',
  enableAOS = true,
  aosAnimation = 'fade-up',
  aosDelay = 0,
  aosDuration = 1000,
}: EnhancedSectionProps) {
  useAOS();

  return (
    <section
      className={className}
      data-aos={enableAOS ? aosAnimation : undefined}
      data-aos-delay={enableAOS ? aosDelay : undefined}
      data-aos-duration={enableAOS ? aosDuration : undefined}
    >
      {children}
    </section>
  );
}

interface AnimatedListProps {
  items: Array<{ id: string; content: ReactNode }>;
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
}

/**
 * List component with staggered AOS animations for each item
 */
export function AnimatedList({
  items,
  className = '',
  itemClassName = '',
  staggerDelay = 100,
}: AnimatedListProps) {
  useAOS();

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={itemClassName}
          data-aos="fade-up"
          data-aos-delay={index * staggerDelay}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
