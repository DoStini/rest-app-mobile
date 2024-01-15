import { RefreshControl, ScrollView, View } from "react-native";
import { StatisticsProductsProps } from "../../types/stack/StatisticsStack";
import Header from "../Header";
import ContainerStyle from "../../styles/Containers";
import { SCREEN_WIDTH } from "../../constants";
import BarChartWrapper from "./BarChartWrapper";
import useBarChartData from "../../hooks/statistics/useBarChartData";
import useEmployeeStatistics from "../../hooks/statistics/useEmployeeStatistics";

const EmployeeStatisticsComponent = ({
  navigation,
}: StatisticsProductsProps) => {
  const { statistics, status, refresh } = useEmployeeStatistics();

  const mostValuableData = useBarChartData(
    statistics?.monetary,
    "name",
    "value"
  );

  const biggestOrdersData = useBarChartData(
    statistics?.biggest,
    "name",
    "value"
  );

  const mostOrdersData = useBarChartData(statistics?.quantity, "name", "value");

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title={"Product Statistics"} goBack={navigation.goBack} />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={refresh}
          />
        }
      >
        <BarChartWrapper
          title="Most Valuable Employees"
          width={SCREEN_WIDTH * 1.5}
          data={mostValuableData}
        />

        <BarChartWrapper
          title="Most Orders"
          width={SCREEN_WIDTH * 1.5}
          data={mostOrdersData}
        />

        <BarChartWrapper
          title="Biggest Orders"
          width={SCREEN_WIDTH * 1.5}
          data={biggestOrdersData}
        />
      </ScrollView>
    </View>
  );
};

export default EmployeeStatisticsComponent;
