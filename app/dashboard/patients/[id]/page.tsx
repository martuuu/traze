'use client';

import { useParams } from 'next/navigation';
import { MOCK_PATIENTS, plantStageColors } from '@/app/lib/constants';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Fingerprint, Calendar, Eye, FileText, Sprout, Stethoscope, ChevronDown, History, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';
import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Dropdown, DropdownItem } from '@/app/components/ui/custom-dropdown';

// Re-defining for local usage just in case, though imports work
const localPlantStageColors: Record<string, string> = {
    'vegetative': 'bg-emerald-400',
    'flowering': 'bg-purple-500',
    'seedling': 'bg-blue-300',
    'harvested': 'bg-amber-500',
    'drying': 'bg-orange-400',
    'curing': 'bg-amber-700'
};

export default function PatientDetailPage() {
    const params = useParams();
    const patient = MOCK_PATIENTS.find(p => p.id === params.id) || MOCK_PATIENTS[0];
    const [showPlantGrid, setShowPlantGrid] = useState(true);

    if (!patient) return <div>Paciente no encontrado</div>;

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <Link href="/dashboard/patients">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                        <ArrowLeft className="h-5 w-5 text-slate-500" />
                    </Button>
                </Link>
                <div className="flex-1">
                     <h1 className="text-2xl font-black text-slate-900 leading-none">{patient.name}</h1>
                     <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-xs text-slate-500 font-bold tracking-wide">ID: {patient.id}</span>
                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", patient.status === 'active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>
                            {patient.status}
                        </span>
                     </div>
                </div>
                <Button variant="outline" className="hidden md:flex">Editar</Button>
            </div>

            {/* Identity Card (Legacy Style) */}
            <div className="bg-gradient-to-br from-slate-800 to-black rounded-3xl p-8 shadow-xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Fingerprint size={120} />
                </div>
                <div className="relative z-10 flex flex-col gap-8">
                     <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-2">Código de Vinculación REPROCANN</p>
                        <p className="text-4xl font-mono font-bold tracking-tight text-white">22393-4402</p>
                     </div>
                     <div className="flex justify-between items-end border-t border-white/10 pt-6">
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Vencimiento</p>
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-emerald-400" />
                                <p className="text-sm font-bold">12 de Octubre, 2025</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-white/5 font-bold text-xs h-auto py-2">
                            <Eye className="mr-2 h-4 w-4" /> Ver Certificado
                        </Button>
                     </div>
                </div>
            </div>

            {/* Plants Grid */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div 
                    onClick={() => setShowPlantGrid(!showPlantGrid)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors select-none"
                >
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                             <Sprout size={20} />
                        </div>
                        <div>
                            <span className="block font-bold text-slate-900">Plantas Asignadas</span>
                            <span className="text-xs text-slate-400">{patient.plants.length} / 9 Cupos Utilizados</span>
                        </div>
                     </div>
                     <ChevronDown className={cn("text-slate-400 transition-transform duration-300", showPlantGrid && "rotate-180")} />
                </div>
                
                {showPlantGrid && (
                    <div className="p-5 pt-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 animate-in slide-in-from-top-2 duration-200">
                         {patient.plants.length > 0 ? patient.plants.map((plant) => (
                             <Link key={plant.id} href={`/dashboard/plants/${plant.id}`}>
                                <div className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 relative overflow-hidden transition-all bg-emerald-50/50 border border-emerald-100 cursor-pointer hover:border-emerald-500 hover:bg-emerald-100 hover:shadow-md group">
                                    <div className={cn("absolute top-0 left-0 w-full h-1", localPlantStageColors[plant.stage])}></div>
                                    <Sprout className="text-emerald-500 text-3xl group-hover:scale-110 transition-transform duration-300" />
                                    <div className="text-center">
                                        <span className="block text-sm font-bold text-slate-700 font-mono">{plant.tag}</span>
                                        <span className="text-[10px] uppercase font-bold text-emerald-600">{plant.stage}</span>
                                    </div>
                                </div>
                             </Link>
                         )) : (
                             <p className="col-span-full text-center text-sm text-slate-400 py-8 italic">Sin plantas asignadas actualmente.</p>
                         )}
                         
                         {/* Add New Plant Placeholder */}
                         <div className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border border-slate-200 border-dashed text-slate-300 cursor-pointer hover:border-emerald-400 hover:text-emerald-500 hover:bg-slate-50 transition-all">
                             <Plus size={32} />
                             <span className="text-xs font-bold">Asignar</span>
                         </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prescription */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 px-1">Indicación Médica</h3>
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <Stethoscope size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Patología: Dolor Crónico</p>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
                                Tratamiento con predominancia THC. Dosis recomendada 0.5ml aceite / noche.
                            </p>
                            <div className="flex items-center gap-2 mt-4">
                                <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold">Dr. A. López (MP 2231)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 px-1">Estadísticas</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col gap-2">
                            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <Sprout size={18} />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">{patient.plantsCount}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Plantas Activas</p>
                            </div>
                        </div>
                        <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col gap-2">
                            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                                <History size={18} />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">12</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Cosechas Totales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 py-6 h-auto font-bold rounded-2xl">
                Desvincular Paciente del Sistema
            </Button>
        </div>
    );
}
