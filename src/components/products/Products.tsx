import Text from "../Text";
import {
  TouchableOpacity,
  TextInput,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import theme from "../../theme";
import { AntDesign } from "@expo/vector-icons";
import { ProductsProps } from "../../types/StackTypes";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category";
import useCategories from "../../hooks/useCategories";
import LoadingComponent from "../LoadingComponent";
import { formatPrice } from "../../config/helpers";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../Header";
import ContainerStyle from "../../styles/Containers";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

const Products = ({ navigation }: ProductsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const { categories, status, error, refetch } = useCategories();

  // Set the first category as a default filter
  useEffect(() => {
    if (categories && categories.length > 0 && categories[0].id !== undefined) {
      setSelectedFilter(categories[0].id);
    }
  }, [categories]);

  if (status === "loading") {
    return <LoadingComponent />;
  }

  // Function to get filtered data based on the selected filter
  const getFilteredProducts = () => {
    if (selectedFilter !== null) {
      const selectedCategory = categories.find(
        (category) => category.id === selectedFilter
      );
      const products = selectedCategory ? selectedCategory.products : [];

      return products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  };

  const filteredProducts = getFilteredProducts();

  const goToProduct = (product: Product) => {
    navigation.navigate("Product", { product: product });
  };

  const goToNewProduct = (categories: Category[]) => {
    navigation.navigate("NewProduct", {
      categories: categories,
    });
  };

  return (
    <View style={ContainerStyle.contentContainer}>
      <Header
        title="Products"
        rightButton={
          <Pressable
            onPress={() => goToNewProduct(categories)}
            style={{ padding: 10 }}
          >
            <MaterialIcons
              testID="addProductButton"
              name="add-circle-outline"
              size={30}
              color={theme.colors.textPrimary}
            />
          </Pressable>
        }
      />

      <View style={styles.inputContainer}>
        <AntDesign
          name="search1"
          size={24}
          color={theme.colors.textPrimary}
          style={{ paddingRight: 10 }}
        />
        <TextInput
          value={searchQuery}
          placeholder="Search for a product..."
          onChangeText={(query: string) => setSearchQuery(query)}
          style={{ flex: 1 }}
        />
      </View>

      <View style={[ContainerStyle.rowSpaceBetween, { marginBottom: 10 }]}>
        {categories.map((category: Category) => (
          <Pressable
            key={category.id}
            onPress={() => setSelectedFilter(category.id)}
            style={[
              ContainerStyle.listItemContainer,
              {
                backgroundColor:
                  selectedFilter === category.id
                    ? theme.colors.backgroundPrimary
                    : theme.colors.tertiary,
                paddingVertical: 15,
              },
            ]}
          >
            <Text
              key={category.id}
              fontSize="small"
              color="textSecondary"
              fontWeight={selectedFilter === category.id ? "bold" : "normal"}
              onPress={() => setSelectedFilter(category.id)}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView>
        {filteredProducts &&
          filteredProducts.map((product: Product) => (
            <TouchableOpacity
              activeOpacity={1}
              key={product.id}
              onPress={() => goToProduct(product)}
            >
              <View style={ContainerStyle.listItemContainer}>
                <View
                  style={[
                    ContainerStyle.rowSpaceBetween,
                    { alignItems: "center" },
                  ]}
                >
                  <Text
                    fontSize="small"
                    fontWeight="light"
                    color="textSecondary"
                    numberOfLines={1}
                  >
                    {product.name}
                  </Text>
                  <Text
                    fontSize="small"
                    fontWeight="light"
                    color="textSecondary"
                    numberOfLines={1}
                  >
                    {formatPrice(product.price)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Products;
