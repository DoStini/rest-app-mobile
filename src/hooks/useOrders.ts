import useSWR from "swr";
import { getFetcher } from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchOrders } from "../store/ordersSlice";

const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.orders.tables);
  const status = useSelector((state: RootState) => state.orders.status);
  const error = useSelector((state: RootState) => state.orders.error);

  useSWR("/orders", () => dispatch(fetchOrders()), {
    refreshInterval: 2000,
  });

  return { items, status, error };
};

export default useOrders;
