'use client';

import { useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion';

interface InteractiveDragCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  onDragEnd?: (position: { x: number; y: number }) => void;
}

export function InteractiveDragCard({
  title,
  description,
  children,
  onDragEnd,
}: InteractiveDragCardProps) {
  const [{ x, y }, springsApi] = useSpring(() => ({ x: 0, y: 0 }));
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my] }) => {
      if (down) {
        springsApi.start({ x: mx, y: my, immediate: true });
        setIsDragging(true);
      } else {
        springsApi.start({ x: 0, y: 0, config: { tension: 170, friction: 26 } });
        setIsDragging(false);
        onDragEnd?.({ x: mx, y: my });
      }
    },
    onHover: ({ hovering }) => {
      if (!isDragging) {
        springsApi.start({
          x: hovering ? 0 : 0,
          y: hovering ? 0 : 0,
        });
      }
    },
  });

  return (
    <animated.div
      ref={ref}
      {...bind()}
      style={{
        x,
        y,
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-shadow"
    >
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      {description && <p className="mb-4 text-sm text-gray-600">{description}</p>}
      {children}
    </animated.div>
  );
}

interface HoverRevealProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
}

export function HoverReveal({ children, revealContent, className = '' }: HoverRevealProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        variants={{
          initial: { opacity: 1, scale: 1 },
          hover: { opacity: 0, scale: 0.95 },
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          initial: { opacity: 0, scale: 0.95, position: 'absolute' },
          hover: { opacity: 1, scale: 1, position: 'absolute' },
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {revealContent}
      </motion.div>
    </motion.div>
  );
}
