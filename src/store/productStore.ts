import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sellerId: string;
  sellerName: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  category?: string;
  sellerId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

interface ProductStore {
  products: Product[];

  // Actions
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Getters
  getProducts: (filters?: ProductFilters) => Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsBySeller: (sellerId: string) => Product[];
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: (limit?: number) => Product[];
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id
              ? { ...product, ...updates, updatedAt: new Date() }
              : product,
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      getProducts: (filters) => {
        const { products } = get();

        if (!filters) return products;

        return products.filter((product) => {
          if (filters.category && product.category !== filters.category) {
            return false;
          }

          if (filters.sellerId && product.sellerId !== filters.sellerId) {
            return false;
          }

          if (filters.minPrice && product.price < filters.minPrice) {
            return false;
          }

          if (filters.maxPrice && product.price > filters.maxPrice) {
            return false;
          }

          if (
            filters.inStock !== undefined &&
            product.inStock !== filters.inStock
          ) {
            return false;
          }

          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            return (
              product.name.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm) ||
              product.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
            );
          }

          return true;
        });
      },

      getProductById: (id) => {
        return get().products.find((product) => product.id === id);
      },

      getProductsBySeller: (sellerId) => {
        return get().products.filter(
          (product) => product.sellerId === sellerId,
        );
      },

      getProductsByCategory: (category) => {
        return get().products.filter(
          (product) => product.category === category,
        );
      },

      getFeaturedProducts: (limit = 4) => {
        const { products } = get();

        // Сортируем по рейтингу и количеству отзывов
        const sorted = [...products].sort((a, b) => {
          const aScore = a.rating * Math.log(a.reviewCount + 1);
          const bScore = b.rating * Math.log(b.reviewCount + 1);
          return bScore - aScore;
        });

        return sorted.slice(0, limit);
      },
    }),
    {
      name: "product-store",
    },
  ),
);
