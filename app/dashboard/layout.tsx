'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, LogOut, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Spinner } from '@/components/ui/spinner';
import { ZerionTile, ZerionWordmark } from '@/components/brand/zerion-logo';

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
                <Spinner />
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
            {/* Header — same material as the landing nav for one continuous shell */}
            <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-lg md:px-8">
                <Link href="/dashboard" className="flex items-center gap-3 rounded-xl focus-ring">
                    <ZerionTile size="md" />
                    <div>
                        <ZerionWordmark className="text-xl" />
                        <div className="mt-1 text-xs text-muted-foreground">{t('brand.tagline')}</div>
                    </div>
                </Link>
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="mr-1 hidden text-right sm:block">
                        <div className="text-sm font-medium text-foreground">{user.full_name}</div>
                        <div className="text-xs capitalize text-muted-foreground">
                            {user.role === 'owner' ? t('login.owner') : t('login.cashier')}
                        </div>
                    </div>
                    <ThemeToggle />
                    <LanguageToggle />
                    <Button variant="secondary" size="sm" onClick={() => logout()}>
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">{t('common.signOut')}</span>
                    </Button>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar navigation */}
                <aside className="hidden min-h-[calc(100vh-5rem)] w-72 border-r border-border bg-card/40 md:block">
                    <nav className="space-y-1 p-5">
                        {visibleNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`group relative flex items-center gap-3 rounded-xl py-3 pl-4 pr-4 font-medium transition-all touch-target focus-ring ${
                                        isActive
                                            ? 'bg-sage-100/70 text-sage-900 dark:bg-sage-900/25 dark:text-sage-100'
                                            : 'text-warmth-700 hover:bg-warmth-100/70 dark:text-warmth-300 dark:hover:bg-warmth-800/60'
                                    }`}
                                >
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 h-6 -translate-y-1/2 rounded-r-full border-l-2 border-sage-500 dark:border-sage-400" />
                                    )}
                                    <Icon className={`h-5 w-5 ${isActive ? 'text-sage-600 dark:text-sage-300' : 'text-warmth-500 dark:text-warmth-400'}`} />
                                    <span className={`flex-1 ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="px-5 py-4">
                        <div className="rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50 to-warmth-50 p-4 dark:border-sage-900/30 dark:from-sage-950/20 dark:to-warmth-900">
                            <Lightbulb className="mb-2 h-6 w-6 text-sage-600 dark:text-sage-400" />
                            <p className="text-xs leading-relaxed text-warmth-700 dark:text-warmth-400">{t('dashboard.sidebarTip')}</p>
                        </div>
                    </div>
                </aside>

                {/* Mobile bottom navigation */}
                <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur elevation-4 md:hidden">
                    <nav className="flex items-center justify-around px-2 py-2">
                        {visibleNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-all touch-target focus-ring ${
                                        isActive
                                            ? 'text-sage-700 dark:text-sage-300'
                                            : 'text-warmth-500 dark:text-warmth-400'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="truncate text-xs font-medium">{item.label}</span>
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
