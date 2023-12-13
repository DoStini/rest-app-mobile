import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { AppDispatch, RootState } from "../store/store";
import { fetchOrder } from "../store/selectedOrderSlice";

const useLiveOrder = (orderId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector(
    (state: RootState) => state.selectedOrder.selectedOrder
  );
  const status = useSelector((state: RootState) => state.selectedOrder.status);
  const error = useSelector((state: RootState) => state.selectedOrder.error);

  useSWR(`/orders/${orderId}`, () => dispatch(fetchOrder(orderId)), {
    refreshInterval: 2000,
  });

  return { order, status, error };
};

export default useLiveOrder;
