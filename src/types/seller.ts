export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  registrationDate: string;
  status: "active" | "blocked" | "pending" | "revision" | "resubmitted";
  totalOrders: number;
  revenue: number;
  rating: number;
  description: string;
  rejectionReason?: string;
  revisionComment?: string;
  // Новые обязательные поля
  ogrn: string;
  kpp?: string;
  bik: string;
  bankAccount: string;
  correspondentAccount?: string;
  inn: string;
  businessType?: string;
}

export type SellerStatus = Seller["status"];

export interface SellerFormData {
  name: string;
  email: string;
  phone: string;
  shopName: string;
  description: string;
  // Новые обязательные поля
  ogrn: string;
  kpp?: string;
  bik: string;
  bankAccount: string;
  correspondentAccount?: string;
  inn: string;
  businessType?: string;
}

export interface SellerModalProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface SellerAction {
  type: "view" | "edit" | "block" | "moderate";
  seller: Seller;
}

export interface ModerationModalProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onRevision: (reason: string) => void;
  onReject: () => void;
}