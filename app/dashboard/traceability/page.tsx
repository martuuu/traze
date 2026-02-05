'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
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
    FileSpreadsheet
} from 'lucide-react';

export default function TraceabilityPage() {
    const [filterType, setFilterType] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Logs Extension
    const allLogs = [
        ...MOCK_LOGS,
        { id: '6', timestamp: 'Hace 3 días', action: 'Riego', details: 'Sala A - Nutrientes Bloom', user: 'Op. Maria', type: 'water' },
        { id: '7', timestamp: 'Hace 4 días', action: 'Poda', details: 'Limpieza de bajos Lote B', user: 'Op. Carlos', type: 'cut' },
        { id: '8', timestamp: 'Hace 1 semana', action: 'Alta', details: 'Registro de 50 Esquejes', user: 'Ing. Juan', type: 'move' },
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
            default: return Info;
        }
    };

    const getColorStyles = (type: string) => {
        switch(type) {
            case 'move': return { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' };
            case 'water': return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' };
            case 'harvest': return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' };
            case 'destroy': return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' };
            case 'cut': return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' };
            default: return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
             {/* Header */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                     <h1 className="text-3xl font-black text-slate-900 tracking-tight">Trazabilidad</h1>
                     <p className="text-slate-500">Auditoría completa de eventos y movimientos en la planta.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200 text-slate-600 bg-white hover:bg-slate-50">
                        <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar Logs
                    </Button>
                </div>
            </div>

            {/* Controls */}
            <Card className="border-slate-100 shadow-sm sticky top-4 z-30">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Filters */}
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                         {['all', 'move', 'water', 'harvest', 'cut', 'destroy'].map(type => (
                            <Button 
                                key={type}
                                variant={filterType === type ? 'default' : 'outline'}
                                onClick={() => setFilterType(type)}
                                className={cn(
                                    "rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap",
                                    filterType === type 
                                    ? "bg-slate-900 text-white hover:bg-slate-800" 
                                    : "bg-white text-slate-500 border-slate-200 hover:border-emerald-500 hover:text-emerald-600"
                                )}
                            >
                                {type === 'all' ? 'Todos' : type}
                            </Button>
                        ))}
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-3 w-3" />
                            <Input 
                                placeholder="Buscar en logs..." 
                                className="pl-9 h-10 bg-slate-50 border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                            className="bg-slate-50 text-slate-600 hover:bg-slate-100"
                        >
                            <ArrowUpDown size={16} />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Timeline */}
            <div className="relative pl-4 md:pl-8 space-y-4 before:absolute before:inset-y-0 before:left-[27px] md:before:left-[43px] before:w-0.5 before:bg-slate-200 before:-z-10">
                {filteredLogs.map((log, i) => {
                    const Icon = getIcon(log.type);
                    const styles = getColorStyles(log.type);
                    
                    return (
                        <div key={i} className="flex gap-4 group">
                             {/* Icon Marker */}
                             <div className={cn(
                                 "h-10 w-10 md:h-12 md:w-12 rounded-2xl flex items-center justify-center shrink-0 border-4 border-slate-50 group-hover:scale-110 transition-transform bg-white relative z-10 shadow-sm",
                                 styles.text
                             )}>
                                 <Icon size={20} />
                             </div>

                             {/* Content Card */}
                             <Card className="flex-1 border-slate-100 hover:border-emerald-200 transition-colors shadow-sm group-hover:shadow-md">
                                 <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                     <div>
                                         <div className="flex items-center gap-2 mb-1">
                                             <h3 className="font-bold text-slate-900">{log.action}</h3>
                                             <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold uppercase", styles.bg, styles.text)}>
                                                 {log.type}
                                             </span>
                                         </div>
                                         <p className="text-sm text-slate-500 mb-2">{log.details}</p>
                                         <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                             <User size={10} /> {log.user}
                                         </div>
                                     </div>
                                     <div className="text-right">
                                         <p className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{log.timestamp}</p>
                                     </div>
                                 </CardContent>
                             </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
