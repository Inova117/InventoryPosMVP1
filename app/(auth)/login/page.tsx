'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warmth-50 via-sage-50/30 to-warmth-100 dark:from-warmth-900 dark:via-sage-950/20 dark:to-warmth-800 px-4">
            <div className="w-full max-w-lg space-y-6 animate-fade-in">
                {/* Welcoming header */}
                <div className="text-center space-y-3">
                    <div className="text-6xl mb-4 animate-scale-in">🏪</div>
                    <h1 className="text-4xl md:text-5xl font-serif font-semibold text-warmth-900 dark:text-warmth-50">
                        Welcome back
                    </h1>
                    <p className="text-lg text-warmth-600 dark:text-warmth-400">
                        Sign in to your account
                    </p>
                    <div className="inline-block px-3 py-1 bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400 rounded-full text-xs font-medium">
                        Demo Environment
                    </div>
                </div>

                {/* Warm login card */}
                <div className="bg-white dark:bg-warmth-800 py-10 px-6 md:px-10 elevation-3 rounded-3xl border border-warmth-200 dark:border-warmth-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-sm font-medium text-warmth-700 dark:text-warmth-300"
                            >
                                Email address
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
                                className="h-12 rounded-xl border-warmth-300 dark:border-warmth-600 focus:ring-sage-500 focus:border-sage-500 text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-sm font-medium text-warmth-700 dark:text-warmth-300"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Any password works"
                                className="h-12 rounded-xl border-warmth-300 dark:border-warmth-600 focus:ring-sage-500 focus:border-sage-500 text-base"
                            />
                        </div>

                        {error && (
                            <div className="text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-200 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-sage-500 hover:bg-sage-600 text-white rounded-xl font-medium text-base button-tactile elevation-2 hover:elevation-3 touch-target"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>

                    {/* Demo credentials */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-warmth-200 dark:border-warmth-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white dark:bg-warmth-800 px-3 text-warmth-600 dark:text-warmth-400 font-medium">
                                    Quick access
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setEmail('admin@demo.com');
                                    setPassword('demo123');
                                }}
                                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-warmth-200 dark:border-warmth-700 bg-warmth-50 dark:bg-warmth-900 px-4 py-4 font-medium text-warmth-900 dark:text-warmth-100 hover-lift button-tactile touch-target"
                            >
                                <span className="text-2xl">👔</span>
                                <span className="text-sm">Owner</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEmail('cashier@demo.com');
                                    setPassword('demo123');
                                }}
                                className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-warmth-200 dark:border-warmth-700 bg-warmth-50 dark:bg-warmth-900 px-4 py-4 font-medium text-warmth-900 dark:text-warmth-100 hover-lift button-tactile touch-target"
                            >
                                <span className="text-2xl">💰</span>
                                <span className="text-sm">Cashier</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Warm footer note */}
                <div className="text-center">
                    <p className="text-sm text-warmth-600 dark:text-warmth-400 leading-relaxed">
                        This is a demo environment using a mock backend.<br />
                        All data is stored locally in your browser.
                    </p>
                </div>
            </div>
        </div>
    );
}
