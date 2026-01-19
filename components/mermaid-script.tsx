// Mermaid Script Component - Add to layout or page
'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface MermaidConfig {
    startOnLoad: boolean
    theme: string
    securityLevel: string
    fontFamily: string
}

interface WindowWithMermaid extends Window {
    mermaid?: {
        initialize: (config: MermaidConfig) => void
    }
}

export function MermaidScript() {
    useEffect(() => {
        // Initialize Mermaid after script loads
        const windowWithMermaid = window as WindowWithMermaid
        if (typeof window !== 'undefined' && windowWithMermaid.mermaid) {
            windowWithMermaid.mermaid.initialize({
                startOnLoad: true,
                theme: 'default',
                securityLevel: 'loose',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif'
            })
        }
    }, [])

    return (
        <Script
            src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
            strategy="lazyOnload"
            onLoad={() => {
                const windowWithMermaid = window as WindowWithMermaid
                if (windowWithMermaid.mermaid) {
                    windowWithMermaid.mermaid.initialize({
                        startOnLoad: true,
                        theme: 'default',
                        securityLevel: 'loose',
                        fontFamily: 'ui-sans-serif, system-ui, sans-serif'
                    })
                }
            }}
        />
    )
}
