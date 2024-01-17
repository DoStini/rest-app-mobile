import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { fetchOrders } from "../services/orderService";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchTablesInfo } from "../store/system";

export default function useTablesInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const tables = useSelector(
    (state: RootState) => state.system.tablesInfo.tables
  );
  const status = useSelector(
    (state: RootState) => state.system.tablesInfo.status
  );
  const error = useSelector(
    (state: RootState) => state.system.tablesInfo.error
  );

  useEffect(() => {
    dispatch(fetchTablesInfo());
  }, [dispatch, fetchTablesInfo]);

  return {
    tables,
    status,
    error,
  };
}
