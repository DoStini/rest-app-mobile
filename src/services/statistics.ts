import api from "./axios";

export const mainStatistics = async () => {
  try {
    const response = await api.get("/statistics");
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};
