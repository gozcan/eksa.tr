'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
  staggerAmount?: number;
}

export function AnimatedText({
  text,
  delay = 0,
  className = '',
  staggerAmount = 0.02,
}: AnimatedTextProps) {
  const words = text.split(' ');

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
            staggerChildren: staggerAmount,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4 }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface AnimatedCharacterProps {
  text: string;
  delay?: number;
  className?: string;
  staggerAmount?: number;
}

export function AnimatedCharacter({
  text,
  delay = 0,
  className = '',
  staggerAmount = 0.01,
}: AnimatedCharacterProps) {
  const characters = text.split('');

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
            staggerChildren: staggerAmount,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 20, rotate: -10 },
            visible: { opacity: 1, y: 0, rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
