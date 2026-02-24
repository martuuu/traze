'use client';

import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { MOCK_LOGS } from '@/app/lib/constants';
import { cn } from '@/app/lib/utils';
import { Input } from '@/app/components/ui/input';
import { 
    Droplets, 
    Scissors, 
    Scale, 
    Trash, 
    User, 
    Search, 
    History, 
    Info, 
    ArrowUpDown, 
    Move,
    FileSpreadsheet,
    Activity,
    AlertTriangle,
    ShieldCheck,
    Calendar,
    Filter,
    Sparkles,
    BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TraceabilityPage() {
    const [filterType, setFilterType] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Logs Extension with more rich data
    const allLogs = [
        ...MOCK_LOGS,
        { id: '6', timestamp: 'Hace 3 horas', action: 'Riego Automatizado', details: 'Sala A - Nutrientes Bloom. Nivel EC: 1.8. Ph: 6.2', user: 'Sistema Autónomo', type: 'water' },
        { id: '7', timestamp: 'Ayer, 14:30', action: 'Poda de Bajos', details: 'Limpieza lollipopping Lote B para mejorar flujo de aire', user: 'Op. Carlos', type: 'cut' },
        { id: '8', timestamp: '12 Feb, 09:00', action: 'Alta Genética', details: 'Registro de 50 Esquejes clonados origen madre #02', user: 'Ing. Juan', type: 'move' },
        { id: '9', timestamp: '10 Feb, 16:45', action: 'Alerta de Temperatura', details: 'Pico de calor (29°C) detectado en Sala B. Extractor activado al 100%.', user: 'Sistema Integrado', type: 'alert' },
        { id: '10', timestamp: '08 Feb, 11:20', action: 'Cosecha Estimada', details: 'Lote AR-4401 cosechado. Peso húmedo total: 14.5 Kg', user: 'Op. Maria', type: 'harvest' },
    ];

    const filteredLogs = allLogs.filter(log => {
        if (filterType !== 'all' && log.type !== filterType) return false;
        if (searchTerm && !log.action.toLowerCase().includes(searchTerm.toLowerCase()) && !log.details.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        return true;
    }).sort((a, b) => {
        return sortOrder === 'newest' ? -1 : 1; 
    });

    const getIcon = (type: string) => {
        switch(type) {
            case 'move': return Move;
            case 'water': return Droplets;
            case 'cut': return Scissors;
            case 'harvest': return Scale;
            case 'destroy': return Trash;
            case 'alert': return AlertTriangle;
            default: return Info;
        }
    };

    const getColorStyles = (type: string) => {
        switch(type) {
            case 'move': return { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200/50' };
            case 'water': return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200/50' };
            case 'harvest': return { bg: 'bg-pastel-green-50', text: 'text-pastel-green-600', border: 'border-pastel-green-200/50' };
            case 'destroy': return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200/50' };
            case 'cut': return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200/50' };
            case 'alert': return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200/50' };
            default: return { bg: 'bg-sand-gold-50', text: 'text-muted-foreground', border: 'border-sand-gold-200/50' };
        }
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20 max-w-7xl mx-auto">
             {/* Header */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
                <div>
                     <h1 className="text-3xl md:text-4xl font-black text-foreground font-title tracking-tight flex items-center gap-3">
                         <ShieldCheck className="w-8 h-8 text-pastel-green-500" />
                         Track & Trace
                     </h1>
                     <p className="text-muted-foreground font-medium mt-2">Auditoría inmutable, seguimientos en tiempo real e informes forenses de todo el cultivo.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full bg-white border-sand-gold-200 font-bold shadow-sm hover:text-foreground">
                        <BarChart3 className="mr-2 h-4 w-4 text-sand-gold-500" /> Ver Reportes Cosecha
                    </Button>
                    <Button className="rounded-full bg-foreground text-white hover:bg-foreground/90 font-bold shadow-lg shadow-sand-gold-900/10 transition-all">
                        <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar Blockchain
                    </Button>
                </div>
            </div>

            {/* KPI Data Visibility Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-6 border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl rounded-[2rem] shadow-sm flex flex-col justify-between">
                    <div className="h-10 w-10 rounded-full bg-pastel-green-50 flex items-center justify-center text-pastel-green-600 mb-4">
                        <Activity size={20} />
                    </div>
                    <div>
                        <p className="text-3xl font-black text-foreground font-title">1,248</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Eventos Totales (Mes)</p>
                    </div>
                </Card>
                <Card className="p-6 border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl rounded-[2rem] shadow-sm flex flex-col justify-between">
                    <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-4">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="text-3xl font-black text-foreground font-title">3</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Alertas Activas</p>
                    </div>
                </Card>
                <Card className="p-6 border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl rounded-[2rem] shadow-sm flex flex-col justify-between">
                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                        <Droplets size={20} />
                    </div>
                    <div>
                        <p className="text-3xl font-black text-foreground font-title">12k L</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Agua Consumida</p>
                    </div>
                </Card>
                
                {/* AI Mini Insight */}
                <Card className="p-6 border-none bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] shadow-lg shadow-purple-900/10 text-white relative overflow-hidden h-full flex flex-col justify-center">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 blur-[30px] rounded-full" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-indigo-200" />
                            <h3 className="font-bold text-sm tracking-wide">Innovación IA</h3>
                        </div>
                        <p className="text-xs text-indigo-100 leading-relaxed font-medium">Detectamos un patrón inusual en Sala B. La frecuencia de riego aumentó un 15%, sugerimos revisar sensores de humedad en sustrato.</p>
                    </div>
                </Card>
            </div>

            {/* Smart Controls Filter Bar */}
            <Card className="border border-sand-gold-200/50 shadow-sm rounded-full bg-white/80 backdrop-blur-md sticky top-4 z-30 overflow-hidden">
                <div className="p-3 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Filters Tabs */}
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                         {['all', 'move', 'water', 'harvest', 'cut', 'alert', 'destroy'].map(type => (
                            <Button 
                                key={type}
                                variant="ghost"
                                onClick={() => setFilterType(type)}
                                className={cn(
                                    "rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap px-5",
                                    filterType === type 
                                    ? "bg-foreground text-white shadow-md" 
                                    : "bg-transparent text-muted-foreground hover:bg-sand-gold-50 hover:text-foreground"
                                )}
                            >
                                {type === 'all' ? 'Todos Los Tipos' : type}
                            </Button>
                        ))}
                    </div>

                    <div className="flex gap-2 w-full md:w-auto items-center pr-2">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                                placeholder="Buscar Lote, Usuario, o Acción..." 
                                className="pl-11 h-10 bg-sand-gold-50/50 border-sand-gold-200/50 rounded-full focus-visible:ring-pastel-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="h-6 w-px bg-sand-gold-200 mx-1 hidden md:block"></div>
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-sand-gold-50 hover:text-foreground">
                            <Calendar size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-sand-gold-50 hover:text-foreground">
                            <Filter size={18} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                            className="rounded-full text-muted-foreground hover:bg-sand-gold-50 hover:text-foreground"
                        >
                            <ArrowUpDown size={18} />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Timeline Stream / Enhanced Cards */}
            <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:inset-y-0 before:left-[43px] md:before:left-[59px] before:w-[2px] before:bg-sand-gold-100 before:-z-10 mt-10">
                {filteredLogs.map((log, i) => {
                    const Icon = getIcon(log.type);
                    const styles = getColorStyles(log.type);
                    
                    return (
                        <motion.div 
                            key={log.id} 
                            className="flex gap-6 group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                             {/* Floating Icon Marker */}
                             <div className={cn(
                                 "h-14 w-14 rounded-full flex items-center justify-center shrink-0 border-[6px] border-white group-hover:scale-110 transition-transform bg-white relative z-10 shadow-sm",
                                 styles.bg,
                                 styles.text
                             )}>
                                 <Icon size={20} strokeWidth={2.5} />
                             </div>

                             {/* Event Card Content */}
                             <Card className="flex-1 rounded-[2rem] border border-sand-gold-200/40 bg-white hover:border-pastel-green-200 hover:shadow-lg transition-all shadow-sm overflow-hidden group-hover:-translate-y-0.5">
                                 <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                     <div className="flex-1 space-y-2">
                                         <div className="flex items-center gap-3">
                                             <h3 className="text-xl font-black text-foreground font-title leading-none">{log.action}</h3>
                                             {log.type === 'alert' && (
                                                <span className="flex h-2 w-2 relative">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                                </span>
                                             )}
                                         </div>
                                         <p className="text-muted-foreground font-medium leading-relaxed">{log.details}</p>
                                         
                                         {/* Meta Tags */}
                                         <div className="flex items-center gap-3 pt-3">
                                             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sand-gold-50 border border-sand-gold-100/50 text-xs font-bold text-foreground">
                                                 <User size={12} className="text-sand-gold-400" /> {log.user}
                                             </div>
                                             <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border", styles.bg, styles.text, styles.border)}>
                                                 {log.type}
                                             </div>
                                         </div>
                                     </div>

                                     {/* Side Info */}
                                     <div className="md:text-right flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t md:border-t-0 md:border-l border-sand-gold-100 pt-4 md:pt-0 md:pl-6">
                                         <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm bg-sand-gold-50/50 px-4 py-2 rounded-full border border-sand-gold-100/50">
                                            <History size={14} /> {log.timestamp}
                                         </div>
                                         <Button variant="ghost" className="mt-2 text-pastel-green-600 hover:text-pastel-green-700 hover:bg-pastel-green-50 font-bold hidden md:flex rounded-full">
                                             Ver Detalles &rarr;
                                         </Button>
                                     </div>
                                 </div>
                             </Card>
                        </motion.div>
                    );
                })}
            </div>

            {filteredLogs.length === 0 && (
                <div className="text-center py-20">
                    <History className="h-12 w-12 text-sand-gold-200 mx-auto mb-4" />
                    <p className="text-lg font-bold text-foreground">No se encontraron eventos</p>
                    <p className="text-sm text-muted-foreground">Prueba modificando los filtros o el término de búsqueda.</p>
                </div>
            )}
        </div>
    );
}
