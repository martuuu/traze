'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function HeroLogoBg() {
  // Elegant minimalist plant paths identical to the newly designed Logo component
  const stemPath = "M 16 30 C 16 22, 18 14, 16 4";
  const leftLeaf = "M 16 22 C 10 22, 6 16, 8 12 C 12 12, 15 16, 16 22";
  const rightLeaf = "M 17 14 C 23 14, 28 8, 25 4 C 21 4, 18 8, 17 14";

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 md:translate-x-1/3 opacity-20 pointer-events-none w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] z-0">
      <svg viewBox="0 0 32 32" className="w-full h-full overflow-visible">
          {/* The Sun */}
          <motion.circle
            cx="16"
            cy="14"
            r="10"
            className="fill-sand-gold-300"
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
              className="stroke-pastel-green-500"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Left Leaf */}
            <motion.path
              d={leftLeaf}
              className="fill-pastel-green-500/20 stroke-pastel-green-500"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
            />

            {/* Right Leaf */}
            <motion.path
              d={rightLeaf}
              className="fill-pastel-green-500/20 stroke-pastel-green-500"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            />
          </motion.g>
      </svg>
    </div>
  );
}
