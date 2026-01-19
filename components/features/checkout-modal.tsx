'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CheckoutModalProps {
    total: number;
    onComplete: (amountReceived: number) => Promise<void>;
    onCancel: () => void;
}

export function CheckoutModal({
    total,
    onComplete,
    onCancel,
}: CheckoutModalProps) {
    const [amountReceived, setAmountReceived] = useState(total);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

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
            setError(err instanceof Error ? err.message : 'Payment failed');
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-md w-full p-6 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
                    Complete Sale
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Total Amount</Label>
                        <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 py-2">
                            ${total.toFixed(2)}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="amount_received">Amount Received</Label>
                        <Input
                            id="amount_received"
                            type="number"
                            step="0.01"
                            min={total}
                            value={amountReceived}
                            onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
                            className="text-lg"
                            autoFocus
                        />
                    </div>

                    {isValidPayment && change > 0 && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <Label className="text-green-800 dark:text-green-400">
                                Change to Return
                            </Label>
                            <div className="text-2xl font-bold text-green-900 dark:text-green-300">
                                ${change.toFixed(2)}
                            </div>
                        </div>
                    )}

                    {!isValidPayment && (
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-red-800 dark:text-red-400 text-sm">
                            Amount received must be at least ${total.toFixed(2)}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-red-800 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={!isValidPayment || isProcessing}
                            className="flex-1"
                        >
                            {isProcessing ? 'Processing...' : 'Complete Sale'}
                        </Button>
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
