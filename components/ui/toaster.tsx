'use client'

import { Toaster as SonnerToaster } from "sonner"
import { useTheme } from "next-themes"

export function Toaster() {
    const { theme } = useTheme()
    return (
        <SonnerToaster
            theme={(theme as "light" | "dark" | "system") ?? "system"}
            position="top-right"
            toastOptions={{
                classNames: {
                    toast: "rounded-xl border border-border bg-card text-card-foreground elevation-3 font-sans",
                    title: "font-medium",
                    description: "text-muted-foreground",
                    success: "[&_[data-icon]]:text-success",
                    error: "[&_[data-icon]]:text-danger",
                },
            }}
        />
    )
}
