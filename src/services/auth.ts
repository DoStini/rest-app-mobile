import { setItemAsync } from "expo-secure-store";
import api from "./axios";

export const login = async (email: string, password: string) => {
  console.log(email);
  const response = await api.post("/proxy/auth", {
    username: email,
    password,
  });

  console.log(response);

  const token = response.data.accessToken;

  await setItemAsync("token", token);

  return response.data;
};
