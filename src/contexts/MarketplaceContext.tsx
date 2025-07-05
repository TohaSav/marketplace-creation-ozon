import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sellerId: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

interface Notification {
  id: string;
  type: "order" | "payment" | "product" | "promotion" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  userId?: string;
}

interface MarketplaceState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  notifications: Notification[];
  isLoading: boolean;
  isConnected: boolean;
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: "name" | "price" | "rating" | "newest";
  sortOrder: "asc" | "desc";
}

type MarketplaceAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER"; payload: Order }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CONNECTED"; payload: boolean }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "SET_SORT"; payload: { sortBy: string; sortOrder: string } };

const initialState: MarketplaceState = {
  products: [],
  cart: [],
  orders: [],
  notifications: [],
  isLoading: false,
  isConnected: false,
  searchQuery: "",
  selectedCategory: "",
  priceRange: [0, 10000],
  sortBy: "newest",
  sortOrder: "desc",
};

const marketplaceReducer = (
  state: MarketplaceState,
  action: MarketplaceAction,
): MarketplaceState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };

    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.productId === action.payload.product.id,
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.productId === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: Date.now().toString(),
            productId: action.payload.product.id,
            quantity: action.payload.quantity,
            price: action.payload.product.price,
            product: action.payload.product,
          },
        ],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_ORDERS":
      return { ...state, orders: action.payload };

    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };

    case "UPDATE_ORDER":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? action.payload : o,
        ),
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload ? { ...n, isRead: true } : n,
        ),
      };

    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_CONNECTED":
      return { ...state, isConnected: action.payload };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };

    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload.sortBy as any,
        sortOrder: action.payload.sortOrder as any,
      };

    default:
      return state;
  }
};

interface MarketplaceContextType {
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
  // Actions
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (items: CartItem[]) => Promise<void>;
  loadProducts: () => Promise<void>;
  searchProducts: (query: string) => void;
  filterByCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSorting: (sortBy: string, sortOrder: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(
  undefined,
);

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
};

interface MarketplaceProviderProps {
  children: ReactNode;
}

export const MarketplaceProvider: React.FC<MarketplaceProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);
  const { toast } = useToast();

  // WebSocket connection for real-time updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = () => {
      dispatch({ type: "SET_CONNECTED", payload: true });
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "NEW_ORDER":
          dispatch({ type: "ADD_ORDER", payload: data.order });
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: Date.now().toString(),
              type: "order",
              title: "Новый заказ",
              message: `Заказ #${data.order.id} создан`,
              isRead: false,
              createdAt: new Date(),
            },
          });
          toast({
            title: "Новый заказ",
            description: `Заказ #${data.order.id} создан`,
          });
          break;

        case "ORDER_STATUS_UPDATE":
          dispatch({ type: "UPDATE_ORDER", payload: data.order });
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: Date.now().toString(),
              type: "order",
              title: "Статус заказа изменен",
              message: `Заказ #${data.order.id} - ${data.order.status}`,
              isRead: false,
              createdAt: new Date(),
            },
          });
          break;

        case "PRODUCT_UPDATE":
          dispatch({ type: "UPDATE_PRODUCT", payload: data.product });
          break;

        case "NEW_NOTIFICATION":
          dispatch({ type: "ADD_NOTIFICATION", payload: data.notification });
          toast({
            title: data.notification.title,
            description: data.notification.message,
          });
          break;
      }
    };

    ws.onclose = () => {
      dispatch({ type: "SET_CONNECTED", payload: false });
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      dispatch({ type: "SET_CONNECTED", payload: false });
    };

    return () => {
      ws.close();
    };
  }, [toast]);

  // Load initial data
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
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
  };

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} x${quantity}`,
    });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    toast({
      title: "Товар удален из корзины",
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id: itemId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const placeOrder = async (items: CartItem[]) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const order: Order = {
        id: Date.now().toString(),
        userId: "current-user",
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
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
  };

  const searchProducts = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  };

  const filterByCategory = (category: string) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  const setPriceRange = (range: [number, number]) => {
    dispatch({ type: "SET_PRICE_RANGE", payload: range });
  };

  const setSorting = (sortBy: string, sortOrder: string) => {
    dispatch({ type: "SET_SORT", payload: { sortBy, sortOrder } });
  };

  const markNotificationAsRead = (notificationId: string) => {
    dispatch({ type: "MARK_NOTIFICATION_READ", payload: notificationId });
  };

  const value: MarketplaceContextType = {
    state,
    dispatch,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    placeOrder,
    loadProducts,
    searchProducts,
    filterByCategory,
    setPriceRange,
    setSorting,
    markNotificationAsRead,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};
