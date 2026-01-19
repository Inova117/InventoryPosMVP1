// Backend Page for MVP #1 - Inventory POS
'use client'

import { MermaidScript } from '@/components/mermaid-script'
import { MockDatabaseOverview } from '@/components/backend/mock-database-overview'
import { DataFlowDiagram } from '@/components/backend/data-flow-diagram'
import { LiveDataInspector } from '@/components/backend/live-data-inspector'
import { DatabaseSchema } from '@/components/backend/database-schema'
import { DatabaseControls } from '@/components/backend/database-controls'
import Link from 'next/link'

export default function BackendPage() {
    return (
        <>
            <MermaidScript />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <Link
                                        href="/dashboard"
                                        className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Dashboard
                                    </Link>
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900">
                                    Backend & Mock Architecture
                                </h1>
                                <p className="mt-2 text-slate-600">
                                    LocalStorage-based simulation for demo and testing
                                </p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-blue-700">
                                    Mock Backend Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
                    {/* Mock Database Overview */}
                    <section>
                        <MockDatabaseOverview />
                    </section>

                    {/* Data Flow */}
                    <section>
                        <DataFlowDiagram />
                    </section>

                    {/* Database Schema */}
                    <section>
                        <DatabaseSchema />
                    </section>

                    {/* Live Data Inspector */}
                    <section>
                        <LiveDataInspector />
                    </section>

                    {/* Implementation Notes */}
                    <section>
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                Implementation Notes
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Why Mock Backend?</h3>
                                    <p className="text-slate-700">
                                        This MVP uses a simulated backend to enable rapid development, testing, and demonstration without external dependencies.
                                        The architecture is designed for easy migration to Supabase or any PostgreSQL database.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Features</h3>
                                    <ul className="space-y-2 text-slate-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span><strong>Full CRUD</strong> - Create, Read, Update, Delete operations</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span><strong>Simulated Latency</strong> - 600ms delay to mimic real network</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span><strong>Data Persistence</strong> - Survives page refreshes via LocalStorage</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span><strong>Type Safety</strong> - Full TypeScript support</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span><strong>Seed Data</strong> - Auto-initialized with demo records</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">Migration Path</h3>
                                    <p className="text-slate-700 mb-3">
                                        To migrate to Supabase, simply:
                                    </p>
                                    <ol className="space-y-2 text-slate-700 list-decimal list-inside">
                                        <li>Create Supabase project and run the schema from DATABASE_SCHEMA.md</li>
                                        <li>Replace mockDb imports with Supabase client</li>
                                        <li>Update service methods to use Supabase queries</li>
                                        <li>Enable RLS policies as defined in documentation</li>
                                    </ol>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <h3 className="font-semibold text-blue-900 mb-2">📚 Documentation</h3>
                                    <div className="flex gap-4 text-sm">
                                        <a href="/docs/DATABASE_SCHEMA.md" className="text-blue-700 hover:underline">
                                            Database Schema
                                        </a>
                                        <a href="/docs/API_SPEC.md" className="text-blue-700 hover:underline">
                                            API Specification
                                        </a>
                                        <a href="/START_HERE/PRODUCT.md" className="text-blue-700 hover:underline">
                                            Product Spec
                                        </a>
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
