import styled from "styled-components/native";
import Text from "../Text";
import useOrders from "../../hooks/useOrders";
import LoadingComponent from "../LoadingComponent";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";
import React from "react";
import { Item } from "../../types/Item";

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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

const Home: React.FC = () => {
  const { items, status, error } = useOrders();

  if (status === "loading" || status === "idle") {
    return <LoadingComponent />;
  }

  return (
    <ContentContainer>
      <Text fontSize="heading" fontWeight="bold" shadow={true}>
        Home
      </Text>

      <StyledScrollView>
        {items &&
          items.map(
            (item: Item) =>
              item.orders &&
              item.orders.length > 0 && (
                <React.Fragment key={item.id}>
                  <Text fontSize="heading" fontWeight="bold">
                    {item.name}
                  </Text>

                  {item.orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <ListItemContainer activeOpacity={1}>
                        <ItemTitle>
                          <Text
                            fontSize="subheading"
                            fontWeight="bold"
                            color="textSecondary"
                          >
                            {order.name}
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
                      </ListItemContainer>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )
          )}
      </StyledScrollView>
    </ContentContainer>
  );
};

export default Home;
