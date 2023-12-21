import { OrderProduct } from "./OrderProduct";
import { Creator } from "./Creator";
import { SimpleTable } from "./Table";
import { Category } from "./Category";
import { Product } from "./Product";

export type ProductWithAmount = Product & {
  orderProduct: OrderProduct[];
};

export type CategoryProducts = Category & {
  products: ProductWithAmount[];
};

export type Order = {
  OrderProduct: OrderProduct[];
  Table: SimpleTable;
  closed: boolean;
  closedAt: string;
  closedTotal: string;
  createdAt: string;
  creator: Creator;
  dayId: number;
  id: number;
  name: string;
  tableId: number;
  userId: number;
  categories: CategoryProducts[] | undefined;
};
