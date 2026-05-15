import { create } from 'zustand';
import { Design } from './cartStore';

export interface WishlistState {
  items: Design[];
  addToWishlist: (design: Design) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  addToWishlist: (design: Design) => {
    const items = get().items;
    const exists = items.find((item) => item.id === design.id);
    if (!exists) {
      set({
        items: [...items, design],
      });
    }
  },
  removeFromWishlist: (id: string) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },
  isInWishlist: (id: string) => {
    return get().items.some((item) => item.id === id);
  },
  clearWishlist: () => {
    set({ items: [] });
  },
}));
