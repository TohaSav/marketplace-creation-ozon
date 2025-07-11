import { Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Основные страницы
import Index from "@/pages/Index";
import Category from "@/pages/Category";

// Категории товаров
import Electronics from "@/pages/Electronics";
import Clothing from "@/pages/Clothing";
import HomeGarden from "@/pages/HomeGarden";
import Sport from "@/pages/Sport";
import Beauty from "@/pages/Beauty";
import Books from "@/pages/Books";

// Информационные страницы
import TradingRules from "@/pages/TradingRules";
import Commissions from "@/pages/Commissions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import PersonalData from "@/pages/PersonalData";
import HowToSell from "@/pages/HowToSell";
import HowToOrder from "@/pages/HowToOrder";
import PaymentMethods from "@/pages/PaymentMethods";
import Delivery from "@/pages/Delivery";
import Returns from "@/pages/Returns";
import About from "@/pages/About";
import Careers from "@/pages/Careers";

// Пользовательские страницы
import Favorites from "@/pages/Favorites";
import Cart from "@/pages/Cart";
import BonusCard from "@/pages/BonusCard";
import Profile from "@/pages/Profile";
import Orders from "@/pages/Orders";
import Settings from "@/pages/Settings";
import Wallet from "@/pages/Wallet";
import WalletSuccess from "@/pages/WalletSuccess";

// Развлечения и функции
import Shorts from "@/pages/Shorts";
import Game from "@/pages/Game";
import AdvertisingPage from "@/pages/AdvertisingPage";

// Сервисные страницы
import Support from "@/pages/Support";
import Notifications from "@/pages/Notifications";
import PaymentPage from "@/pages/PaymentPage";
import PaymentSuccess from "@/pages/PaymentSuccess";
import Seller from "@/pages/Seller";
import Press from "@/pages/Press";

// Конфигурация публичных маршрутов
const publicRoutes = [
  // Основные
  { path: "/", component: Index, exact: true },
  { path: "/category/:categorySlug", component: Category },
  { path: "/category/:categoryId", component: Category },

  // Категории товаров
  { path: "/electronics", component: Electronics },
  { path: "/clothing", component: Clothing },
  { path: "/home-garden", component: HomeGarden },
  { path: "/sport", component: Sport },
  { path: "/beauty", component: Beauty },
  { path: "/books", component: Books },

  // Информационные
  { path: "/privacy", component: PrivacyPolicy },
  { path: "/personal-data", component: PersonalData },
  { path: "/how-to-sell", component: HowToSell },
  { path: "/how-to-order", component: HowToOrder },
  { path: "/payment-methods", component: PaymentMethods },
  { path: "/delivery", component: Delivery },
  { path: "/returns", component: Returns },
  { path: "/about", component: About },
  { path: "/careers", component: Careers },
  { path: "/trading-rules", component: TradingRules },
  { path: "/commissions", component: Commissions },

  // Пользовательские
  { path: "/favorites", component: Favorites },
  { path: "/cart", component: Cart },
  { path: "/bonus-card", component: BonusCard },
  { path: "/wallet", component: Wallet },
  { path: "/wallet-success", component: WalletSuccess },
  { path: "/profile", component: Profile },
  { path: "/orders", component: Orders },
  { path: "/settings", component: Settings },

  // Развлечения
  { path: "/shorts", component: Shorts },
  { path: "/game", component: Game },
  { path: "/advertising", component: AdvertisingPage },

  // Сервисные
  { path: "/support", component: Support },
  { path: "/notifications", component: Notifications },
  { path: "/payment", component: PaymentPage },
  { path: "/payment-success", component: PaymentSuccess },
  { path: "/seller", component: Seller },
  { path: "/press", component: Press },
];

// Обертка для Layout
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <Layout>{children}</Layout>
);

// Генерация JSX маршрутов
export const PublicRoutes = () => {
  return publicRoutes.map(({ path, component: Component }) => (
    <Route
      key={path}
      path={path}
      element={
        <LayoutWrapper>
          <Component />
        </LayoutWrapper>
      }
    />
  ));
};

export default PublicRoutes;
