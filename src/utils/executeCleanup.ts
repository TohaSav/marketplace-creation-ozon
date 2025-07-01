import { clearAllUserData } from "./clearDatabase";

// Выполняем очистку базы данных
export const executeCleanup = () => {
  console.log("🚀 Начинаю очистку базы данных...");

  try {
    clearAllUserData();
    console.log("✅ База данных успешно очищена!");
    return true;
  } catch (error) {
    console.error("❌ Ошибка при очистке базы данных:", error);
    return false;
  }
};

// Запускаем очистку
executeCleanup();
