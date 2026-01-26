'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { salesService } from '@/lib/services/sales';
import type { Sale } from '@/types/mock';

export default function CashierSalesPage() {
    const { user } = useAuth();
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

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

    // Filter sales based on selected period
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

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-slate-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Sales History</h1>
                    <p className="text-slate-600 mt-1">View all your transactions</p>
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('today')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'today'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setFilter('week')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'week'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        This Week
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${filter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        All Time
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <div className="text-sm text-slate-600 mb-1">Total Sales</div>
                    <div className="text-2xl font-bold text-slate-900">{filteredSales.length}</div>
                    <div className="text-xs text-slate-500 mt-1">
                        {filter === 'today' ? 'today' : filter === 'week' ? 'this week' : 'all time'}
                    </div>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <div className="text-sm text-slate-600 mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
                    <div className="text-xs text-slate-500 mt-1">earned</div>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <div className="text-sm text-slate-600 mb-1">Average Sale</div>
                    <div className="text-2xl font-bold text-blue-600">${averageSale.toFixed(2)}</div>
                    <div className="text-xs text-slate-500 mt-1">per transaction</div>
                </div>
            </div>

            {/* Sales List */}
            {filteredSales.length === 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No Sales Found</h3>
                    <p className="text-slate-600 mb-6">
                        {filter === 'today'
                            ? "You haven't processed any sales today yet."
                            : filter === 'week'
                                ? "You haven't processed any sales this week."
                                : "You haven't processed any sales yet."}
                    </p>
                    <a
                        href="/dashboard/pos"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to POS
                    </a>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                    Sale ID
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                                    Paid
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">
                                    Change
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredSales
                                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                .map((sale) => (
                                    <tr key={sale.id} className="hover:bg-slate-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-slate-900">
                                                {new Date(sale.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </div>
                                            <div className="text-xs text-slate-500">{formatTime(sale.created_at)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="font-mono text-sm text-slate-600">
                                                #{sale.id.substring(0, 8)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="font-semibold text-slate-900">${sale.total.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-green-600">${sale.amount_received.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <span className="text-slate-600">${sale.change_given.toFixed(2)}</span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Personal Stats */}
            {filteredSales.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">📊 Your Performance</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Highest Sale:</span>
                            <span className="font-semibold text-slate-900">
                                ${Math.max(...filteredSales.map((s) => s.total)).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Lowest Sale:</span>
                            <span className="font-semibold text-slate-900">
                                ${Math.min(...filteredSales.map((s) => s.total)).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Total Change Given:</span>
                            <span className="font-semibold text-slate-900">
                                ${filteredSales.reduce((sum, s) => sum + s.change_given, 0).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Transactions:</span>
                            <span className="font-semibold text-slate-900">{filteredSales.length}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
