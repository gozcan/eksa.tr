'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  delay?: number;
}

export function AnimatedCard({
  children,
  className = '',
  hoverScale = 1.02,
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: hoverScale }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      viewport={{ once: false, margin: '0px 0px -100px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedCardGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  staggerDelay?: number;
}

export function AnimatedCardGrid({
  children,
  columns = 3,
  gap = 'md',
  staggerDelay = 0.1,
}: AnimatedCardGridProps) {
  const gapMap = { sm: 'gap-3', md: 'gap-6', lg: 'gap-8' };
  const colMap = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={`grid ${colMap[columns]} ${gapMap[gap]}`}
    >
      {items.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
