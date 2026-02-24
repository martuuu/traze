'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Sprout, FileText, Droplets, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export default function PatientPortalPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
                 {/* Welcome Banner */}
                 <div className="bg-gradient-to-r from-pastel-green-600 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden">
                     <div className="relative z-10">
                         <h1 className="text-3xl font-black mb-2">Hola, Juan Pérez</h1>
                         <p className="text-pastel-green-100 font-medium">REPROCANN: 26550 • Habilitado hasta 12/2024</p>
                     </div>
                 </div>

                 {/* My Medicine Section */}
                 <section>
                     <h2 className="text-xl font-bold text-foreground font-title mb-4 flex items-center gap-2">
                         <Sprout className="text-pastel-green-600" /> Mi Cultivo Asignado
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <Card className="border-border overflow-hidden group hover:shadow-lg transition-all duration-300">
                             <div className="h-40 bg-[url('https://images.unsplash.com/photo-1603909223429-69bb7101f420?ixlib=rb-4.0.3')] bg-cover bg-center">
                                 <div className="w-full h-full bg-black/20 group-hover:bg-black/10 transition-colors" />
                             </div>
                             <CardContent className="p-6">
                                 <div className="flex justify-between items-start mb-4">
                                     <div>
                                         <h3 className="font-bold text-lg text-foreground font-title">Blue Dream</h3>
                                         <p className="text-sm text-muted-foreground font-light">Lote AR-4402</p>
                                     </div>
                                     <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Floración</Badge>
                                 </div>
                                 <div className="w-full bg-sand-gold-50 rounded-full h-2 mb-4">
                                     <div className="bg-purple-500 h-2 rounded-full w-[70%]" />
                                 </div>
                                 <div className="flex justify-between text-xs text-muted-foreground font-light font-bold uppercase tracking-wider">
                                     <span>Siembra</span>
                                     <span>Cosecha Est. (15 Días)</span>
                                 </div>
                             </CardContent>
                         </Card>

                         <Card className="border-border overflow-hidden group hover:shadow-lg transition-all duration-300">
                             <div className="h-40 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3')] bg-cover bg-center">
                                 <div className="w-full h-full bg-black/20 group-hover:bg-black/10 transition-colors" />
                             </div>
                             <CardContent className="p-6">
                                 <div className="flex justify-between items-start mb-4">
                                     <div>
                                         <h3 className="font-bold text-lg text-foreground font-title">OG Kush</h3>
                                         <p className="text-sm text-muted-foreground font-light">Lote AR-4403</p>
                                     </div>
                                     <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Secado</Badge>
                                 </div>
                                  <div className="w-full bg-sand-gold-50 rounded-full h-2 mb-4">
                                     <div className="bg-amber-500 h-2 rounded-full w-[20%]" />
                                 </div>
                                 <div className="flex justify-between text-xs text-muted-foreground font-light font-bold uppercase tracking-wider">
                                     <span>Cosechado</span>
                                     <span>Listo en 8 días</span>
                                 </div>
                             </CardContent>
                         </Card>
                     </div>
                 </section>

                 {/* Traceability */}
                 <section>
                      <h2 className="text-xl font-bold text-foreground font-title mb-4 flex items-center gap-2">
                         <Droplets className="text-blue-600" /> Trazabilidad Reciente
                     </h2>
                     <Card className="border-border">
                         <div className="divide-y divide-slate-50">
                             {[
                                 { date: 'Hoy, 09:30', action: 'Riego con Nutrientes', detail: 'Blue Dream (Lote AR-4402)' },
                                 { date: 'Ayer, 14:15', action: 'Control de Plagas', detail: 'Preventivo Orgánico Aplicado' },
                                 { date: '10 Feb, 10:00', action: 'Cambio de Fotoperiodo', detail: 'Pasaje a 12/12hs' }
                             ].map((log, i) => (
                                 <div key={i} className="p-4 flex items-center gap-4 hover:bg-card transition-colors">
                                     <div className="h-10 w-10 rounded-full bg-sand-gold-50 flex items-center justify-center text-muted-foreground font-light">
                                         <span className="text-xs font-bold">{log.date.split(',')[0].substring(0,3)}</span>
                                     </div>
                                     <div>
                                         <p className="font-bold text-foreground font-title">{log.action}</p>
                                         <p className="text-sm text-muted-foreground font-light">{log.detail}</p>
                                     </div>
                                     <div className="ml-auto text-xs font-bold text-muted-foreground font-light">{log.date.split(',')[1]}</div>
                                 </div>
                             ))}
                         </div>
                     </Card>
                 </section>

                  {/* Documents */}
                 <section>
                      <h2 className="text-xl font-bold text-foreground font-title mb-4 flex items-center gap-2">
                         <FileText className="text-muted-foreground" /> Documentación
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="p-4 border border-border rounded-xl bg-white hover:border-pastel-green-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                             <div className="p-3 bg-pastel-green-50 text-pastel-green-600 rounded-lg">
                                 <FileText size={20} />
                             </div>
                             <div>
                                 <p className="font-bold text-foreground font-title">Credencial Digital</p>
                                 <p className="text-xs text-muted-foreground font-light">Descargar PDF Oficial</p>
                             </div>
                         </div>
                         <div className="p-4 border border-border rounded-xl bg-white hover:border-pastel-green-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                             <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                 <FileText size={20} />
                             </div>
                             <div>
                                 <p className="font-bold text-foreground font-title">Consentimiento Informado</p>
                                 <p className="text-xs text-muted-foreground font-light">Firmado digitalmente</p>
                             </div>
                         </div>
                     </div>
                 </section>

        </div>
    );
}
