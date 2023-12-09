import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { fetchHistory } from "../store/historySlice";
import { AppDispatch, RootState } from "../store/store";

const useHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.history.items);
  const status = useSelector((state: RootState) => state.history.status);
  const error = useSelector((state: RootState) => state.history.error);

  const refresh = useCallback(() => {
    dispatch(fetchHistory());
  }, [dispatch, fetchHistory]);

  useEffect(() => {
    if (status === "idle") {
      refresh();
    }
  }, [refresh, status]);

  return { items, status, error, refresh };
};

export default useHistory;
