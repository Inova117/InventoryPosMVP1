'use client';

import { useState, useEffect } from 'react';
import { DB_KEY } from '@/lib/mock-db';

export function LiveDataInspector() {
    const [activeTable, setActiveTable] = useState<string>('products');
    const [mockData, setMockData] = useState<Record<string, unknown> | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window === 'undefined') return;

        const data = localStorage.getItem(DB_KEY);
        if (!data) return;

        try {
            setMockData(JSON.parse(data));
        } catch {
            setMockData(null);
        }
    }, []);

    const tables = [
        { name: 'stores', icon: '🏪', label: 'Tiendas' },
        { name: 'profiles', icon: '👤', label: 'Usuarios' },
        { name: 'products', icon: '📦', label: 'Productos' },
        { name: 'suppliers', icon: '🚚', label: 'Proveedores' },
        { name: 'sales', icon: '💰', label: 'Ventas' },
        { name: 'sale_items', icon: '📝', label: 'Líneas' },
    ];

    if (!mounted) {
        return (
            <div className="rounded-2xl border border-border bg-card p-8 elevation-1">
                <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">Inspector de datos en vivo</h2>
                <div className="rounded-xl border border-border bg-muted p-6 text-center">
                    <p className="text-muted-foreground">Cargando…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-border bg-card p-8 elevation-1">
            <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">Inspector de datos en vivo</h2>

            {mockData ? (
                <div className="space-y-4">
                    {/* Table selector */}
                    <div className="flex flex-wrap gap-2">
                        {tables.map((table) => (
                            <button
                                key={table.name}
                                onClick={() => setActiveTable(table.name)}
                                className={`rounded-xl px-4 py-2 font-medium transition-colors focus-ring ${activeTable === table.name
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-secondary'
                                    }`}
                            >
                                <span className="mr-2">{table.icon}</span>
                                {table.label}
                            </button>
                        ))}
                    </div>

                    {/* Data display — terminal */}
                    <div className="overflow-x-auto rounded-xl bg-warmth-900 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-mono text-sm text-sage-300">
                                Tabla: {activeTable}
                            </h3>
                            <span className="text-xs text-warmth-300">
                                {/* eslint-disable-next-line security/detect-object-injection */}
                                {Array.isArray(mockData[activeTable]) ? mockData[activeTable].length : 0} registros
                            </span>
                        </div>
                        <pre className="overflow-x-auto font-mono text-xs text-sage-200">
                            {/* eslint-disable-next-line security/detect-object-injection */}
                            {JSON.stringify(mockData[activeTable] || [], null, 2)}
                        </pre>
                    </div>

                    {/* Storage info */}
                    <div className="grid gap-4 text-sm md:grid-cols-3">
                        <div className="rounded-xl bg-muted p-4">
                            <div className="mb-1 text-muted-foreground">Tamaño total</div>
                            <div className="font-semibold text-foreground">
                                {(JSON.stringify(mockData).length / 1024).toFixed(2)} KB
                            </div>
                        </div>
                        <div className="rounded-xl bg-muted p-4">
                            <div className="mb-1 text-muted-foreground">Registros totales</div>
                            <div className="font-semibold text-foreground">
                                {Object.values(mockData).reduce(
                                    (sum: number, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
                                    0
                                )}
                            </div>
                        </div>
                        <div className="rounded-xl bg-muted p-4">
                            <div className="mb-1 text-muted-foreground">Clave de almacenamiento</div>
                            <div className="font-mono text-xs text-foreground">{DB_KEY}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border border-warning/25 bg-warning-soft p-6 text-center">
                    <p className="text-warning-soft-foreground">
                        No se encontró la base de datos. Inicia sesión y se creará automáticamente con datos de ejemplo.
                    </p>
                </div>
            )}
        </div>
    );
}
