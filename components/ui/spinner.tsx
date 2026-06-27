import { cn } from '@/lib/utils'

export function Spinner({ className }: { className?: string }) {
    return (
        <div
            role="status"
            aria-label="loading"
            className={cn('h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent', className)}
        />
    )
}

export function PageSpinner() {
    return (
        <div className="flex items-center justify-center section-spacing">
            <Spinner />
        </div>
    )
}
