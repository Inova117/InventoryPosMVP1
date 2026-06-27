'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Smartphone, Trash2, ShoppingCart, Search } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { productsService } from '@/lib/services/products';
import { CartService } from '@/lib/services/cart';
import { salesService } from '@/lib/services/sales';
import type { Product } from '@/types/mock';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartDisplay } from '@/components/features/cart-display';
import { CheckoutModal } from '@/components/features/checkout-modal';
import { SaleSuccessDialog, type Receipt } from '@/components/features/sale-success-dialog';
import { categoryAccent } from '@/lib/categories';
import { formatCurrency, cn } from '@/lib/utils';

export default function POSPage() {
    const { user } = useAuth();
    const { t, lang } = useT();
    const [products, setProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [cart] = useState(() => new CartService());
    const [cartItems, setCartItems] = useState(cart.getItems());
    const [showCheckout, setShowCheckout] = useState(false);
    const [kioskMode, setKioskMode] = useState(false);
    const [receipt, setReceipt] = useState<Receipt | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const loadProducts = useCallback(async () => {
        if (!user?.store_id) return;
        try {
            const data = await productsService.getAll(user.store_id);
            setProducts(data.filter((p) => p.stock > 0));
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    }, [user?.store_id]);

    useEffect(() => {
        if (user?.store_id) loadProducts();
    }, [user, loadProducts]);

    const categories = useMemo(() => {
        const set = new Map<string, number>();
        for (const p of products) set.set(p.category, (set.get(p.category) ?? 0) + 1);
        return Array.from(set.entries()).map(([name, count]) => ({ name, count }));
    }, [products]);

    const filteredProducts = products.filter((p) => {
        const q = searchQuery.toLowerCase();
        const matchesQuery = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        return matchesQuery && matchesCategory;
    });

    const handleAddToCart = (product: Product) => {
        try {
            cart.addItem(product, 1);
            setCartItems([...cart.getItems()]);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t('pos.addError'));
        }
    };

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        try {
            cart.updateQuantity(productId, quantity);
            setCartItems([...cart.getItems()]);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t('pos.qtyError'));
        }
    };

    const handleRemoveItem = (productId: string) => {
        cart.removeItem(productId);
        setCartItems([...cart.getItems()]);
    };

    const handleClearCart = () => {
        cart.clear();
        setCartItems([]);
        toast(t('pos.clearConfirmTitle'));
    };

    const handleCheckout = async (amountReceived: number) => {
        if (!user) return;

        // Snapshot the cart before it is cleared so we can show a receipt
        const snapshot = cart.getItems().map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            unitPrice: item.product.sell_price,
            subtotal: item.subtotal,
        }));
        const total = cart.getTotal();

        const items = cart.getItems().map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.sell_price,
        }));

        const { sale, change_given } = await salesService.createSale({
            store_id: user.store_id,
            cashier_id: user.id,
            items,
            total,
            amount_received: amountReceived,
        });

        cart.clear();
        setCartItems([]);
        setShowCheckout(false);
        await loadProducts();

        setReceipt({ saleId: sale.id, items: snapshot, total, amountReceived, change: change_given });
        setShowSuccess(true);
    };

    const total = cart.getTotal();

    const categoryBar = categories.length > 1 && (
        <div className="flex flex-wrap gap-2">
            <CategoryPill label={t('common.all')} count={products.length} active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
            {categories.map((c) => (
                <CategoryPill key={c.name} label={c.name} count={c.count} active={activeCategory === c.name} onClick={() => setActiveCategory(c.name)} />
            ))}
        </div>
    );

    const productGrid = (
        <div className="grid max-h-[calc(100vh-20rem)] grid-cols-1 gap-3 overflow-y-auto custom-scrollbar pr-1 sm:grid-cols-2">
            {filteredProducts.length === 0 ? (
                <p className="col-span-full py-12 text-center text-sm text-muted-foreground">{t('pos.noProducts')}</p>
            ) : (
                filteredProducts.map((product) => {
                    const accent = categoryAccent(product.category);
                    const lowStock = product.stock < 10;
                    return (
                        <button
                            key={product.id}
                            onClick={() => handleAddToCart(product)}
                            className="group flex items-start gap-3 rounded-xl border border-border bg-card p-3.5 text-left button-tactile transition-all hover:border-sage-400 hover:elevation-2 focus-ring"
                        >
                            <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-lg font-serif text-lg font-semibold', accent.chip)}>
                                {product.name.charAt(0)}
                            </span>
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate font-medium text-foreground">{product.name}</h3>
                                <span className={cn('mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium', accent.chip)}>
                                    {product.category}
                                </span>
                            </div>
                            <div className="shrink-0 text-right">
                                <div className="font-serif text-lg font-semibold text-foreground tabular-nums">{formatCurrency(product.sell_price, lang)}</div>
                                <div className={cn('text-xs', lowStock ? 'font-medium text-warning-soft-foreground' : 'text-muted-foreground')}>
                                    {t('pos.stock')}: {product.stock}
                                </div>
                            </div>
                        </button>
                    );
                })
            )}
        </div>
    );

    const checkoutDialogs = (
        <>
            <CheckoutModal open={showCheckout} onOpenChange={setShowCheckout} total={total} onComplete={handleCheckout} />
            <SaleSuccessDialog
                open={showSuccess}
                onOpenChange={setShowSuccess}
                receipt={receipt}
                onNewSale={() => setShowSuccess(false)}
            />
        </>
    );

    const searchField = (size: 'normal' | 'kiosk') => (
        <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                placeholder={t('pos.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn('pl-10', size === 'kiosk' ? 'h-14 text-lg' : 'h-12 text-base')}
            />
        </div>
    );

    // Kiosk mode — fullscreen POS
    if (kioskMode) {
        return (
            <div className="fixed inset-0 z-50 overflow-auto bg-background">
                <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 elevation-1">
                        <div className="flex items-center gap-3">
                            <h1 className="flex items-center gap-2 font-serif text-2xl font-semibold">
                                <ShoppingCart className="h-6 w-6 text-sage-600 dark:text-sage-400" />
                                {t('pos.title')}
                            </h1>
                            <Badge variant="default">{t('pos.kioskMode')}</Badge>
                        </div>
                        <Button variant="secondary" onClick={() => setKioskMode(false)}>
                            <ArrowLeft className="h-4 w-4" />
                            {t('pos.exitKiosk')}
                        </Button>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="space-y-4">
                            {searchField('kiosk')}
                            {categoryBar}
                            {productGrid}
                        </div>

                        <div className="space-y-4">
                            <CartDisplay items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
                            {cartItems.length > 0 && (
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full" onClick={handleClearCart}>
                                        <Trash2 className="h-4 w-4" />
                                        {t('pos.clearCart')}
                                    </Button>
                                    <Button onClick={() => setShowCheckout(true)} className="h-16 w-full text-xl" size="lg">
                                        {t('cart.checkout')} · {formatCurrency(total, lang)}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {checkoutDialogs}
            </div>
        );
    }

    // Normal mode
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
                <div className="space-y-3">
                    <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground">{t('pos.title')}</h1>
                    {searchField('normal')}
                    {categoryBar}
                </div>

                {cartItems.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-sage-200 bg-gradient-to-r from-sage-50 to-warmth-50 p-3 dark:border-sage-900/30 dark:from-sage-950/30 dark:to-warmth-900">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={handleClearCart} className="text-danger hover:bg-danger-soft hover:text-danger-soft-foreground">
                                <Trash2 className="h-4 w-4" />
                                {t('pos.clearCart')}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setKioskMode(true)}>
                                <Smartphone className="h-4 w-4" />
                                {t('pos.kioskMode')}
                            </Button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {cartItems.length} {t('cart.items')}
                        </span>
                    </div>
                )}

                {productGrid}
            </div>

            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                <CartDisplay items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
                {cartItems.length > 0 && (
                    <Button onClick={() => setShowCheckout(true)} className="w-full" size="lg">
                        {t('cart.checkout')} · {formatCurrency(total, lang)}
                    </Button>
                )}
            </div>

            {checkoutDialogs}
        </div>
    );
}

function CategoryPill({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors button-tactile focus-ring',
                active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
        >
            {label}
            <span className={cn('rounded-full px-1.5 text-xs tabular-nums', active ? 'bg-white/20' : 'bg-muted text-muted-foreground')}>{count}</span>
        </button>
    );
}
