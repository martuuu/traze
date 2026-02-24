'use client';

import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { FileText, Download, CheckCircle2, UploadCloud, Clock } from 'lucide-react';

export default function DocumentsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                     <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Mis Documentos</h1>
                     <p className="text-muted-foreground font-light">Repositorio legal y formularios de consentimiento.</p>
                </div>
                <Button variant="outline" className="border-border text-muted-foreground">
                    <UploadCloud className="mr-2 h-4 w-4" /> Subir Archivo
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* REPROCANN */}
                <Card className="border-teal-100 bg-teal-50/20 shadow-none">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                             <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                                <FileText size={24} />
                             </div>
                             <div>
                                 <h3 className="font-bold text-lg text-foreground font-title flex items-center gap-2">
                                     Credencial REPROCANN
                                     <Badge className="bg-teal-600 hover:bg-teal-700 border-none text-white">Vigente</Badge>
                                 </h3>
                                 <p className="text-sm text-muted-foreground font-light">Expira: 12/12/2024 • Nro: 26550</p>
                             </div>
                        </div>
                        <Button className="bg-white border border-border text-foreground font-medium hover:bg-card font-bold shadow-sm w-full md:w-auto">
                            <Download className="mr-2 h-4 w-4" /> Descargar PDF
                        </Button>
                    </CardContent>
                </Card>

                {/* Consentimiento */}
                <Card className="border-border shadow-sm">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                             <div className="h-12 w-12 rounded-xl bg-sand-gold-50 text-muted-foreground font-light flex items-center justify-center shrink-0">
                                <CheckCircle2 size={24} />
                             </div>
                             <div>
                                 <h3 className="font-bold text-lg text-foreground font-title">Consentimiento Informado</h3>
                                 <p className="text-sm text-muted-foreground font-light">Firmado digitalmente el 15/01/2023</p>
                             </div>
                        </div>
                         <Button variant="outline" className="border-border text-muted-foreground font-bold w-full md:w-auto">
                            <Download className="mr-2 h-4 w-4" /> Ver Copia
                        </Button>
                    </CardContent>
                </Card>

                 {/* Ficha Médica */}
                <Card className="border-border shadow-sm">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                             <div className="h-12 w-12 rounded-xl bg-sand-gold-50 text-muted-foreground font-light flex items-center justify-center shrink-0">
                                <Clock size={24} />
                             </div>
                             <div>
                                 <h3 className="font-bold text-lg text-foreground font-title">Historial Clínico (Anexo 1)</h3>
                                 <p className="text-sm text-muted-foreground font-light">Última actualización: 10/08/2023</p>
                             </div>
                        </div>
                         <Button variant="outline" className="border-border text-muted-foreground font-bold w-full md:w-auto">
                            <Download className="mr-2 h-4 w-4" /> Ver Historial
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
