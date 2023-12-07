import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrder, clearSelectedOrder } from "../store/selectedOrderSlice";
import { AppDispatch, RootState } from "../store/store";

const useSelectedOrder = (orderId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedOrder = useSelector(
    (state: RootState) => state.selectedOrder.selectedOrder
  );
  const status = useSelector((state: RootState) => state.selectedOrder.status);
  const error = useSelector((state: RootState) => state.selectedOrder.error);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrder(orderId));
    }

    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [dispatch, orderId]);

  return { selectedOrder, status, error };
};

export default useSelectedOrder;
