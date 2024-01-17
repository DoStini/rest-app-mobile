import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchStatistics } from "../../store/statisticsSlice";
import { useCallback, useEffect } from "react";

const useStatistics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector(
    (state: RootState) => state.statistics.main.statistics
  );
  const status = useSelector(
    (state: RootState) => state.statistics.main.status
  );

  const refresh = useCallback(() => {
    dispatch(fetchStatistics());
  }, [dispatch, fetchStatistics]);

  useEffect(() => {
    if (status === "idle") {
      refresh();
    }
  }, [refresh, status]);

  return { statistics, refresh, status };
};

export default useStatistics;
