import { SiteHeader } from '@/app/components/Layout/SiteHeader';
import { SiteFooter } from '@/app/components/Layout/SiteFooter';
import { Button } from '@/app/components/ui/button';
import { BentoGrid, BentoGridItem } from '@/app/components/ui/bento-grid';
import { GlassCard } from '@/app/components/ui/glass-card';
import { HeroLogoBg } from '@/app/components/ui/hero-logo-bg';
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
    <div className="min-h-screen bg-background overflow-x-hidden font-sans">
      <SiteHeader />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
             {/* Subtle Organic Background */}
             <div className="absolute inset-0 bg-background">
                {/* Soft grain/texture feel with radial gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sand-gold-100/40 via-background to-background"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pastel-green-100/30 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
                <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-sand-gold-200/20 rounded-full blur-[120px] -z-10 mix-blend-multiply"></div>
             </div>
             
             {/* Giant Animated SVG Logo Background */}
             <HeroLogoBg />
            
             <div className="container mx-auto px-6 text-center lg:text-left relative z-10 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-sand-gold-200 text-pastel-green-800 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:scale-105 transition-transform cursor-default">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pastel-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-pastel-green-500"></span>
                        </span>
                        <span className="text-sm font-medium tracking-wide">Resolución 3132/2024 Ready</span>
                    </div>
                    
                    {/* Headline - Outfit font for elegant headers */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-title tracking-tight text-foreground mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 leading-[1.05]">
                        El Sistema<br/> Operativo<br/>
                        <span className="text-pastel-green-600">para ONGs.</span>
                    </h1>
                    
                    {/* Subheadline */}
                    <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                        Blindaje legal automatizado, trazabilidad farmacéutica y gestión integral. <br className="hidden md:block"/>
                        La plataforma que profesionaliza el cultivo solidario en Argentina.
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                        <Link href="/dashboard">
                            <Button className="h-14 px-8 text-lg rounded-full bg-pastel-green-600 hover:bg-pastel-green-700 text-white font-medium shadow-lg shadow-pastel-green-900/10 w-full sm:w-auto transition-all hover:scale-105">
                                Comenzar Gratis <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" className="h-14 px-8 text-lg rounded-full border-sand-gold-300 bg-white/50 backdrop-blur-sm hover:bg-sand-gold-50 text-foreground font-medium w-full sm:w-auto transition-all hover:scale-105">
                                Ver Tour
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Dashboard Mockup - Right Side */}
                <div className="lg:w-1/2 mt-20 lg:mt-0 w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500 perspective-1000 relative z-10">
                     <div className="rounded-[2.5rem] overflow-hidden bg-card border border-border/50 shadow-2xl shadow-sand-gold-900/5 ring-1 ring-black/5 transform rotate-x-2 transition-all hover:rotate-0 duration-700 backdrop-blur-xl bg-white/40">
                        <div className="flex items-center gap-2 px-6 py-4 bg-white/50 border-b border-border/50">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-sand-gold-300"></div>
                                <div className="w-3 h-3 rounded-full bg-sand-gold-300"></div>
                                <div className="w-3 h-3 rounded-full bg-pastel-green-300"></div>
                            </div>
                            <div className="text-xs text-muted-foreground font-medium ml-4 tracking-wider uppercase">dashboard.traze.app</div>
                        </div>
                        <div className="aspect-[4/3] bg-white/60 relative flex items-center justify-center backdrop-blur-sm">
                             <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-8">
                                <Cpu size={48} strokeWidth={1} className="mb-4 text-pastel-green-400" />
                                <span className="font-light text-xl tracking-wide text-center">Interactive Dashboard Preview</span>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* BENTO GRID FEATURES */}
        <section id="features" className="py-32 bg-white relative z-10 border-t border-sand-gold-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-xs font-bold tracking-[0.2em] text-pastel-green-600 uppercase mb-4">Características Principales</h2>
                    <h3 className="text-4xl md:text-5xl font-black font-title text-foreground mb-6">Todo lo que su ONG necesita</h3>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed">
                        Traze reemplaza múltiples herramientas genéricas para unificar toda su operación en un entorno diseñado específicamente para el cannabis medicinal.
                    </p>
                </div>

                <BentoGrid>
                    <BentoGridItem
                        title="Compliance IA"
                        description="Nuestro motor bloquea automáticamente operaciones que violan la Resolucion 3132/2024 en tiempo real."
                        header={<div className="flex flex-1 w-full h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-sand-gold-50 to-sand-gold-100 border border-sand-gold-200 items-center justify-center text-sand-gold-600"><ShieldCheck strokeWidth={1} size={48} /></div>}
                        className="md:col-span-1 border-sand-gold-100 bg-white shadow-sm hover:shadow-md"
                        icon={<ShieldCheck className="h-4 w-4 text-pastel-green-600" />}
                    />
                     <BentoGridItem
                        title="Trazabilidad GS1"
                        description="Cada gramo es auditado desde su origen genético hasta la entrega al paciente."
                        header={<div className="flex flex-1 w-full h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-pastel-green-50 to-pastel-green-100 border border-pastel-green-200 items-center justify-center text-pastel-green-600"><Dna strokeWidth={1} size={48} /></div>}
                        className="md:col-span-1 border-sand-gold-100 bg-white shadow-sm hover:shadow-md"
                        icon={<Dna className="h-4 w-4 text-pastel-green-600" />}
                    />
                    <BentoGridItem
                        title="Semáforo REPROCANN"
                        description="Visualice sus cupos de stock y pacientes al instante. Prevé infracciones antes de que ocurran."
                        header={<div className="flex flex-1 w-full h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-sand-gold-100 to-sand-gold-200 border border-sand-gold-300 items-center justify-center text-sand-gold-700"><AlertTriangle strokeWidth={1} size={48} /></div>}
                        className="md:col-span-1 border-sand-gold-100 bg-white shadow-sm hover:shadow-md"
                        icon={<AlertTriangle className="h-4 w-4 text-pastel-green-600" />}
                    />
                    <BentoGridItem
                        title="Reportes Automáticos"
                        description="Generación de PDFs precisos y estandarizados para presentación inmediata ante el Ministerio de Salud, liberando horas de carga administrativa."
                        header={<div className="flex flex-1 w-full h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-card to-background border border-border items-center justify-center text-muted-foreground"><Brain strokeWidth={1} size={48} /></div>}
                        className="md:col-span-2 border-sand-gold-100 bg-white shadow-sm hover:shadow-md"
                        icon={<Brain className="h-4 w-4 text-pastel-green-600" />}
                    />
                     <BentoGridItem
                        title="IoT Ready"
                        description="Integración directa con sensores climáticos para garantizar la calidad del entorno de cultivo."
                        header={<div className="flex flex-1 w-full h-full min-h-[8rem] rounded-2xl bg-gradient-to-br from-pastel-green-100 to-pastel-green-200 border border-pastel-green-300 items-center justify-center text-pastel-green-700"><Cpu strokeWidth={1} size={48} /></div>}
                        className="md:col-span-1 border-sand-gold-100 bg-white shadow-sm hover:shadow-md"
                        icon={<Cpu className="h-4 w-4 text-pastel-green-600" />}
                    />
                </BentoGrid>
            </div>
        </section>

        {/* ORGANIC PATIENT SECTION - Replacing the dark slate with deeper organic tones */}
        <section id="pacientes" className="py-32 bg-[#1A231E] relative overflow-hidden text-sand-gold-50">
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pastel-green-900/40 rounded-full blur-[128px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-gold-900/30 rounded-full blur-[96px] pointer-events-none"></div>

             <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sand-gold-300 text-xs font-medium tracking-wide mb-8">
                            <UserCircle size={14} /> Portal del Paciente
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-title mb-6 leading-[1.1]">
                            Transparencia<br/>Total <span className="font-light italic text-sand-gold-200">para sus Socios</span>
                        </h2>
                        <p className="text-[#A2B1A8] text-lg mb-10 font-light leading-relaxed">
                            Eleve el estándar de su asociación. Ofrezca a sus pacientes un portal privado y sofisticado para monitorear su tratamiento, ver análisis de laboratorio y validar la trazabilidad de su cultivo.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <GlassCard className="bg-[#242F29]/80 border-white/5 hover:bg-[#2A3630]/90 transition-all duration-300">
                                <QrCode strokeWidth={1} className="h-8 w-8 text-pastel-green-400 mb-4" />
                                <h4 className="font-title font-medium text-lg mb-1 text-sand-gold-100">Escaneo QR</h4>
                                <p className="text-sm font-light text-[#A2B1A8]">Historial completo del lote en origen.</p>
                            </GlassCard>
                            <GlassCard className="bg-[#242F29]/80 border-white/5 hover:bg-[#2A3630]/90 transition-all duration-300">
                                <FlaskConical strokeWidth={1} className="h-8 w-8 text-sand-gold-400 mb-4" />
                                <h4 className="font-title font-medium text-lg mb-1 text-sand-gold-100">Laboratorio</h4>
                                <p className="text-sm font-light text-[#A2B1A8]">Certificados de análisis químicos detallados.</p>
                            </GlassCard>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2">
                        {/* Simulating a Mobile App - Aesthetic Overhaul */}
                        <div className="mx-auto w-[320px] h-[640px] bg-[#121815] rounded-[3rem] border-[10px] border-[#242F29] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-36 bg-[#242F29] rounded-b-3xl z-20"></div>
                            {/* Screen Content */}
                            <div className="h-full w-full bg-[#1A231E] p-6 pt-14 overflow-hidden flex flex-col relative">
                                {/* Subtle internal glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-green-500/10 blur-[50px] rounded-full"></div>
                                
                                <div className="flex justify-between items-center mb-8 relative z-10">
                                    <div className="w-10 h-10 bg-[#242F29] rounded-full border border-white/5 flex items-center justify-center">
                                       <div className="w-4 h-4 rounded-sm bg-sand-gold-400/20 mix-blend-screen"></div>
                                    </div>
                                    <div className="w-10 h-10 bg-pastel-green-800 rounded-full flex items-center justify-center text-sm font-medium text-pastel-green-100 border border-pastel-green-700/50">
                                        JP
                                    </div>
                                </div>
                                <div className="text-sand-gold-50 text-3xl font-title font-medium mb-1 tracking-tight">Hola, Juan</div>
                                <div className="text-[#A2B1A8] font-light text-sm mb-10">Tu cultivo se encuentra en fase óptima.</div>
                                
                                <div className="bg-[#242F29]/60 backdrop-blur-sm border border-white/5 p-5 rounded-[2rem] mb-6 backdrop-blur-md relative overflow-hidden">
                                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pastel-green-400 to-sand-gold-400 opacity-20"></div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sand-gold-100 font-medium">Aceite CBD Full Spec</span>
                                        <div className="px-2 py-0.5 rounded-full bg-pastel-green-900/50 text-pastel-green-300 text-xs font-medium border border-pastel-green-800/50">
                                            Floración
                                        </div>
                                    </div>
                                    {/* Progress */}
                                    <div className="w-full bg-[#18201B] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-sand-gold-400 w-[65%] h-full rounded-full relative">
                                            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-[#A2B1A8] flex justify-between">
                                        <span>Semana 5 de 8</span>
                                        <span>65% completado</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                    <div className="bg-[#242F29]/40 border border-white/5 p-4 rounded-[1.5rem] h-28 flex flex-col justify-between">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                            <QrCode size={14} className="text-sand-gold-300"/>
                                        </div>
                                        <div className="text-sm text-sand-gold-100 font-light">Trazabilidad</div>
                                    </div>
                                    <div className="bg-[#242F29]/40 border border-white/5 p-4 rounded-[1.5rem] h-28 flex flex-col justify-between">
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                            <Lock size={14} className="text-pastel-green-300"/>
                                        </div>
                                        <div className="text-sm text-sand-gold-100 font-light">Credenciales</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* TRUST / STATS SECTION */}
        <section className="py-24 bg-background border-b border-sand-gold-100">
             <div className="container mx-auto px-6">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left md:divide-x divide-sand-gold-200/50">
                     <div className="md:px-8">
                         <div className="text-5xl font-light font-title text-foreground mb-3 opacity-90"><span className="text-pastel-green-600 font-medium">+</span>50</div>
                         <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">ONGs Activas</div>
                     </div>
                     <div className="md:px-8">
                         <div className="text-5xl font-light font-title text-foreground mb-3 opacity-90"><span className="text-sand-gold-500 font-medium">12</span>k</div>
                         <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Pacientes</div>
                     </div>
                     <div className="md:px-8">
                         <div className="text-5xl font-light font-title text-foreground mb-3 opacity-90">100<span className="text-pastel-green-600 font-medium">%</span></div>
                         <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Compliance Legal</div>
                     </div>
                     <div className="md:px-8">
                         <div className="text-5xl font-light font-title text-foreground mb-3 opacity-90">24/7</div>
                         <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Soporte Técnico</div>
                     </div>
                 </div>
             </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto bg-card rounded-[3rem] p-12 md:p-24 text-center border border-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-sand-gold-100/50 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-pastel-green-100/40 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3"></div>
                    
                    <h2 className="text-4xl md:text-6xl font-black font-title text-foreground mb-6 relative z-10 leading-[1.1]">
                        Comience hoy mismo.
                    </h2>
                    <p className="text-muted-foreground text-xl font-light mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
                        Únase a la red de organizaciones que están liderando la profesionalización del cannabis medicinal en Argentina.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                         <Link href="/dashboard">
                            <Button className="h-16 px-10 text-xl rounded-full bg-foreground hover:bg-[#2D3A33] text-background font-medium w-full sm:w-auto transition-all shadow-xl shadow-foreground/5 hover:scale-105">
                                Crear Cuenta Gratis
                            </Button>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-4 sm:mt-0 font-medium tracking-wide">
                            <Lock size={14} className="inline mr-1 opacity-70" /> Sin tarjeta de crédito
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
