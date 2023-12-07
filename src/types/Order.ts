import { OrderProduct } from "./OrderProduct";
import { Table } from "./Table";
import { Creator } from "./Creator";

export type Order = {
  OrderProduct: OrderProduct[];
  Table: Table;
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
