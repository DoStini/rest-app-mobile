import { Product } from "./Product";

export type OrderProduct = {
  amount: number;
  closedTotal: string;
  comment: string;
  createdAt: string;
  orderId: number;
  orderedAmount: number;
  product: Product;
  productId: number;
};
