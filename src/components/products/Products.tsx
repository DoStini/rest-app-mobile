import styled from "styled-components/native";
import Text from "../Text";
import {
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
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
import PopupModal from "../PopupModal";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  width: 100%;
  position: relative;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  padding: 10px;
  margin: 10px;
  background-color: ${theme.colors.backgroundSecondary};
  border-radius: 10px;
`;

const FilterButton = styled(TouchableOpacity)`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.selected ? theme.colors.selectedColor : theme.colors.unSelectedColor};
  margin: 5px;
`;

const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledScrollView = styled.ScrollView`
  margin-top: 15px;
  flex: 1;
  width: 90%;
`;

const ListItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.selectedColor};
  height: 50px;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.textSecondary};
`;

const PlusIcon = styled(TouchableOpacity)`
  position: absolute;
  top: 65px;
  right: 20px;
`;

const Products: React.FC<ProductsProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null);
  const { categories, status, error } = useCategories();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <PlusIcon activeOpacity={1} onPress={openModal}>
          <AntDesign name="plus" size={32} color="black" />
        </PlusIcon>
        <PopupModal
          visible={modalVisible}
          onClose={closeModal}
          categories={categories}
        ></PopupModal>

        <Text fontSize="heading" fontWeight="bold">
          Products
        </Text>
        <InputContainer>
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
        </InputContainer>

        <FilterContainer>
          {categories.map((category: Category) => (
            <FilterButton
              key={category.id}
              activeOpacity={1}
              selected={selectedFilter === category.id}
              onPress={() => setSelectedFilter(category.id)}
            >
              <Text
                color={
                  selectedFilter === category.id
                    ? "textSecondary"
                    : "textPrimary"
                }
              >
                {category.name}
              </Text>
            </FilterButton>
          ))}
        </FilterContainer>
        <StyledScrollView>
          {filteredProducts &&
            filteredProducts.map((product: Product) => (
              <TouchableOpacity
                activeOpacity={1}
                key={product.id}
                onPress={() => goToProduct(product)}
              >
                <ListItemContainer>
                  <Text fontSize="subheading" color="textSecondary">
                    {product.name}
                  </Text>
                  <Text fontSize="subheading" color="textSecondary">
                    {formatPrice(product.price)}
                  </Text>
                </ListItemContainer>
              </TouchableOpacity>
            ))}
        </StyledScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Products;
