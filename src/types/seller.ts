export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  registrationDate: string;
  status: "active" | "blocked" | "pending";
  totalOrders: number;
  revenue: number;
  rating: number;
  description: string;
}

export type SellerStatus = Seller["status"];

export interface SellerFormData {
  name: string;
  email: string;
  phone: string;
  shopName: string;
  description: string;
}

export interface SellerModalProps {
  seller: Seller | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface SellerAction {
  type: "view" | "edit" | "block";
  seller: Seller;
}
