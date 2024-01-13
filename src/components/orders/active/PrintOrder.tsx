import { View, StyleSheet, ScrollView } from "react-native";
import ContainerStyle from "../../../styles/Containers";
import { OrderPrintProps } from "../../../types/stack/OrderStack";
import Header from "../../Header";
import usePrintableorder from "../../../hooks/orders/usePrintableOrder";
import LoadingComponent from "../../LoadingComponent";
import Text from "../../Text";
import Divider from "../../Divider";
import { OrderProduct } from "../../../types/OrderProduct";
import { useMemo, useState } from "react";
import { Form, Formik } from "formik";
import FormNumberInput from "../../FormNumberInput";
import Button from "../../Button";
import { printOrderById } from "../../../services/orderService";
import useSnackbar from "../../../hooks/useSnackbar";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const Products = ({
  id,
  products,
  navigation,
}: {
  id: string;
  products: OrderProduct[];
  navigation: OrderPrintProps["navigation"];
}) => {
  const initialValues = useMemo(
    () =>
      products.map((product) => {
        const amount = product.amount - product.orderedAmount!;
        return {
          productId: product.productId,
          amount: amount > 0 ? amount : 0,
        };
      }),
    [products]
  );

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    printOrderById(id, values).then(() => {
      setLoading(false);
      navigation.goBack();
    });
  };

  return (
    <View>
      <Text fontSize="medium" fontWeight="bold" style={{ paddingBottom: 15 }}>
        Print Order
      </Text>
      {products.map((product) => (
        <View key={product.productId} style={ContainerStyle.listItemContainer}>
          <View
            style={[ContainerStyle.rowSpaceBetween, { alignItems: "center" }]}
          >
            <Text
              fontSize="small"
              fontWeight="light"
              color="textSecondary"
              numberOfLines={1}
            >
              {product.product.name}
            </Text>

            <FormNumberInput
              value={
                values.find((v) => v.productId === product.productId)!.amount
              }
              setValue={(value: number) =>
                setValues((prev) => {
                  const id = prev.findIndex(
                    (p) => p.productId === product.productId
                  );
                  const newValues = [...prev];
                  newValues[id].amount = value;
                  return newValues;
                })
              }
              min={0}
              max={Infinity}
            />
          </View>
        </View>
      ))}

      <Button
        text="Confirm and order"
        icon="print"
        onPress={onSubmit}
        loading={loading}
        style={{ marginTop: 20, marginBottom: 20 }}
      />
    </View>
  );
};

const PrintOrderPage = ({ navigation, route }: OrderPrintProps) => {
  const { id } = route.params;
  const { open: openSnackbar } = useSnackbar();

  const { order, status, error } = usePrintableorder(id);

  if (error) {
    console.error(error);
    openSnackbar("An error occurred. Please try again later.");

    navigation.navigate("OrderList");
    return null;
  }

  if (status === "idle" || !order) {
    return <LoadingComponent />;
  }

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title={`${order.Table.name}, ${order.name}`}
        goBack={() => navigation.pop()}
      />

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Responsible:{" "}
        </Text>
        <Text fontSize="body" color="textPrimary">
          {order.creator.name}
        </Text>
      </View>

      <Divider />

      <ScrollView>
        <Products
          id={id}
          navigation={navigation}
          products={order.OrderProduct}
        />
      </ScrollView>
    </View>
  );
};

export default PrintOrderPage;
