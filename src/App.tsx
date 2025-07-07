import AppProviders from "@/providers/AppProviders";
import AppRoutes from "@/routes/AppRoutes";
import { useAppInitialization } from "@/hooks/useAppInitialization";

const App = () => {
  useAppInitialization();

  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;
