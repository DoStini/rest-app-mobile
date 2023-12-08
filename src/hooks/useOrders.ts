import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../store/ordersSlice";
import { AppDispatch, RootState } from "../store/store";

const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.orders.items);
  const status = useSelector((state: RootState) => state.orders.status);
  const error = useSelector((state: RootState) => state.orders.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [dispatch, status]);

  return { items, status, error };
};

export default useOrders;
