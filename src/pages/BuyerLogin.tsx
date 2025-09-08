import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const BuyerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password, 'buyer');
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в кабинет покупателя!",
      });
      navigate('/buyer-dashboard');
    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: "Неверный email или пароль",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ShoppingBag" size={32} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Вход для покупателей</h2>
          <p className="mt-2 text-gray-600">
            Войдите в свой аккаунт покупателя
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
              placeholder="Введите пароль"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Входим..." : "Войти"}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-gray-600">
            Нет аккаунта?{" "}
            <Link
              to="/buyer-register"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Зарегистрироваться как покупатель
            </Link>
          </p>
          <Link
            to="/seller-login"
            className="text-sm text-gray-500 hover:text-gray-700 mt-2 block"
          >
            Я продавец →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerLogin;