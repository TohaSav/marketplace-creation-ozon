import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

export default function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      // Регистрация продавца
      if (name && email && password) {
        const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
        const existingSeller = sellers.find((s: any) => s.email === email);

        if (existingSeller) {
          toast({
            title: "Ошибка регистрации",
            description: "Пользователь с таким email уже существует",
            variant: "destructive",
          });
        } else {
          const newSeller = {
            id: Date.now(),
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
            products: [],
            earnings: 0,
          };

          sellers.push(newSeller);
          localStorage.setItem("sellers", JSON.stringify(sellers));
          localStorage.setItem("seller-token", JSON.stringify(newSeller));

          toast({
            title: "Регистрация успешна",
            description: "Добро пожаловать в кабинет продавца",
          });
          navigate("/seller/dashboard");
        }
      }
    } else {
      // Вход продавца
      const sellers = JSON.parse(localStorage.getItem("sellers") || "[]");
      const seller = sellers.find(
        (s: any) => s.email === email && s.password === password,
      );

      if (seller) {
        localStorage.setItem("seller-token", JSON.stringify(seller));
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в кабинет продавца",
        });
        navigate("/seller/dashboard");
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный логин или пароль",
          variant: "destructive",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <Icon name="Store" size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isRegister ? "Регистрация продавца" : "Кабинет продавца"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isRegister
              ? "Создайте аккаунт продавца"
              : "Войдите в свой кабинет"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя/Название магазина
              </label>
              <div className="relative">
                <Icon
                  name="User"
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Введите имя или название магазина"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Icon
                name="Mail"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="seller@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <Icon
                name="Lock"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isRegister ? "Регистрация..." : "Вход..."}
              </>
            ) : (
              <>{isRegister ? "Зарегистрироваться" : "Войти в кабинет"}</>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            {isRegister
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Для продавцов и предпринимателей
        </div>
      </div>
    </div>
  );
}
