'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { analyticsService } from '@/lib/services/analytics';
import type { DashboardStats, TopProduct, DailySalesData } from '@/lib/services/analytics';
import type { Product } from '@/types/mock';
import { SalesChart } from '@/components/features/sales-chart';
import dynamic from 'next/dynamic';

const CashierDashboard = dynamic(() => import('@/components/features/cashier-dashboard'), {
    loading: () => <div className="p-8"><div className="animate-pulse h-32 bg-warmth-200 rounded-2xl"></div></div>
});

export default function DashboardPage() {
    const { user } = useAuth();

    // All hooks must be at the top level
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
        if (user?.store_id) {
            loadDashboardData();
        }
    }, [user, loadDashboardData]);

    // Show cashier-specific dashboard for cashier role
    if (user?.role === 'cashier') {
        return <CashierDashboard />;
    }

    if (isLoading || !stats) {
        return (
            <div className="flex items-center justify-center section-spacing">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-sage-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in custom-scrollbar max-w-7xl">
            {/* Warm Welcome Header */}
            <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-serif font-semibold text-warmth-900 dark:text-warmth-50">
                    Welcome back, {user?.full_name?.split(' ')[0]}
                </h1>
                <p className="text-lg text-warmth-600 dark:text-warmth-400">
                    Here&apos;s what&apos;s happening with your store today
                </p>
            </div>

            {/* Stats Grid with warm cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="group bg-white dark:bg-warmth-800 rounded-2xl p-6 elevation-2 hover-lift border border-warmth-200 dark:border-warmth-700">
                    <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">💰</div>
                        <div className="px-2.5 py-1 bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400 rounded-full text-xs font-medium">
                            Today
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-warmth-600 dark:text-warmth-400">Revenue</p>
                        <p className="text-3xl font-serif font-semibold text-warmth-900 dark:text-warmth-50">
                            ${stats.todayRevenue.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="group bg-white dark:bg-warmth-800 rounded-2xl p-6 elevation-2 hover-lift border border-warmth-200 dark:border-warmth-700">
                    <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">📊</div>
                        <div className="px-2.5 py-1 bg-terracotta/10 dark:bg-terracotta/20 text-terracotta-dark dark:text-terracotta-light rounded-full text-xs font-medium">
                            Sales
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-warmth-600 dark:text-warmth-400">Today&apos;s Orders</p>
                        <p className="text-3xl font-serif font-semibold text-warmth-900 dark:text-warmth-50">
                            {stats.todaySales}
                        </p>
                    </div>
                </div>

                <div className="group bg-white dark:bg-warmth-800 rounded-2xl p-6 elevation-2 hover-lift border border-warmth-200 dark:border-warmth-700">
                    <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">📦</div>
                        {stats.lowStockCount > 0 && (
                            <div className="px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium">
                                {stats.lowStockCount} low
                            </div>
                        )}
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-warmth-600 dark:text-warmth-400">Products</p>
                        <p className="text-3xl font-serif font-semibold text-warmth-900 dark:text-warmth-50">
                            {stats.totalProducts}
                        </p>
                    </div>
                </div>

                <div className="group bg-white dark:bg-warmth-800 rounded-2xl p-6 elevation-2 hover-lift border border-warmth-200 dark:border-warmth-700">
                    <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">💎</div>
                        <div className="px-2.5 py-1 bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400 rounded-full text-xs font-medium">
                            Total
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-warmth-600 dark:text-warmth-400">Stock Value</p>
                        <p className="text-3xl font-serif font-semibold text-warmth-900 dark:text-warmth-50">
                            ${stats.totalStockValue.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Low Stock Alert with warm styling */}
            {lowStockProducts.length > 0 && (
                <div className="bg-gradient-to-br from-orange-50 to-warmth-50 dark:from-orange-950/20 dark:to-warmth-900 rounded-2xl p-6 md:p-8 border border-orange-200 dark:border-orange-900/30 elevation-2">
                    <div className="flex items-start gap-4">
                        <div className="text-3xl md:text-4xl">⚠️</div>
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-serif font-semibold text-warmth-900 dark:text-warmth-50 mb-2">
                                Low Stock Alert
                            </h3>
                            <p className="text-sm md:text-base text-warmth-600 dark:text-warmth-400 mb-4">
                                {lowStockProducts.length} {lowStockProducts.length === 1 ? 'product needs' : 'products need'} attention
                            </p>
                            <div className="space-y-2">
                                {lowStockProducts.slice(0, 3).map((product) => (
                                    <div key={product.id} className="flex items-center justify-between py-3 px-4 bg-white/60 dark:bg-warmth-800/60 rounded-xl hover-lift">
                                        <div>
                                            <p className="font-medium text-warmth-900 dark:text-warmth-100">{product.name}</p>
                                            <p className="text-sm text-warmth-600 dark:text-warmth-400">{product.sku}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                                                {product.stock} left
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sales Chart with warm styling */}
            {salesData.length > 0 && (
                <div className="bg-white dark:bg-warmth-800 rounded-2xl p-6 md:p-8 elevation-2 border border-warmth-200 dark:border-warmth-700">
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-warmth-900 dark:text-warmth-50 mb-6">
                        Sales Trend
                    </h2>
                    <SalesChart data={salesData} />
                </div>
            )}

            {/* Top Products with card-style layout */}
            {topProducts.length > 0 && (
                <div className="bg-white dark:bg-warmth-800 rounded-2xl p-6 md:p-8 elevation-2 border border-warmth-200 dark:border-warmth-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-warmth-900 dark:text-warmth-50">
                            Top Performers
                        </h2>
                        <div className="text-3xl">🏆</div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {topProducts.map((item, index) => (
                            <div
                                key={item.product.id}
                                className="group p-5 bg-warmth-50 dark:bg-warmth-900 rounded-xl hover-lift border border-warmth-200 dark:border-warmth-700"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="text-2xl font-serif font-bold text-sage-600 dark:text-sage-400">
                                        #{index + 1}
                                    </div>
                                    <div className="px-2.5 py-1 bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400 rounded-full text-xs font-medium">
                                        {item.totalSold} sold
                                    </div>
                                </div>
                                <h3 className="font-semibold text-warmth-900 dark:text-warmth-100 mb-1">
                                    {item.product.name}
                                </h3>
                                <p className="text-sm text-warmth-600 dark:text-warmth-400 mb-3">
                                    {item.product.category}
                                </p>
                                <div className="flex items-center justify-between pt-3 border-t border-warmth-200 dark:border-warmth-700">
                                    <span className="text-sm text-warmth-600 dark:text-warmth-400">Revenue</span>
                                    <span className="font-serif font-semibold text-warmth-900 dark:text-warmth-50">
                                        ${item.revenue.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions - Touch-friendly */}
            <div className="bg-gradient-to-br from-sage-50 to-warmth-50 dark:from-sage-950/20 dark:to-warmth-900 rounded-2xl p-6 md:p-8 border border-sage-200 dark:border-sage-900/30 elevation-2">
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-warmth-900 dark:text-warmth-50 mb-4">
                    Quick Actions
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <a
                        href="/dashboard/pos"
                        className="group touch-target flex items-center gap-3 px-6 py-4 bg-sage-500 hover:bg-sage-600 text-white rounded-xl button-tactile elevation-2 hover:elevation-3 hover:warm-glow"
                    >
                        <span className="text-2xl">💰</span>
                        <span className="font-medium">New Sale</span>
                    </a>
                    <a
                        href="/dashboard/inventory"
                        className="group touch-target flex items-center gap-3 px-6 py-4 bg-white dark:bg-warmth-800 hover:bg-warmth-50 dark:hover:bg-warmth-700 text-warmth-900 dark:text-warmth-100 rounded-xl button-tactile elevation-2 hover:elevation-3 border border-warmth-200 dark:border-warmth-700"
                    >
                        <span className="text-2xl">📦</span>
                        <span className="font-medium">Manage Inventory</span>
                    </a>
                    <a
                        href="/dashboard/sales"
                        className="group touch-target flex items-center gap-3 px-6 py-4 bg-white dark:bg-warmth-800 hover:bg-warmth-50 dark:hover:bg-warmth-700 text-warmth-900 dark:text-warmth-100 rounded-xl button-tactile elevation-2 hover:elevation-3 border border-warmth-200 dark:border-warmth-700"
                    >
                        <span className="text-2xl">📊</span>
                        <span className="font-medium">View Sales</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
