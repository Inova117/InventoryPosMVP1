'use client';

import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import type { CartItem } from '@/lib/services/cart';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface CartDisplayProps {
    items: CartItem[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
}

export function CartDisplay({ items, onUpdateQuantity, onRemoveItem }: CartDisplayProps) {
    const { t, lang } = useT();
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center elevation-1">
                <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <ShoppingCart className="h-7 w-7" />
                </span>
                <p className="font-medium text-foreground">{t('cart.empty')}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t('cart.emptyHint')}</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-2">
            <div className="border-b border-border p-4">
                <h3 className="flex items-center gap-2 font-serif text-lg font-semibold">
                    <ShoppingCart className="h-5 w-5 text-sage-600 dark:text-sage-400" />
                    {t('cart.title')} · {items.length} {t('cart.items')}
                </h3>
            </div>

            <div className="divide-y divide-border">
                {items.map((item) => (
                    <div
                        key={item.product.id}
                        className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4"
                    >
                        <div className="min-w-0 flex-1">
                            <h4 className="truncate font-medium text-foreground">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">{formatCurrency(item.product.sell_price, lang)}</p>
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                            <div className="flex items-center gap-1.5">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    aria-label="-1"
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-10 text-center font-medium tabular-nums">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    aria-label="+1"
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <p className="min-w-[5rem] text-right font-serif font-semibold text-foreground tabular-nums">
                                {formatCurrency(item.subtotal, lang)}
                            </p>

                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label={t('cart.remove')}
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-danger hover:bg-danger-soft hover:text-danger-soft-foreground"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-border bg-muted p-4">
                <span className="text-lg font-semibold text-foreground">{t('cart.total')}</span>
                <span className="font-serif text-2xl font-semibold text-foreground tabular-nums">{formatCurrency(total, lang)}</span>
            </div>
        </div>
    );
}
