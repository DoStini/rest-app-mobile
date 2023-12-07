import styled from "styled-components/native";
import Text from "../Text";
import { HistoryOrderProps } from "../../types/StackTypes";
import { MaterialIcons } from "@expo/vector-icons";
import useSelectedOrder from "../../hooks/useSelectedOrder";
import LoadingComponent from "../LoadingComponent";
import theme from "../../theme";
import { convertISOToFormattedDate, formatPrice } from "../../config/helpers";
import { OrderProduct } from "../../types/OrderProduct";

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

const ProductContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProductBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  background-color: ${theme.colors.selectedColor};
  border-bottom-color: ${theme.colors.textSecondary};
  border-bottom-width: 1px;
`;

const HistoryOrder: React.FC<HistoryOrderProps> = ({ navigation, route }) => {
  const { orderId } = route.params;
  const { selectedOrder, status } = useSelectedOrder(orderId);

  if (!selectedOrder || status === "loading") {
    return <LoadingComponent />;
  }

  const goToHistory = () => {
    navigation.navigate("HistoryOrderList");
  };

  console.log(selectedOrder.OrderProduct);

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
          Creator
        </Text>
        <Text fontSize="subheading">{selectedOrder.creator.name}</Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Created at
        </Text>
        <Text fontSize="subheading">
          {convertISOToFormattedDate(selectedOrder.createdAt)}
        </Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Closed at
        </Text>
        <Text fontSize="subheading">
          {convertISOToFormattedDate(selectedOrder.closedAt)}
        </Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Total price
        </Text>
        <Text fontSize="subheading">
          {formatPrice(selectedOrder.closedTotal)}
        </Text>
      </InfoBox>
      <InfoBox>
        <Text fontSize="subheading" fontWeight="bold">
          Products
        </Text>
        {selectedOrder.OrderProduct.map((product: OrderProduct) => (
          <ProductContainer key={product.productId}>
            <ProductBox>
              <Text fontSize="subheading" color="textSecondary">
                {product.product.name}
              </Text>
              <Text fontSize="subheading" color="textSecondary">
                {product.amount}
                {" x "}
                {formatPrice(product.product.price)}
                {" = "}
                {formatPrice(product.closedTotal)}
              </Text>
            </ProductBox>
          </ProductContainer>
        ))}
      </InfoBox>
    </Container>
  );
};

export default HistoryOrder;
