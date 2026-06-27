'use client';

import { useState, useEffect } from 'react';

export function LiveDataInspector() {
    const [activeTable, setActiveTable] = useState<string>('products');
    const [mockData, setMockData] = useState<Record<string, unknown> | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window === 'undefined') return;

        const data = localStorage.getItem('mvp_inventory_pos_db_v1');
        if (!data) return;

        try {
            setMockData(JSON.parse(data));
        } catch {
            setMockData(null);
        }
    }, []);

    const tables = [
        { name: 'stores', icon: '🏪', label: 'Stores' },
        { name: 'profiles', icon: '👤', label: 'Users' },
        { name: 'products', icon: '📦', label: 'Products' },
        { name: 'suppliers', icon: '🚚', label: 'Suppliers' },
        { name: 'sales', icon: '💰', label: 'Sales' },
        { name: 'sale_items', icon: '📝', label: 'Sale Items' },
    ];

    if (!mounted) {
        return (
            <div className="bg-card rounded-2xl elevation-1 border border-border p-8">
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">Live Data Inspector</h2>
                <div className="bg-muted border border-border rounded-xl p-6 text-center">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card rounded-2xl elevation-1 border border-border p-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">Live Data Inspector</h2>

            {mockData ? (
                <div className="space-y-4">
                    {/* Table Selector */}
                    <div className="flex gap-2 flex-wrap">
                        {tables.map((table) => (
                            <button
                                key={table.name}
                                onClick={() => setActiveTable(table.name)}
                                className={`px-4 py-2 rounded-xl font-medium transition-colors ${activeTable === table.name
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground hover:bg-secondary'
                                    }`}
                            >
                                <span className="mr-2">{table.icon}</span>
                                {table.label}
                            </button>
                        ))}
                    </div>

                    {/* Data Display */}
                    <div className="bg-warmth-900 rounded-xl p-6 overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-mono text-green-400 text-sm">
                                Table: {activeTable}
                            </h3>
                            <span className="text-warmth-300 text-xs">
                                {/* eslint-disable-next-line security/detect-object-injection */}
                                {Array.isArray(mockData[activeTable]) ? mockData[activeTable].length : 0} records
                            </span>
                        </div>
                        <pre className="text-green-400 text-xs font-mono overflow-x-auto">
                            {/* eslint-disable-next-line security/detect-object-injection */}
                            {JSON.stringify(mockData[activeTable] || [], null, 2)}
                        </pre>
                    </div>

                    {/* Storage Info */}
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-muted rounded-xl p-4">
                            <div className="text-muted-foreground mb-1">Total Size</div>
                            <div className="font-semibold text-foreground">
                                {(JSON.stringify(mockData).length / 1024).toFixed(2)} KB
                            </div>
                        </div>
                        <div className="bg-muted rounded-xl p-4">
                            <div className="text-muted-foreground mb-1">Total Records</div>
                            <div className="font-semibold text-foreground">
                                {Object.values(mockData).reduce(
                                    (sum: number, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
                                    0
                                )}
                            </div>
                        </div>
                        <div className="bg-muted rounded-xl p-4">
                            <div className="text-muted-foreground mb-1">Storage Key</div>
                            <div className="font-mono text-xs text-foreground">
                                mvp_inventory_pos_db_v1
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center dark:bg-yellow-900/20 dark:border-yellow-900/30">
                    <p className="text-yellow-800 dark:text-yellow-300">
                        No mock database found. Please login and the database will be initialized automatically.
                    </p>
                </div>
            )}
        </div>
    );
}
