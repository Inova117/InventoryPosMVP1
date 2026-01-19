'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { salesService } from '@/lib/services/sales';
import type { Sale } from '@/types/mock';
import Link from 'next/link';

export default function CashierDashboard() {
    const { user } = useAuth();
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMySales();
    }, []);

    const loadMySales = async () => {
        try {
            if (!user?.store_id) return;
            const allSales = await salesService.getSalesByStore(user.store_id);
            // Filter only this cashier's sales
            const mySales = allSales.filter((sale: Sale) => sale.cashier_id === user?.id);
            setSales(mySales);
        } catch (error) {
            console.error('Error loading sales:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate today's sales
    const today = new Date().toDateString();
    const todaySales = sales.filter(
        (sale) => new Date(sale.created_at).toDateString() === today
    );

    const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    const todayCount = todaySales.length;
    const averageSale = todayCount > 0 ? todayRevenue / todayCount : 0;

    // Get session start time (when they logged in)
    const sessionStart = user?.created_at
        ? new Date(user.created_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'N/A';

    // Get last sale time
    const lastSale = todaySales.length > 0 ? todaySales[todaySales.length - 1] : null;
    const lastSaleTime = lastSale
        ? new Date(lastSale.created_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
        : 'No sales yet';

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-32 bg-slate-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">My Shift</h1>
                <p className="text-slate-600 mt-1">
                    Welcome back, {user?.full_name} 👋
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
                {/* Today's Sales Count */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-blue-100 text-sm font-medium">Today's Sales</div>
                        <div className="text-3xl">💰</div>
                    </div>
                    <div className="text-3xl font-bold">{todayCount}</div>
                    <div className="text-blue-100 text-sm mt-1">
                        {todayCount === 1 ? 'transaction' : 'transactions'}
                    </div>
                </div>

                {/* Today's Revenue */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-green-100 text-sm font-medium">Revenue Today</div>
                        <div className="text-3xl">💵</div>
                    </div>
                    <div className="text-3xl font-bold">${todayRevenue.toFixed(2)}</div>
                    <div className="text-green-100 text-sm mt-1">total earned</div>
                </div>

                {/* Average Sale */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-purple-100 text-sm font-medium">Average Sale</div>
                        <div className="text-3xl">📊</div>
                    </div>
                    <div className="text-3xl font-bold">${averageSale.toFixed(2)}</div>
                    <div className="text-purple-100 text-sm mt-1">per transaction</div>
                </div>

                {/* Shift Info */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-orange-100 text-sm font-medium">Shift Started</div>
                        <div className="text-3xl">⏰</div>
                    </div>
                    <div className="text-3xl font-bold">{sessionStart}</div>
                    <div className="text-orange-100 text-sm mt-1">last sale: {lastSaleTime}</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <Link
                        href="/dashboard/pos"
                        className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition group"
                    >
                        <div className="text-4xl">🛒</div>
                        <div>
                            <div className="font-semibold text-slate-900 group-hover:text-blue-700">
                                Start New Sale
                            </div>
                            <div className="text-sm text-slate-600">Process a transaction</div>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/sales"
                        className="flex items-center gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition group"
                    >
                        <div className="text-4xl">📝</div>
                        <div>
                            <div className="font-semibold text-slate-900 group-hover:text-purple-700">
                                My Sales History
                            </div>
                            <div className="text-sm text-slate-600">View your transactions</div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Sales */}
            {todaySales.length > 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">
                        Recent Sales Today
                    </h2>
                    <div className="space-y-3">
                        {todaySales.slice(-5).reverse().map((sale) => (
                            <div
                                key={sale.id}
                                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                            >
                                <div>
                                    <div className="font-medium text-slate-900">
                                        Sale #{sale.id.substring(0, 8)}
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        {new Date(sale.created_at).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-green-600">
                                        ${sale.total.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        Change: ${sale.change_given.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {todaySales.length === 0 && (
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        Ready to Start Your Shift!
                    </h3>
                    <p className="text-slate-600 mb-6">
                        No sales yet today. Head to the POS to process your first transaction.
                    </p>
                    <Link
                        href="/dashboard/pos"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Go to POS →
                    </Link>
                </div>
            )}
        </div>
    );
}
