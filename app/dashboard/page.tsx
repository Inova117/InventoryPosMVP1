'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { DollarSign, BarChart3, Package, Gem, AlertTriangle, Trophy, ShoppingCart, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { analyticsService } from '@/lib/services/analytics';
import type { DashboardStats, TopProduct, DailySalesData } from '@/lib/services/analytics';
import type { Product } from '@/types/mock';
import { SalesChart } from '@/components/features/sales-chart';
import { StatCard } from '@/components/features/stat-card';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconChip } from '@/components/ui/icon-chip';
import { StatGridSkeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatCompactCurrency } from '@/lib/utils';

const CashierDashboard = dynamic(() => import('@/components/features/cashier-dashboard'), {
    loading: () => <div className="p-8"><div className="h-32 animate-pulse rounded-2xl bg-muted" /></div>
});

function trendFrom(today: number, yesterday: number | undefined): { value: string; isPositive: boolean } | undefined {
    if (yesterday === undefined) return undefined;
    if (yesterday === 0) {
        if (today === 0) return undefined;
        return { value: '+100%', isPositive: true };
    }
    const pct = ((today - yesterday) / yesterday) * 100;
    return { value: `${pct >= 0 ? '+' : ''}${pct.toFixed(0)}%`, isPositive: pct >= 0 };
}

export default function DashboardPage() {
    const { user } = useAuth();
    const { t, lang } = useT();

    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
    const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
    const [salesData, setSalesData] = useState<DailySalesData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadDashboardData = useCallback(async () => {
        if (!user?.store_id) return;
        setIsLoading(true);
        try {
            const [dashboardStats, lowStock, top, last7Days] = await Promise.all([
                analyticsService.getDashboardStats(user.store_id),
                analyticsService.getLowStockProducts(user.store_id),
                analyticsService.getTopProducts(user.store_id),
                analyticsService.getLast7DaysSales(user.store_id),
            ]);
            setStats(dashboardStats);
            setLowStockProducts(lowStock);
            setTopProducts(top);
            setSalesData(last7Days);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user?.store_id]);

    useEffect(() => {
        if (user?.store_id) loadDashboardData();
    }, [user, loadDashboardData]);

    if (user?.role === 'cashier') {
        return <CashierDashboard />;
    }

    if (isLoading || !stats) {
        return (
            <div className="max-w-7xl space-y-8">
                <div className="space-y-2">
                    <div className="h-10 w-72 animate-pulse rounded-xl bg-muted" />
                    <div className="h-5 w-96 max-w-full animate-pulse rounded-lg bg-muted" />
                </div>
                <StatGridSkeleton />
                <div className="h-80 animate-pulse rounded-2xl bg-muted" />
            </div>
        );
    }

    const yesterdayRevenue = salesData.length >= 2 ? salesData[salesData.length - 2]?.revenue : undefined;
    const yesterdaySales = salesData.length >= 2 ? salesData[salesData.length - 2]?.sales : undefined;

    return (
        <div className="max-w-7xl animate-fade-in space-y-8">
            {/* Welcome header */}
            <div className="relative">
                <div aria-hidden className="pointer-events-none absolute -inset-x-8 -top-12 h-44 bg-mesh opacity-70" />
                <div className="relative space-y-2">
                    <h1 className="font-serif text-4xl font-semibold text-foreground md:text-5xl">
                        {t('dashboard.welcome', { name: user?.full_name?.split(' ')[0] ?? '' })}
                    </h1>
                    <p className="text-lg text-muted-foreground">{t('dashboard.subtitle')}</p>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title={t('dashboard.revenue')}
                    value={formatCurrency(stats.todayRevenue, lang)}
                    icon={DollarSign}
                    badge={{ text: t('dashboard.today'), variant: 'default' }}
                    trend={trendFrom(stats.todayRevenue, yesterdayRevenue)}
                />
                <StatCard
                    title={t('dashboard.todayOrders')}
                    value={stats.todaySales}
                    icon={BarChart3}
                    badge={{ text: t('dashboard.salesBadge'), variant: 'terracotta' }}
                    trend={trendFrom(stats.todaySales, yesterdaySales)}
                />
                <StatCard
                    title={t('dashboard.products')}
                    value={stats.totalProducts}
                    icon={Package}
                    badge={stats.lowStockCount > 0 ? { text: t('dashboard.lowBadge', { count: stats.lowStockCount }), variant: 'warning' } : { text: t('dashboard.healthy'), variant: 'success' }}
                />
                <StatCard
                    title={t('dashboard.stockValue')}
                    value={formatCompactCurrency(stats.totalStockValue, lang)}
                    icon={Gem}
                    badge={{ text: t('dashboard.totalBadge'), variant: 'default' }}
                />
            </div>

            {/* Low stock alert */}
            {lowStockProducts.length > 0 && (
                <Card tone="panel" padding="lg" className="border-warning/25 bg-warning-soft/50">
                    <div className="flex items-start gap-4">
                        <IconChip icon={AlertTriangle} size="lg" tone="warning" />
                        <div className="flex-1">
                            <h3 className="mb-2 font-serif text-xl font-semibold text-foreground md:text-2xl">
                                {t('dashboard.lowStockAlert')}
                            </h3>
                            <p className="mb-4 text-sm text-warning-soft-foreground md:text-base">
                                {lowStockProducts.length === 1
                                    ? t('dashboard.lowStockOne', { count: lowStockProducts.length })
                                    : t('dashboard.lowStockMany', { count: lowStockProducts.length })}
                            </p>
                            <div className="space-y-2">
                                {lowStockProducts.slice(0, 3).map((product) => (
                                    <div key={product.id} className="flex items-center justify-between rounded-xl bg-card/70 px-4 py-3">
                                        <div>
                                            <p className="font-medium text-foreground">{product.name}</p>
                                            <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
                                        </div>
                                        <span className="text-sm font-semibold text-warning-soft-foreground">
                                            {product.stock} {t('dashboard.left')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {lowStockProducts.length > 3 && (
                                <Link href="/dashboard/inventory" className="mt-3 inline-flex rounded-lg text-sm font-medium text-warning-soft-foreground underline-offset-4 hover:underline focus-ring">
                                    {t('lowStock.viewInventory')} →
                                </Link>
                            )}
                        </div>
                    </div>
                </Card>
            )}

            {/* Sales chart */}
            {salesData.length > 0 && (
                <Card tone="panel" padding="lg">
                    <h2 className="mb-6 flex items-center gap-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                        <TrendingUp className="h-6 w-6 text-sage-600 dark:text-sage-400" />
                        {t('dashboard.salesTrend')}
                    </h2>
                    <SalesChart data={salesData} />
                </Card>
            )}

            {/* Top performers */}
            {topProducts.length > 0 && (
                <Card tone="panel" padding="lg">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                            <Trophy className="h-6 w-6 text-sage-600 dark:text-sage-400" />
                            {t('dashboard.topPerformers')}
                        </h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {topProducts.map((item, index) => (
                            <div
                                key={item.product.id}
                                className="group rounded-xl border border-border bg-warmth-50 p-5 hover-lift dark:bg-warmth-900"
                            >
                                <div className="mb-3 flex items-start justify-between">
                                    <span className="font-serif text-2xl font-bold text-sage-600 dark:text-sage-400">#{index + 1}</span>
                                    <Badge>{item.totalSold} {t('dashboard.sold')}</Badge>
                                </div>
                                <h3 className="mb-1 font-semibold text-foreground">{item.product.name}</h3>
                                <p className="mb-3 text-sm text-muted-foreground">{item.product.category}</p>
                                <div className="flex items-center justify-between border-t border-border pt-3">
                                    <span className="text-sm text-muted-foreground">{t('common.revenue')}</span>
                                    <span className="font-serif font-semibold text-foreground tabular-nums">{formatCurrency(item.revenue, lang)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Quick actions */}
            <div className="rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-warmth-50 p-6 elevation-1 dark:border-sage-900/30 dark:from-sage-950/20 dark:to-warmth-900 md:p-8">
                <h3 className="mb-4 font-serif text-xl font-semibold text-foreground md:text-2xl">
                    {t('dashboard.quickActions')}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/dashboard/pos"
                        className="group flex items-center gap-3 rounded-xl bg-primary px-6 py-4 text-primary-foreground button-tactile elevation-2 hover:warm-glow hover:elevation-3 touch-target focus-ring"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="font-medium">{t('dashboard.newSale')}</span>
                    </Link>
                    <Link
                        href="/dashboard/inventory"
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 text-foreground button-tactile elevation-1 hover:bg-warmth-50 hover:elevation-3 dark:hover:bg-warmth-800 touch-target focus-ring"
                    >
                        <Package className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                        <span className="font-medium">{t('dashboard.manageInventory')}</span>
                    </Link>
                    <Link
                        href="/dashboard/sales"
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 text-foreground button-tactile elevation-1 hover:bg-warmth-50 hover:elevation-3 dark:hover:bg-warmth-800 touch-target focus-ring"
                    >
                        <BarChart3 className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                        <span className="font-medium">{t('dashboard.viewSales')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
