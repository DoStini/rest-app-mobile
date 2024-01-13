import { Order } from "./Order";

export type Table = {
  _count: {
    orders: number;
  };
  id: number;
  name: string;
  orders: Order[];
};

export type SimpleTable = {
  id: number;
  name: string;
};
