import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function UserRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Пароли не совпадают");
      }

      if (formData.password.length < 6) {
        throw new Error("Пароль должен содержать минимум 6 символов");
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.some((u: any) => u.email === formData.email)) {
        throw new Error("Пользователь с таким email уже существует");
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
        favorites: [],
        orders: [],
        userType: "user" as const,
        joinDate: new Date().toISOString().split("T")[0],
        status: "active" as const,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user-token", JSON.stringify(newUser));

      // Обновляем контекст авторизации
      login(newUser);

      toast({
        title: "Регистрация успешна!",
        description: `Добро пожаловать, ${newUser.name}!`,
      });

      navigate("/profile");
    } catch (error) {
      toast({
        title: "Ошибка регистрации",
        description:
          error instanceof Error ? error.message : "Произошла ошибка",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Icon name="UserPlus" size={32} className="text-white" />
            </div>
            <CardTitle className="text-2xl">Регистрация покупателя</CardTitle>
            <p className="text-gray-600 mt-2">Создайте аккаунт для покупок</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <div className="relative">
                  <Icon
                    name="User"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Ваше имя"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Icon
                    name="Mail"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <div className="relative">
                  <Icon
                    name="Phone"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Icon
                    name="Lock"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Минимум 6 символов"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <div className="relative">
                  <Icon
                    name="Lock"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Повторите пароль"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Регистрация...
                  </>
                ) : (
                  "Зарегистрироваться"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm mb-4"
              >
                <Icon name="ArrowLeft" size={16} className="mr-1" />
                Вернуться на главную
              </Link>

              <p className="text-sm text-gray-600">
                Уже есть аккаунт?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Войти
                </Link>
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Хотите продавать?</p>
                <Link
                  to="/seller"
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Стать продавцом →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
