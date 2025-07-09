import { useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  seller: string;
  location: string;
  image?: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 89990,
    description: "Новый флагманский смартфон Apple с камерой 48 МП",
    category: "electronics",
    rating: 4.8,
    seller: "TechStore",
    location: "Москва",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 74990,
    description: "Мощный Android-смартфон с отличной камерой",
    category: "electronics",
    rating: 4.7,
    seller: "GadgetShop",
    location: "СПб",
  },
  {
    id: "3",
    name: "Кожаная куртка",
    price: 12990,
    description: "Стильная кожаная куртка из натуральной кожи",
    category: "clothing",
    rating: 4.5,
    seller: "FashionStore",
    location: "Екатеринбург",
  },
  {
    id: "4",
    name: 'Книга "Мастер и Маргарита"',
    price: 590,
    description: "Классическое произведение М.А. Булгакова",
    category: "books",
    rating: 4.9,
    seller: "BookWorld",
    location: "Казань",
  },
  {
    id: "5",
    name: "Кроссовки Nike Air Max",
    price: 8990,
    description: "Удобные спортивные кроссовки для бега",
    category: "sports",
    rating: 4.6,
    seller: "SportGear",
    location: "Новосибирск",
  },
  {
    id: "6",
    name: "Набор для макияжа",
    price: 3490,
    description: "Профессиональный набор кистей и косметики",
    category: "beauty",
    rating: 4.4,
    seller: "BeautyPro",
    location: "Нижний Новгород",
  },
  {
    id: "7",
    name: "Комнатное растение Фикус",
    price: 1290,
    description: "Красивое комнатное растение для дома",
    category: "home",
    rating: 4.3,
    seller: "PlantShop",
    location: "Краснодар",
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Имитация загрузки данных
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const getProductsByCategory = (category: string) => {
    return products.filter((product) => product.category === category);
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  return {
    products,
    loading,
    getProductsByCategory,
    getProductById,
  };
};
