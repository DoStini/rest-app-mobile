import styled from "styled-components/native";
import Text from "../Text";
import { HistoryProps } from "../../types/StackTypes";
import useHistory from "../../hooks/useHistory";
import LoadingComponent from "../LoadingComponent";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;
const StyledScrollView = styled.ScrollView`
  margin-top: 20px;
  width: 90%;
  height: 70%;
  border: 1px solid ${theme.colors.borderColor};
`;

const ListItemContainer = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${theme.colors.selectedColor};
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textSecondary};
`;

const HistoryOrderList: React.FC<HistoryProps> = ({ navigation }) => {
  const { items, status, error } = useHistory();

  const goToHistoryOrder = (orderId: string) => {
    navigation.navigate("HistoryOrder", { orderId });
  };

  const getHourFromDate = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    return `${hours}:${minutes}`;
  };

  if (status === "loading") {
    return <LoadingComponent />;
  }

  // TODO. Add types, format price and date
  return (
    <ContentContainer>
      <Text fontSize="heading" fontWeight="bold" shadow={true}>
        History
      </Text>
      <StyledScrollView>
        {items.map((order) => (
          <ListItemContainer
            key={order.id}
            onPress={() => goToHistoryOrder(order.id)}
          >
            <Text fontSize="subheading" color="textSecondary">
              Table:{order.Table.name}
            </Text>
            <Text fontSize="body" color="textSecondary">
              Creator:{order.creator.name}
            </Text>
            <Text fontSize="body" color="textSecondary">
              Closed at:{getHourFromDate(order.closedAt)}:00
            </Text>
            <Text fontSize="body" color="textSecondary">
              Total price:{order.closedTotal}€
            </Text>
          </ListItemContainer>
        ))}
      </StyledScrollView>
    </ContentContainer>
  );
};

export default HistoryOrderList;
