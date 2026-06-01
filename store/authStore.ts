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

export const useAuthStore = create<AuthState>((set) => ({
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
          async (_event, session) => {
            clearTimeout(timeout);
            
            if (session?.user) {
              // Import isUserAdmin to check if user is admin
              const { isUserAdmin } = await import('@/services/firebaseAuth');
              
              set({
                user: {
                  id: session.user.id,
                  email: session.user.email || '',
                  name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
                  isAdmin: isUserAdmin(session.user.email || ''),
                },
                isLoading: false,
                isAuthenticated: true,
              });
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
