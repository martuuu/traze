'use client';

import { PortalSidebar } from '@/app/components/Layout/PortalSidebar';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-card flex">
            <PortalSidebar />
            <div className="flex-1 flex flex-col md:pl-72 pt-16 md:pt-0">
                <main className="flex-1 p-4 md:p-8 animate-in fade-in duration-500">
                    {children}
                </main>
            </div>
        </div>
    );
}
