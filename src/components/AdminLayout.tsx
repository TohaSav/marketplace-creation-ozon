import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { toast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: "Дашборд", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { name: "Товары", href: "/admin/products", icon: "Package" },
  { name: "Заказы", href: "/admin/orders", icon: "ShoppingCart" },
  { name: "Пользователи", href: "/admin/users", icon: "Users" },
  { name: "Продавцы", href: "/admin/sellers", icon: "Store" },
  {
    name: "Верификация магазинов",
    href: "/admin/verification",
    icon: "CheckCircle",
  },
  { name: "Знакомства", href: "/admin/dating", icon: "Heart" },
  { name: "Подарки", href: "/admin/gifts", icon: "Gift" },
  { name: "Реклама", href: "/admin/advertising", icon: "Megaphone" },
  { name: "Пополнение", href: "/admin/payments", icon: "CreditCard" },
  { name: "Чат", href: "/admin/chat", icon: "MessageCircle" },
  { name: "Живой чат", href: "/admin/live-chat", icon: "MessageSquare" },
  { name: "Аналитика", href: "/admin/analytics", icon: "BarChart3" },
  { name: "Управление данными", href: "/admin/data", icon: "Database" },
  { name: "Настройки", href: "/admin/settings", icon: "Settings" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из панели администратора",
    });
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <Icon name="X" size={24} className="text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-purple-600">
                Админ панель
              </h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? "bg-purple-100 text-purple-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      name={item.icon as any}
                      size={20}
                      className={`mr-4 ${
                        isActive
                          ? "text-purple-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Десктопная боковая панель */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-purple-600">
                Админ панель
              </h1>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-purple-100 text-purple-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      name={item.icon as any}
                      size={20}
                      className={`mr-3 ${
                        isActive
                          ? "text-purple-500"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex-shrink-0 w-full group block"
            >
              <div className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <Icon name="LogOut" size={20} className="mr-3" />
                Выйти
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="Menu" size={24} />
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}