'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/app/components/ui/custom-dropdown';
import { Search, Plus, Filter, MoreVertical, Edit, Trash, Eye, FileText, User } from 'lucide-react';
import { getPatients, createPatient, Patient } from '@/app/lib/storage';

// Avatar component placeholder if not imported yet
function Avatar({ src, alt, fallback }: { src?: string, alt: string, fallback: string }) {
    return (
        <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
            {src ? (
                 /* eslint-disable-next-line @next/next/no-img-element */
                <img src={src} alt={alt} className="h-full w-full object-cover" />
            ) : (
                <span className="font-bold text-slate-500 text-sm">{fallback}</span>
            )}
        </div>
    )
}

export default function PatientsPage() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    
    // Form State
    const [newPatientName, setNewPatientName] = useState('');

    // Load Data
    useEffect(() => {
        setPatients(getPatients());
    }, []);

    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = () => {
        if (!newPatientName.trim()) return;
        
        const newPatient = createPatient({
            name: newPatientName,
            status: 'active',
            reprocann: 'PENDING',
            plantsCount: 0,
            joinedDate: new Date().toISOString().split('T')[0]
        });

        setPatients([newPatient, ...patients]);
        setNewPatientName('');
        setIsCreateOpen(false);
    };

    const toggleSelectAll = () => {
        if (selectedPatients.length === filteredPatients.length) {
            setSelectedPatients([]);
        } else {
            setSelectedPatients(filteredPatients.map(p => p.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedPatients.includes(id)) {
            setSelectedPatients(selectedPatients.filter(pid => pid !== id));
        } else {
            setSelectedPatients([...selectedPatients, id]);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pacientes</h1>
                    <p className="text-slate-500">Gestión de usuarios medicinales y sus cultivos asignados.</p>
                </div>
                <Button 
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/20"
                >
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Paciente
                </Button>
            </div>

            <Card className="border-slate-100 shadow-sm overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-100 pb-4">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                         <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input 
                                placeholder="Buscar por nombre, DNI o ID..." 
                                className="pl-10 bg-slate-50 border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="border-slate-200 text-slate-600">
                                <Filter className="mr-2 h-4 w-4" /> Filtros
                            </Button>
                            {selectedPatients.length > 0 && (
                                <Button variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-100">
                                    <Trash className="mr-2 h-4 w-4" /> Eliminar ({selectedPatients.length})
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 font-bold">
                            <tr>
                                <th className="p-4 w-4">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                        checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-3">Paciente</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">ID / Reprocann</th>
                                <th className="px-6 py-3">Plantas</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 bg-white">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4">
                                        <input 
                                            type="checkbox" 
                                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                            checked={selectedPatients.includes(patient.id)}
                                            onChange={() => toggleSelect(patient.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/dashboard/patients/${patient.id}`} className="flex items-center gap-3">
                                            <Avatar 
                                                src={`https://i.pravatar.cc/150?u=${patient.id}`} 
                                                alt={patient.name} 
                                                fallback={patient.name.substring(0,2).toUpperCase()} 
                                            />
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{patient.name}</div>
                                                <div className="text-xs text-slate-500">Alta: 12/03/2023</div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={patient.status === 'active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500'}>
                                            {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">
                                        {patient.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-slate-900">{patient.plants ? patient.plants.length : 0}</span>
                                            <span className="text-slate-400 text-xs">/ 9</span>
                                        </div>
                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${((patient.plants ? patient.plants.length : 0) / 9) * 100}%` }}></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Dropdown 
                                            trigger={
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            }
                                        >
                                            <Link href={`/dashboard/patients/${patient.id}`}>
                                                <DropdownItem><Eye size={16}/> Ver Perfil</DropdownItem>
                                            </Link>
                                            <DropdownItem><Edit size={16}/> Editar Datos</DropdownItem>
                                            <DropdownItem><FileText size={16}/> Descargar Ficha</DropdownItem>
                                            <DropdownSeparator />
                                            <DropdownItem destructive><Trash size={16}/> Dar de Baja</DropdownItem>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Create Patient Modal */}
            <Dialog 
                isOpen={isCreateOpen} 
                onClose={() => setIsCreateOpen(false)} 
                title="Nuevo Paciente" 
                description="Ingrese los datos básicos para dar de alta al paciente."
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Nombre Completo</label>
                        <Input 
                            placeholder="Ej. Juan Perez" 
                            value={newPatientName}
                            onChange={(e) => setNewPatientName(e.target.value)}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">DNI / Pasaporte</label>
                        <Input placeholder="Ej. 30123456" />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">N° REPROCANN</label>
                        <Input placeholder="Ej. 12345" />
                    </div>
                    <Button 
                        onClick={handleCreate} 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold"
                        disabled={!newPatientName.trim()}
                    >
                        <User className="mr-2 h-4 w-4" /> Crear Paciente
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}
