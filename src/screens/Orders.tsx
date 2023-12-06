import styled from "styled-components/native";
import Text from "../components/Text";
import { OrdersProps } from "../types/StackTypes";
import { MaterialIcons } from "@expo/vector-icons";

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-top: 50px;
  position: relative;
`;

const IconContainer = styled.View`
  position: absolute;
  top: 50px;
  right: 10px;
  padding: 10px;
`;

const Orders = ({ navigation }: OrdersProps) => {
  const goToHistory = () => {
    navigation.navigate("OrderHistory");
  };

  return (
    <ContentContainer>
      <IconContainer>
        <MaterialIcons
          name="history"
          size={30}
          color="black"
          onPress={goToHistory}
        />
      </IconContainer>
      <Text fontSize="heading" fontWeight="bold" shadow={true}>
        Histórico
      </Text>
    </ContentContainer>
  );
};

export default Orders;
