import { useCallback, useEffect } from "react";
import { fetchEmployeesStatistics } from "../../store/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

const useEmployeeStatistics = () => {
  const dispatch = useDispatch<AppDispatch>();
  const statistics = useSelector(
    (state: RootState) => state.statistics.employees.statistics
  );
  const status = useSelector(
    (state: RootState) => state.statistics.employees.status
  );

  const refresh = useCallback(() => {
    dispatch(fetchEmployeesStatistics());
  }, [dispatch, fetchEmployeesStatistics]);

  useEffect(() => {
    if (status === "idle") {
      refresh();
    }
  }, [refresh, status]);

  return { statistics, refresh, status };
};

export default useEmployeeStatistics;
