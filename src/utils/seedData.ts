import { createSellerCard } from "@/utils/cardGenerator";
import { SellerCard } from "@/types/card.types";

// Создаем тестовых продавцов с картами
export const createTestSellers = () => {
  const testSellers = [
    {
      id: 1001,
      name: "Александр Петров",
      email: "alex@techstore.ru",
      phone: "+7 (999) 123-45-67",
      userType: "seller" as const,
      shopName: "TechStore Moscow",
      status: "active" as const,
      joinDate: "2024-01-15",
      isSeller: true,
    },
    {
      id: 1002,
      name: "Мария Сидорова",
      email: "maria@gadgetworld.ru",
      phone: "+7 (999) 234-56-78",
      userType: "seller" as const,
      shopName: "GadgetWorld",
      status: "active" as const,
      joinDate: "2024-02-20",
      isSeller: true,
    },
    {
      id: 1003,
      name: "Дмитрий Иванов",
      email: "dmitry@applestore.ru",
      phone: "+7 (999) 345-67-89",
      userType: "seller" as const,
      shopName: "Apple Premium Reseller",
      status: "active" as const,
      joinDate: "2024-03-10",
      isSeller: true,
    },
    {
      id: 1004,
      name: "Анна Козлова",
      email: "anna@sportstyle.ru",
      phone: "+7 (999) 456-78-90",
      userType: "seller" as const,
      shopName: "SportStyle",
      status: "active" as const,
      joinDate: "2024-04-05",
      isSeller: true,
    },
    {
      id: 1005,
      name: "Сергей Федоров",
      email: "sergey@audiotech.ru",
      phone: "+7 (999) 567-89-01",
      userType: "seller" as const,
      shopName: "AudioTech Pro",
      status: "active" as const,
      joinDate: "2024-05-12",
      isSeller: true,
    },
    {
      id: 1006,
      name: "Елена Морозова",
      email: "elena@toysparadise.ru",
      phone: "+7 (999) 678-90-12",
      userType: "seller" as const,
      shopName: "ToysParadise",
      status: "active" as const,
      joinDate: "2024-06-18",
      isSeller: true,
    },
  ];

  // Создаем карты для продавцов
  const sellerCards: SellerCard[] = [];
  testSellers.forEach((seller) => {
    const card = createSellerCard(seller.id, sellerCards, {
      total: Math.floor(Math.random() * 100000),
      monthly: Math.floor(Math.random() * 25000),
    });
    sellerCards.push(card);
  });

  return { testSellers, sellerCards };
};

// Функция для создания тестовых товаров
export const createTestProducts = () => {
  return [
    {
      id: "1",
      title: "iPhone 14 Pro",
      price: 79999,
      image: "/placeholder.svg",
      category: "electronics",
      rating: 4.9,
      reviews: 124,
      sellerId: "seller1",
    },
    {
      id: "2",
      title: "Samsung Galaxy S23",
      price: 69999,
      image: "/placeholder.svg",
      category: "electronics",
      rating: 4.8,
      reviews: 89,
      sellerId: "seller2",
    },
  ];
};

// Функция для инициализации тестовых данных
export const initializeTestData = () => {
  const { testSellers, sellerCards } = createTestSellers();
  const testProducts = createTestProducts();

  // Сохраняем продавцов
  const existingSellers = JSON.parse(localStorage.getItem("sellers") || "[]");
  const allSellers = [...existingSellers];

  testSellers.forEach((seller) => {
    if (!allSellers.find((s) => s.id === seller.id)) {
      allSellers.push(seller);
    }
  });

  localStorage.setItem("sellers", JSON.stringify(allSellers));

  // Сохраняем карты
  const existingCards = JSON.parse(localStorage.getItem("sellerCards") || "[]");
  const allCards = [...existingCards];

  sellerCards.forEach((card) => {
    if (!allCards.find((c) => c.sellerId === card.sellerId)) {
      allCards.push(card);
    }
  });

  localStorage.setItem("sellerCards", JSON.stringify(allCards));

  // Сохраняем товары
  const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
  const allProducts = [...existingProducts];

  testProducts.forEach((product) => {
    if (!allProducts.find((p) => p.id === product.id)) {
      allProducts.push(product);
    }
  });

  localStorage.setItem("products", JSON.stringify(allProducts));

  return { sellers: allSellers, cards: allCards, products: allProducts };
};
