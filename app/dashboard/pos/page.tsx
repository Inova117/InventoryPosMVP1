'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { productsService } from '@/lib/services/products';
import { CartService } from '@/lib/services/cart';
import { salesService } from '@/lib/services/sales';
import type { Product } from '@/types/mock';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CartDisplay } from '@/components/features/cart-display';
import { CheckoutModal } from '@/components/features/checkout-modal';

export default function POSPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cart] = useState(() => new CartService());
    const [cartItems, setCartItems] = useState(cart.getItems());
    const [showCheckout, setShowCheckout] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const loadProducts = useCallback(async () => {
        if (!user?.store_id) return;

        try {
            const data = await productsService.getAll(user.store_id);
            setProducts(data.filter((p) => p.stock > 0)); // Only show in-stock products
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    }, [user?.store_id]);

    useEffect(() => {
        if (user?.store_id) {
            loadProducts();
        }
    }, [user, loadProducts]);

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToCart = (product: Product) => {
        try {
            cart.addItem(product, 1);
            setCartItems([...cart.getItems()]);
            setSuccessMessage(`Added ${product.name} to cart`);
            setTimeout(() => setSuccessMessage(''), 2000);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to add item');
        }
    };

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        try {
            cart.updateQuantity(productId, quantity);
            setCartItems([...cart.getItems()]);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to update quantity');
        }
    };

    const handleRemoveItem = (productId: string) => {
        cart.removeItem(productId);
        setCartItems([...cart.getItems()]);
    };

    const handleCheckout = async (amountReceived: number) => {
        if (!user) return;

        const items = cart.getItems().map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.sell_price,
        }));

        await salesService.createSale({
            store_id: user.store_id,
            cashier_id: user.id,
            items,
            total: cart.getTotal(),
            amount_received: amountReceived,
        });

        // Reset cart and refresh
        cart.clear();
        setCartItems([]);
        setShowCheckout(false);
        await loadProducts();

        setSuccessMessage('Sale completed successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
                        Point of Sale
                    </h1>
                    <Input
                        type="search"
                        placeholder="Search products by name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-lg"
                    />
                </div>

                {successMessage && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-green-800 dark:text-green-400 text-sm font-medium">
                        {successMessage}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[calc(100vh-16rem)] overflow-y-auto">
                    {filteredProducts.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => handleAddToCart(product)}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-left hover:border-slate-900 dark:hover:border-slate-100 transition-colors"
                        >
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                {product.name}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                SKU: {product.sku}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                    ${product.sell_price.toFixed(2)}
                                </span>
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                    Stock: {product.stock}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <CartDisplay
                    items={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                />

                {cartItems.length > 0 && (
                    <Button
                        onClick={() => setShowCheckout(true)}
                        className="w-full"
                        size="lg"
                    >
                        Proceed to Checkout (${cart.getTotal().toFixed(2)})
                    </Button>
                )}
            </div>

            {showCheckout && (
                <CheckoutModal
                    total={cart.getTotal()}
                    onComplete={handleCheckout}
                    onCancel={() => setShowCheckout(false)}
                />
            )}
        </div>
    );
}
