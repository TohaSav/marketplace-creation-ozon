import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { ProductFormData, NewProduct } from "@/types/product";
import {
  generateUniqueArticle,
  generateUniqueBarcode,
  generateProductQRCode,
} from "@/utils/productGenerators";

export const useAddProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshSubscription } = useSubscription();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState<ProductFormData>({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
    stock: "",
    article: "",
    barcode: "",
  });

  // Автоматическая генерация артикула и штрих-кода при изменении названия и категории
  useEffect(() => {
    if (product.title && product.category) {
      const newArticle = generateUniqueArticle(product.title, product.category);
      const newBarcode = generateUniqueBarcode();

      setProduct((prev) => ({
        ...prev,
        article: newArticle,
        barcode: newBarcode,
      }));
    }
  }, [product.title, product.category]);

  const updateProduct = (updates: Partial<ProductFormData>) => {
    setProduct((prev) => ({ ...prev, ...updates }));
  };

  const regenerateArticle = () => {
    if (product.title && product.category) {
      const newArticle = generateUniqueArticle(product.title, product.category);
      updateProduct({ article: newArticle });
    }
  };

  const regenerateBarcode = () => {
    const newBarcode = generateUniqueBarcode();
    updateProduct({ barcode: newBarcode });
  };

  const handleImageChange = (file: File | null) => {
    updateProduct({ image: file });
  };

  const submitProduct = async (): Promise<void> => {
    if (!user?.id) {
      throw new Error("Не авторизован");
    }

    setLoading(true);

    try {
      const seller = JSON.parse(localStorage.getItem("seller-token") || "{}");
      if (!seller.id) {
        throw new Error("Не авторизован");
      }

      const newProduct: NewProduct = {
        id: Date.now(),
        title: product.title,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        image: product.image
          ? URL.createObjectURL(product.image)
          : "/placeholder.svg",
        rating: { rate: 0, count: 0 },
        sellerId: seller.id,
        sellerName: seller.name,
        stock: parseInt(product.stock),
        sold: 0,
        createdAt: new Date().toISOString(),
        article: product.article,
        barcode: product.barcode,
        qrCode: generateProductQRCode(product.article, product.title),
      };

      // Добавляем к глобальным товарам
      const existingProducts = JSON.parse(
        localStorage.getItem("products") || "[]",
      );
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));

      // Обновляем данные о продавце
      const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
      const updatedSellers = sellers.map((s: any) =>
        s.id === seller.id
          ? { ...s, products: [...(s.products || []), newProduct] }
          : s,
      );
      localStorage.setItem("sellers", JSON.stringify(updatedSellers));

      const updatedSeller = updatedSellers.find((s: any) => s.id === seller.id);
      localStorage.setItem("seller-token", JSON.stringify(updatedSeller));

      // Обновляем статистику подписки
      refreshSubscription();

      toast({
        title: "Товар добавлен",
        description: "Ваш товар успешно добавлен в каталог",
      });

      navigate("/seller/dashboard");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelAddProduct = () => {
    navigate("/seller/dashboard");
  };

  return {
    product,
    loading,
    updateProduct,
    regenerateArticle,
    regenerateBarcode,
    handleImageChange,
    submitProduct,
    cancelAddProduct,
  };
};
