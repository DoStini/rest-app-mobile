import api from "./axios";

export const fetchHistory = async () => {
  try {
    const response = await api.get("/orders/closed");
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchOrderById = async (id: string) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/*
TODO add right order id. Or dunno is there an api call to fetch all catefories without order id?
export const fetchCategories = async () => {
  try {
    const response = await api.get("/orders/471/categories");
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};*/
