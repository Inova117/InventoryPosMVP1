'use client';

import type { CartItem } from '@/lib/services/cart';
import { Button } from '@/components/ui/button';

interface CartDisplayProps {
    items: CartItem[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
}

export function CartDisplay({
    items,
    onUpdateQuantity,
    onRemoveItem,
}: CartDisplayProps) {
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    if (items.length === 0) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
                <p className="text-slate-500 dark:text-slate-400">
                    Cart is empty. Add products to start a sale.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Cart ({items.length} items)
                </h3>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {items.map((item) => (
                    <div key={item.product.id} className="p-4 flex items-center gap-4">
                        <div className="flex-1">
                            <h4 className="font-medium text-slate-900 dark:text-slate-100">
                                {item.product.name}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                ${item.product.sell_price.toFixed(2)} each
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    onUpdateQuantity(item.product.id, item.quantity - 1)
                                }
                            >
                                -
                            </Button>
                            <span className="w-12 text-center font-medium">
                                {item.quantity}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    onUpdateQuantity(item.product.id, item.quantity + 1)
                                }
                            >
                                +
                            </Button>
                        </div>

                        <div className="w-24 text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                                ${item.subtotal.toFixed(2)}
                            </p>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400"
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t-2 border-slate-900 dark:border-slate-100 bg-slate-50 dark:bg-slate-900">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        Total
                    </span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}
