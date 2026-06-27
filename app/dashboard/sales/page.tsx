'use client';

import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ShoppingCart, UserCog } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { salesService } from '@/lib/services/sales';
import type { Sale } from '@/types/mock';
import { Button } from '@/components/ui/button';

const CashierSalesPage = dynamic(() => import('@/components/features/cashier-sales'), {
    loading: () => <div className="p-8"><div className="h-32 animate-pulse rounded-2xl bg-warmth-200" /></div>
});

export default function SalesPage() {
    const { user } = useAuth();
    const { t, lang } = useT();
    const locale = lang === 'es' ? 'es-MX' : 'en-US';

    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    const loadSales = useCallback(async () => {
        if (!user?.store_id) return;
        try {
            const data = await salesService.getSalesByStore(user.store_id);
            setSales(data);
        } catch (error) {
            console.error('Error loading sales:', error);
        } finally {
            setLoading(false);
        }
    }, [user?.store_id]);

    useEffect(() => {
        loadSales();
    }, [loadSales]);

    if (user?.role === 'cashier') {
        return <CashierSalesPage />;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center section-spacing">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

    return (
        <div className="max-w-7xl animate-fade-in space-y-6">
            <div>
                <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{t('sales.title')}</h1>
                <p className="mt-1 text-muted-foreground">{t('sales.subtitle')}</p>
            </div>

            {sales.length === 0 ? (
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center elevation-1">
                    <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <ShoppingCart className="h-8 w-8" />
                    </span>
                    <h3 className="mb-2 font-serif text-xl font-semibold">{t('sales.noSales')}</h3>
                    <p className="mb-6 text-muted-foreground">{t('sales.noSalesDesc')}</p>
                    <Link href="/dashboard/pos">
                        <Button>{t('sales.goToPos')}</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
                            <div className="mb-1 text-sm text-muted-foreground">{t('sales.totalSales')}</div>
                            <div className="font-serif text-2xl font-semibold text-foreground">{sales.length}</div>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
                            <div className="mb-1 text-sm text-muted-foreground">{t('sales.totalRevenue')}</div>
                            <div className="font-serif text-2xl font-semibold text-sage-700 dark:text-sage-300">${totalRevenue.toFixed(2)}</div>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-6 shadow-warm">
                            <div className="mb-1 text-sm text-muted-foreground">{t('sales.averageSale')}</div>
                            <div className="font-serif text-2xl font-semibold text-foreground">${(totalRevenue / sales.length).toFixed(2)}</div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-1">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="border-b border-border bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.date')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.id')}</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.cashier')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.total')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.paid')}</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.change')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {sales.map((sale) => (
                                        <tr key={sale.id} className="transition-colors hover:bg-muted/40">
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground">
                                                {new Date(sale.created_at).toLocaleDateString(locale, {
                                                    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                                                })}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-muted-foreground">
                                                {sale.id.slice(-6).toUpperCase()}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                                                <span className="inline-flex items-center gap-1.5">
                                                    {sale.cashier_id.includes('owner') ? <UserCog className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                                                    {sale.cashier_id.includes('owner') ? t('login.owner') : t('login.cashier')}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-foreground tabular-nums">${sale.total.toFixed(2)}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-sage-700 dark:text-sage-300 tabular-nums">${sale.amount_received.toFixed(2)}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-muted-foreground tabular-nums">${sale.change_given.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
