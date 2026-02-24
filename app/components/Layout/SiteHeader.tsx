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
        scrolled ? "bg-white/80 backdrop-blur-md border-sand-gold-100/50 py-2" : "bg-transparent border-transparent py-4"
    )}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
           <span className="text-2xl font-black font-title text-foreground tracking-tight">Traze<span className="text-pastel-green-600">.</span></span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</Link>
            <Link href="#pacientes" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Pacientes</Link>
            <div className="flex items-center gap-3 ml-4">
                <Link href="/login">
                    <Button variant="ghost" className="font-bold text-muted-foreground hover:text-foreground hover:bg-sand-gold-50 transition-colors">Log In</Button>
                </Link>
                <Link href="/dashboard">
                    <Button className="bg-foreground hover:bg-foreground/90 text-white font-bold rounded-full px-6 transition-all hover:shadow-lg hover:shadow-sand-gold-900/10">
                        Demo Gratis
                    </Button>
                </Link>
            </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-sand-gold-100 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4">
             <Link href="#features" className="text-lg font-bold text-foreground py-3 border-b border-sand-gold-50" onClick={() => setIsOpen(false)}>Funcionalidades</Link>
             <Link href="#pacientes" className="text-lg font-bold text-foreground py-3 border-b border-sand-gold-50" onClick={() => setIsOpen(false)}>Pacientes</Link>
             <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full font-bold h-12 text-lg border-sand-gold-200 text-foreground bg-sand-gold-50">Log In</Button>
             </Link>
             <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-pastel-green-600 font-bold h-12 text-lg text-white">Solicitar Demo</Button>
             </Link>
          </div>
      )}
    </header>
  );
}
