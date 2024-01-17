import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  fetchProductsStatistics,
  fetchWeeklyStatistics,
} from "../../store/statisticsSlice";
import { useCallback, useEffect } from "react";

const useWeeklyStatistics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector(
    (state: RootState) => state.statistics.weekly.statistics
  );
  const status = useSelector(
    (state: RootState) => state.statistics.weekly.status
  );

  const refresh = useCallback(() => {
    dispatch(fetchWeeklyStatistics());
  }, [dispatch, fetchWeeklyStatistics]);

  useEffect(() => {
    if (status === "idle") {
      refresh();
    }
  }, [refresh, status]);

  return { statistics, refresh, status };
};

export default useWeeklyStatistics;
