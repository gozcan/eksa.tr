'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const baseClasses =
    'font-medium rounded-full transition-colors duration-200 inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-[#151717] text-white hover:bg-black',
    secondary: 'bg-[#efe2cc] text-[#0b241f] hover:bg-[#f3e7d2]',
    outline: 'border-2 border-current text-current hover:bg-current/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <motion.span
        initial={{ opacity: 1 }}
        whileHover={{ letterSpacing: '0.05em' }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
