'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Input } from '@/app/components/ui/input';
import { patients, plants, ReprocannPatient } from '@/app/data/mock-db';
import { Sprout, AlertCircle, RefreshCw, CheckCircle2, User, FileText, Download, Fingerprint } from 'lucide-react';
import React, { useState } from 'react';

export function AssignmentsList() {
    const [assignPlantForPatient, setAssignPlantForPatient] = useState<ReprocannPatient | null>(null);
    const [consentForPatient, setConsentForPatient] = useState<ReprocannPatient | null>(null);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {patients.map((patient) => {
                const isLimitReached = patient.assignedPlantsCount >= 9;
                const progressPercentage = (patient.assignedPlantsCount / 9) * 100;
                
                // Find plants assigned to this patient
                const patientPlants = plants.filter(p => p.patientId === patient.id);

                return (
                    <Card key={patient.id} className={`border-border transition-all duration-300 overflow-hidden ${isLimitReached ? 'border-red-200 bg-red-50/10' : 'hover:border-pastel-green-300 bg-card'}`}>
                        <CardHeader className={`pb-3 border-b ${isLimitReached ? 'bg-red-50/50 border-red-100' : 'bg-slate-50/50 border-border/50'}`}>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                                        <User className={`w-4 h-4 ${isLimitReached ? 'text-red-500' : 'text-blue-500'}`} />
                                        {patient.fullName}
                                    </CardTitle>
                                    <div className="flex items-center gap-2">
                                        <CardDescription className="font-mono text-xs">{patient.reprocannCode}</CardDescription>
                                        <Badge variant="outline" className="text-[10px] py-0 border-border bg-white">{patient.status}</Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-end justify-end gap-1 mb-1">
                                        <span className={`text-2xl font-black font-title ${isLimitReached ? 'text-red-600' : 'text-foreground'}`}>
                                            {patient.assignedPlantsCount}
                                        </span>
                                        <span className="text-muted-foreground pb-1 text-sm">/ 9 max</span>
                                    </div>
                                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-border">
                                        <div 
                                            className={`h-full ${isLimitReached ? 'bg-red-500' : 'bg-pastel-green-500'}`}
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            
                            {isLimitReached && (
                                <div className="flex flex-col sm:flex-row gap-3 p-4 bg-red-100/50 rounded-xl border border-red-200 items-start">
                                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-red-800">Límite Normativo Alcanzado (Res. 3132/24)</p>
                                        <p className="text-xs text-red-600 mt-1">
                                            El sistema ha bloqueado nuevas asignaciones de lotes o plantas para este paciente. No se pueden exceder las 9 plantas en etapa de floración.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {!isLimitReached && patient.assignedPlantsCount > 0 && (
                                <div className="flex gap-2 p-3 bg-pastel-green-50/50 rounded-xl border border-pastel-green-100 items-center">
                                    <CheckCircle2 className="w-4 h-4 text-pastel-green-600 shrink-0" />
                                    <p className="text-xs font-medium text-pastel-green-800">
                                        Cupo disponible: Puedes asignar {9 - patient.assignedPlantsCount} plantas más.
                                    </p>
                                </div>
                            )}

                             {!isLimitReached && patient.assignedPlantsCount === 0 && (
                                <div className="flex gap-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100 items-center">
                                    <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
                                    <p className="text-xs font-medium text-blue-800">
                                        Paciente nuevo sin asignaciones. Listo para vincular lote "Momento 0".
                                    </p>
                                </div>
                            )}

                            {patientPlants.length > 0 && (
                                <div className="space-y-3 mt-4">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Plantas Activas</h4>
                                    {patientPlants.map(plant => (
                                        <div key={plant.id} className="flex justify-between items-center p-3 border border-border bg-slate-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center">
                                                    <Sprout className="w-4 h-4 text-pastel-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{plant.id}</p>
                                                    <p className="text-xs text-muted-foreground font-mono">{plant.qrUuid}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="secondary" className="bg-white border-border shadow-sm text-[10px] uppercase">
                                                    {plant.currentStage === 'FLOWERING' ? 'Floración' : plant.currentStage}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </CardContent>
                        <CardFooter className={`bg-slate-50/30 pt-4 pb-4 border-t ${isLimitReached ? 'border-red-100' : 'border-border/50'} gap-3`}>
                            <Button 
                                variant={isLimitReached ? 'outline' : 'default'} 
                                disabled={isLimitReached}
                                onClick={() => setAssignPlantForPatient(patient)}
                                className={`flex-1 font-bold ${!isLimitReached ? 'bg-foreground text-background hover:bg-foreground/90' : ''}`}
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                {isLimitReached ? 'Asignación Bloqueada' : 'Asignar Planta / Lote'}
                            </Button>
                            <Button 
                                variant="outline" 
                                className="border-border px-3" 
                                title="Descargar Consentimiento Bilateral"
                                onClick={() => setConsentForPatient(patient)}
                            >
                                <FileText className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}

            {/* Asignar Planta / Lote Modal */}
            <Dialog
                isOpen={!!assignPlantForPatient}
                onClose={() => setAssignPlantForPatient(null)}
                title={`Nueva Asignación - ${assignPlantForPatient?.fullName}`}
                description="Seleccione el nuevo ejemplar a vincular. Esto consumirá un cupo de los 9 permitidos por REPROCANN."
                maxWidth="max-w-md"
            >
                {assignPlantForPatient && (
                    <form className="space-y-4 pt-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-700">Estado de Cupos</span>
                                <Badge variant="outline" className="bg-white border-slate-300 text-slate-700">
                                    {assignPlantForPatient.assignedPlantsCount} / 9 Utilizados
                                </Badge>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-pastel-green-500"
                                    style={{ width: `${(assignPlantForPatient.assignedPlantsCount / 9) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700">Seleccionar Lote / Planta Disponible</label>
                                <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pastel-green-500">
                                    <option>Lote L001 - Blue Dream (Sala A)</option>
                                    <option>Lote L002 - OG Kush (Esquejera)</option>
                                    <option>Planta P-992 - Lemon Haze</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700">Etapa Actual (Verificación)</label>
                                <Input value="Vegetativo Temprano" disabled className="bg-slate-50 text-slate-500 font-medium" />
                            </div>
                            <div className="pt-2 flex justify-end gap-3 mt-4">
                                <Button variant="ghost" type="button" onClick={() => setAssignPlantForPatient(null)}>Cancelar</Button>
                                <Button type="button" className="bg-foreground text-background font-bold" onClick={() => setAssignPlantForPatient(null)}>
                                    Confirmar Asignación
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Dialog>

            {/* Descargar Consentimiento Modal */}
            <Dialog
                isOpen={!!consentForPatient}
                onClose={() => setConsentForPatient(null)}
                title="Acuerdo Bilateral de Trazabilidad"
                description={`Consentimiento informado para ${consentForPatient?.fullName} bajo Res. 3132/2024.`}
                maxWidth="max-w-lg"
            >
                {consentForPatient && (
                    <div className="space-y-4 pt-4">
                        <div className="bg-sand-gold-50 p-5 rounded-xl border border-sand-gold-200 text-sm text-sand-gold-900 leading-relaxed overflow-y-auto max-h-48 custom-scrollbar">
                            <p className="mb-3 font-bold">TÉRMINOS DE CULTIVO DE TERCEROS (ONG)</p>
                            <p className="mb-2">Por medio del presente documento, el Paciente <strong>{consentForPatient.fullName}</strong> (DNI/REPROCANN: {consentForPatient.reprocannCode}) consiente expresamente a <strong>Traze Cultivos Solidarios</strong> la administración, cultivo y gestión de un máximo de 9 plantas femeninas en etapa de floración.</p>
                            <p className="mb-2">La ONG se compromete a reportar bimestralmente a través de la interfaz Traze Scanner el estado fonológico de la planta, asegurando que la trazabilidad sea transparente y auditable por el Ministerio de Salud / INASE.</p>
                            <p>Esta firma electrónica tiene carácter de declaración jurada vinculante conforme a las actualizaciones 3132/24.</p>
                        </div>
                        
                        <div className="flex gap-4 items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <Fingerprint className="w-8 h-8 text-blue-500" />
                            <div>
                                <p className="text-sm font-bold text-slate-800">Firma Registrada</p>
                                <p className="text-xs text-slate-500">Hash: 0x9f8c...3a1b - {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setConsentForPatient(null)}>
                                <Download className="w-4 h-4 mr-2" />
                                Generar y Descargar PDF
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>

        </div>
    );
}
