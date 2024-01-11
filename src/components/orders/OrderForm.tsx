import * as Yup from "yup";
import theme from "../../theme";
import Button from "../Button";
import { Formik } from "formik";
import { ScrollView, TextInput, View } from "react-native";
import Text from "../Text";
import React from "react";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import Divider from "../Divider";

type OrderFormProps = {
  initialValues: { name: string; tableId: number };
  handleSubmit: (values: { name: string; tableId: number }) => void;
  tables: { name: string; id: number }[];
  loading: boolean;
};

const FormValidationSchema = Yup.object().shape({
  tableId: Yup.number().notOneOf([0], "Table is required"),
  name: Yup.string().required("Name is required"),
});

const OrderForm = ({
  initialValues,
  handleSubmit,
  tables,
  loading,
}: OrderFormProps) => {
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={{ padding: 0, margin: 0 }}
    >
      <Formik
        initialValues={initialValues}
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
              loading={loading}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default OrderForm;
