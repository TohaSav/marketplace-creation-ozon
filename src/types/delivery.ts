export interface DeliveryMethod {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  estimatedDays: string;
  minPrice: number;
  maxPrice: number;
  features: string[];
  isPopular?: boolean;
}

export interface DeliveryCalculation {
  methodId: string;
  price: number;
  estimatedDelivery: string;
  address: string;
}

export interface DeliveryAddress {
  city: string;
  street: string;
  house: string;
  apartment?: string;
  postalCode: string;
  region?: string;
}

export interface DeliverySelection {
  method: DeliveryMethod;
  address: DeliveryAddress;
  totalPrice: number;
  estimatedDelivery: string;
}
