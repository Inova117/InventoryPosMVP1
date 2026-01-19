import type { Product } from '@/types/mock';

export interface CartItem {
    product: Product;
    quantity: number;
    subtotal: number;
}

export class CartService {
    private items: Map<string, CartItem> = new Map();

    addItem(product: Product, quantity: number = 1): CartItem {
        const existing = this.items.get(product.id);

        if (existing) {
            const newQuantity = existing.quantity + quantity;
            if (newQuantity > product.stock) {
                throw new Error(`Insufficient stock. Available: ${product.stock}`);
            }
            existing.quantity = newQuantity;
            existing.subtotal = existing.quantity * product.sell_price;
            return existing;
        }

        if (quantity > product.stock) {
            throw new Error(`Insufficient stock. Available: ${product.stock}`);
        }

        const item: CartItem = {
            product,
            quantity,
            subtotal: quantity * product.sell_price,
        };

        this.items.set(product.id, item);
        return item;
    }

    updateQuantity(productId: string, quantity: number): CartItem | null {
        const item = this.items.get(productId);
        if (!item) return null;

        if (quantity <= 0) {
            this.removeItem(productId);
            return null;
        }

        if (quantity > item.product.stock) {
            throw new Error(`Insufficient stock. Available: ${item.product.stock}`);
        }

        item.quantity = quantity;
        item.subtotal = quantity * item.product.sell_price;
        return item;
    }

    removeItem(productId: string): boolean {
        return this.items.delete(productId);
    }

    getItems(): CartItem[] {
        return Array.from(this.items.values());
    }

    getTotal(): number {
        return Array.from(this.items.values()).reduce(
            (sum, item) => sum + item.subtotal,
            0
        );
    }

    getItemCount(): number {
        return Array.from(this.items.values()).reduce(
            (sum, item) => sum + item.quantity,
            0
        );
    }

    clear(): void {
        this.items.clear();
    }
}
