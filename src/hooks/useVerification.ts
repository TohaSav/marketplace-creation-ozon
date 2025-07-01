import { useState, useEffect } from "react";
import { VerificationRequest } from "@/types/verification";

// Тестовые данные заявок
const mockRequests: VerificationRequest[] = [
  {
    id: "1",
    shopId: "shop_001",
    shopName: "Electronics World",
    sellerName: "Александр Петров",
    sellerEmail: "alex@electronicsworld.ru",
    submittedAt: "2024-06-28T10:30:00",
    status: "pending",
    requirements: {
      salesCount: 156,
      reviewsCount: 78,
      monthsOnPlatform: 8,
      complaintsCount: 0,
      supportRating: 4.7,
    },
    shopStats: {
      totalOrders: 234,
      completedOrders: 221,
      averageRating: 4.6,
      totalReviews: 78,
      joinDate: "2023-10-15",
      lastActivity: "2024-06-29T14:22:00",
    },
  },
  {
    id: "2",
    shopId: "shop_002",
    shopName: "Fashion Store",
    sellerName: "Мария Иванова",
    sellerEmail: "maria@fashionstore.ru",
    submittedAt: "2024-06-27T15:45:00",
    status: "pending",
    requirements: {
      salesCount: 89,
      reviewsCount: 45,
      monthsOnPlatform: 5,
      complaintsCount: 1,
      supportRating: 4.2,
    },
    shopStats: {
      totalOrders: 145,
      completedOrders: 142,
      averageRating: 4.3,
      totalReviews: 45,
      joinDate: "2024-01-20",
      lastActivity: "2024-06-29T09:15:00",
    },
  },
  {
    id: "3",
    shopId: "shop_003",
    shopName: "Books & More",
    sellerName: "Дмитрий Сидоров",
    sellerEmail: "dmitry@booksmore.ru",
    submittedAt: "2024-06-25T12:20:00",
    status: "approved",
    reviewedAt: "2024-06-26T10:30:00",
    reviewedBy: "admin@calibrestore.ru",
    requirements: {
      salesCount: 245,
      reviewsCount: 125,
      monthsOnPlatform: 12,
      complaintsCount: 0,
      supportRating: 4.9,
    },
    shopStats: {
      totalOrders: 356,
      completedOrders: 345,
      averageRating: 4.8,
      totalReviews: 125,
      joinDate: "2023-06-10",
      lastActivity: "2024-06-29T16:45:00",
    },
  },
  {
    id: "4",
    shopId: "shop_004",
    shopName: "Tech Solutions",
    sellerName: "Анна Козлова",
    sellerEmail: "anna@techsolutions.ru",
    submittedAt: "2024-06-24T09:15:00",
    status: "rejected",
    reviewedAt: "2024-06-25T14:30:00",
    reviewedBy: "admin@calibrestore.ru",
    rejectionReason:
      "Недостаточное количество продаж и отзывов. Магазин работает менее 6 месяцев.",
    requirements: {
      salesCount: 45,
      reviewsCount: 23,
      monthsOnPlatform: 4,
      complaintsCount: 0,
      supportRating: 4.1,
    },
    shopStats: {
      totalOrders: 62,
      completedOrders: 58,
      averageRating: 4.0,
      totalReviews: 23,
      joinDate: "2024-02-15",
      lastActivity: "2024-06-29T11:30:00",
    },
  },
];

export const useVerification = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setRequests(mockRequests);
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateRequestStatus = (
    requestId: string,
    status: "approved" | "rejected",
    rejectionReason?: string,
  ) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            status,
            reviewedAt: new Date().toISOString(),
            reviewedBy: "admin@calibrestore.ru",
            rejectionReason:
              status === "rejected" ? rejectionReason : undefined,
          };
        }
        return req;
      }),
    );
  };

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const approvedRequests = requests.filter((req) => req.status === "approved");
  const rejectedRequests = requests.filter((req) => req.status === "rejected");

  return {
    requests,
    pendingRequests,
    approvedRequests,
    rejectedRequests,
    updateRequestStatus,
    isLoading,
  };
};
