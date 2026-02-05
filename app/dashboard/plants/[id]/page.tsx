'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Sprout, QrCode, Droplets, Thermometer, FlaskConical, Scale, History, User } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';
import { GlassCard } from '@/app/components/ui/glass-card';

// Mock data fetching (simulated)
const MOCK_PLANT_DETAILS = {
    tag: 'AR-4402',
    strain: 'Blue Dream',
    genetic: 'Sativa Dominant',
    germination: '01/10/2023',
    stage: 'Floración',
    daysInStage: 24,
    totalDays: 85,
    location: 'Sala A - Indoor',
    assignedPatient: 'Juan Pérez (26550)',
    health: 'Saludable',
    image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    metrics: {
        height: '85 cm',
        humidity: '45%',
        temp: '24°C',
        ec: '1.8'
    },
    history: [
        { date: 'Hoy, 08:00', event: 'Riego con Nutrientes (Bloom A+B)', user: 'Op. Carlos' },
        { date: 'Ayer, 14:30', event: 'Defoliación Baja', user: 'Ing. Juan' },
        { date: '10 Feb', event: 'Inicio Fase Floración', user: 'Sistema (Auto)' },
        { date: '10 Jan', event: 'Transplante a 20L', user: 'Op. Maria' },
    ]
};

export default function PlantDetailPage() {
    const params = useParams();
    const plant = MOCK_PLANT_DETAILS; // In real app, fetch based on params.id

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                    <Link href="/dashboard/patients">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
                            <ArrowLeft className="h-5 w-5 text-slate-500" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                             <h1 className="text-3xl font-black text-slate-900 tracking-tight">{plant.tag}</h1>
                             <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200 uppercase">{plant.stage}</Badge>
                        </div>
                        <p className="text-slate-500 font-medium">{plant.strain} • {plant.location}</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200 text-slate-600">
                        <QrCode className="mr-2 h-4 w-4" /> Imprimir Etiqueta
                    </Button>
                     <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                        <History className="mr-2 h-4 w-4" /> Registrar Evento
                    </Button>
                 </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Visuals & Stats */}
                <div className="space-y-6">
                    <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative group">
                        <div className="aspect-[4/5] relative">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={plant.image} alt={plant.strain} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-sm font-bold opacity-80 mb-1">Paciente Asignado</p>
                                <div className="flex items-center gap-2 font-bold text-lg">
                                    <User size={20} className="text-emerald-400" />
                                    {plant.assignedPatient}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="border-slate-100">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">Estado Vital</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                             <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                                 <div className="flex items-center gap-2 mb-1">
                                     <Droplets size={16} className="text-blue-500" />
                                     <span className="text-xs font-bold text-blue-700">Humedad</span>
                                 </div>
                                 <span className="text-xl font-black text-slate-900">{plant.metrics.humidity}</span>
                             </div>
                             <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                                 <div className="flex items-center gap-2 mb-1">
                                     <Thermometer size={16} className="text-amber-500" />
                                     <span className="text-xs font-bold text-amber-700">Temp</span>
                                 </div>
                                 <span className="text-xl font-black text-slate-900">{plant.metrics.temp}</span>
                             </div>
                             <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                                 <div className="flex items-center gap-2 mb-1">
                                     <FlaskConical size={16} className="text-purple-500" />
                                     <span className="text-xs font-bold text-purple-700">EC</span>
                                 </div>
                                 <span className="text-xl font-black text-slate-900">{plant.metrics.ec}</span>
                             </div>
                             <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                 <div className="flex items-center gap-2 mb-1">
                                     <Scale size={16} className="text-emerald-500" />
                                     <span className="text-xs font-bold text-emerald-700">Altura</span>
                                 </div>
                                 <span className="text-xl font-black text-slate-900">{plant.metrics.height}</span>
                             </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Timeline & Info */}
                <div className="lg:col-span-2 space-y-6">
                     {/* Geneaology Card */}
                     <Card className="border-slate-100">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium mb-1">Genética / Procedencia</p>
                                <h3 className="text-xl font-black text-slate-900">{plant.genetic}</h3>
                                <p className="text-xs text-slate-400">Banco: Blimburn Seeds • Lote Semillas #2201</p>
                            </div>
                            <Sprout size={40} className="text-emerald-200" />
                        </CardContent>
                    </Card>

                    {/* Timeline */}
                    <div className="bg-slate-50 rounded-3xl p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <History className="h-5 w-5 text-slate-500" /> Historial de Ciclo de Vida
                        </h3>
                        
                        <div className="relative space-y-8 pl-8 before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-slate-200">
                            {plant.history.map((event, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute left-[-37px] top-1 h-6 w-6 rounded-full border-4 border-white bg-emerald-500 shadow-sm z-10" />
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                        <span className="font-bold text-slate-900 text-lg">{event.event}</span>
                                        <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-100 shadow-sm">{event.date}</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Registrado por: <span className="font-medium text-slate-700">{event.user}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Insight */}
                    <GlassCard className="bg-gradient-to-r from-indigo-500 to-purple-600 border-none text-white">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                                <Bot size={24} className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">Análisis Predictivo IA</h4>
                                <p className="text-indigo-100 text-sm leading-relaxed">
                                    Basado en la genética <span className="font-bold text-white">Blue Dream</span> y las condiciones actuales, se estima la cosecha óptima para el <span className="font-bold text-white">24 de Octubre</span> (en 18 días). Recomendamos iniciar lavado de raíces el 15 de Octubre.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}

// Icon for the AI Insight
function Bot({ size, className }: { size?: number, className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    )
}
