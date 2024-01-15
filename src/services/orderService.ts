import api from "./axios";
import * as Sentry from "sentry-expo";

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
    Sentry.Native.captureException(error);
  }
};

export const fetchPrintableOrderById = async (id: string) => {
  try {
    const response = await api.get(`/orders/${id}/request`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    Sentry.Native.captureException(error);
  }
};

export const printOrderById = async (
  id: string,
  amounts: { productId: number; amount: number }[]
) => {
  try {
    const response = await api.post(`/orders/${id}/request`, amounts);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    Sentry.Native.captureException(error);
  }
};

export const closeOrderById = async (id: string) => {
  try {
    const response = await api.post(`/orders/${id}/close`);
    return response.data;
  } catch (error) {
    Sentry.Native.captureException(error);
    console.error("Error closing order:", error);
  }
};

export const updateCommentById = async (
  orderId: string,
  productId: string,
  comment: string
) => {
  try {
    const response = await api.post(`/orders/${orderId}/comment/${productId}`, {
      comment,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    Sentry.Native.captureException(error);
  }
};

export const fetchOrderByIdWithProducts = async (id: string) => {
  try {
    const response = await api.get(`/orders/${id}/categories`);
    return {
      ...response.data.order,
      categories: response.data.categories,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    Sentry.Native.captureException(error);
  }
};

export const fetchOrders = async () => {
  try {
    const response = await api.get(`/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    Sentry.Native.captureException(error);
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
  } catch (error) {
    Sentry.Native.captureException(error);
  }
};

export const createOrder = async (name: string, tableId: number) => {
  try {
    const response = await api.post("/orders", { orderName: name, tableId });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    Sentry.Native.captureException(error);
  }
};

export const editOrder = async (id: string, name: string, tableId: number) => {
  try {
    const response = await api.patch(`/orders/${id}`, {
      orderName: name,
      tableId,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing order:", error);
    Sentry.Native.captureException(error);
    throw error;
  }
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
