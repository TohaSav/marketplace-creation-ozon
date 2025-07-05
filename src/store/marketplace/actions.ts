import { Product, CartItem, Order, Notification } from "@/types/marketplace";

export type MarketplaceAction =
  // Product actions
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  // Cart actions
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  // Order actions
  | { type: "SET_ORDERS"; payload: Order[] }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER"; payload: Order }
  // Notification actions
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" }
  // UI state actions
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_CONNECTED"; payload: boolean }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_PRICE_RANGE"; payload: [number, number] }
  | { type: "SET_SORT"; payload: { sortBy: string; sortOrder: string } };

// Action creators
export const productActions = {
  setProducts: (products: Product[]): MarketplaceAction => ({
    type: "SET_PRODUCTS",
    payload: products,
  }),
  addProduct: (product: Product): MarketplaceAction => ({
    type: "ADD_PRODUCT",
    payload: product,
  }),
  updateProduct: (product: Product): MarketplaceAction => ({
    type: "UPDATE_PRODUCT",
    payload: product,
  }),
  deleteProduct: (productId: string): MarketplaceAction => ({
    type: "DELETE_PRODUCT",
    payload: productId,
  }),
};

export const cartActions = {
  addToCart: (product: Product, quantity: number): MarketplaceAction => ({
    type: "ADD_TO_CART",
    payload: { product, quantity },
  }),
  removeFromCart: (itemId: string): MarketplaceAction => ({
    type: "REMOVE_FROM_CART",
    payload: itemId,
  }),
  updateCartQuantity: (id: string, quantity: number): MarketplaceAction => ({
    type: "UPDATE_CART_QUANTITY",
    payload: { id, quantity },
  }),
  clearCart: (): MarketplaceAction => ({
    type: "CLEAR_CART",
  }),
};

export const orderActions = {
  setOrders: (orders: Order[]): MarketplaceAction => ({
    type: "SET_ORDERS",
    payload: orders,
  }),
  addOrder: (order: Order): MarketplaceAction => ({
    type: "ADD_ORDER",
    payload: order,
  }),
  updateOrder: (order: Order): MarketplaceAction => ({
    type: "UPDATE_ORDER",
    payload: order,
  }),
};

export const notificationActions = {
  addNotification: (notification: Notification): MarketplaceAction => ({
    type: "ADD_NOTIFICATION",
    payload: notification,
  }),
  markNotificationRead: (notificationId: string): MarketplaceAction => ({
    type: "MARK_NOTIFICATION_READ",
    payload: notificationId,
  }),
  clearNotifications: (): MarketplaceAction => ({
    type: "CLEAR_NOTIFICATIONS",
  }),
};

export const uiActions = {
  setLoading: (loading: boolean): MarketplaceAction => ({
    type: "SET_LOADING",
    payload: loading,
  }),
  setConnected: (connected: boolean): MarketplaceAction => ({
    type: "SET_CONNECTED",
    payload: connected,
  }),
  setSearchQuery: (query: string): MarketplaceAction => ({
    type: "SET_SEARCH_QUERY",
    payload: query,
  }),
  setCategory: (category: string): MarketplaceAction => ({
    type: "SET_CATEGORY",
    payload: category,
  }),
  setPriceRange: (range: [number, number]): MarketplaceAction => ({
    type: "SET_PRICE_RANGE",
    payload: range,
  }),
  setSort: (sortBy: string, sortOrder: string): MarketplaceAction => ({
    type: "SET_SORT",
    payload: { sortBy, sortOrder },
  }),
};
