import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchProductsStatistics } from "../../store/statisticsSlice";
import { useCallback, useEffect } from "react";

const useProductStatistics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector(
    (state: RootState) => state.statistics.products.statistics
  );
  const status = useSelector(
    (state: RootState) => state.statistics.products.status
  );

  const refresh = useCallback(() => {
    dispatch(fetchProductsStatistics());
  }, [dispatch, fetchProductsStatistics]);

  useEffect(() => {
    if (status === "idle") {
      refresh();
    }
  }, [refresh, status]);

  return { statistics, refresh, status };
};

export default useProductStatistics;
