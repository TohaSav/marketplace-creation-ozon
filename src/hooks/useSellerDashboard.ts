import { useState, useEffect } from "react";
import {
  Product,
  Order,
  SellerStats,
  Story,
} from "@/types/seller-dashboard.types";
import {
  MOCK_PRODUCTS,
  MOCK_ORDERS,
  MOCK_STATS,
} from "@/constants/seller-dashboard.constants";
import { useAuth } from "@/context/AuthContext";

export interface UseSellerDashboardResult {
  stats: SellerStats;
  products: Product[];
  orders: Order[];
  stories: Story[];
  isCreateStoryOpen: boolean;
  setIsCreateStoryOpen: (open: boolean) => void;
  handleCreateStory: (storyData: any) => void;
  handleDeleteStory: (storyId: number) => void;
  handleAddProduct: () => void;
  handleEditProduct: (productId: number) => void;
  handleDeleteProduct: (productId: number) => void;
  handleProcessOrder: (orderId: string) => void;
  handleMessageCustomer: (orderId: string) => void;
  handleEditProfile: () => void;
}

export function useSellerDashboard(): UseSellerDashboardResult {
  const { user } = useAuth();
  const [stats, setStats] = useState<SellerStats>(MOCK_STATS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [stories, setStories] = useState<Story[]>([]);
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);

  // Проверяем, является ли пользователь новым продавцом
  const isNewSeller =
    !user?.sellerStats ||
    (user.sellerStats.totalSales === 0 &&
      user.sellerStats.ordersCount === 0 &&
      user.sellerStats.productsCount === 0);

  useEffect(() => {
    if (isNewSeller) {
      // Устанавливаем нулевые значения для нового продавца
      setStats({
        totalSales: 0,
        ordersCount: 0,
        productsCount: 0,
        rating: 0,
        balance: 0,
      });
      setProducts([]);
      setOrders([]);
    } else if (user?.sellerStats) {
      // Используем реальные данные пользователя если они есть
      setStats(user.sellerStats);
      // Фильтруем товары и заказы по ID продавца
      setProducts(
        MOCK_PRODUCTS.filter((product) => product.sellerId === user.id),
      );
      setOrders(MOCK_ORDERS.filter((order) => order.sellerId === user.id));
    }
  }, [user, isNewSeller]);

  const handleCreateStory = (storyData: any) => {
    const newStory: Story = {
      id: stories.length + 1,
      ...storyData,
      createdAt: new Date().toISOString(),
    };
    setStories([...stories, newStory]);
    setIsCreateStoryOpen(false);
  };

  const handleDeleteStory = (storyId: number) => {
    setStories(stories.filter((story) => story.id !== storyId));
  };

  const handleAddProduct = () => {
    // В реальном приложении здесь будет навигация на страницу добавления товара
    console.log("Добавление нового товара");
  };

  const handleEditProduct = (productId: number) => {
    // В реальном приложении здесь будет навигация на страницу редактирования
    console.log("Редактирование товара:", productId);
  };

  const handleDeleteProduct = (productId: number) => {
    // В реальном приложении здесь будет API вызов для удаления товара
    console.log("Удаление товара:", productId);
  };

  const handleProcessOrder = (orderId: string) => {
    // В реальном приложении здесь будет логика обработки заказа
    console.log("Обработка заказа:", orderId);
  };

  const handleMessageCustomer = (orderId: string) => {
    // В реальном приложении здесь будет открытие чата с покупателем
    console.log("Сообщение покупателю по заказу:", orderId);
  };

  const handleEditProfile = () => {
    // В реальном приложении здесь будет навигация на страницу редактирования профиля
    console.log("Редактирование профиля продавца");
  };

  return {
    stats,
    products,
    orders,
    stories,
    isCreateStoryOpen,
    setIsCreateStoryOpen,
    handleCreateStory,
    handleDeleteStory,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleProcessOrder,
    handleMessageCustomer,
    handleEditProfile,
  };
}
