import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DemoBanner } from '@/components/demo-banner'
import { BackendFloatButton } from '@/components/backend-float-button'
import { AuthProvider } from '@/components/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Analytics Dashboard - Demo',
    description: 'Enterprise analytics platform with real-time insights',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <DemoBanner />
                    {children}
                    <BackendFloatButton />
                </AuthProvider>
            </body>
        </html>
    )
}
