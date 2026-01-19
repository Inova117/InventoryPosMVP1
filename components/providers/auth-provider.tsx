'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/hooks/use-auth';
import { authService } from '@/lib/services/auth';
import { mockDb } from '@/lib/mock-db';
import type { Profile } from '@/types/mock';

const SESSION_KEY = 'mvp_pos_session_user_id';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Restore session on mount
    useEffect(() => {
        const restoreSession = async () => {
            try {
                const storedUserId = localStorage.getItem(SESSION_KEY);
                if (storedUserId) {
                    // Find user by ID directly from DB
                    const found = await mockDb.find('profiles', (p) => p.id === storedUserId);
                    if (found) {
                        setUser(found);
                    } else {
                        localStorage.removeItem(SESSION_KEY);
                    }
                }
            } catch (error) {
                console.error('Session restore failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();
    }, []);

    const login = async (email: string) => {
        setIsLoading(true);
        try {
            const { user, error } = await authService.login(email);
            if (error || !user) throw new Error(error || 'Login failed');

            setUser(user);
            localStorage.setItem(SESSION_KEY, user.id);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            setUser(null);
            localStorage.removeItem(SESSION_KEY);
            router.push('/login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
