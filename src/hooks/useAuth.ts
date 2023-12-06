import { useState } from "react";
import api from "../services/axios";
import { User } from "../types/User";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);

  api
    .get("/proxy/auth")
    .then((response) => {
      setLoading(false);
      setUser(response.data);
    })
    .catch(() => {
      setLoading(false);
      setError(true);
    });

  return { user, loading, error };
}
