export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  image: File | null;
  stock: string;
  article: string;
  barcode: string;
}

export interface NewProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  sellerId: string;
  sellerName: string;
  stock: number;
  sold: number;
  createdAt: string;
  article: string;
  barcode: string;
  qrCode: string;
}

export const PRODUCT_CATEGORIES = [
  { value: "electronics", label: "Электроника" },
  { value: "clothing", label: "Одежда" },
  { value: "home", label: "Дом и сад" },
  { value: "sport", label: "Спорт" },
  { value: "beauty", label: "Красота" },
  { value: "auto", label: "Авто" },
  { value: "books", label: "Книги" },
  { value: "toys", label: "Игрушки" },
] as const;
