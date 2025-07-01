export interface VerificationRequirements {
  salesCount: number;
  reviewsCount: number;
  monthsOnPlatform: number;
  complaintsCount: number;
  supportRating: number;
}

export interface ShopStats {
  totalOrders: number;
  completedOrders: number;
  averageRating: number;
  totalReviews: number;
  joinDate: string;
  lastActivity: string;
}

export interface VerificationRequest {
  id: string;
  shopId: string;
  shopName: string;
  sellerName: string;
  sellerEmail: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  requirements: VerificationRequirements;
  shopStats: ShopStats;
}

export interface RequirementCheck {
  id: number;
  name: string;
  text: string;
  value: number;
  required: number;
  met: boolean;
  icon: string;
}

export type ReviewAction = "approve" | "reject";
