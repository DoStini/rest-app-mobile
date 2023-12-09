import { Product } from "./Product";

export type Category = {
  id: number;
  name: string;
  position: number;
  products: Product[];
  printable: boolean;
};
