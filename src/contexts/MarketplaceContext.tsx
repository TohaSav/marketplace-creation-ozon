import React, { createContext, useContext, useState, useEffect } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  seller: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface MarketplaceContextType {
  favorites: Product[];
  cart: CartItem[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isFavorite: (productId: string) => boolean;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined,
);

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within MarketplaceProvider");
  }
  return context;
};

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("marketplace-favorites");
      const savedCart = localStorage.getItem("marketplace-cart");

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading marketplace data:", error);
    }
  }, []);

  // Сохранение избранного в localStorage
  useEffect(() => {
    try {
      localStorage.setItem("marketplace-favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, [favorites]);

  // Сохранение корзины в localStorage
  useEffect(() => {
    try {
      localStorage.setItem("marketplace-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart]);

  const addToFavorites = (product: Product) => {
    setFavorites((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev; // Уже в избранном
      }
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item.id === productId);
  };

  const value: MarketplaceContextType = {
    favorites,
    cart,
    addToFavorites,
    removeFromFavorites,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isFavorite,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};
