import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '@/data/products';

export const useInfiniteProducts = (itemsPerPage = 12) => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  // Загружаем все товары при инициализации
  useEffect(() => {
    loadInitialProducts();
    
    // Слушаем изменения в localStorage для автообновления
    const handleStorageChange = () => {
      loadInitialProducts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Проверяем обновления каждые 30 секунд
    const interval = setInterval(() => {
      checkForNewProducts();
    }, 30000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadInitialProducts = () => {
    const allProducts = getProducts();
    // Сортируем по дате создания (новые сначала) и популярности
    const sortedProducts = allProducts.sort((a, b) => {
      // Сначала популярные и рекомендуемые
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      
      // Потом по дате создания
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setTotalProducts(sortedProducts.length);
    
    // Загружаем первую порцию
    const initialProducts = sortedProducts.slice(0, itemsPerPage);
    setProducts(initialProducts);
    setCurrentPage(1);
    setHasMore(sortedProducts.length > itemsPerPage);
  };

  const checkForNewProducts = () => {
    const allProducts = getProducts();
    if (allProducts.length > totalProducts) {
      // Есть новые товары - перезагружаем
      loadInitialProducts();
    }
  };

  const loadMoreProducts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Имитируем небольшую задержку для реалистичности
    setTimeout(() => {
      const allProducts = getProducts().sort((a, b) => {
        // Тот же порядок сортировки
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newProducts = allProducts.slice(startIndex, endIndex);

      if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
        setCurrentPage(prev => prev + 1);
        setHasMore(endIndex < allProducts.length);
      } else {
        setHasMore(false);
      }

      setLoading(false);
    }, 500);
  }, [currentPage, loading, hasMore, itemsPerPage]);

  // Функция для принудительного обновления списка
  const refreshProducts = () => {
    loadInitialProducts();
  };

  return {
    products,
    loading,
    hasMore,
    loadMoreProducts,
    refreshProducts,
    totalProducts: products.length
  };
};