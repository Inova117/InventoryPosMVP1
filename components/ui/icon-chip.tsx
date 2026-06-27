import type { LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const chipVariants = cva('inline-flex shrink-0 items-center justify-center transition-transform', {
    variants: {
        size: {
            sm: 'h-9 w-9 rounded-lg [&_svg]:h-4 [&_svg]:w-4',
            md: 'h-11 w-11 rounded-xl [&_svg]:h-5 [&_svg]:w-5',
            lg: 'h-12 w-12 rounded-xl [&_svg]:h-6 [&_svg]:w-6',
            xl: 'h-14 w-14 rounded-2xl [&_svg]:h-7 [&_svg]:w-7',
        },
        tone: {
            primary: 'bg-primary/10 text-primary',
            sage: 'bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300',
            terracotta: 'bg-terracotta/10 text-terracotta-dark dark:bg-terracotta/20 dark:text-terracotta-light',
            success: 'bg-success-soft text-success-soft-foreground',
            warning: 'bg-warning-soft text-warning-soft-foreground',
            danger: 'bg-danger-soft text-danger-soft-foreground',
            muted: 'bg-muted text-muted-foreground',
            solid: 'bg-primary text-primary-foreground',
        },
    },
    defaultVariants: { size: 'md', tone: 'primary' },
})

export interface IconChipProps extends VariantProps<typeof chipVariants> {
    icon: LucideIcon
    className?: string
}

export function IconChip({ icon: Icon, size, tone, className }: IconChipProps) {
    return (
        <span className={cn(chipVariants({ size, tone }), className)}>
            <Icon />
        </span>
    )
}
