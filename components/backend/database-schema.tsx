// Database Schema for MVP #1 - Inventory POS
'use client'

import { useState } from 'react'

export function DatabaseSchema() {
    const [selectedTable, setSelectedTable] = useState<string | null>(null)

    const tables = [
        {
            name: 'stores',
            description: 'Store locations and settings',
            columns: [
                { name: 'id', type: 'uuid', pk: true, description: 'Unique identifier' },
                { name: 'user_id', type: 'uuid', fk: 'auth.users', description: 'Store owner' },
                { name: 'name', type: 'text', description: 'Store name' },
                { name: 'address', type: 'text', description: 'Physical address' },
                { name: 'created_at', type: 'timestamptz', description: 'Creation timestamp' }
            ],
            rls: 'Users manage their own stores',
            count: '1 record (demo)'
        },
        {
            name: 'products',
            description: 'Product inventory catalog',
            columns: [
                { name: 'id', type: 'uuid', pk: true, description: 'Unique identifier' },
                { name: 'store_id', type: 'uuid', fk: 'stores', description: 'Parent store' },
                { name: 'name', type: 'text', description: 'Product name' },
                { name: 'sku', type: 'text', description: 'Stock keeping unit' },
                { name: 'category', type: 'text', description: 'Product category' },
                { name: 'buy_price', type: 'numeric', description: 'Purchase cost' },
                { name: 'sell_price', type: 'numeric', description: 'Retail price' },
                { name: 'stock', type: 'integer', description: 'Current quantity' },
                { name: 'min_stock', type: 'integer', description: 'Alert threshold' }
            ],
            rls: 'Store-scoped access only',
            count: '50 records (demo)'
        },
        {
            name: 'sales',
            description: 'Transaction records',
            columns: [
                { name: 'id', type: 'uuid', pk: true, description: 'Unique identifier' },
                { name: 'store_id', type: 'uuid', fk: 'stores', description: 'Transaction store' },
                { name: 'total_amount', type: 'numeric', description: 'Total sale value' },
                { name: 'payment_method', type: 'text', description: 'Cash, card, etc' },
                { name: 'created_at', type: 'timestamptz', description: 'Sale timestamp' }
            ],
            rls: 'Store-scoped transactions',
            count: '100 records (demo)'
        },
        {
            name: 'sale_items',
            description: 'Individual items sold',
            columns: [
                { name: 'id', type: 'uuid', pk: true, description: 'Unique identifier' },
                { name: 'sale_id', type: 'uuid', fk: 'sales', description: 'Parent sale' },
                { name: 'product_id', type: 'uuid', fk: 'products', description: 'Product sold' },
                { name: 'quantity', type: 'integer', description: 'Units sold' },
                { name: 'unit_price', type: 'numeric', description: 'Price per unit' },
                { name: 'subtotal', type: 'numeric', description: 'Line total' }
            ],
            rls: 'Inherits sale permissions',
            count: '200+ records (demo)'
        }
    ]

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Database Schema</h2>
                    <p className="text-slate-600">PostgreSQL with Row Level Security for multi-tenancy</p>
                </div>
            </div>

            {/* ERD Diagram */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <div className="mermaid">
                    {`erDiagram
    USERS ||--o{ STORES : owns
    STORES ||--o{ PRODUCTS : contains
    STORES ||--o{ SALES : processes
    SALES ||--o{ SALE_ITEMS : includes
    PRODUCTS ||--o{ SALE_ITEMS : sold_in
    
    STORES {
        uuid id PK
        uuid user_id FK
        text name
        text address
    }
    
    PRODUCTS {
        uuid id PK
        uuid store_id FK
        text name
        text sku
        text category
        numeric buy_price
        numeric sell_price
        integer stock
        integer min_stock
    }
    
    SALES {
        uuid id PK
        uuid store_id FK
        numeric total_amount
        text payment_method
        timestamptz created_at
    }
    
    SALE_ITEMS {
        uuid id PK
        uuid sale_id FK
        uuid product_id FK
        integer quantity
        numeric unit_price
        numeric subtotal
    }`}
                </div>
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {tables.map((table) => (
                    <button
                        key={table.name}
                        onClick={() => setSelectedTable(selectedTable === table.name ? null : table.name)}
                        className={`text-left p-4 rounded-lg border-2 transition ${selectedTable === table.name
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-slate-900">{table.name}</h3>
                            <span className="text-xs text-slate-500">{table.count}</span>
                        </div>
                        <p className="text-sm text-slate-600">{table.description}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>RLS Protected</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Table Details */}
            {selectedTable && (
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                    {tables.map((table) => (
                        selectedTable === table.name && (
                            <div key={table.name}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        Table: {table.name}
                                    </h3>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                                        {table.rls}
                                    </span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200">
                                        <thead className="bg-white">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Column</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Constraints</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {table.columns.map((column) => (
                                                <tr key={column.name}>
                                                    <td className="px-4 py-2 text-sm font-mono text-slate-900">{column.name}</td>
                                                    <td className="px-4 py-2 text-sm text-slate-600">{column.type}</td>
                                                    <td className="px-4 py-2 text-sm">
                                                        {column.pk && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded mr-1">PK</span>}
                                                        {column.fk && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">FK → {column.fk}</span>}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-slate-600">{column.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">4</div>
                    <div className="text-sm text-slate-600">Tables</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">100%</div>
                    <div className="text-sm text-slate-600">RLS Coverage</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">350+</div>
                    <div className="text-sm text-slate-600">Demo Records</div>
                </div>
            </div>
        </div>
    )
}
