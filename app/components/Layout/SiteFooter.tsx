import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-20 border-t border-slate-800">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-6 group">
                        <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black group-hover:bg-emerald-500 transition-colors">T</div>
                        <span className="text-xl font-black text-white tracking-tight">TRAZE<span className="text-emerald-500">.</span></span>
                    </Link>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                        El sistema operativo integral para la trazabilidad y gestión legal de Cannabis Medicinal en Argentina.
                    </p>
                    <div className="flex gap-4">
                        <SocialIcon icon={Twitter} />
                        <SocialIcon icon={Linkedin} />
                        <SocialIcon icon={Instagram} />
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Plataforma</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Para ONGs</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Para Médicos</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Portal Paciente</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Seguridad GS1</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Empresa</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Sobre Nosotros</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Contacto</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Blog Legal</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Soporte Técnico</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-6">Contacto</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-emerald-500 shrink-0" />
                            <span>Av. Libertador 2201, Buenos Aires, Argentina</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                            <span>contacto@traze.com.ar</span>
                        </li>
                         <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                            <span>+54 11 5555-0123</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <p>© 2024 Traze Systems S.A. Todos los derechos reservados.</p>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-white transition-colors">Términos y Condiciones</Link>
                    <Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link>
                </div>
            </div>
        </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1">
            <Icon size={18} />
        </a>
    )
}
