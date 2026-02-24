'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/app/lib/utils';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
    direction?: 'up' | 'down';
    className?: string;
}

export function Dropdown({ trigger, children, align = 'right', direction = 'down', className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div 
                onClick={() => setIsOpen(!isOpen)} 
                className="cursor-pointer"
            >
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: direction === 'up' ? 10 : -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: direction === 'up' ? 10 : -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "absolute z-50 min-w-[220px] bg-card rounded-2xl shadow-xl shadow-sand-gold-900/5 border border-border/50 py-2 overflow-hidden",
                            align === 'right' ? 'right-0' : 'left-0',
                            direction === 'up' ? 'bottom-full mb-2' : 'mt-2',
                            className
                        )}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function DropdownItem({ children, onClick, className, destructive = false }: { children: React.ReactNode, onClick?: () => void, className?: string, destructive?: boolean }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2",
                destructive 
                    ? "text-red-600 hover:bg-red-50" 
                    : "text-muted-foreground hover:bg-sand-gold-50/50 hover:text-foreground",
                className
            )}
        >
            {children}
        </button>
    );
}

export function DropdownSeparator({ className }: { className?: string }) {
    return <div className={cn("h-px bg-border/50 my-1", className)} />;
}
