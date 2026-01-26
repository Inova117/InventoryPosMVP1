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
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Live Data Inspector</h2>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                    <p className="text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Live Data Inspector</h2>

            {mockData ? (
                <div className="space-y-4">
                    {/* Table Selector */}
                    <div className="flex gap-2 flex-wrap">
                        {tables.map((table) => (
                            <button
                                key={table.name}
                                onClick={() => setActiveTable(table.name)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTable === table.name
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                <span className="mr-2">{table.icon}</span>
                                {table.label}
                            </button>
                        ))}
                    </div>

                    {/* Data Display */}
                    <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-mono text-green-400 text-sm">
                                Table: {activeTable}
                            </h3>
                            <span className="text-slate-400 text-xs">
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
                        <div className="bg-slate-50 rounded p-4">
                            <div className="text-slate-600 mb-1">Total Size</div>
                            <div className="font-semibold text-slate-900">
                                {(JSON.stringify(mockData).length / 1024).toFixed(2)} KB
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded p-4">
                            <div className="text-slate-600 mb-1">Total Records</div>
                            <div className="font-semibold text-slate-900">
                                {Object.values(mockData).reduce(
                                    (sum: number, arr) => sum + (Array.isArray(arr) ? arr.length : 0),
                                    0
                                )}
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded p-4">
                            <div className="text-slate-600 mb-1">Storage Key</div>
                            <div className="font-mono text-xs text-slate-900">
                                mvp_inventory_pos_db_v1
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <p className="text-yellow-800">
                        No mock database found. Please login and the database will be initialized automatically.
                    </p>
                </div>
            )}
        </div>
    );
}
