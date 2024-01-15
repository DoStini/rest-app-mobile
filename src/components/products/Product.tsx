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
  const { product, categoryName } = route.params;
  const { refetch: refetchCategories } = useCategories();
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  const [editedPrice, setEditedPrice] = useState(
    parseFloat(product.price).toFixed(2)
  );
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteProduct(product.id);
    refetchCategories();
    navigation.navigate("Products");
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (editing) {
      // Call updateProduct only if the name or price has changed
      if (
        editedName != product.name ||
        editedPrice != parseFloat(product.price).toFixed(2)
      ) {
        setLoading(true);
        await updateProduct(
          product.id,
          editedName,
          Number(editedPrice),
          product.categoryId
        );
        navigation.navigate("Products");
        refetchCategories();
        setLoading(false);
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
          <Pressable
            style={{ paddingLeft: 10 }}
            onPress={handleUpdate}
            disabled={loading}
          >
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
          Category:
        </Text>
        <Text fontSize="body" color="textPrimary">
          {categoryName}
        </Text>
      </View>

      <Divider />

      <Button
        text="Delete product"
        onPress={handleDelete}
        loading={loading}
        style={{ backgroundColor: theme.colors.error, marginTop: 10 }}
      ></Button>
    </View>
  );
};

export default Product;
