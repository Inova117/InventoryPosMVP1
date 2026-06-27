// Floating Button to Access Backend Documentation
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code2 } from 'lucide-react'

export function BackendFloatButton() {
    const pathname = usePathname()

    // Don't show on the backend page itself
    if (pathname === '/backend') return null

    return (
        <Link
            href="/backend"
            className="group fixed bottom-20 right-5 z-40 md:bottom-6 md:right-6"
            title="Ver arquitectura y backend"
            aria-label="Ver arquitectura y backend"
        >
            <div className="flex items-center gap-2 rounded-full bg-sage-600 px-5 py-3 text-white shadow-warm-lg transition-all duration-300 hover:bg-sage-700 hover:shadow-warm-xl group-hover:scale-105">
                <Code2 className="h-5 w-5" />
                <span className="hidden text-sm font-semibold sm:inline">Backend</span>
            </div>
        </Link>
    )
}
