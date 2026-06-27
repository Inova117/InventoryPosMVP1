import type { MockSchema, Profile, Product } from '@/types/mock';
import { STORE_NAME } from '@/lib/constants';

// Bump the version whenever the seed shape changes so stale demo data is replaced.
export const DB_KEY = 'zerion_pos_db_v2';
export const LATENCY_MS = 450;

// --- Deterministic seed helpers (stable data across reloads for clean demos) ---
function mulberry32(seed: number): () => number {
    let a = seed;
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

interface ProductDef {
    sku: string;
    name: string;
    category: string;
    stock: number;
    buy: number;
    sell: number;
}

// Realistic catalog for a specialty café + retail corner ("Café Aurora")
const PRODUCT_DEFS: ProductDef[] = [
    { sku: 'CFE-ESP-001', name: 'Espresso sencillo', category: 'Café', stock: 220, buy: 9, sell: 35 },
    { sku: 'CFE-ESP-002', name: 'Espresso doble', category: 'Café', stock: 180, buy: 14, sell: 45 },
    { sku: 'CFE-AME-001', name: 'Americano', category: 'Café', stock: 160, buy: 11, sell: 42 },
    { sku: 'CFE-CAP-001', name: 'Capuchino', category: 'Café', stock: 140, buy: 18, sell: 55 },
    { sku: 'CFE-LAT-001', name: 'Latte', category: 'Café', stock: 150, buy: 18, sell: 58 },
    { sku: 'CFE-LAT-002', name: 'Latte de vainilla', category: 'Café', stock: 110, buy: 21, sell: 65 },
    { sku: 'CFE-MOC-001', name: 'Mocha', category: 'Café', stock: 95, buy: 22, sell: 68 },
    { sku: 'CFE-CLD-001', name: 'Cold brew', category: 'Café', stock: 64, buy: 20, sell: 62 },
    { sku: 'CFE-FRP-001', name: 'Frappé de caramelo', category: 'Café', stock: 48, buy: 26, sell: 78 },
    { sku: 'BEB-CHA-001', name: 'Chai latte', category: 'Bebidas', stock: 90, buy: 20, sell: 60 },
    { sku: 'BEB-TEV-001', name: 'Té verde', category: 'Bebidas', stock: 120, buy: 8, sell: 38 },
    { sku: 'BEB-TEN-001', name: 'Té negro', category: 'Bebidas', stock: 120, buy: 8, sell: 38 },
    { sku: 'BEB-CHO-001', name: 'Chocolate caliente', category: 'Bebidas', stock: 85, buy: 16, sell: 52 },
    { sku: 'BEB-AGU-001', name: 'Agua mineral 355ml', category: 'Bebidas', stock: 84, buy: 9, sell: 25 },
    { sku: 'REP-CRO-001', name: 'Croissant', category: 'Repostería', stock: 32, buy: 14, sell: 42 },
    { sku: 'REP-CRO-002', name: 'Croissant de almendra', category: 'Repostería', stock: 6, buy: 18, sell: 52 },
    { sku: 'REP-MUF-001', name: 'Muffin de arándano', category: 'Repostería', stock: 24, buy: 15, sell: 45 },
    { sku: 'REP-GAL-001', name: 'Galleta de avena', category: 'Repostería', stock: 40, buy: 7, sell: 28 },
    { sku: 'REP-PAN-001', name: 'Pan de plátano', category: 'Repostería', stock: 18, buy: 12, sell: 40 },
    { sku: 'REP-CHE-001', name: 'Rebanada de cheesecake', category: 'Repostería', stock: 14, buy: 24, sell: 72 },
    { sku: 'REP-BRO-001', name: 'Brownie', category: 'Repostería', stock: 22, buy: 13, sell: 45 },
    { sku: 'ALI-SAN-001', name: 'Sándwich de jamón', category: 'Alimentos', stock: 16, buy: 28, sell: 79 },
    { sku: 'ALI-BAG-001', name: 'Bagel con queso crema', category: 'Alimentos', stock: 12, buy: 24, sell: 68 },
    { sku: 'GRA-250-001', name: 'Café en grano 250g', category: 'Granos', stock: 36, buy: 95, sell: 185 },
    { sku: 'GRA-1KG-001', name: 'Café en grano 1kg', category: 'Granos', stock: 20, buy: 320, sell: 590 },
    { sku: 'GRA-MOL-250', name: 'Café molido 250g', category: 'Granos', stock: 28, buy: 95, sell: 185 },
    { sku: 'GRA-CAP-010', name: 'Cápsulas compatibles x10', category: 'Granos', stock: 44, buy: 60, sell: 120 },
    { sku: 'ACC-TAZ-001', name: 'Taza de cerámica Aurora', category: 'Accesorios', stock: 30, buy: 65, sell: 159 },
    { sku: 'ACC-TER-001', name: 'Termo Aurora 500ml', category: 'Accesorios', stock: 4, buy: 180, sell: 389 },
    { sku: 'ACC-PRE-001', name: 'Prensa francesa', category: 'Accesorios', stock: 8, buy: 210, sell: 449 },
    { sku: 'ACC-FIL-100', name: 'Filtros de papel x100', category: 'Accesorios', stock: 52, buy: 35, sell: 79 },
];

function buildSeed(): MockSchema {
    const now = Date.now();
    const nowIso = new Date(now).toISOString();

    const stores: MockSchema['stores'] = [
        { id: 'store-1', name: STORE_NAME, owner_id: 'user-owner-1', created_at: nowIso },
    ];

    const profiles: Profile[] = [
        { id: 'user-owner-1', email: 'admin@demo.com', full_name: 'Daniela Ríos', role: 'owner', store_id: 'store-1', created_at: nowIso },
        { id: 'user-cashier-1', email: 'cashier@demo.com', full_name: 'Marco Téllez', role: 'cashier', store_id: 'store-1', created_at: nowIso },
    ];

    const products: Product[] = PRODUCT_DEFS.map((p, i) => ({
        id: `prod-${i + 1}`,
        store_id: 'store-1',
        sku: p.sku,
        name: p.name,
        category: p.category,
        stock: p.stock,
        buy_price: p.buy,
        sell_price: p.sell,
        created_at: nowIso,
        updated_at: nowIso,
    }));

    const rng = mulberry32(20260627);
    const sales: MockSchema['sales'] = [];
    const saleItems: MockSchema['sale_items'] = [];
    let saleN = 0;
    let itemN = 0;

    // ~14 days of history, a handful of sales per day, with correct arithmetic.
    for (let d = 13; d >= 0; d--) {
        const salesToday = 2 + Math.floor(rng() * 4); // 2–5 sales/day
        for (let s = 0; s < salesToday; s++) {
            saleN++;
            const saleId = `sale-${saleN}`;
            const lineCount = 1 + Math.floor(rng() * 3); // 1–3 lines
            const chosen = new Set<number>();
            let total = 0;

            for (let l = 0; l < lineCount; l++) {
                const idx = Math.floor(rng() * products.length);
                if (chosen.has(idx)) continue;
                chosen.add(idx);
                // eslint-disable-next-line security/detect-object-injection
                const product = products[idx]!;
                const qty = 1 + Math.floor(rng() * 3); // 1–3 units
                const subtotal = round2(qty * product.sell_price);
                total = round2(total + subtotal);
                itemN++;
                saleItems.push({
                    id: `item-${itemN}`,
                    sale_id: saleId,
                    product_id: product.id,
                    quantity: qty,
                    unit_price: product.sell_price,
                    subtotal,
                });
            }

            // Amount received: sometimes exact, sometimes rounded up to a believable bill.
            const received = rng() < 0.45 ? total : round2(total + Math.ceil((total * (0.05 + rng() * 0.25)) / 10) * 10);
            const amountReceived = Math.max(received, total);

            const date = new Date(now - d * 24 * 60 * 60 * 1000);
            date.setHours(8 + Math.floor(rng() * 11), Math.floor(rng() * 60), 0, 0);

            sales.push({
                id: saleId,
                store_id: 'store-1',
                cashier_id: rng() < 0.5 ? 'user-owner-1' : 'user-cashier-1',
                total,
                amount_received: amountReceived,
                change_given: round2(amountReceived - total),
                created_at: date.toISOString(),
            });
        }
    }

    return { stores, profiles, products, suppliers: [], sales, sale_items: saleItems };
}

const INITIAL_DATA: MockSchema = buildSeed();

function isValidSchema(value: unknown): value is MockSchema {
    if (!value || typeof value !== 'object') return false;
    const v = value as Partial<MockSchema>;
    return (
        Array.isArray(v.stores) &&
        Array.isArray(v.profiles) &&
        Array.isArray(v.products) &&
        Array.isArray(v.sales) &&
        Array.isArray(v.sale_items)
    );
}

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

        try {
            const parsed = JSON.parse(stored);
            if (!isValidSchema(parsed)) throw new Error('Invalid schema shape');
            return parsed;
        } catch {
            // Corrupted or outdated storage — re-seed instead of white-screening.
            this.saveToStorage(INITIAL_DATA);
            return INITIAL_DATA;
        }
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
        // eslint-disable-next-line security/detect-object-injection
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
            // eslint-disable-next-line security/detect-object-injection
            ...items[index],
            ...updates,
            updated_at: new Date().toISOString(),
        };

        // eslint-disable-next-line security/detect-object-injection
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
