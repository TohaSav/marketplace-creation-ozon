import { useEffect } from "react";
import { initializeTestData } from "@/utils/seedData";

export const useAppInitialization = () => {
  useEffect(() => {
    try {
      initializeTestData();
    } catch (error) {
      console.error("Ошибка инициализации данных:", error);
    }
  }, []);
};
