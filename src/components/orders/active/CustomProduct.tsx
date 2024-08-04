import React, { useState } from "react";
import Text from "../../Text";
import { NewProductProps } from "../../../types/stack/ProductStack";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../../../theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet, TextInput } from "react-native";
import ContainerStyle from "../../../styles/Containers";
import Header from "../../headers/Header";
import Divider from "../../Divider";
import Button from "../../Button";
import {
  createManualProduct,
  createProduct,
} from "../../../services/orderService";
import useCategories from "../../../hooks/useCategories";
import { getCategoryNameById } from "../../../config/helpers";
import { Product } from "../../../types/Product";
import { OrderAddCustomProps } from "../../../types/stack/OrderStack";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.number().required("Product price is required"),
});

const CustomProduct = ({ navigation, route }: OrderAddCustomProps) => {
  const { id } = route.params;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCreateProduct = async (name: string, price: string) => {
    setLoading(true);
    const product = await createManualProduct(name, Number(price), id);

    navigation.goBack();
    setLoading(false);
  };
  return (
    <View style={ContainerStyle.contentContainer}>
      <Header title="New product" goBack={() => navigation.goBack()} />

      <Divider />

      <Formik
        initialValues={{ name: "", price: "", category: "" }}
        validationSchema={ProductSchema}
        onSubmit={(values) => {
          onCreateProduct(values.name, values.price);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          values,
        }) => (
          <View>
            <View style={Styles.rowContainer}>
              <Text fontSize="body" fontWeight="bold" color="textPrimary">
                Product name
              </Text>
              <TextInput
                placeholder="Name for the product"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                style={{ paddingTop: 5 }}
              ></TextInput>
              {touched.name && errors.name && (
                <Text style={{ color: theme.colors.error }}>{errors.name}</Text>
              )}
            </View>

            <Divider />

            <View style={Styles.rowContainer}>
              <Text fontSize="body" fontWeight="bold" color="textPrimary">
                Price
              </Text>
              <TextInput
                placeholder="Price in euros (€)"
                onChangeText={(text) => {
                  const cleanedText = text.replace(",", ".");
                  setFieldValue("price", cleanedText);
                  handleChange("price")(cleanedText);
                }}
                onBlur={handleBlur("price")}
                value={values.price}
                keyboardType="numeric"
                style={{ paddingTop: 5 }}
              ></TextInput>
              {touched.price && errors.price && (
                <Text style={{ color: theme.colors.error }}>
                  {errors.price}
                </Text>
              )}
            </View>

            <Divider />

            <Button
              text="Create"
              onPress={handleSubmit}
              icon="add"
              loading={loading}
            ></Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CustomProduct;
