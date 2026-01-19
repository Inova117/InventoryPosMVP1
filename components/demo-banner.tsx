// Demo Mode Banner Component
'use client'

import Link from 'next/link'

export function DemoBanner() {
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

    if (!isDemoMode) return null

    return (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
            <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-lg">🎭</span>
                    <span className="font-semibold">DEMO MODE</span>
                    <span className="hidden sm:inline">- Using realistic mock data</span>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/backend"
                        className="px-3 py-1 bg-black text-yellow-400 rounded font-semibold hover:bg-slate-900 transition flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span className="hidden sm:inline">View Backend & Security</span>
                        <span className="sm:hidden">Backend</span>
                    </Link>
                    <Link
                        href="/docs/demo-mode"
                        className="underline hover:no-underline hidden md:inline"
                    >
                        Production Mode
                    </Link>
                </div>
            </div>
        </div>
    )
}
