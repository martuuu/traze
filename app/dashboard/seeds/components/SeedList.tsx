'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Dialog } from '@/app/components/ui/custom-dialog';
import { seeds, Seed } from '@/app/data/mock-db';
import { Leaf, Tag, Activity, FileText, Fingerprint, GitMerge, ChevronDown } from 'lucide-react';

export function SeedList() {
    const [selectedSeed, setSelectedSeed] = useState<Seed | null>(null);

    const openTaxonomy = (seed: Seed) => {
        setSelectedSeed(seed);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold font-title text-foreground">Inventario de Semillas</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {seeds.map((seed) => (
                    <Card key={seed.id} className="border-border hover:border-pastel-green-300 transition-all duration-300 group overflow-hidden">
                        <CardHeader className="pb-3 border-b border-border/50 bg-slate-50/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-bold flex items-center gap-2 group-hover:text-pastel-green-700 transition-colors">
                                        <Leaf className="w-4 h-4 text-pastel-green-500" />
                                        {seed.name}
                                    </CardTitle>
                                    <CardDescription className="mt-1 font-mono text-xs">{seed.inaseStamp}</CardDescription>
                                </div>
                                <Badge variant="outline" className={seed.status === 'IN_STOCK' ? 'border-pastel-green-200 bg-pastel-green-50 text-pastel-green-700' : 'border-red-200 bg-red-50 text-red-700'}>
                                    {seed.status === 'IN_STOCK' ? 'En Stock' : 'Agotado'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-1">
                                    <div className="flex items-center text-muted-foreground text-xs font-medium">
                                        <Fingerprint className="w-3 h-3 mr-1" />
                                        Genética
                                    </div>
                                    <p className="font-semibold">{seed.genetics}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center text-muted-foreground text-xs font-medium">
                                        <Activity className="w-3 h-3 mr-1" />
                                        Ratio THC/CBD
                                    </div>
                                    <p className="font-semibold">{seed.thcCbdRatio}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center text-muted-foreground text-xs font-medium">
                                        <Tag className="w-3 h-3 mr-1" />
                                        Stock Disponible
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-xl font-bold font-title">{seed.currentStock}</span>
                                        <span className="text-muted-foreground pb-0.5">/ {seed.quantity}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center text-muted-foreground text-xs font-medium">
                                        <Activity className="w-3 h-3 mr-1" />
                                        Poder Germ.
                                    </div>
                                    <p className="font-semibold text-pastel-green-600">{seed.germinationPower}%</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50/30 pt-4 pb-4 border-t border-border/50">
                            <Button 
                                variant="ghost" 
                                onClick={() => openTaxonomy(seed)}
                                className="w-full justify-between text-muted-foreground hover:text-foreground group-hover:bg-pastel-green-50 group-hover:text-pastel-green-800"
                            >
                                <span>Ver Árbol Taxonómico</span>
                                <GitMerge className="w-4 h-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog
                isOpen={!!selectedSeed}
                onClose={() => setSelectedSeed(null)}
                title="Árbol Taxonómico"
                description={`Trazabilidad genética y cruces de la cepa ${selectedSeed?.name}.`}
                maxWidth="max-w-2xl"
            >
                {selectedSeed && (
                    <div className="space-y-6 pt-4">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-border">
                            {/* Root Node */}
                            <div className="flex flex-col items-center">
                                <div className="bg-pastel-green-100 border border-pastel-green-300 text-pastel-green-800 px-6 py-3 rounded-xl shadow-sm text-center">
                                    <div className="font-bold text-lg">{selectedSeed.name}</div>
                                    <div className="text-xs opacity-80 mt-1">{selectedSeed.genetics}</div>
                                </div>
                                <div className="h-8 w-px bg-slate-300 my-1"></div>
                            </div>
                            
                            {/* Parents Level */}
                            <div className="flex justify-center gap-12 relative">
                                {/* Horizontal connector */}
                                <div className="absolute top-0 w-[calc(100%-12rem)] h-px bg-slate-300 left-24"></div>
                                
                                <div className="flex flex-col items-center relative">
                                    <div className="absolute -top-1 w-px h-8 bg-slate-300"></div>
                                    <div className="mt-7 bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm text-center w-40">
                                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Madre</div>
                                        <div className="font-semibold text-sm">Fenotipo A</div>
                                        <div className="text-xs text-muted-foreground">Original Haze</div>
                                    </div>
                                     <div className="h-6 w-px bg-slate-300 my-1"></div>
                                      <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg text-center w-32 border-dashed">
                                        <div className="text-xs text-muted-foreground">Banco Genético</div>
                                        <div className="font-medium text-xs">Desconocido</div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-center relative">
                                    <div className="absolute -top-1 w-px h-8 bg-slate-300"></div>
                                    <div className="mt-7 bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm text-center w-40">
                                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Padre</div>
                                        <div className="font-semibold text-sm">Polen B</div>
                                        <div className="text-xs text-muted-foreground">Northern Lights</div>
                                    </div>
                                    <div className="h-6 w-px bg-slate-300 my-1"></div>
                                      <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-lg text-center w-32 border-dashed">
                                        <div className="text-xs text-muted-foreground">Banco Genético</div>
                                        <div className="font-medium text-xs">Sensi Seeds</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-sand-gold-50 p-4 rounded-xl border border-sand-gold-200">
                            <div className="flex items-center gap-3">
                                <div className="bg-sand-gold-200 p-2 rounded-lg">
                                    <Fingerprint className="w-5 h-5 text-sand-gold-700" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-sand-gold-900">Certificación INASE</div>
                                    <div className="text-xs text-sand-gold-700">Estampilla: {selectedSeed.inaseStamp}</div>
                                </div>
                            </div>
                            <Button variant="outline" className="border-sand-gold-300 text-sand-gold-800 bg-white">Ver Detalles</Button>
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
}
