'use client';

import { Printer, ShoppingCart, User } from 'lucide-react';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import type { Sale } from '@/types/mock';
import { formatCurrency } from '@/lib/utils';

export interface SaleDetailItem {
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

interface SaleDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sale: Sale | null;
    items: SaleDetailItem[];
    cashierName?: string;
    loading?: boolean;
}

export function SaleDetailDialog({ open, onOpenChange, sale, items, cashierName, loading }: SaleDetailDialogProps) {
    const { t, lang } = useT();
    if (!sale) return null;

    const locale = lang === 'es' ? 'es-MX' : 'en-US';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                        {t('checkout.orderNumber')} #{sale.id.slice(-6).toUpperCase()}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                        {new Date(sale.created_at).toLocaleDateString(locale, {
                            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                    </span>
                    {cashierName && (
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <User className="h-4 w-4" /> {cashierName}
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-8"><Spinner /></div>
                ) : (
                    <div className="space-y-2 rounded-xl border border-border bg-card p-4">
                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t('checkout.itemsLabel')}</p>
                        <div className="max-h-52 space-y-1.5 overflow-y-auto custom-scrollbar">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-foreground">
                                        <span className="text-muted-foreground">{item.quantity}×</span> {item.name}
                                    </span>
                                    <span className="font-medium tabular-nums">{formatCurrency(item.subtotal, lang)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 space-y-1 border-t border-border pt-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('sales.total')}</span>
                                <span className="font-semibold tabular-nums">{formatCurrency(sale.total, lang)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('sales.paid')}</span>
                                <span className="tabular-nums">{formatCurrency(sale.amount_received, lang)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('sales.change')}</span>
                                <span className="tabular-nums">{formatCurrency(sale.change_given, lang)}</span>
                            </div>
                        </div>
                    </div>
                )}

                <Button variant="outline" className="w-full" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" />
                    {t('checkout.printReceipt')}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
