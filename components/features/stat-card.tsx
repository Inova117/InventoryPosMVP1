'use client';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                        {value}
                    </p>
                    {trend && (
                        <p
                            className={`text-sm mt-2 ${trend.isPositive
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                                }`}
                        >
                            {trend.value}
                        </p>
                    )}
                </div>
                <div className="text-4xl">{icon}</div>
            </div>
        </div>
    );
}
