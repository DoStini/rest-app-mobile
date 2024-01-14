import { View } from "react-native";
import { StatisticsProductsProps } from "../../types/stack/StatisticsStack";
import Header from "../Header";
import ContainerStyle from "../../styles/Containers";

const ProductStatistics = ({ navigation }: StatisticsProductsProps) => {
  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title={"Product Statistics"} goBack={navigation.goBack} />
    </View>
  );
};

export default ProductStatistics;
