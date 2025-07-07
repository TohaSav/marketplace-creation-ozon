import { useState, useEffect } from "react";
import { Product, Order, SellerStats } from "@/types/seller-dashboard.types";
import { Story } from "@/types/stories";
import {
  MOCK_PRODUCTS,
  MOCK_ORDERS,
  MOCK_STATS,
} from "@/constants/seller-dashboard.constants";
import { useAuth } from "@/context/AuthContext";
import { CreateStoryData } from "@/types/stories";
import {
  createStory,
  getSellerStories,
  deleteStory,
} from "@/utils/stories.utils";

export interface UseSellerDashboardResult {
  stats: SellerStats;
  products: Product[];
  orders: Order[];
  stories: Story[];
  isCreateStoryOpen: boolean;
  setIsCreateStoryOpen: (open: boolean) => void;
  handleCreateStory: (storyData: CreateStoryData) => void;
  handleDeleteStory: (storyId: string) => void;
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

  useEffect(() => {
    if (user?.id) {
      // Загружаем Stories продавца
      const sellerStories = getSellerStories(user.id);
      setStories(sellerStories);

      // Загружаем только реальные товары добавленные продавцом
      const allProducts = JSON.parse(localStorage.getItem("products") || "[]");
      const sellerProducts = allProducts.filter(
        (p: any) => p.sellerId === user.id,
      );
      setProducts(sellerProducts);

      // Обновляем статистику на основе реальных товаров
      const activeProducts = sellerProducts.filter(
        (p: any) => p.status === "active",
      );
      const totalSold = sellerProducts.reduce(
        (sum: number, p: any) => sum + (p.sold || 0),
        0,
      );
      const totalRevenue = sellerProducts.reduce(
        (sum: number, p: any) => sum + (p.sold || 0) * p.price,
        0,
      );

      setStats({
        totalSales: totalRevenue,
        ordersCount: totalSold,
        productsCount: activeProducts.length,
        rating: user?.sellerStats?.rating || 0,
        balance: user?.sellerStats?.balance || 0,
      });

      // Для заказов пока оставляем моковые данные, фильтруя по ID продавца
      setOrders(MOCK_ORDERS.filter((order) => order.sellerId === user.id));
    } else {
      // Если пользователь не авторизован, устанавливаем пустые значения
      setStats({
        totalSales: 0,
        ordersCount: 0,
        productsCount: 0,
        rating: 0,
        balance: 0,
      });
      setProducts([]);
      setOrders([]);
      setStories([]);
    }
  }, [user]);

  const handleCreateStory = async (storyData: CreateStoryData) => {
    try {
      if (!user?.id || !user?.name) {
        throw new Error("Пользователь не авторизован");
      }

      const newStory = await createStory(storyData, user.id, user.name);
      setStories((prev) => [...prev, newStory]);
      setIsCreateStoryOpen(false);
    } catch (error) {
      console.error("Ошибка создания Story:", error);
      alert(error instanceof Error ? error.message : "Ошибка создания Story");
    }
  };

  const handleDeleteStory = (storyId: string) => {
    try {
      deleteStory(storyId);
      setStories(stories.filter((story) => story.id !== storyId));
    } catch (error) {
      console.error("Ошибка удаления Story:", error);
      alert("Ошибка удаления Story");
    }
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
