import { Dataset } from "react-native-chart-kit/dist/HelperTypes";
import ContainerStyle from "../../styles/Containers";
import { ScrollView, View } from "react-native";
import Text from "../Text";
import { LineChart } from "react-native-chart-kit";
import { limitString } from "../../config/helpers";
import { CHARTS_HEIGHT } from "../../constants";

type LineChartWrapperProps = {
  title: string;
  width: number;
  data: { labels: string[]; datasets: Dataset[] };
  labelLimit?: number;
  subValue?: string;
};

const LineChartWrapper = ({
  title,
  width,
  data,
  subValue,
  labelLimit = 20,
}: LineChartWrapperProps) => {
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
        <LineChart
          data={data || []}
          width={width}
          yAxisLabel=""
          yAxisSuffix=""
          height={CHARTS_HEIGHT}
          fromZero
          renderDotContent={({ x, y, index }) => (
            <Text
              key={index}
              fontSize="small"
              style={{
                position: "absolute",
                left: index > 0 ? x - 20 : x,
                top: y + 5,
                textAlign: "center",
              }}
            >
              {data.datasets[0].data[index]}
            </Text>
          )}
          formatXLabel={(value: string) => limitString(value, labelLimit)}
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default LineChartWrapper;
