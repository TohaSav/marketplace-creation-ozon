export interface Product {
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
  secureDeal?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  type: "order" | "payment" | "product" | "promotion" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  userId?: string;
}

export interface MarketplaceState {
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

export interface MarketplaceFilters {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: "name" | "price" | "rating" | "newest";
  sortOrder: "asc" | "desc";
}

export interface WebSocketMessage {
  type:
    | "NEW_ORDER"
    | "ORDER_STATUS_UPDATE"
    | "PRODUCT_UPDATE"
    | "NEW_NOTIFICATION";
  data: any;
  order?: Order;
  product?: Product;
  notification?: Notification;
}

export interface MarketplaceContextType {
  state: MarketplaceState;
  // Product actions
  loadProducts: () => Promise<void>;
  searchProducts: (query: string) => void;
  filterByCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSorting: (sortBy: string, sortOrder: string) => void;
  // Cart actions
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  // Order actions
  placeOrder: (items: CartItem[]) => Promise<void>;
  // Notification actions
  markNotificationAsRead: (notificationId: string) => void;
  clearNotifications: () => void;
}