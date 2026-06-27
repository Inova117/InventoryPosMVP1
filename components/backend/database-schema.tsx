// Database Schema for MVP #1 - Inventory POS
'use client'

import { useState, useEffect } from 'react'
import { Database, ShieldCheck } from 'lucide-react'
import { mockDb } from '@/lib/mock-db'

type TableName = 'stores' | 'products' | 'sales' | 'sale_items'

export function DatabaseSchema() {
    const [selectedTable, setSelectedTable] = useState<string | null>(null)
    const [counts, setCounts] = useState<Record<TableName, number> | null>(null)

    useEffect(() => {
        let active = true
        const load = async () => {
            const [stores, products, sales, saleItems] = await Promise.all([
                mockDb.getTable('stores'),
                mockDb.getTable('products'),
                mockDb.getTable('sales'),
                mockDb.getTable('sale_items'),
            ])
            if (active) {
                setCounts({
                    stores: stores.length,
                    products: products.length,
                    sales: sales.length,
                    sale_items: saleItems.length,
                })
            }
        }
        load()
        return () => {
            active = false
        }
    }, [])

    const countLabel = (name: TableName) => {
        if (!counts) return '…'
        // eslint-disable-next-line security/detect-object-injection
        const n = counts[name]
        return `${n} ${n === 1 ? 'registro' : 'registros'}`
    }
    const totalRecords = counts ? counts.stores + counts.products + counts.sales + counts.sale_items : null

    const tables: { name: TableName; description: string; columns: { name: string; type: string; pk?: boolean; fk?: string; description: string }[]; rls: string }[] = [
        {
            name: 'stores',
            description: 'Tiendas y su configuración',
            columns: [
                { name: 'id', type: 'uuid', pk: true, description: 'Identificador único' },
                { name: 'user_id', type: 'uuid', fk: 'auth.users', description: 'Dueño de la tienda' },
                { name: 'name', type: 'text', description: 'Nombre de la tienda' },
                { name: 'address', type: 'text', description: 'Dirección' },
                { name: 'created_at', type: 'timestamptz', description: 'Fecha de creación' }
            ],
            rls: 'Cada usuario gestiona sus tiendas',
        },
        {
            name: 'products',
            description: 'Catálogo de inventario',
            columns: [
                { name: 'id', type: 'uuid', pk: true, description: 'Identificador único' },
                { name: 'store_id', type: 'uuid', fk: 'stores', description: 'Tienda dueña' },
                { name: 'name', type: 'text', description: 'Nombre del producto' },
                { name: 'sku', type: 'text', description: 'Código SKU' },
                { name: 'category', type: 'text', description: 'Categoría' },
                { name: 'buy_price', type: 'numeric', description: 'Costo de compra' },
                { name: 'sell_price', type: 'numeric', description: 'Precio de venta' },
                { name: 'stock', type: 'integer', description: 'Cantidad actual' }
            ],
            rls: 'Acceso por tienda',
        },
        {
            name: 'sales',
            description: 'Registro de transacciones',
            columns: [
                { name: 'id', type: 'uuid', pk: true, description: 'Identificador único' },
                { name: 'store_id', type: 'uuid', fk: 'stores', description: 'Tienda de la venta' },
                { name: 'total', type: 'numeric', description: 'Valor total' },
                { name: 'amount_received', type: 'numeric', description: 'Monto recibido' },
                { name: 'change_given', type: 'numeric', description: 'Cambio entregado' },
                { name: 'created_at', type: 'timestamptz', description: 'Fecha de la venta' }
            ],
            rls: 'Transacciones por tienda',
        },
        {
            name: 'sale_items',
            description: 'Detalle de cada venta',
            columns: [
                { name: 'id', type: 'uuid', pk: true, description: 'Identificador único' },
                { name: 'sale_id', type: 'uuid', fk: 'sales', description: 'Venta padre' },
                { name: 'product_id', type: 'uuid', fk: 'products', description: 'Producto vendido' },
                { name: 'quantity', type: 'integer', description: 'Unidades' },
                { name: 'unit_price', type: 'numeric', description: 'Precio unitario' },
                { name: 'subtotal', type: 'numeric', description: 'Total de línea' }
            ],
            rls: 'Hereda permisos de la venta',
        }
    ]

    return (
        <div className="rounded-2xl border border-border bg-card p-8 elevation-1">
            <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                    <Database className="h-6 w-6" />
                </span>
                <div>
                    <h2 className="font-serif text-2xl font-semibold text-foreground">Esquema de base de datos</h2>
                    <p className="text-muted-foreground">PostgreSQL con Row Level Security para multi-tenant</p>
                </div>
            </div>

            <div className="mb-6 rounded-xl bg-muted p-6">
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
        integer stock
    }

    SALES {
        uuid id PK
        uuid store_id FK
        numeric total
        timestamptz created_at
    }

    SALE_ITEMS {
        uuid id PK
        uuid sale_id FK
        uuid product_id FK
        integer quantity
        numeric subtotal
    }`}
                </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {tables.map((table) => (
                    <button
                        key={table.name}
                        onClick={() => setSelectedTable(selectedTable === table.name ? null : table.name)}
                        className={`rounded-xl border-2 p-4 text-left transition ${
                            selectedTable === table.name ? 'border-sage-500 bg-sage-50 dark:bg-sage-900/20' : 'border-border hover:border-sage-300'
                        }`}
                    >
                        <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-mono font-semibold text-foreground">{table.name}</h3>
                            <span className="text-xs text-muted-foreground">{countLabel(table.name)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{table.description}</p>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-sage-600 dark:text-sage-400">
                            <ShieldCheck className="h-4 w-4" />
                            <span>RLS</span>
                        </div>
                    </button>
                ))}
            </div>

            {selectedTable && (
                <div className="rounded-xl border border-border bg-muted p-6">
                    {tables.map((table) => (
                        selectedTable === table.name && (
                            <div key={table.name}>
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <h3 className="font-mono text-lg font-semibold text-foreground">{table.name}</h3>
                                    <span className="rounded-full bg-sage-100 px-3 py-1 text-sm font-medium text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">{table.rls}</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-border">
                                        <thead>
                                            <tr>
                                                {['Columna', 'Tipo', 'Llaves', 'Descripción'].map((h) => (
                                                    <th key={h} className="px-4 py-2 text-left text-xs font-medium uppercase text-muted-foreground">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {table.columns.map((column) => (
                                                <tr key={column.name}>
                                                    <td className="px-4 py-2 font-mono text-sm text-foreground">{column.name}</td>
                                                    <td className="px-4 py-2 text-sm text-muted-foreground">{column.type}</td>
                                                    <td className="px-4 py-2 text-sm">
                                                        {column.pk && <span className="mr-1 rounded bg-terracotta/15 px-2 py-1 text-xs text-terracotta-dark">PK</span>}
                                                        {column.fk && <span className="rounded bg-sage-100 px-2 py-1 text-xs text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">FK → {column.fk}</span>}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-muted-foreground">{column.description}</td>
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

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div className="text-center">
                    <div className="font-serif text-2xl font-semibold text-foreground">{tables.length}</div>
                    <div className="text-sm text-muted-foreground">Tablas</div>
                </div>
                <div className="text-center">
                    <div className="font-serif text-2xl font-semibold text-foreground">100%</div>
                    <div className="text-sm text-muted-foreground">Cobertura RLS</div>
                </div>
                <div className="text-center">
                    <div className="font-serif text-2xl font-semibold text-foreground">{totalRecords ?? '…'}</div>
                    <div className="text-sm text-muted-foreground">Registros demo</div>
                </div>
            </div>
        </div>
    )
}
