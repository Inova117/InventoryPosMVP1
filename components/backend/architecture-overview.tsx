// Architecture Overview for MVP #1 - Inventory POS
'use client'

export function ArchitectureOverview() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Architecture Overview</h2>
                    <p className="text-slate-600">Retail-optimized, real-time inventory system</p>
                </div>
            </div>

            {/* Mermaid Diagram */}
            <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <div className="mermaid">
                    {`graph TB
    A[POS Terminal] -->|HTTPS| B[Next.js Frontend]
    B -->|API Routes| C[Server-Side API]
    C -->|Validates| D[Zod Schemas]
    C -->|Queries| E[(Supabase PostgreSQL)]
    C -->|Auth Check| F[Supabase Auth]
    E -->|RLS Policies| G[Row Level Security]
    E -->|Triggers| H[Low Stock Alerts]
    F -->|JWT Token| B
    
    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#90caf9
    style D fill:#fff9c4
    style E fill:#c8e6c9
    style F fill:#ffccbc
    style G fill:#f8bbd0
    style H fill:#ffccbc`}
                </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-slate-900">Real-time Stock</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        Inventory updates instantly across all POS terminals.
                    </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-slate-900">Automated Alerts</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        Low stock notifications via email/SMS automatically.
                    </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-slate-900">Multi-store</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        Manage multiple locations with centralized dashboard.
                    </p>
                </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-3 font-medium">Technologies Used:</p>
                <div className="flex flex-wrap gap-2">
                    {['Next.js 14', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Zod', 'React Hook Form', 'Vercel'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
