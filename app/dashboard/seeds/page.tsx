'use client';

import { useState } from 'react';
import { SeedList } from './components/SeedList';
import { ProvidersList } from './components/ProvidersList';
import { Button } from '@/app/components/ui/button';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Input } from '@/app/components/ui/input';
import { Plus, Download, FileSpreadsheet } from 'lucide-react';

export default function SeedsPage() {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isNewGeneticModalOpen, setIsNewGeneticModalOpen] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* INASE Export Modal */}
            <Dialog
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                title="Exportar Reporte INASE"
                description="Generar archivo de cumplimiento normativo (Res. INASE) del inventario genético actual."
            >
                <div className="space-y-4 pt-4">
                    <div className="bg-sand-gold-50 p-4 rounded-xl border border-sand-gold-200 flex gap-4 items-start">
                        <FileSpreadsheet className="w-8 h-8 text-sand-gold-600 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-sand-gold-900">Reporte de Trazabilidad Genética</p>
                            <p className="text-xs text-sand-gold-700 mt-1">El documento incluirá estampillas, datos del criador (breeder), poder germinativo y remitos de compra para 20 variedades en stock.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>Cancelar</Button>
                        <Button className="bg-pastel-green-600 hover:bg-pastel-green-700 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Descargar Excel
                        </Button>
                    </div>
                </div>
            </Dialog>

            {/* New Genetic Modal */}
            <Dialog
                isOpen={isNewGeneticModalOpen}
                onClose={() => setIsNewGeneticModalOpen(false)}
                title="Ingresar Nueva Genética"
                description="Registre la adquisición temporal o permanente de una nueva variedad de semilla en su banco."
                maxWidth="max-w-xl"
            >
                <form className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Nombre Variante</label>
                            <Input placeholder="Ej. Lemon Haze" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Composición Genética</label>
                            <Input placeholder="Ej. 70% Sativa / 30% Indica" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Ratio Esperado (THC/CBD)</label>
                            <Input placeholder="Ej. THC 22% / CBD 1%" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Estampilla INASE</label>
                            <Input placeholder="AR-XXXX-XXXXX" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Cantidad (Unidades)</label>
                            <Input type="number" placeholder="100" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Poder Germinativo (%)</label>
                            <Input type="number" placeholder="95" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Proveedor</label>
                            <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-green-500">
                                <option>INASE Reg. #1992</option>
                                <option>Banco Semillas AR</option>
                                <option>Autocultivo Solidario</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-4">
                        <p className="text-xs text-amber-800 font-medium">Atención: La carga de nuevas genéticas impactará en su reporte semestral obligatorio.</p>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <Button variant="ghost" type="button" onClick={() => setIsNewGeneticModalOpen(false)}>Cancelar</Button>
                        <Button type="button" className="bg-foreground text-background font-bold" onClick={() => setIsNewGeneticModalOpen(false)}>
                            Guardar en Bóveda
                        </Button>
                    </div>
                </form>
            </Dialog>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Genética e INASE</h1>
                    <p className="text-muted-foreground font-light mt-1">Gestión de Semillas, Orígenes y Trazabilidad Legal</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-border" onClick={() => setIsExportModalOpen(true)}>
                        Exportar INASE
                    </Button>
                    <Button className="bg-foreground text-background font-bold" onClick={() => setIsNewGeneticModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nueva Genética
                    </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-6">
                    <SeedList />
                </div>
                <div className="space-y-6">
                    <ProvidersList />
                </div>
            </div>
        </div>
    );
}
