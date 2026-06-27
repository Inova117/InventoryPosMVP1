'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    badge?: { text: string; variant?: BadgeProps['variant'] };
    trend?: {
        value: string;
        isPositive: boolean;
    };
    className?: string;
}

export function StatCard({ title, value, icon: Icon, badge, trend, className }: StatCardProps) {
    return (
        <div
            className={cn(
                'group rounded-2xl border border-border bg-card p-6 shadow-warm transition-all hover:shadow-warm-lg hover:-translate-y-0.5',
                className
            )}
        >
            <div className="mb-3 flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                </span>
                {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
            </div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{value}</p>
            {trend && (
                <div
                    className={cn(
                        'mt-2 inline-flex items-center gap-1 text-sm font-medium',
                        trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    )}
                >
                    {trend.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {trend.value}
                </div>
            )}
        </div>
    );
}
