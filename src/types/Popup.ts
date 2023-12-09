import { Category } from "./Category";

export type PopupProps = {
  visible: boolean;
  onClose: () => void;
  categories: Category[];
};
