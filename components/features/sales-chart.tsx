'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DailySalesData } from '@/lib/services/analytics';
import { useT } from '@/components/providers/language-provider';

interface SalesChartProps {
    data: DailySalesData[];
}

interface ChartTooltipProps {
    active?: boolean;
    payload?: { value?: number }[];
    label?: string;
}

const SAGE = '#7B896F';

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
    if (!active || !payload || !payload.length) return null;
    const value = payload[0]?.value;
    return (
        <div className="rounded-xl border border-border bg-card px-3 py-2 elevation-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-serif text-base font-semibold text-foreground">
                ${typeof value === 'number' ? value.toFixed(2) : '0.00'}
            </p>
        </div>
    );
}

export function SalesChart({ data }: SalesChartProps) {
    const { lang } = useT();
    const locale = lang === 'es' ? 'es-MX' : 'en-US';

    const formattedData = data.map((item) => ({
        ...item,
        displayDate: new Date(item.date).toLocaleDateString(locale, { month: 'short', day: 'numeric' }),
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={formattedData} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
                <defs>
                    <linearGradient id="sageGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={SAGE} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={SAGE} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-warmth-200 dark:text-warmth-700" vertical={false} />
                <XAxis dataKey="displayDate" stroke="currentColor" className="text-warmth-400" tickLine={false} axisLine={false} style={{ fontSize: '12px' }} />
                <YAxis stroke="currentColor" className="text-warmth-400" tickLine={false} axisLine={false} style={{ fontSize: '12px' }} tickFormatter={(value) => `$${value}`} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: SAGE, strokeOpacity: 0.3 }} />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={SAGE}
                    strokeWidth={2.5}
                    fill="url(#sageGradient)"
                    activeDot={{ r: 5, fill: SAGE }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
