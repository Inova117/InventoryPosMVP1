// Backend Page for MVP #1 - Inventory POS
'use client'

import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { MermaidScript } from '@/components/mermaid-script'
import { MockDatabaseOverview } from '@/components/backend/mock-database-overview'
import { DataFlowDiagram } from '@/components/backend/data-flow-diagram'
import { LiveDataInspector } from '@/components/backend/live-data-inspector'
import { DatabaseSchema } from '@/components/backend/database-schema'

export default function BackendPage() {
    return (
        <>
            <MermaidScript />

            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="sticky top-0 z-10 border-b border-border bg-card/90 backdrop-blur">
                    <div className="mx-auto max-w-7xl px-6 py-6">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <Link
                                    href="/dashboard"
                                    className="mb-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Volver al panel
                                </Link>
                                <h1 className="font-serif text-3xl font-semibold text-foreground">Arquitectura y backend</h1>
                                <p className="mt-1 text-muted-foreground">Simulación sobre localStorage para demo y pruebas</p>
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-sage-200 bg-sage-50 px-4 py-2 dark:border-sage-900/30 dark:bg-sage-900/20">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-sage-500" />
                                <span className="text-sm font-medium text-sage-700 dark:text-sage-300">Mock backend activo</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="mx-auto max-w-7xl space-y-12 px-6 py-12">
                    <section><MockDatabaseOverview /></section>
                    <section><DataFlowDiagram /></section>
                    <section><DatabaseSchema /></section>
                    <section><LiveDataInspector /></section>

                    <section>
                        <div className="rounded-2xl border border-border bg-card p-8 elevation-1">
                            <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">Notas de implementación</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-2 font-semibold text-foreground">¿Por qué un backend simulado?</h3>
                                    <p className="text-muted-foreground">
                                        Esta demo usa un backend simulado para iterar y mostrar el producto sin dependencias externas.
                                        La arquitectura está pensada para migrar fácilmente a Supabase o cualquier PostgreSQL.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-foreground">Características</h3>
                                    <ul className="space-y-2 text-muted-foreground">
                                        {[
                                            ['CRUD completo', 'crear, leer, actualizar y eliminar'],
                                            ['Latencia simulada', 'pequeño delay para imitar la red real'],
                                            ['Persistencia', 'sobrevive a recargas vía localStorage'],
                                            ['Tipado estricto', 'TypeScript de extremo a extremo'],
                                            ['Datos de ejemplo', 'inicializa con un catálogo y ventas creíbles'],
                                        ].map(([title, desc]) => (
                                            <li key={title} className="flex items-start gap-2">
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-600 dark:text-sage-400" />
                                                <span><strong className="text-foreground">{title}</strong> — {desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-semibold text-foreground">Ruta de migración</h3>
                                    <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
                                        <li>Crear el proyecto en Supabase con el esquema mostrado arriba</li>
                                        <li>Reemplazar los imports de mockDb por el cliente de Supabase</li>
                                        <li>Adaptar los métodos de servicio a consultas de Supabase</li>
                                        <li>Activar las políticas RLS por tienda</li>
                                    </ol>
                                </div>

                                <div className="rounded-xl border border-sage-200 bg-sage-50 p-4 dark:border-sage-900/30 dark:bg-sage-900/20">
                                    <h3 className="mb-2 font-semibold text-sage-800 dark:text-sage-200">Documentación</h3>
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <Link href="/docs/schema" className="text-sage-700 hover:underline dark:text-sage-300">Esquema de base de datos</Link>
                                        <Link href="/docs/api" className="text-sage-700 hover:underline dark:text-sage-300">Especificación de API</Link>
                                        <Link href="/docs/product" className="text-sage-700 hover:underline dark:text-sage-300">Especificación de producto</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
