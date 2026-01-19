'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { analyticsService } from '@/lib/services/analytics';
import type { DashboardStats, TopProduct, DailySalesData } from '@/lib/services/analytics';
import type { Product } from '@/types/mock';
import { StatCard } from '@/components/features/stat-card';
import { LowStockAlert } from '@/components/features/low-stock-alert';
import { SalesChart } from '@/components/features/sales-chart';
import CashierDashboard from '@/components/features/cashier-dashboard';

export default function DashboardPage() {
    const { user } = useAuth();

    // Show cashier-specific dashboard for cashier role
    if (user?.role === 'cashier') {
        return <CashierDashboard />;
    }

    // Owner dashboard below
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

    if (isLoading || !stats) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-100"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Dashboard Overview
                </h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Welcome back, {user?.full_name}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Today's Revenue"
                    value={`$${stats.todayRevenue.toFixed(2)}`}
                    icon="💰"
                />
                <StatCard
                    title="Today's Sales"
                    value={stats.todaySales}
                    icon="📊"
                />
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon="📦"
                />
                <StatCard
                    title="Stock Value"
                    value={`$${stats.totalStockValue.toFixed(2)}`}
                    icon="💎"
                />
            </div>

            {/* Low Stock Alert */}
            <LowStockAlert products={lowStockProducts} />

            {/* Sales Chart */}
            {salesData.length > 0 && <SalesChart data={salesData} />}

            {/* Top Products */}
            {topProducts.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                        Top Selling Products
                    </h2>
                    <div className="space-y-3">
                        {topProducts.map((item, index) => (
                            <div
                                key={item.product.id}
                                className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold text-slate-400">
                                        #{index + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-medium text-slate-900 dark:text-slate-100">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {item.totalSold} units sold
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                                        ${item.revenue.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        revenue
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-3">
                <a
                    href="/dashboard/inventory"
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-slate-900 dark:hover:border-slate-100 transition-colors"
                >
                    <div className="text-3xl mb-2">📦</div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        Manage Inventory
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Add, edit, or remove products
                    </p>
                </a>

                <a
                    href="/dashboard/pos"
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-slate-900 dark:hover:border-slate-100 transition-colors"
                >
                    <div className="text-3xl mb-2">💰</div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        Point of Sale
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Process new sales transactions
                    </p>
                </a>

                <a
                    href="/backend"
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-slate-900 dark:hover:border-slate-100 transition-colors"
                >
                    <div className="text-3xl mb-2">🔧</div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        Backend & Architecture
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        View mock database and system design
                    </p>
                </a>
            </div>
        </div>
    );
}
