'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Sprout, 
  FileText, 
  QrCode, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bot,
  User,
  Settings,
  Building2,
  Layers,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/app/lib/utils';
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/app/components/ui/custom-dropdown';
import { Logo } from '@/app/components/ui/logo';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Panel Principal', path: '/dashboard' },
  { icon: Sprout, label: 'Genética', path: '/dashboard/seeds' },
  { icon: Layers, label: 'Lotes e Inventario', path: '/dashboard/lots' },
  { icon: ClipboardList, label: 'Asignaciones', path: '/dashboard/assignments' },
  { icon: Users, label: 'Pacientes', path: '/dashboard/patients' },
  { icon: FileText, label: 'Reportes', path: '/dashboard/reports' },
  { icon: Bot, label: 'Innovación AI', path: '/dashboard/innovation' },
  { icon: QrCode, label: 'Scanner', path: '/dashboard/scanner' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg text-foreground border border-border"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-sand-gold-900/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border/50 shadow-2xl shadow-sand-gold-900/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:shadow-none flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area */}
        <div className="h-24 flex items-center px-8 relative overflow-hidden group border-b border-border/50">
            {/* Subtle glow behind logo */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-20 h-20 bg-sand-gold-200/30 blur-2xl rounded-full mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <Link href="/" className="z-10 relative flex items-center gap-2">
                <Logo size="lg" withText={false} />
                <div className="flex flex-col">
                  <span className="text-xl font-black font-title tracking-tight text-foreground -mb-1">Traze</span>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Admin Panel</span>
                </div>
            </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)}>
                        <div className={cn(
                            "group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 border",
                            isActive 
                                ? "bg-white border-sand-gold-200/50 shadow-sm text-foreground font-bold" 
                                : "text-muted-foreground border-transparent hover:bg-white/50 hover:border-sand-gold-100 hover:text-foreground hover:shadow-sm"
                        )}>
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={cn(
                                    isActive ? "text-pastel-green-600" : "text-muted-foreground/70 group-hover:text-pastel-green-500"
                                )} />
                                <span className={cn("text-sm transition-colors", isActive ? "text-foreground" : "")}>{item.label}</span>
                            </div>
                            {isActive && <ChevronRight size={16} className="text-pastel-green-500 opacity-60" />}
                        </div>
                    </Link>
                );
            })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border/50 bg-background/50">
            <Dropdown 
                align="right"
                direction="up"
                trigger={
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-white p-2.5 rounded-2xl transition-all border border-transparent hover:border-sand-gold-100 hover:shadow-sm group">
                        <div className="h-10 w-10 rounded-full bg-sand-gold-100 border-2 border-white shadow-sm overflow-hidden relative flex items-center justify-center">
                            <User size={20} className="text-sand-gold-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground truncate group-hover:text-pastel-green-700 transition-colors">Martin Navarro</p>
                            <p className="text-xs text-muted-foreground truncate">Admin. General</p>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground/50 group-hover:text-pastel-green-500 transition-colors" />
                    </div>
                }>
                <div className="px-4 py-2 border-b border-border/50 mb-1">
                    <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">Cuenta</p>
                </div>
                <Link href="/dashboard/profile">
                  <DropdownItem className="rounded-xl my-0.5"><User size={16} className="text-sand-gold-500" /> Mi Perfil</DropdownItem>
                </Link>
                <Link href="/dashboard/organization">
                  <DropdownItem className="rounded-xl my-0.5"><Building2 size={16} className="text-sand-gold-500" /> Mi Organización</DropdownItem>
                </Link>
                <Link href="/dashboard/settings">
                  <DropdownItem className="rounded-xl my-0.5"><Settings size={16} className="text-sand-gold-500" /> Configuración</DropdownItem>
                </Link>
                <DropdownSeparator className="bg-sand-gold-100" />
                <Link href="/login">
                    <DropdownItem destructive className="rounded-xl mt-1 text-red-600 hover:text-red-700 hover:bg-red-50"><LogOut size={16} /> Cerrar Sesión</DropdownItem>
                </Link>
            </Dropdown>
        </div>
      </div>
    </>
  );
}
