import { Category } from "./Category";
import { Order } from "./Order";
import { Item } from "./Item";

export interface CategoriesState {
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface HistoryState {
  items: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface SelecterOrderState {
  selectedOrder: Order | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface OrdersState {
  items: Item[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
