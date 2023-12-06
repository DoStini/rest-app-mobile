import api from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/proxy/auth", {
    email,
    password,
  });

  console.log(response.data, response.status);

  return response.data;
};
