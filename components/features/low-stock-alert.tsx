'use client';

import type { Product } from '@/types/mock';
import Link from 'next/link';

interface LowStockAlertProps {
    products: Product[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
    if (products.length === 0) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <div>
                        <h3 className="font-semibold text-green-900 dark:text-green-100">
                            All Stock Levels Good
                        </h3>
                        <p className="text-sm text-green-700 dark:text-green-300">
                            No products running low on inventory
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                    <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                        Low Stock Alert ({products.length} items)
                    </h3>
                    <div className="space-y-2">
                        {products.slice(0, 5).map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between text-sm"
                            >
                                <span className="text-red-800 dark:text-red-200">
                                    {product.name}
                                </span>
                                <span className="font-semibold text-red-900 dark:text-red-100">
                                    {product.stock} units left
                                </span>
                            </div>
                        ))}
                    </div>
                    {products.length > 5 && (
                        <Link
                            href="/dashboard/inventory"
                            className="text-sm text-red-700 dark:text-red-300 hover:underline mt-2 inline-block"
                        >
                            View all {products.length} low stock items →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
