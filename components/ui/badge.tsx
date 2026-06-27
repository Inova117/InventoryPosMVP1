import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300",
                neutral: "bg-muted text-muted-foreground",
                terracotta: "bg-terracotta/10 text-terracotta-dark dark:bg-terracotta/20 dark:text-terracotta-light",
                success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                warning: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
