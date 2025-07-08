class ApiClient {
  private baseURL = "/api";

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Методы для продуктов
  async getProducts(category?: string, filters?: any) {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }

    return this.request(`/products?${params}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  // Методы для категорий
  async getCategories() {
    return this.request("/categories");
  }

  async getCategoryProducts(slug: string) {
    return this.request(`/categories/${slug}/products`);
  }

  // Методы для корзины
  async addToCart(productId: number, quantity: number = 1) {
    return this.request("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async getCart() {
    return this.request("/cart");
  }

  async updateCartItem(itemId: number, quantity: number) {
    return this.request(`/cart/items/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: number) {
    return this.request(`/cart/items/${itemId}`, {
      method: "DELETE",
    });
  }

  // Методы для избранного
  async addToFavorites(productId: number) {
    return this.request("/favorites/add", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });
  }

  async getFavorites() {
    return this.request("/favorites");
  }

  async removeFromFavorites(productId: number) {
    return this.request(`/favorites/${productId}`, {
      method: "DELETE",
    });
  }

  // Методы для заказов
  async createOrder(orderData: any) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async getOrders() {
    return this.request("/orders");
  }

  async getOrder(orderId: string) {
    return this.request(`/orders/${orderId}`);
  }

  // Методы для уведомлений
  async getNotifications() {
    return this.request("/notifications");
  }

  async markNotificationAsRead(notificationId: string) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: "PUT",
    });
  }

  // Методы для поиска
  async search(query: string, filters?: any) {
    const params = new URLSearchParams();
    params.append("q", query);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }

    return this.request(`/search?${params}`);
  }

  // Методы для пользователей
  async login(credentials: { email: string; password: string }) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: any) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async getProfile() {
    return this.request("/profile");
  }

  async updateProfile(profileData: any) {
    return this.request("/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
