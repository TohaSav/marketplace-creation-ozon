import { useState, useCallback } from "react";

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

export function useFavorites() {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const addToFavorites = useCallback((product: FavoriteItem) => {
    setFavoriteItems((prev) => {
      const isAlreadyFavorite = prev.some((item) => item.id === product.id);
      if (isAlreadyFavorite) {
        return prev;
      }
      setFavoritesCount((prev) => prev + 1);
      return [...prev, product];
    });
  }, []);

  const removeFromFavorites = useCallback((productId: number) => {
    setFavoriteItems((prev) => {
      const filtered = prev.filter((item) => item.id !== productId);
      setFavoritesCount(filtered.length);
      return filtered;
    });
  }, []);

  const toggleFavorite = useCallback((product: FavoriteItem) => {
    setFavoriteItems((prev) => {
      const isAlreadyFavorite = prev.some((item) => item.id === product.id);
      if (isAlreadyFavorite) {
        const filtered = prev.filter((item) => item.id !== product.id);
        setFavoritesCount(filtered.length);
        return filtered;
      } else {
        setFavoritesCount((prev) => prev + 1);
        return [...prev, product];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (productId: number) => {
      return favoriteItems.some((item) => item.id === productId);
    },
    [favoriteItems],
  );

  return {
    favoriteItems,
    favoritesCount,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
}
