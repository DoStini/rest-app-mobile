import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { AppDispatch, RootState } from "../../store/store";
import { fetchOrder } from "../../store/selectedOrderSlice";

const useLiveOrder = (orderId: string, active: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector(
    (state: RootState) => state.selectedOrder.selectedOrder
  );
  const status = useSelector((state: RootState) => state.selectedOrder.status);
  const updateStatus = useSelector(
    (state: RootState) => state.selectedOrder.updateStatus
  );
  const error = useSelector((state: RootState) => state.selectedOrder.error);

  const { mutate } = useSWR(
    `/orders/${orderId}`,
    active ? () => dispatch(fetchOrder(orderId)) : null,
    {
      refreshInterval: 5000,
    }
  );

  return {
    order,
    status,
    updating: updateStatus === "loading",
    refresh: () => mutate(),
    error,
  };
};

export default useLiveOrder;
