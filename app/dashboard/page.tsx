'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Users, Sprout, AlertTriangle, TrendingUp, DollarSign, Activity, Calendar, Plus, Trash2 } from 'lucide-react';
import { MOCK_ORG, MOCK_LOGS } from '@/app/lib/constants';
import { cn } from '@/app/lib/utils';
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
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
    };

    return (
        <Card className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center border", colorStyles[color])}>
                        <Icon size={24} />
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-slate-500">{title}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">{value}</span>
                        {trend && (
                            <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">
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

  const patientPercentage = Math.round((MOCK_ORG.currentPatients / MOCK_ORG.maxPatients) * 100);

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
                    <label className="text-sm font-bold text-slate-700 block mb-1">Nombre del Lote</label>
                    <Input placeholder="Ej. Verano 2024 - Sala A" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-bold text-slate-700 block mb-1">Genética</label>
                        <select className="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option>Blue Dream</option>
                            <option>OG Kush</option>
                            <option>Gorilla Glue</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-bold text-slate-700 block mb-1">Cantidad Plantas</label>
                        <Input type="number" placeholder="50" />
                    </div>
                </div>
                 <div>
                    <label className="text-sm font-bold text-slate-700 block mb-1">Ubicación Inicial</label>
                     <select className="w-full h-10 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option>Sala A - Vegetativo</option>
                        <option>Sala B - Floración</option>
                        <option>Esquejera</option>
                    </select>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700"><strong>Nota:</strong> Se generarán automáticamente los códigos QR para cada planta individual.</p>
                </div>
                <div className="pt-2">
                    <Button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold" onClick={() => setIsModalOpen(false)}>
                        Crear Lote e Imprimir Etiquetas
                    </Button>
                </div>
            </form>
        </Dialog>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Panel Principal</h1>
                <p className="text-slate-500">Bienvenido de nuevo, {MOCK_ORG.responsiblePerson}</p>
            </div>
            
            <div className="flex gap-2">
                <span className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                    <Calendar size={16} className="mr-2 text-slate-400" />
                    {new Date().toLocaleDateString()}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-500/20">
                    ONG Activa
                </span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="Pacientes Activos" 
                value={MOCK_ORG.currentPatients.toString()} 
                icon={Users} 
                trend="+12% este mes"
                color="blue"
            />
            <StatCard 
                title="Plantas en Floración" 
                value="342" 
                icon={Sprout} 
                trend="Capacidad al 85%"
                color="emerald"
            />
            <StatCard 
                title="Alertas de Compliance" 
                value="0" 
                icon={AlertTriangle} 
                color="amber"
            />
             <StatCard 
                title="Cosecha Estimada" 
                value="24.5 kg" 
                icon={Activity} 
                color="purple"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart / Status Area */}
            <div className="lg:col-span-2 space-y-8">
                {/* Traffic Light Compliance System */}
                <GlassCard className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-800 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Semáforo de Compliance REPROCANN</h3>
                            <p className="text-slate-400 text-sm">Monitoreo en tiempo real de límites legales.</p>
                        </div>
                        <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider mt-4 md:mt-0">
                            Estado: Seguro
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Meter 1: Patients */}
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-300">Cupo Pacientes</span>
                                <span className="text-xs font-bold text-blue-400">{patientPercentage}%</span>
                            </div>
                            <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${patientPercentage}%` }}></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                                {MOCK_ORG.currentPatients} / {MOCK_ORG.maxPatients} Autorizados
                            </div>
                        </div>

                         {/* Meter 2: Flowering Plants */}
                         <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-300">Plantas Floración</span>
                                <span className="text-xs font-bold text-emerald-400">85%</span>
                            </div>
                             <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-emerald-500 rounded-full w-[85%]"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                                Limitado por m2 de sala
                            </div>
                        </div>

                         {/* Meter 3: Stock */}
                         <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-slate-300">Stock Seco</span>
                                <span className="text-xs font-bold text-amber-400">Low Risk</span>
                            </div>
                             <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-amber-500 rounded-full w-[40%]"></div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                                40% del límite permitido
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Recent Activity Table using standard Card */}
                <Card className="overflow-hidden border-slate-100">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                        <CardTitle className="text-lg font-bold text-slate-800">Actividad Reciente en Sala</CardTitle>
                        <CardDescription>Movimientos de lotes y tareas registradas hoy.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white text-slate-500 font-medium border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4">Hora</th>
                                        <th className="px-6 py-4">Acción</th>
                                        <th className="px-6 py-4">Usuario</th>
                                        <th className="px-6 py-4">Detalle</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {MOCK_LOGS.slice(0, 5).map((log) => (
                                        <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-500 font-mono text-xs">{log.timestamp}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                                    log.type === 'move' ? 'bg-blue-50 text-blue-700' :
                                                    log.type === 'water' ? 'bg-cyan-50 text-cyan-700' :
                                                    log.type === 'harvest' ? 'bg-amber-50 text-amber-700' :
                                                    'bg-slate-100 text-slate-700'
                                                )}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{log.user}</td>
                                            <td className="px-6 py-4 text-slate-500">{log.details}</td>
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
                <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-none shadow-lg shadow-emerald-500/20">
                     <CardContent className="p-6">
                        <Sprout className="h-10 w-10 text-emerald-100 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Nuevo Cultivo</h3>
                        <p className="text-emerald-100 text-sm mb-6">Inicie un nuevo lote de producción o registre esquejes.</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-white text-emerald-600 font-bold py-3 rounded-xl hover:bg-emerald-50 transition-colors shadow-sm"
                        >
                            + Registrar Lote
                        </button>
                     </CardContent>
                </Card>

                 <Card className="border-slate-100">
                    <CardHeader>
                        <CardTitle className="text-base font-bold flex justify-between items-center">
                            Tareas Pendientes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={addTask} className="flex gap-2 mb-4">
                            <Input 
                                placeholder="Nueva tarea..." 
                                value={newTask} 
                                onChange={(e) => setNewTask(e.target.value)}
                                className="h-8 text-sm"
                            />
                            <Button size="sm" type="submit" variant="ghost" className="h-8 w-8 p-0">
                                <Plus size={16} />
                            </Button>
                        </form>

                        <div className="space-y-2">
                        {tasks.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group">
                                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", item.urgent ? "bg-red-500 animate-pulse" : "bg-emerald-400")}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-700 truncate">{item.task}</p>
                                    <p className="text-xs text-slate-400">{item.time}</p>
                                </div>
                                <Button 
                                    onClick={() => removeTask(item.id)}
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
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
