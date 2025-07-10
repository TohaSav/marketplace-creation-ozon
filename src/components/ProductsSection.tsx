import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  seller: string;
  category: string;
  discount?: number;
}

interface ProductsSectionProps {
  title: string;
  category?: string;
}

export default function ProductsSection({
  title,
  category,
}: ProductsSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки товаров
    const loadProducts = () => {
      const mockProducts: Product[] = [
        {
          id: "1",
          name: "iPhone 15 Pro Max",
          price: 119999,
          originalPrice: 139999,
          image: "https://via.placeholder.com/300x300?text=iPhone+15",
          rating: 4.8,
          reviewCount: 2543,
          seller: "Apple Store",
          category: "electronics",
          discount: 15,
        },
        {
          id: "2",
          name: "MacBook Air M2",
          price: 89999,
          image: "https://via.placeholder.com/300x300?text=MacBook+Air",
          rating: 4.9,
          reviewCount: 1823,
          seller: "Apple Store",
          category: "electronics",
        },
        {
          id: "3",
          name: "Nike Air Max 270",
          price: 8999,
          originalPrice: 12999,
          image: "https://via.placeholder.com/300x300?text=Nike+Shoes",
          rating: 4.7,
          reviewCount: 892,
          seller: "Nike Official",
          category: "clothing",
          discount: 30,
        },
        {
          id: "4",
          name: "Samsung Galaxy S24",
          price: 79999,
          image: "https://via.placeholder.com/300x300?text=Galaxy+S24",
          rating: 4.6,
          reviewCount: 1456,
          seller: "Samsung Store",
          category: "electronics",
        },
      ];

      // Фильтрация по категории если указана
      const filtered = category
        ? mockProducts.filter((p) => p.category === category)
        : mockProducts;

      setProducts(filtered);
      setLoading(false);
    };

    // Имитация задержки загрузки
    setTimeout(loadProducts, 500);
  }, [category]);

  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg h-80 animate-pulse"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <Button variant="outline">
          Показать больше
          <Icon name="ArrowRight" className="ml-2" size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
