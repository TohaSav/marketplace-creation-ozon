import { Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Страницы авторизации
import UserLogin from "@/pages/UserLogin";
import UserRegister from "@/pages/UserRegister";

// Конфигурация маршрутов авторизации
const authRoutes = [
  {
    path: "/login",
    component: UserLogin,
    title: "Вход пользователя",
    description: "Авторизация покупателей",
  },
  {
    path: "/register",
    component: UserRegister,
    title: "Регистрация пользователя",
    description: "Создание аккаунта покупателя",
  },
];

// Обертка для Layout
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <Layout>{children}</Layout>
);

// Генерация JSX маршрутов
export const AuthRoutes = () => {
  return (
    <>
      {authRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <LayoutWrapper>
              <Component />
            </LayoutWrapper>
          }
        />
      ))}
    </>
  );
};

// Экспорт конфигурации для возможного переиспользования
export { authRoutes };

export default AuthRoutes;
