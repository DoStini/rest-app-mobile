import { TextInput, View } from "react-native";
import Text from "../Text";
import { CreateOrderProps } from "../../types/stack/OrderStack";
import useAuth from "../../hooks/useAuth";
import useTablesInfo from "../../hooks/useTablesInfo";
import LoadingComponent from "../LoadingComponent";
import ContainerStyle from "../../styles/Containers";
import Header from "../headers/Header";
import { StyleSheet } from "react-native";
import Divider from "../Divider";
import { useState } from "react";
import { createOrder } from "../../services/orderService";
import OrderForm from "./OrderForm";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const CreateOrder = ({ navigation }: CreateOrderProps) => {
  const { user, initializing } = useAuth();
  const { tables, status, error: errorTables } = useTablesInfo();

  const [creationLoading, setCreationLoading] = useState(false);

  if (initializing || tables.length === 0 || status === "loading") {
    return <LoadingComponent />;
  }

  if (errorTables) {
    navigation.navigate("OrderList");
    return null;
  }

  const handleSubmit = (values: { name: string; tableId: number }) => {
    setCreationLoading(true);
    createOrder(values.name, values.tableId)
      .then((order) => {
        navigation.navigate("Order", { id: order.id });
      })
      .catch((err) => {
        setCreationLoading(false);
      });
  };

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title="Create Order"
        goBack={() => navigation.navigate("OrderList")}
      />

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Responsible:{" "}
        </Text>
        <Text fontSize="body" color="textPrimary">
          {user?.name}
        </Text>
      </View>

      <Divider />

      <OrderForm
        tables={tables}
        initialValues={{ name: "", tableId: 0 }}
        handleSubmit={handleSubmit}
        loading={creationLoading}
        submitText="Create Order"
      />
    </View>
  );
};

export default CreateOrder;
