import React, { useState } from "react";
import Text from "../Text";
import { NewProductProps } from "../../types/StackTypes";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../../theme";
import { Formik } from "formik";
import * as Yup from "yup";
import { View, StyleSheet, TextInput } from "react-native";
import ContainerStyle from "../../styles/Containers";
import Header from "../Header";
import Divider from "../Divider";
import Button from "../Button";
import { createProduct } from "../../services/orderService";
import useCategories from "../../hooks/useCategories";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  inputContainer: {
    padding: 12,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.number().required("Product price is required"),
  category: Yup.string().required("Category is required"),
});

const NewProduct = ({ navigation, route }: NewProductProps) => {
  const { categories } = route.params;
  const { refetch: refetchCategories } = useCategories();
  const [open, setOpen] = useState(false);

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title="New product"
        goBack={() => navigation.navigate("Products")}
      />

      <Divider />

      <Formik
        initialValues={{ name: "", price: "", category: "" }}
        validationSchema={ProductSchema}
        onSubmit={async (values) => {
          await createProduct(
            values.name,
            Number(values.price),
            Number(values.category)
          );
          refetchCategories();
          navigation.navigate("Products");
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
              <View style={Styles.inputContainer}>
                <TextInput
                  placeholder="Name for the product"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                ></TextInput>
              </View>
              {touched.name && errors.name && (
                <Text style={{ color: "red" }}>{errors.name}</Text>
              )}
            </View>

            <Divider />

            <View style={Styles.rowContainer}>
              <Text fontSize="body" fontWeight="bold" color="textPrimary">
                Price
              </Text>
              <View style={Styles.inputContainer}>
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
                ></TextInput>
              </View>
              {touched.price && errors.price && (
                <Text style={{ color: "red" }}>{errors.price}</Text>
              )}
            </View>

            <Divider />

            <View style={[Styles.rowContainer, { zIndex: 1 }]}>
              <Text fontSize="body" fontWeight="bold" color="textPrimary">
                Category
              </Text>
              <DropDownPicker
                open={open}
                value={values.category}
                items={categories.map((category) => ({
                  label: category.name,
                  value: category.id.toString(),
                }))}
                setOpen={(isOpen) => {
                  setOpen(isOpen);
                }}
                setValue={(val) => {
                  const actualValue = val({});
                  setFieldValue("category", actualValue);
                }}
                placeholder="Select a category"
                style={{
                  backgroundColor: theme.colors.barColor,
                  minHeight: 40,
                  borderWidth: 0,
                  borderRadius: 0,
                }}
                dropDownContainerStyle={{
                  zIndex: 2,
                  borderWidth: 0,
                }}
                placeholderStyle={{
                  color: "#C2B7AB",
                }}
              />
              {touched.category && errors.category && (
                <Text style={{ color: "red" }}>{errors.category}</Text>
              )}
            </View>
            <Divider />

            <Button text="Create" onPress={handleSubmit} icon="add"></Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default NewProduct;
