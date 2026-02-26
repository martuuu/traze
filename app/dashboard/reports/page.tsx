'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { FileText, Download, Printer, QrCode, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { yearlyStatsData } from '@/app/data/mock-db';

export default function ReportsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
             <div>
                 <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Reportes</h1>
                 <p className="text-muted-foreground font-light">Generación de documentación oficial y etiquetas</p>
            </div>

            {/* Yearly Stats Chart */}
            <Card className="border-border">
                <CardHeader>
                    <CardTitle className="text-xl font-bold font-title">Resumen Anual de Producción</CardTitle>
                    <CardDescription>Métricas de semillas, cultivo, cosecha y extracción a lo largo del año.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={yearlyStatsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="seeds" name="Semillas (Stock)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="cultivated" name="Planta Cultivada" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="harvested" name="Cosechado (g)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="extracted" name="Extracción Aceite (ml)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Reports Generation */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground font-title">Oficiales (Ministerio de Salud)</h2>
                    
                    <Card className="border-border hover:border-pastel-green-200 transition-colors group">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <FileText className="h-5 w-5 text-pastel-green-600" />
                                Informe Semestral
                            </CardTitle>
                            <CardDescription>Resumen obligatorio de movimientos de stock y pacientes para INASE/Ministerio.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 mb-4 p-3 bg-pastel-green-50 rounded-lg border border-pastel-green-100">
                                <CheckCircle2 className="h-4 w-4 text-pastel-green-600" />
                                <span className="text-sm font-medium text-pastel-green-800">Todos los datos requeridos están completos</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-foreground group-hover:bg-pastel-green-600 transition-colors font-bold">
                                <Download className="mr-2 h-4 w-4" /> Generar PDF
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-border">
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <FileText className="h-5 w-5 text-blue-600" />
                                DDJJ Anual
                            </CardTitle>
                            <CardDescription>Declaración Jurada de Cultivo para Asociaciones Civiles.</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button variant="outline" className="w-full border-border hover:bg-card font-bold">
                                <Download className="mr-2 h-4 w-4" /> Previsualizar
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                 {/* Labels Generation */}
                 <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground font-title">Etiquetado</h2>
                    
                     <Card className="border-border bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <QrCode className="h-5 w-5 text-muted-foreground" />
                                Etiquetas QR (Lotes)
                            </CardTitle>
                            <CardDescription>Genere etiquetas adhesivas trazables para macetas y frascos.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center">
                                    <QrCode className="h-12 w-12 text-foreground font-title mb-2 opacity-20" />
                                    <span className="text-xs font-bold text-muted-foreground font-light">Etiqueta 5x5cm</span>
                                </div>
                                 <div className="aspect-square bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center">
                                    <QrCode className="h-8 w-8 text-foreground font-title mb-2 opacity-20" />
                                    <span className="text-xs font-bold text-muted-foreground font-light">Etiqueta 3x3cm</span>
                                </div>
                            </div>
                        </CardContent>
                         <CardFooter>
                            <Button variant="outline" className="w-full border-border bg-white hover:bg-card font-bold">
                                <Printer className="mr-2 h-4 w-4" /> Imprimir Lote Actual
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* History Table */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground font-title">Historial de Descargas</h2>
                <Card className="border-border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-card text-muted-foreground font-light font-bold border-b border-border">
                                <tr>
                                    <th className="px-6 py-4">Documento</th>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4">Usuario</th>
                                    <th className="px-6 py-4">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="hover:bg-card">
                                    <td className="px-6 py-4 font-bold text-foreground font-medium">Informe_Semestral_2023_Q4.pdf</td>
                                    <td className="px-6 py-4 text-muted-foreground font-light">12 Feb, 2024</td>
                                    <td className="px-6 py-4">Martin Navarro</td>
                                    <td className="px-6 py-4"><Badge variant="default" className="bg-pastel-green-100 text-pastel-green-700 hover:bg-pastel-green-200">Completado</Badge></td>
                                </tr>
                                <tr className="hover:bg-card">
                                    <td className="px-6 py-4 font-bold text-foreground font-medium">Etiquetas_Lote_2024-001.pdf</td>
                                    <td className="px-6 py-4 text-muted-foreground font-light">10 Feb, 2024</td>
                                    <td className="px-6 py-4">Juan Perez</td>
                                    <td className="px-6 py-4"><Badge variant="default" className="bg-pastel-green-100 text-pastel-green-700 hover:bg-pastel-green-200">Completado</Badge></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
