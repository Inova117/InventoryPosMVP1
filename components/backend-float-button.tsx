// Floating Button to Access Backend Documentation
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BackendFloatButton() {
    const pathname = usePathname()

    // Don't show on backend page itself
    if (pathname === '/backend') return null

    return (
        <Link
            href="/backend"
            className="fixed bottom-6 right-6 z-50 group"
            title="View Backend & Security Documentation"
        >
            <div className="relative">
                {/* Main Button */}
                <div className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group-hover:scale-105">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span className="font-semibold hidden sm:inline">Backend Docs</span>
                    <span className="font-semibold sm:hidden">Code</span>
                </div>

                {/* Pulse Animation */}
                <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20" />
            </div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                View Backend & Security
                <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-slate-900" />
            </div>
        </Link>
    )
}
