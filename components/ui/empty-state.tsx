import type { LucideIcon } from 'lucide-react'
import { IconChip } from '@/components/ui/icon-chip'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description?: string
    action?: React.ReactNode
    tone?: 'muted' | 'sage'
    className?: string
}

export function EmptyState({ icon, title, description, action, tone = 'muted', className }: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center elevation-1',
                className
            )}
        >
            <IconChip icon={icon} size="xl" tone={tone} className="mb-4" />
            <h3 className="font-serif text-xl font-semibold text-foreground">{title}</h3>
            {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
            {action && <div className="mt-6">{action}</div>}
        </div>
    )
}
