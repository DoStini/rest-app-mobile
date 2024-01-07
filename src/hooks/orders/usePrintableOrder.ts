import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrder, clearSelectedOrder } from "../../store/selectedOrderSlice";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchPrintableOrder,
  resetFinishedOrder,
} from "../../store/finishedOrderSlice";

const usePrintableorder = (orderId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((state: RootState) => state.finishedOrder.order);
  const status = useSelector((state: RootState) => state.finishedOrder.status);
  const error = useSelector((state: RootState) => state.finishedOrder.error);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchPrintableOrder(orderId));
    }

    return () => {
      dispatch(resetFinishedOrder());
    };
  }, [dispatch, orderId]);

  return { order, status, error };
};

export default usePrintableorder;
