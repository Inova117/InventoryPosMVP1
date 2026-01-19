'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import type { CreateProductInput } from '@/lib/services/products';
import { productsService } from '@/lib/services/products';
import type { Product } from '@/types/mock';
import { ProductsList } from '@/components/features/products-list';
import type { ProductFormData } from '@/components/features/product-form';
import { ProductForm } from '@/components/features/product-form';
import { Button } from '@/components/ui/button';

export default function InventoryPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const loadProducts = useCallback(async () => {
        if (!user?.store_id) return;

        setIsLoading(true);
        try {
            const data = await productsService.getAll(user.store_id);
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user?.store_id]);

    useEffect(() => {
        if (user?.store_id) {
            loadProducts();
        }
    }, [user, loadProducts]);

    const handleCreate = async (formData: ProductFormData) => {
        if (!user?.store_id) return;

        const input: CreateProductInput = {
            ...formData,
            store_id: user.store_id,
        };

        await productsService.create(input);
        await loadProducts();
        setShowForm(false);
    };

    const handleUpdate = async (formData: ProductFormData) => {
        if (!editingProduct) return;

        await productsService.update(editingProduct.id, formData);
        await loadProducts();
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await productsService.delete(id);
            await loadProducts();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete product');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-100"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        Inventory Management
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        {products.length} products in stock
                    </p>
                </div>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)}>
                        Add New Product
                    </Button>
                )}
            </div>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={editingProduct ? handleUpdate : handleCreate}
                    onCancel={handleCancel}
                />
            )}

            <ProductsList
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}
