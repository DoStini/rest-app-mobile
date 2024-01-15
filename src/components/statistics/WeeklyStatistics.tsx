import { RefreshControl, ScrollView, View } from "react-native";
import { StatisticsWeeklyProps } from "../../types/stack/StatisticsStack";
import useWeeklyStatistics from "../../hooks/statistics/useWeeklyStatistics";
import { useMemo } from "react";
import useBarChartData from "../../hooks/statistics/useBarChartData";
import ContainerStyle from "../../styles/Containers";
import Header from "../Header";
import BarChartWrapper from "./BarChartWrapper";
import { SCREEN_WIDTH } from "../../constants";

const WeeklyStatistics = ({ navigation }: StatisticsWeeklyProps) => {
  const { statistics, status, refresh } = useWeeklyStatistics();

  const formattedStatistics = useMemo(() => {
    return statistics.map((statistic) => ({
      name: `${statistic.day} - ${statistic.name}`,
      value: statistic.value,
    }));
  }, [statistics]);

  const chartData = useBarChartData(formattedStatistics, "name", "value");

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title="Weekly Statistics" goBack={navigation.goBack} />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={refresh}
          />
        }
      >
        {statistics && (
          <BarChartWrapper
            title="Weekly Statistics"
            width={SCREEN_WIDTH * 2}
            data={chartData}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default WeeklyStatistics;
