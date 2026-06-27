'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { IconChip } from '@/components/ui/icon-chip';
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
                'group rounded-2xl border border-border bg-card p-6 elevation-1 transition-all hover:-translate-y-0.5 hover:elevation-3',
                className
            )}
        >
            <div className="mb-3 flex items-start justify-between">
                <IconChip icon={Icon} tone="primary" className="group-hover:scale-105" />
                {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
            </div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{value}</p>
            {trend && (
                <div
                    className={cn(
                        'mt-2 inline-flex items-center gap-1 text-sm font-medium',
                        trend.isPositive ? 'text-success' : 'text-danger'
                    )}
                >
                    {trend.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {trend.value}
                </div>
            )}
        </div>
    );
}
