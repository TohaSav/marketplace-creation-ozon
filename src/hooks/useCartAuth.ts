import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

export const useCartAuth = () => {
  const { user, login, register } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null);

  // Функция добавления товара в корзину с проверкой авторизации
  const handleAddToCart = (product: any) => {
    if (user) {
      // Пользователь авторизован - добавляем товар
      addToCart({
        id: parseInt(product.id),
        name: product.name,
        price: product.price,
        image: ('image' in product ? product.image : product.images?.[0]) || '/placeholder.svg',
      });

      toast({
        title: "Товар добавлен в корзину",
        description: `${product.name} успешно добавлен в корзину`,
        duration: 3000,
      });
    } else {
      // Пользователь не авторизован - показываем модальное окно
      setPendingProduct(product);
      setShowAuthModal(true);
    }
  };

  // Обработка входа через модальное окно
  const handleModalLogin = async (email: string, password: string) => {
    try {
      // Проверяем наличие пользователя в localStorage
      const savedUsers = localStorage.getItem("users");
      const savedSellers = localStorage.getItem("sellers");
      
      let foundUser = null;

      // Ищем среди обычных пользователей
      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        foundUser = users.find((u: any) => u.email === email);
      }

      // Ищем среди продавцов, если не найден среди пользователей
      if (!foundUser && savedSellers) {
        const sellers = JSON.parse(savedSellers);
        foundUser = sellers.find((s: any) => s.email === email);
        if (foundUser) {
          foundUser.userType = "seller";
        }
      }

      if (foundUser && foundUser.email === email) {
        // Логиним пользователя
        const userData = {
          ...foundUser,
          userType: foundUser.userType || "user"
        };
        
        login(userData);
        
        // Сохраняем токен в localStorage
        if (foundUser.userType === "seller") {
          localStorage.setItem("seller-token", JSON.stringify(userData));
        } else {
          localStorage.setItem("user-token", JSON.stringify(userData));
        }

        // Добавляем отложенный товар в корзину
        if (pendingProduct) {
          addToCart({
            id: parseInt(pendingProduct.id),
            name: pendingProduct.name,
            price: pendingProduct.price,
            image: ('image' in pendingProduct ? pendingProduct.image : pendingProduct.images?.[0]) || '/placeholder.svg',
          });

          toast({
            title: "Добро пожаловать!",
            description: `${pendingProduct.name} добавлен в корзину`,
            duration: 3000,
          });
        }

        // Закрываем модальное окно и очищаем состояние
        setShowAuthModal(false);
        setPendingProduct(null);
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный email или пароль",
          variant: "destructive",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при входе",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  // Обработка регистрации через модальное окно
  const handleModalRegister = async (name: string, email: string, password: string) => {
    try {
      // Проверяем, существует ли пользователь с таким email
      const savedUsers = localStorage.getItem("users");
      const savedSellers = localStorage.getItem("sellers");
      
      let userExists = false;

      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        userExists = users.some((u: any) => u.email === email);
      }

      if (!userExists && savedSellers) {
        const sellers = JSON.parse(savedSellers);
        userExists = sellers.some((s: any) => s.email === email);
      }

      if (userExists) {
        toast({
          title: "Ошибка регистрации",
          description: "Пользователь с таким email уже существует",
          variant: "destructive",
          duration: 4000,
        });
        return;
      }

      // Регистрируем нового пользователя
      const newUser = {
        name,
        email,
        password,
        userType: "user" as const,
        phone: '',
        balance: 0
      };

      register(newUser);

      // Сохраняем токен
      const userData = {
        ...newUser,
        id: Date.now(),
        joinDate: new Date().toISOString(),
        status: "active"
      };
      
      localStorage.setItem("user-token", JSON.stringify(userData));

      // Добавляем отложенный товар в корзину
      if (pendingProduct) {
        addToCart({
          id: parseInt(pendingProduct.id),
          name: pendingProduct.name,
          price: pendingProduct.price,
          image: ('image' in pendingProduct ? pendingProduct.image : pendingProduct.images?.[0]) || '/placeholder.svg',
        });

        toast({
          title: "Добро пожаловать!",
          description: `Регистрация успешна! ${pendingProduct.name} добавлен в корзину`,
          duration: 4000,
        });
      }

      // Закрываем модальное окно и очищаем состояние
      setShowAuthModal(false);
      setPendingProduct(null);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при регистрации",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  // Закрытие модального окна
  const handleModalClose = () => {
    setShowAuthModal(false);
    setPendingProduct(null);
  };

  return {
    user,
    showAuthModal,
    pendingProduct,
    handleAddToCart,
    handleModalLogin,
    handleModalRegister,
    handleModalClose,
  };
};