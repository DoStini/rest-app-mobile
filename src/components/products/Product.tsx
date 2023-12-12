import styled from "styled-components/native";
import Text from "../Text";
import { ProductProps } from "../../types/StackTypes";
import { MaterialIcons } from "@expo/vector-icons";
import { formatPrice } from "../../config/helpers";

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding-top: 60px;
`;

const TopBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom-color: black;
  border-bottom-width: 1px;
`;

const InfoBox = styled.View`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom-color: black;
  border-bottom-width: 1px;
`;

const Product = ({ navigation, route }: ProductProps) => {
  const { product } = route.params;

  const goToProducts = () => {
    navigation.navigate("Products");
  };

  return (
    <Container>
      <TopBar>
        <MaterialIcons
          name="arrow-back"
          size={36}
          color="black"
          onPress={goToProducts}
        />
        <Text fontSize="heading" fontWeight="bold">
          Product details
        </Text>
      </TopBar>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Name:
        </Text>
        <Text fontSize="subheading">{product.name}</Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Price:
        </Text>
        <Text fontSize="subheading">{formatPrice(product.price)}</Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Description:
        </Text>
        <Text fontSize="subheading">{product.manual}</Text>
      </InfoBox>
    </Container>
  );
};

export default Product;
