// Floating Button to Access Backend Documentation
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code2 } from 'lucide-react'
import { useT } from '@/components/providers/language-provider'

export function BackendFloatButton() {
    const pathname = usePathname()
    const { t } = useT()

    // Don't show on the backend page itself
    if (pathname === '/backend') return null

    return (
        <Link
            href="/backend"
            className="group fixed bottom-20 right-5 z-40 md:bottom-6 md:right-6"
            title={t('common.viewArchitecture')}
            aria-label={t('common.viewArchitecture')}
        >
            <div className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-warm-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-warm-xl group-hover:scale-105 focus-ring">
                <Code2 className="h-5 w-5" />
                <span className="hidden text-sm font-semibold sm:inline">{t('common.backend')}</span>
            </div>
        </Link>
    )
}
