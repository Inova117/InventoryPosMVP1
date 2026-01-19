export type Role = 'owner' | 'cashier';

export interface Store {
    id: string;
    name: string;
    owner_id: string;
    created_at: string;
}

export interface Profile {
    id: string;
    email: string;
    full_name: string;
    role: Role;
    store_id: string;
    created_at: string;
}

export interface Product {
    id: string;
    store_id: string;
    sku: string;
    name: string;
    category: string;
    stock: number;
    buy_price: number;
    sell_price: number;
    supplier_id?: string;
    created_at: string;
    updated_at: string;
}

export interface Supplier {
    id: string;
    store_id: string;
    name: string;
    contact?: string;
    created_at: string;
}

export interface Sale {
    id: string;
    store_id: string;
    cashier_id: string;
    total: number;
    amount_received: number;
    change_given: number;
    created_at: string;
    items?: SaleItem[]; // Joined for convenience
}

export interface SaleItem {
    id: string;
    sale_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

export interface MockSchema {
    stores: Store[];
    profiles: Profile[];
    products: Product[];
    suppliers: Supplier[];
    sales: Sale[];
    sale_items: SaleItem[];
}
