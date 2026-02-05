'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/app/components/ui/custom-dropdown';
import { 
    Search, Filter, ChevronRight, ChevronLeft, MoreHorizontal, 
    ArrowUpDown, Sprout, AlertCircle, FileText, QrCode, Plus
} from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { plantStageColors } from '@/app/lib/constants';
import { getPlants, createPlant, Plant } from '@/app/lib/storage';

export default function PlantsPage() {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const itemsPerPage = 10;
    
    // Form State
    const [newPlant, setNewPlant] = useState({ strain: '', location: '', patient: '' });

    useEffect(() => {
        setPlants(getPlants());
    }, []);

    const filteredPlants = plants.filter(p => 
        p.tag.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.strain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
    const displayedPlants = filteredPlants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleCreate = () => {
         // Create single plant for demo
         const created = createPlant({
             strain: newPlant.strain || 'Unknown Genetic',
             stage: 'vegetative',
             location: newPlant.location || 'Sala A',
             patient: newPlant.patient || 'Sin Asignar',
         });
         
         setPlants([created, ...plants]);
         setNewPlant({ strain: '', location: '', patient: '' });
         setIsCreateOpen(false);
    }

    return (
         <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div>
                     <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventario de Plantas</h1>
                     <p className="text-slate-500">Listado maestro de todos los individuos vegetales activos.</p>
                 </div>
                 <Button 
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-500/20"
                >
                    <Plus className="mr-2 h-4 w-4" /> Registrar Planta
                </Button>
            </div>

            {/* Controls */}
            <Card className="border-slate-100 shadow-sm sticky top-4 z-20">
                <CardContent className="p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input 
                                placeholder="Buscar por Tag, Genética..." 
                                className="pl-10 bg-slate-50 border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {/* Filter Pills */}
                    <div className="flex gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar">
                         <Button variant="outline" size="sm" className="bg-slate-50 border-slate-200 text-slate-600 whitespace-nowrap">
                            <Filter className="mr-2 h-3 w-3" /> Estado
                        </Button>
                        <Button variant="outline" size="sm" className="bg-slate-50 border-slate-200 text-slate-600 whitespace-nowrap">
                            <Sprout className="mr-2 h-3 w-3" /> Genética
                        </Button>
                         <Button variant="outline" size="sm" className="bg-slate-50 border-slate-200 text-slate-600 whitespace-nowrap">
                            <AlertCircle className="mr-2 h-3 w-3" /> Salud Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card className="border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 font-bold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 cursor-pointer hover:bg-slate-100 transition-colors">TAG ID <ArrowUpDown size={12} className="inline ml-1" /></th>
                                <th className="px-6 py-4">Genética</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Ubicación</th>
                                <th className="px-6 py-4">Paciente</th>
                                <th className="px-6 py-4">Salud</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 bg-white">
                            {displayedPlants.map((plant) => (
                                <tr key={plant.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4 font-mono font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                        <Link href={`/dashboard/plants/${plant.id}`} className="hover:underline">
                                            {plant.tag}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-700">{plant.strain}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-2 w-2 rounded-full", plantStageColors[plant.stage])} />
                                            <span className="capitalize text-slate-600 font-medium">{plant.stage}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{plant.location}</td>
                                    <td className="px-6 py-4">
                                        {plant.patient === 'Sin Asignar' ? (
                                            <Badge variant="outline" className="text-slate-400 border-slate-200 font-normal">Sin Asignar</Badge>
                                        ) : (
                                            <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-md">{plant.patient}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {plant.health === 'healthy' ? (
                                            <span className="text-emerald-600 font-bold text-[10px] uppercase bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">Saludable</span>
                                        ) : (
                                            <span className="text-red-500 font-bold text-[10px] uppercase bg-red-50 px-2 py-1 rounded-full border border-red-100 flex items-center w-fit gap-1">
                                                <AlertCircle size={10} /> Revisar
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Dropdown 
                                            trigger={
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                                    <MoreHorizontal size={16} />
                                                </Button>
                                            }
                                        >
                                            <Link href={`/dashboard/plants/${plant.id}`}>
                                                <DropdownItem><FileText size={16}/> Ver Ficha</DropdownItem>
                                            </Link>
                                            <DropdownItem><QrCode size={16}/> Imprimir QR</DropdownItem>
                                            <DropdownSeparator />
                                            <DropdownItem destructive><AlertCircle size={16}/> Reportar Problema</DropdownItem>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Mostrando <span className="font-bold text-slate-900">{displayedPlants.length}</span> de <span className="font-bold text-slate-900">{filteredPlants.length}</span> plantas</p>
                    <div className="flex gap-2">
                        {/* ... Pagination buttons ... */}
                        <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                         <div className="flex items-center justify-center px-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-md">
                            {currentPage}
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="h-8 w-8 p-0"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </Card>

             {/* Create Plant Modal */}
             <Dialog 
                isOpen={isCreateOpen} 
                onClose={() => setIsCreateOpen(false)} 
                title="Registrar Nueva Planta" 
                description="Generar etiqueta de trazabilidad única para un nuevo individuo."
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Genética / Variedad</label>
                        <Input 
                            placeholder="Ej. Gelato #33" 
                            value={newPlant.strain}
                            onChange={(e) => setNewPlant({...newPlant, strain: e.target.value})}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Ubicación</label>
                         <Input 
                            placeholder="Ej. Sala B - Cama 1" 
                            value={newPlant.location}
                            onChange={(e) => setNewPlant({...newPlant, location: e.target.value})}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 block">Asignar a Paciente (Opcional)</label>
                        <Input 
                            placeholder="Buscar paciente..."
                            value={newPlant.patient}
                            onChange={(e) => setNewPlant({...newPlant, patient: e.target.value})}
                        />
                    </div>
                    <Button 
                        onClick={handleCreate} 
                        className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold"
                        disabled={!newPlant.strain.trim()}
                    >
                        <Sprout className="mr-2 h-4 w-4" /> Registrar e Imprimir QR
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}
