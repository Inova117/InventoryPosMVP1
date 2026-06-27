'use client';

import { Database, Settings, Table, Sprout, Rocket } from 'lucide-react';

export function MockDatabaseOverview() {
    return (
        <div className="bg-card rounded-2xl elevation-1 border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sage-100 dark:bg-sage-900/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage-600 dark:text-sage-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-serif font-semibold text-foreground">Mock Database Architecture</h2>
                    <p className="text-muted-foreground">LocalStorage-based simulation for demo purposes</p>
                </div>
            </div>

            {/* Architecture Diagram */}
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Storage Layer */}
                    <div className="bg-muted rounded-xl p-6 border-2 border-border">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Database className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                            Storage Layer
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Type:</span>
                                <span className="font-mono text-foreground">LocalStorage</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Key:</span>
                                <span className="font-mono text-foreground text-xs">mvp_inventory_pos_db_v1</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Format:</span>
                                <span className="font-mono text-foreground">JSON</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Persistence:</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">✓ Browser Scope</span>
                            </div>
                        </div>
                    </div>

                    {/* Mock DB Class */}
                    <div className="bg-sage-50 rounded-xl p-6 border-2 border-sage-200 dark:bg-sage-900/20 dark:border-sage-900/30">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Settings className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                            MockDatabase Class
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Location:</span>
                                <span className="font-mono text-foreground text-xs">lib/mock-db.ts</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Latency:</span>
                                <span className="font-mono text-foreground">600ms</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">CRUD:</span>
                                <span className="font-semibold text-green-600 dark:text-green-400">✓ Full Support</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Type Safety:</span>
                                <span className="font-semibold text-sage-600 dark:text-sage-400">✓ TypeScript</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tables Overview */}
                <div className="bg-card rounded-xl border-2 border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Table className="h-5 w-5 text-sage-600 dark:text-sage-400" />
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
                            <div key={table.name} className={`bg-${table.color}-50 rounded-xl p-4 border border-${table.color}-200`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">{table.icon}</span>
                                    <span className="font-mono font-semibold text-foreground">{table.name}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Seeded: <span className="font-semibold">{table.records} records</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Seed Data */}
                <div className="bg-green-50 rounded-xl border-2 border-green-200 p-6 dark:bg-green-900/20 dark:border-green-900/30">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Sprout className="h-5 w-5 text-green-600 dark:text-green-400" />
                        Initial Seed Data
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Demo Users</h4>
                            <div className="space-y-1 text-muted-foreground">
                                <div>• <span className="font-mono text-xs">admin@demo.com</span> (Owner)</div>
                                <div>• <span className="font-mono text-xs">cashier@demo.com</span> (Cashier)</div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Demo Products</h4>
                            <div className="space-y-1 text-muted-foreground">
                                <div>• Wireless Mouse (SKU: DEMO-001)</div>
                                <div>• Mechanical Keyboard (SKU: DEMO-002)</div>
                                <div>• USB-C Cable (SKU: DEMO-003)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Migration Path */}
                <div className="bg-yellow-50 rounded-xl border-2 border-yellow-200 p-6 dark:bg-yellow-900/20 dark:border-yellow-900/30">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                        Migration to Supabase (Future)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        The service layer is abstracted to allow seamless migration:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-xs">
                        <div className="bg-card rounded-xl p-3 border border-yellow-300 dark:border-yellow-900/30">
                            <div className="font-mono text-foreground mb-1">Current: Mock</div>
                            <code className="text-muted-foreground">{`mockDb.create('products', data)`}</code>
                        </div>
                        <div className="bg-card rounded-xl p-3 border border-yellow-300 dark:border-yellow-900/30">
                            <div className="font-mono text-foreground mb-1">Future: Supabase</div>
                            <code className="text-muted-foreground">{`supabase.from('products').insert(data)`}</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
