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
                 <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Centro de Innovación & IA</h1>
                 <p className="text-muted-foreground font-light">Monitoreo de agentes autónomos y automatizaciones activas.</p>
            </div>

            {/* Agents Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-foreground text-white border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Bot size={80} />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                             <Badge variant="outline" className="text-pastel-green-400 border-pastel-green-400/50 bg-pastel-green-400/10 animate-pulse">ON LINE</Badge>
                        </div>
                        <CardTitle className="text-xl font-bold">Oficial de Compliance IA</CardTitle>
                        <CardDescription className="text-muted-foreground font-light">Verificando Reglas 3132/2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-light">Validaciones Hoy</span>
                                <span className="font-mono font-bold text-white">4,291</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-light">Intentos Bloqueados</span>
                                <span className="font-mono font-bold text-red-400">3</span>
                            </div>
                            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-pastel-green-500 w-full animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="border-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu size={80} className="text-blue-500" />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                             <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">ACTIVO</Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-foreground font-title">Reportería Automática</CardTitle>
                        <CardDescription>Generación de Informes Semestrales</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-light">Próximo Reporte</span>
                                <span className="font-mono font-bold text-foreground font-medium">En 14 días</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-light">Datos Procesados</span>
                                <span className="font-mono font-bold text-foreground font-medium">1.2 GB</span>
                            </div>
                         </div>
                    </CardContent>
                </Card>

                <Card className="border-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap size={80} className="text-amber-500" />
                    </div>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                             <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">IDLE</Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-foreground font-title">Soporte Técnico 24/7</CardTitle>
                        <CardDescription>Chatbot de asistencia a Operarios</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                             <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-light">Tickets Resueltos</span>
                                <span className="font-mono font-bold text-foreground font-medium">15 (Hoy)</span>
                            </div>
                             <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-light">Tiempo Respuesta</span>
                                <span className="font-mono font-bold text-pastel-green-600">0.4s</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Automations (N8N Style) */}
            <div>
                <h2 className="text-xl font-bold text-foreground font-title mb-6 flex items-center gap-2">
                    <Workflow className="text-pastel-green-600" /> Flujos de Automatización (n8n)
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:border-pastel-green-200 transition-colors cursor-pointer group">
                        <div className="h-12 w-12 rounded-xl bg-sand-gold-50 flex items-center justify-center group-hover:bg-pastel-green-50 group-hover:text-pastel-green-600 transition-colors">
                            <Bot />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground font-title">Alerta de Humedad IoT</h3>
                            <p className="text-xs text-muted-foreground font-light">Sensor → N8N → WhatsApp (Groom)</p>
                        </div>
                         <Badge className="bg-pastel-green-100 text-pastel-green-700">Activo</Badge>
                    </div>

                     <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:border-pastel-green-200 transition-colors cursor-pointer group">
                        <div className="h-12 w-12 rounded-xl bg-sand-gold-50 flex items-center justify-center group-hover:bg-pastel-green-50 group-hover:text-pastel-green-600 transition-colors">
                            <Cpu />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground font-title">Sincronización REPROCANN</h3>
                            <p className="text-xs text-muted-foreground font-light">Ministerio API → DB Update</p>
                        </div>
                         <Badge className="bg-pastel-green-100 text-pastel-green-700">Activo</Badge>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:border-pastel-green-200 transition-colors cursor-pointer group">
                        <div className="h-12 w-12 rounded-xl bg-sand-gold-50 flex items-center justify-center group-hover:bg-pastel-green-50 group-hover:text-pastel-green-600 transition-colors">
                            <FileText />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground font-title">Generación PDF Lotes</h3>
                            <p className="text-xs text-muted-foreground font-light">Nuevo Lote → Generar QR → Imprimir</p>
                        </div>
                         <Badge className="bg-sand-gold-50 text-muted-foreground font-light">Pausado</Badge>
                    </div>
                </div>
            </div>
            
            <div className="bg-foreground rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pastel-green-500/20 to-blue-500/20 animate-pulse"></div>
                <h3 className="text-2xl font-black text-white relative z-10 mb-4">¿Necesita una automatización a medida?</h3>
                <p className="text-muted-foreground font-light relative z-10 max-w-xl mx-auto mb-8">Nuestro equipo de ingeniería puede crear flujos personalizados usando n8n y LangChain para conectar sus sistemas existentes.</p>
                <Button className="relative z-10 bg-white text-foreground font-title font-bold hover:bg-pastel-green-50">Solicitar Consultoría</Button>
            </div>
        </div>
    );
}
