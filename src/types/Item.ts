import { Order } from "./Order";

export type Item = {
  _count: {
    orders: number;
  };
  id: number;
  name: string;
  orders: Order[];
};
