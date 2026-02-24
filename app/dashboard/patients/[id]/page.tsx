'use client';

import { useParams } from 'next/navigation';
import { MOCK_PATIENTS } from '@/app/lib/constants';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Fingerprint, Calendar, Eye, FileText, Sprout, Stethoscope, History, Plus, FileBadge2, Droplets, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { motion } from 'framer-motion';

const localPlantStageColors: Record<string, string> = {
    'vegetative': 'bg-pastel-green-400',
    'flowering': 'bg-purple-500',
    'seedling': 'bg-blue-300',
    'harvested': 'bg-amber-500',
    'drying': 'bg-orange-400',
    'curing': 'bg-amber-700'
};

export default function PatientDetailPage() {
    const params = useParams();
    const patient = MOCK_PATIENTS.find(p => p.id === params.id) || MOCK_PATIENTS[0];

    if (!patient) return <div>Paciente no encontrado</div>;

    return (
        <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20 max-w-7xl mx-auto">
            {/* Header Streamlined */}
            <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                <Link href="/dashboard/patients">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white bg-sand-gold-50/50 border border-sand-gold-200/50 shadow-sm">
                        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </Link>
                <div className="flex-1">
                     <h1 className="text-3xl md:text-4xl font-black text-foreground font-title tracking-tight">{patient.name}</h1>
                     <div className="flex items-center gap-3 mt-2">
                        <span className="font-mono text-sm text-muted-foreground font-bold tracking-wider">ID: {patient.id}</span>
                     </div>
                </div>
                <Button variant="outline" className="hidden md:flex rounded-full bg-white border-sand-gold-200 font-bold shadow-sm hover:text-pastel-green-700 hover:border-pastel-green-200">
                    <FileText className="w-4 h-4 mr-2" /> Editar Expediente
                </Button>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* 1. Legal & Identity Card (Spans 8 cols) */}
                <motion.div 
                    className="md:col-span-8"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                >
                    <Card className="h-full border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl shadow-xl shadow-sand-gold-900/5 rounded-[2.5rem] overflow-hidden relative group">
                        {/* Abstract background element */}
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-pastel-green-200/30 rounded-full blur-[80px] pointer-events-none"></div>
                        
                        <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
                            <div className="flex justify-between items-start mb-auto">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border shadow-sm flex items-center gap-1.5",
                                        patient.status === 'active' 
                                            ? "bg-pastel-green-50 text-pastel-green-700 border-pastel-green-200 shadow-pastel-green-900/10" 
                                            : "bg-sand-gold-50 text-muted-foreground border-border"
                                    )}>
                                        {patient.status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-pastel-green-500 animate-pulse" />}
                                        Estado: {patient.status}
                                    </div>
                                    <Badge variant="outline" className="px-3 py-1.5 rounded-full text-xs font-bold bg-white border-sand-gold-200">
                                        REPROCANN Verificado
                                    </Badge>
                                </div>
                                <div className="h-14 w-14 rounded-full bg-sand-gold-50/80 border border-sand-gold-200/50 flex items-center justify-center text-pastel-green-600 shadow-inner">
                                    <Fingerprint size={28} strokeWidth={1.5} />
                                </div>
                            </div>

                            <div className="mt-12 space-y-1">
                                <p className="text-sm text-pastel-green-700/80 font-bold uppercase tracking-widest pl-1">Código de Vinculación Legal</p>
                                <p className="text-5xl md:text-6xl font-black font-title tracking-tighter text-foreground">
                                    22393<span className="text-sand-gold-300 mx-1">-</span>4402
                                </p>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 pt-8 border-t border-sand-gold-200/50 gap-6">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-2 pl-1">Vencimiento Aprobado</p>
                                    <div className="flex items-center gap-2 text-foreground">
                                        <Calendar size={18} className="text-pastel-green-600" />
                                        <p className="text-lg font-bold">12 de Octubre, 2025</p>
                                    </div>
                                </div>
                                <Button className="bg-foreground text-white hover:bg-foreground/90 rounded-full px-6 py-6 shadow-lg shadow-sand-gold-900/10 font-bold">
                                    <FileBadge2 className="mr-2 h-5 w-5" /> Ver Certificado Oficial
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* 2. Quick Stats Grid (Spans 4 cols) */}
                <motion.div 
                    className="md:col-span-4 grid grid-rows-2 gap-6"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                >
                    <Card className="border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl shadow-md shadow-sand-gold-900/5 rounded-[2.5rem] flex items-center p-8 group hover:shadow-lg transition-all">
                        <div className="h-16 w-16 rounded-3xl bg-pastel-green-50 border border-pastel-green-100 flex items-center justify-center text-pastel-green-600 mr-6 shadow-sm group-hover:scale-110 transition-transform">
                            <Sprout size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-4xl font-black text-foreground font-title">{patient.plantsCount}</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Plantas Activas</p>
                        </div>
                    </Card>
                    <Card className="border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl shadow-md shadow-sand-gold-900/5 rounded-[2.5rem] flex items-center p-8 group hover:shadow-lg transition-all">
                        <div className="h-16 w-16 rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mr-6 shadow-sm group-hover:scale-110 transition-transform">
                            <History size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="text-4xl font-black text-foreground font-title">12</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Cosechas Totales</p>
                        </div>
                    </Card>
                </motion.div>

                {/* 3. Prescription Slip (Spans 5 cols) */}
                <motion.div 
                    className="md:col-span-5"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                >
                    <Card className="h-full border border-sand-gold-200/50 bg-card rounded-[2.5rem] shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-400/80"></div>
                        <div className="p-8 h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <Stethoscope className="text-blue-500" size={24} />
                                <h3 className="text-xl font-black text-foreground font-title">Indicación Médica</h3>
                            </div>
                            
                            <div className="flex-1 bg-white rounded-3xl p-6 border border-sand-gold-200/50 shadow-inner">
                                <p className="text-sm font-bold text-foreground font-title border-b border-sand-gold-100 pb-3 mb-4">Patología: Dolor Crónico</p>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                    Tratamiento con predominancia THC. Dosis recomendada 0.5ml aceite sublingual por la noche, y vaporización en caso de dolor agudo.
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-6 px-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-sand-gold-100 border border-sand-gold-200 flex items-center justify-center font-bold text-xs text-muted-foreground">AL</div>
                                    <div className="text-xs">
                                        <p className="font-bold text-foreground">Dr. A. López</p>
                                        <p className="text-muted-foreground">MP 2231</p>
                                    </div>
                                </div>
                                <CheckCircle2 className="text-pastel-green-500 w-5 h-5" />
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* 4. The Plants Grid (Spans 7 cols) */}
                <motion.div 
                    className="md:col-span-7"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                >
                    <Card className="h-full border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-sm flex flex-col">
                        <div className="p-8 pb-4 flex items-center justify-between border-b border-sand-gold-200/30">
                            <div>
                                <h3 className="text-xl font-black text-foreground font-title">Inventario Asignado</h3>
                                <p className="text-sm text-muted-foreground mt-1 font-medium">{patient.plants.length} / 9 Cupos Legales Utilizados</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-sand-gold-50 hover:bg-pastel-green-50 hover:text-pastel-green-700 text-foreground transition-colors group">
                                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </Button>
                        </div>
                        
                        <div className="p-8 pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto max-h-[360px]">
                            {patient.plants.length > 0 ? patient.plants.map((plant) => (
                                <Link key={plant.id} href={`/dashboard/plants/${plant.id}`}>
                                    <div className="h-32 rounded-3xl flex flex-col items-center justify-center gap-3 relative overflow-hidden transition-all bg-white border border-sand-gold-200/50 shadow-sm cursor-pointer hover:border-pastel-green-300 hover:shadow-lg hover:-translate-y-1 group">
                                        <div className={cn("absolute top-0 left-0 w-full h-1.5 opacity-80", localPlantStageColors[plant.stage])}></div>
                                        <Sprout className={cn("text-3xl transition-transform duration-300 group-hover:scale-110", plant.stage === 'flowering' ? 'text-purple-500' : 'text-pastel-green-500')} />
                                        <div className="text-center">
                                            <span className="block text-sm font-bold text-foreground font-mono">{plant.tag}</span>
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{plant.stage}</span>
                                        </div>
                                    </div>
                                </Link>
                            )) : (
                                <div className="col-span-full h-32 rounded-3xl border-2 border-dashed border-sand-gold-200 flex flex-col items-center justify-center text-muted-foreground">
                                    <Sprout size={24} className="mb-2 opacity-50" />
                                    <p className="text-sm font-bold">Sin plantas asignadas</p>
                                </div>
                            )}
                            
                            {/* Empty Add Slot */}
                            {patient.plants.length < 9 && (
                                <div className="h-32 rounded-3xl flex flex-col items-center justify-center gap-2 border border-sand-gold-200 border-dashed text-sand-gold-400 bg-sand-gold-50/30 cursor-pointer hover:border-pastel-green-300 hover:text-pastel-green-600 hover:bg-pastel-green-50 transition-all">
                                    <Plus className="w-8 h-8" strokeWidth={1.5} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Asignar Nueva</span>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>
                
            </div>

            {/* Danger Zone Bottom */}
            <div className="flex justify-start">
                <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 font-bold px-6 rounded-full border border-transparent hover:border-red-100 transition-colors">
                    Desvincular Paciente del Sistema
                </Button>
            </div>
        </div>
    );
}
