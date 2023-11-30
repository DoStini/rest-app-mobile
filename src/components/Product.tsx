import styled from "styled-components/native";
import Text from "./Text";
import { ProductProps } from "../types/types";
import { MaterialIcons } from "@expo/vector-icons";

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`;
const IconContainer = styled.View`
  position: absolute;
  top: 50px;
  left: 10px;
  padding: 10px;
`;

const Product: React.FC<ProductProps> = ({ navigation, route }) => {
  const { id } = route.params;
  //console.log(id);

  const goToProducts = () => {
    navigation.navigate("Products");
  };

  return (
    <ContentContainer>
      <IconContainer>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="black"
          onPress={goToProducts}
        />
      </IconContainer>
      <Text fontSize="heading" fontWeight="bold" shadow={true}>
        Product {id}
      </Text>
    </ContentContainer>
  );
};

export default Product;
