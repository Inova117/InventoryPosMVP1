'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import type { CreateProductInput } from '@/lib/services/products';
import { productsService } from '@/lib/services/products';
import type { Product } from '@/types/mock';
import { ProductsList } from '@/components/features/products-list';
import type { ProductFormData } from '@/components/features/product-form';
import { ProductForm } from '@/components/features/product-form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

export default function InventoryPage() {
    const { user } = useAuth();
    const { t } = useT();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [pendingDelete, setPendingDelete] = useState<string | null>(null);

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
        if (user?.store_id) loadProducts();
    }, [user, loadProducts]);

    const handleCreate = async (formData: ProductFormData) => {
        if (!user?.store_id) return;
        const input: CreateProductInput = { ...formData, store_id: user.store_id };
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

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        try {
            await productsService.delete(pendingDelete);
            await loadProducts();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t('inventory.deleteError'));
        } finally {
            setPendingDelete(null);
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
            <div className="flex items-center justify-center section-spacing">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl animate-fade-in space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{t('inventory.title')}</h1>
                    <p className="text-muted-foreground">
                        {products.length === 1
                            ? t('inventory.productCountOne', { count: products.length })
                            : t('inventory.productCountMany', { count: products.length })}
                    </p>
                </div>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('inventory.addProduct')}</span>
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

            <ProductsList products={products} onEdit={handleEdit} onDelete={setPendingDelete} />

            <Dialog open={pendingDelete !== null} onOpenChange={(o) => !o && setPendingDelete(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{t('inventory.deleteConfirmTitle')}</DialogTitle>
                        <DialogDescription>{t('inventory.deleteConfirmDesc')}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPendingDelete(null)}>{t('common.cancel')}</Button>
                        <Button variant="destructive" onClick={confirmDelete}>{t('common.delete')}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
