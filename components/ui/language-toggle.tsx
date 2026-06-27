'use client'

import { Languages } from 'lucide-react'
import { useT } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'

export function LanguageToggle({ className }: { className?: string }) {
    const { lang, toggle } = useT()
    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
            className={cn(
                'inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground touch-target',
                className
            )}
        >
            <Languages className="h-4 w-4" />
            <span className="uppercase">{lang === 'es' ? 'EN' : 'ES'}</span>
        </button>
    )
}
