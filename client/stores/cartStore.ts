import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductOption, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, option: ProductOption, quantity: number) => void;
  removeItem: (productId: number, optionId: number) => void;
  updateQuantity: (productId: number, optionId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, option, quantity) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.selectedOption.id === option.id
          );

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity,
            };
            return { items: newItems };
          }

          return {
            items: [...state.items, { product, selectedOption: option, quantity }],
          };
        });
      },

      removeItem: (productId, optionId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.selectedOption.id === optionId)
          ),
        }));
      },

      updateQuantity: (productId, optionId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.selectedOption.id === optionId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.selectedOption.price * item.quantity,
          0
        );
      },

      totalCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'golden-dak-cart',
    }
  )
);
