import {
  MarketplaceState,
  Product,
  CartItem,
  Order,
  Notification,
} from "@/types/marketplace";
import { MarketplaceAction } from "./actions";

export const initialState: MarketplaceState = {
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

// Product reducers
const productReducer = (
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

    default:
      return state;
  }
};

// Cart reducers
const cartReducer = (
  state: MarketplaceState,
  action: MarketplaceAction,
): MarketplaceState => {
  switch (action.type) {
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

    default:
      return state;
  }
};

// Order reducers
const orderReducer = (
  state: MarketplaceState,
  action: MarketplaceAction,
): MarketplaceState => {
  switch (action.type) {
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

    default:
      return state;
  }
};

// Notification reducers
const notificationReducer = (
  state: MarketplaceState,
  action: MarketplaceAction,
): MarketplaceState => {
  switch (action.type) {
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

    default:
      return state;
  }
};

// UI reducers
const uiReducer = (
  state: MarketplaceState,
  action: MarketplaceAction,
): MarketplaceState => {
  switch (action.type) {
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

// Main reducer combining all reducers
export const marketplaceReducer = (
  state: MarketplaceState,
  action: MarketplaceAction,
): MarketplaceState => {
  // Try each reducer in order
  let newState = productReducer(state, action);
  if (newState !== state) return newState;

  newState = cartReducer(state, action);
  if (newState !== state) return newState;

  newState = orderReducer(state, action);
  if (newState !== state) return newState;

  newState = notificationReducer(state, action);
  if (newState !== state) return newState;

  newState = uiReducer(state, action);
  if (newState !== state) return newState;

  return state;
};
