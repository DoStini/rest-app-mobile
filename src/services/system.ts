import api from "./axios";
import * as Sentry from "sentry-expo";

export const fetchTablesInfo = async () => {
  try {
    const response = await api.get("/system/tables");
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    Sentry.Native.captureException(error);
  }
};
