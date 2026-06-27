'use client';

import { useState, useEffect } from 'react';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

interface CheckoutModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    total: number;
    onComplete: (amountReceived: number) => Promise<void>;
}

export function CheckoutModal({ open, onOpenChange, total, onComplete }: CheckoutModalProps) {
    const { t, lang } = useT();
    const [amountReceived, setAmountReceived] = useState(total);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    // Reset the input each time the modal opens
    useEffect(() => {
        if (open) {
            setAmountReceived(total);
            setError('');
            setIsProcessing(false);
        }
    }, [open, total]);

    const change = amountReceived - total;
    const isValidPayment = amountReceived >= total;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidPayment) return;
        setIsProcessing(true);
        setError('');
        try {
            await onComplete(amountReceived);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('checkout.insufficient'));
            setIsProcessing(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('checkout.title')}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="rounded-xl bg-muted p-4">
                        <p className="text-sm text-muted-foreground">{t('checkout.totalToPay')}</p>
                        <p className="font-serif text-3xl font-semibold text-foreground tabular-nums">{formatCurrency(total, lang)}</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount_received">{t('checkout.amountReceived')}</Label>
                        <Input
                            id="amount_received"
                            type="number"
                            step="0.01"
                            min={total}
                            value={amountReceived}
                            onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
                            className="h-12 text-lg"
                            autoFocus
                        />
                    </div>

                    {isValidPayment && change > 0 && (
                        <div className="rounded-xl border border-sage-200 bg-sage-50 p-4 dark:border-sage-900/30 dark:bg-sage-900/20">
                            <p className="text-sm font-medium text-sage-700 dark:text-sage-300">{t('checkout.change')}</p>
                            <p className="font-serif text-2xl font-semibold text-sage-800 dark:text-sage-200 tabular-nums">{formatCurrency(change, lang)}</p>
                        </div>
                    )}

                    {!isValidPayment && (
                        <div className="rounded-xl border border-danger/20 bg-danger-soft p-3 text-sm text-danger-soft-foreground">
                            {t('checkout.insufficient')}
                        </div>
                    )}

                    {error && (
                        <div className="rounded-xl border border-danger/20 bg-danger-soft p-3 text-sm text-danger-soft-foreground">
                            {error}
                        </div>
                    )}

                    <DialogFooter className="pt-2">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={!isValidPayment || isProcessing} className="flex-1">
                            {isProcessing ? t('checkout.processing') : t('checkout.complete')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
