import { create } from 'zustand';
import { User, AuthTokens } from '../types/auth';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setSession: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'user-demo-001',
    email: 'alex.dev99@gmail.com',
    displayName: 'Alexandre (Cyber Avenir)',
    isAnonymous: false,
    memberSince: '2026-01-15',
  },
  tokens: {
    accessToken: 'demo-access-token-jwt',
    refreshToken: 'demo-refresh-token-jwt',
    expiresIn: 3600,
  },
  isAuthenticated: true,
  setSession: (user, tokens) => set({ user, tokens, isAuthenticated: true }),
  logout: () => set({ user: null, tokens: null, isAuthenticated: false }),
}));
