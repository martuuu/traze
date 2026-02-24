'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { MOCK_ORG } from '@/app/lib/constants';
import { Building2, MapPin, Scale, Users, Sprout, Save, Edit2, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/app/components/ui/glass-card';

export default function OrganizationPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [orgData, setOrgData] = useState(MOCK_ORG);

    const handleSave = () => {
        setIsEditing(false);
        // Toast success simulation would go here
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div>
                 <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Mi Organización</h1>
                 <p className="text-muted-foreground font-light">Datos legales y configuración de la entidad en REPROCANN.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main ID Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <Building2 size={240} />
                        </div>
                        
                        <div className="relative z-10 p-8 flex flex-col items-center md:flex-row md:items-start gap-8">
                            <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center text-4xl font-black text-foreground font-title shadow-xl border-4 border-slate-700/50">
                                {orgData.name.substring(0,2).toUpperCase()}
                            </div>
                            
                            <div className="flex-1 text-center md:text-left space-y-2">
                                {isEditing ? (
                                    <Input 
                                        value={orgData.name} 
                                        onChange={(e) => setOrgData({...orgData, name: e.target.value})}
                                        className="text-2xl font-bold bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                                    />
                                ) : (
                                    <h2 className="text-3xl font-black tracking-tight">{orgData.name}</h2>
                                )}
                                
                                <div className="flex flex-col md:flex-row items-center gap-4 text-slate-300 font-medium">
                                    <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                        <Scale size={14} className="text-pastel-green-400" />
                                        Licencia: {isEditing ? <input value={orgData.license} onChange={e => setOrgData({...orgData, license: e.target.value})} className="bg-transparent border-b border-white/30 w-24 focus:outline-none"/> : orgData.license}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-pastel-green-500" />
                                        REPROCANN Activo
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Footer */}
                        <div className="bg-white/5 p-6 grid grid-cols-2 gap-4 border-t border-white/10">
                            <div>
                                <p className="text-xs text-muted-foreground font-light uppercase font-bold tracking-widest mb-1">Cupo Pacientes</p>
                                <p className="text-2xl font-mono font-bold">{orgData.currentPatients} <span className="text-sm text-muted-foreground font-light">/ {orgData.maxPatients}</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-light uppercase font-bold tracking-widest mb-1">Plantas Activas</p>
                                <p className="text-2xl font-mono font-bold">843 <span className="text-sm text-muted-foreground font-light">Unidades</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Details Form */}
                    <Card className="border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Datos de Contacto y Responsabilidad</CardTitle>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-pastel-green-600 font-bold hover:bg-pastel-green-50 hover:text-pastel-green-700"
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            >
                                {isEditing ? <><Save className="mr-2 h-4 w-4" /> Guardar Cambios</> : <><Edit2 className="mr-2 h-4 w-4" /> Editar Datos</>}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-medium flex items-center gap-2">
                                        <Users size={16} className="text-muted-foreground font-light" /> Responsable Legal
                                    </label>
                                    <Input 
                                        disabled={!isEditing} 
                                        value={orgData.responsiblePerson}
                                        onChange={(e) => setOrgData({...orgData, responsiblePerson: e.target.value})}
                                        className="bg-card border-border disabled:opacity-100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground font-medium flex items-center gap-2">
                                        <MapPin size={16} className="text-muted-foreground font-light" /> Dirección de Cultivo
                                    </label>
                                    <Input 
                                        disabled={!isEditing} 
                                        value="Av. Libertador 1234, CABA, Argentina"
                                        className="bg-card border-border disabled:opacity-100"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground font-medium flex items-center gap-2">
                                    <Building2 size={16} className="text-muted-foreground font-light" /> Sede Social
                                </label>
                                <Input 
                                    disabled={!isEditing} 
                                    value="Calle Falsa 123, Piso 4, Oficina B"
                                    className="bg-card border-border disabled:opacity-100"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                     <Card className="bg-pastel-green-50 border-pastel-green-100 text-pastel-green-900">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <CheckCircle2 className="text-pastel-green-600" /> Estado Legal
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-sm font-medium">
                                <li className="flex justify-between items-center border-b border-pastel-green-100 pb-2">
                                    <span>Vencimiento REPROCANN</span>
                                    <span className="font-bold">12/10/2025</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-pastel-green-100 pb-2">
                                    <span>Habilitación Municipal</span>
                                    <span className="font-bold">VIGENTE</span>
                                </li>
                                <li className="flex justify-between items-center pb-2">
                                    <span>Seguro R. Civil</span>
                                    <span className="font-bold text-pastel-green-700">ORDEN</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                        <CardHeader>
                             <CardTitle className="text-base font-bold text-foreground font-medium">Documentación</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             <Button variant="outline" className="w-full justify-start text-muted-foreground bg-card hover:bg-white border-border">
                                 <Save className="mr-2 h-4 w-4 text-muted-foreground font-light" /> Estatuto Social.pdf
                             </Button>
                             <Button variant="outline" className="w-full justify-start text-muted-foreground bg-card hover:bg-white border-border">
                                 <Save className="mr-2 h-4 w-4 text-muted-foreground font-light" /> Habilitación_2024.pdf
                             </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
