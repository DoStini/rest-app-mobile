import { OrderProduct } from "./OrderProduct";
import { Creator } from "./Creator";
import { SimpleTable } from "./Table";

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
};
