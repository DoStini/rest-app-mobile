import styled from "styled-components/native";
import Text from "../../Text";
import useOrders from "../../../hooks/useOrders";
import LoadingComponent from "../../LoadingComponent";
import theme from "../../../theme";
import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Table } from "../../../types/Table";
import ContainerStyle from "../../../styles/Containers";
import { ScrollView } from "react-native-gesture-handler";
import { OrderListProps } from "../../../types/stack/OrderStack";

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

const OrderList = ({ navigation }: OrderListProps) => {
  const { tables, status, error } = useOrders();

  if (status === "loading" || status === "idle") {
    return <LoadingComponent />;
  }

  return (
    <View style={ContainerStyle.contentContainer}>
      <Text fontSize="heading" fontWeight="bold">
        Orders
      </Text>

      <ScrollView style={{ marginTop: 20 }}>
        {tables?.map(
          (table: Table) =>
            table.orders?.length > 0 && (
              <View style={{ marginBottom: 10 }} key={table.id}>
                <Text fontSize="heading" fontWeight="bold">
                  {table.name}
                </Text>

                {table.orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <ListItemContainer
                      activeOpacity={1}
                      onPress={() =>
                        navigation.navigate("Order", {
                          id: String(order.id),
                        })
                      }
                    >
                      <ItemTitle>
                        <Text
                          fontSize="medium"
                          fontWeight="semibold"
                          color="textSecondary"
                        >
                          {order.name}
                        </Text>
                      </ItemTitle>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        <Text fontSize="small" color="textSecondary">
                          Responsible:{" "}
                        </Text>
                        <Text fontSize="small" color="textSecondary">
                          {order.creator.name}
                        </Text>
                      </View>
                    </ListItemContainer>
                  </React.Fragment>
                ))}
              </View>
            )
        )}
      </ScrollView>
    </View>
  );
};

export default OrderList;
