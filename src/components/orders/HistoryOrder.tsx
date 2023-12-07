import styled from "styled-components/native";
import Text from "../Text";
import { HistoryOrderProps } from "../../types/StackTypes";
import { MaterialIcons } from "@expo/vector-icons";
import useSelectedOrder from "../../hooks/useSelectedOrder";
import LoadingComponent from "../LoadingComponent";

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

const HistoryOrder: React.FC<HistoryOrderProps> = ({ navigation, route }) => {
  const { orderId } = route.params;
  const { selectedOrder, status } = useSelectedOrder(orderId);

  console.log(selectedOrder);

  if (!selectedOrder || status === "loading") {
    return <LoadingComponent />;
  }

  const goToHistory = () => {
    navigation.navigate("HistoryOrderList");
  };

  return (
    <Container>
      <TopBar>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="black"
          onPress={goToHistory}
        />
        <Text fontSize="heading" fontWeight="bold" shadow={true}>
          {selectedOrder.Table.name}
          {", "}
          {selectedOrder.name}
        </Text>
      </TopBar>

      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Creator:
        </Text>
        <Text fontSize="subheading">{selectedOrder.creator.name}</Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Created at:
        </Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Total price:
        </Text>
        <Text fontSize="subheading">{selectedOrder.closedTotal}</Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          TODO. Add here more info what we want to render etc
        </Text>
      </InfoBox>
    </Container>
  );
};

export default HistoryOrder;
