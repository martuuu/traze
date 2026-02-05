'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { Button } from './button';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    maxWidth?: string;
}

export function Dialog({ isOpen, onClose, title, description, children, className, maxWidth = "max-w-md" }: DialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
                    />
                    
                    {/* Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className={cn(
                                "w-full bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]", 
                                maxWidth,
                                className
                            )}
                        >
                            <div className="p-5 border-b border-slate-100 flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 leading-tight">{title}</h2>
                                    {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
                                </div>
                                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 -mr-2 -mt-2">
                                    <X size={20} className="text-slate-400" />
                                </Button>
                            </div>
                            
                            <div className="p-5 overflow-y-auto">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
