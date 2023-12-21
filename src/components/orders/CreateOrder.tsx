import { TextInput, View } from "react-native";
import Text from "../Text";
import { CreateOrderProps } from "../../types/stack/OrderStack";
import useAuth from "../../hooks/useAuth";
import useTablesInfo from "../../hooks/useTablesInfo";
import LoadingComponent from "../LoadingComponent";
import ContainerStyle from "../../styles/Containers";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../Header";
import { StyleSheet } from "react-native";
import Divider from "../Divider";
import { Formik } from "formik";
import * as Yup from "yup";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import theme from "../../theme";
import Button from "../Button";
import { useState } from "react";
import { createOrder } from "../../services/orderService";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const FormValidationSchema = Yup.object().shape({
  tableId: Yup.number().notOneOf([0], "Table is required"),
  name: Yup.string().required("Name is required"),
});

const CreateOrder = ({ navigation }: CreateOrderProps) => {
  const { user, loading, error } = useAuth();
  const { tables, status, error: errorTables } = useTablesInfo();

  const [creationLoading, setCreationLoading] = useState(false);

  if (loading || status === "loading") {
    return <LoadingComponent />;
  }

  if (error || errorTables) {
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

      <Formik
        initialValues={{ name: "", tableId: 0 }}
        validationSchema={FormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, values, setFieldValue }) => (
          <View>
            <Text fontSize="body" fontWeight="bold" color="textPrimary">
              Table
            </Text>

            <RadioButtonGroup
              onSelected={(value: string) => setFieldValue("tableId", value)}
              selected={values.tableId}
              size={15}
              containerStyle={{ marginVertical: 10 }}
              radioBackground={theme.colors.selectedColor}
            >
              {tables?.map((table) => (
                <RadioButtonItem
                  label={table.name}
                  value={table.id}
                  key={table.id}
                  style={{ marginVertical: 7, fontSize: theme.fontSizes.body }}
                />
              ))}
            </RadioButtonGroup>

            {errors.tableId && (
              <Text fontSize="small" color="error">
                {errors.tableId}
              </Text>
            )}

            <Divider />

            <Text fontSize="body" fontWeight="bold" color="textPrimary">
              Table's Name
            </Text>

            <TextInput
              placeholder="Table's Name"
              style={{}}
              onChangeText={(text) => setFieldValue("name", text)}
              value={values.name}
            />

            {errors.name && (
              <Text fontSize="small" color="error">
                {errors.name}
              </Text>
            )}

            <Divider />

            <Button
              text="Create Order"
              onPress={handleSubmit}
              loading={creationLoading}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateOrder;
