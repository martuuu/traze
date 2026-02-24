'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  Sprout, 
  FileText, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  Settings,
  HelpCircle,
  Stethoscope
} from 'lucide-react';
import { cn } from '@/app/lib/utils';
import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/app/components/ui/custom-dropdown';

const NAV_ITEMS = [
  { icon: Home, label: 'Inicio', path: '/portal/dashboard' },
  { icon: Sprout, label: 'Mi Tratamiento', path: '/portal/treatment' },
  { icon: FileText, label: 'Mis Documentos', path: '/portal/documents' },
  { icon: Stethoscope, label: 'Consultas Médicas', path: '/portal/appointments' },
];

import { Logo } from '@/app/components/ui/logo';

export function PortalSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button - Moved to ensure it doesn't cover titles */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="font-bold text-slate-900">Portal Paciente</span>
          </div>
          <div className="h-8 w-8 bg-pastel-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
              JP
          </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 shadow-2xl shadow-slate-200/50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:shadow-none flex flex-col pt-16 md:pt-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo Area (Desktop only) */}
        <div className="h-24 hidden md:flex items-center px-8 border-b border-slate-50 relative overflow-hidden group">
            <Link href="/portal/dashboard" className="z-10 relative">
                <Logo size="lg" />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block ml-14 -mt-1">Portal Paciente</span>
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
                                ? "bg-teal-50 text-teal-700 font-bold border-teal-100 shadow-sm shadow-teal-100" 
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"
                        )}>
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={cn(
                                    isActive ? "text-teal-600" : "text-slate-400 group-hover:text-slate-600"
                                )} />
                                <span>{item.label}</span>
                            </div>
                            {isActive && <ChevronRight size={16} className="text-teal-500" />}
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
                             <div className="h-full w-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold">JP</div>
                         </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">Juan Pérez</p>
                            <p className="text-xs text-slate-500 truncate">Paciente Activo</p>
                        </div>
                        <ChevronRight size={16} className="text-slate-400" />
                    </div>
                }>
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mi Cuenta</p>
                </div>
                <DropdownItem><User size={16} /> Mis Datos</DropdownItem>
                <DropdownItem><Settings size={16} /> Preferencias</DropdownItem>
                <DropdownItem><HelpCircle size={16} /> Soporte</DropdownItem>
                <DropdownSeparator />
                <Link href="/login">
                    <DropdownItem destructive><LogOut size={16} /> Salir</DropdownItem>
                </Link>
            </Dropdown>
        </div>
      </div>
    </>
  );
}
