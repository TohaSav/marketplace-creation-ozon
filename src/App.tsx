import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initializeTestData } from "@/utils/seedData";
import Index from "./pages/Index";

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
        <Route path="/" element={<Index />} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
