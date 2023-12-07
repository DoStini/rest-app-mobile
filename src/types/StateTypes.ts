export interface Category {
  id: number;
  name: string;
  position: number;
  printable: boolean;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  image: string | null;
  price: string;
  position: number;
  categoryId: number;
  manual: boolean;
  orderProduct: any[];
}

export interface CategoriesState {
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// TODO add types for items
export interface HistoryState {
  items: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface SelecterOrderState {
  selectedOrder: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
