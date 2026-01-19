import type { MockSchema, Profile } from '@/types/mock';

const DB_KEY = 'mvp_inventory_pos_db_v1';
const LATENCY_MS = 600;

// Initial Seed Data
const INITIAL_DATA: MockSchema = {
    stores: [
        {
            id: 'store-1',
            name: 'Demo Store Main',
            owner_id: 'user-owner-1',
            created_at: new Date().toISOString(),
        },
    ],
    profiles: [
        {
            id: 'user-owner-1',
            email: 'admin@demo.com',
            full_name: 'Demo Owner',
            role: 'owner',
            store_id: 'store-1',
            created_at: new Date().toISOString(),
        },
        {
            id: 'user-cashier-1',
            email: 'cashier@demo.com',
            full_name: 'Demo Cashier',
            role: 'cashier',
            store_id: 'store-1',
            created_at: new Date().toISOString(),
        },
    ],
    products: [
        {
            id: 'prod-1',
            store_id: 'store-1',
            sku: 'DEMO-001',
            name: 'Wireless Mouse',
            category: 'Electronics',
            stock: 45,
            buy_price: 15.0,
            sell_price: 29.99,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: 'prod-2',
            store_id: 'store-1',
            sku: 'DEMO-002',
            name: 'Mechanical Keyboard',
            category: 'Electronics',
            stock: 8,
            buy_price: 45.0,
            sell_price: 89.99,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: 'prod-3',
            store_id: 'store-1',
            sku: 'DEMO-003',
            name: 'USB-C Cable',
            category: 'Accessories',
            stock: 120,
            buy_price: 2.5,
            sell_price: 9.99,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    ],
    suppliers: [],
    sales: [
        {
            id: 'sale-1',
            store_id: 'store-1',
            cashier_id: 'user-cashier-1',
            total: 119.97,
            amount_received: 150.0,
            change_given: 30.03,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        },
        {
            id: 'sale-2',
            store_id: 'store-1',
            cashier_id: 'user-owner-1',
            total: 89.99,
            amount_received: 100.0,
            change_given: 10.01,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        },
        {
            id: 'sale-3',
            store_id: 'store-1',
            cashier_id: 'user-cashier-1',
            total: 49.97,
            amount_received: 50.0,
            change_given: 0.03,
            created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        },
    ],
    sale_items: [
        // Sale 1 items (4x Mouse)
        {
            id: 'item-1',
            sale_id: 'sale-1',
            product_id: 'prod-1',
            quantity: 4,
            unit_price: 29.99,
            subtotal: 119.96,
        },
        // Sale 2 items (1x Keyboard)
        {
            id: 'item-2',
            sale_id: 'sale-2',
            product_id: 'prod-2',
            quantity: 1,
            unit_price: 89.99,
            subtotal: 89.99,
        },
        // Sale 3 items (2x Mouse + 2x USB Cable)
        {
            id: 'item-3',
            sale_id: 'sale-3',
            product_id: 'prod-1',
            quantity: 2,
            unit_price: 29.99,
            subtotal: 59.98,
        },
        {
            id: 'item-4',
            sale_id: 'sale-3',
            product_id: 'prod-3',
            quantity: 2,
            unit_price: 9.99,
            subtotal: 19.98,
        },
    ],
};

export class MockDatabase {
    private data: MockSchema;

    constructor() {
        this.data = this.loadFromStorage();
    }

    private loadFromStorage(): MockSchema {
        if (typeof window === 'undefined') return INITIAL_DATA;

        const stored = localStorage.getItem(DB_KEY);
        if (!stored) {
            this.saveToStorage(INITIAL_DATA);
            return INITIAL_DATA;
        }
        return JSON.parse(stored);
    }

    private saveToStorage(data: MockSchema) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(DB_KEY, JSON.stringify(data));
        }
    }

    private async delay() {
        await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));
    }

    async authenticate(email: string): Promise<Profile | null> {
        await this.delay();
        return this.data.profiles.find((u) => u.email === email) || null;
    }

    async getTable<K extends keyof MockSchema>(table: K): Promise<MockSchema[K]> {
        await this.delay();
        return this.data[table];
    }

    async find<K extends keyof MockSchema>(
        table: K,
        predicate: (item: MockSchema[K][0]) => boolean
    ): Promise<MockSchema[K][0] | null> {
        await this.delay();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, security/detect-object-injection
        const items = this.data[table] as unknown as any[];
        return items.find(predicate) || null;
    }

    async filter<K extends keyof MockSchema>(
        table: K,
        predicate: (item: MockSchema[K][0]) => boolean
    ): Promise<MockSchema[K]> {
        await this.delay();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, security/detect-object-injection
        const items = this.data[table] as unknown as any[];
        return items.filter(predicate) as unknown as MockSchema[K];
    }

    async create<K extends keyof MockSchema>(
        table: K,
        item: Omit<MockSchema[K][0], 'id' | 'created_at' | 'updated_at'>
    ): Promise<MockSchema[K][0]> {
        await this.delay();

        const newItem = {
            ...item,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        } as unknown as MockSchema[K][0];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, security/detect-object-injection
        const items = this.data[table] as unknown as any[];
        items.push(newItem);

        this.saveToStorage(this.data);
        return newItem;
    }

    async update<K extends keyof MockSchema>(
        table: K,
        id: string,
        updates: Partial<MockSchema[K][0]>
    ): Promise<MockSchema[K][0] | null> {
        await this.delay();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, security/detect-object-injection
        const items = this.data[table] as unknown as any[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const index = items.findIndex((i: any) => i.id === id);

        if (index === -1) return null;

        const updatedItem = {
            ...items[index],
            ...updates,
            updated_at: new Date().toISOString(),
        };

        items[index] = updatedItem;
        this.saveToStorage(this.data);

        return updatedItem;
    }

    async delete<K extends keyof MockSchema>(
        table: K,
        id: string
    ): Promise<boolean> {
        await this.delay();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, security/detect-object-injection
        const items = this.data[table] as unknown as any[];
        const initialLen = items.length;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filtered = items.filter((i: any) => i.id !== id);

        if (filtered.length === initialLen) return false;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, security/detect-object-injection
        (this.data[table] as any) = filtered;
        this.saveToStorage(this.data);

        return true;
    }
}

export const mockDb = new MockDatabase();
