'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { providers } from '@/app/data/mock-db';
import { Building2, Mail, ShieldCheck } from 'lucide-react';

export function ProvidersList() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-title text-foreground">Proveedores (INASE)</h2>
            </div>
            
            <div className="space-y-4">
                {providers.map((provider) => (
                    <Card key={provider.id} className="border-border">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-bold flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-muted-foreground" />
                                        {provider.name}
                                    </CardTitle>
                                    <CardDescription className="flex items-center gap-1.5 text-xs font-mono">
                                        <ShieldCheck className="w-3 h-3 text-blue-500" />
                                        {provider.inaseNumber}
                                    </CardDescription>
                                </div>
                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-border">
                                    {provider.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-50 p-2 rounded-lg border border-border/50">
                                <Mail className="w-4 h-4" />
                                <span className="font-medium">{provider.contact}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
