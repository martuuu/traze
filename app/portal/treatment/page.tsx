'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Sprout, Activity, Pill, Clock } from 'lucide-react';

export default function TreatmentPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-4xl mx-auto">
            <div>
                 <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Mi Tratamiento</h1>
                 <p className="text-muted-foreground font-light">Esquema terapéutico y cultivos asignados actualmente.</p>
            </div>

            {/* Medical Indication */}
            <Card className="border-teal-100 bg-teal-50/30 overflow-hidden">
                <div className="h-2 bg-teal-500 w-full"></div>
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-teal-100 text-teal-700 rounded-xl">
                            <Activity size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-teal-900">Indicación Médica Vigente</h2>
                            <p className="text-sm text-teal-700 mt-1 mb-4">
                                Tratamiento para <strong>Dolor Crónico</strong> y <strong>Ansiedad</strong>.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-3 rounded-lg border border-teal-100 flex items-center gap-3 shadow-sm">
                                    <Pill className="text-teal-500" size={20}/>
                                    <div>
                                        <p className="font-bold text-foreground font-title">Aceite CBD 10%</p>
                                        <p className="text-xs text-muted-foreground font-light">0.5ml cada 12hs</p>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-teal-100 flex items-center gap-3 shadow-sm">
                                    <Clock className="text-teal-500" size={20}/>
                                    <div>
                                        <p className="font-bold text-foreground font-title">Flores (Vaporización)</p>
                                        <p className="text-xs text-muted-foreground font-light">0.3g SOS ante crisis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Assigned Crops */}
            <div>
                <h2 className="text-xl font-bold text-foreground font-title mb-4 flex items-center gap-2">
                    <Sprout className="text-pastel-green-600" /> Cultivos Asignados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-border overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="h-40 bg-[url('https://images.unsplash.com/photo-1603909223429-69bb7101f420?ixlib=rb-4.0.3')] bg-cover bg-center relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-xl">Blue Dream</h3>
                                <p className="text-pastel-green-200 text-xs font-mono">Lote AR-4402</p>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">Floración</Badge>
                                <span className="text-xs font-bold text-muted-foreground font-light">Día 45</span>
                            </div>
                            <div className="w-full bg-sand-gold-50 rounded-full h-2 mb-2">
                                <div className="bg-purple-500 h-2 rounded-full w-[70%]" />
                            </div>
                            <p className="text-xs text-muted-foreground font-light text-center">Cosecha estimada: <strong>15 Octubre</strong></p>
                            
                            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                                <div className="p-2 bg-card rounded-lg">
                                    <p className="text-[10px] text-muted-foreground font-light font-bold uppercase">THC Est.</p>
                                    <p className="font-bold text-foreground font-medium">18%</p>
                                </div>
                                <div className="p-2 bg-card rounded-lg">
                                    <p className="text-[10px] text-muted-foreground font-light font-bold uppercase">CBD Est.</p>
                                    <p className="font-bold text-foreground font-medium">&lt; 1%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                     <Card className="border-border overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="h-40 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3')] bg-cover bg-center relative">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-xl">OG Kush</h3>
                                <p className="text-amber-200 text-xs font-mono">Lote AR-4403</p>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200">Secado</Badge>
                                <span className="text-xs font-bold text-muted-foreground font-light">Día 3</span>
                            </div>
                            <div className="w-full bg-sand-gold-50 rounded-full h-2 mb-2">
                                <div className="bg-amber-500 h-2 rounded-full w-[20%]" />
                            </div>
                            <p className="text-xs text-muted-foreground font-light text-center">Disponible estimada: <strong>23 Septiembre</strong></p>
                            
                             <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                                <div className="p-2 bg-card rounded-lg">
                                    <p className="text-[10px] text-muted-foreground font-light font-bold uppercase">THC Est.</p>
                                    <p className="font-bold text-foreground font-medium">22%</p>
                                </div>
                                <div className="p-2 bg-card rounded-lg">
                                    <p className="text-[10px] text-muted-foreground font-light font-bold uppercase">CBD Est.</p>
                                    <p className="font-bold text-foreground font-medium">0.5%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
