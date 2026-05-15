import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { Design } from './cartStore';

export interface FeaturedState {
  featuredProducts: Design[];
  addFeaturedProduct: (design: Design) => Promise<void>;
  removeFeaturedProduct: (id: string) => Promise<void>;
  loadFeaturedProducts: () => Promise<void>;
  clearFeaturedProducts: () => Promise<void>;
  isFeatured: (id: string) => boolean;
}

export const useFeaturedStore = create<FeaturedState>((set, get) => ({
  featuredProducts: [],

  addFeaturedProduct: async (design: Design) => {
    const current = get().featuredProducts;
    const exists = current.find((p) => p.id === design.id);
    
    if (!exists) {
      const updated = [...current, design];
      set({ featuredProducts: updated });
      await AsyncStorage.setItem('featuredProducts', JSON.stringify(updated));
    }
  },

  removeFeaturedProduct: async (id: string) => {
    const updated = get().featuredProducts.filter((p) => p.id !== id);
    set({ featuredProducts: updated });
    await AsyncStorage.setItem('featuredProducts', JSON.stringify(updated));
  },

  loadFeaturedProducts: async () => {
    try {
      const stored = await AsyncStorage.getItem('featuredProducts');
      if (stored) {
        set({ featuredProducts: JSON.parse(stored) });
      }
    } catch (error) {
      console.error('Error loading featured products:', error);
    }
  },

  clearFeaturedProducts: async () => {
    try {
      await AsyncStorage.removeItem('featuredProducts');
      set({ featuredProducts: [] });
    } catch (error) {
      console.error('Error clearing featured products:', error);
    }
  },

  isFeatured: (id: string) => {
    return get().featuredProducts.some((p) => p.id === id);
  },
}));
