import { cn } from '@/lib/utils'

/**
 * Bespoke Zerion POS brand system — a single source of truth for the mark used
 * on the landing, login and in-app header so every surface reads as one product.
 * The glyph is a geometric "Z" monogram with a warm "point-of-sale" terminal dot.
 */

export function ZerionMark({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            {/* Z frame */}
            <path d="M9 9 H22.5" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M21.5 10 L10.5 22" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.5 23 H21" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
            {/* point-of-sale terminal dot */}
            <circle cx="24.6" cy="22.6" r="2" fill="currentColor" />
        </svg>
    )
}

type TileSize = 'xs' | 'sm' | 'md' | 'lg'

const TILE: Record<TileSize, { box: string; mark: string }> = {
    xs: { box: 'h-7 w-7 rounded-lg', mark: 'h-4 w-4' },
    sm: { box: 'h-9 w-9 rounded-lg', mark: 'h-5 w-5' },
    md: { box: 'h-11 w-11 rounded-xl', mark: 'h-6 w-6' },
    lg: { box: 'h-16 w-16 rounded-2xl', mark: 'h-9 w-9' },
}

export function ZerionTile({ size = 'md', className }: { size?: TileSize; className?: string }) {
    // eslint-disable-next-line security/detect-object-injection
    const s = TILE[size]
    return (
        <span
            className={cn(
                'inline-flex shrink-0 items-center justify-center bg-gradient-to-br from-sage-500 to-sage-700 text-cream shadow-warm ring-1 ring-inset ring-white/15',
                s.box,
                className
            )}
        >
            <ZerionMark className={s.mark} />
        </span>
    )
}

export function ZerionWordmark({ className }: { className?: string }) {
    return (
        <span className={cn('font-serif text-xl font-semibold leading-none tracking-tight text-foreground', className)}>
            Zerion
            <span className="ml-1.5 align-middle font-sans text-[0.55em] font-semibold uppercase tracking-[0.22em] text-sage-600 dark:text-sage-400">
                POS
            </span>
        </span>
    )
}

export function ZerionLogo({
    size = 'md',
    className,
    wordmarkClassName,
}: {
    size?: TileSize
    className?: string
    wordmarkClassName?: string
}) {
    return (
        <span className={cn('inline-flex items-center gap-2.5', className)}>
            <ZerionTile size={size} />
            <ZerionWordmark className={wordmarkClassName} />
        </span>
    )
}
