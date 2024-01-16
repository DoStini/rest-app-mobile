import { setItemAsync } from "expo-secure-store";
import api from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/proxy/auth", {
    username: email,
    password,
  });

  const token = response.data.accessToken;

  await setItemAsync("token", token);

  return me();
};

export const me = async () => {
  const response = await api.get("/proxy/auth");

  return response.data;
};

export const logout = async () => {
  await setItemAsync("token", "");
};
