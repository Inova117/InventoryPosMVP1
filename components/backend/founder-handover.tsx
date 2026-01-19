// Founder Handover Component - Inventory POS
'use client'

import { useState } from 'react'

export function FounderHandover() {
    const [activeTab, setActiveTab] = useState<'product' | 'technical' | 'roadmap'>('product')

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-8 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Project Documentation Package</h2>
                <div className="flex gap-2">
                    {['product', 'technical', 'roadmap'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as 'product' | 'technical' | 'roadmap')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-8">
                {activeTab === 'product' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Product Strategy & Scope</h3>
                                <p className="text-slate-600">Retail management deliverables</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    Core Features (MoSCoW - Must Have)
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        'Real-time Inventory Sync',
                                        'POS Interface (Barcode Support)',
                                        'Multi-store Management',
                                        'Low Stock Alerts',
                                        'Sales Reporting & Analytics'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2 rounded">
                                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    User Stories
                                </h4>
                                <div className="space-y-3">
                                    {[
                                        { role: 'Cashier', action: 'Scan items quickly', benefit: 'reduce checkout time' },
                                        { role: 'Manager', action: 'View stock across stores', benefit: 'balance inventory' },
                                        { role: 'System', action: 'Auto-email suppliers', benefit: 'prevent stockouts' },
                                    ].map((story, i) => (
                                        <div key={i} className="text-sm p-3 bg-blue-50 rounded-lg border border-blue-100">
                                            <span className="font-bold text-blue-800">As a {story.role}</span>, I want to {story.action} so that I can {story.benefit}.
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Technical tab same as template but adapted if needed */}
                {activeTab === 'technical' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Technical Specifications</h3>
                                <p className="text-slate-600">Infrastructure, deployment, and security details</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-lg border border-slate-200">
                                <h4 className="font-semibold mb-2">Frontend</h4>
                                <ul className="text-sm space-y-1 text-slate-600">
                                    <li>• Next.js 14 (App Router)</li>
                                    <li>• Tailwind CSS</li>
                                    <li>• React Hook Form</li>
                                    <li>• Recharts</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-lg border border-slate-200">
                                <h4 className="font-semibold mb-2">Backend/DB</h4>
                                <ul className="text-sm space-y-1 text-slate-600">
                                    <li>• Supabase (PostgreSQL)</li>
                                    <li>• Real-time Channels</li>
                                    <li>• Row Level Security</li>
                                    <li>• Database Triggers</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-lg border border-slate-200">
                                <h4 className="font-semibold mb-2">DevOps</h4>
                                <ul className="text-sm space-y-1 text-slate-600">
                                    <li>• Vercel Deployment</li>
                                    <li>• CI/CD Pipelines</li>
                                    <li>• Automated Testing</li>
                                    <li>• Env Var Management</li>
                                </ul>
                            </div>
                        </div>
                        {/* Checklist same as template */}
                        <div className="bg-slate-900 text-slate-300 p-6 rounded-lg font-mono text-sm">
                            <div className="flex items-center gap-2 mb-4 text-green-400 border-b border-slate-700 pb-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Deployment Checklist
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-white mb-1">1. Environment Setup</div>
                                    <div className="pl-4 border-l-2 border-slate-700">Configure .env.local<br />Set Supabase secrets</div>
                                </div>
                                <div>
                                    <div className="text-white mb-1">2. Build & Optimization</div>
                                    <div className="pl-4 border-l-2 border-slate-700">Run type check<br />Build production bundle</div>
                                </div>
                                <div>
                                    <div className="text-white mb-1">3. Database Migration</div>
                                    <div className="pl-4 border-l-2 border-slate-700">Apply schema changes<br />Verify RLS policies</div>
                                </div>
                                <div>
                                    <div className="text-white mb-1">4. Go Live</div>
                                    <div className="pl-4 border-l-2 border-slate-700">Deploy to Vercel<br />Domain verification</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'roadmap' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Future Roadmap (Post-MVP)</h3>
                                <p className="text-slate-600">Recommended Next Steps</p>
                            </div>
                        </div>
                        <div className="relative border-l-2 border-slate-200 ml-4 space-y-8">
                            {[
                                { phase: 'Phase 1 (Current)', title: 'MVP Launch', date: 'Now', desc: 'Core POS, RLS security, Basic Reporting' },
                                { phase: 'Phase 2', title: 'Hardware Integration', date: '+2 Months', desc: 'Direct receipt printer & barcode scanner support via WebUSB' },
                                { phase: 'Phase 3', title: 'E-commerce Sync', date: '+4 Months', desc: 'Sync inventory with Shopify/WooCommerce' }
                            ].map((item, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-500"></div>
                                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{item.phase}</div>
                                    <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                                    <div className="text-sm text-slate-500 mb-2">{item.date}</div>
                                    <p className="text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
