'use client';

import { useParams } from 'next/navigation';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Sprout, QrCode, Droplets, Thermometer, FlaskConical, Scale, History, User, Activity, Sparkles, CalendarDays, MapPin } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';
import { motion } from 'framer-motion';

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
    assignedPatient: 'Juan Pérez',
    patientId: '26550',
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
        <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20 max-w-7xl mx-auto">
            {/* Header Streamlined */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
                 <div className="flex items-center gap-4">
                    <Link href="/dashboard/plants">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white bg-sand-gold-50/50 border border-sand-gold-200/50 shadow-sm">
                            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                             <h1 className="text-3xl md:text-4xl font-black text-foreground font-title tracking-tight">{plant.tag}</h1>
                             <Badge className="bg-purple-50 text-purple-700 border-purple-200 uppercase tracking-widest font-bold text-xs bg-white/50 backdrop-blur-sm shadow-sm py-1.5 px-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 inline-block animate-pulse" />
                                {plant.stage}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1"><Sprout className="w-4 h-4 text-pastel-green-500" /> {plant.strain}</span>
                            <span className="text-sand-gold-300">•</span>
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-sand-gold-500" /> {plant.location}</span>
                        </div>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full bg-white border-sand-gold-200 font-bold shadow-sm hover:text-foreground">
                        <QrCode className="mr-2 h-4 w-4" /> Imprimir Etiqueta
                    </Button>
                     <Button className="rounded-full bg-foreground text-white hover:bg-foreground/90 font-bold shadow-lg shadow-sand-gold-900/10 transition-all hover:-translate-y-0.5">
                        <History className="mr-2 h-4 w-4" /> Registrar Evento
                    </Button>
                 </div>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* 1. Main Visual Card (Spans 5 cols) */}
                <motion.div 
                    className="md:col-span-5 h-[500px]"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                >
                    <div className="h-full rounded-[2.5rem] overflow-hidden shadow-xl shadow-sand-gold-900/5 border border-sand-gold-200/50 relative group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={plant.image} alt={plant.strain} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        
                        <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                            <p className="text-xs font-bold uppercase tracking-widest text-pastel-green-400 mb-2">Paciente Asignado</p>
                            <Link href={`/dashboard/patients/${plant.patientId}`}>
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors cursor-pointer group/patient">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-pastel-green-500/20 flex items-center justify-center">
                                            <User size={20} className="text-pastel-green-300" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg leading-none">{plant.assignedPatient}</p>
                                            <p className="text-xs text-white/60 font-mono mt-1">ID: {plant.patientId}</p>
                                        </div>
                                    </div>
                                    <ArrowLeft className="w-5 h-5 opacity-0 group-hover/patient:opacity-100 rotate-180 transition-all -translate-x-4 group-hover/patient:translate-x-0" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Right Area Content (Spans 7 cols) */}
                <div className="md:col-span-7 grid gap-6 flex-1 h-[500px]">
                    
                    {/* 2. Vital Stats Grid */}
                    <motion.div 
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    >
                        <Card className="border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 flex flex-col justify-between hover:shadow-md transition-shadow group">
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                <Droplets size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Humedad</p>
                                <p className="text-3xl font-black text-foreground font-title">{plant.metrics.humidity}</p>
                            </div>
                        </Card>
                        
                        <Card className="border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 flex flex-col justify-between hover:shadow-md transition-shadow group">
                            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                <Thermometer size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Temp</p>
                                <p className="text-3xl font-black text-foreground font-title">{plant.metrics.temp}</p>
                            </div>
                        </Card>

                        <Card className="border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 flex flex-col justify-between hover:shadow-md transition-shadow group">
                            <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                                <FlaskConical size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">EC</p>
                                <p className="text-3xl font-black text-foreground font-title">{plant.metrics.ec}</p>
                            </div>
                        </Card>

                        <Card className="border border-sand-gold-200/50 bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 flex flex-col justify-between hover:shadow-md transition-shadow group">
                            <div className="h-10 w-10 rounded-full bg-pastel-green-50 flex items-center justify-center text-pastel-green-500 group-hover:scale-110 transition-transform">
                                <Scale size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Altura</p>
                                <p className="text-3xl font-black text-foreground font-title">{plant.metrics.height}</p>
                            </div>
                        </Card>
                    </motion.div>

                    {/* 3. Detailed Info Row */}
                    <motion.div 
                        className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    >
                        {/* Genealogy */}
                        <Card className="border border-sand-gold-200/50 bg-white rounded-[2rem] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <Activity size={100} />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Genética Principal</h3>
                                <p className="text-2xl font-black text-foreground font-title leading-none mb-2">{plant.genetic}</p>
                                <p className="text-sm font-medium text-muted-foreground">Banco: El Rincón del Cultivador</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-sand-gold-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-pastel-green-600" />
                                    <span className="text-xs font-bold">Germinada: {plant.germination}</span>
                                </div>
                            </div>
                        </Card>

                        {/* AI Insight */}
                        <Card className="border-none bg-foreground text-white rounded-[2rem] p-6 shadow-xl shadow-sand-gold-900/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/30 blur-[40px] rounded-full" />
                            
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10">
                                        <Sparkles className="w-5 h-5 text-purple-300" />
                                    </div>
                                    <h3 className="font-bold tracking-wide">Asistente Traze</h3>
                                </div>
                                <p className="text-sm text-sand-gold-50/90 leading-relaxed font-medium">
                                    Basado en el fenotipo <span className="font-bold text-white">Blue Dream</span>, estimamos cosecha para el <span className="font-bold text-white text-pastel-green-300">24 de Oct.</span> Recomendamos iniciar lavado de raíces en 48hs.
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* 4. Timeline (Full width below bento grid) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            >
                <Card className="border border-sand-gold-200/50 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm mt-8">
                    <div className="flex items-center justify-between mb-8 border-b border-sand-gold-100 pb-6">
                        <h3 className="text-2xl font-black text-foreground font-title gap-3 flex items-center">
                            <History className="text-pastel-green-500 h-6 w-6" /> 
                            Registro de Actividad
                        </h3>
                        <Button variant="outline" className="rounded-full bg-sand-gold-50 border-sand-gold-200 font-bold">
                            Ver Todo
                        </Button>
                    </div>

                    <div className="relative space-y-6 md:space-y-4 before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-sand-gold-100 md:pl-0 pl-10 md:before:hidden">
                        {plant.history.map((event, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row md:items-center justify-between py-4 group border-b border-sand-gold-50 last:border-0 md:pl-4 hover:bg-sand-gold-50/50 rounded-2xl transition-colors md:px-4">
                                {/* Mobile Timeline Dot */}
                                <div className="absolute left-[-30px] top-[26px] h-3 w-3 rounded-full border-2 border-white bg-pastel-green-400 shadow-sm z-10 md:hidden" />
                                
                                <div className="flex items-center gap-4 mb-2 md:mb-0">
                                    <div className="hidden md:flex h-10 w-10 rounded-full bg-white border border-sand-gold-200 items-center justify-center text-pastel-green-600 shadow-sm group-hover:scale-110 transition-transform">
                                        <Activity size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground text-lg">{event.event}</h4>
                                        <p className="text-sm text-muted-foreground font-medium">Registrado por: {event.user}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="bg-white border-sand-gold-200 text-muted-foreground font-bold tracking-wide">
                                        {event.date}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
