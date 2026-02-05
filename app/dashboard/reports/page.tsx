'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { FileText, Download, Printer, QrCode, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';

export default function ReportsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
             <div>
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reportes</h1>
                 <p className="text-slate-500">Generación de documentación oficial y etiquetas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Reports Generation */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">Oficiales (Ministerio de Salud)</h2>
                    
                    <Card className="border-slate-100 hover:border-emerald-200 transition-colors group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <FileText className="h-5 w-5 text-emerald-600" />
                                Informe Semestral
                            </CardTitle>
                            <CardDescription>Resumen obligatorio de movimientos de stock y pacientes para INASE/Ministerio.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-800">Todos los datos requeridos están completos</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-slate-900 group-hover:bg-emerald-600 transition-colors font-bold">
                                <Download className="mr-2 h-4 w-4" /> Generar PDF
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-slate-100">
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <FileText className="h-5 w-5 text-blue-600" />
                                DDJJ Anual
                            </CardTitle>
                            <CardDescription>Declaración Jurada de Cultivo para Asociaciones Civiles.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 font-bold">
                                <Download className="mr-2 h-4 w-4" /> Previsualizar
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                 {/* Labels Generation */}
                 <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">Etiquetado</h2>
                    
                     <Card className="border-slate-100 bg-slate-50/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <QrCode className="h-5 w-5 text-slate-600" />
                                Etiquetas QR (Lotes)
                            </CardTitle>
                            <CardDescription>Genere etiquetas adhesivas trazables para macetas y frascos.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center">
                                    <QrCode className="h-12 w-12 text-slate-800 mb-2 opacity-20" />
                                    <span className="text-xs font-bold text-slate-400">Etiqueta 5x5cm</span>
                                </div>
                                 <div className="aspect-square bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center">
                                    <QrCode className="h-8 w-8 text-slate-800 mb-2 opacity-20" />
                                    <span className="text-xs font-bold text-slate-400">Etiqueta 3x3cm</span>
                                </div>
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button variant="outline" className="w-full border-slate-200 bg-white hover:bg-slate-50 font-bold">
                                <Printer className="mr-2 h-4 w-4" /> Imprimir Lote Actual
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* History Table */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">Historial de Descargas</h2>
                <Card className="border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Documento</th>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4">Usuario</th>
                                    <th className="px-6 py-4">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold text-slate-700">Informe_Semestral_2023_Q4.pdf</td>
                                    <td className="px-6 py-4 text-slate-500">12 Feb, 2024</td>
                                    <td className="px-6 py-4">Martin Navarro</td>
                                    <td className="px-6 py-4"><Badge variant="default" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Completado</Badge></td>
                                </tr>
                                <tr className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold text-slate-700">Etiquetas_Lote_2024-001.pdf</td>
                                    <td className="px-6 py-4 text-slate-500">10 Feb, 2024</td>
                                    <td className="px-6 py-4">Juan Perez</td>
                                    <td className="px-6 py-4"><Badge variant="default" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Completado</Badge></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
