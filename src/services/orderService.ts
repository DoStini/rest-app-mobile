import axios from "axios";
import { TOKEN } from "@env";

const API_URL = "http://localhost:3000/api";

export const fetchCategories = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.get(`${API_URL}/orders/1/categories`, config);
  return response.data.categories;
};
