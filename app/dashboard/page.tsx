'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Users, Sprout, AlertTriangle, TrendingUp, DollarSign, Activity, Calendar, Plus, Trash2 } from 'lucide-react';
import { MOCK_ORG, MOCK_LOGS } from '@/app/lib/constants';
import { cn } from '@/app/lib/utils';
import { patients, plants, lots } from '@/app/data/mock-db';
import { GlassCard } from '@/app/components/ui/glass-card';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

// Stat Card Component
const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    color = "emerald" 
}: { 
    title: string, 
    value: string, 
    icon: any, 
    trend?: string, 
    color?: "emerald" | "blue" | "purple" | "amber" 
}) => {
    const colorStyles = {
        emerald: "bg-pastel-green-50 text-pastel-green-700 border-pastel-green-200",
        blue: "bg-sand-gold-50 text-sand-gold-700 border-sand-gold-200",
        purple: "bg-card text-foreground border-border",
        amber: "bg-orange-50 text-orange-700 border-orange-200",
    };

    return (
        <Card className="rounded-[2rem] border-border shadow-md shadow-sand-gold-900/5 hover:shadow-lg transition-all duration-400 group bg-card">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center border", colorStyles[color])}>
                        <Icon size={24} strokeWidth={1.5} />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-light font-title text-foreground">{value}</span>
                        {trend && (
                            <span className="text-xs font-medium text-pastel-green-700 flex items-center bg-pastel-green-50/50 px-2 py-0.5 rounded-full border border-pastel-green-200">
                                <TrendingUp size={10} className="mr-1" /> {trend}
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
      { id: 1, task: 'Riego Sala B', time: '14:00', urgent: true, completed: false },
      { id: 2, task: 'Verificar pH Tanque 2', time: '15:30', urgent: false, completed: false },
      { id: 3, task: 'Carga de Datos Reprocann', time: 'Mañana', urgent: false, completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const activePatientsCount = patients.filter(p => p.status === 'ACTIVE').length;
  const maxPatients = 150; // Res 3132/24 limit
  const patientPercentage = Math.round((activePatientsCount / maxPatients) * 100);
  
  const floweringPlantsCount = plants.filter(p => p.currentStage === 'FLOWERING').length;
  const maxPlants = maxPatients * 9;
  const plantPercentage = Math.round((floweringPlantsCount / maxPlants) * 100) || 5;

  const complianceAlerts = patients.filter(p => p.assignedPlantsCount >= 9).length;
  const activeLots = lots.filter(l => l.status === 'ACTIVE').length;

  const addTask = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newTask.trim()) return;
      setTasks([...tasks, { id: Date.now(), task: newTask, time: 'Ahora', urgent: false, completed: false }]);
      setNewTask('');
  };

  const removeTask = (id: number) => {
      setTasks(tasks.filter(t => t.id !== id));
  };
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Dialog 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title="Registrar Nuevo Lote"
            description="Crear un nuevo ciclo de cultivo y generar identificadores de trazabilidad."
        >
            <form className="space-y-4">
                <div>
                    <label className="text-sm font-bold text-foreground font-medium block mb-1">Nombre del Lote</label>
                    <Input placeholder="Ej. Verano 2024 - Sala A" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-bold text-foreground font-medium block mb-1">Genética</label>
                        <select className="w-full h-10 rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pastel-green-500">
                            <option>Blue Dream</option>
                            <option>OG Kush</option>
                            <option>Gorilla Glue</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-bold text-foreground font-medium block mb-1">Cantidad Plantas</label>
                        <Input type="number" placeholder="50" />
                    </div>
                </div>
                 <div>
                    <label className="text-sm font-bold text-foreground font-medium block mb-1">Ubicación Inicial</label>
                     <select className="w-full h-10 rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pastel-green-500">
                        <option>Sala A - Vegetativo</option>
                        <option>Sala B - Floración</option>
                        <option>Esquejera</option>
                    </select>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700"><strong>Nota:</strong> Se generarán automáticamente los códigos QR para cada planta individual.</p>
                </div>
                <div className="pt-2">
                    <Button type="button" className="w-full bg-pastel-green-600 hover:bg-pastel-green-700 font-bold" onClick={() => setIsModalOpen(false)}>
                        Crear Lote e Imprimir Etiquetas
                    </Button>
                </div>
            </form>
        </Dialog>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-4xl font-black font-title text-foreground tracking-tight">Panel Principal</h1>
                <p className="text-muted-foreground font-light mt-1">Bienvenido de nuevo, {MOCK_ORG.responsiblePerson}</p>
            </div>
            
            <div className="flex gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-sm">
                    <Calendar size={16} className="mr-2 text-muted-foreground" />
                    {new Date().toLocaleDateString()}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-pastel-green-100 text-sm font-medium text-pastel-green-800 border border-pastel-green-200">
                    ONG Activa
                </span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Pacientes Activos" 
                value={activePatientsCount.toString()} 
                icon={Users} 
                trend={`Límite Legal: ${maxPatients}`}
                color="blue"
            />
            <StatCard 
                title="Plantas en Floración" 
                value={floweringPlantsCount.toString()} 
                icon={Sprout} 
                trend="Monitorizado"
                color="emerald"
            />
            <StatCard 
                title="Alertas de Compliance" 
                value={complianceAlerts.toString()} 
                icon={AlertTriangle} 
                color={complianceAlerts > 0 ? "amber" : "emerald"}
            />
             <StatCard 
                title="Lotes Activos" 
                value={activeLots.toString()} 
                icon={Activity} 
                color="purple"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart / Status Area */}
            <div className="lg:col-span-2 space-y-8">
                {/* Traffic Light Compliance System */}
                <GlassCard className="bg-[#1A231F] border-white/5 text-sand-gold-50 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-black font-title text-white mb-2 tracking-tight">Semáforo de Compliance REPROCANN</h3>
                            <p className="text-[#A2B1A8] font-light text-sm">Monitoreo en tiempo real de límites legales.</p>
                        </div>
                        <div className="px-4 py-1.5 bg-pastel-green-900/40 text-pastel-green-300 border border-pastel-green-800/50 rounded-full text-xs font-medium tracking-wide mt-4 md:mt-0">
                            ESTADO: SEGURO
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Meter 1: Patients */}
                        <div className="bg-[#242F29]/60 rounded-2xl p-5 border border-white/5 shadow-inner">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-sand-gold-100">Cupo Pacientes</span>
                                <span className="text-xs font-medium text-blue-300">{patientPercentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-[#1A231F] rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-blue-400/80 rounded-full transition-all duration-1000" style={{ width: `${patientPercentage}%` }}></div>
                            </div>
                            <div className="text-xs text-[#A2B1A8] font-light">
                                {activePatientsCount} / {maxPatients} Autorizados
                            </div>
                        </div>

                         {/* Meter 2: Flowering Plants */}
                         <div className="bg-[#242F29]/60 rounded-2xl p-5 border border-white/5 shadow-inner">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-sand-gold-100">Cupo Floración Global</span>
                                <span className="text-xs font-medium text-pastel-green-300">{plantPercentage}%</span>
                            </div>
                             <div className="h-2 w-full bg-[#1A231F] rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-pastel-green-500/80 rounded-full transition-all duration-1000" style={{ width: `${plantPercentage}%` }}></div>
                            </div>
                            <div className="text-xs text-[#A2B1A8] font-light">
                                Máximo legal: {maxPlants}
                            </div>
                        </div>

                         {/* Meter 3: Stock */}
                         <div className="bg-[#242F29]/60 rounded-2xl p-5 border border-white/5 shadow-inner">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-sand-gold-100">Stock Seco</span>
                                <span className="text-xs font-medium text-sand-gold-400">Low Risk</span>
                            </div>
                             <div className="h-2 w-full bg-[#1A231F] rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-sand-gold-400/80 rounded-full w-[40%]"></div>
                            </div>
                            <div className="text-xs text-[#A2B1A8] font-light">
                                40% del límite permitido
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Recent Activity Table using standard Card */}
                <Card className="overflow-hidden">
                    <CardHeader className="bg-card border-b border-border">
                        <CardTitle className="text-xl font-title font-medium text-foreground">Actividad Reciente</CardTitle>
                        <CardDescription className="text-muted-foreground font-light">Movimientos de lotes y tareas registradas hoy.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#FDFBF7] text-muted-foreground font-medium border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 font-medium tracking-wide">Hora</th>
                                        <th className="px-6 py-4 font-medium tracking-wide">Acción</th>
                                        <th className="px-6 py-4 font-medium tracking-wide">Usuario</th>
                                        <th className="px-6 py-4 font-medium tracking-wide">Detalle</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {MOCK_LOGS.slice(0, 10).map((log) => (
                                        <tr key={log.id} className="hover:bg-sand-gold-50/50 transition-colors bg-card">
                                            <td className="px-6 py-4 text-muted-foreground font-light text-xs">{log.timestamp}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
                                                    log.type === 'move' ? 'bg-sand-gold-50 text-sand-gold-700 border-sand-gold-200' :
                                                    log.type === 'water' ? 'bg-pastel-green-50 text-pastel-green-700 border-pastel-green-200' :
                                                    log.type === 'harvest' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                    'bg-gray-50 text-gray-700 border-gray-200'
                                                )}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-foreground">{log.user}</td>
                                            <td className="px-6 py-4 text-muted-foreground font-light">{log.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Quick Actions & Notifications */}
            <div className="space-y-6">
                <Card className="bg-pastel-green-700 text-white border-none shadow-xl shadow-pastel-green-900/10">
                     <CardContent className="p-8">
                        <Sprout className="h-12 w-12 text-pastel-green-100 mb-6" strokeWidth={1.5} />
                        <h3 className="text-2xl font-title font-bold mb-2">Nuevo Cultivo</h3>
                        <p className="text-pastel-green-100/80 font-light text-sm mb-8 leading-relaxed">Inicie un nuevo lote de producción o registre esquejes en su sistema de trazabilidad.</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium py-3.5 rounded-full hover:bg-white/20 transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            <Plus size={18} /> Registrar Lote
                        </button>
                     </CardContent>
                </Card>

                 <Card className="border-border shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-title font-medium flex justify-between items-center text-foreground">
                            Tareas Pendientes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={addTask} className="flex gap-2 mb-2">
                            <Input 
                                placeholder="Nueva tarea..." 
                                value={newTask} 
                                onChange={(e) => setNewTask(e.target.value)}
                                className="h-10 text-sm bg-sand-gold-50/50"
                            />
                            <Button size="icon" type="submit" variant="secondary" className="h-10 w-10 flex-shrink-0">
                                <Plus size={16} />
                            </Button>
                        </form>

                        <div className="space-y-3">
                        {tasks.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border group hover:border-pastel-green-200 transition-colors">
                                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", item.urgent ? "bg-red-400 animate-pulse" : "bg-pastel-green-400")}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{item.task}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                                </div>
                                <Button 
                                    onClick={() => removeTask(item.id)}
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-muted-foreground hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all rounded-full"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
