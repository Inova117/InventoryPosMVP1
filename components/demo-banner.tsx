// Demo Mode Welcome Strip
'use client'

import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { useT } from '@/components/providers/language-provider'

const DISMISS_KEY = 'zerion_pos_demo_banner_dismissed'

export function DemoBanner() {
    const { t } = useT()
    // Show by default in the demo unless explicitly disabled
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'
    const [dismissed, setDismissed] = useState(true)

    useEffect(() => {
        setDismissed(localStorage.getItem(DISMISS_KEY) === 'true')
    }, [])

    if (!isDemoMode || dismissed) return null

    const dismiss = () => {
        setDismissed(true)
        localStorage.setItem(DISMISS_KEY, 'true')
    }

    return (
        <div className="border-b border-sage-200 bg-gradient-to-r from-sage-50 to-warmth-50 text-sage-900 dark:border-sage-900/30 dark:from-sage-950/30 dark:to-warmth-900 dark:text-sage-100">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-sage-600 dark:text-sage-400" />
                    <span className="font-medium">{t('demoBanner.title')}</span>
                    <span className="hidden text-sage-700/80 dark:text-sage-300/80 sm:inline">— {t('demoBanner.desc')}</span>
                </div>
                <button
                    onClick={dismiss}
                    aria-label={t('demoBanner.dismiss')}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-sage-700 transition-colors hover:bg-sage-100 dark:text-sage-300 dark:hover:bg-sage-900/40"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
