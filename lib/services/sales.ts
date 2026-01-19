import { mockDb } from '@/lib/mock-db';
import type { Sale } from '@/types/mock';
import { productsService } from './products';

export interface CreateSaleInput {
    store_id: string;
    cashier_id: string;
    items: Array<{
        product_id: string;
        quantity: number;
        unit_price: number;
    }>;
    total: number;
    amount_received: number;
}

export interface SaleResult {
    sale: Sale;
    change_given: number;
}

export const salesService = {
    async createSale(input: CreateSaleInput): Promise<SaleResult> {
        // Validate payment
        if (input.amount_received < input.total) {
            throw new Error('Insufficient payment received');
        }

        // Validate stock for all items
        for (const item of input.items) {
            const product = await productsService.getById(item.product_id);
            if (!product) {
                throw new Error(`Product ${item.product_id} not found`);
            }
            if (product.stock < item.quantity) {
                throw new Error(
                    `Insufficient stock for ${product.name}. Available: ${product.stock}`
                );
            }
        }

        const change_given = input.amount_received - input.total;

        // Create sale record
        const sale = await mockDb.create('sales', {
            store_id: input.store_id,
            cashier_id: input.cashier_id,
            total: input.total,
            amount_received: input.amount_received,
            change_given,
        });

        // Create sale items and decrement stock
        for (const item of input.items) {
            await mockDb.create('sale_items', {
                sale_id: sale.id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: item.quantity * item.unit_price,
            });

            // Decrement stock atomically
            await productsService.adjustStock(item.product_id, -item.quantity);
        }

        return { sale, change_given };
    },

    async getSalesByStore(storeId: string): Promise<Sale[]> {
        return await mockDb.filter('sales', (s) => s.store_id === storeId);
    },

    async getSaleById(id: string): Promise<Sale | null> {
        return await mockDb.find('sales', (s) => s.id === id);
    },

    async getTodaySales(storeId: string): Promise<Sale[]> {
        const today = new Date().toISOString().split('T')[0];
        const sales = await this.getSalesByStore(storeId);

        return sales.filter((sale) => {
            const saleDate = new Date(sale.created_at).toISOString().split('T')[0];
            return saleDate === today;
        });
    },

    async getTodayStats(storeId: string): Promise<{
        total: number;
        count: number;
    }> {
        const todaySales = await this.getTodaySales(storeId);

        return {
            total: todaySales.reduce((sum, sale) => sum + sale.total, 0),
            count: todaySales.length,
        };
    },
};
