'use client';

import { CheckCircle2, Printer, Plus } from 'lucide-react';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/utils';

export interface Receipt {
    saleId: string;
    items: { name: string; quantity: number; unitPrice: number; subtotal: number }[];
    total: number;
    amountReceived: number;
    change: number;
}

interface SaleSuccessDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    receipt: Receipt | null;
    onNewSale: () => void;
}

export function SaleSuccessDialog({ open, onOpenChange, receipt, onNewSale }: SaleSuccessDialogProps) {
    const { t, lang } = useT();
    if (!receipt) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <div className="flex flex-col items-center text-center">
                    <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                        <CheckCircle2 className="h-7 w-7" />
                    </span>
                    <h2 className="font-serif text-2xl font-semibold">{t('checkout.successTitle')}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {t('checkout.orderNumber')} #{receipt.saleId.slice(-6).toUpperCase()}
                    </p>
                </div>

                {/* Change due — the headline moment */}
                <div className="rounded-2xl border border-sage-200 bg-sage-50 p-5 text-center dark:border-sage-900/30 dark:bg-sage-900/20">
                    <p className="text-sm font-medium text-sage-700 dark:text-sage-300">{t('checkout.changeDue')}</p>
                    <p className="font-serif text-5xl font-semibold text-sage-800 dark:text-sage-200 tabular-nums">
                        {formatCurrency(receipt.change, lang)}
                    </p>
                </div>

                {/* Receipt lines */}
                <div className="space-y-2 rounded-xl border border-border bg-card p-4">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t('checkout.itemsLabel')}
                    </p>
                    <div className="max-h-40 space-y-1.5 overflow-y-auto custom-scrollbar">
                        {receipt.items.map((item, i) => (
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
                            <span className="text-muted-foreground">{t('checkout.totalToPay')}</span>
                            <span className="font-semibold tabular-nums">{formatCurrency(receipt.total, lang)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t('checkout.paidLabel')}</span>
                            <span className="tabular-nums">{formatCurrency(receipt.amountReceived, lang)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                        <Printer className="h-4 w-4" />
                        {t('checkout.printReceipt')}
                    </Button>
                    <Button className="flex-1" onClick={onNewSale}>
                        <Plus className="h-4 w-4" />
                        {t('checkout.newSale')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
