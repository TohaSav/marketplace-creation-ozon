import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initializeTestData } from "@/utils/seedData";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => {
  // Инициализируем тестовые данные при загрузке приложения
  useEffect(() => {
    try {
      initializeTestData();
    } catch (error) {
      console.error("Ошибка инициализации данных:", error);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Главная страница */}
        <Route
          path="/"
          element={
            <Layout>
              <Index />
            </Layout>
          }
        />

        {/* Остальные маршруты */}
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
