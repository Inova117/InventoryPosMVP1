import { mockDb } from '@/lib/mock-db';
import type { Product } from '@/types/mock';

export interface CreateProductInput {
    sku: string;
    name: string;
    category: string;
    stock: number;
    buy_price: number;
    sell_price: number;
    supplier_id?: string;
    store_id: string;
}

export interface UpdateProductInput {
    sku?: string;
    name?: string;
    category?: string;
    stock?: number;
    buy_price?: number;
    sell_price?: number;
    supplier_id?: string;
}

export const productsService = {
    async getAll(storeId: string): Promise<Product[]> {
        const products = await mockDb.filter('products', (p) => p.store_id === storeId);
        return products;
    },

    async getById(id: string): Promise<Product | null> {
        return await mockDb.find('products', (p) => p.id === id);
    },

    async getBySku(sku: string, storeId: string): Promise<Product | null> {
        return await mockDb.find('products', (p) => p.sku === sku && p.store_id === storeId);
    },

    async getLowStock(storeId: string, threshold: number = 10): Promise<Product[]> {
        const products = await mockDb.filter(
            'products',
            (p) => p.store_id === storeId && p.stock < threshold
        );
        return products.sort((a, b) => a.stock - b.stock);
    },

    async create(input: CreateProductInput): Promise<Product> {
        // Check for duplicate SKU
        const existing = await this.getBySku(input.sku, input.store_id);
        if (existing) {
            throw new Error(`Product with SKU "${input.sku}" already exists`);
        }

        // Validate prices
        if (input.buy_price < 0 || input.sell_price < 0) {
            throw new Error('Prices must be positive');
        }

        if (input.stock < 0) {
            throw new Error('Stock cannot be negative');
        }

        const product = await mockDb.create('products', {
            ...input,
        });

        return product;
    },

    async update(id: string, updates: UpdateProductInput): Promise<Product | null> {
        const existing = await this.getById(id);
        if (!existing) {
            throw new Error('Product not found');
        }

        // Check SKU uniqueness if changing SKU
        if (updates.sku && updates.sku !== existing.sku) {
            const duplicate = await this.getBySku(updates.sku, existing.store_id);
            if (duplicate) {
                throw new Error(`Product with SKU "${updates.sku}" already exists`);
            }
        }

        // Validate prices if provided
        if (updates.buy_price !== undefined && updates.buy_price < 0) {
            throw new Error('Buy price must be positive');
        }
        if (updates.sell_price !== undefined && updates.sell_price < 0) {
            throw new Error('Sell price must be positive');
        }
        if (updates.stock !== undefined && updates.stock < 0) {
            throw new Error('Stock cannot be negative');
        }

        return await mockDb.update('products', id, updates);
    },

    async delete(id: string): Promise<boolean> {
        const product = await this.getById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        // Check if stock is 0 before deleting
        if (product.stock > 0) {
            throw new Error('Cannot delete product with stock > 0. Reduce stock to 0 first.');
        }

        return await mockDb.delete('products', id);
    },

    async adjustStock(id: string, delta: number): Promise<Product | null> {
        const product = await this.getById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        const newStock = product.stock + delta;
        if (newStock < 0) {
            throw new Error('Insufficient stock');
        }

        return await mockDb.update('products', id, { stock: newStock });
    },
};
