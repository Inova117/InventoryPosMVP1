'use client';

export function MockDatabaseOverview() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Mock Database Architecture</h2>
                    <p className="text-slate-600">LocalStorage-based simulation for demo purposes</p>
                </div>
            </div>

            {/* Architecture Diagram */}
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Storage Layer */}
                    <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">💾</span>
                            Storage Layer
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Type:</span>
                                <span className="font-mono text-slate-900">LocalStorage</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Key:</span>
                                <span className="font-mono text-slate-900 text-xs">mvp_inventory_pos_db_v1</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Format:</span>
                                <span className="font-mono text-slate-900">JSON</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Persistence:</span>
                                <span className="font-semibold text-green-600">✓ Browser Scope</span>
                            </div>
                        </div>
                    </div>

                    {/* Mock DB Class */}
                    <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">⚙️</span>
                            MockDatabase Class
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Location:</span>
                                <span className="font-mono text-slate-900 text-xs">lib/mock-db.ts</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Latency:</span>
                                <span className="font-mono text-slate-900">600ms</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">CRUD:</span>
                                <span className="font-semibold text-green-600">✓ Full Support</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Type Safety:</span>
                                <span className="font-semibold text-blue-600">✓ TypeScript</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tables Overview */}
                <div className="bg-white rounded-lg border-2 border-slate-300 p-6">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        Database Tables (6)
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { name: 'stores', icon: '🏪', records: '1', color: 'purple' },
                            { name: 'profiles', icon: '👤', records: '2', color: 'blue' },
                            { name: 'products', icon: '📦', records: '3+', color: 'green' },
                            { name: 'suppliers', icon: '🚚', records: '0', color: 'gray' },
                            { name: 'sales', icon: '💰', records: 'Dynamic', color: 'yellow' },
                            { name: 'sale_items', icon: '📝', records: 'Dynamic', color: 'orange' },
                        ].map((table) => (
                            <div key={table.name} className={`bg-${table.color}-50 rounded p-4 border border-${table.color}-200`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{table.icon}</span>
                                    <span className="font-mono font-semibold text-slate-900">{table.name}</span>
                                </div>
                                <div className="text-xs text-slate-600">
                                    Seeded: <span className="font-semibold">{table.records} records</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seed Data */}
                <div className="bg-green-50 rounded-lg border-2 border-green-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">🌱</span>
                        Initial Seed Data
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium text-slate-900 mb-2">Demo Users</h4>
                            <div className="space-y-1 text-slate-700">
                                <div>• <span className="font-mono text-xs">admin@demo.com</span> (Owner)</div>
                                <div>• <span className="font-mono text-xs">cashier@demo.com</span> (Cashier)</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-900 mb-2">Demo Products</h4>
                            <div className="space-y-1 text-slate-700">
                                <div>• Wireless Mouse (SKU: DEMO-001)</div>
                                <div>• Mechanical Keyboard (SKU: DEMO-002)</div>
                                <div>• USB-C Cable (SKU: DEMO-003)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Migration Path */}
                <div className="bg-yellow-50 rounded-lg border-2 border-yellow-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">🚀</span>
                        Migration to Supabase (Future)
                    </h3>
                    <p className="text-sm text-slate-700 mb-3">
                        The service layer is abstracted to allow seamless migration:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-white rounded p-3 border border-yellow-300">
                            <div className="font-mono text-slate-900 mb-1">Current: Mock</div>
                            <code className="text-slate-600">{`mockDb.create('products', data)`}</code>
                        </div>
                        <div className="bg-white rounded p-3 border border-yellow-300">
                            <div className="font-mono text-slate-900 mb-1">Future: Supabase</div>
                            <code className="text-slate-600">{`supabase.from('products').insert(data)`}</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
