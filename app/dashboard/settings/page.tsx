'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { 
    Cpu, 
    Send, 
    ShieldCheck, 
    Check, 
    Key, 
    History, 
    Copy,
    RefreshCw 
} from 'lucide-react';

// Simple Toggle Component locally
const Toggle = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (c: boolean) => void }) => (
    <button 
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pastel-green-500 focus:ring-offset-2 ${checked ? 'bg-pastel-green-600' : 'bg-slate-200'}`}
    >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

export default function SettingsPage() {
    const [iotEnabled, setIotEnabled] = useState(true);
    const [isTesting, setIsTesting] = useState(false);
    const [auditorAccess, setAuditorAccess] = useState<{user: string; pass: string} | null>(null);

    const generateAuditorAccess = () => {
        setAuditorAccess(null);
        // Simulate API call
        setTimeout(() => {
            setAuditorAccess({
                user: 'auditor_24h_temp',
                pass: 'a9xR!b3$pZ'
            });
        }, 600);
    };

    const sendTestAlert = () => {
        setIsTesting(true);
        setTimeout(() => setIsTesting(false), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
             <div>
                 <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Configuración Avanzada</h1>
                 <p className="text-muted-foreground font-light">Gestione integraciones, seguridad y parámetros del sistema.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* IoT Sentinel Config */}
                <Card className="border-border shadow-sm overflow-hidden">
                    <CardHeader className="bg-card border-b border-border">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold text-foreground font-title">Centinela IoT</CardTitle>
                                <CardDescription>Monitoreo ambiental y alertas tempranas.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                            <div>
                                <p className="font-bold text-foreground font-title">Activar Monitoreo 24/7</p>
                                <p className="text-xs text-muted-foreground font-light">Lectura continua de sensores.</p>
                            </div>
                            <Toggle checked={iotEnabled} onCheckedChange={setIotEnabled} />
                        </div>

                        <div className="space-y-2">
                             <label className="text-sm font-bold text-foreground font-medium">WhatsApp para Alertas Críticas</label>
                             <div className="flex gap-2">
                                <Input defaultValue="+54 9 11 1234 5678" className="bg-card font-mono text-foreground font-medium" />
                                <Button 
                                    onClick={sendTestAlert}
                                    disabled={!iotEnabled || isTesting}
                                    className={`font-bold transition-all ${isTesting ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isTesting ? <Check size={16} /> : <Send size={16} />}
                                </Button>
                             </div>
                        </div>

                        <div className="p-4 rounded-xl bg-foreground text-slate-300 text-xs font-mono">
                            <p className="mb-2 text-muted-foreground font-light uppercase font-bold tracking-widest">Estado del Sistema</p>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="h-2 w-2 rounded-full bg-pastel-green-500 animate-pulse"></div>
                                Servicio de Alertas: <span className="text-pastel-green-400">ONLINE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-pastel-green-500 animate-pulse delay-150"></div>
                                Gateway MQTT: <span className="text-pastel-green-400">CONECTADO</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Auditor Access */}
                <Card className="border-border shadow-sm overflow-hidden border-t-4 border-t-amber-400 h-fit">
                    <CardHeader className="bg-card border-b border-border">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-bold text-foreground font-title">Acceso de Auditoría</CardTitle>
                                <CardDescription>Credenciales temporales para inspecciones.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">
                            Genere un acceso de <strong>solo lectura</strong> para inspectores externos o auditores de REPROCANN. 
                            Las credenciales expirarán automáticamente en 24 horas.
                        </p>

                        {auditorAccess ? (
                             <div className="p-5 rounded-xl bg-amber-50 border border-dashed border-amber-300 relative animate-in zoom-in-95 duration-300">
                                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Key size={14} /> Credenciales Temporales
                                </p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center bg-white p-2 rounded border border-amber-100">
                                        <span className="text-xs text-muted-foreground font-light">Usuario</span>
                                        <span className="font-mono font-bold text-foreground font-title select-all">{auditorAccess.user}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white p-2 rounded border border-amber-100">
                                        <span className="text-xs text-muted-foreground font-light">Contraseña</span>
                                        <span className="font-mono font-bold text-foreground font-title select-all">{auditorAccess.pass}</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button size="sm" variant="ghost" className="text-amber-700 hover:bg-amber-100 hover:text-amber-800 h-8">
                                        <Copy size={14} className="mr-2" /> Copiar Datos
                                    </Button>
                                </div>
                             </div>
                        ) : (
                             <div className="p-8 rounded-xl bg-card border border-border text-center flex flex-col items-center justify-center text-muted-foreground font-light gap-2">
                                <ShieldCheck size={32} className="opacity-20" />
                                <span className="text-sm">No hay accesos temporales activos.</span>
                             </div>
                        )}

                        <Button 
                            onClick={generateAuditorAccess} 
                            className="w-full bg-foreground hover:bg-foreground/90 font-bold"
                            disabled={!!auditorAccess}
                        >
                            {auditorAccess ? <><Check size={16} className="mr-2"/> Acceso Generado</> : 'Generar Acceso Temporal (24hs)'}
                        </Button>
                    </CardContent>
                </Card>

                 {/* System Logs */}
                 <div className="md:col-span-2">
                    <Card className="border-border shadow-sm">
                        <CardHeader>
                             <CardTitle className="text-base font-bold flex items-center gap-2">
                                <History size={16} className="text-muted-foreground font-light"/> Historial de Configuraciones
                             </CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                {[1,2,3].map((i) => (
                                    <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                                            <span className="text-muted-foreground">Cambio en sensibilidad de Alertas pH</span>
                                        </div>
                                        <span className="text-muted-foreground font-light text-xs font-mono">Hace {i * 2} días</span>
                                    </div>
                                ))}
                             </div>
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </div>
    );
}
