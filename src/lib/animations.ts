import { useEffect } from 'react';
// @ts-expect-error - AOS doesn't have complete type definitions
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * Initialize AOS (Animate on Scroll) for scroll reveal animations
 * Call this in a useEffect at the app or page level
 */
export function useAOS() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
      offset: 200,
    });

    return () => {
      AOS.refreshHard();
    };
  }, []);
}

/**
 * Framer Motion common variants for consistent animations
 */
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.6 },
  },

  slideInUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  slideInDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 10 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },

  staggerContainer: {
    initial: 'initial',
    animate: 'animate',
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
};

/**
 * Hover animation for interactive elements
 */
export const hoverVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

/**
 * Animation for list items with stagger effect
 */
export const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};
