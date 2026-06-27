import type { Metadata } from 'next'
import { Inter, Crimson_Pro } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { DemoBanner } from '@/components/demo-banner'
import { BackendFloatButton } from '@/components/backend-float-button'
import { AuthProvider } from '@/components/providers/auth-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-sans',
})

const crimson = Crimson_Pro({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-serif',
})

export const metadata: Metadata = {
    title: 'Zerion POS — Inventario y Punto de Venta',
    description:
        'Sistema de punto de venta e inventario en tiempo real: cobra en segundos, evita quiebres de stock y mide tus ventas. Demo de Zerion Studio.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className={`${inter.variable} ${crimson.variable}`} suppressHydrationWarning>
            <body className="font-sans">
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    <LanguageProvider>
                        <AuthProvider>
                            <DemoBanner />
                            {children}
                            <BackendFloatButton />
                            <Toaster />
                        </AuthProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
