import { ErrorBoundary } from "react-error-boundary";
import AppProviders from "@/providers/AppProviders";
import AppRoutes from "@/routes/AppRoutes";
import { useAppInitialization } from "@/hooks/useAppInitialization";
import { useAjaxNavigation } from "@/hooks/useAjaxNavigation";
import { LoadingIndicator, useAjaxLoading } from "@/utils/ajaxLoadingIndicator";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Что-то пошло не так
        </h2>
        <p className="text-gray-600 mb-4">
          Произошла ошибка при загрузке приложения
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
};

const App = () => {
  useAppInitialization();
  useAjaxNavigation();
  const isLoading = useAjaxLoading();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LoadingIndicator show={isLoading} />
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;
