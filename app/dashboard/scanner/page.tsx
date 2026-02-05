'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { Camera, ScanLine, XCircle, CheckCircle2, QrCode } from 'lucide-react';
import { cn } from '@/app/lib/utils'; // Make sure this is imported!
import { GlassCard } from '@/app/components/ui/glass-card';

export default function ScannerPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [lastScan, setLastScan] = useState<null | string>(null);

    const handleSimulateScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setLastScan("TRAZE-PLANT-001-TEST");
        }, 2000);
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-6">
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">Scanner QR</h1>
                 <p className="text-slate-500">Identifique plantas, lotes y productos rápidamente.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Camera Viewfinder */}
                <div className="lg:col-span-2 relative bg-black rounded-[2rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center group">
                    {!isScanning && !lastScan && (
                         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex flex-col items-center justify-center text-center p-8 z-10">
                            <div className="h-20 w-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 animate-pulse">
                                <Camera className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Cámara Inactiva</h3>
                            <p className="text-slate-400 mb-8 max-w-sm">Habilite el acceso a la cámara para escanear códigos QR de trazabilidad.</p>
                            <Button 
                                onClick={handleSimulateScan}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 px-8 rounded-full"
                            >
                                Activar Cámara
                            </Button>
                         </div>
                    )}

                    {isScanning && (
                        <div className="absolute inset-0 z-20">
                             {/* Simulated Camera Feed */}
                             <div className="absolute inset-0 bg-slate-900 animate-pulse"></div>
                             
                             {/* Scanning UI Overlay */}
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-64 h-64 border-2 border-emerald-500/50 rounded-3xl relative">
                                     <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl"></div>
                                     <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl"></div>
                                     <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl"></div>
                                     <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-xl"></div>
                                     
                                     {/* Scanning Line */}
                                     <div className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
                                 </div>
                             </div>
                             <div className="absolute bottom-10 left-0 right-0 text-center">
                                 <p className="text-emerald-400 font-mono text-sm animate-pulse">Buscando código QR...</p>
                             </div>
                        </div>
                    )}

                    {lastScan && (
                         <div className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center text-center p-8 animate-in zoom-in-95 duration-300">
                             <div className="h-24 w-24 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                                 <CheckCircle2 className="h-12 w-12 text-white" />
                             </div>
                             <h2 className="text-3xl font-black text-white mb-2">Código Detectado</h2>
                             <p className="text-2xl font-mono text-emerald-400 mb-8 tracking-widest bg-emerald-950/50 px-6 py-2 rounded-lg border border-emerald-900">
                                 {lastScan}
                             </p>
                             <div className="flex gap-4">
                                 <Button 
                                    onClick={() => setLastScan(null)}
                                    variant="outline" 
                                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                                 >
                                    Cerrar
                                 </Button>
                                 <Button className="bg-white text-slate-900 font-bold hover:bg-slate-200">
                                     <Link href="/dashboard/plants/p1">Ver Detalle</Link>
                                 </Button>
                             </div>
                         </div>
                    )}
                </div>

                {/* Recent Scans / Instructions */}
                <div className="space-y-6">
                    <GlassCard className="bg-white/50 backdrop-blur-sm border-white/60">
                         <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                             <ScanLine className="h-4 w-4 text-slate-500" />
                             Últimos Escaneos
                         </h3>
                         <div className="space-y-3">
                             {[1,2,3].map((_, i) => (
                                 <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                     <div className="flex items-center gap-3">
                                         <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                             <QrCode size={16} className="text-slate-500" />
                                         </div>
                                         <div className="text-sm">
                                             <p className="font-bold text-slate-700">TRAZE-P-{100+i}</p>
                                             <p className="text-xs text-slate-400">Hace {i*15 + 5} min</p>
                                         </div>
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </GlassCard>

                     <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <h4 className="font-bold text-blue-800 mb-2">Tips de Escaneo</h4>
                        <ul className="text-sm text-blue-700 space-y-2 list-disc pl-4">
                            <li>Asegure buena iluminación.</li>
                            <li>Mantenga el código dentro del recuadro.</li>
                            <li>Limpie la etiqueta si está borrosa.</li>
                        </ul>
                     </div>
                </div>
            </div>
        </div>
    );
}
