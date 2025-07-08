import { Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Кабинет продавца
import SellerLogin from "@/pages/SellerLogin";
import SellerDashboard from "@/pages/SellerDashboard";
import AddProduct from "@/pages/AddProduct";
import SellerTariffs from "@/pages/SellerTariffs";
import SellerAdvertising from "@/pages/SellerAdvertising";
import SellerAdvertisingSuccess from "@/pages/SellerAdvertisingSuccess";
import SellerLuckGame from "@/pages/SellerLuckGame";
import SellerWallet from "@/pages/SellerWallet";
import SellerWalletSuccess from "@/pages/SellerWalletSuccess";
import PaymentSuccess from "@/pages/PaymentSuccess";

// Конфигурация маршрутов продавца
const sellerRoutes = [
  {
    path: "/seller",
    component: SellerLogin,
    description: "Вход в кабинет продавца",
  },
  {
    path: "/seller/dashboard",
    component: SellerDashboard,
    description: "Главная страница кабинета",
  },
  {
    path: "/seller/add-product",
    component: AddProduct,
    description: "Добавление товара",
  },
  {
    path: "/seller/tariffs",
    component: SellerTariffs,
    description: "Тарифные планы",
  },
  {
    path: "/seller/advertising",
    component: SellerAdvertising,
    description: "Реклама и продвижение",
  },
  {
    path: "/seller/advertising-success",
    component: SellerAdvertisingSuccess,
    description: "Успешная настройка рекламы",
  },
  {
    path: "/seller/luck-game",
    component: SellerLuckGame,
    description: "Игры удачи",
  },
  {
    path: "/seller/wallet",
    component: SellerWallet,
    description: "Кошелек продавца",
  },
  {
    path: "/seller/wallet-success",
    component: SellerWalletSuccess,
    description: "Успешная операция с кошельком",
  },
  {
    path: "/seller/payment-success",
    component: PaymentSuccess,
    description: "Успешная оплата",
  },
];

// Обертка для Layout
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <Layout>{children}</Layout>
);

// Генерация JSX маршрутов
export const SellerRoutes = () => {
  return (
    <>
      {sellerRoutes.map(({ path, component: Component }) => (
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
export { sellerRoutes };

export default SellerRoutes;
