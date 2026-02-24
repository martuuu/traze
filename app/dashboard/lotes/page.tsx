'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dropdown, DropdownItem } from '@/app/components/ui/custom-dropdown';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Search, Plus, Filter, MoreVertical, Edit, Trash, Droplets, Scissors, ArrowRightLeft, Calendar, Leaf, Layers, MapPin, Activity, Sprout } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { getLotes, createLote, Lote } from '@/app/lib/storage';
import { motion } from 'framer-motion';

const stageColors: Record<string, string> = {
    'Floración': 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm shadow-purple-500/10',
    'Vegetativo': 'bg-pastel-green-50 text-pastel-green-700 border-pastel-green-200 shadow-sm shadow-pastel-green-500/10',
    'Secado': 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm shadow-amber-500/10',
};

const STAGES = ['Clon', 'Vegetativo', 'Floración', 'Secado', 'Curado'];

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
            startDate: new Date().toISOString().split('T')[0],
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/50 p-6 rounded-[2.5rem] border border-border/50 backdrop-blur-md shadow-sm">
                <div>
                    <h1 className="text-3xl font-black text-foreground font-title tracking-tight flex items-center gap-3">
                        <Layers className="text-pastel-green-500" size={32} />
                        Lotes de Cultivo
                    </h1>
                    <p className="text-muted-foreground font-light mt-1 text-lg">Supervisión integral de grupos genéticos.</p>
                </div>
                <Button 
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-foreground hover:bg-foreground/90 text-white font-bold shadow-lg shadow-sand-gold-900/10 rounded-full px-6 py-6"
                >
                    <Plus className="mr-2 h-5 w-5" /> Nuevo Lote
                </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-4 z-20">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 h-5 w-5" />
                    <Input 
                        placeholder="Buscar genética, sala o lote..." 
                        className="pl-12 bg-white/60 backdrop-blur-md border border-sand-gold-200/50 shadow-sm shadow-sand-gold-900/5 rounded-full h-12 text-foreground"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Button variant="outline" className="border-sand-gold-200 bg-white/50 backdrop-blur-sm text-foreground rounded-full font-bold hover:bg-white hover:text-pastel-green-700">
                        <Filter className="mr-2 h-4 w-4" /> Estado
                    </Button>
                    <Button variant="outline" className="border-sand-gold-200 bg-white/50 backdrop-blur-sm text-foreground rounded-full font-bold hover:bg-white hover:text-pastel-green-700">
                        <Calendar className="mr-2 h-4 w-4" /> Fecha
                    </Button>
                </div>
            </div>

            {/* Rich Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLotes.map((lote, index) => {
                    // Logic to find current stage index for the progress bar
                    const currentStageIndex = STAGES.findIndex(s => s === lote.stage);
                    const safeStageIndex = currentStageIndex === -1 ? 1 : currentStageIndex;

                    return (
                        <motion.div 
                            key={lote.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl shadow-xl shadow-sand-gold-900/5 rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-pastel-green-900/5 transition-all duration-500">
                                <div className="p-8 flex flex-col gap-6 h-full relative z-10">
                                    {/* Top Row: Lote ID & Actions */}
                                    <div className="flex justify-between items-start">
                                        <div className="h-10 px-4 rounded-full bg-sand-gold-50 flex items-center justify-center font-black text-foreground border border-sand-gold-200/50 text-sm shadow-inner group-hover:bg-sand-gold-100 transition-colors">
                                            #{lote.id.substring(1)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className={cn("px-4 py-1.5 font-bold rounded-full border border-sand-gold-200/50", stageColors[lote.stage] || 'bg-sand-gold-50 text-muted-foreground')}>
                                                {lote.stage}
                                            </Badge>
                                            <Dropdown 
                                                trigger={
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-sand-gold-100/50 rounded-full">
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                }
                                            >
                                                <DropdownItem onClick={() => handleAction('edit', lote.id)}><Edit size={16}/> Editar</DropdownItem>
                                                <DropdownItem><Trash size={16} className="text-red-500"/> Eliminar</DropdownItem>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    {/* Middle: Titles & Visual Stage Progress */}
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-foreground font-title group-hover:text-pastel-green-700 transition-colors tracking-tight">
                                                {lote.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-pastel-green-600 font-bold mt-1">
                                                <Leaf size={14} /> {lote.genetic}
                                            </div>
                                        </div>

                                        {/* Stage Segments */}
                                        <div className="space-y-2 pt-2">
                                            <div className="flex justify-between text-xs font-bold text-muted-foreground/70 uppercase tracking-widest px-1">
                                                <span>Progreso</span>
                                                <span className="text-pastel-green-700">{Math.round(((safeStageIndex + 1) / STAGES.length) * 100)}%</span>
                                            </div>
                                            <div className="h-2 w-full flex rounded-full overflow-hidden bg-sand-gold-100 gap-1 p-0.5">
                                                {STAGES.map((s, i) => (
                                                    <div 
                                                        key={s} 
                                                        className={cn(
                                                            "h-full flex-1 rounded-full transition-colors duration-500",
                                                            i <= safeStageIndex ? "bg-pastel-green-500" : "bg-transparent"
                                                        )}
                                                        title={s}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sand-gold-100">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/70 uppercase">
                                                <MapPin size={12} /> Ubicación
                                            </div>
                                            <span className="font-bold text-foreground text-sm">{lote.location}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/70 uppercase">
                                                <Sprout size={12} /> Viabilidad
                                            </div>
                                            <span className="font-bold text-foreground text-sm">{lote.plants} Plantas</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/70 uppercase">
                                                <Calendar size={12} /> Creado
                                            </div>
                                            <span className="font-bold text-foreground text-sm">{lote.startDate}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/70 uppercase">
                                                <Activity size={12} /> Acción
                                            </div>
                                            <span className="font-bold text-foreground text-sm truncate">{lote.lastAction}</span>
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex items-center justify-between gap-2 pt-2 mt-auto">
                                        <Button variant="outline" size="sm" className="flex-1 bg-white border-sand-gold-200 text-pastel-green-700 hover:bg-pastel-green-50 rounded-full font-bold shadow-sm shadow-pastel-green-900/5" onClick={() => handleAction('regar', lote.id)}>
                                            <Droplets size={14} className="mr-1.5" /> Riego
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1 bg-white border-sand-gold-200 text-foreground hover:bg-sand-gold-50 rounded-full font-bold shadow-sm shadow-sand-gold-900/5" onClick={() => handleAction('podar', lote.id)}>
                                            <Scissors size={14} className="mr-1.5" /> Poda
                                        </Button>
                                    </div>
                                </div>
                                {/* Subtle large background icon */}
                                <Layers size={160} className="absolute -bottom-10 -right-10 text-sand-gold-50/50 pointer-events-none transform -rotate-12" />
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Create Lote Modal */}
            <Dialog 
                isOpen={isCreateOpen} 
                onClose={() => setIsCreateOpen(false)} 
                title="Nuevo Lote de Cultivo" 
                description="Agrupa genéticas para seguimientos en bloque."
            >
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground block">Nombre del Lote</label>
                        <Input 
                            placeholder="Ej. Verano 2024 - A" 
                            className="rounded-xl border-sand-gold-200 bg-sand-gold-50/50"
                            value={newLote.name}
                            onChange={(e) => setNewLote({...newLote, name: e.target.value})}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground block">Genética Principal</label>
                        <Input 
                             placeholder="Ej. Blue Dream" 
                             className="rounded-xl border-sand-gold-200 bg-sand-gold-50/50"
                             value={newLote.genetic}
                             onChange={(e) => setNewLote({...newLote, genetic: e.target.value})}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground block">Ubicación Inicial</label>
                        <Input 
                             placeholder="Ej. Sala A"
                             className="rounded-xl border-sand-gold-200 bg-sand-gold-50/50" 
                             value={newLote.location}
                             onChange={(e) => setNewLote({...newLote, location: e.target.value})}
                        />
                    </div>
                    <Button 
                        onClick={handleCreate} 
                        className="w-full bg-foreground hover:bg-foreground/90 font-bold rounded-full py-6 mt-4"
                        disabled={!newLote.name.trim()}
                    >
                        <Layers className="mr-2 h-5 w-5" /> Iniciar Lote
                    </Button>
                </div>
            </Dialog>

            {/* Bulk Action Modal (Existing) */}
             <Dialog 
                isOpen={!!selectedAction} 
                onClose={() => setSelectedAction(null)} 
                title={`Acción Masiva: ${selectedAction?.type === 'regar' ? 'Registro de Riego' : selectedAction?.type === 'mover' ? 'Mover Plantas' : 'Registrar Poda'}`}
                description="Esta acción afectará a las plantas asignadas a este lote."
            >
                <div className="space-y-5">
                     {selectedAction?.type === 'regar' && (
                         <>
                            <div className="p-4 bg-pastel-green-50 border border-pastel-green-100 rounded-2xl text-sm text-pastel-green-800 font-medium shadow-inner">
                                Se registrará un evento de Riego para <strong>las plantas del lote</strong>.
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-bold text-foreground block mb-1.5">Volumen Total (Litros)</label>
                                    <Input type="number" placeholder="Ej. 200" className="rounded-xl border-sand-gold-200 bg-sand-gold-50/50" />
                                </div>
                                {/* ... existing form fields */}
                            </div>
                         </>
                     )}
                     <div className="pt-4 flex gap-2">
                        <Button className="w-full bg-pastel-green-600 hover:bg-pastel-green-700 text-white font-bold rounded-full py-6 shadow-lg shadow-pastel-green-900/20" onClick={() => setSelectedAction(null)}>
                            Confirmar Registro
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
