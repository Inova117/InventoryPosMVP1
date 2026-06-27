'use client';

import Link from 'next/link';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import type { Product } from '@/types/mock';
import { useT } from '@/components/providers/language-provider';

interface LowStockAlertProps {
    products: Product[];
}

export function LowStockAlert({ products }: LowStockAlertProps) {
    const { t } = useT();

    if (products.length === 0) {
        return (
            <div className="rounded-2xl border border-sage-200 bg-sage-50 p-4 dark:border-sage-900/30 dark:bg-sage-900/20">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-sage-600 dark:text-sage-400" />
                    <div>
                        <h3 className="font-semibold text-sage-800 dark:text-sage-200">{t('lowStock.allGoodTitle')}</h3>
                        <p className="text-sm text-sage-700/80 dark:text-sage-300/80">{t('lowStock.allGoodDesc')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/30 dark:bg-orange-900/20">
            <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-orange-600 dark:text-orange-400" />
                <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-orange-900 dark:text-orange-100">
                        {t('lowStock.alertTitle')} · {products.length}
                    </h3>
                    <div className="space-y-2">
                        {products.slice(0, 5).map((product) => (
                            <div key={product.id} className="flex items-center justify-between text-sm">
                                <span className="text-orange-800 dark:text-orange-200">{product.name}</span>
                                <span className="font-semibold text-orange-900 dark:text-orange-100">
                                    {t('lowStock.unitsLeft', { count: product.stock })}
                                </span>
                            </div>
                        ))}
                    </div>
                    {products.length > 5 && (
                        <Link href="/dashboard/inventory" className="mt-2 inline-block text-sm text-orange-700 hover:underline dark:text-orange-300">
                            {t('lowStock.viewInventory')} →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
