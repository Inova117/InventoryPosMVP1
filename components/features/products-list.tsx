'use client';

import { useMemo, useState } from 'react';
import { Pencil, Trash2, PackageOpen, Search, ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import type { Product } from '@/types/mock';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { EmptyState } from '@/components/ui/empty-state';
import { categoryAccent } from '@/lib/categories';
import { formatCurrency, cn } from '@/lib/utils';

interface ProductsListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    onAdd?: () => void;
}

type SortKey = 'name' | 'category' | 'stock' | 'sell_price';
type SortDir = 'asc' | 'desc';

export function ProductsList({ products, onEdit, onDelete, onAdd }: ProductsListProps) {
    const { t, lang } = useT();
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortDir, setSortDir] = useState<SortDir>('asc');

    const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))).sort(), [products]);

    const visible = useMemo(() => {
        const q = query.toLowerCase();
        const filtered = products.filter((p) => {
            const matchesQuery = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
            const matchesCategory = category === 'all' || p.category === category;
            return matchesQuery && matchesCategory;
        });
        const dir = sortDir === 'asc' ? 1 : -1;
        return [...filtered].sort((a, b) => {
            // eslint-disable-next-line security/detect-object-injection
            const av = a[sortKey];
            // eslint-disable-next-line security/detect-object-injection
            const bv = b[sortKey];
            if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
            return String(av).localeCompare(String(bv), lang === 'es' ? 'es' : 'en') * dir;
        });
    }, [products, query, category, sortKey, sortDir, lang]);

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    if (products.length === 0) {
        return (
            <EmptyState
                icon={PackageOpen}
                title={t('inventory.noProducts')}
                description={t('inventory.noProductsDesc')}
                action={onAdd ? <Button onClick={onAdd}>{t('inventory.addProduct')}</Button> : undefined}
            />
        );
    }

    const SortHeader = ({ label, k, align = 'left' }: { label: string; k: SortKey; align?: 'left' | 'right' }) => (
        <th className={cn('px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground', align === 'right' ? 'text-right' : 'text-left')}>
            <button
                onClick={() => toggleSort(k)}
                className={cn('inline-flex items-center gap-1 rounded transition-colors hover:text-foreground focus-ring', align === 'right' && 'flex-row-reverse')}
            >
                {label}
                {sortKey === k ? (
                    sortDir === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                ) : (
                    <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
                )}
            </button>
        </th>
    );

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={t('inventory.searchPlaceholder')}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={category} onChange={(e) => setCategory(e.target.value)} className="sm:w-56">
                    <option value="all">{t('inventory.allCategories')}</option>
                    {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </Select>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-1">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('inventory.sku')}</th>
                                <SortHeader label={t('inventory.name')} k="name" />
                                <SortHeader label={t('inventory.category')} k="category" />
                                <SortHeader label={t('inventory.stock')} k="stock" />
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('inventory.buyPrice')}</th>
                                <SortHeader label={t('inventory.sellPrice')} k="sell_price" align="right" />
                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('inventory.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {visible.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted-foreground">{t('inventory.noResults')}</td>
                                </tr>
                            ) : (
                                visible.map((product) => {
                                    const accent = categoryAccent(product.category);
                                    return (
                                        <tr key={product.id} className="transition-colors hover:bg-muted/40">
                                            <td className="whitespace-nowrap px-6 py-4 font-mono text-sm font-medium text-foreground">{product.sku}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">{product.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-medium', accent.chip)}>{product.category}</span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                <Badge variant={product.stock < 10 ? 'danger' : product.stock < 50 ? 'warning' : 'success'}>
                                                    {product.stock}
                                                </Badge>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-muted-foreground tabular-nums">{formatCurrency(product.buy_price, lang)}</td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-foreground tabular-nums">{formatCurrency(product.sell_price, lang)}</td>
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
                                                        className="text-danger hover:bg-danger-soft hover:text-danger-soft-foreground"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
