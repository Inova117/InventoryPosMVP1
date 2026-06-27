'use client';

import { useState } from 'react';
import { UserCog, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useT } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/alert';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ZerionTile } from '@/components/brand/zerion-logo';

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const { t } = useT();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email);
        } catch {
            setError(t('login.loginError'));
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh" />
            <div aria-hidden className="pointer-events-none absolute inset-0 noise-overlay" />
            <div className="absolute right-4 top-4 flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
            </div>
            <div className="relative w-full max-w-lg animate-fade-in space-y-6">
                {/* Header */}
                <div className="space-y-3 text-center">
                    <ZerionTile size="lg" className="mx-auto mb-2 animate-scale-in" />
                    <h1 className="font-serif text-4xl font-semibold text-foreground md:text-5xl">
                        {t('login.title')}
                    </h1>
                    <p className="text-lg text-muted-foreground">{t('login.subtitle')}</p>
                    <div className="inline-block rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                        {t('login.demoBadge')}
                    </div>
                </div>

                {/* Login card */}
                <div className="rounded-3xl border border-border bg-card px-6 py-10 elevation-3 md:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-foreground">
                                {t('login.emailLabel')}
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@demo.com"
                                className="h-12 text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-foreground">
                                {t('login.passwordLabel')}
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('login.passwordHint')}
                                className="h-12 text-base"
                            />
                        </div>

                        {error && <Alert variant="danger" className="font-medium">{error}</Alert>}

                        <Button type="submit" size="lg" disabled={isLoading} className="w-full">
                            {isLoading ? t('login.signingIn') : t('login.signIn')}
                        </Button>
                    </form>

                    {/* Quick access */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-card px-3 font-medium text-muted-foreground">
                                    {t('login.quickAccess')}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setEmail('admin@demo.com');
                                    setPassword('demo123');
                                }}
                                className="h-auto flex-col gap-2 py-4"
                            >
                                <UserCog className="h-6 w-6 text-sage-600 dark:text-sage-400" />
                                <span className="text-sm">{t('login.owner')}</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setEmail('cashier@demo.com');
                                    setPassword('demo123');
                                }}
                                className="h-auto flex-col gap-2 py-4"
                            >
                                <ShoppingBag className="h-6 w-6 text-sage-600 dark:text-sage-400" />
                                <span className="text-sm">{t('login.cashier')}</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="relative text-center text-sm leading-relaxed text-muted-foreground">
                    {t('login.demoNote')}
                </p>
            </div>
        </div>
    );
}
