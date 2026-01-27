'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-sage-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!user) return null;

    const navItems = [
        { href: '/dashboard', label: 'Overview', icon: '📊', roles: ['owner', 'cashier'] },
        { href: '/dashboard/inventory', label: 'Inventory', icon: '📦', roles: ['owner'] },
        { href: '/dashboard/pos', label: 'POS', icon: '💰', roles: ['owner', 'cashier'] },
        { href: '/dashboard/sales', label: 'Sales', icon: '📈', roles: ['owner', 'cashier'] },
    ];

    const visibleNavItems = navItems.filter((item) =>
        item.roles.includes(user.role)
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Warm, welcoming header */}
            <header className="bg-white dark:bg-warmth-800 border-b border-warmth-200 dark:border-warmth-700 h-20 flex items-center px-6 md:px-8 justify-between sticky top-0 z-10 elevation-1">
                <div className="flex items-center gap-3">
                    <div className="text-3xl">🏪</div>
                    <div>
                        <div className="font-serif text-2xl font-semibold text-warmth-900 dark:text-warmth-50">
                            Zerion POS
                        </div>
                        <div className="text-xs text-warmth-600 dark:text-warmth-400">
                            Your inventory companion
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden sm:block text-right">
                        <div className="text-sm font-medium text-warmth-900 dark:text-warmth-100">
                            {user.full_name}
                        </div>
                        <div className="text-xs text-warmth-600 dark:text-warmth-400 capitalize">
                            {user.role}
                        </div>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="px-4 py-2 bg-warmth-100 hover:bg-warmth-200 dark:bg-warmth-700 dark:hover:bg-warmth-600 text-warmth-900 dark:text-warmth-100 rounded-xl text-sm font-medium button-tactile touch-target"
                    >
                        Sign out
                    </button>
                </div>
            </header>

            <div className="flex">
                {/* Warm sidebar navigation */}
                <aside className="w-72 bg-white dark:bg-warmth-800 border-r border-warmth-200 dark:border-warmth-700 min-h-[calc(100vh-5rem)] hidden md:block">
                    <nav className="p-6 space-y-2">
                        {visibleNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center gap-4 px-5 py-4 rounded-2xl font-medium transition-all touch-target ${isActive
                                        ? 'bg-sage-500 text-white elevation-2 scale-[1.02]'
                                        : 'text-warmth-700 hover:bg-warmth-50 dark:text-warmth-300 dark:hover:bg-warmth-700 hover-lift'
                                        }`}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className={`flex-1 ${isActive ? 'font-semibold' : ''}`}>
                                        {item.label}
                                    </span>
                                    {isActive && (
                                        <div className="w-2 h-2 bg-white rounded-full animate-scale-in"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar footer with warm accent */}
                    <div className="px-6 py-4 mt-8">
                        <div className="p-4 bg-gradient-to-br from-sage-50 to-warmth-50 dark:from-sage-950/20 dark:to-warmth-900 rounded-2xl border border-sage-200 dark:border-sage-900/30">
                            <div className="text-3xl mb-2">💡</div>
                            <p className="text-xs text-warmth-700 dark:text-warmth-400 leading-relaxed">
                                Staying organized helps you focus on what matters most
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Mobile bottom navigation */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-warmth-800 border-t border-warmth-200 dark:border-warmth-700 elevation-4 z-20">
                    <nav className="flex items-center justify-around px-2 py-2">
                        {visibleNavItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all touch-target ${isActive
                                        ? 'bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400'
                                        : 'text-warmth-600 dark:text-warmth-400'
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Main content with generous spacing */}
                <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
