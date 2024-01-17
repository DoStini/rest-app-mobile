import { Pressable, StyleSheet, View } from "react-native";
import ContainerStyle from "../../styles/Containers";
import Text from "../Text";
import {
  StatisticsProps,
  StatisticsStackScreens,
} from "../../types/stack/StatisticsStack";
import { MaterialIcons } from "@expo/vector-icons";
import TextStyles from "../../styles/Text";

type StatisticsCardProps = {
  title: string;
  value: string;
  preValue?: string;
  subValue?: string;
  navigation: StatisticsProps["navigation"];
};

const styles = StyleSheet.create({
  linkArrow: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

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
      {route && (
        <View style={styles.linkArrow}>
          <MaterialIcons
            name="arrow-forward"
            size={24}
            color="black"
            style={TextStyles.alignCenter}
          />
        </View>
      )}
      <View
        style={{ display: "flex", flexDirection: "column", marginBottom: 15 }}
      >
        <View style={ContainerStyle.rowCenter}>
          {preValue && (
            <Text
              fontSize="medium"
              fontWeight="bold"
              style={{ marginRight: 5 }}
            >
              €
            </Text>
          )}
          <Text
            fontSize="heading"
            fontWeight="bold"
            style={TextStyles.alignCenter}
          >
            {value}
          </Text>
        </View>
        {subValue && (
          <Text fontSize="small" style={TextStyles.alignCenter}>
            {subValue}
          </Text>
        )}
      </View>
      <Text
        fontSize="small"
        style={[TextStyles.italic, TextStyles.alignCenter]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default StatisticsCard;
