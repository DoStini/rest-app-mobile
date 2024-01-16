import { Category } from "../types/Category";

export const convertISOToFormattedDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day}.${month}.${year} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return formattedDate;
};

export const formatPrice = (priceString: string): string => {
  const price = parseFloat(priceString);

  if (isNaN(price)) {
    return "Invalid input";
  }
  const formattedPrice = price.toFixed(2) + " €";

  return formattedPrice;
};

export const getCategoryNameById = (
  categories: Category[],
  selectedCategoryId: number | null
) => {
  const category = categories.find(
    (category) => category.id === selectedCategoryId
  );
  return category ? category.name : null;
};
