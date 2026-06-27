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
import { Badge } from '@/components/ui/badge';

const CashierDashboard = dynamic(() => import('@/components/features/cashier-dashboard'), {
    loading: () => <div className="p-8"><div className="h-32 animate-pulse rounded-2xl bg-warmth-200" /></div>
});

export default function DashboardPage() {
    const { user } = useAuth();
    const { t } = useT();

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
            <div className="flex items-center justify-center section-spacing">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl animate-fade-in space-y-8">
            {/* Welcome header */}
            <div className="space-y-2">
                <h1 className="font-serif text-4xl font-semibold text-warmth-900 dark:text-warmth-50 md:text-5xl">
                    {t('dashboard.welcome', { name: user?.full_name?.split(' ')[0] ?? '' })}
                </h1>
                <p className="text-lg text-warmth-600 dark:text-warmth-400">{t('dashboard.subtitle')}</p>
            </div>

            {/* Stats grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title={t('dashboard.revenue')}
                    value={`$${stats.todayRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    badge={{ text: t('dashboard.today'), variant: 'default' }}
                />
                <StatCard
                    title={t('dashboard.todayOrders')}
                    value={stats.todaySales}
                    icon={BarChart3}
                    badge={{ text: t('dashboard.salesBadge'), variant: 'terracotta' }}
                />
                <StatCard
                    title={t('dashboard.products')}
                    value={stats.totalProducts}
                    icon={Package}
                    badge={stats.lowStockCount > 0 ? { text: t('dashboard.lowBadge', { count: stats.lowStockCount }), variant: 'warning' } : undefined}
                />
                <StatCard
                    title={t('dashboard.stockValue')}
                    value={`$${stats.totalStockValue.toFixed(2)}`}
                    icon={Gem}
                    badge={{ text: t('dashboard.totalBadge'), variant: 'default' }}
                />
            </div>

            {/* Low stock alert */}
            {lowStockProducts.length > 0 && (
                <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-warmth-50 p-6 elevation-2 dark:border-orange-900/30 dark:from-orange-950/20 dark:to-warmth-900 md:p-8">
                    <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                            <AlertTriangle className="h-6 w-6" />
                        </span>
                        <div className="flex-1">
                            <h3 className="mb-2 font-serif text-xl font-semibold text-warmth-900 dark:text-warmth-50 md:text-2xl">
                                {t('dashboard.lowStockAlert')}
                            </h3>
                            <p className="mb-4 text-sm text-warmth-600 dark:text-warmth-400 md:text-base">
                                {lowStockProducts.length === 1
                                    ? t('dashboard.lowStockOne', { count: lowStockProducts.length })
                                    : t('dashboard.lowStockMany', { count: lowStockProducts.length })}
                            </p>
                            <div className="space-y-2">
                                {lowStockProducts.slice(0, 3).map((product) => (
                                    <div key={product.id} className="flex items-center justify-between rounded-xl bg-card/60 px-4 py-3">
                                        <div>
                                            <p className="font-medium text-warmth-900 dark:text-warmth-100">{product.name}</p>
                                            <p className="text-sm text-warmth-600 dark:text-warmth-400">{product.sku}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                            {product.stock} {t('dashboard.left')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sales chart */}
            {salesData.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 elevation-2 md:p-8">
                    <h2 className="mb-6 flex items-center gap-2 font-serif text-2xl font-semibold text-warmth-900 dark:text-warmth-50 md:text-3xl">
                        <TrendingUp className="h-6 w-6 text-sage-600 dark:text-sage-400" />
                        {t('dashboard.salesTrend')}
                    </h2>
                    <SalesChart data={salesData} />
                </div>
            )}

            {/* Top performers */}
            {topProducts.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 elevation-2 md:p-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-warmth-900 dark:text-warmth-50 md:text-3xl">
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
                                <h3 className="mb-1 font-semibold text-warmth-900 dark:text-warmth-100">{item.product.name}</h3>
                                <p className="mb-3 text-sm text-warmth-600 dark:text-warmth-400">{item.product.category}</p>
                                <div className="flex items-center justify-between border-t border-border pt-3">
                                    <span className="text-sm text-warmth-600 dark:text-warmth-400">{t('common.revenue')}</span>
                                    <span className="font-serif font-semibold text-warmth-900 dark:text-warmth-50">${item.revenue.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick actions */}
            <div className="rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-warmth-50 p-6 elevation-2 dark:border-sage-900/30 dark:from-sage-950/20 dark:to-warmth-900 md:p-8">
                <h3 className="mb-4 font-serif text-xl font-semibold text-warmth-900 dark:text-warmth-50 md:text-2xl">
                    {t('dashboard.quickActions')}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        href="/dashboard/pos"
                        className="group flex items-center gap-3 rounded-xl bg-primary px-6 py-4 text-primary-foreground button-tactile elevation-2 hover:warm-glow hover:elevation-3 touch-target"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="font-medium">{t('dashboard.newSale')}</span>
                    </Link>
                    <Link
                        href="/dashboard/inventory"
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 text-warmth-900 button-tactile elevation-2 hover:bg-warmth-50 hover:elevation-3 dark:text-warmth-100 dark:hover:bg-warmth-700 touch-target"
                    >
                        <Package className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                        <span className="font-medium">{t('dashboard.manageInventory')}</span>
                    </Link>
                    <Link
                        href="/dashboard/sales"
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4 text-warmth-900 button-tactile elevation-2 hover:bg-warmth-50 hover:elevation-3 dark:text-warmth-100 dark:hover:bg-warmth-700 touch-target"
                    >
                        <BarChart3 className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                        <span className="font-medium">{t('dashboard.viewSales')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
