import api from "./axios";

export const mainStatistics = async () => {
  try {
    const response = await api.get("/statistics");
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};

export const productsStatistics = async () => {
  try {
    const response = await api.get("/statistics/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching products statistics:", error);
  }
};

export const employeesStatistics = async () => {
  try {
    const response = await api.get("/statistics/employees");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees statistics:", error);
  }
};

export const weeklyStatistics = async () => {
  try {
    const response = await api.get("/statistics/weekly");
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly statistics:", error);
  }
};
