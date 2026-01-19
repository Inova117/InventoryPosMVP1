import { mockDb } from '@/lib/mock-db';
import type { Sale, Product } from '@/types/mock';

export interface DashboardStats {
    todayRevenue: number;
    todaySales: number;
    totalProducts: number;
    lowStockCount: number;
    totalStockValue: number; // NEW
}

export interface TopProduct {
    product: Product;
    totalSold: number;
    revenue: number;
}

export interface DailySalesData {
    date: string;
    revenue: number;
    sales: number;
}

export const analyticsService = {
    async getDashboardStats(storeId: string): Promise<DashboardStats> {
        const today = new Date().toISOString().split('T')[0];

        // Get today's sales
        const sales = await mockDb.filter('sales', (s) => {
            const saleDate = new Date(s.created_at).toISOString().split('T')[0];
            return s.store_id === storeId && saleDate === today;
        });

        // Get products
        const products = await mockDb.filter('products', (p) => p.store_id === storeId);

        // Calculate stats
        const todayRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
        const lowStockCount = products.filter((p) => p.stock < 10).length;

        // Calculate total stock value (buy_price × stock)
        const totalStockValue = products.reduce(
            (sum, product) => sum + product.buy_price * product.stock,
            0
        );

        return {
            todayRevenue,
            todaySales: sales.length,
            totalProducts: products.length,
            lowStockCount,
            totalStockValue,
        };
    },

    async getLowStockProducts(storeId: string, threshold: number = 10): Promise<Product[]> {
        const products = await mockDb.filter(
            'products',
            (p) => p.store_id === storeId && p.stock < threshold
        );

        return products.sort((a, b) => a.stock - b.stock);
    },

    async getTopProducts(storeId: string, limit: number = 5): Promise<TopProduct[]> {
        // Get all sale items
        const saleItems = await mockDb.getTable('sale_items');
        const sales = await mockDb.filter('sales', (s) => s.store_id === storeId);
        const products = await mockDb.filter('products', (p) => p.store_id === storeId);

        // Create a map of sale IDs for this store
        const storeSaleIds = new Set(sales.map((s) => s.id));

        // Aggregate by product
        const productStats = new Map<string, { totalSold: number; revenue: number }>();

        for (const item of saleItems) {
            if (!storeSaleIds.has(item.sale_id)) continue;

            const existing = productStats.get(item.product_id) || {
                totalSold: 0,
                revenue: 0,
            };

            productStats.set(item.product_id, {
                totalSold: existing.totalSold + item.quantity,
                revenue: existing.revenue + item.subtotal,
            });
        }

        // Create TopProduct array
        const topProducts: TopProduct[] = [];
        for (const [productId, stats] of productStats.entries()) {
            const product = products.find((p) => p.id === productId);
            if (product) {
                topProducts.push({
                    product,
                    ...stats,
                });
            }
        }

        // Sort by revenue and limit
        return topProducts
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, limit);
    },

    async getRecentSales(storeId: string, limit: number = 10): Promise<Sale[]> {
        const sales = await mockDb.filter('sales', (s) => s.store_id === storeId);

        return sales
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, limit);
    },

    async getLast7DaysSales(storeId: string): Promise<DailySalesData[]> {
        const sales = await mockDb.filter('sales', (s) => s.store_id === storeId);

        // Create last 7 days array
        const last7Days: DailySalesData[] = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const parts = date.toISOString().split('T');
            const dateStr = parts[0] as string;

            // Filter sales for this date
            const daySales = sales.filter((sale) => {
                const saleDate = new Date(sale.created_at).toISOString().split('T')[0];
                return saleDate === dateStr;
            });

            last7Days.push({
                date: dateStr,
                revenue: daySales.reduce((sum, sale) => sum + sale.total, 0),
                sales: daySales.length,
            });
        }

        return last7Days;
    },
};
