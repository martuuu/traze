'use client';

import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Stethoscope, Calendar, Clock, Video, MapPin, ChevronRight, Plus } from 'lucide-react';

export default function AppointmentsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                     <h1 className="text-3xl font-black text-slate-900 tracking-tight">Consultas Médicas</h1>
                     <p className="text-slate-500">Agenda tus turnos y revisa tu historial de visitas.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/20">
                    <Plus className="mr-2 h-4 w-4" /> Solicitar Turno
                </Button>
            </div>

            {/* Next Appointment */}
            <Card className="border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Calendar size={120} />
                </div>
                <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs">
                            <Clock size={14} /> Próximo Turno
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="text-center md:text-left">
                                <p className="text-5xl font-black">15</p>
                                <p className="text-xl text-slate-300 font-medium">Octubre, 2024</p>
                            </div>
                            <div className="h-12 w-[1px] bg-slate-700 hidden md:block"></div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold">Consulta de Seguimiento</h2>
                                <p className="text-slate-300 flex items-center gap-2">
                                    <Stethoscope size={16} /> Dr. Ricardo Favaloro
                                </p>
                                <p className="text-emerald-400 font-mono text-sm flex items-center gap-2 mt-2">
                                    <Video size={14} /> Video-llamada (Zoom)
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 w-full flex justify-end">
                             <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold">
                                Ingresar a Sala de Espera
                             </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* History */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">Historial de Visitas</h3>
                <div className="space-y-3">
                     {[
                        { date: '10 Ago, 2024', type: 'Renovación Receta', doctor: 'Dra. Ana Lopez', method: 'Online' },
                        { date: '14 May, 2024', type: 'Consulta General', doctor: 'Dr. Ricardo Favaloro', method: 'Presencial' },
                        { date: '02 Ene, 2024', type: 'Ingreso Protocolo', doctor: 'Dr. Ricardo Favaloro', method: 'Presencial' },
                     ].map((visit, i) => (
                         <Card key={i} className="border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer group">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-slate-500 font-bold leading-none">
                                        <span className="text-lg">{visit.date.split(' ')[0]}</span>
                                        <span className="text-[10px] uppercase">{visit.date.split(' ')[1]}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{visit.type}</h4>
                                        <p className="text-sm text-slate-500 flex items-center gap-2">
                                            {visit.doctor} 
                                            <span className="text-slate-300">•</span>
                                            <span className="flex items-center gap-1">
                                                {visit.method === 'Online' ? <Video size={10} /> : <MapPin size={10}/>} {visit.method}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                            </CardContent>
                         </Card>
                     ))}
                </div>
            </div>
        </div>
    );
}
