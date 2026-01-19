// API Documentation Component
'use client'

import { useState } from 'react'

export function ApiDocumentation() {
    const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)

    const endpoints = [
        {
            method: 'GET',
            path: '/api/dashboards',
            description: 'List all user dashboards',
            auth: true,
            request: null,
            response: {
                data: [
                    {
                        id: 'dashboard-1',
                        user_id: 'user-123',
                        name: 'Sales Overview',
                        layout: [{ i: 'widget-1', x: 0, y: 0 }],
                        created_at: '2024-01-15T10:00:00Z'
                    }
                ]
            }
        },
        {
            method: 'POST',
            path: '/api/dashboards',
            description: 'Create a new dashboard',
            auth: true,
            request: {
                name: 'Marketing Dashboard',
                description: 'Track campaign performance',
                layout: []
            },
            response: {
                data: {
                    id: 'dashboard-2',
                    name: 'Marketing Dashboard',
                    created_at: '2024-01-20T14:30:00Z'
                }
            }
        },
        {
            method: 'GET',
            path: '/api/widgets',
            description: 'List widgets for a dashboard',
            auth: true,
            request: null,
            response: {
                data: [
                    {
                        id: 'widget-1',
                        dashboard_id: 'dashboard-1',
                        type: 'kpi',
                        title: 'Total Revenue',
                        config: { metric: 'revenue', format: 'currency' }
                    }
                ]
            }
        },
        {
            method: 'POST',
            path: '/api/widgets',
            description: 'Add widget to dashboard',
            auth: true,
            request: {
                dashboard_id: 'dashboard-1',
                type: 'line',
                title: 'Revenue Trend',
                config: { metric: 'revenue', period: 'daily' }
            },
            response: {
                data: {
                    id: 'widget-2',
                    type: 'line',
                    created_at: '2024-01-20T15:00:00Z'
                }
            }
        },
        {
            method: 'GET',
            path: '/api/metrics',
            description: 'Fetch metric data for charts',
            auth: true,
            request: null,
            response: {
                data: [
                    { date: '2024-01-01', value: 15420 },
                    { date: '2024-01-02', value: 16230 },
                    { date: '2024-01-03', value: 14890 }
                ]
            }
        },
        {
            method: 'POST',
            path: '/api/alerts',
            description: 'Create metric alert',
            auth: true,
            request: {
                name: 'Low Revenue Alert',
                metric_name: 'revenue',
                condition: 'less_than',
                threshold: 10000,
                email_enabled: true
            },
            response: {
                data: {
                    id: 'alert-1',
                    is_active: true,
                    created_at: '2024-01-20T16:00:00Z'
                }
            }
        }
    ]

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'GET': return 'bg-blue-100 text-blue-700'
            case 'POST': return 'bg-green-100 text-green-700'
            case 'PUT': return 'bg-yellow-100 text-yellow-700'
            case 'DELETE': return 'bg-red-100 text-red-700'
            default: return 'bg-slate-100 text-slate-700'
        }
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">API Documentation</h2>
                    <p className="text-slate-600">RESTful API with automatic validation</p>
                </div>
            </div>

            {/* Endpoints List */}
            <div className="space-y-3">
                {endpoints.map((endpoint, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint.path ? null : endpoint.path)}
                            className="w-full p-4 hover:bg-slate-50 transition flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded font-mono text-sm font-semibold ${getMethodColor(endpoint.method)}`}>
                                    {endpoint.method}
                                </span>
                                <span className="font-mono text-slate-900">{endpoint.path}</span>
                                {endpoint.auth && (
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded font-medium">
                                        🔐 Auth Required
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-600">{endpoint.description}</span>
                                <svg
                                    className={`w-5 h-5 text-slate-400 transition-transform ${selectedEndpoint === endpoint.path ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        {/* Endpoint Details */}
                        {selectedEndpoint === endpoint.path && (
                            <div className="p-6 bg-slate-50 border-t border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Request */}
                                    {endpoint.request && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-700 mb-2">Request Body</h4>
                                            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                                                <pre className="text-sm text-green-400 font-mono">
                                                    {JSON.stringify(endpoint.request, null, 2)}
                                                </pre>
                                            </div>
                                        </div>
                                    )}

                                    {/* Response */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Response (200 OK)</h4>
                                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                                            <pre className="text-sm text-blue-400 font-mono">
                                                {JSON.stringify(endpoint.response, null, 2)}
                                            </pre>
                                        </div>
                                    </div>
                                </div>

                                {/* Validation Info */}
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div className="text-sm text-yellow-800">
                                            <strong>Validation:</strong> All inputs validated server-side with Zod schemas. Malformed requests return 400 with detailed error messages.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* API Stats */}
            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-4 gap-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">6</div>
                    <div className="text-sm text-slate-600">Endpoints</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">100%</div>
                    <div className="text-sm text-slate-600">Validated</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">&lt;100ms</div>
                    <div className="text-sm text-slate-600">Avg Response</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">REST</div>
                    <div className="text-sm text-slate-600">Standard</div>
                </div>
            </div>
        </div>
    )
}
