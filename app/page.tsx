import { SiteHeader } from '@/app/components/Layout/SiteHeader';
import { SiteFooter } from '@/app/components/Layout/SiteFooter';
import { Button } from '@/app/components/ui/button';
import { BentoGrid, BentoGridItem } from '@/app/components/ui/bento-grid';
import { GlassCard } from '@/app/components/ui/glass-card';
import { 
    ShieldCheck, 
    Dna, 
    Brain, 
    AlertTriangle, 
    Network, 
    Cpu, 
    UserCircle, 
    QrCode, 
    FlaskConical,
    ArrowRight,
    CheckCircle2,
    Zap,
    Lock
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden font-sans">
      <SiteHeader />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
             {/* Dynamic Background */}
             <div className="absolute inset-0 bg-white">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
             </div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-emerald-100 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:scale-105 transition-transform cursor-default">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-bold text-slate-700">Resolución 3132/2024 Ready</span>
                </div>
                
                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 leading-[1.1]">
                    El Sistema Operativo para <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">ONGs de Cannabis.</span>
                </h1>
                
                {/* Subheadline */}
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                    Blindaje legal automatizado, trazabilidad farmacéutica y gestión integral. <br className="hidden md:block"/>
                    La plataforma que profesionaliza el cultivo solidario en Argentina.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    <Link href="/dashboard">
                        <Button className="h-14 px-8 text-lg rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-500/20 w-full sm:w-auto transition-all hover:scale-105">
                            Comenzar Gratis <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" className="h-14 px-8 text-lg rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold w-full sm:w-auto transition-all hover:scale-105">
                            Ver Tour
                        </Button>
                    </Link>
                </div>

                {/* Dashboard Mockup */}
                <div className="mt-20 mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500 perspective-1000">
                     <div className="rounded-2xl overflow-hidden bg-slate-900 shadow-2xl ring-1 ring-slate-900/10 transform rotate-x-2 transition-all hover:rotate-0 duration-700">
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs text-slate-400 font-mono ml-4">dashboard.traze.app</div>
                        </div>
                        <div className="aspect-[16/9] bg-slate-50 relative flex items-center justify-center">
                            {/* Placeholder for actual screenshot */}
                             <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white flex flex-col items-center justify-center text-slate-300">
                                <Cpu size={64} className="mb-4 text-emerald-200" />
                                <span className="font-bold text-lg">Interactive Dashboard Preview</span>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* BENTO GRID FEATURES */}
        <section id="features" className="py-32 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-emerald-600 uppercase mb-3">Características Principales</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Todo lo que su ONG necesita</h3>
                    <p className="max-w-2xl mx-auto text-slate-500 text-lg">
                        Traze reemplaza 5 herramientas distintas para unificar toda su operación en un solo lugar.
                    </p>
                </div>

                <BentoGrid>
                    <BentoGridItem
                        title="Compliance IA"
                        description="Nuestro motor bloquea automáticamente operaciones ilegales en tiempo real."
                        header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-emerald-50 items-center justify-center text-emerald-500"><ShieldCheck size={40} /></div>}
                        className="md:col-span-1"
                        icon={<ShieldCheck className="h-4 w-4 text-neutral-500" />}
                    />
                     <BentoGridItem
                        title="Trazabilidad GS1"
                        description="Cada gramo auditado desde la semilla hasta el paciente."
                        header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-blue-50 items-center justify-center text-blue-500"><Dna size={40} /></div>}
                        className="md:col-span-1"
                        icon={<Dna className="h-4 w-4 text-neutral-500" />}
                    />
                    <BentoGridItem
                        title="Semáforo REPROCANN"
                        description="Visualice sus cupos de stock y pacientes al instante."
                        header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-yellow-50 items-center justify-center text-yellow-500"><AlertTriangle size={40} /></div>}
                        className="md:col-span-1"
                        icon={<AlertTriangle className="h-4 w-4 text-neutral-500" />}
                    />
                    <BentoGridItem
                        title="Reportes Automáticos"
                        description="Generación de PDFs para presentación ante Ministerio de Salud."
                        header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-purple-50 items-center justify-center text-purple-500"><Brain size={40} /></div>}
                        className="md:col-span-2"
                        icon={<Brain className="h-4 w-4 text-neutral-500" />}
                    />
                     <BentoGridItem
                        title="IoT Ready"
                        description="Integración con sensores de humedad y temperatura."
                        header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-slate-100 items-center justify-center text-slate-500"><Cpu size={40} /></div>}
                        className="md:col-span-1"
                        icon={<Cpu className="h-4 w-4 text-neutral-500" />}
                    />
                </BentoGrid>
            </div>
        </section>

        {/* GLASSMORPHISM PATIENT SECTION */}
        <section id="pacientes" className="py-32 bg-slate-900 relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/30 rounded-full blur-[128px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[96px] pointer-events-none"></div>

             <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs font-bold mb-6">
                            <UserCircle size={14} /> Portal del Paciente
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Transparencia Radical para sus Socios
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Eleve el estándar de su asociación. Ofrezca a sus pacientes un portal privado para monitorear su tratamiento, ver análisis de laboratorio y validar la trazabilidad de su medicina.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <GlassCard className="hover:bg-white/20 transition-colors">
                                <QrCode className="h-8 w-8 text-emerald-400 mb-4" />
                                <h4 className="font-bold text-white mb-1">Escaneo QR</h4>
                                <p className="text-xs text-slate-300">Historial completo del lote.</p>
                            </GlassCard>
                            <GlassCard className="hover:bg-white/20 transition-colors">
                                <FlaskConical className="h-8 w-8 text-blue-400 mb-4" />
                                <h4 className="font-bold text-white mb-1">Laboratorio</h4>
                                <p className="text-xs text-slate-300">Certificados de análisis.</p>
                            </GlassCard>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2">
                        {/* Simulating a Mobile App */}
                        <div className="mx-auto w-[300px] h-[600px] bg-slate-950 rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-800 rounded-b-2xl z-20"></div>
                            {/* Screen Content */}
                            <div className="h-full w-full bg-slate-900 p-6 pt-12 overflow-hidden flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="w-8 h-8 bg-slate-800 rounded-full"></div>
                                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">JP</div>
                                </div>
                                <div className="text-white text-2xl font-bold mb-2">Hola, Juan</div>
                                <div className="text-slate-500 text-sm mb-8">Tu cultivo está saludable</div>
                                
                                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl mb-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-white text-sm font-bold">Aceite CBD Full Spec</span>
                                        <span className="text-emerald-400 text-xs">En Proceso</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 w-3/4 h-full rounded-full"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-800 p-3 rounded-xl h-24"></div>
                                    <div className="bg-slate-800 p-3 rounded-xl h-24"></div>
                                    <div className="bg-slate-800 p-3 rounded-xl h-24"></div>
                                    <div className="bg-slate-800 p-3 rounded-xl h-24"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* TRUST / STATS SECTION */}
        <section className="py-24 bg-white border-b border-slate-100">
             <div className="container mx-auto px-6">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                     <div>
                         <div className="text-4xl font-black text-slate-900 mb-2">50+</div>
                         <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">ONGs Activas</div>
                     </div>
                     <div>
                         <div className="text-4xl font-black text-slate-900 mb-2">12k</div>
                         <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pacientes</div>
                     </div>
                     <div>
                         <div className="text-4xl font-black text-slate-900 mb-2">100%</div>
                         <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Legalidad</div>
                     </div>
                     <div>
                         <div className="text-4xl font-black text-slate-900 mb-2">24/7</div>
                         <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Soporte</div>
                     </div>
                 </div>
             </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-32 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 text-center shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100 to-transparent rounded-bl-full pointer-events-none"></div>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 relative z-10">
                        Comience hoy mismo.
                    </h2>
                    <p className="text-slate-500 text-lg mb-10 max-w-lg mx-auto relative z-10">
                        Únase a la red de organizaciones que están liderando la profesionalización del cannabis en Argentina.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                         <Link href="/dashboard">
                            <Button className="h-14 px-10 text-xl rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold w-full sm:w-auto">
                                Crear Cuenta Gratis
                            </Button>
                        </Link>
                        <p className="text-xs text-slate-400 mt-4 sm:mt-0 font-medium">
                            <Lock size={12} className="inline mr-1" /> Sin tarjeta de crédito
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      
      <SiteFooter />
    </div>
  );
}
