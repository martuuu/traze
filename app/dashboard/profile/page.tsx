'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { User, Mail, Phone, Shield, PenLine } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
             <div>
                 <h1 className="text-3xl font-black text-foreground font-title tracking-tight">Mi Perfil</h1>
                 <p className="text-muted-foreground font-light">Gestione su información personal y preferencias de cuenta.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="md:col-span-1 border-border shadow-lg shadow-slate-200/50 h-fit">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 p-1 mb-6">
                            <div className="h-full w-full rounded-full bg-white border-4 border-white overflow-hidden relative">
                                {/* Placeholder Avatar */}
                                <div className="absolute inset-0 bg-sand-gold-50 flex items-center justify-center text-4xl font-black text-slate-300">
                                    MN
                                </div>
                             </div>
                        </div>
                        <h2 className="text-xl font-bold text-foreground font-title">Martin Navarro</h2>
                        <p className="text-muted-foreground font-light text-sm mb-4">Administrador General</p>
                        
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 mb-6 px-4 py-1">
                             <Shield size={12} className="mr-1" /> Super Admin
                        </Badge>
                        
                        <Button className="w-full bg-white border border-border text-foreground font-medium hover:bg-card font-bold">
                             Cambiar Foto
                        </Button>
                    </CardContent>
                </Card>

                {/* Details Form */}
                <Card className="md:col-span-2 border-border shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-bold text-foreground font-title">Información Personal</CardTitle>
                        <Button variant="ghost" size="icon" className="text-muted-foreground font-light">
                            <PenLine size={18} />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground font-medium flex items-center gap-2">
                                    <User size={16} className="text-muted-foreground font-light" /> Nombre Completo
                                </label>
                                <Input defaultValue="Martin Navarro" className="bg-card border-border" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground font-medium flex items-center gap-2">
                                    <Shield size={16} className="text-muted-foreground font-light" /> Cargo / Rol
                                </label>
                                <Input defaultValue="Admin. General" className="bg-card border-border" disabled />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground font-medium flex items-center gap-2">
                                <Mail size={16} className="text-muted-foreground font-light" /> Email Corporativo
                            </label>
                            <Input defaultValue="martin@entidad.org.ar" className="bg-card border-border" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground font-medium flex items-center gap-2">
                                <Phone size={16} className="text-muted-foreground font-light" /> Teléfono
                            </label>
                            <Input defaultValue="+54 9 11 1234 5678" className="bg-card border-border" />
                        </div>

                        <div className="pt-6 flex justify-end gap-3 border-t border-slate-50 mt-6 md:mt-12">
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-muted-foreground font-light">Cancelar</Button>
                            </Link>
                            <Button className="bg-pastel-green-600 hover:bg-pastel-green-700 font-bold px-8">
                                Guardar Cambios
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
