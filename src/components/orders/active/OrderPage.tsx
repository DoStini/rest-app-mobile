import { StyleSheet, View } from "react-native";
import useLiveOrder from "../../../hooks/useLiveOrder";
import { OrderProps } from "../../../types/stack/OrderStack";
import LoadingComponent from "../../LoadingComponent";
import Text from "../../Text";
import ContainerStyle from "../../../styles/Containers";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import theme from "../../../theme";

const Divider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.barColor};
  width: 100%;
`;

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const OrderPage = ({ navigation, route }: OrderProps) => {
  const { id } = route.params;
  const { order, status, error } = useLiveOrder(id);

  if (status === "idle") {
    return <LoadingComponent />;
  }

  return (
    <View style={ContainerStyle.contentContainer}>
      <View style={ContainerStyle.rowSpaceBetween}>
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => navigation.navigate("OrderList")}
        />
        <Text fontSize="heading" fontWeight="medium">
          {order?.Table.name}
          {", "}
          {order?.name}
        </Text>
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Responsible:{" "}
        </Text>
        <Text fontSize="body" color="textPrimary">
          {order?.creator.name}
        </Text>
      </View>
    </View>
  );
};

export default OrderPage;
