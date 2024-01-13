import Text from "../Text";
import { ProductProps } from "../../types/StackTypes";
import { formatPrice } from "../../config/helpers";
import { View, StyleSheet } from "react-native";
import ContainerStyle from "../../styles/Containers";
import Header from "../Header";
import Divider from "../Divider";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const Product = ({ navigation, route }: ProductProps) => {
  const { product } = route.params;

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title="Product details"
        goBack={() => navigation.navigate("Products")}
      />

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Name:
        </Text>
        <Text fontSize="body" color="textPrimary">
          {product.name}
        </Text>
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Price:
        </Text>
        <Text fontSize="body" color="textPrimary">
          {formatPrice(product.price)}
        </Text>
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Description:
        </Text>
        <Text fontSize="body" color="textPrimary">
          {product.manual}
        </Text>
      </View>
    </View>
  );
};

export default Product;
