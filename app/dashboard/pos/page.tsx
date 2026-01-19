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
    const [kioskMode, setKioskMode] = useState(false);

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

    // Kiosk Mode - Fullscreen POS only
    if (kioskMode) {
        return (
            <div className="fixed inset-0 bg-slate-50 dark:bg-slate-950 z-50 overflow-auto">
                <div className="p-4 space-y-4">
                    {/* Kiosk Header */}
                    <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                💰 Point of Sale
                            </div>
                            <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                Kiosk Mode
                            </div>
                        </div>
                        <button
                            onClick={() => setKioskMode(false)}
                            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition font-medium"
                        >
                            ← Exit Kiosk Mode
                        </button>
                    </div>

                    {successMessage && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-green-800 dark:text-green-400 font-medium text-center">
                            ✓ {successMessage}
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-4">
                        {/* Products */}
                        <div className="space-y-4">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="text-lg h-14"
                            />
                            <div className="grid grid-cols-2 gap-3 max-h-[calc(100vh-12rem)] overflow-y-auto">
                                {filteredProducts.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 text-left hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg"
                                    >
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            Stock: {product.stock}
                                        </p>
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                                            ${product.sell_price.toFixed(2)}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="space-y-4">
                            <CartDisplay
                                items={cartItems}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemoveItem={handleRemoveItem}
                            />
                            {cartItems.length > 0 && (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            if (confirm('Clear cart?')) {
                                                cart.clear();
                                                setCartItems([]);
                                            }
                                        }}
                                        className="w-full px-4 py-3 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition font-medium"
                                    >
                                        🗑️ Clear Cart
                                    </button>
                                    <Button
                                        onClick={() => setShowCheckout(true)}
                                        className="w-full h-16 text-xl"
                                        size="lg"
                                    >
                                        Checkout ${cart.getTotal().toFixed(2)}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {showCheckout && (
                        <CheckoutModal
                            total={cart.getTotal()}
                            onComplete={handleCheckout}
                            onCancel={() => setShowCheckout(false)}
                        />
                    )}
                </div>
            </div>
        );
    }

    // Normal Mode
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

                {/* Quick Actions Bar */}
                {cartItems.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">⚡ Quick:</span>
                                <button
                                    onClick={() => {
                                        if (confirm('Clear all items from cart?')) {
                                            cart.clear();
                                            setCartItems([]);
                                        }
                                    }}
                                    className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded text-xs font-medium hover:bg-red-200 dark:hover:bg-red-900 transition"
                                >
                                    🗑️ Clear Cart
                                </button>
                                <button
                                    onClick={() => setKioskMode(true)}
                                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-900 transition"
                                >
                                    📱 Kiosk Mode
                                </button>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                <span>Items:</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{cartItems.length}</span>
                            </div>
                        </div>
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
