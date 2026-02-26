'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/app/components/ui/glass-card';
import { 
    LayoutDashboard, 
    FileText, 
    ShieldCheck, 
    Zap, 
    TrendingUp, 
    Activity, 
    BarChart3,
    CheckCircle2,
    Lock,
    QrCode
} from 'lucide-react';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

const TABS = [
    {
        id: 'dashboard',
        label: 'Panel Principal',
        icon: LayoutDashboard,
        title: 'Monitoreo en Tiempo Real',
        description: 'Control absoluto de sus cultivos, pacientes y alertas legales desde una única interfaz intuitiva.',
        features: [
            'Semáforo de cumplimiento REPROCANN',
            'Estado fenológico de cada lote',
            'Alertas críticas de temperatura y humedad',
            'Dashboard bento-grid personalizable'
        ],
        image: '/screen-1.webp', 
        badge: 'Automatización',
        component: <DashboardVisual />
    },
    {
        id: 'reports',
        label: 'Reportes e INASE',
        icon: FileText,
        title: 'Estadísticas de Rendimiento',
        description: 'Transforme sus datos en informes técnicos listos para presentar ante organismos reguladores.',
        features: [
            'Generación de PDF semestral en un click',
            'Gráficos comparativos de producción anual',
            'Seguimiento de stock de semillas y aceites',
            'Análisis de mermas y eficiencia'
        ],
        image: '/screen-3.webp',
        badge: 'Rendimientos',
        component: <ReportsVisual />
    },
    {
        id: 'audit',
        label: 'Auditoría & Compliance',
        icon: ShieldCheck,
        title: 'Blindaje Legal Farmacéutico',
        description: 'Trazabilidad inquebrantable desde la semilla hasta el paciente final, garantizando seguridad jurídica.',
        features: [
            'Seguimiento end-to-end con códigos QR',
            'Validación automática de cupos (9 plantas)',
            'Historial de auditoría inmutable',
            'Modo "Auditor Externo" para inspectores'
        ],
        image: '/screen-4.webp',
        badge: 'Performance',
        component: <AuditVisual />
    }
];

function DashboardVisual() {
    return (
        <div className="w-full h-full p-4 bg-slate-50 flex flex-col gap-4 overflow-hidden">
            <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex-1 h-20 bg-white rounded-2xl border border-border/50 p-3 shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-pastel-green-50 mb-2"></div>
                        <div className="h-2 w-12 bg-slate-100 rounded"></div>
                    </div>
                ))}
            </div>
            <div className="flex-1 bg-white rounded-2xl border border-border/50 p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <div className="h-4 w-32 bg-slate-100 rounded"></div>
                    <div className="h-8 w-8 rounded-full bg-slate-50"></div>
                </div>
                <div className="flex-1 flex items-end gap-2 px-2 pb-2">
                    {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <div key={i} className="flex-1 bg-pastel-green-500/20 rounded-t-md" style={{ height: `${h}%` }}>
                            <div className="w-full bg-pastel-green-500 rounded-t-md transition-all duration-1000" style={{ height: '30%' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReportsVisual() {
    return (
        <div className="w-full h-full p-6 bg-slate-50 flex flex-col gap-6 overflow-hidden">
            <div className="flex justify-between items-center">
                <div className="h-6 w-40 bg-slate-200 rounded"></div>
                <div className="h-10 px-4 bg-pastel-green-600 rounded-full flex items-center gap-2">
                    <FileText size={14} className="text-white" />
                    <div className="h-3 w-16 bg-white/40 rounded"></div>
                </div>
            </div>
            <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-12 bg-white rounded-xl border border-border/50 flex items-center px-4 justify-between shadow-sm">
                        <div className="flex gap-3 items-center">
                            <div className="h-8 w-8 rounded-lg bg-slate-100"></div>
                            <div className="h-3 w-24 bg-slate-100 rounded"></div>
                        </div>
                        <div className="h-3 w-12 bg-pastel-green-100 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AuditVisual() {
    return (
        <div className="w-full h-full p-8 bg-slate-100 flex items-center justify-center overflow-hidden">
            <div className="w-64 h-96 bg-[#1A231E] rounded-[2.5rem] border-[8px] border-white shadow-2xl relative flex flex-col p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-green-500/10 blur-3xl"></div>
                <ShieldCheck size={40} className="text-pastel-green-400 mb-6" />
                <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-white/20 rounded"></div>
                    <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                </div>
                <div className="mt-8 relative aspect-square w-full bg-white/10 rounded-3xl border border-white/10 flex items-center justify-center p-8 overflow-hidden">
                    <QrCode size={64} className="text-sand-gold-300 opacity-50" />
                    <div className="absolute inset-0 border-2 border-pastel-green-500/50 animate-pulse"></div>
                </div>
                <div className="mt-auto h-12 w-full bg-pastel-green-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold">
                    VALIDAR ORIGEN
                </div>
            </div>
            <div className="ml-8 space-y-4 hidden md:block">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-pastel-green-500"></div>
                        <div className="h-2 w-32 bg-slate-300 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function DashboardShowcase() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-pastel-green-600 uppercase mb-4">La Experiencia Traze</h2>
                    <h3 className="text-4xl md:text-5xl font-black font-title text-foreground mb-6">Eficiencia en cada click</h3>
                    <p className="text-muted-foreground text-lg font-light">
                        Diseñamos una interfaz que no solo escala su producción, sino que elimina la fricción administrativa y los riesgos legales de su operación.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left Side: Tabs Navigation */}
                    <div className="lg:w-1/3 w-full flex flex-col gap-4">
                        {TABS.map((tab) => {
                            const isActive = activeTab.id === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "flex items-start gap-4 p-6 rounded-[2rem] text-left transition-all duration-500 border group",
                                        isActive 
                                            ? "bg-white border-sand-gold-200 shadow-xl shadow-sand-gold-900/5 ring-1 ring-black/5" 
                                            : "border-transparent hover:bg-sand-gold-50/50 hover:border-sand-gold-100"
                                    )}
                                >
                                    <div className={cn(
                                        "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500",
                                        isActive ? "bg-pastel-green-600 text-white scale-110 rotate-3" : "bg-card text-muted-foreground group-hover:bg-white"
                                    )}>
                                        <tab.icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className={cn(
                                            "text-lg font-bold font-title transition-colors",
                                            isActive ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {tab.label}
                                        </h4>
                                        <p className={cn(
                                            "text-sm font-light leading-relaxed transition-colors",
                                            isActive ? "text-muted-foreground" : "text-muted-foreground/60"
                                        )}>
                                            {tab.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Side: Visual Content */}
                    <div className="lg:w-2/3 w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab.id}
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-full"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-br from-pastel-green-100/30 to-sand-gold-100/30 blur-2xl rounded-[3rem] -z-10"></div>
                                
                                <GlassCard className="p-0 overflow-hidden border-border/50 shadow-2xl bg-white/40 backdrop-blur-xl">
                                    <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                                        {/* Content Part */}
                                        <div className="md:col-span-2 p-8 md:p-10 flex flex-col h-full bg-white/50 border-r border-border/40">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-green-50 text-pastel-green-700 text-[10px] font-bold uppercase tracking-wider border border-pastel-green-100 mb-6">
                                                <Zap size={12} className="fill-current" />
                                                {activeTab.badge}
                                            </div>
                                            
                                            <h3 className="text-2xl font-black font-title text-foreground mb-4 leading-tight">
                                                {activeTab.title}
                                            </h3>
                                            
                                            <ul className="space-y-4 mb-8">
                                                {activeTab.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-light">
                                                        <CheckCircle2 size={16} className="text-pastel-green-500 shrink-0 mt-0.5" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-auto pt-6 border-t border-border/40">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-sand-gold-200 flex items-center justify-center text-[10px] font-bold text-sand-gold-700">
                                                                {String.fromCharCode(64 + i)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="text-xs font-medium text-muted-foreground">+200 orgs lo usan</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Image/Preview Part */}
                                        <div className="md:col-span-3 h-[400px] md:h-auto relative bg-slate-100 group">
                                            <div className="absolute inset-0 z-10 pointer-events-none border-l border-border/40"></div>
                                            {activeTab.component}
                                            
                                            {/* Simulated browser UI elements over image */}
                                            <div className="absolute top-4 left-4 right-4 z-20 flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
