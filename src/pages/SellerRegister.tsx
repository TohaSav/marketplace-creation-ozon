import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const SellerRegister = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    inn: "",
    email: "",
    phone: "",
    contactPerson: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    agreement: false,
    // Новые обязательные поля
    ogrn: "",
    kpp: "",
    bik: "",
    bankAccount: "",
    correspondentAccount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Валидация
    if (
      !formData.companyName ||
      !formData.inn ||
      !formData.email ||
      !formData.phone ||
      !formData.contactPerson ||
      !formData.password ||
      !formData.ogrn ||
      !formData.bik ||
      !formData.bankAccount
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают");
      setIsLoading(false);
      return;
    }

    if (!formData.agreement) {
      alert("Необходимо согласиться с условиями использования");
      setIsLoading(false);
      return;
    }

    try {
      // Проверяем существование email среди продавцов
      const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
      if (sellers.some((s: any) => s.email === formData.email)) {
        throw new Error("Продавец с таким email уже зарегистрирован");
      }

      // Имитация регистрации
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Создаем данные нового продавца
      const newSeller = {
        id: Date.now(),
        name: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        userType: "seller" as const,
        shopName: formData.companyName,
        inn: formData.inn,
        businessType: formData.businessType,
        status: "pending" as const,
        joinDate: new Date().toISOString().split("T")[0],
        balance: 0,
        avatar: "/api/placeholder/100/100",
        totalRevenue: 0,
        totalOrders: 0,
        productsCount: 0,
        // Новые обязательные поля
        ogrn: formData.ogrn,
        kpp: formData.kpp,
        bik: formData.bik,
        bankAccount: formData.bankAccount,
        correspondentAccount: formData.correspondentAccount,
        sellerStats: {
          totalRevenue: 0,
          totalOrders: 0,
          activeProducts: 0,
          conversionRate: 0,
          averageOrderValue: 0,
          totalViews: 0,
          totalClicks: 0,
          returningCustomers: 0,
        },
      };

      // Сохраняем в массив продавцов
      sellers.push(newSeller);
      localStorage.setItem("sellers", JSON.stringify(sellers));
      localStorage.setItem("seller-token", JSON.stringify(newSeller));

      // Авторизуем пользователя через контекст
      login(newSeller);

      toast({
        title: "Регистрация успешна!",
        description: `Добро пожаловать, ${newSeller.name}! Ваша заявка на модерации.`,
      });

      // Переход в кабинет продавца
      navigate("/seller/dashboard", { replace: true });
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      toast({
        title: "Ошибка регистрации",
        description: error instanceof Error ? error.message : "Произошла ошибка при регистрации",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Регистрация продавца
          </h1>
          <p className="text-gray-600">
            Присоединяйтесь к нашей торговой площадке и начните продавать
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Преимущества для продавцов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="TrendingUp" size={16} className="text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Увеличение продаж</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Users" size={16} className="text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">
                Миллионы покупателей
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-purple-600" />
              </div>
              <span className="text-sm text-gray-700">Гарантия выплат</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="space-y-6">
            {/* Company Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Информация о компании
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название компании *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ООО Ваша компания"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ИНН *
                  </label>
                  <input
                    type="text"
                    name="inn"
                    value={formData.inn}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234567890"
                  />
                </div>
              </div>
            </div>

            {/* Business Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Тип деятельности *
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Выберите тип деятельности</option>
                <option value="retail">Розничная торговля</option>
                <option value="wholesale">Оптовая торговля</option>
                <option value="manufacturer">Производство</option>
                <option value="services">Услуги</option>
              </select>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Контактная информация
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Контактное лицо *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Banking Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Банковские реквизиты</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ОГРН *
                  </label>
                  <input
                    type="text"
                    name="ogrn"
                    value={formData.ogrn}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234567890123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    КПП
                  </label>
                  <input
                    type="text"
                    name="kpp"
                    value={formData.kpp}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    БИК *
                  </label>
                  <input
                    type="text"
                    name="bik"
                    value={formData.bik}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="044525225"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Расчётный счёт *
                  </label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="40702810000000000000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Корреспондентский счёт
                  </label>
                  <input
                    type="text"
                    name="correspondentAccount"
                    value={formData.correspondentAccount}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30101810000000000000"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Пароль для входа</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Пароль *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Минимум 8 символов"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Подтверждение пароля *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Повторите пароль"
                  />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">
                Я соглашаюсь с{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                  условиями использования
                </Link>{" "}
                и{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-700"
                >
                  политикой конфиденциальности
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Регистрация...
                </div>
              ) : (
                "Зарегистрироваться как продавец"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>
            Уже есть аккаунт продавца?{" "}
            <Link
              to="/seller/login"
              className="text-blue-600 hover:text-blue-700"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;