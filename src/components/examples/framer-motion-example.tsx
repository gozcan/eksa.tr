'use client';

import { motion } from 'framer-motion';
import { animationVariants, hoverVariants } from '@/lib/animations';

/**
 * Example component demonstrating Framer Motion animations
 * Shows fade-in, slide-in, hover effects, and staggered animations
 */
export function FramerMotionExample() {
  return (
    <div className="space-y-8 p-8">
      {/* Simple fade-in animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="rounded-lg bg-blue-100 p-6 text-center"
      >
        <h3 className="text-lg font-bold">Fade In Animation</h3>
        <p className="text-sm text-gray-600">This element fades in on mount</p>
      </motion.div>

      {/* Slide-in animation with ease */}
      <motion.div
        variants={animationVariants.slideInUp}
        initial="initial"
        animate="animate"
        className="rounded-lg bg-green-100 p-6 text-center"
      >
        <h3 className="text-lg font-bold">Slide In Animation</h3>
        <p className="text-sm text-gray-600">This element slides up into view</p>
      </motion.div>

      {/* Hover and tap interactions */}
      <motion.button
        variants={hoverVariants}
        whileHover="hover"
        whileTap="tap"
        className="rounded-lg bg-purple-500 px-6 py-3 font-medium text-white"
      >
        Try hovering and clicking me!
      </motion.button>

      {/* Staggered list animation */}
      <motion.div
        className="space-y-3"
      >
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="rounded-lg bg-orange-100 p-4"
          >
            <p>Staggered item {item}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Scale animation on hover */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer rounded-lg bg-pink-100 p-6 text-center"
      >
        <h3 className="text-lg font-bold">Scale on Hover</h3>
        <p className="text-sm text-gray-600">Hover over this element</p>
      </motion.div>

      {/* Rotate animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="mx-auto h-12 w-12 rounded-full bg-indigo-500"
      />
    </div>
  );
}
