import styled from "styled-components/native";
import Text from "../../Text";
import useOrders from "../../../hooks/orders/useOrders";
import LoadingComponent from "../../LoadingComponent";
import theme from "../../../theme";
import { Pressable, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Table } from "../../../types/Table";
import ContainerStyle from "../../../styles/Containers";
import { ScrollView } from "react-native-gesture-handler";
import { OrderListProps } from "../../../types/stack/OrderStack";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../headers/Header";
import Snackbar from "../../Snackbar";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../../../hooks/useAuth";
import { StyleSheet } from "react-native";

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
  const isVisible = useIsFocused();
  const { user, initializing } = useAuth();

  const { tables, status, error } = useOrders(isVisible);

  const [personal, setPersonal] = useState(true);

  if (status === "loading" || status === "idle" || initializing) {
    return <LoadingComponent />;
  }

  const ownOrders =
    tables?.map((table) => ({
      ...table,
      orders: table.orders.filter(
        (order) => order.creator.username === user?.username
      ),
    })) || [];
  const otherOrders =
    tables?.map((table) => ({
      ...table,
      orders: table.orders.filter(
        (order) => order.creator.username !== user?.username
      ),
    })) || [];

  return (
    <View>
      <Snackbar />
      <View style={ContainerStyle.contentContainer}>
        <Header
          title="Orders"
          rightButton={
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Pressable
                onPress={() => navigation.navigate("HistoryOrderList")}
                style={{ padding: 10 }}
              >
                <MaterialIcons
                  name="history"
                  size={30}
                  color={theme.colors.textPrimary}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("CreateOrder")}
                style={{ padding: 10 }}
              >
                <MaterialIcons
                  name="add-circle-outline"
                  size={30}
                  color={theme.colors.textPrimary}
                />
              </Pressable>
            </View>
          }
        />

        <ScrollView>
          <UserSelection personal={personal} setPersonal={setPersonal} />

          {(personal ? ownOrders : otherOrders).map(
            (table: Table) =>
              table.orders?.length > 0 && (
                <View style={{ marginBottom: 10 }} key={table.id}>
                  <Text fontSize="heading" fontWeight="bold">
                    {table.name}
                  </Text>

                  {table.orders.map((order) => (
                    <ListItemContainer
                      key={order.id}
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
                  ))}
                </View>
              )
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-between",
  },
  button: {
    padding: 12,
    maxWidth: 300, // Adjust based on your layout needs
    textAlign: "center",
  },
  buttonActive: {
    fontWeight: "bold",
    backgroundColor: theme.colors.backgroundPrimary, // Replace with your theme's primary color
  },
  buttonInactive: {
    color: theme.colors.textSecondary,
    backgroundColor: theme.colors.backgroundSecondary, // Replace with your theme's tertiary color
  },
  text: {
    fontSize: 12,
  },
  textActive: {
    color: theme.colors.textSecondary,
  },
  textDisabled: {
    color: theme.colors.textPrimary,
  },
});

const UserSelection = ({
  personal,
  setPersonal,
}: {
  personal: boolean;
  setPersonal: (id: boolean) => void;
}) => {
  return (
    <View style={Styles.container}>
      <TouchableOpacity
        style={[
          Styles.button,
          personal ? Styles.buttonActive : Styles.buttonInactive,
        ]}
        onPress={() => setPersonal(true)}
      >
        <Text
          style={[
            Styles.text,
            personal ? Styles.textActive : Styles.textDisabled,
          ]}
        >
          Contas próprias
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          Styles.button,
          !personal ? Styles.buttonActive : Styles.buttonInactive,
        ]}
        onPress={() => setPersonal(false)}
      >
        <Text
          style={[
            Styles.text,
            !personal ? Styles.textActive : Styles.textDisabled,
          ]}
        >
          Contas gerais
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default OrderList;
