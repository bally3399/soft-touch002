import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { Design } from './cartStore';

export interface DesignState {
  designs: Design[];
  setDesigns: (designs: Design[]) => void;
  addDesign: (design: Design) => Promise<void>;
  removeDesign: (id: string) => Promise<void>;
  loadDesigns: () => Promise<void>;
  loadDesignsFromSupabase: () => Promise<void>;
  saveDesigns: (designs: Design[]) => Promise<void>;
}

export const useDesignStore = create<DesignState>((set, get) => ({
  designs: [],
  
  setDesigns: (designs: Design[]) => {
    // Deduplicate designs by ID to prevent duplicate key errors
    const uniqueDesigns = Array.from(
      new Map(designs.map(d => [d.id, d])).values()
    );
    set({ designs: uniqueDesigns });
  },
  
  addDesign: async (design: Design) => {
    const updatedDesigns = [...get().designs, design];
    set({ designs: updatedDesigns });
    try {
      await AsyncStorage.setItem('designs', JSON.stringify(updatedDesigns));
    } catch (error) {
      console.error('Failed to save designs:', error);
    }
  },
  
  removeDesign: async (id: string) => {
    const updatedDesigns = get().designs.filter((design) => design.id !== id);
    set({ designs: updatedDesigns });
    try {
      await AsyncStorage.setItem('designs', JSON.stringify(updatedDesigns));
    } catch (error) {
      console.error('Failed to remove design:', error);
    }
  },
  
  loadDesigns: async () => {
    try {
      const data = await AsyncStorage.getItem('designs');
      if (data) {
        const designs = JSON.parse(data) as Design[];
        set({ designs });
      }
    } catch (error) {
      console.error('Failed to load designs from local storage:', error);
    }
  },

  loadDesignsFromSupabase: async () => {
    try {
      const { getAllDesigns } = await import('@/services/firebaseDesigns');
      const supabaseDesigns = await getAllDesigns();
      
      if (supabaseDesigns && supabaseDesigns.length > 0) {
        const designs = supabaseDesigns.map(d => ({
          id: d.id,
          name: d.name,
          price: d.price,
          image: d.image,
          category: d.category,
          description: d.description,
        }));
        set({ designs });
        await AsyncStorage.setItem('designs', JSON.stringify(designs));
      }
    } catch (error) {
      console.error('Error loading designs from Supabase:', error);
    }
  },
  
  saveDesigns: async (designs: Design[]) => {
    try {
      await AsyncStorage.setItem('designs', JSON.stringify(designs));
      set({ designs });
    } catch (error) {
      console.error('Failed to save designs:', error);
    }
  },
}));
