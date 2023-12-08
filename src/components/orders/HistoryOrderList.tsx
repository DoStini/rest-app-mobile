import styled from "styled-components/native";
import Text from "../Text";
import { HistoryProps } from "../../types/StackTypes";
import useHistory from "../../hooks/useHistory";
import LoadingComponent from "../LoadingComponent";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";
import { Order } from "../../types/Order";
import { convertISOToFormattedDate, formatPrice } from "../../config/helpers";

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;
const StyledScrollView = styled.ScrollView`
  margin-top: 20px;
  width: 90%;
  height: 90%;
  border: 1px solid ${theme.colors.borderColor};
`;

const ListItemContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.selectedColor};
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textSecondary};
`;

const ItemTitle = styled.View`
  margin-bottom: 10px;
`;

const ItemRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HistoryOrderList: React.FC<HistoryProps> = ({ navigation }) => {
  const { items, status, error } = useHistory();

  const goToHistoryOrder = (orderId: number) => {
    const id = String(orderId);
    navigation.navigate("HistoryOrder", { id });
  };

  if (status === "loading") {
    return <LoadingComponent />;
  }

  return (
    <ContentContainer>
      <Text fontSize="heading" fontWeight="bold" shadow={true}>
        History
      </Text>
      <StyledScrollView>
        {items.map((order: Order) => (
          <ListItemContainer
            activeOpacity={1}
            key={order.id}
            onPress={() => goToHistoryOrder(order.id)}
          >
            <ItemTitle>
              <Text
                fontSize="subheading"
                color="textSecondary"
                fontWeight="bold"
              >
                Table:{order.Table.name}
              </Text>
            </ItemTitle>
            <ItemRow>
              <Text fontSize="body" color="textSecondary">
                Creator:
              </Text>
              <Text fontSize="body" color="textSecondary">
                {order.creator.name}
              </Text>
            </ItemRow>

            <ItemRow>
              <Text fontSize="body" color="textSecondary">
                Closed at:
              </Text>
              <Text fontSize="body" color="textSecondary">
                {convertISOToFormattedDate(order.closedAt)}
              </Text>
            </ItemRow>

            <ItemRow>
              <Text fontSize="body" color="textSecondary">
                Total price:
              </Text>
              <Text fontSize="body" color="textSecondary">
                {formatPrice(order.closedTotal)}
              </Text>
            </ItemRow>
          </ListItemContainer>
        ))}
      </StyledScrollView>
    </ContentContainer>
  );
};

export default HistoryOrderList;
