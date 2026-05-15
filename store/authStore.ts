import { supabase } from '@/config/firebase';
import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  restoreUser: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: user !== null });
  },

  logout: async () => {
    try {
      const { logOut } = await import('@/services/firebaseAuth');
      await logOut();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
      set({ user: null, isAuthenticated: false });
    }
  },
  
  restoreUser: async () => {
    try {
      return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          set({ isLoading: false, isAuthenticated: false });
          resolve();
        }, 2000);

        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            clearTimeout(timeout);
            
            if (session?.user) {
              set({ isLoading: false, isAuthenticated: true });
            } else {
              set({ user: null, isAuthenticated: false, isLoading: false });
            }
            resolve();
          }
        );

        return () => {
          authListener?.subscription?.unsubscribe();
        };
      });
    } catch (error) {
      console.error('Failed to restore user:', error);
      set({ isLoading: false, isAuthenticated: false });
    }
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
