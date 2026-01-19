'use client';

import { useEffect, useState } from 'react';
import { salesService } from '@/lib/services/sales';
import type { Sale, SaleItem } from '@/types/mock';

export default function SalesPage() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSales();
    }, []);

    const loadSales = async () => {
        try {
            const data = await salesService.getAll();
            setSales(data);
        } catch (error) {
            console.error('Error loading sales:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
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
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Sales History</h1>
                <p className="text-slate-600 mt-2">View all completed transactions</p>
            </div>

            {sales.length === 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No Sales Yet</h3>
                    <p className="text-slate-600 mb-6">
                        Sales will appear here once you process transactions in the POS
                    </p>
                    <a
                        href="/dashboard/pos"
                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to POS
                    </a>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <div className="text-sm text-slate-600 mb-1">Total Sales</div>
                            <div className="text-2xl font-bold text-slate-900">{sales.length}</div>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <div className="text-sm text-slate-600 mb-1">Total Revenue</div>
                            <div className="text-2xl font-bold text-green-600">
                                ${sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <div className="text-sm text-slate-600 mb-1">Average Sale</div>
                            <div className="text-2xl font-bold text-blue-600">
                                ${(sales.reduce((sum, sale) => sum + sale.total, 0) / sales.length).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Sales List */}
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                        Sale ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                                        Cashier
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
                                {sales.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-slate-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                            {formatDate(sale.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600">
                                            {sale.id.substring(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {sale.cashier_id.includes('owner') ? '👤 Owner' : '💼 Cashier'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-slate-900">
                                            ${sale.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600">
                                            ${sale.amount_received.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-600">
                                            ${sale.change_given.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
