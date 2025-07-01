export interface UserStorageKeys {
  users: "users";
  sellers: "sellers";
  userToken: "user-token";
  sellerToken: "seller-token";
}

export const STORAGE_KEYS: UserStorageKeys = {
  users: "users",
  sellers: "sellers",
  userToken: "user-token",
  sellerToken: "seller-token",
} as const;

export class UserDataManager {
  static clearAllUsers(): void {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });

      console.log("Все пользовательские данные удалены:", {
        users: STORAGE_KEYS.users,
        sellers: STORAGE_KEYS.sellers,
        userToken: STORAGE_KEYS.userToken,
        sellerToken: STORAGE_KEYS.sellerToken,
      });
    } catch (error) {
      console.error("Ошибка при очистке пользовательских данных:", error);
      throw new Error("Не удалось очистить данные пользователей");
    }
  }

  static clearUsers(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.users);
      localStorage.removeItem(STORAGE_KEYS.userToken);
      console.log("Покупатели удалены из базы");
    } catch (error) {
      console.error("Ошибка при удалении покупателей:", error);
      throw new Error("Не удалось удалить покупателей");
    }
  }

  static clearSellers(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.sellers);
      localStorage.removeItem(STORAGE_KEYS.sellerToken);
      console.log("Продавцы удалены из базы");
    } catch (error) {
      console.error("Ошибка при удалении продавцов:", error);
      throw new Error("Не удалось удалить продавцов");
    }
  }

  static getUsersCount(): number {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.users);
      return users ? JSON.parse(users).length : 0;
    } catch {
      return 0;
    }
  }

  static getSellersCount(): number {
    try {
      const sellers = localStorage.getItem(STORAGE_KEYS.sellers);
      return sellers ? JSON.parse(sellers).length : 0;
    } catch {
      return 0;
    }
  }

  static getTotalUsersCount(): number {
    return this.getUsersCount() + this.getSellersCount();
  }

  static getStorageStats() {
    return {
      users: this.getUsersCount(),
      sellers: this.getSellersCount(),
      total: this.getTotalUsersCount(),
    };
  }
}
