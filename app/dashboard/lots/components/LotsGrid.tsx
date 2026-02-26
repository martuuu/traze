'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { lots, seeds, Lot } from '@/app/data/mock-db';
import { Snowflake, Thermometer, Droplets, Calendar, QrCode, Scan, Download } from 'lucide-react';

export function LotsGrid() {
    const [selectedLotForQR, setSelectedLotForQR] = useState<Lot | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {lots.map((lot) => {
                const seedInfo = seeds.find(s => s.id === lot.seedId);

                return (
                    <Card key={lot.id} className="border-border hover:border-blue-300 transition-all duration-300 group overflow-hidden bg-card">
                        <CardHeader className="pb-3 border-b border-border/50 bg-slate-50/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-bold flex items-center gap-2 group-hover:text-blue-700 transition-colors">
                                        <Snowflake className="w-4 h-4 text-blue-500" />
                                        {lot.name}
                                    </CardTitle>
                                    <CardDescription className="mt-1 font-mono text-xs text-muted-foreground">{lot.id}</CardDescription>
                                </div>
                                <Badge variant="outline" className={lot.status === 'ACTIVE' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-slate-200 bg-slate-50 text-slate-700'}>
                                    {lot.status === 'ACTIVE' ? 'Activo' : 'Archivado'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-border">
                                <div className="space-y-1">
                                    <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <Thermometer className="w-3 h-3 text-red-400" /> Temperatura
                                    </div>
                                    <p className="font-bold text-sm">{lot.conditions.temp}°C</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <Droplets className="w-3 h-3 text-blue-400" /> Humedad
                                    </div>
                                    <p className="font-bold text-sm">{lot.conditions.humidity}%</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs text-muted-foreground font-medium">Ubicación</div>
                                    <p className="font-bold text-sm">{lot.assignedLocation}</p>
                                </div>
                            </div>

                            <div className="space-y-3 px-1 text-sm">
                                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Genética (Semilla):</span>
                                    <span className="font-medium text-right">{seedInfo?.name || 'Desconocida'}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                                    <span className="text-muted-foreground">Cantidad:</span>
                                    <span className="font-bold font-title text-foreground">{lot.quantity} Und.</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Alta:</span>
                                    <span className="font-medium">{new Date(lot.creationDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/30 pt-4 pb-4 border-t border-border/50">
                            <Button 
                                variant="ghost" 
                                className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => setSelectedLotForQR(lot)}
                            >
                                <span>Ver UUID QRs</span>
                                <QrCode className="w-4 h-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}

            {/* QR UUIDs Modal */}
            <Dialog
                isOpen={!!selectedLotForQR}
                onClose={() => setSelectedLotForQR(null)}
                title={`Codificación QR - ${selectedLotForQR?.name}`}
                description="Etiquetas generadas para el envasado y trazabilidad individual de este lote."
                maxWidth="max-w-2xl"
            >
                {selectedLotForQR && (
                    <div className="space-y-6 pt-4">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-border">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h4 className="font-bold text-slate-800">Lote: {selectedLotForQR.id}</h4>
                                    <p className="text-sm text-slate-500">Total Generados: {selectedLotForQR.quantity} unidades</p>
                                </div>
                                <Button variant="outline" className="bg-white hover:bg-slate-50 text-blue-600 border-blue-200">
                                    <Download className="w-4 h-4 mr-2" /> Descargar PDF
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {/* Showing a few sample QRs */}
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className="bg-white p-3 rounded-xl border border-border flex flex-col items-center gap-2 shadow-sm hover:border-blue-300 transition-colors cursor-pointer group">
                                        <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden text-slate-400 group-hover:text-blue-500 transition-colors">
                                            <QrCode className="w-10 h-10" strokeWidth={1.5} />
                                            {/* Simulate scan line effect on hover */}
                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400 opacity-0 group-hover:opacity-100 group-hover:animate-scan transition-opacity duration-300"></div>
                                        </div>
                                        <div className="text-center w-full">
                                            <div className="text-[10px] text-muted-foreground uppercase">ID Interno</div>
                                            <div className="text-xs font-mono font-bold text-slate-700 truncate">{selectedLotForQR.id}-{i.toString().padStart(4, '0')}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {selectedLotForQR.quantity > 8 && (
                                <div className="mt-4 text-center">
                                    <p className="text-xs text-slate-500 font-medium">mostrando 8 de {selectedLotForQR.quantity} códigos generados...</p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-3">
                                <Scan className="w-5 h-5 text-blue-600" />
                                <div>
                                    <div className="text-sm font-bold text-blue-900">Aplicación Móvil</div>
                                    <div className="text-xs text-blue-700 mt-0.5">Use la app Traze Scanner para leer y actualizar el estado de cada frasco/planta en tiempo real.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>

        </div>
    );
}
