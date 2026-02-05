import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { clsx } from 'clsx';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Traze | Trazabilidad Cannabis Medicinal',
  description: 'Sistema de Trazabilidad y Gestión de Cultivos para ONGs y Pacientes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className={clsx(inter.variable, outfit.variable, 'bg-background font-sans text-foreground antialiased h-full')}>
        {children}
      </body>
    </html>
  );
}
