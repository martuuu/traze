'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/app/components/ui/custom-dropdown';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Search, Plus, Filter, MoreVertical, Edit, Trash, Droplets, Scissors, ArrowRightLeft, Calendar, Leaf, Layers } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { getLotes, createLote, Lote } from '@/app/lib/storage';

const stageColors: Record<string, string> = {
    'Floración': 'bg-purple-100 text-purple-700 border-purple-200',
    'Vegetativo': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Secado': 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function LotesPage() {
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAction, setSelectedAction] = useState<null | { type: string, loteId: string }>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Form State
    const [newLote, setNewLote] = useState({ name: '', genetic: '', location: '', startDate: '' });

    useEffect(() => {
        setLotes(getLotes());
    }, []);

    const filteredLotes = lotes.filter(lote => 
        lote.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lote.genetic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        if (!newLote.name) return;

        const created = createLote({
            name: newLote.name,
            genetic: newLote.genetic,
            location: newLote.location,
            startDate: new Date().toISOString().split('T')[0], // Today
            stage: 'Vegetativo'
        });

        setLotes([created, ...lotes]);
        setNewLote({ name: '', genetic: '', location: '', startDate: '' });
        setIsCreateOpen(false);
    };

    const handleAction = (type: string, loteId: string) => {
        setSelectedAction({ type, loteId });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lotes de Cultivo</h1>
                    <p className="text-slate-500">Gestión agrupada de plantas y acciones masivas.</p>
                </div>
                <Button 
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg shadow-slate-900/20"
                >
                    <Plus className="mr-2 h-4 w-4" /> Crear Nuevo Lote
                </Button>
            </div>

            {/* Controls */}
            <Card className="border-slate-100 shadow-sm sticky top-4 z-20">
                <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input 
                            placeholder="Buscar por nombre o genética..." 
                            className="pl-10 bg-slate-50 border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                         <Button variant="outline" className="border-slate-200 text-slate-600 flex-1 md:flex-none">
                            <Filter className="mr-2 h-4 w-4" /> Estado
                        </Button>
                         <Button variant="outline" className="border-slate-200 text-slate-600 flex-1 md:flex-none">
                            <Calendar className="mr-2 h-4 w-4" /> Fecha
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Rich List */}
            <div className="space-y-4">
                {filteredLotes.map((lote) => (
                    <Card key={lote.id} className="border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                        <div className="flex flex-col md:flex-row items-stretch">
                            {/* Left Accent */}
                            <div className={cn("w-full md:w-2 h-2 md:h-auto", 
                                lote.stage === 'Floración' ? 'bg-purple-500' : 
                                lote.stage === 'Vegetativo' ? 'bg-emerald-500' : 'bg-amber-500'
                            )}></div>
                            
                            <div className="flex-1 p-6 flex flex-col gap-6">
                                {/* Top Row: Main Info */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 font-black text-slate-400 border border-slate-200">
                                            {lote.id.substring(1)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{lote.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                                <Leaf size={14} className="text-emerald-500" />
                                                {lote.genetic}
                                                <span className="text-slate-300">•</span>
                                                <span className="text-slate-500">{lote.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className={cn("px-3 py-1 font-bold", stageColors[lote.stage] || 'bg-slate-100')}>
                                            {lote.stage}
                                        </Badge>
                                        <Dropdown 
                                            trigger={
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            }
                                        >
                                            <DropdownItem onClick={() => handleAction('edit', lote.id)}><Edit size={16}/> Editar Lote</DropdownItem>
                                            <DropdownItem><Trash size={16} className="text-red-500"/> Eliminar</DropdownItem>
                                        </Dropdown>
                                    </div>
                                </div>

                                {/* Bottom Row: Metrics & Actions */}
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-50">
                                    <div className="grid grid-cols-3 gap-8 w-full md:w-auto">
                                        <div>
                                            <p className="text-2xl font-black text-slate-900">{lote.plants}</p>
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Plantas Vivas</p>
                                        </div>
                                        <div>
                                             <p className="text-sm font-bold text-slate-700">{lote.startDate}</p>
                                             <p className="text-[10px] uppercase font-bold text-slate-400">Fecha Inicio</p>
                                        </div>
                                         <div>
                                             <p className="text-sm font-bold text-emerald-600 truncate">{lote.lastAction}</p>
                                             <p className="text-[10px] uppercase font-bold text-slate-400">Última Acción</p>
                                        </div>
                                    </div>

                                    {/* Quick Actions Bar */}
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button variant="secondary" size="sm" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 font-bold" onClick={() => handleAction('regar', lote.id)}>
                                            <Droplets size={14} className="mr-2" /> Regar
                                        </Button>
                                        <Button variant="secondary" size="sm" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-100 font-bold" onClick={() => handleAction('podar', lote.id)}>
                                            <Scissors size={14} className="mr-2" /> Podar
                                        </Button>
                                        <Button variant="secondary" size="sm" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100 font-bold" onClick={() => handleAction('mover', lote.id)}>
                                            <ArrowRightLeft size={14} className="mr-2" /> Mover
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Create Lote Modal */}
            <Dialog 
                isOpen={isCreateOpen} 
                onClose={() => setIsCreateOpen(false)} 
                title="Nuevo Lote de Cultivo" 
                description="Se creará un nuevo grupo de seguimiento para plantas."
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Nombre del Lote</label>
                        <Input 
                            placeholder="Ej. Verano 2024 - A" 
                            value={newLote.name}
                            onChange={(e) => setNewLote({...newLote, name: e.target.value})}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Genética Principal</label>
                        <Input 
                             placeholder="Ej. Blue Dream" 
                             value={newLote.genetic}
                             onChange={(e) => setNewLote({...newLote, genetic: e.target.value})}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Ubicación Inicial</label>
                        <Input 
                             placeholder="Ej. Sala A" 
                             value={newLote.location}
                             onChange={(e) => setNewLote({...newLote, location: e.target.value})}
                        />
                    </div>
                    <Button 
                        onClick={handleCreate} 
                        className="w-full bg-slate-900 hover:bg-slate-800 font-bold"
                        disabled={!newLote.name.trim()}
                    >
                        <Layers className="mr-2 h-4 w-4" /> Crear Lote
                    </Button>
                </div>
            </Dialog>

            {/* Bulk Action Modal (Existing) */}
             <Dialog 
                isOpen={!!selectedAction} 
                onClose={() => setSelectedAction(null)} 
                title={`Acción Masiva: ${selectedAction?.type === 'regar' ? 'Registro de Riego' : selectedAction?.type === 'mover' ? 'Mover Plantas' : 'Registrar Poda'}`}
                description="Esta acción afectará a TODAS las plantas vivas de este lote."
            >
                <div className="space-y-4">
                     {selectedAction?.type === 'regar' && (
                         <>
                            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700 mb-4">
                                Se registrará un evento de Riego para <strong>145 Plantas</strong>.
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 block mb-1">Volumen Total (Litros)</label>
                                    <Input type="number" placeholder="Ej. 200" />
                                </div>
                                {/* ... existing form fields */}
                            </div>
                         </>
                     )}
                     <div className="pt-4 flex gap-2">
                        <Button className="w-full bg-slate-900 font-bold" onClick={() => setSelectedAction(null)}>Confirmar Acción Masiva</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
