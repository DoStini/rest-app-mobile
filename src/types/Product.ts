import { Category } from "./Category";

export type Product = {
  category: Category;
  categoryId: number;
  id: number;
  image: string | null;
  manual: boolean;
  name: string;
  position: number;
  price: string;
};
