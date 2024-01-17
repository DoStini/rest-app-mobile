import { ScrollView, View } from "react-native";
import ContainerStyle from "../../styles/Containers";
import Text from "../Text";
import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import { BarChart } from "react-native-chart-kit";
import { limitString } from "../../config/helpers";
import { CHARTS_HEIGHT } from "../../constants";

type BarChartWrapperProps = {
  title: string;
  width: number;
  data: { labels: string[]; datasets: Dataset[] };
  labelLimit?: number;
  subValue?: string;
};

const BarChartWrapper = ({
  title,
  width,
  data,
  subValue,
  labelLimit = 20,
}: BarChartWrapperProps) => {
  return (
    <View style={ContainerStyle.statisticChart}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <Text fontSize="medium" fontWeight="bold">
          {title}
        </Text>
        {subValue && (
          <Text fontSize="heading" fontWeight="bold">
            {subValue}
          </Text>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        style={{ paddingVertical: 20 }}
      >
        <BarChart
          data={data || []}
          width={width}
          yAxisLabel=""
          yAxisSuffix=""
          height={CHARTS_HEIGHT}
          showValuesOnTopOfBars
          fromZero
          chartConfig={{
            formatXLabel: (value: string) => limitString(value, labelLimit),
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            strokeWidth: 2,
            decimalPlaces: 0,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default BarChartWrapper;
