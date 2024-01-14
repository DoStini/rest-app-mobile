import Text from "../Text";
import { ProductProps } from "../../types/StackTypes";
import { formatPrice } from "../../config/helpers";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import ContainerStyle from "../../styles/Containers";
import Header from "../Header";
import Divider from "../Divider";
import Button from "../Button";
import { deleteProduct, updateProduct } from "../../services/orderService";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../theme";
import { useState } from "react";
import useCategories from "../../hooks/useCategories";

const Styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
});

const Product = ({ navigation, route }: ProductProps) => {
  const { product } = route.params;
  const { refetch: refetchCategories } = useCategories();

  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  const [editedPrice, setEditedPrice] = useState(String(product.price));
  //const [editedDescription, setEditedDescription] = useState(product.manual);

  const handleDelete = async () => {
    await deleteProduct(product.id);
    refetchCategories();
    navigation.navigate("Products");
  };

  const handleUpdate = async () => {
    if (editing) {
      if (editedName != product.name || editedPrice != String(product.price)) {
        await updateProduct(
          product.id,
          editedName,
          Number(editedPrice),
          product.categoryId
        );
        navigation.navigate("Products");
        refetchCategories();
      } else {
        setEditing(!editing);
      }
    } else {
      setEditing(!editing);
    }
  };

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title="Product details"
        afterTitle={
          <Pressable style={{ paddingLeft: 10 }} onPress={handleUpdate}>
            <MaterialIcons
              name={editing ? "save" : "edit"}
              color={theme.colors.textPrimary}
              size={26}
            />
          </Pressable>
        }
        goBack={() => navigation.navigate("Products")}
      />

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Name:
        </Text>
        {editing ? (
          <TextInput
            value={editedName}
            onChangeText={setEditedName}
            style={{ fontSize: 16 }}
          />
        ) : (
          <Text fontSize="body" color="textPrimary">
            {product.name}
          </Text>
        )}
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Price:
        </Text>
        {editing ? (
          <TextInput
            value={editedPrice}
            onChangeText={(text) => {
              const cleanedText = text.replace(",", ".");
              setEditedPrice(cleanedText);
            }}
            style={{ fontSize: 16 }}
            keyboardType="numeric"
          />
        ) : (
          <Text fontSize="body" color="textPrimary">
            {formatPrice(product.price)}
          </Text>
        )}
      </View>

      <Divider />

      <View style={Styles.rowContainer}>
        <Text fontSize="body" fontWeight="bold" color="textPrimary">
          Description:
        </Text>
        <Text fontSize="body" color="textPrimary">
          {product.manual}
        </Text>
      </View>

      <Divider />

      <Button
        text="Delete product"
        onPress={handleDelete}
        style={{ backgroundColor: "red", marginTop: 10 }}
      ></Button>
    </View>
  );
};

export default Product;
