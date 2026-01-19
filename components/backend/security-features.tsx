// Security Features Component
'use client'

import { useState } from 'react'

export function SecurityFeatures() {
    const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

    const features = [
        {
            id: 'rls',
            name: 'Row Level Security (RLS)',
            status: 'active',
            description: 'Users can only access their own data',
            details: 'PostgreSQL RLS policies enforce data isolation at the database level. Each query automatically filters results based on the authenticated user.',
            example: `-- Users can only see their own dashboards
CREATE POLICY "Users see own dashboards"
ON dashboards FOR SELECT
USING (auth.uid() = user_id);`
        },
        {
            id: 'validation',
            name: 'API Input Validation',
            status: 'active',
            description: 'All inputs validated with Zod schemas',
            details: 'Server-side validation ensures malicious data never reaches the database. Type-safe schemas prevent injection attacks.',
            example: `// Dashboard creation schema
const schema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  layout: z.array(z.object({
    i: z.string(),
    x: z.number(),
    y: z.number()
  }))
});`
        },
        {
            id: 'middleware',
            name: 'Auth Middleware',
            status: 'active',
            description: 'Protected routes require authentication',
            details: 'Next.js middleware checks authentication before rendering protected pages. Unauthorized users are redirected to login.',
            example: `// Protect dashboard routes
export function middleware(request) {
  const session = await getSession()
  if (!session) {
    return redirect('/login')
  }
  return next()
}`
        },
        {
            id: 'encryption',
            name: 'Data Encryption',
            status: 'active',
            description: 'All data encrypted at rest and in transit',
            details: 'Supabase provides AES-256 encryption at rest. All connections use TLS 1.3 for data in transit.',
            example: 'Automatic encryption handled by Supabase infrastructure'
        }
    ]

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Security & Data Protection</h2>
                    <p className="text-slate-600">Enterprise-grade security built-in</p>
                </div>
            </div>

            {/* Features Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Security Feature
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">

                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {features.map((feature) => (
                            <tr key={feature.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-slate-900">{feature.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        ✓ Active
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-600">{feature.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button
                                        onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        {selectedFeature === feature.id ? 'Hide' : 'View'} Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Feature Details (Expandable) */}
            {selectedFeature && (
                <div className="mt-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
                    {features.map((feature) => (
                        selectedFeature === feature.id && (
                            <div key={feature.id}>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.name}</h3>
                                <p className="text-slate-700 mb-4">{feature.details}</p>
                                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-sm text-green-400 font-mono">
                                        {feature.example}
                                    </pre>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Compliance Badges */}
            <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-3 font-medium">Compliance & Standards:</p>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-medium text-blue-700">
                        SOC 2 Type II Ready
                    </div>
                    <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-sm font-medium text-green-700">
                        GDPR Compliant
                    </div>
                    <div className="px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg text-sm font-medium text-purple-700">
                        HIPAA Compatible
                    </div>
                </div>
            </div>
        </div>
    )
}
