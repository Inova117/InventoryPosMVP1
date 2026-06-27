import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('animate-pulse rounded-xl bg-muted', className)} {...props} />
}

/** A KPI/overview skeleton that preserves the dashboard layout while loading. */
export function StatGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 elevation-1">
                    <div className="mb-3 flex items-center justify-between">
                        <Skeleton className="h-11 w-11 rounded-xl" />
                        <Skeleton className="h-5 w-12 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="mt-2 h-8 w-32" />
                </div>
            ))}
        </div>
    )
}

/** A generic table skeleton. */
export function TableSkeleton({ rows = 6 }: { rows?: number }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-1">
            <div className="space-y-px">
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    )
}
