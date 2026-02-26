'use client';

import { useState } from 'react';
import { LotsGrid } from './components/LotsGrid';
import { Button } from '@/app/components/ui/button';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Input } from '@/app/components/ui/input';
import { Plus, Boxes, Sparkles, AlertCircle, Thermometer, Droplets } from 'lucide-react';

export default function LotsPage() {
    const [isSmartAssignOpen, setIsSmartAssignOpen] = useState(false);
    const [isManualCreateOpen, setIsManualCreateOpen] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Banco de Lotes</h1>
                    <p className="text-muted-foreground font-light mt-1">Gestión de Inventario y Optimización de Sembrado</p>
                </div>
                <div className="flex gap-3">
                    <Button 
                        className="bg-foreground text-background font-bold relative overflow-hidden group"
                        onClick={() => setIsSmartAssignOpen(true)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <Boxes className="w-4 h-4 mr-2" />
                        Asignación Inteligente
                    </Button>
                    <Button 
                        variant="outline" 
                        className="border-border"
                        onClick={() => setIsManualCreateOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Crear Lote Manual
                    </Button>
                </div>
            </div>

            {/* Smart Assignment Modal */}
            <Dialog
                isOpen={isSmartAssignOpen}
                onClose={() => setIsSmartAssignOpen(false)}
                title="Asignación Inteligente IA"
                description="El algoritmo sugiere la mejor ubicación basándose en la genética y las condiciones climáticas actuales."
                maxWidth="max-w-2xl"
            >
                <div className="space-y-6 pt-4">
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                        <div className="bg-blue-100 p-3 rounded-xl h-fit">
                            <Sparkles className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="space-y-4 w-full">
                            <div>
                                <h3 className="font-bold text-blue-900">Variables Analizadas</h3>
                                <p className="text-sm text-blue-800/80">3 lotes en sala de germinación listos para trasplante.</p>
                            </div>
                            
                            {/* Suggestions List */}
                            <div className="space-y-3">
                                {/* Suggestion 1 */}
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100/50 flex justify-between items-center transition-all hover:shadow-md cursor-pointer hover:border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-pastel-green-500"></div>
                                        <div>
                                            <div className="font-bold font-title text-sm">Lemon Haze (150 u.)</div>
                                            <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                                                <span className="flex items-center gap-1"><Thermometer className="w-3 h-3 text-red-400" /> 24°C Requeridos</span>
                                                <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-400" /> 60% Requeridos</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md mb-1">Sala de Floración A</div>
                                        <span className="text-[10px] text-muted-foreground">Match: 98%</span>
                                    </div>
                                </div>
                                {/* Suggestion 2 */}
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100/50 flex justify-between items-center transition-all hover:shadow-md cursor-pointer hover:border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-pastel-green-500"></div>
                                        <div>
                                            <div className="font-bold font-title text-sm">Northern Lights (80 u.)</div>
                                            <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                                                <span className="flex items-center gap-1"><Thermometer className="w-3 h-3 text-red-400" /> 22°C Requeridos</span>
                                                <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-400" /> 55% Requeridos</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md mb-1">Sala Mixta B</div>
                                        <span className="text-[10px] text-muted-foreground">Match: 92%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-amber-50 p-4 rounded-xl border border-amber-200">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-xs text-amber-800 font-medium">
                                Atención: Trasplantar 230 unidades incrementará el consumo de agua estimado en un 15% semanal. Las bombas de riego B2 están al 80% de capacidad.
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setIsSmartAssignOpen(false)}>Cancelar</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsSmartAssignOpen(false)}>
                            Aplicar Recomendaciones
                        </Button>
                    </div>
                </div>
            </Dialog>

            {/* Manual Create Modal */}
            <Dialog
                isOpen={isManualCreateOpen}
                onClose={() => setIsManualCreateOpen(false)}
                title="Crear Lote Manual"
                description="Registre un nuevo grupo de plantas a partir de semillas o clones existentes."
                maxWidth="max-w-xl"
            >
                <form className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Genética Base</label>
                            <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-green-500">
                                <option>Amnesia Haze (AR-9921)</option>
                                <option>Blue Dream (AR-4402)</option>
                                <option>OG Kush (AR-1109)</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Origen</label>
                            <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-green-500">
                                <option>Semilla Regular</option>
                                <option>Semilla Feminizada</option>
                                <option>Esqueje (Clon)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Cantidad Inicial</label>
                            <Input type="number" placeholder="50" min="1" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Ubicación Asignada</label>
                            <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-green-500">
                                <option>Sala Germinación 1</option>
                                <option>Sala Vegetativo A</option>
                                <option>Esquejera B</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Responsable</label>
                        <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-green-500">
                            <option>Ing. Agrónomo - Juan Pérez</option>
                            <option>Operador - María García</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-border">
                        <Button variant="ghost" type="button" onClick={() => setIsManualCreateOpen(false)}>Cancelar</Button>
                        <Button type="button" className="bg-foreground text-background font-bold" onClick={() => setIsManualCreateOpen(false)}>
                            Registrar Lote
                        </Button>
                    </div>
                </form>
            </Dialog>
            
            <div className="grid grid-cols-1">
                <div className="space-y-6">
                    <LotsGrid />
                </div>
            </div>
        </div>
    );
}
