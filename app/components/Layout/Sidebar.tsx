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

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Panel Principal', path: '/dashboard' },
  { icon: Users, label: 'Pacientes', path: '/dashboard/patients' },
  { icon: Layers, label: 'Lotes / Cultivos', path: '/dashboard/lotes' },
  { icon: Sprout, label: 'Plantas', path: '/dashboard/plants' },
  { icon: ClipboardList, label: 'Trazabilidad', path: '/dashboard/traceability' },
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
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg text-slate-800 border border-slate-100"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 shadow-2xl shadow-slate-200/50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:shadow-none flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area */}
        <div className="h-24 flex items-center px-8 border-b border-slate-50">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                    T
                </div>
                <div>
                   <span className="text-xl font-black text-slate-900 tracking-tighter block leading-none">TRAZE<span className="text-emerald-500">.</span></span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Panel</span>
                </div>
            </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)}>
                        <div className={cn(
                            "group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 border border-transparent",
                            isActive 
                                ? "bg-emerald-50 text-emerald-700 font-bold border-emerald-100 shadow-sm shadow-emerald-100" 
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"
                        )}>
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={cn(
                                    isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600"
                                )} />
                                <span>{item.label}</span>
                            </div>
                            {isActive && <ChevronRight size={16} className="text-emerald-500" />}
                        </div>
                    </Link>
                );
            })}
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-slate-50 bg-slate-50/50">
            <Dropdown 
                align="right"
                direction="up"
                trigger={
                    <div className="flex items-center gap-4 cursor-pointer hover:bg-slate-100 p-2 rounded-xl transition-colors">
                        <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                            {/* Placeholder Avatar */}
                            <div className="h-full w-full bg-gradient-to-br from-slate-400 to-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">Martin Navarro</p>
                            <p className="text-xs text-slate-500 truncate">Admin. General</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                    </div>
                }>
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cuenta</p>
                </div>
                <Link href="/dashboard/profile"><DropdownItem><User size={16} /> Mi Perfil</DropdownItem></Link>
                <Link href="/dashboard/organization"><DropdownItem><Building2 size={16} /> Mi Organización</DropdownItem></Link>
                <Link href="/dashboard/settings"><DropdownItem><Settings size={16} /> Configuración</DropdownItem></Link>
                <DropdownSeparator />
                <Link href="/login">
                    <DropdownItem destructive><LogOut size={16} /> Cerrar Sesión</DropdownItem>
                </Link>
            </Dropdown>
        </div>
      </div>
    </>
  );
}
