import Header from "../Header";
import ContainerStyle from "../../styles/Containers";
import { RefreshControl, View, ScrollView } from "react-native";
import { StatisticsProps } from "../../types/stack/StatisticsStack";
import StatisticsCard from "./StatisticsCard";
import useStatistics from "../../hooks/statistics/useStatistics";

const Statistics = ({ navigation }: StatisticsProps) => {
  const { statistics, status, error, refresh } = useStatistics();

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title={"Statistics"} />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={refresh}
          />
        }
      >
        {statistics.map((statistic) => (
          <StatisticsCard
            key={statistic.name}
            title={statistic.name}
            value={statistic.value}
            preValue={statistic.preValue}
            subValue={statistic.subValue}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Statistics;
