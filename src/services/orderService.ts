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

export const fetchOrders = async () => {
  try {
    const response = await api.get(`/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export const updateOrderProduct = async (
  orderId: string,
  productId: string,
  amount: number
) => {
  try {
    const response = await api.post(`/orders/${orderId}/update/${productId}`, {
      amount,
    });
    return response.data;
  } catch (error) {}
};

// TODO, waiting for backend
export const fetchCategories = async () => {
  try {
    //const response = await api.get("/categories");
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
