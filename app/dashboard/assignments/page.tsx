'use client';

import { useState } from 'react';
import { AssignmentsList } from './components/AssignmentsList';
import { Button } from '@/app/components/ui/button';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Input } from '@/app/components/ui/input';
import { UserPlus, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AssignmentsPage() {
    const [isLinkPatientOpen, setIsLinkPatientOpen] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Asignación a Pacientes</h1>
                    <p className="text-muted-foreground font-light mt-1">Control Estricto REPROCANN (Máster Cupo 9 Plantas)</p>
                </div>
                <div className="flex gap-3">
                    <Button 
                        className="bg-foreground text-background font-bold"
                        onClick={() => setIsLinkPatientOpen(true)}
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Vincular Paciente
                    </Button>
                </div>
            </div>

            {/* Link Patient Modal */}
            <Dialog
                isOpen={isLinkPatientOpen}
                onClose={() => setIsLinkPatientOpen(false)}
                title="Vincular Nuevo Paciente"
                description="Registre un paciente autorizado por REPROCANN para iniciar su trazabilidad y cupo de plantas."
                maxWidth="max-w-xl"
            >
                <form className="space-y-4 pt-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldAlert className="w-4 h-4 text-blue-600" />
                            <h4 className="font-bold text-sm text-blue-900">Validación REPROCANN</h4>
                        </div>
                        <div className="flex gap-3">
                            <Input placeholder="Código de Aprobación (Ej. 182991)" className="flex-1 bg-white" />
                            <Button variant="outline" type="button" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Validar
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Nombre Completo</label>
                            <Input placeholder="Nombre del Paciente" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">DNI / Pasaporte</label>
                            <Input placeholder="Documento de Identidad" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Patología / Condición</label>
                            <Input placeholder="Condición Médica Aprobada" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Cupo Máximo Legal</label>
                            <Input value="9 Plantas (Res. 3132/24)" disabled className="bg-slate-50 text-slate-500 font-medium" />
                        </div>
                    </div>

                    <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 mt-2 flex items-start gap-2 text-xs text-amber-800">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p>
                            Al vincular este paciente, usted declara bajo juramento que los datos coinciden con su certificado REPROCANN vigente.
                        </p>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-border mt-4">
                        <Button variant="ghost" type="button" onClick={() => setIsLinkPatientOpen(false)}>Cancelar</Button>
                        <Button type="button" className="bg-foreground text-background font-bold" onClick={() => setIsLinkPatientOpen(false)}>
                            Confirmar Vinculación
                        </Button>
                    </div>
                </form>
            </Dialog>
            
            <div className="grid grid-cols-1">
                <div className="space-y-6">
                    <AssignmentsList />
                </div>
            </div>
        </div>
    );
}
