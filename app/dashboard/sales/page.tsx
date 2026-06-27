'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ShoppingCart, UserCog, Receipt, BarChart3, DollarSign, Search } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { salesService } from '@/lib/services/sales';
import { productsService } from '@/lib/services/products';
import { mockDb } from '@/lib/mock-db';
import type { Sale, Profile, Product } from '@/types/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/features/stat-card';
import { EmptyState } from '@/components/ui/empty-state';
import { TableSkeleton } from '@/components/ui/skeleton';
import { SaleDetailDialog, type SaleDetailItem } from '@/components/features/sale-detail-dialog';
import { formatCurrency } from '@/lib/utils';

const CashierSalesPage = dynamic(() => import('@/components/features/cashier-sales'), {
    loading: () => <div className="p-8"><div className="h-32 animate-pulse rounded-2xl bg-muted" /></div>
});

type Filter = 'all' | 'today' | 'week' | 'month';

export default function SalesPage() {
    const { user } = useAuth();
    const { t, lang } = useT();
    const locale = lang === 'es' ? 'es-MX' : 'en-US';

    const [sales, setSales] = useState<Sale[]>([]);
    const [profiles, setProfiles] = useState<Record<string, Profile>>({});
    const [products, setProducts] = useState<Record<string, Product>>({});
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<Filter>('all');
    const [search, setSearch] = useState('');

    const [selected, setSelected] = useState<Sale | null>(null);
    const [detailItems, setDetailItems] = useState<SaleDetailItem[]>([]);
    const [detailLoading, setDetailLoading] = useState(false);

    const loadSales = useCallback(async () => {
        if (!user?.store_id) return;
        try {
            const [data, profs, prods] = await Promise.all([
                salesService.getSalesByStore(user.store_id),
                mockDb.getTable('profiles'),
                productsService.getAll(user.store_id),
            ]);
            setSales(data);
            setProfiles(Object.fromEntries(profs.map((p) => [p.id, p])));
            setProducts(Object.fromEntries(prods.map((p) => [p.id, p])));
        } catch (error) {
            console.error('Error loading sales:', error);
        } finally {
            setLoading(false);
        }
    }, [user?.store_id]);

    useEffect(() => {
        loadSales();
    }, [loadSales]);

    const filteredSales = useMemo(() => {
        const now = Date.now();
        const day = 24 * 60 * 60 * 1000;
        const today = new Date().toDateString();
        return sales.filter((sale) => {
            const created = new Date(sale.created_at);
            const inRange =
                filter === 'all' ? true :
                filter === 'today' ? created.toDateString() === today :
                filter === 'week' ? now - created.getTime() <= 7 * day :
                now - created.getTime() <= 30 * day;
            const matchesSearch = search === '' || sale.id.slice(-6).toUpperCase().includes(search.toUpperCase());
            return inRange && matchesSearch;
        });
    }, [sales, filter, search]);

    const openSale = async (sale: Sale) => {
        setSelected(sale);
        setDetailLoading(true);
        setDetailItems([]);
        try {
            const items = await salesService.getItemsBySale(sale.id);
            setDetailItems(
                items.map((it) => ({
                    name: products[it.product_id]?.name ?? t('sales.unknownProduct'),
                    quantity: it.quantity,
                    unitPrice: it.unit_price,
                    subtotal: it.subtotal,
                }))
            );
        } catch {
            setDetailItems([]);
        } finally {
            setDetailLoading(false);
        }
    };

    if (user?.role === 'cashier') {
        return <CashierSalesPage />;
    }

    if (loading) {
        return (
            <div className="max-w-7xl space-y-6">
                <div className="h-9 w-40 animate-pulse rounded-xl bg-muted" />
                <div className="grid gap-4 md:grid-cols-3">
                    {[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />)}
                </div>
                <TableSkeleton rows={6} />
            </div>
        );
    }

    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    const averageSale = filteredSales.length > 0 ? totalRevenue / filteredSales.length : 0;

    const filters: { key: Filter; label: string }[] = [
        { key: 'today', label: t('common.today') },
        { key: 'week', label: t('common.thisWeek') },
        { key: 'month', label: t('common.thisMonth') },
        { key: 'all', label: t('common.allTime') },
    ];

    const cashierLabel = (id: string) => {
        // eslint-disable-next-line security/detect-object-injection
        const profile = profiles[id];
        if (profile) return profile.full_name;
        return id.includes('owner') ? t('login.owner') : t('login.cashier');
    };

    return (
        <div className="max-w-7xl animate-fade-in space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{t('sales.title')}</h1>
                    <p className="mt-1 text-muted-foreground">{t('sales.subtitle')}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {filters.map((f) => (
                        <Button key={f.key} variant={filter === f.key ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f.key)}>
                            {f.label}
                        </Button>
                    ))}
                </div>
            </div>

            {sales.length === 0 ? (
                <EmptyState
                    icon={ShoppingCart}
                    title={t('sales.noSales')}
                    description={t('sales.noSalesDesc')}
                    action={<Link href="/dashboard/pos"><Button>{t('sales.goToPos')}</Button></Link>}
                />
            ) : (
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <StatCard title={t('sales.totalSales')} value={filteredSales.length} icon={Receipt} />
                        <StatCard title={t('sales.totalRevenue')} value={formatCurrency(totalRevenue, lang)} icon={DollarSign} badge={{ text: t('common.revenue'), variant: 'default' }} />
                        <StatCard title={t('sales.averageSale')} value={formatCurrency(averageSale, lang)} icon={BarChart3} />
                    </div>

                    <div className="relative max-w-sm">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder={t('sales.searchPlaceholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {filteredSales.length === 0 ? (
                        <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground elevation-1">
                            {t('sales.noResults')}
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-1">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="border-b border-border bg-muted/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.date')}</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.id')}</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.cashier')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.total')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.paid')}</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">{t('sales.change')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {filteredSales.map((sale) => {
                                            const isOwner = profiles[sale.cashier_id]?.role === 'owner' || sale.cashier_id.includes('owner');
                                            return (
                                                <tr
                                                    key={sale.id}
                                                    onClick={() => openSale(sale)}
                                                    className="cursor-pointer transition-colors hover:bg-muted/40"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground">
                                                        {new Date(sale.created_at).toLocaleDateString(locale, {
                                                            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                                                        })}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-muted-foreground">
                                                        {sale.id.slice(-6).toUpperCase()}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            {isOwner ? <UserCog className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                                                            {cashierLabel(sale.cashier_id)}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-foreground tabular-nums">{formatCurrency(sale.total, lang)}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-sage-700 dark:text-sage-300 tabular-nums">{formatCurrency(sale.amount_received, lang)}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-muted-foreground tabular-nums">{formatCurrency(sale.change_given, lang)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <SaleDetailDialog
                open={selected !== null}
                onOpenChange={(o) => !o && setSelected(null)}
                sale={selected}
                items={detailItems}
                cashierName={selected ? cashierLabel(selected.cashier_id) : undefined}
                loading={detailLoading}
            />
        </div>
    );
}
