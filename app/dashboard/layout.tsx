'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, Store, LogOut, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, logout } = useAuth();
    const { t } = useT();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!user) return null;

    const navItems: { href: string; label: string; icon: LucideIcon; roles: string[] }[] = [
        { href: '/dashboard', label: t('nav.overview'), icon: LayoutDashboard, roles: ['owner', 'cashier'] },
        { href: '/dashboard/inventory', label: t('nav.inventory'), icon: Package, roles: ['owner'] },
        { href: '/dashboard/pos', label: t('nav.pos'), icon: ShoppingCart, roles: ['owner', 'cashier'] },
        { href: '/dashboard/sales', label: t('nav.sales'), icon: TrendingUp, roles: ['owner', 'cashier'] },
    ];

    const visibleNavItems = navItems.filter((item) => item.roles.includes(user.role));

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-warmth-200 bg-card px-6 elevation-1 dark:border-warmth-700 md:px-8">
                <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Store className="h-5 w-5" />
                    </span>
                    <div>
                        <div className="font-serif text-2xl font-semibold text-warmth-900 dark:text-warmth-50">
                            {t('brand.name')}
                        </div>
                        <div className="text-xs text-warmth-600 dark:text-warmth-400">{t('brand.tagline')}</div>
                    </div>
                </div>
                <div className="flex items-center gap-3 md:gap-5">
                    <div className="hidden text-right sm:block">
                        <div className="text-sm font-medium text-warmth-900 dark:text-warmth-100">{user.full_name}</div>
                        <div className="text-xs capitalize text-warmth-600 dark:text-warmth-400">
                            {user.role === 'owner' ? t('login.owner') : t('login.cashier')}
                        </div>
                    </div>
                    <LanguageToggle />
                    <Button variant="secondary" size="sm" onClick={() => logout()}>
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('common.signOut')}</span>
                    </Button>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar navigation */}
                <aside className="hidden min-h-[calc(100vh-5rem)] w-72 border-r border-warmth-200 bg-card dark:border-warmth-700 md:block">
                    <nav className="space-y-2 p-6">
                        {visibleNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`group flex items-center gap-4 rounded-2xl px-5 py-4 font-medium transition-all touch-target ${
                                        isActive
                                            ? 'bg-primary text-primary-foreground elevation-2'
                                            : 'text-warmth-700 hover-lift hover:bg-warmth-50 dark:text-warmth-300 dark:hover:bg-warmth-700'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className={`flex-1 ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
                                    {isActive && <span className="h-2 w-2 animate-scale-in rounded-full bg-primary-foreground" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 px-6 py-4">
                        <div className="rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-warmth-50 p-4 dark:border-sage-900/30 dark:from-sage-950/20 dark:to-warmth-900">
                            <Lightbulb className="mb-2 h-6 w-6 text-sage-600 dark:text-sage-400" />
                            <p className="text-xs leading-relaxed text-warmth-700 dark:text-warmth-400">{t('dashboard.sidebarTip')}</p>
                        </div>
                    </div>
                </aside>

                {/* Mobile bottom navigation */}
                <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-warmth-200 bg-card elevation-4 dark:border-warmth-700 md:hidden">
                    <nav className="flex items-center justify-around px-2 py-2">
                        {visibleNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all touch-target ${
                                        isActive
                                            ? 'bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300'
                                            : 'text-warmth-600 dark:text-warmth-400'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Main content */}
                <main className="custom-scrollbar flex-1 p-6 pb-24 md:p-10 md:pb-10">{children}</main>
            </div>
        </div>
    );
}
