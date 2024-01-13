import axios from "axios";
import { getItemAsync } from "expo-secure-store";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_ROUTE,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getItemAsync("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getFetcher = async (url: string) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default api;
