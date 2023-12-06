import { useEffect, useState } from "react";
import api from "../services/axios";
import { User } from "../types/User";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);

  // Should use swr here
  const authMeCall = () =>
    api
      .get("/proxy/auth")
      .then((response) => {
        setLoading(false);
        setError(false);
        setUser(response.data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });

  useEffect(() => {
    authMeCall();
  }, []);

  return { user, loading, error, revalidate: authMeCall };
}
