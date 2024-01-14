import { View } from "react-native";
import ContainerStyle from "../../styles/Containers";
import Text from "../Text";

type StatisticsCardProps = {
  title: string;
  value: string;
  preValue?: string;
  subValue?: string;
};

const StatisticsCard = ({
  title,
  value,
  preValue,
  subValue,
}: StatisticsCardProps) => {
  return (
    <View style={ContainerStyle.statisticsCard}>
      <View
        style={{ display: "flex", flexDirection: "column", marginBottom: 15 }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {preValue && (
            <Text fontWeight="bold" style={{ marginRight: 5 }}>
              €
            </Text>
          )}
          <Text
            fontSize="heading"
            fontWeight="bold"
            style={{ textAlign: "center" }}
          >
            {value}
          </Text>
        </View>
        {subValue && (
          <Text fontSize="small" style={{ textAlign: "center" }}>
            {subValue}
          </Text>
        )}
      </View>
      <Text
        fontSize="small"
        style={{ fontStyle: "italic", textAlign: "center" }}
      >
        {title}
      </Text>
    </View>
  );
};

export default StatisticsCard;
