import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrder } from "../store/selectedOrderSlice";
import { AppDispatch, RootState } from "../store/store";

const useSelectedOrder = (orderId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedOrder = useSelector(
    (state: RootState) => state.selectedOrder.selectedOrder
  );
  const status = useSelector((state: RootState) => state.selectedOrder.status);
  const error = useSelector((state: RootState) => state.selectedOrder.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrder(orderId));
    }
  }, [dispatch, status]);

  return { selectedOrder, status, error };
};

export default useSelectedOrder;
