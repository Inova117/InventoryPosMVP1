'use client';

import { Pencil, Trash2, PackageOpen } from 'lucide-react';
import type { Product } from '@/types/mock';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductsListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

export function ProductsList({ products, onEdit, onDelete }: ProductsListProps) {
    const { t } = useT();

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center elevation-1">
                <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <PackageOpen className="h-7 w-7" />
                </span>
                <h3 className="font-medium text-foreground">{t('inventory.noProducts')}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t('inventory.noProductsDesc')}</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-1">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                        <tr>
                            {[t('inventory.sku'), t('inventory.name'), t('inventory.category'), t('inventory.stock'), t('inventory.buyPrice'), t('inventory.sellPrice')].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{h}</th>
                            ))}
                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('inventory.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products.map((product) => (
                            <tr key={product.id} className="transition-colors hover:bg-muted/40">
                                <td className="whitespace-nowrap px-6 py-4 font-mono text-sm font-medium text-foreground">{product.sku}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground">{product.name}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    <Badge variant={product.stock < 10 ? 'danger' : product.stock < 50 ? 'warning' : 'success'}>
                                        {product.stock}
                                    </Badge>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground tabular-nums">${product.buy_price.toFixed(2)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground tabular-nums">${product.sell_price.toFixed(2)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" aria-label={t('common.edit')} onClick={() => onEdit(product)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label={t('common.delete')}
                                            onClick={() => onDelete(product.id)}
                                            className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
