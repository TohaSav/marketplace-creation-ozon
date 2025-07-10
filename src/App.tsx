import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Index />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    404 - Страница не найдена
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Запрашиваемая страница не существует
                  </p>
                  <a
                    href="/"
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
                  >
                    На главную
                  </a>
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
