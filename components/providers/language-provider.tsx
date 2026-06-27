'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { es } from '@/lib/i18n/dictionaries/es'
import { en } from '@/lib/i18n/dictionaries/en'

export type Lang = 'es' | 'en'

const STORAGE_KEY = 'zerion_pos_lang'

type TFunction = (path: string, vars?: Record<string, string | number>) => string

interface LanguageContextType {
    lang: Lang
    setLang: (lang: Lang) => void
    toggle: () => void
    t: TFunction
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function resolve(dict: unknown, path: string): string {
    const value = path.split('.').reduce<unknown>((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
            // eslint-disable-next-line security/detect-object-injection
            return (acc as Record<string, unknown>)[key]
        }
        return undefined
    }, dict)
    return typeof value === 'string' ? value : path
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>('es')

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
        if (stored === 'es' || stored === 'en') setLangState(stored)
    }, [])

    useEffect(() => {
        document.documentElement.lang = lang
    }, [lang])

    const setLang = useCallback((next: Lang) => {
        setLangState(next)
        localStorage.setItem(STORAGE_KEY, next)
    }, [])

    const toggle = useCallback(() => {
        setLangState((prev) => {
            const next = prev === 'es' ? 'en' : 'es'
            localStorage.setItem(STORAGE_KEY, next)
            return next
        })
    }, [])

    const t = useCallback<TFunction>(
        (path, vars) => {
            let str = resolve(lang === 'es' ? es : en, path)
            if (vars) {
                for (const [key, val] of Object.entries(vars)) {
                    str = str.split(`{${key}}`).join(String(val))
                }
            }
            return str
        },
        [lang]
    )

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useT() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useT must be used within a LanguageProvider')
    }
    return context
}
