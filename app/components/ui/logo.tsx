'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

export function Logo({ className, size = 'md', withText = true }: LogoProps) {
  const dimensions = {
    sm: { size: 24, text: 'text-xl' },
    md: { size: 32, text: 'text-2xl' },
    lg: { size: 48, text: 'text-3xl' },
    xl: { size: 64, text: 'text-4xl' },
  }[size];

  // Elegant minimalist plant paths
  const stemPath = "M 16 30 C 16 22, 18 14, 16 4";
  const leftLeaf = "M 16 22 C 10 22, 6 16, 8 12 C 12 12, 15 16, 16 22";
  const rightLeaf = "M 17 14 C 23 14, 28 8, 25 4 C 21 4, 18 8, 17 14";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <motion.div 
        className="relative flex items-center justify-center shrink-0"
        style={{ width: dimensions.size, height: dimensions.size }}
      >
        <svg viewBox="0 0 32 32" className="absolute inset-0 w-full h-full overflow-visible">
            {/* The Sun */}
            <motion.circle
              cx="16"
              cy="14"
              r="10"
              className="fill-sand-gold-300/40"
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ 
                scale: [0.9, 1.05, 0.9],
                opacity: [0.8, 1, 0.8] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />

            {/* The Plant Container (Swaying in the wind) */}
            <motion.g
              style={{ originX: "16px", originY: "30px" }}
              animate={{ rotate: [-3, 4, -3] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Stem */}
              <motion.path
                d={stemPath}
                fill="none"
                className="stroke-pastel-green-600"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Left Leaf */}
              <motion.path
                d={leftLeaf}
                className="fill-pastel-green-600/20 stroke-pastel-green-600"
                strokeWidth="1.5"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              />

              {/* Right Leaf */}
              <motion.path
                d={rightLeaf}
                className="fill-pastel-green-600/20 stroke-pastel-green-600"
                strokeWidth="1.5"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              />
            </motion.g>
        </svg>
      </motion.div>
      
      {withText && (
        <span className={cn("font-black font-title tracking-tight text-foreground", dimensions.text)}>
          Traze
        </span>
      )}
    </div>
  );
}
