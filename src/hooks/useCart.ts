import { useState, useCallback } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = useCallback(
    (product: { id: number; name: string; price: number; image: string }) => {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === product.id);
        if (existingItem) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setCartCount((prev) => prev + 1);
    },
    [],
  );

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        setCartCount((prev) => prev - 1);
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      setCartCount((prev) => prev - 1);
      return prev.filter((item) => item.id !== productId);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartCount(0);
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
  };
}
