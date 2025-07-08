import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAjaxNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Перехватываем все клики по ссылкам
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href) {
        // Проверяем, что это внутренняя ссылка
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          const path = url.pathname + url.search + url.hash;
          navigate(path);
        }
      }
    };

    // Перехватываем отправку форм
    const handleFormSubmit = async (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (form && form.action) {
        e.preventDefault();

        const formData = new FormData(form);
        const url = new URL(form.action, window.location.origin);

        try {
          const response = await fetch(url.href, {
            method: form.method || "POST",
            body: formData,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          });

          if (response.ok) {
            const result = await response.json();
            if (result.redirect) {
              navigate(result.redirect);
            }
          }
        } catch (error) {
          console.error("Form submission error:", error);
        }
      }
    };

    // Добавляем обработчики
    document.addEventListener("click", handleLinkClick);
    document.addEventListener("submit", handleFormSubmit);

    // Обновляем заголовок страницы
    const updatePageTitle = () => {
      const titles: { [key: string]: string } = {
        "/": "CalibreStore - Главная",
        "/category/electronics": "Электроника - CalibreStore",
        "/category/clothing": "Одежда - CalibreStore",
        "/category/home": "Дом и сад - CalibreStore",
        "/category/sport": "Спорт - CalibreStore",
        "/category/beauty": "Красота - CalibreStore",
        "/category/auto": "Авто - CalibreStore",
        "/category/books": "Книги - CalibreStore",
        "/category/toys": "Игрушки - CalibreStore",
        "/cart": "Корзина - CalibreStore",
        "/favorites": "Избранное - CalibreStore",
        "/profile": "Профиль - CalibreStore",
        "/orders": "Заказы - CalibreStore",
        "/seller/dashboard": "Кабинет продавца - CalibreStore",
        "/admin/dashboard": "Админ-панель - CalibreStore",
      };

      document.title = titles[location.pathname] || "CalibreStore";
    };

    updatePageTitle();

    return () => {
      document.removeEventListener("click", handleLinkClick);
      document.removeEventListener("submit", handleFormSubmit);
    };
  }, [navigate, location.pathname]);

  // Функция для програмной навигации с Ajax
  const ajaxNavigate = async (
    path: string,
    options?: { replace?: boolean },
  ) => {
    try {
      // Загружаем данные для новой страницы
      const response = await fetch(`/api/page-data${path}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Обновляем историю браузера
        if (options?.replace) {
          window.history.replaceState(data, "", path);
        } else {
          window.history.pushState(data, "", path);
        }

        // Обновляем состояние приложения
        navigate(path, { replace: options?.replace });
      }
    } catch (error) {
      console.error("Ajax navigation error:", error);
      // Fallback к обычной навигации
      navigate(path, { replace: options?.replace });
    }
  };

  return { ajaxNavigate };
};
