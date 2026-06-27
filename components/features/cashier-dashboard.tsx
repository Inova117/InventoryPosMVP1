'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ShoppingCart, DollarSign, BarChart3, Clock, ClipboardList, Rocket } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { salesService } from '@/lib/services/sales';
import type { Sale } from '@/types/mock';
import { StatCard } from '@/components/features/stat-card';
import { Button } from '@/components/ui/button';

export default function CashierDashboard() {
    const { user } = useAuth();
    const { t, lang } = useT();
    const locale = lang === 'es' ? 'es-MX' : 'en-US';
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

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

    const today = new Date().toDateString();
    const todaySales = sales.filter((sale) => new Date(sale.created_at).toDateString() === today);
    const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    const todayCount = todaySales.length;
    const averageSale = todayCount > 0 ? todayRevenue / todayCount : 0;

    const sessionStart = user?.created_at
        ? new Date(user.created_at).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
        : '—';

    if (loading) {
        return (
            <div className="flex items-center justify-center section-spacing">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl animate-fade-in space-y-6">
            <div>
                <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{t('cashier.myShift')}</h1>
                <p className="mt-1 text-muted-foreground">{t('dashboard.welcome', { name: user?.full_name?.split(' ')[0] ?? '' })}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title={t('cashier.todaysSales')} value={todayCount} icon={ShoppingCart} badge={{ text: t('common.today'), variant: 'default' }} />
                <StatCard title={t('cashier.revenueToday')} value={`$${todayRevenue.toFixed(2)}`} icon={DollarSign} badge={{ text: t('common.today'), variant: 'default' }} />
                <StatCard title={t('cashier.averageSale')} value={`$${averageSale.toFixed(2)}`} icon={BarChart3} />
                <StatCard title={t('cashier.shiftStarted')} value={sessionStart} icon={Clock} />
            </div>

            {/* Quick actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <Link
                    href="/dashboard/pos"
                    className="group flex items-center gap-4 rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-warmth-50 p-5 hover-lift dark:border-sage-900/30 dark:from-sage-950/20 dark:to-warmth-900"
                >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <ShoppingCart className="h-6 w-6" />
                    </span>
                    <div>
                        <div className="font-semibold text-foreground">{t('cashier.startNewSale')}</div>
                        <div className="text-sm text-muted-foreground">{t('cashier.startNewSaleDesc')}</div>
                    </div>
                </Link>

                <Link
                    href="/dashboard/sales"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover-lift"
                >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                        <ClipboardList className="h-6 w-6" />
                    </span>
                    <div>
                        <div className="font-semibold text-foreground">{t('cashier.mySalesHistory')}</div>
                        <div className="text-sm text-muted-foreground">{t('cashier.mySalesHistoryDesc')}</div>
                    </div>
                </Link>
            </div>

            {/* Recent sales */}
            {todaySales.length > 0 ? (
                <div className="rounded-2xl border border-border bg-card p-6 elevation-1">
                    <h2 className="mb-4 font-serif text-xl font-semibold">{t('cashier.recentSales')}</h2>
                    <div className="space-y-3">
                        {todaySales.slice(-5).reverse().map((sale) => (
                            <div key={sale.id} className="flex items-center justify-between rounded-xl bg-muted p-4">
                                <div>
                                    <div className="font-medium text-foreground">{t('checkout.orderNumber')} #{sale.id.slice(-6).toUpperCase()}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {new Date(sale.created_at).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-serif font-semibold text-sage-700 dark:text-sage-300">${sale.total.toFixed(2)}</div>
                                    <div className="text-xs text-muted-foreground">{t('sales.change')}: ${sale.change_given.toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center elevation-1">
                    <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                        <Rocket className="h-8 w-8" />
                    </span>
                    <h3 className="mb-2 font-serif text-xl font-semibold">{t('cashier.noSalesYet')}</h3>
                    <p className="mb-6 text-muted-foreground">{t('cashier.noSalesYetDesc')}</p>
                    <Link href="/dashboard/pos">
                        <Button>{t('cashier.startNewSale')}</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
