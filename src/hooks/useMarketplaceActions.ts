import { useCallback } from "react";
import { Product, CartItem, Order } from "@/types/marketplace";
import { MarketplaceAction } from "@/store/marketplace/actions";
import { useToast } from "@/hooks/use-toast";

interface UseMarketplaceActionsProps {
  dispatch: React.Dispatch<MarketplaceAction>;
  state: any;
}

export const useMarketplaceActions = ({
  dispatch,
  state,
}: UseMarketplaceActionsProps) => {
  const { toast } = useToast();

  // Product actions
  const loadProducts = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockProducts: Product[] = [
        {
          id: "1",
          name: "Смартфон iPhone 15 Pro",
          description: "Новейший смартфон с камерой 48 МП",
          price: 89990,
          image: "/placeholder.svg",
          sellerId: "seller1",
          category: "electronics",
          stock: 50,
          rating: 4.8,
          reviews: 324,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Ноутбук MacBook Air M2",
          description: "Легкий и мощный ноутбук для работы",
          price: 119990,
          image: "/placeholder.svg",
          sellerId: "seller2",
          category: "electronics",
          stock: 25,
          rating: 4.9,
          reviews: 156,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          name: "Кроссовки Nike Air Max",
          description: "Удобные спортивные кроссовки",
          price: 12990,
          image: "/placeholder.svg",
          sellerId: "seller3",
          category: "shoes",
          stock: 100,
          rating: 4.6,
          reviews: 89,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      dispatch({ type: "SET_PRODUCTS", payload: mockProducts });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить товары",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch, toast]);

  const searchProducts = useCallback(
    (query: string) => {
      dispatch({ type: "SET_SEARCH_QUERY", payload: query });
    },
    [dispatch],
  );

  const filterByCategory = useCallback(
    (category: string) => {
      dispatch({ type: "SET_CATEGORY", payload: category });
    },
    [dispatch],
  );

  const setPriceRange = useCallback(
    (range: [number, number]) => {
      dispatch({ type: "SET_PRICE_RANGE", payload: range });
    },
    [dispatch],
  );

  const setSorting = useCallback(
    (sortBy: string, sortOrder: string) => {
      dispatch({ type: "SET_SORT", payload: { sortBy, sortOrder } });
    },
    [dispatch],
  );

  // Cart actions
  const addToCart = useCallback(
    (product: Product, quantity: number) => {
      dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
      toast({
        title: "Товар добавлен в корзину",
        description: `${product.name} x${quantity}`,
      });
    },
    [dispatch, toast],
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
      toast({
        title: "Товар удален из корзины",
      });
    },
    [dispatch, toast],
  );

  const updateCartQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }
      dispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: { id: itemId, quantity },
      });
    },
    [dispatch, removeFromCart],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  // Order actions
  const placeOrder = useCallback(
    async (items: CartItem[]) => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const order: Order = {
          id: Date.now().toString(),
          userId: "current-user",
          items,
          total: items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          ),
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        dispatch({ type: "ADD_ORDER", payload: order });
        dispatch({ type: "CLEAR_CART" });

        toast({
          title: "Заказ оформлен",
          description: `Заказ #${order.id} успешно создан`,
        });
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось оформить заказ",
          variant: "destructive",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [dispatch, toast],
  );

  // Notification actions
  const markNotificationAsRead = useCallback(
    (notificationId: string) => {
      dispatch({ type: "MARK_NOTIFICATION_READ", payload: notificationId });
    },
    [dispatch],
  );

  const clearNotifications = useCallback(() => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
  }, [dispatch]);

  return {
    // Product actions
    loadProducts,
    searchProducts,
    filterByCategory,
    setPriceRange,
    setSorting,
    // Cart actions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    // Order actions
    placeOrder,
    // Notification actions
    markNotificationAsRead,
    clearNotifications,
  };
};
