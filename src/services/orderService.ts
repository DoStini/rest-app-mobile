import api from "./axios";

export const fetchHistory = async () => {
  try {
    const response = await api.get("/orders/closed");
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching history:", error);
  }
};

export const fetchOrderById = async (id: string) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
  }
};

// TODO, waiting for backend

export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
