import Text from "../Text";
import { ProductProps } from "../../types/stack/ProductStack";
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
import LoadingComponent from "../LoadingComponent";

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
  const [loading, setLoading] = useState(false);

  const [productDetails, setProductDetails] = useState({
    currentName: product.name,
    currentPrice: product.price,
    editedName: product.name,
    editedPrice: product.price,
  });

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
        productDetails.currentName != productDetails.editedName ||
        productDetails.currentPrice != productDetails.editedPrice
      ) {
        setLoading(true);
        await updateProduct(
          product.id,
          productDetails.editedName,
          Number(productDetails.editedPrice),
          product.categoryId
        );
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          currentName: productDetails.editedName,
          currentPrice: productDetails.editedPrice,
        }));
        setLoading(false);
        refetchCategories();
      }
    }
    setEditing(!editing);
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
            {loading ? (
              <LoadingComponent />
            ) : (
              <MaterialIcons
                name={editing ? "save" : "edit"}
                color={theme.colors.textPrimary}
                size={26}
              />
            )}
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
            value={productDetails.editedName}
            onChangeText={(text) =>
              setProductDetails((prevDetails) => ({
                ...prevDetails,
                editedName: text,
              }))
            }
            style={{ fontSize: 16 }}
          />
        ) : (
          <Text fontSize="body" color="textPrimary">
            {productDetails.currentName}
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
            value={productDetails.editedPrice}
            onChangeText={(text) => {
              const cleanedText = text.replace(",", ".");
              const validated = cleanedText.match(/^(\d*\.{0,1}\d{0,2}$)/);
              if (validated) {
                setProductDetails((prevDetails) => ({
                  ...prevDetails,
                  editedPrice: cleanedText,
                }));
              }
            }}
            style={{ fontSize: 16 }}
            keyboardType="numeric"
          />
        ) : (
          <Text fontSize="body" color="textPrimary">
            {formatPrice(productDetails.currentPrice)}
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
