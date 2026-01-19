import { mockDb } from '@/lib/mock-db';
import type { Profile } from '@/types/mock';

export interface AuthResponse {
    user: Profile | null;
    error?: string;
}

export const authService = {
    async login(email: string): Promise<AuthResponse> {
        try {
            // In a real app we would verify password hash.
            // Here we just check if the email exists in our profiles list.
            const user = await mockDb.authenticate(email);

            if (!user) {
                return { user: null, error: 'User not found' };
            }

            return { user };
        } catch (error) {
            return { user: null, error: 'Authentication failed' };
        }
    },

    async logout(): Promise<void> {
        // In mock, nothing to do server-side
        return Promise.resolve();
    }
};
