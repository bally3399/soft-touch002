import { create } from 'zustand';

export interface Design {
  id: string;
  name: string;
  image: string;
  price?: number;
  category?: string;
  description?: string;
}

export interface CartItem extends Design {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (design: Design) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (design: Design) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === design.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === design.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({
        items: [...items, { ...design, quantity: 1 }],
      });
    }
  },
  removeFromCart: (id: string) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    });
  },
  updateQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(id);
    } else {
      set({
        items: get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      });
    }
  },
  clearCart: () => {
    set({ items: [] });
  },
  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
  },
}));
