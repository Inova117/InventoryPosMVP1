import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type Lang = 'es' | 'en'

function localeFor(lang: Lang): string {
    return lang === 'es' ? 'es-MX' : 'en-US'
}

/**
 * Locale-aware money formatting with thousands separators and a universal "$" symbol.
 * Real software never renders raw `n.toFixed(2)` — this keeps every amount consistent
 * across the landing, dashboard, POS and receipts in both languages.
 */
export function formatCurrency(amount: number, lang: Lang = 'es'): string {
    const value = Number.isFinite(amount) ? amount : 0
    return (
        '$' +
        new Intl.NumberFormat(localeFor(lang), {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value)
    )
}

/** Compact money for tight spaces: $1.2k, $86.4k, $1.3M. */
export function formatCompactCurrency(amount: number, lang: Lang = 'es'): string {
    const value = Number.isFinite(amount) ? amount : 0
    if (Math.abs(value) < 1000) return formatCurrency(value, lang)
    return (
        '$' +
        new Intl.NumberFormat(localeFor(lang), {
            notation: 'compact',
            maximumFractionDigits: 1,
        }).format(value)
    )
}

/** Locale-aware integer/decimal formatting with thousands separators. */
export function formatNumber(value: number, lang: Lang = 'es'): string {
    const v = Number.isFinite(value) ? value : 0
    return new Intl.NumberFormat(localeFor(lang)).format(v)
}
