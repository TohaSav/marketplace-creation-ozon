export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
  status: "active" | "inactive" | "draft";
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  status: "new" | "shipped" | "delivered" | "cancelled";
  date: string;
}

export interface SellerStats {
  totalSales: number;
  ordersCount: number;
  productsCount: number;
  rating: number;
  balance: number;
}

export interface Story {
  id: number;
  productId?: string;
  image?: File;
  discount?: number;
  createdAt: string;
}

export type OrderStatus = Order["status"];
export type ProductStatus = Product["status"];
