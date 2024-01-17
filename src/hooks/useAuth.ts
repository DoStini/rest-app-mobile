import { useEffect, useMemo, useState } from "react";
import api from "../services/axios";
import { User } from "../types/User";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import useSWR from "swr";
import {
  fetchAuth,
  login as loginAction,
  logout as logoutAction,
} from "../store/system";

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  const login = (email: string, password: string) => {
    dispatch(loginAction({ email, password }));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const loading = useSelector((state: RootState) => state.system.auth.loading);
  const user = useSelector((state: RootState) => state.system.auth.user);
  const error = useSelector((state: RootState) => state.system.auth.error);
  const errorLogin = useSelector(
    (state: RootState) => state.system.auth.errorLogin
  );
  const fetchingLogin = useSelector(
    (state: RootState) => state.system.auth.fetchingLogin
  );

  const initializing = useMemo(() => {
    return loading && !error && !user;
  }, [loading, error, user]);

  const { mutate } = useSWR("/auth/me", () => dispatch(fetchAuth()), {
    refreshInterval: 15000,
  });

  return {
    user,
    loading,
    initializing,
    error,
    fetchingLogin,
    errorLogin,
    login,
    logout,
    revalidate: mutate,
  };
}
