export interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  targetUrl: string;
  createdBy: string;
  createdAt: string;
  status: "active" | "pending" | "expired";
  paymentStatus: "pending" | "paid" | "failed";
  price: number;
  duration: number; // дни
  expiresAt: string;
  clicks: number;
  views: number;
}

export interface AdvertisingBanner {
  id: number;
  sellerId: string;
  sellerName: string;
  shopName: string;
  bannerUrl: string;
  description: string;
  duration: number;
  contactInfo: string;
  status: BannerStatus;
  createdAt: string;
  expiresAt: string;
  price: number;
}

export type BannerStatus = "active" | "paused" | "expired" | "pending_payment";

export interface BannerStats {
  total: number;
  active: number;
  paused: number;
  expired: number;
  pending: number;
  totalRevenue: number;
}

export interface BannerFilters {
  searchTerm: string;
  statusFilter: string;
}

export interface BannerActions {
  onPause: (id: number) => void;
  onResume: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (banner: AdvertisingBanner) => void;
}

export interface CreateAdvertisementData {
  title: string;
  description: string;
  image: string;
  targetUrl: string;
  duration: number;
}

export interface AdvertisementPlan {
  id: string;
  name: string;
  duration: number; // дни
  price: number;
  description: string;
  maxTitleLength: number;
  maxDescriptionLength: number;
}

export const ADVERTISING_PLANS: AdvertisementPlan[] = [
  {
    id: "1",
    name: "1 день",
    duration: 1,
    price: 500,
    description: "Реклама на 1 день",
    maxTitleLength: 50,
    maxDescriptionLength: 120,
  },
  {
    id: "3",
    name: "3 дня",
    duration: 3,
    price: 1200,
    description: "Реклама на 3 дня (скидка 20%)",
    maxTitleLength: 50,
    maxDescriptionLength: 120,
  },
  {
    id: "7",
    name: "7 дней",
    duration: 7,
    price: 2500,
    description: "Реклама на неделю (скидка 30%)",
    maxTitleLength: 50,
    maxDescriptionLength: 120,
  },
];
