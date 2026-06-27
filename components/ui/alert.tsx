import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva('rounded-xl border p-3 text-sm', {
    variants: {
        variant: {
            danger: 'border-danger/25 bg-danger-soft text-danger-soft-foreground',
            warning: 'border-warning/25 bg-warning-soft text-warning-soft-foreground',
            success: 'border-success/25 bg-success-soft text-success-soft-foreground',
            info: 'border-sage-200 bg-sage-50 text-sage-800 dark:border-sage-900/30 dark:bg-sage-900/20 dark:text-sage-200',
        },
    },
    defaultVariants: { variant: 'danger' },
})

export interface AlertProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, role = 'alert', ...props }: AlertProps) {
    return <div role={role} className={cn(alertVariants({ variant }), className)} {...props} />
}
