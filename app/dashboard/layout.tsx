'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

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
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-slate-100"></div>
            </div>
        );
    }

    if (!user) return null;

    const navItems = [
        { href: '/dashboard', label: 'Overview', icon: '📊', roles: ['owner'] },
        { href: '/dashboard/inventory', label: 'Inventory', icon: '📦', roles: ['owner'] },
        { href: '/dashboard/pos', label: 'POS', icon: '💰', roles: ['owner', 'cashier'] },
        { href: '/dashboard/sales', label: 'Sales', icon: '📈', roles: ['owner'] },
    ];

    const visibleNavItems = navItems.filter((item) =>
        item.roles.includes(user.role)
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-6 justify-between sticky top-0 z-10">
                <div className="font-bold text-xl text-slate-900 dark:text-slate-100">
                    Zerion POS
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                        {user.full_name} ({user.role})
                    </span>
                    <Button variant="outline" size="sm" onClick={() => logout()}>
                        Logout
                    </Button>
                </div>
            </header>

            <div className="flex">
                <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)]">
                    <nav className="p-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
