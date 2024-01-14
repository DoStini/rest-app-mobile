import styled from "styled-components/native";
import Text from "../Text";
import Header from "../Header";
import ContainerStyle from "../../styles/Containers";
import { View } from "react-native";
import { StatisticsProps } from "../../types/StackTypes";
import StatisticsCard from "./StatisticsCard";

const Statistics = ({ navigation }: StatisticsProps) => {
  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title={"Statistics"} />

      <StatisticsCard
        title={"Total of the Day"}
        value={"1023.40"}
        preValue={"€"}
      />
      <StatisticsCard
        title={"Best day of the Week"}
        value={"2890.20"}
        preValue={"€"}
      />
      <StatisticsCard
        title={"Best Employee"}
        value={"156.80"}
        subValue={"Janne"}
        preValue={"€"}
      />

      <StatisticsCard
        title={"Most sold Product"}
        value={"156"}
        subValue={"Beer"}
      />
    </View>
  );
};

export default Statistics;
