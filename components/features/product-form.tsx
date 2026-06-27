'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/types/mock';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductFormProps {
    product?: Product | null;
    onSubmit: (data: ProductFormData) => Promise<void>;
    onCancel: () => void;
}

export interface ProductFormData {
    sku: string;
    name: string;
    category: string;
    stock: number;
    buy_price: number;
    sell_price: number;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
    const { t } = useT();
    const [formData, setFormData] = useState<ProductFormData>({
        sku: '',
        name: '',
        category: '',
        stock: 0,
        buy_price: 0,
        sell_price: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                sku: product.sku,
                name: product.name,
                category: product.category,
                stock: product.stock,
                buy_price: product.buy_price,
                sell_price: product.sell_price,
            });
        }
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err instanceof Error ? err.message : t('inventory.deleteError'));
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof ProductFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="rounded-2xl border border-border bg-card p-6 elevation-2">
            <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">
                {product ? t('inventory.editProduct') : t('inventory.newProduct')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="sku">{t('inventory.sku')}</Label>
                        <Input id="sku" type="text" required value={formData.sku} onChange={(e) => handleChange('sku', e.target.value)} placeholder="CFE-ESP-250" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">{t('inventory.name')}</Label>
                        <Input id="name" type="text" required value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">{t('inventory.category')}</Label>
                        <Input id="category" type="text" required value={formData.category} onChange={(e) => handleChange('category', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock">{t('inventory.stock')}</Label>
                        <Input id="stock" type="number" min="0" required value={formData.stock} onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="buy_price">{t('inventory.buyPrice')} ($)</Label>
                        <Input id="buy_price" type="number" step="0.01" min="0" required value={formData.buy_price} onChange={(e) => handleChange('buy_price', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sell_price">{t('inventory.sellPrice')} ($)</Label>
                        <Input id="sell_price" type="number" step="0.01" min="0" required value={formData.sell_price} onChange={(e) => handleChange('sell_price', parseFloat(e.target.value) || 0)} />
                    </div>
                </div>

                {error && (
                    <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? t('checkout.processing') : t('common.save')}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        {t('common.cancel')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
