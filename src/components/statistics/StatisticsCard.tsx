import { Pressable, View } from "react-native";
import ContainerStyle from "../../styles/Containers";
import Text from "../Text";
import {
  StatisticsProps,
  StatisticsStackScreens,
} from "../../types/stack/StatisticsStack";

type StatisticsCardProps = {
  title: string;
  value: string;
  preValue?: string;
  subValue?: string;
  navigation: StatisticsProps["navigation"];
};

const StatisticsCard = ({
  title,
  value,
  preValue,
  subValue,
  navigation,
}: StatisticsCardProps) => {
  const route = StatisticsStackScreens[title];

  return (
    <Pressable
      disabled={!route}
      onPress={() => navigation.navigate(route)}
      style={ContainerStyle.statisticsCard}
    >
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
    </Pressable>
  );
};

export default StatisticsCard;
