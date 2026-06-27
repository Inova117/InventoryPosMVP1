'use client';

import { Database, Settings, Table, Sprout, Rocket } from 'lucide-react';
import { DB_KEY, LATENCY_MS } from '@/lib/mock-db';

const TABLES: { name: string; icon: string; records: string; accent: string }[] = [
    { name: 'stores', icon: '🏪', records: '1', accent: 'bg-sage-50 border-sage-200 dark:bg-sage-900/20 dark:border-sage-900/30' },
    { name: 'profiles', icon: '👤', records: '2', accent: 'bg-warmth-100 border-warmth-200 dark:bg-warmth-800 dark:border-warmth-700' },
    { name: 'products', icon: '📦', records: '32', accent: 'bg-success-soft border-success/25' },
    { name: 'suppliers', icon: '🚚', records: '0', accent: 'bg-muted border-border' },
    { name: 'sales', icon: '💰', records: '~40', accent: 'bg-warning-soft border-warning/25' },
    { name: 'sale_items', icon: '📝', records: 'Dinámico', accent: 'bg-terracotta/10 border-terracotta/25' },
];

export function MockDatabaseOverview() {
    return (
        <div className="rounded-2xl border border-border bg-card p-8 elevation-1">
            <div className="mb-6 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-600 dark:bg-sage-900/30 dark:text-sage-400">
                    <Database className="h-6 w-6" />
                </span>
                <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground">Arquitectura del backend simulado</h2>
                    <p className="text-muted-foreground">Simulación sobre localStorage para la demo</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Storage layer */}
                    <div className="rounded-xl border-2 border-border bg-muted p-6">
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <Database className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                            Capa de almacenamiento
                        </h3>
                        <div className="space-y-2 text-sm">
                            <Row label="Tipo" value="LocalStorage" mono />
                            <Row label="Clave" value={DB_KEY} mono small />
                            <Row label="Formato" value="JSON" mono />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Persistencia</span>
                                <span className="font-semibold text-success">✓ Navegador</span>
                            </div>
                        </div>
                    </div>

                    {/* Mock DB class */}
                    <div className="rounded-xl border-2 border-sage-200 bg-sage-50 p-6 dark:border-sage-900/30 dark:bg-sage-900/20">
                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                            <Settings className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                            Clase MockDatabase
                        </h3>
                        <div className="space-y-2 text-sm">
                            <Row label="Ubicación" value="lib/mock-db.ts" mono small />
                            <Row label="Latencia" value={`${LATENCY_MS}ms`} mono />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">CRUD</span>
                                <span className="font-semibold text-success">✓ Completo</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tipado</span>
                                <span className="font-semibold text-sage-600 dark:text-sage-400">✓ TypeScript</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tables overview */}
                <div className="rounded-xl border-2 border-border bg-card p-6">
                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
                        <Table className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                        Tablas (6)
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        {TABLES.map((table) => (
                            <div key={table.name} className={`rounded-xl border p-4 ${table.accent}`}>
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="text-2xl">{table.icon}</span>
                                    <span className="font-mono font-semibold text-foreground">{table.name}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Sembrado: <span className="font-semibold">{table.records}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seed data */}
                <div className="rounded-xl border-2 border-success/25 bg-success-soft p-6">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                        <Sprout className="h-5 w-5 text-success" />
                        Datos de ejemplo (Café Aurora)
                    </h3>
                    <div className="grid gap-4 text-sm md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-medium text-foreground">Usuarios demo</h4>
                            <div className="space-y-1 text-muted-foreground">
                                <div>• Daniela Ríos — <span className="font-mono text-xs">admin@demo.com</span> (Dueña)</div>
                                <div>• Marco Téllez — <span className="font-mono text-xs">cashier@demo.com</span> (Cajero)</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-2 font-medium text-foreground">Productos demo</h4>
                            <div className="space-y-1 text-muted-foreground">
                                <div>• Latte de vainilla <span className="font-mono text-xs">(CFE-LAT-002)</span></div>
                                <div>• Croissant <span className="font-mono text-xs">(REP-CRO-001)</span></div>
                                <div>• Café en grano 1kg <span className="font-mono text-xs">(GRA-1KG-001)</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Migration path */}
                <div className="rounded-xl border-2 border-warning/25 bg-warning-soft p-6">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                        <Rocket className="h-5 w-5 text-warning-soft-foreground" />
                        Migración a Supabase (futuro)
                    </h3>
                    <p className="mb-3 text-sm text-warning-soft-foreground">
                        La capa de servicios está abstraída para permitir una migración directa:
                    </p>
                    <div className="grid gap-4 text-xs md:grid-cols-2">
                        <div className="rounded-xl border border-warning/20 bg-card p-3">
                            <div className="mb-1 font-mono text-foreground">Hoy: Mock</div>
                            <code className="text-muted-foreground">{`mockDb.create('products', data)`}</code>
                        </div>
                        <div className="rounded-xl border border-warning/20 bg-card p-3">
                            <div className="mb-1 font-mono text-foreground">Futuro: Supabase</div>
                            <code className="text-muted-foreground">{`supabase.from('products').insert(data)`}</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Row({ label, value, mono, small }: { label: string; value: string; mono?: boolean; small?: boolean }) {
    return (
        <div className="flex justify-between gap-3">
            <span className="text-muted-foreground">{label}</span>
            <span className={`text-foreground ${mono ? 'font-mono' : ''} ${small ? 'text-xs' : ''} truncate`}>{value}</span>
        </div>
    );
}
