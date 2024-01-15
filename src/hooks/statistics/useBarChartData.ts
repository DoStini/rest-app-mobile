import { useMemo } from "react";

const useBarChartData = (
  data: any | null,
  labelAccessor: string,
  dataAccessor: string
) => {
  const barChartData = useMemo(
    () => ({
      labels: data?.map((item: any) => item[labelAccessor]) || [],
      datasets: [
        {
          data: data?.map((item: any) => item[dataAccessor]) || [],
        },
      ],
    }),
    [data, labelAccessor, dataAccessor]
  );

  return barChartData;
};

export default useBarChartData;
