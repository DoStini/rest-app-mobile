import { View } from "react-native";
import useSelectedOrder from "../../hooks/orders/useSelectedOrder";
import { EditOrderProps } from "../../types/stack/OrderStack";
import ContainerStyle from "../../styles/Containers";
import Header from "../Header";
import Divider from "../Divider";
import useTablesInfo from "../../hooks/useTablesInfo";
import OrderForm from "./OrderForm";
import { useState } from "react";
import LoadingComponent from "../LoadingComponent";
import { editOrder } from "../../services/orderService";

const EditOrder = ({ navigation, route }: EditOrderProps) => {
  const { id } = route.params;

  const { selectedOrder: order, status, error } = useSelectedOrder(id);
  const { tables, status: tableStatus, error: errorTables } = useTablesInfo();
  const [loading, setLoading] = useState(false);

  if (error) {
    console.error(error);
    navigation.navigate("OrderList");
    return null;
  }

  const handleSubmit = (values: { name: string; tableId: number }) => {
    setLoading(true);
    editOrder(id, values.name, values.tableId)
      .then(() => {
        navigation.navigate("OrderList");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (status === "idle" || tableStatus !== "succeeded" || !order) {
    return <LoadingComponent />;
  }

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title="Edit Order" goBack={() => navigation.goBack()} />

      <Divider />

      <OrderForm
        tables={tables}
        initialValues={{ name: order.name, tableId: order.tableId }}
        handleSubmit={handleSubmit}
        loading={loading}
        submitText="Edit Order"
      />
    </View>
  );
};

export default EditOrder;
