'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Bot, Cpu, Zap, Workflow, FileText } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/app/components/ui/bento-grid';

export default function InnovationPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div>
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">Centro de Innovación & IA</h1>
                 <p className="text-slate-500">Monitoreo de agentes autónomos y automatizaciones activas.</p>
            </div>

            {/* Agents Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-900 text-white border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Bot size={80} />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                             <Badge variant="outline" className="text-emerald-400 border-emerald-400/50 bg-emerald-400/10 animate-pulse">ON LINE</Badge>
                        </div>
                        <CardTitle className="text-xl font-bold">Oficial de Compliance IA</CardTitle>
                        <CardDescription className="text-slate-400">Verificando Reglas 3132/2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Validaciones Hoy</span>
                                <span className="font-mono font-bold text-white">4,291</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Intentos Bloqueados</span>
                                <span className="font-mono font-bold text-red-400">3</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-full animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu size={80} className="text-blue-500" />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                             <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">ACTIVO</Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900">Reportería Automática</CardTitle>
                        <CardDescription>Generación de Informes Semestrales</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Próximo Reporte</span>
                                <span className="font-mono font-bold text-slate-700">En 14 días</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Datos Procesados</span>
                                <span className="font-mono font-bold text-slate-700">1.2 GB</span>
                            </div>
                         </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap size={80} className="text-amber-500" />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                             <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">IDLE</Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-900">Soporte Técnico 24/7</CardTitle>
                        <CardDescription>Chatbot de asistencia a Operarios</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Tickets Resueltos</span>
                                <span className="font-mono font-bold text-slate-700">15 (Hoy)</span>
                            </div>
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Tiempo Respuesta</span>
                                <span className="font-mono font-bold text-emerald-600">0.4s</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Automations (N8N Style) */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Workflow className="text-emerald-600" /> Flujos de Automatización (n8n)
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors cursor-pointer group">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                            <Bot />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800">Alerta de Humedad IoT</h3>
                            <p className="text-xs text-slate-500">Sensor → N8N → WhatsApp (Groom)</p>
                        </div>
                         <Badge className="bg-emerald-100 text-emerald-700">Activo</Badge>
                    </div>

                     <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors cursor-pointer group">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                            <Cpu />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800">Sincronización REPROCANN</h3>
                            <p className="text-xs text-slate-500">Ministerio API → DB Update</p>
                        </div>
                         <Badge className="bg-emerald-100 text-emerald-700">Activo</Badge>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition-colors cursor-pointer group">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                            <FileText />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800">Generación PDF Lotes</h3>
                            <p className="text-xs text-slate-500">Nuevo Lote → Generar QR → Imprimir</p>
                        </div>
                         <Badge className="bg-slate-100 text-slate-500">Pausado</Badge>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 animate-pulse"></div>
                <h3 className="text-2xl font-black text-white relative z-10 mb-4">¿Necesita una automatización a medida?</h3>
                <p className="text-slate-400 relative z-10 max-w-xl mx-auto mb-8">Nuestro equipo de ingeniería puede crear flujos personalizados usando n8n y LangChain para conectar sus sistemas existentes.</p>
                <Button className="relative z-10 bg-white text-slate-900 font-bold hover:bg-emerald-50">Solicitar Consultoría</Button>
            </div>
        </div>
    );
}
