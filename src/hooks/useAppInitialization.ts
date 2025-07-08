import { useEffect } from "react";
import { initializeTestData } from "@/utils/seedData";

export const useAppInitialization = () => {
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeTestData();
      } catch (error) {
        console.error("Ошибка инициализации данных:", error);
      }
    };

    initialize();
  }, []);
};
