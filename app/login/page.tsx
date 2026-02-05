'use client';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ArrowLeft, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
        {/* Left Side - Visual */}
        <div className="hidden md:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603909223429-69bb7101f420?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20 filter grayscale"></div>
             <div className="relative z-10 p-12 text-white max-w-lg">
                 <div className="h-16 w-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-3xl font-black mb-8 shadow-2xl shadow-emerald-900/50">T</div>
                 <h1 className="text-5xl font-black tracking-tight mb-6">El Sistema Operativo del Cannabis.</h1>
                 <p className="text-xl text-slate-400 leading-relaxed">
                     Gestión integral, cumplimiento legal automatizado y trazabilidad farmacéutica para ONGs que se toman en serio su misión.
                 </p>
             </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 md:bg-white">
            <div className="w-full max-w-md space-y-8">
                <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-emerald-600 mb-8 transition-colors group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </Link>

                <div className="text-center md:text-left mb-8">
                     <Link href="/" className="inline-block md:hidden mb-6">
                        <div className="h-12 w-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl">T</div>
                     </Link>
                     <h2 className="text-3xl font-black text-slate-900">Bienvenido</h2>
                     <p className="text-slate-500 mt-2">Ingrese sus credenciales para acceder al panel.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                     <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Email Corporativo</label>
                         <Input 
                            type="email" 
                            placeholder="usuario@ong.com.ar" 
                            className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                            defaultValue="admin@traze.app"
                        />
                     </div>
                     <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700">Contraseña</label>
                         <Input 
                            type="password" 
                            placeholder="••••••••" 
                            className="h-12 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                            defaultValue="password"
                        />
                     </div>
                     
                     <div className="flex items-center justify-between">
                         <label className="flex items-center gap-2 text-sm text-slate-600">
                             <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                             Recordarme
                         </label>
                         <a href="#" className="text-sm font-bold text-emerald-600 hover:underline">¿Olvidó su clave?</a>
                     </div>

                     <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/10 mt-6"
                     >
                        {isLoading ? 'Ingresando...' : 'Iniciar Sesión Admin'}
                     </Button>

                     <Link href="/portal/dashboard" className="w-full block">
                         <Button 
                            type="button" 
                            variant="outline"
                            className="w-full h-12 text-lg font-bold border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl mt-4"
                         >
                            <User className="mr-2" size={18} /> Soy Paciente (Portal)
                         </Button>
                     </Link>
                </form>

                <div className="pt-8 text-center">
                    <p className="text-sm text-slate-400">
                        ¿No tiene cuenta? <Link href="/" className="font-bold text-slate-900 hover:underline">Solicite una Demo</Link>
                    </p>
                </div>
                
                <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
                    <Lock size={12} /> Despliegue Seguro SSL
                </div>
            </div>
        </div>
    </div>
  );
}
