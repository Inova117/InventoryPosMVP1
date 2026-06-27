'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Inbox } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { salesService } from '@/lib/services/sales';
import type { Sale } from '@/types/mock';
import { Button } from '@/components/ui/button';

type Filter = 'all' | 'today' | 'week';

export default function CashierSalesPage() {
    const { user } = useAuth();
    const { t, lang } = useT();
    const locale = lang === 'es' ? 'es-MX' : 'en-US';
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<Filter>('all');

    const loadMySales = useCallback(async () => {
        try {
            if (!user?.store_id) return;
            const allSales = await salesService.getSalesByStore(user.store_id);
            setSales(allSales.filter((sale: Sale) => sale.cashier_id === user?.id));
        } catch (error) {
            console.error('Error loading sales:', error);
        } finally {
            setLoading(false);
        }
    }, [user?.store_id, user?.id]);

    useEffect(() => {
        loadMySales();
    }, [loadMySales]);

    const getFilteredSales = () => {
        const now = new Date();
        const today = now.toDateString();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        switch (filter) {
            case 'today':
                return sales.filter((sale) => new Date(sale.created_at).toDateString() === today);
            case 'week':
                return sales.filter((sale) => new Date(sale.created_at) >= weekAgo);
            default:
                return sales;
        }
    };

    const filteredSales = getFilteredSales();
    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    const averageSale = filteredSales.length > 0 ? totalRevenue / filteredSales.length : 0;

    const filters: { key: Filter; label: string }[] = [
        { key: 'today', label: t('common.today') },
        { key: 'week', label: t('common.thisWeek') },
        { key: 'all', label: t('common.allTime') },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center section-spacing">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl animate-fade-in space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{t('cashierSales.title')}</h1>
                    <p className="mt-1 text-muted-foreground">{t('cashierSales.subtitle')}</p>
                </div>
                <div className="flex gap-2">
                    {filters.map((f) => (
                        <Button
                            key={f.key}
                            variant={filter === f.key ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilter(f.key)}
                        >
                            {f.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
                    <div className="mb-1 text-sm text-muted-foreground">{t('sales.totalSales')}</div>
                    <div className="font-serif text-2xl font-semibold text-foreground">{filteredSales.length}</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
                    <div className="mb-1 text-sm text-muted-foreground">{t('sales.totalRevenue')}</div>
                    <div className="font-serif text-2xl font-semibold text-sage-700 dark:text-sage-300">${totalRevenue.toFixed(2)}</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
                    <div className="mb-1 text-sm text-muted-foreground">{t('sales.averageSale')}</div>
                    <div className="font-serif text-2xl font-semibold text-foreground">${averageSale.toFixed(2)}</div>
                </div>
            </div>

            {filteredSales.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center elevation-1">
                    <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Inbox className="h-8 w-8" />
                    </span>
                    <h3 className="mb-2 font-serif text-xl font-semibold">{t('sales.noSales')}</h3>
                    <p className="mb-6 text-muted-foreground">{t('sales.noSalesDesc')}</p>
                    <Link href="/dashboard/pos">
                        <Button>{t('sales.goToPos')}</Button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-1">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-border bg-muted/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('cashierSales.dateTime')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.id')}</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.total')}</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.paid')}</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.change')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {[...filteredSales]
                                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                    .map((sale) => (
                                        <tr key={sale.id} className="transition-colors hover:bg-muted/40">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="text-sm font-medium text-foreground">
                                                    {new Date(sale.created_at).toLocaleDateString(locale, { month: 'short', day: 'numeric' })}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(sale.created_at).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-muted-foreground">#{sale.id.slice(-6).toUpperCase()}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-foreground tabular-nums">${sale.total.toFixed(2)}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-sage-700 dark:text-sage-300 tabular-nums">${sale.amount_received.toFixed(2)}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-muted-foreground tabular-nums">${sale.change_given.toFixed(2)}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {filteredSales.length > 0 && (
                <div className="rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-warmth-50 p-6 dark:border-sage-900/30 dark:from-sage-950/20 dark:to-warmth-900">
                    <h3 className="mb-4 font-serif text-lg font-semibold">{t('cashierSales.performance')}</h3>
                    <div className="grid gap-4 text-sm md:grid-cols-2">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">{t('cashierSales.highestSale')}</span>
                            <span className="font-semibold text-foreground">${Math.max(...filteredSales.map((s) => s.total)).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">{t('cashierSales.lowestSale')}</span>
                            <span className="font-semibold text-foreground">${Math.min(...filteredSales.map((s) => s.total)).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">{t('cashierSales.totalChange')}</span>
                            <span className="font-semibold text-foreground">${filteredSales.reduce((sum, s) => sum + s.change_given, 0).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">{t('cashierSales.transactions')}</span>
                            <span className="font-semibold text-foreground">{filteredSales.length}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
