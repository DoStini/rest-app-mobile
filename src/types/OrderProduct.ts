import { Product } from "./Product";

export type OrderProduct = {
  amount: number;
  closedTotal: string;
  comment: string;
  createdAt?: string;
  orderId: number | undefined;
  orderedAmount?: number | undefined;
  product: Product;
  productId: number;
};
