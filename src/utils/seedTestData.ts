import { Product } from "@/types/product";

export const seedTestProducts = (sellerId: string) => {
  const testProducts: Product[] = [
    {
      id: `product_${Date.now()}_1`,
      name: "Профессиональные беспроводные наушники XM5",
      price: 25999,
      originalPrice: 29999,
      description:
        "Премиум беспроводные наушники с активным шумоподавлением, 30 часов работы от батареи",
      category: "Электроника",
      subcategory: "Наушники",
      images: ["/img/ad57f394-1a4b-4d5f-b715-53f792310b52.jpg"],
      stock: 15,
      sold: 8,
      rating: 4.8,
      reviews: 127,
      sellerId,
      sellerName: "Электроника Pro",
      status: "active",
      tags: ["беспроводные", "шумоподавление", "премиум"],
      specifications: {
        "Тип подключения": "Bluetooth 5.0",
        "Время работы": "30 часов",
        Вес: "250 г",
        Гарантия: "2 года",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `product_${Date.now()}_2`,
      name: "Элегантные часы Swiss Made",
      price: 89999,
      originalPrice: 109999,
      description:
        "Роскошные швейцарские часы с кожаным ремешком, водонепроницаемость 100м",
      category: "Аксессуары",
      subcategory: "Часы",
      images: ["/img/7d3e64ec-eacc-4ba4-9e16-77e3e6894d3a.jpg"],
      stock: 5,
      sold: 3,
      rating: 4.9,
      reviews: 45,
      sellerId,
      sellerName: "Электроника Pro",
      status: "active",
      tags: ["swiss", "премиум", "кожа"],
      specifications: {
        Механизм: "Швейцарский кварцевый",
        "Материал корпуса": "Нержавеющая сталь",
        Ремешок: "Натуральная кожа",
        Водонепроницаемость: "100 м",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `product_${Date.now()}_3`,
      name: "Смартфон Pro Max 256GB",
      price: 119999,
      description:
        "Флагманский смартфон с тройной камерой, 256GB памяти, быстрая зарядка",
      category: "Электроника",
      subcategory: "Смартфоны",
      images: ["/img/6fa2e9ca-3cdb-4efb-acbf-a241fa6974b7.jpg"],
      stock: 10,
      sold: 12,
      rating: 4.7,
      reviews: 89,
      sellerId,
      sellerName: "Электроника Pro",
      status: "active",
      tags: ["флагман", "камера", "быстрая зарядка"],
      specifications: {
        Память: "256 GB",
        Камера: "48 MP тройная",
        Экран: "6.7 дюймов",
        Батарея: "5000 mAh",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Добавляем товары в localStorage
  const existingProducts = JSON.parse(localStorage.getItem("products") || "[]");
  const updatedProducts = [...existingProducts, ...testProducts];
  localStorage.setItem("products", JSON.stringify(updatedProducts));

  console.log("Тестовые товары добавлены для продавца:", sellerId);
  return testProducts;
};
