import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchHistory } from "../store/historySlice";
import { AppDispatch, RootState } from "../store/store";

const useHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.history.items);
  const status = useSelector((state: RootState) => state.history.status);
  const error = useSelector((state: RootState) => state.history.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHistory());
    }
  }, [dispatch, status]);

  return { items, status, error };
};

export default useHistory;
