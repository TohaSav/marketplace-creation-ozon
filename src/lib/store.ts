import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  favorites: Product[];
  cart: CartItem[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      favorites: [],
      cart: [],

      addToFavorites: (product) =>
        set((state) => ({
          favorites: state.favorites.find((p) => p.id === product.id)
            ? state.favorites
            : [...state.favorites, product],
        })),

      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        })),

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart:
            quantity === 0
              ? state.cart.filter((item) => item.id !== productId)
              : state.cart.map((item) =>
                  item.id === productId ? { ...item, quantity } : item,
                ),
        })),

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "calibre-store",
    },
  ),
);
