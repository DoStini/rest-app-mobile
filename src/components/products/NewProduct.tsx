import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Text from "../Text";
import { NewProductProps } from "../../types/StackTypes";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../../theme";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 60px;
`;

const TopBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom-color: black;
  border-bottom-width: 1px;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInputItem = styled.View`
  z-index: 1;
  margin-top: 30px;
  width: 90%;
`;

const StyledTextInput = styled.TextInput`
  border: 1px solid ${theme.colors.borderColor};
  background-color: ${theme.colors.barColor};
  padding: 10px;
  height: 40px;
  border-radius: 5px;
`;

const StyledButton = styled(TouchableOpacity)`
  background-color: ${theme.colors.unSelectedColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  padding: 10px 15px;
  border-radius: 10px;
`;

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  price: Yup.number().required("Product price is required"),
  category: Yup.string().required("Category is required"),
});

const NewProduct = ({ navigation, route }: NewProductProps) => {
  const { categories } = route.params;
  const [open, setOpen] = useState(false);

  const goToProducts = () => {
    navigation.navigate("Products");
  };

  return (
    <Container>
      <TopBar>
        <MaterialIcons
          name="arrow-back"
          size={36}
          color="black"
          onPress={goToProducts}
        />
        <Text fontSize="heading" fontWeight="bold">
          New product
        </Text>
      </TopBar>

      <Formik
        initialValues={{ name: "", price: "", category: "" }}
        validationSchema={ProductSchema}
        onSubmit={(values) => {
          console.log(values);
          console.log("TODO add api call to the backend when available");
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
          <InputContainer>
            <StyledInputItem>
              <Text fontSize="subheading" fontWeight="bold">
                Product name
              </Text>
              <StyledTextInput
                placeholder="Name for the product"
                placeholderTextColor="#000"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text style={{ color: "red" }}>{errors.name}</Text>
              )}
            </StyledInputItem>

            <StyledInputItem>
              <Text fontSize="subheading" fontWeight="bold">
                Price
              </Text>
              <StyledTextInput
                placeholder="Price in euros (€)"
                placeholderTextColor="#000"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                keyboardType="numeric"
              />
              {touched.price && errors.price && (
                <Text style={{ color: "red" }}>{errors.price}</Text>
              )}
            </StyledInputItem>

            <StyledInputItem>
              <Text fontSize="subheading" fontWeight="bold">
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
                  borderColor: theme.colors.borderColor,
                  backgroundColor: theme.colors.barColor,
                  minHeight: 40,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                dropDownContainerStyle={{
                  zIndex: 2,
                  borderWidth: 0,
                }}
              />
              {touched.category && errors.category && (
                <Text style={{ color: "red" }}>{errors.category}</Text>
              )}
            </StyledInputItem>

            <StyledButton activeOpacity={1} onPress={handleSubmit}>
              <AntDesign name="plus" size={24} color="white" />
              <Text color="textSecondary" style={{ marginLeft: 10 }}>
                Create
              </Text>
            </StyledButton>
          </InputContainer>
        )}
      </Formik>
    </Container>
  );
};

export default NewProduct;
