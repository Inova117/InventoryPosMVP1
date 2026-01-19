'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/types/mock';
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
            setError(err instanceof Error ? err.message : 'Failed to save product');
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof ProductFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
                {product ? 'Edit Product' : 'Create New Product'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                            id="sku"
                            type="text"
                            required
                            value={formData.sku}
                            onChange={(e) => handleChange('sku', e.target.value)}
                            placeholder="PROD-001"
                        />
                    </div>

                    <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Wireless Mouse"
                        />
                    </div>

                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            type="text"
                            required
                            value={formData.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            placeholder="Electronics"
                        />
                    </div>

                    <div>
                        <Label htmlFor="stock">Stock Quantity</Label>
                        <Input
                            id="stock"
                            type="number"
                            min="0"
                            required
                            value={formData.stock}
                            onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="buy_price">Buy Price ($)</Label>
                        <Input
                            id="buy_price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={formData.buy_price}
                            onChange={(e) => handleChange('buy_price', parseFloat(e.target.value) || 0)}
                        />
                    </div>

                    <div>
                        <Label htmlFor="sell_price">Sell Price ($)</Label>
                        <Input
                            id="sell_price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={formData.sell_price}
                            onChange={(e) => handleChange('sell_price', parseFloat(e.target.value) || 0)}
                        />
                    </div>
                </div>

                {error && (
                    <div className="text-red-600 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-3 rounded">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
                    </Button>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
