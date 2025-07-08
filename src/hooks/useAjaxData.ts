import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/services/api";

interface AjaxState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useAjaxData = <T>(
  endpoint: string,
  dependencies: any[] = [],
): AjaxState<T> & { refetch: () => Promise<void> } => {
  const [state, setState] = useState<AjaxState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(endpoint, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return {
    ...state,
    refetch: fetchData,
  };
};

export const useAjaxMutation = <T, P>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE" = "POST",
) => {
  const [state, setState] = useState<AjaxState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (payload?: P) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(endpoint, {
          method,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
          body: payload ? JSON.stringify(payload) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        throw error;
      }
    },
    [endpoint, method],
  );

  return {
    ...state,
    mutate,
  };
};

// Хук для работы с продуктами
export const useProducts = (category?: string, filters?: any) => {
  const endpoint = category
    ? `/api/categories/${category}/products`
    : "/api/products";

  return useAjaxData(endpoint, [category, filters]);
};

// Хук для работы с корзиной
export const useCart = () => {
  const { data: cart, loading, error, refetch } = useAjaxData("/api/cart");
  const { mutate: addToCart } = useAjaxMutation("/api/cart/add");
  const { mutate: updateCart } = useAjaxMutation("/api/cart/update", "PUT");
  const { mutate: removeFromCart } = useAjaxMutation(
    "/api/cart/remove",
    "DELETE",
  );

  return {
    cart,
    loading,
    error,
    refetch,
    addToCart,
    updateCart,
    removeFromCart,
  };
};

// Хук для работы с избранным
export const useFavorites = () => {
  const {
    data: favorites,
    loading,
    error,
    refetch,
  } = useAjaxData("/api/favorites");
  const { mutate: addToFavorites } = useAjaxMutation("/api/favorites/add");
  const { mutate: removeFromFavorites } = useAjaxMutation(
    "/api/favorites/remove",
    "DELETE",
  );

  return {
    favorites,
    loading,
    error,
    refetch,
    addToFavorites,
    removeFromFavorites,
  };
};

// Хук для работы с заказами
export const useOrders = () => {
  const { data: orders, loading, error, refetch } = useAjaxData("/api/orders");
  const { mutate: createOrder } = useAjaxMutation("/api/orders");

  return {
    orders,
    loading,
    error,
    refetch,
    createOrder,
  };
};

// Хук для поиска
export const useSearch = (query: string) => {
  const endpoint = query ? `/api/search?q=${encodeURIComponent(query)}` : null;

  return useAjaxData(endpoint ? endpoint : "/api/search", [query]);
};
