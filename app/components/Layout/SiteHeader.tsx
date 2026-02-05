'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/app/lib/utils';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled ? "bg-white/80 backdrop-blur-md border-emerald-100/50 py-2" : "bg-transparent border-transparent py-4"
    )}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
           <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">T</div>
           <span className="text-xl font-black text-slate-900 tracking-tighter">TRAZE<span className="text-emerald-500">.</span></span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Funcionalidades</Link>
            <Link href="#pacientes" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors">Pacientes</Link>
            <div className="flex items-center gap-3 ml-4">
                <Link href="/dashboard">
                    <Button variant="ghost" className="font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50">Log In</Button>
                </Link>
                <Link href="/dashboard">
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full px-6 transition-all hover:shadow-lg">
                        Demo Gratis
                    </Button>
                </Link>
            </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-slate-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4">
             <Link href="#features" className="text-lg font-bold text-slate-800 py-3 border-b border-slate-50" onClick={() => setIsOpen(false)}>Funcionalidades</Link>
             <Link href="#pacientes" className="text-lg font-bold text-slate-800 py-3 border-b border-slate-50" onClick={() => setIsOpen(false)}>Pacientes</Link>
             <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-emerald-600 font-bold h-12 text-lg mt-4">Solicitar Demo</Button>
             </Link>
          </div>
      )}
    </header>
  );
}
